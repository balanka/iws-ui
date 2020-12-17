import React, {useEffect, useState, useContext} from 'react'
import { CButton, CBadge, CCollapse, CCol, CForm, CLabel, CFormGroup, CInput, CSelect, CTextarea} from '@coreui/react'
import { dateFormat } from '../../../utils/utils';
import EnhancedTable from '../../Tables2/EnhancedTable';
import Grid from "react-fast-grid";
import blue from "@material-ui/core/colors/blue";
import {IoMdMenu} from "react-icons/io";
import useFetch from "../../../utils/useFetch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {accountContext, useGlobalState} from './AccountContext';
import {faAngleDoubleDown, faAngleDoubleUp, faPlusSquare, faSave, faSpinner, faWindowClose} from "@fortawesome/free-solid-svg-icons";
const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 10px 30px #BBB",
    padding: 10
  }
};
const CostCenterForm = () => {
  const [profile, ] = useGlobalState('profile');
  const [collapsingState, setCollapsingState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [selected, setSelected] = useState([]);
  const value = useContext(accountContext);
  const t = value.t
  const [{ res },]= useFetch(value.url, {});
  const [{ res2 },] = useFetch(value.accUrl, {});
  const data_ =  res?.hits?res.hits:value.initialState;
  const accData_=  res2?.hits?res2.hits:value.accData;
  const current_= value.user;
  console.log('currentZXX', current_);
  console.log('current', current);
  const editing_ = value.editing;
  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [current, setCurrent] = useState(current_);
 // const [editing, setEditing] = useState(editing_);

  useEffect(() => {setCurrent(current_)}, [current_]);

  const toggle= ()=> {
    setCollapsingState({...collapsingState, collapse:!collapsingState.collapse });
  }
  const initAdd =()=> {
    const row = {...value.initialState.hits[0], company:profile.company, editing:false};
    // setEditing(false);
    value.editRow(row, false);
    setCurrent(row);
  };
  const cancelEdit = (e) => {
     initAdd();
      e.preventDefault();
    setSelected([]);

  };

  const submitEdit = event => {
    event.preventDefault();
      if(current.editing) {
          console.log("submitEdit1 current", current);
          value.submitEdit(current, data);
      } else submitAdd(event)
  };

  const submitAdd = event => {
    event.preventDefault();
    console.log("submitAdd1 current", current);
    value.submitAdd(current, data);
  };

  const [filteredRows, setFilteredRows] = useState(data);
  useEffect(() => {handleFilter('')}, [data]);
  function handleFilter(text) {
    const  filtered = data.hits.filter(function(rc) {
      return (rc.id.indexOf(text)>-1
        ||rc.name.indexOf(text)>-1
        ||rc.description.indexOf(text)>-1
        ||rc.enterdate.indexOf(text)>-1
        ||rc.postingdate.indexOf(text)>-1
        ||rc.changedate.indexOf(text)>-1
        ||rc.company.indexOf(text)>-1)}
    );
    const rows_=text?filtered:data.hits
    setFilteredRows(rows_);
  }

  const edit = id =>{
    const record = filteredRows.find(obj => obj.id === id);
    value.editRow(record);
  }

  const mapping = item => <option key={item.id} value={item.id}>
    {item.id+ " ".concat (item.name)}</option>;



  function buildForm(current1) {
    console.log("user1xx", current1);
    const submit = current1.editing ? submitEdit : submitAdd
    const props = {
      title: value.title, columns: value.headers, rows: filteredRows, edit: edit, submit: submit, selected: selected
      , editable:true, setSelected: setSelected, cancel: cancelEdit, handleFilter: handleFilter, rowsPerPageOptions: [5, 15, 25, 100]
    }
    return <>
      <Grid container spacing={2}  style={{...styles.outer, padding: 20, 'background-color':blue }} direction="column" >
        <CForm  className="form-horizontal" onSubmit={ current1.editing?submitEdit:submitAdd} style={{padding:0}}>
          <Grid container justify="space-between">
            <Grid container xs spacing={1} justify="flex-start">
              <Grid item justify="center" alignItems="center">
                <IoMdMenu />
              </Grid>
              <Grid item><h5><CBadge color="primary">{t(`${value.title}`)}</CBadge></h5></Grid>
            </Grid>
            <Grid item justify="flex-end" alignItems="center">
                <div className="card-header-actions" style={{  align: 'right' }}>
                    <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => cancelEdit(e)}>
                        <FontAwesomeIcon icon={faWindowClose} />
                    </CButton>
                </div>
                    <div className="card-header-actions" style={{  align: 'right' }}>
                        <CButton color="link" className="card-header-action btn-minimize" onClick={initAdd}>
                            <FontAwesomeIcon icon={faPlusSquare} />
                        </CButton>
                    </div>
                    <div className="card-header-actions" style={{  align: 'right' }}>
                        <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => submitEdit(e)}>
                            <FontAwesomeIcon icon={faSave} />
                        </CButton>
                    </div>
                   <div>
                    <CButton block color="link" type="submit"  className="card-header-action btn-minimize" onClick={event => {
                        event.preventDefault(); value.submitQuery(event, value.accUrl, setAccData, value.initAcc);
                        value.submitQuery(event, value.url, setData, value.initialState);}}>
                        <FontAwesomeIcon icon={faSpinner} rotation={90}/>
                    </CButton>
                </div>
                <div className="card-header-actions" style={{  align: 'right' }}>
                    <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                        <FontAwesomeIcon icon={collapsingState.collapse ?faAngleDoubleUp:faAngleDoubleDown} />
                    </CButton>
                </div>
            </Grid>
          </Grid>
          <CCollapse show={collapsingState.collapse} id="JScollapse" style={{padding: 2}}>
              <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                  <CLabel size="sm" htmlFor="input-small">{t('costcenter.id')}</CLabel>
                </CCol>
                <CCol sm="4">
                  <CInput bsSize="sm" type="text" id="account-id" name="id" className="input-sm" placeholder="Id"
                         value={current.id} onChange= {(event)  => value.setCurrent({ ...current, id: event.target.value})}
                        />
                </CCol>
                <CCol sm="2">
                  <CLabel size="sm" htmlFor="input-small">{t('costcenter.enterdate')}</CLabel>
                </CCol>
                <CCol sm="2">
                  <CInput  bsSize="sm" type="text" id="enterdate-id" name="enterdate" className="input-sm"
                         placeholder="date" value={dateFormat(current.enterdate, "dd.mm.yyyy")}
                         style={{'text-align':'right', padding:2 }}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                  <CLabel size="sm" htmlFor="input-small">{t("costcenter.name")}</CLabel>
                </CCol>
                <CCol sm="4">
                  <CInput bsSize="sm" type="text" id="name-input" name="name" className="input-sm" placeholder="Name"
                         value={current.name} onChange={(event)  => value.setCurrent({ ...current, name: event.target.value})}/>
                </CCol>
                <CCol sm="2">
                  <CLabel size="sm" htmlFor="input-small">{t('costcenter.changedate')}</CLabel>
                </CCol>
                <CCol sm="2">
                  <CInput bsSize="sm" type="text" id="changedate-id" name="changedate" className="input-sm"
                         placeholder="date" value={dateFormat(current.changedate, "dd.mm.yyyy")}
                         style={{'text-align':'right', padding:2 }}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                  <CLabel size="sm" htmlFor="input-small">{t('costcenter.account')}</CLabel>
                </CCol>
                <CCol sm="4">
                  <CSelect className="flex-row" type="select" name="account" id="account-id"
                         value={current.account} onChange={(event)  => value.setCurrent({ ...current, account: event.target.value})}>
                    { accData.hits.map(item => mapping(item))};

                  </CSelect>

                </CCol>
                <CCol sm="2">
                  <CLabel size="sm" htmlFor="input-small">{t("costcenter.postingdate")}</CLabel>
                </CCol>
                <CCol sm="2">
                  <CInput bsSize="sm" type="text" id="input-small" name="postingdate" className="input-sm"
                         placeholder="date" value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                         style={{'text-align':'right', padding:2 }}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row style={{  height:15 }}>
                <CCol sm="6"/>
                <CCol sm="2">
                  <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
                </CCol>
                <CCol sm="2">
                  <CInput  bsSize="sm" type="text" id="company-id" name="company" className="input-sm"
                         placeholder="company" value={current.company}
                         style={{'text-align':'right', padding:2 }}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row style={{  height:15 }}>
                <CCol md="2">
                  <CLabel htmlFor="textarea-input">{t('costcenter.description')}</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea type="texarea" name="description" id="description-id" rows="1"
                         placeholder="Content..." value={current.description} 
                         onChange={(event)  => value.setCurrent({ ...current, description: event.target.value})}/>
                </CCol>
              </CFormGroup>
          </CCollapse>
      </CForm>
    </Grid>
      <EnhancedTable props={props} style={{padding: 0, height: 50}}/>
    </>
  }
  return buildForm(current);

};
export default CostCenterForm;

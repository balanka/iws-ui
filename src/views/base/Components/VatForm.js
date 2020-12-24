import React, {useEffect, useState, useContext} from 'react'
import { CButton, CBadge, CCollapse, CCol, CForm, CLabel, CFormGroup, CInput, CSelect, CTextarea} from '@coreui/react'
import { dateFormat } from '../../../utils/utils';
import {accountContext, useGlobalState} from './AccountContext';
import Grid from "react-fast-grid";
import blue from "@material-ui/core/colors/blue";
import {IoMdMenu} from "react-icons/io";
import useFetch from "../../../utils/useFetch";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faPlusSquare,
  faSave,
  faSpinner,
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import EditableTable from "../../Tables2/EditableTable";
import {ColumnsV as columns, filter, OptionsM} from "../../Tables2/LineFinancialsProps";
import {rowStyle, theme} from "../Tree/BasicTreeTableProps";
const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 10px 30px #BBB",
    padding: 10
  }
};
const VatForm = () => {
  const [profile, ] = useGlobalState('profile');
  const [state, setState] = useState({collapse:true, fadeIn: true, timeout: 300});
  const [selected, setSelected] = useState([]);
  const value = useContext(accountContext);
  const t = value.t
  const [{ res}]= useFetch(value.url, {});
  const [{ res2}] = useFetch(value.accUrl, {});
  const data_ =  res?.hits?res.hits:value.initialState;
  const accData_=  res2?.hits?res2.hits:value.accData;
  const current_= value.user;
  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [current,setCurrent] = useState(current_);
  useEffect(() => {}, [current, setCurrent, data ]);
  useEffect(() => {setCurrent(current_)}, [ current_]);

  const toggle= ()=> {
    setState({ ...state, collapse:!state.collapse });
  }

  const initAdd =()=> {
    setCurrent({...value.initialState.hits[0], company:profile.company, editing:false});
  };
  const cancelEdit = (e) => {
    e.preventDefault();
    initAdd();
    //setSelected([]);
  };
  const columnsX = columns(accData.hits, value.initialState, current, t);
  const getColumnName =()=>columnsX.map(col =>col.field);

  const [filteredRows, setFilteredRows] = useState(data);
  useEffect(() => {handleFilter('')}, [data]);

  function handleFilter(text) {
    const rows_=text?filter(data.hits, getColumnName(), text ):data.hits
    setFilteredRows(rows_);
  }

  const edit = editedRow =>{
    const record = filteredRows.find(obj => obj.id === editedRow.id);
    setCurrent({...record, editing:true});
  }


  const mapping = item => <option key={item.id} value={item.id}>
    {item.id+ " ".concat (item.name)}</option>;

  const submitEdit = event => {
    event.preventDefault();
    if(current.editing) {
      const row = {...current}
        setCurrent(row);
       value.submitEdit(row, data);
    } else submitAdd(event)
  };

  const submitAdd = event => {
    event.preventDefault();
    const row = {...current};
    value.submitAdd(row, data);
    setCurrent(row);
  };



  function buildForm(current1){
    const current =current1
    return <>
      <Grid container spacing={2} style={{...styles.outer, padding: 20, 'background-color':blue }} direction="column" >
        <CForm  className="form-horizontal" onSubmit={ current.editing?submitEdit:submitAdd} style={{padding:0}}>
          <Grid container justify="space-between">
            <Grid container xs spacing={1} justify="flex-start">
              <Grid item justify="center" alignItems="center">
                <IoMdMenu />
              </Grid>
              <Grid item><h5><CBadge color="primary">{value.title}</CBadge></h5></Grid>
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
              <div className="card-header-actions" style={{  align: 'right' }}>
                <CButton block color="link" type="submit"  className="card-header-action btn-minimize" onClick={event => {
                  event.preventDefault(); value.submitQuery(event, value.accUrl, setAccData, value.initAcc);
                  value.submitQuery(event, value.url, setData, value.initialState);}}>
                  <FontAwesomeIcon icon={faSpinner} rotation={90}/>
                </CButton>
              </div>
              <div className="card-header-actions" style={{  align: 'right' }}>
                <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                  <FontAwesomeIcon icon={state.collapse ?faAngleDoubleUp:faAngleDoubleDown} />
                </CButton>
              </div>
            </Grid>
          </Grid>
          <CCollapse show={state.collapse} id="collapse" style={{padding: 2}}>
            <CFormGroup row style={{height:15 }}>
              <CCol sm="2">
                <CLabel size="sm" htmlFor="input-small">{t('vat.id')}</CLabel>
              </CCol>
              <CCol sm="4">
                <CInput bsSize="sm" type="text" id="account-id" name="id" className="input-sm"
                        placeholder="Id" value= {current.id}
                        onChange={(event)  => value.setCurrent({ ...current, id: event.target.value})} />
              </CCol>
              <CCol sm="2">
                <CLabel size="sm" htmlFor="input-small">{t('vat.enterdate')}</CLabel>
              </CCol>
              <CCol sm="2">
                <CInput  bsSize="sm" type="text"  id="enterdate-id" name="enterdate"
                        className="input-sm" placeholder="date"
                        value={dateFormat(current.enterdate, "dd.mm.yyyy")}
                        style={{'text-align':'right', padding:2 }}/>
              </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
              <CCol sm="2">
                <CLabel size="sm" htmlFor="input-small">{t('vat.name')}</CLabel>
              </CCol>
              <CCol sm="4">
                <CInput bsSize="sm" type="text" id="name-input" name="name" className="input-sm"
                        placeholder="Name" value={current.name}
                        onChange={(event)  => value.setCurrent({ ...current, name: event.target.value})} />
              </CCol>
              <CCol sm="2">
                <CLabel size="sm" htmlFor="input-small">{t('vat.changedate')}</CLabel>
              </CCol>
              <CCol sm="2">
                <CInput  bsSize="sm"  type="text"  id="changedate-id" name="changedate"
                        className="input-sm" placeholder="date"
                        value={dateFormat(current.changedate, "dd.mm.yyyy")}
                        style={{'text-align':'right', padding:2 }}/>
              </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
              <CCol sm="2">
                <CLabel size="sm" htmlFor="input-small">{t('vat.input_account')}</CLabel>
              </CCol>
              <CCol sm="4">
                <CSelect className ="flex-row" type="select" name="inputaccount" id="inputaccount-id"
                        value={current.inputVatAccount}
                         onChange={(event)  => value.setCurrent({ ...current, inputVatAccount: event.target.value})} >
                  {accData.hits.map(item => mapping(item))};

                </CSelect>

              </CCol>
              <CCol sm="2">
                <CLabel size="sm" htmlFor="input-small">{t('vat.postingdate')}</CLabel>
              </CCol>
              <CCol sm="2">
                <CInput  bsSize="sm" type="text" id="input-small" name="postingdate" className="input-sm" placeholder="date"
                        value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                        style={{'text-align':'right', padding:2 }}/>
              </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
              <CCol sm="2">
                <CLabel size="sm" htmlFor="input-small">{t('vat.output_account')}</CLabel>
              </CCol>
              <CCol sm="4">
                <CSelect className ="flex-row" type="select" name="outputaccount" id="outputaccount-id"
                        value={current.outputVatAccount}
                         onChange={(event)  => value.setCurrent({ ...current, outputVatAccount: event.target.value})} >
                  {accData.hits.map(item => mapping(item))};
                </CSelect>
              </CCol>
              <CCol md="1">
                <CLabel size="sm" htmlFor="input-small">{t('vat.percent')}</CLabel>
              </CCol>
              <CCol sm="1">
                <CInput  bsSize="sm" type="text" id="percent-id" name="percent"  className="input-sm"
                         placeholder="percent" value={current.percent}
                         onChange={(event)  => value.setCurrent({ ...current, percent: event.target.value})} />
              </CCol>
              <CCol sm="1">
                <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
              </CCol>
              <CCol sm="1">
                <CInput  bsSize="sm" type="text" id="company-id" name="company" className="input-sm"
                        placeholder="company" value={current.company} />
              </CCol>

            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
              <CCol md="2">
                <CLabel htmlFor="textarea-input">{t('vat.description')}</CLabel>
              </CCol>
              <CCol xs="12"   md="9">
                <CTextarea type="textarea" name="description" id="description-id" rows="1"
                        placeholder="Content..." value={current.description}
                           onChange={(event)  => value.setCurrent({ ...current, description: event.target.value})} />
              </CCol>
            </CFormGroup>
          </CCollapse>
         </CForm>
      </Grid>
      <EditableTable Options={OptionsM}  data={filteredRows} columns={columnsX} rowStyle={rowStyle}
                     selected ={[-1]} theme={theme} t={t}  edit ={edit}/>
 </>
  }

  return buildForm(current);

};
export default VatForm

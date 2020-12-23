import React, {useEffect, useState, useContext} from 'react'
import { CButton, CBadge, CCollapse, CCol, CForm, CLabel, CFormGroup, CInput, CSelect, CTextarea} from '@coreui/react'
import {dateFormat} from "../../../utils/utils"
import {accountContext, useGlobalState} from './AccountContext';
import Grid from "react-fast-grid";
import blue from "@material-ui/core/colors/blue";
import {IoMdMenu} from "react-icons/io";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import useFetch from "../../../utils/useFetch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleDown, faAngleDoubleUp, faPlusSquare, faSave, faSpinner,faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {ColumnsACC as columns, OptionsM} from "../../Tables2/LineFinancialsProps";
import EditableTable from "../../Tables2/EditableTable";
import {rowStyle, theme} from "../Tree/BasicTreeTableProps";
const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 10px 30px #BBB",
    padding: 10
  }
};
const AccountForm = () => {
  const [profile, ] = useGlobalState('profile');
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const value = useContext(accountContext);
  const t = value.t
  const [{ res}, ]= useFetch(value.url, {});
  const [{ res2 }, ] = useFetch(value.accUrl, {});
  const data_ =  res?.hits?res.hits:value.initialState;
  const accData_=  res2?.hits?res2.hits:value.accData;
  const current_= value.user;
  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [current,setCurrent] = useState(current_);
  useEffect(() => {}, [current, setCurrent, data]);
  useEffect(() => {setCurrent(current_)}, [current_]);

  const toggle= ()=> {
    setState({...state, collapse:!state.collapse });
  }
  const initAdd =()=> {
    const row = {...value.initialState.hits[0], company:profile.company, editing:false};
    value.editRow(row, false);
    setCurrent(row);
  };
  const cancelEdit = (e) => initAdd();
  const columnsX = columns(accData.hits, value.initialState, current, t);
  const getColumnName = ()=>columnsX.map(col =>col.field);

  const [filteredRows, setFilteredRows] = useState(data);
  useEffect(() => {handleFilter('')}, [data]);
  function handleFilter(text) {
    const  filtered = data.hits.filter(function(rc) {
      const names = getColumnName();
      return names.map(name => `rc.${name}`.includes(text)).reduce((a, b = false) => a || b);
    });
    const rows_=text?filtered:data.hits
    setFilteredRows(rows_);
  }
  const edit = editedRow =>{
    const record = filteredRows.find(obj => obj.id === editedRow.id);
    const row = {...record, editing:true}
    setCurrent(row);
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

  function buildForm(current){
    return <>
       <Grid container spacing={2} style={{...styles.outer, padding: 20, 'background-color':blue }} direction="column" >
        <CForm  className="form-horizontal" onSubmit={  current.editing?submitEdit:submitAdd}>
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
                <div>
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
                    <CCollapse show={state.collapse} id="JScollapse" style={{padding: 2}}>
                        <CFormGroup row style={{  height:15 }}>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('account.id')}</CLabel>
                          </CCol>
                          <CCol sm="4">
                            <CInput bsSize="sm" type="text" id="account-id" name="id" className="input-sm"
                                   placeholder="Id" value= {current.id} onChange={(event)  => value.setCurrent({ ...current, id: event.target.value})} />
                          </CCol>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('account.enterdate')}</CLabel>
                          </CCol>
                          <CCol sm="2">
                            <CInput  bsSize="sm" type="text"  id="enterdate-id" name="enterdate"
                                   className="input-sm" placeholder="date"
                                   value={dateFormat(current.enterdate, "dd.mm.yyyy")}
                                   style={{'text-align':'right', padding:2 }} readonly />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row style={{  height:15 }}>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('account.name')}</CLabel>
                          </CCol>
                          <CCol sm="4">
                            <CInput bsSize="sm" type="text" id="name-input" name="name" className="input-sm" placeholder="Name"
                                   value={current.name} onChange={(event)  => value.setCurrent({ ...current, name: event.target.value})} />
                          </CCol>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('account.changedate')}</CLabel>
                          </CCol>
                          <CCol sm="2">
                            <CInput  bsSize="sm"  type="text"  id="changedate-id" name="changedate"
                                   className="input-sm" placeholder="date" value={dateFormat(current.changedate,
                              "dd.mm.yyyy")} style={{'text-align':'right', padding:2 }} readonly />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row style={{  height:15 }}>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('account.account')}</CLabel>
                          </CCol>
                          <CCol sm="4">
                            <CSelect className ="flex-row" type="select" name="account" id="account-id"
                                   value={current.account} onChange={(event)  => value.setCurrent({ ...current, account: event.target.value})} >
                                 {accData.hits.map(item => mapping(item))};

                            </CSelect>

                          </CCol>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('account.postingdate')}</CLabel>
                          </CCol>
                          <CCol sm="2">
                            <CInput  bsSize="sm" type="text" id="input-small" name="postingdate"
                                   className="input-sm" placeholder="date"
                                   value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                                   style={{'text-align':'right', padding:2 }} readonly/>
                          </CCol>
                        </CFormGroup>
                       <CFormGroup row style={{  height:15 }}>
                        <CCol sm="2">
                          <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
                        </CCol>
                        <CCol sm="4">
                          <CInput bsSize="sm" type="text" id="company-id" name="company" className="input-sm"
                                 placeholder="company" value={current.company} onChange={(event)  => 
                                 value.setCurrent({ ...current, company: event.target.value})} />
                        </CCol>
                        <CCol sm="2">
                          <FormControlLabel id="isDebit" name="isDebit"
                              control={<Switch checked={current.isDebit} onChange={(event)  => 
                                value.setCurrent({ ...current, isDebit: event.target.checked})} style={{ 'padding-left':2 }}/>}
                              label={t('account.debit_credit')}
                          />
                        </CCol>
                        <CCol sm="1">
                          <FormControlLabel id="balancesheet" name="balancesheet"
                                            control={<Switch checked={current.balancesheet} onChange={(event)  => 
                                              value.setCurrent({ ...current, balancesheet: event.target.checked})} style={{ 'padding-left':2 }}/>}
                                            label={t('account.balancesheet')}
                          />
                        </CCol>
                      </CFormGroup>
                        <CFormGroup row style={{  height:15 }}>
                          <CCol md="2">
                            <CLabel htmlFor="textarea-input">{t('account.description')}</CLabel>
                          </CCol>
                          <CCol xs="12"   md="9">
                            <CTextarea type="textarea" name="description" id="description-id" rows="1"
                                    placeholder="Content..." value={current.description} onChange={(event)  => 
                                      value.setCurrent({ ...current, description: event.target.value})} />
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
export default AccountForm;


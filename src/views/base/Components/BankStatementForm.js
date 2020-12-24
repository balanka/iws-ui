import React, {useEffect, useState, useContext} from 'react'
import DatePicker from "react-datepicker";
import { CButton, CBadge, CCollapse, CCol, CForm, CLabel, CFormGroup, CInput, CTextarea} from '@coreui/react'
import {capitalize, dateFormat, currencyAmountFormatDE} from "../../../utils/utils"
import Switch from "@material-ui/core/Switch";
import {accountContext, useGlobalState} from './AccountContext';
import EnhancedTable from '../../Tables2/EnhancedTable';
import Grid from "react-fast-grid";
import blue from "@material-ui/core/colors/blue";
import {IoMdMenu} from "react-icons/io";
import {useTranslation} from "react-i18next";
import useFetch from "../../../utils/useFetch";
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleDown, faAngleDoubleUp, faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {ColumnsBS as columns, OptionsM} from "../../Tables2/LineFinancialsProps";
import EditableTable from "../../Tables2/EditableTable";
import {rowStyle, theme} from "../Tree/BasicTreeTableProps";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 10px 30px #BBB",
    padding: 10
  }
};

const BankStatementForm = () => {
  const { t,  } = useTranslation();
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [profile, ] = useGlobalState('profile');
  const value = useContext(accountContext);
  const init = ()=> {return value.initialState}
  const [{ res}]= useFetch(value.url, {});
  const data_ =  res?.hits?res.hits:[value.initialState];
  const getData =()=> { return data?.hits?data.hits:init().hits}
  const current_= value.user;
  const [data, setData] = useState(data_);
  const [current,setCurrent] = useState(current_);
  const [filteredRows, setFilteredRows] = useState(data);
  useEffect(() => {}, [current, setCurrent, data]);
  useEffect(() => {setCurrent(current_)}, [ current_]);

  useEffect(() => {handleFilter('')}, [data]);

  const submitGet = (url, func, result) => {
    axios.get( url, {headers: {'authorization':profile.token}})
      .then(response => {
        const resp = response.data;
        result=response.data;

        func(resp);
        result=resp;
        return result;
      }).catch(function (error) {
      console.log('error', error);
    });
    return result;
  }
  const fetchData =(url_, func)=>{
    let result='xxx';
    const res = submitGet(url_, func, result);
    console.log("res", res);
    const datax = res?.hits ? res.hits : value.initialState;
    return datax;
  }
  const submitQuery = event => {
    event.preventDefault();
    console.log("submitQuery current", current);
    let result='xxx';
    const url_=value.url //.concat('/')
    console.log("url_", url_);
    fetchData(url_, setData, result);
    console.log("result", result);
  };
    const cancelEdit = (e) => {
        const row = {...current};
        value.editRow(row, false);
        setCurrent(row);
    };
    const columnsX = columns([], value.initialState, current, t);
    const getColumnName = ()=>columnsX.map(col =>col.field);

  function handleFilter(text) {
      const  filtered = getData().filter(function(rc) {
          const names = getColumnName();
          return names.map(name => `rc.${name}`.includes(text)).reduce((a, b = false) => a || b);
      });
      const rows_=text?filtered:data.hits
      setFilteredRows(rows_);
  }
  const toggle= ()=> {
    setState({...state, collapse:!state.collapse });
  }

  const edit = editedRow =>{
        const record = filteredRows.find(obj => obj.bid === editedRow.bid);
        const row = {...record, editing:true}
        setCurrent(row);
    }


  const submitEdit = event => {
        event.preventDefault();
        if(current.editing && !current.posted) {
            const row = {...current}
            setCurrent(row);
            value.submitEdit(row, data);
        }
  };

  const submitAdd = event => {
    event.preventDefault();
  };

  function buildForm(current1){
    console.log("user1xx", current1);
    return <>
      <Grid container spacing={2} style={{...styles.outer, padding: 20, 'background-color':blue }} direction="column" >
        <CForm  className="form-horizontal" onSubmit={ current1.editing?submitEdit:submitAdd} style={{padding:0}}>
          <Grid container justify="space-between">
            <Grid container xs spacing={1} justify="flex-start">
              <Grid item justify="center" alignItems="center">
                <IoMdMenu />
              </Grid>
              <Grid item> <h5><CBadge color="primary">{value.title}</CBadge></h5></Grid>
            </Grid>
            <Grid item justify="flex-end" alignItems="center">
                <div className="card-header-actions" style={{  align: 'right' }}>
                    <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                        <FontAwesomeIcon icon={faSave} />
                    </CButton>
                </div>
                <div className="card-header-actions" style={{  align: 'right' }}>
                    <CButton block color="link" type="submit"  className="card-header-action btn-minimize" onClick={event => {
                        event.preventDefault(); submitQuery(event)}}>
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
             <CCollapse show={state.collapse} id="JScollapse" style={{padding:2}}>
                 <CFormGroup row style={{  height:15 }}>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('bankstatement.id')}</CLabel>
                          </CCol>
                          <CCol sm="4">
                            <CInput  bsSize="sm" type="text" id="account-id" name="id" className="input-sm"
                                    placeholder="Id" value= {current.bid}  />
                          </CCol>
                          <CCol sm="1">
                            <CLabel size="sm" htmlFor="input-small">{t('bankstatement.postingdate')}</CLabel>
                          </CCol>
                          <CCol sm="1.5">
                            <CInput  bsSize="sm" type="text"  id="postingdate-id" name="postingdate" className="input-sm"
                                    placeholder="date" value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                                    style={{'text-align':'right', padding:2 }}/>
                          </CCol>
                        </CFormGroup>
                 <CFormGroup row style={{  height:15 }}>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('bankstatement.depositor')}</CLabel>
                          </CCol>
                          <CCol sm="4">
                            <CInput  bsSize="sm" type="text" id="depositor-input" name="depositor"
                                    className="input-sm" placeholder="depositor" value={current.depositor}  />
                          </CCol>
                          <CCol sm="1">
                          </CCol>
                          <CCol sm="1.5">
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <KeyboardDatePicker
                                      disabled ={current.posted}
                                      disableToolbar
                                      fullWidth
                                      variant="inline"
                                      format="dd.MM.yyyy"
                                      margin="normal"
                                      id="date-picker-inline"
                                      label={t('bankstatement.valuedate')}
                                      value={current.valuedate}
                                      onChange={(event) => { value.setCurrent({ ...current, valuedate: event.target.value})}}
                                      KeyboardButtonProps = {{
                                          'aria-label': t('bankstatement.valuedate'),
                                      }}
                                  />
                              </MuiPickersUtilsProvider>
                          </CCol>
                        </CFormGroup>
                 <CFormGroup row style={{  height:15 }}>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('bankstatement.beneficiary')}</CLabel>
                          </CCol>
                          <CCol sm="4">
                            <CInput  bsSize="sm" type="text" id="beneficiary-input" name="beneficiary"
                                   className="input-sm" placeholder="beneficiary" value={current.beneficiary}/>
                          </CCol>
                          <CCol sm="1">
                            <CLabel size="sm" htmlFor="input-small">{t('bankstatement.postingtext')}</CLabel>
                          </CCol>
                          <CCol sm="1.5">
                            <CInput  bsSize="sm"  type="text"  id="postingtext-id" name="postingtext"
                                   className="input-sm" placeholder="postingtext" value={current.postingtext} />
                          </CCol>
                        </CFormGroup>
                 <CFormGroup row style={{  height:15 }}>
                        <CCol sm="2">
                          <CLabel size="sm" htmlFor="input-small">{t('bankstatement.info')}</CLabel>
                        </CCol>
                        <CCol xs="4">
                          <CInput  bsSize="sm" type="text" id="info-input" name="info" className="input-sm"
                                 placeholder="info" value={current.info}  />
                        </CCol>
                        <CCol sm="1">
                          <CLabel size="sm" htmlFor="input-small">{t('bankstatement.amount')}</CLabel>
                        </CCol>
                        <CCol sm="1.5">
                          <CInput  bsSize="sm" type="text" id="amount-input" name="amount" className="input-sm"
                                 placeholder="amount" value={currencyAmountFormatDE(Number(current.amount),current.currency)}
                                 style={{ 'text-align':'right' }}/>
                        </CCol>
                      </CFormGroup>
                 <CFormGroup row style={{  height:15 }}>
                        <CCol sm="2">
                          <CLabel size="sm" htmlFor="input-small">{t('bankstatement.companyIban')}</CLabel>
                        </CCol>
                        <CCol sm="4">
                          <CInput disabled ={current.posted} bsSize="sm" type="text" id="companyIban-id" name="companyIban"
                                  className="input-sm" placeholder="companyIban" value={current.companyIban}
                                  onChange={(event)  => setCurrent({ ...current, accountno: event.target.value})} />
                        </CCol>
                        <CCol sm="1">
                          <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
                        </CCol>
                        <CCol sm="1.5">
                          <CInput  bsSize="sm" type="text" id="company-input" name="company" className="input-sm"
                                  placeholder="company" value={current.company} style={{ 'text-align':'right' }}/>
                        </CCol>

                      </CFormGroup>
                    <CFormGroup row style={{  height:15 }}>
                        <CCol sm="2">
                          <CLabel size="sm" htmlFor="input-small">{t('bankstatement.accountno')} </CLabel>
                        </CCol>
                        <CCol sm="4">
                          <CInput disabled ={current.posted} bsSize="sm" type="text" id="accountno-input" name="accountno"
                                  className="input-sm" placeholder="accountno" value={current.accountno}
                                  onChange={(event)  => value.setCurrent({ ...current, accountno: event.target.value})} />
                        </CCol>
                        <CCol sm="1">
                             <CLabel size="sm" htmlFor="input-small">{t('bankstatement.bankCode')} </CLabel>
                        </CCol>
                        <CCol sm="1.5">
                          <CInput disabled ={current.posted} bsSize="sm" type="text" id="bankCode-input" name="bankCode"
                                  className="input-sm" placeholder="bankCode" value={current.bankCode}
                                  onChange={(event)  => value.setCurrent({ ...current, bankCode: event.target.value})}
                                  style={{ 'padding-left':0 }}/>
                        </CCol>
                        <CCol sm="1">
                             <FormControlLabel id="posted" name="posted" bsSize="sm"
                                       control={<Switch checked={current.posted} />}
                                       label={t('bankstatement.posted')}/>
                         </CCol>
                      </CFormGroup>
                  <CFormGroup row style={{  height:15 }}>
                        <CCol sm="2">
                          <CLabel size="sm" htmlFor="input-small">{t('bankstatement.purpose')}</CLabel>
                        </CCol>
                        <CCol xs="12"   md="10">
                          <CTextarea disabled ={current.posted} bsSize="sm" type="textarea" id="purpose-input" name="purpose" className="input-sm"
                                 placeholder="purpose" value={current.purpose}
                                 onChange={(event)  => value.setCurrent({ ...current, purpose: event.target.value})} rows="2"/>
                        </CCol>
                      </CFormGroup>
             </CCollapse>
        </CForm>
      </Grid>

     <EditableTable Options={OptionsM}  data={filteredRows} columns={columnsX} rowStyle={rowStyle}
                       selected ={[-1]} theme={theme} t={t}  edit ={edit} style={{padding:0, height:80}}/>
    </>;
  }

  return buildForm(current);

};
export default BankStatementForm;
//  <EnhancedTable props={props} style={{padding:0, height:80}}/>


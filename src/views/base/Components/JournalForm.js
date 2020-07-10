import React, {useEffect, useState, useContext} from 'react'
import { CButton, CBadge, CCollapse, CCol, CForm, CLabel, CFormGroup, CInput, CSelect, CTextarea} from '@coreui/react'
import {capitalize} from "../../../utils/utils"
import EnhancedTable from '../../Tables2/EnhancedTable';
import {accountContext, useGlobalState} from './AccountContext';
import useFetch from "../../../utils/useFetch";
import Grid from "react-fast-grid";
import {IoMdMenu} from "react-icons/io";
import { StyledTableRow, StyledTableCell} from '../../Tables2/EnhancedTableHelper'
import {useTranslation} from "react-i18next";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleDown, faAngleDoubleUp, faSpinner} from "@fortawesome/free-solid-svg-icons";
const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 10px 30px #BBB",
    padding: 10
  }
};
const JournalForm = () => {
  const { t, i18n } = useTranslation();
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [selected, setSelected] = useState([]);
  const [token, setToken] = useGlobalState('token');
  const UP="icon-arrow-up";
  const DOWN="icon-arrow-down";
  const value = useContext(accountContext);
  const [url,setUrl] = useState('');
  const res  = useFetch(url, {});
  const init = ()=> {return value.initialState}
  const data_ = res && res.response?res.response:[value.initialState];
  const getData =()=> { return data?.hits?data.hits:init().hits}

  const [{ res2, isLoading2, isError2 }, doFetch2] = useFetch(value.accUrl, {});
  const accData_=  res2?.hits?res2.hits:value.accData;
  console.log('data_',data_)
  console.log('accData_',accData_)
  const current_= value.user;
  const account_= value.user.account;
  const fromPeriod_ = value.user.period;
  const toPeriod_ = value.user.period;
  const columns = value.headers

  console.log("data_", data_);
  const [current,setCurrent] = useState(current_);
  const [account,setAccount] = useState(account_);
  const [account2,setAccount2] = useState('');
  const [fromPeriod, setFromPeriod] = useState(fromPeriod_);
  const [toPeriod, setToPeriod] = useState(toPeriod_);
  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [filteredRows, setFilteredRows] = useState(data);
  useEffect(() => {}, [current, setCurrent]);
  useEffect(() => {setCurrent(current_)}, [ current_,account, fromPeriod, toPeriod]);
  useEffect(() => { setAccount(account_)}, [account_, current.account ]);
  useEffect(() => { setFromPeriod(fromPeriod_)}, [fromPeriod_]);
  useEffect(() => { setToPeriod(toPeriod_)}, [toPeriod_]);
  useEffect(() => {handleFilter('')}, [data, getData()]);


  const toggle= ()=> {
    setState({...state, collapse: !state.collapse });
  }

  const handleToPeriodChange = event => {
    const { name, value } = event.target;
    setToPeriod(value);
    submitQuery(event);
    event.preventDefault();
  };

  const load = event => {
    event.preventDefault();
    accData?.hits?.length<2? fetchData(value.accUrl, setAccData):void(0)
  };
  const handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    const method="set"+capitalize(name)
    const row = Object.assign(current, {name:value});
     eval(method)(value);
    setCurrent(row);
  };

  const mapping = item => <option key={item.id} value={item.id}>
    {item.id+ " ".concat (item.name)}</option>;

  const mapping2 = item => <option key={item.name} value={item.name}>
    {item.name+" ".concat(item.id)}</option>;

  const submitGet = (url, func, result) => {
    console.log('authorization2', token);
    axios.get( url, {headers: {'authorization':token}})
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
    console.log("AccDatax", accData);
    console.log("res", res);
    const datax = res?.hits ? res.hits : value.initialState;
    return datax;
  }

  const submitQuery = event => {
    event.preventDefault();
    console.log("submitQuery current", current);
    var result='xxx';
    accData?.hits?.length<2? fetchData(value.accUrl, setAccData):void(0)
    const url_=value.url.concat('/')
      .concat(account).concat('/')
      .concat(fromPeriod).concat('/')
      .concat(toPeriod);
    console.log("url_", url_);
    fetchData(url_, setData, result);
    console.log("result", result);
  };


  function handleFilter(text) {
    const filteredRows_ = !text?getData():getData().filter(function(rc) {
      return (rc.id.toString().indexOf(text)>-1
        ||rc.transid.toString().indexOf(text)>-1
        ||rc.account.indexOf(text)>-1
        ||rc.oaccount.indexOf(text)>-1
        ||rc.transdate.indexOf(text)>-1
        ||rc.enterdate.indexOf(text)>-1
        ||rc.postingdate.indexOf(text)>-1
        ||rc.period.toString().indexOf(text)>-1
        ||rc.amount.toString().indexOf(text)>-1
        ||rc.idebit.toString().indexOf(text)>-1
        ||rc.debit.toString().indexOf(text)>-1
        ||rc.icredit.toString().indexOf(text)>-1
        ||rc.credit.toString().indexOf(text)>-1
        ||rc.currency.indexOf(text)>-1
        ||rc.side.toString().indexOf(text)>-1
        ||rc.year.toString().indexOf(text)>-1
        ||rc.month.toString().indexOf(text)>-1
        ||rc.credit.toString().indexOf(text)>-1
        ||rc.modelid.toString().indexOf(text)>-1
        ||rc.company.indexOf(text)>-1
        ||rc.text.indexOf(text)>-1
        ||rc.typeJournal.toString().indexOf(text)>-1
        ||rc.file_content.toString().indexOf(text)>-1)});
    console.log('filteredRows+', filteredRows_);
    setFilteredRows(filteredRows_);
  }

  const getFilteredRows=()=>{
    console.log('data+', filteredRows)
    console.log('filteredRows+', filteredRows)
    return filteredRows?filteredRows:data
  }
  const edit = id =>{
    const record = data.hits.find(obj => obj.id === id);
    value.editRow(record);
  }
  const cancelEdit = (e) => {
    setSelected([]);
  };
  const  addRunningTotal = (data) => data.length>0?data.reduce(reducerFn, init):init;
  const renderDT=(data)=> addRunningTotal(data);
  const reducerFn =(a,b)  =>({id:'', transid:'', account:"", oaccount:"", transdate:"", enterdate:""
    , postingdate:"", period:"", amount:Number(a.amount)+Number(b.amount), idebit:"", icredit:"", debit:""
    , credit:"", currency:b.currency, side:"", year:"", month: "", company:"", text:""
    , typeJournal:"", file_content:""});
  const renderTotal = (rows)=>{
    return(
    <StyledTableRow>
      <StyledTableCell colSpan={10} style={{ height: 33, 'font-size': 15, 'font-weight':"bolder" }}>{t('common.total')}</StyledTableCell>
      <StyledTableCell style={{ height: 33, 'font-size': 15, 'font-weight':"bolder"
        , 'text-align':"right" }}>
        {columns[10].format(renderDT(rows).amount)}
      </StyledTableCell>
    </StyledTableRow>
    )
  }

  function buildForm(current1){
   // console.log("editing", editing);
    console.log("user1xxz", current1);

    const props = { title: value.title, columns:value.headers, rows:getFilteredRows(), edit:edit, editable:false
      ,  submit:submitQuery, selected:selected, colId:10, initialState:value.initialState, renderDT:renderDT
      ,  reducerFn:reducerFn, renderTotal:renderTotal, setSelected: setSelected, cancel: cancelEdit
      ,  handleFilter: handleFilter, rowsPerPageOptions: [15, 25, 100]
    }
    return <>
      <Grid container spacing={2}  direction="column"  style={{...styles.outer}}>
        <CForm  className="form-horizontal"  style={{padding:0}}>
          <Grid container justify="space-between">
            <Grid container xs spacing={1} justify="flex-start">
              <Grid item justify="center" alignItems="center">
                <IoMdMenu />
              </Grid>
              <Grid item><h5><CBadge color="primary">{t('journal.title')}</CBadge></h5></Grid>
            </Grid>
            <Grid item justify="flex-end" alignItems="center">
              <div className="card-header-actions" style={{  align: 'right' }}>
                <CButton block color="link" type="submit"  className="card-header-action btn-minimize"
                         onClick={event => {event.preventDefault(); load(event)}}>
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
            <CCollapse show={state.collapse} id="JScollapse" style={{height:40,padding:2}}>
              <CFormGroup row >
                <CCol sm="1">
                  <CLabel size="sm" htmlFor="input-small">{t('common.account')}</CLabel>
                </CCol>
                <CCol sm="3">
                  <CSelect className ="flex-row" type="select" name="account" id="account-id"
                         value={account} onChange={handleInputChange} style={{ height: 30, padding:2 }}>
                    {accData.hits.map(item => mapping(item))};

                  </CSelect>
                </CCol>
                <CCol sm="4">
                  <CSelect className ="flex-row" type="select" name="account2" id="account2-id"
                         value={account} onChange={handleInputChange} style={{ height: 30, padding:2 }}>
                    {accData.hits.map(item => mapping2(item))};

                  </CSelect>
                </CCol>
                <CCol sm="0.5" style={{ align: 'right' , padding:2}}>
                  <CLabel size="sm" htmlFor="input-small">{t('common.from')}</CLabel>
                </CCol>
                <CCol sm="1">
                  <CInput  bsSize="sm" type="text"  id="fromPeriod-id" name="fromPeriod" className="input-sm"
                          placeholder="fromPeriod" value={fromPeriod} onChange={handleInputChange} style={{ height: 30, padding:1 }}/>
                </CCol>
                <CCol sm="0.5" style={{ align: 'right' , padding:2}}>
                  <CLabel size="sm" htmlFor="input-small">{t('common.to')}</CLabel>
                </CCol>
                <CCol sm="1">
                  <CInput  bsSize="sm" type="text"  id="toPeriod-id" name="toPeriod" className="input-sm"
                          placeholder="toPeriod" value={toPeriod} onChange={handleToPeriodChange}
                           style={{ height: 30, padding:1, align: 'right'}}/>
                </CCol>
                <CCol sm="1" style={{ align: 'right' }}>
                  <CButton type="submit" size="sm" color="primary" style={{ align: 'right' }} onClick={submitQuery}>
                    <i className="fa fa-dot-circle-o"></i>
                  </CButton>
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
export default JournalForm;

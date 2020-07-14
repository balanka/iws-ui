import React, {useEffect, useState, useContext} from 'react'
import {CBadge, CButton, CCollapse, CCol, CForm, CLabel, CFormGroup, CInput, CSelect, CTextarea} from '@coreui/react'
import EnhancedTable from '../../Tables2/EnhancedTable';
import { StyledTableRow, StyledTableCell} from '../../Tables2/EnhancedTableHelper'
import {accountContext, useGlobalState} from './AccountContext';
import {capitalize} from "../../../utils/utils";
import useFetch from "../../../utils/useFetch";
import Grid from "react-fast-grid";
import {IoMdMenu} from "react-icons/io";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleDown, faAngleDoubleUp, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";
import axios from "axios";
const styles = {
    outer: {
        borderRadius: 5,
        boxShadow: "0 10px 30px #BBB",
        padding: 10
    }
};
const PACBForm = () => {
  const { t, i18n } = useTranslation();
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [selected, setSelected] = useState([]);
  const [profile, setProfile] = useGlobalState('profile');
  const [url,setUrl] = useState('');
  const value = useContext(accountContext);
  const [{ res, isLoading, isError }, doFetch]= useFetch(value.url, {});
  const [{ res2, isLoading2, isError2 }, doFetch2] = useFetch(value.accUrl, {});
  const data_ =  res?.hits?res.hits:[value.initialState];
  const init = ()=> {return value.initialState}
  const getData =()=> { return data?.hits?data.hits:init().hits}
  const accData_ =  res2?.hits?res2.hits:value.accData;

    console.log("accData_x", accData_);

 // const res  = useFetch(url, {});
  //const data_ = res && res.response?res.response:{hits:[]};


  const current_= value.user;
  const account_= value.user.account;
  const fromPeriod_ = value.user.period;
  const toPeriod_ = value.user.period;
  const columns = value.headers

  console.log("data_", data_);
  console.log("value.accData", accData);

  const [current,setCurrent] = useState(current_);
  const [account,setAccount] = useState(account_);
  const [account2,setAccount2] = useState('');
  const [fromPeriod, setFromPeriod] = useState(fromPeriod_);
  const [toPeriod, setToPeriod] = useState(toPeriod_);
    const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  /*useEffect(() => {}, [current, setCurrent]);
  useEffect(() => {setCurrent(current_)}, [ current_,account, fromPeriod, toPeriod]);
  useEffect(() => { setAccount(account_)}, [account_, current.account ]);
  useEffect(() => { setFromPeriod(fromPeriod_)}, [fromPeriod_]);
  useEffect(() => { setToPeriod(toPeriod_)}, [toPeriod_]);
  useEffect(() => {}, [url]);

   */


  const toggle= ()=> {
    setState({...state, collapse: !state.collapse });
  }
  const handleToPeriodChange = event => {
     const { name, value } = event.target;
     console.log ("event.target.value", event.target.value)
        setToPeriod(value);
        submitQuery(event);
        event.preventDefault();
    };
  const handleInputChange = event => {
    const { name, value } = event.target;
    const method="set"+capitalize(name)
    eval(method)(value);
      event.preventDefault();
  };
  const mapping = item => <option key={item.id} value={item.id}>
    {item.id+ " ".concat (item.name)}</option>;

  const mapping2 = item => <option key={item.name} value={item.name}>
    {item.name+" ".concat(item.id)}</option>;

    const dx=data?.hits?data?.hits:value.initialState
    const [filteredRows, setFilteredRows] = useState(dx);
    useEffect(() => {handleFilter()}, [data]);
    function handleFilter(text) {
        console.log('getData()', getData())
        console.log('dx.tidP', dx)
        console.log('dx.tidP', dx.hits)
        console.log('dx.tidP.length', dx?.hits?.length)
        const datax = getData()
        const filtered = datax.length<=1?datax:datax.filter(function(rc) {
            console.log('rc.tidP', rc)
            return (rc.id.indexOf(text)>-1
                ||rc.account.indexOf(text)>-1
                ||rc.period.toString().indexOf(text)>-1
                ||rc.idebit.toString().indexOf(text)>-1
                ||rc.debit.toString().indexOf(text)>-1
                ||rc.icredit.toString().indexOf(text)>-1
                ||rc.credit.toString().indexOf(text)>-1
                ||rc.currency.indexOf(text)>-1)
        });
        const filteredRows_ = !text?getData():filtered
        console.log('filteredRows+', filteredRows_);
        setFilteredRows(filteredRows_);
    }

    const getFilteredRows=()=>{
        console.log('getData()', getData());
        console.log('filteredRows', filteredRows);
        console.log('filteredRows+', dx.hits);
        console.log('row.slice+', dx?.hits?.slice());
        const row=filteredRows?filteredRows:getData();
        console.log('row+', row.hits);
        var rowx = row?.hits?row?.hits?.slice():row.slice();
        for(var i = 0, len = row.length-1; i <= len; ++i) {
            console.log('row.', rowx[i]);
            rowx[i] = {...rowx[i], balance: rowx[i].idebit + rowx[i].debit - (rowx[i].icredit + rowx[i].credit)};
         }
        console.log('rowx', rowx);
        return rowx
    }

    const submitGet = (url, func, result) => {
        axios.get( url, {headers: {'authorization':profile.token}})
            .then(response => {
                const resp = response.data;
                result=response.data;
                console.log('response.data', resp);
                console.log('response.headers', response.headers);
                console.log('result', result);
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
    const load = event => {
        event.preventDefault();
        console.log("Loading !!!!!!", current);
        let result='xxx'
        accData?.hits?.length<2? fetchData(value.accUrl, setAccData):void(0)
        console.log("result", data);
    };
    const submitQuery = event => {
        event.preventDefault();
        console.log("submitQuery current", current);
        let result='xxx'
        const url_=value.url.concat('/')
            .concat(account).concat('/')
            .concat(fromPeriod).concat('/')
            .concat(toPeriod);
        console.log("url_", url_);
        fetchData(url_, setData, result);
        console.log("result", data);
    };

  const submitEdit = event => {
    event.preventDefault();
    console.log("submitEdit1 current", current);
    const url_=value.url.concat('/')
                     .concat(account).concat('/')
                     .concat(fromPeriod).concat('/')
                     .concat(toPeriod);
    setUrl(url_);
  };


  const reducerFn =(a,b)  => {
      console.log('a', a);
      console.log('init', init().hits[0]);
      return (
          {
              period: ""
              , idebit: Number(b.idebit)
              , debit: Number(a.debit) + Number(b.debit)
              , icredit: Number(b.icredit)
              , credit: Number(a.credit) + Number(b.credit)
              , balance: Number(a.debit) + Number(b.debit) + Number(a.idebit) + Number(b.idebit)
                  - Number(a.credit) - Number(b.credit) - Number(a.icredit) - Number(b.icredit)
              , currency: b.currency, company: b.company
          })
  };

  const  addRunningTotal = (data) => data.length>0?data.reduce(reducerFn, init().hits[0]):init().hits[0];
  const renderDT=(data)=> addRunningTotal(data);

    const renderTotal = (rows)=>{
        console.log('rowsZ1',renderDT(rows).debit)
        console.log('rowsZ2',renderDT(rows).credit)
        console.log('rowsZ3',rows)
        return(
            <StyledTableRow>
                <StyledTableCell colSpan={2} style={{ height: 33, 'font-size': 14, 'font-weight':"bolder" }}>
                    {t('common.total')}
                </StyledTableCell>
                <StyledTableCell colSpan={2} style={{ height: 33, 'font-size': 14, 'font-weight':"bolder"
                    , 'text-align':"right" }}>
                    {columns[3].format(renderDT(rows).debit)}
                </StyledTableCell>
                <StyledTableCell colSpan={2} style={{ height: 33, 'font-size': 14, 'font-weight':"bolder"
                    , 'text-align':"right" }}>
                    {columns[2].format(renderDT(rows).credit)}
                </StyledTableCell>
                <StyledTableCell  colSpan={1} style={{ height: 33, 'font-size': 14, 'font-weight':"bolder"
                    , 'text-align':"right" }}>
                    {columns[3].format(renderDT(rows).debit - renderDT(rows).credit)}
                </StyledTableCell>
                <StyledTableCell  colSpan={1} style={{ height: 33, 'font-size': 14, 'font-weight':"bolder"
                    , 'text-align':"left" }}>
                    {renderDT(rows).currency}
                </StyledTableCell>
            </StyledTableRow>
        )
    }

  function buildForm(){

      const props = { title: value.title, columns:value.headers, rows:getFilteredRows(),  editable:false
          ,  submit:submitEdit, selected:selected, colId:3, initialState:init, renderDT:renderDT
          ,  reducerFn:reducerFn, renderTotal:renderTotal, setSelected: setSelected, handleFilter:handleFilter
          , rowsPerPageOptions: [15, 25, 100]
      }
    return <>
      <Grid container spacing={2} direction="column" style={{...styles.outer}}>
        <CForm  className="form-horizontal" onSubmit={submitEdit} style={{padding:0}}>
          <Grid container justify="space-between">
            <Grid container xs spacing={1} justify="flex-start">
              <Grid item justify="center" alignItems="center">
                <IoMdMenu />
              </Grid>
              <Grid item><h5><CBadge color="primary">{value.title}</CBadge></h5></Grid>
            </Grid>
            <Grid item justify="flex-end" alignItems="center">
                <div className="card-header-actions" style={{  align: 'right' }}>
                    <CButton block color="link" type="submit"  className="card-header-action btn-minimize"
                      onClick={event => {   event.preventDefault(); load(event)}}>
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
            <CCollapse show={state.collapse} id="JScollapse" style={{height:70,padding:2}}>
              <CFormGroup row>
                 <CCol sm="1">
                       <CLabel size="sm" htmlFor="input-small">{t('common.account')}</CLabel>
                   </CCol>
                   <CCol sm="3">
                      <CSelect className ="flex-row" type="select" name="account" id="account-id"
                            value={account} onChange={handleInputChange} >
                        { console.log('accDataT', accData)}{ accData.hits.map(item => mapping(item))};
                      </CSelect>
                    </CCol>
                    <CCol sm="3">
                    <CSelect className ="flex-row" type="select" name="account2" id="account2-id"
                         value={account} onChange={handleInputChange} >
                       {accData.hits.map(item => mapping2(item))};
                    </CSelect>
                    </CCol>
                    <CCol sm="0.5">
                        <CLabel size="sm" htmlFor="input-small" style={{  align: 'right' }}>{t('common.from')}</CLabel>
                     </CCol>
                    <CCol sm="1.2">
                    <CInput  bsSize="sm" type="text"  id="fromPeriod-id" name="fromPeriod" className="input-sm"
                          placeholder="fromPeriod" value={fromPeriod} onChange={handleInputChange} />
                    </CCol>
                    <CCol sm="0.5">
                       <CLabel size="sm" htmlFor="input-small" style={{  align: 'right' }}>{t('common.to')}</CLabel>
                    </CCol>
                    <CCol sm="1.2">
                       <CInput  bsSize="sm" type="text"  id="toPeriod-id" name="toPeriod" className="input-sm"
                          placeholder="toPeriod" value={toPeriod} onChange={handleToPeriodChange}
                       />
                    </CCol>
                    <CCol sm="1">
                      <CButton type="submit" size="sm" color="primary" onClick={submitQuery}>
                          <i className="fa fa-dot-circle-o"></i>
                      </CButton>
                     </CCol>
                    </CFormGroup>
             </CCollapse>
           </CForm>
         </Grid>
          <EnhancedTable props={props} style={{padding: 0, height: 50}}/>
         </>;
  }

  return buildForm();

};
export default PACBForm;


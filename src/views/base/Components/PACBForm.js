import React, {useEffect, useState, useContext} from 'react'
import {CBadge, CButton, CCollapse, CCol, CForm, CLabel, CFormGroup, CInput, CSelect} from '@coreui/react'
import EnhancedTable from '../../Tables2/EnhancedTable';
import { StyledTableRow, StyledTableCell} from '../../Tables2/EnhancedTableHelper'
import {accountContext, useGlobalState} from './AccountContext';
import useFetch from "../../../utils/useFetch";
import Grid from "react-fast-grid";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {columnsPACB, filter, FormFactory, JournalFormHead} from "../../Tables2/LineFinancialsProps";
import {formEnum} from "../../../utils/FORMS";
import blue from "@material-ui/core/colors/blue";
import {styles, rowStyle, theme} from "../Tree/BasicTreeTableProps";
const PACBForm = () => {
  const { t,  } = useTranslation();
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [selected, setSelected] = useState([]);
  const [profile, ] = useGlobalState('profile');
  const [ , setUrl] = useState('');
  const value = useContext(accountContext);
  const [{ res}, ]= useFetch(value.url, {});
  const [{ res2},] = useFetch(value.accUrl, {});
  const data_ =  res?.hits?res.hits:[value.initialState];
  const init = ()=> {return value.initialState}
  const getData =()=> { return data?.hits?data.hits:init().hits}
  const accData_ =  res2?.hits?res2.hits:value.accData;
  //const current_= value.user;
  const current_= init().hits[0].query;
  const columns = value.headers
  const [current,setCurrent] = useState(current_);
  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [toolbar, setToolbar] = useState(true);

  const columnsX= columnsPACB(t);
  const getColumnName = ()=>columnsX.map(col =>col.field);
  const toggleToolbar= ()=> setToolbar(!toolbar );
  const toggle= ()=> setState({...state, collapse:!state.collapse });

  const url_=() =>value.url.concat('/')
        .concat(current.account).concat('/')
        .concat(current.fromPeriod).concat('/')
        .concat(current.toPeriod);

    const dx=data?.hits?data?.hits:value.initialState
    const [filteredRows, setFilteredRows] = useState(dx);
    useEffect(() => {handleFilter()}, [data]);

    function handleFilter(text) {
       const rows_=text?filter(getData(), getColumnName(), text ):getData()
       setFilteredRows(rows_);
    }

    const getFilteredRows=()=>{
        const row_=filteredRows?filteredRows:getData();
        const row = row_?.hits?row_?.hits?.slice():row_.slice();
        for(let i = 0, len = row.length-1; i <= len; ++i) {
            row[i] = {...row[i], balance: row[i].idebit + row[i].debit - (row[i].icredit + row[i].credit)};
         }
        console.log('rowx', row);
        return row;
    }

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
    const load = event => {
        event.preventDefault();
        accData?.hits?.length<2?
            value.submitQuery(event, value.accUrl, setAccData, value.initAcc):
            current.account&&current.fromPeriod&&current.toPeriod?
                value.submitQuery(event, url_(), setData, value.initialState): void(0)
    };


    const submitQuery = event => {
        event.preventDefault();
        accData?.hits?.length<2?
            value.submitQuery(event, value.accUrl, setAccData,value.initAcc):
            value.submitQuery(event, url_(), setData, value.initialState)
    };


  const submitEdit = event => {
    event.preventDefault();
    console.log("submitEdit1 current", current);
    setUrl(url_());
  };


  const reducerFn =(a,b)  => {
      console.log('a', a);
      console.log('init', init().hits[0]);
      return (
          {period: "", idebit: Number(b.idebit), debit: Number(a.debit) + Number(b.debit), icredit: Number(b.icredit)
              , credit: Number(a.credit) + Number(b.credit)
              , balance: Number(a.debit) + Number(b.debit) + Number(a.idebit) + Number(b.idebit)
                  - Number(a.credit) - Number(b.credit) - Number(a.icredit) - Number(b.icredit)
              , currency: b.currency, company: b.company})
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
        <Grid container spacing={2} style={{...styles.outer }} direction="column" >
            <JournalFormHead styles={styles} title={value.title} collapse={state.collapse}  initialState={value.initialState}
                             setData={setData} setAccData={setAccData} url={value.url} accUrl={value.accUrl}
                               submitQuery= {submitQuery} toggle={toggle}
                             load = {load} toggleToolbar={toggleToolbar}  />
            <FormFactory formid ={formEnum.PACB} current={current} setCurrent={setCurrent} t={t} accData={accData}
                         collapse={state.collapse} styles={styles} />

            <Grid container spacing={2} style={{...styles.inner, 'background-color':blue }} direction="column" >
                <EnhancedTable props={props} style={{padding: 0, height: 50}}/>
            </Grid>
        </Grid>
         </>
  }

  return buildForm();

};
export default PACBForm;


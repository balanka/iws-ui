import React, {useEffect, useState, useContext} from 'react'
import {accountContext, useGlobalState} from './AccountContext';
import useFetch from "../../../utils/useFetch";
import Grid from "react-fast-grid";
import {useTranslation} from "react-i18next";
import {FormFactory,JournalFormHead} from './FormsProps'
import {columnsPACB, filter, OptionsM} from "../../Tables2/LineFinancialsProps";
import {formEnum} from "../../../utils/FORMS";
import blue from "@material-ui/core/colors/blue";
import {styles, theme} from "../Tree/BasicTreeTableProps";
import EditableTable from "../../Tables2/EditableTable";
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
  const current_= init().hits[0].query;

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
    useEffect(() => {handleFilter()}, [data, handleFilter]);

    function handleFilter(text) {
       const rows_=text?filter(getData(), getColumnName(), text ):getData()
       setFilteredRows(rows_);
    }
    const summary =(data)=> {
        const row_=data;
        const row = row_?.hits?row_?.hits?.slice():row_.slice();
        let debit=0, credit=0, balance=0
        let currency=''
        let company=''
        const available=row.length>0
        for(let i = 0, len = row.length-1; i <= len; ++i) {
            debit=debit+row[i].debit
            credit=credit+row[i].credit
            balance=row[i].isDebit? (balance + debit-credit):(balance+credit-debit)
            currency = row[i].currency
            company = row[i].company
        }
        const len=row.length
        row[len] = {period:"Total", idebit:available?row[0].idebit:0, debit:debit, icredit:available?row[0].icredit:0
            , credit:credit, balance:balance, currency:currency,company:company  }
        return row
    }
    const getFilteredRows=()=>{
        const row_=filteredRows?filteredRows:getData();
        const row = row_?.hits?row_?.hits?.slice():row_.slice();
        for(let i = 0, len = row.length-1; i <= len; ++i) {
            row[i] = {...row[i], balance: row[i].idebit + row[i].debit - (row[i].icredit + row[i].credit)};
         }
        //console.log('rowx', row);
        return row;
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
    //console.log("submitEdit1 current", current);
    setUrl(url_());
  };


  function buildForm(){

    return <>
        <Grid container spacing={2} style={{...styles.outer }} direction="column" >
            <JournalFormHead styles={styles} title={value.title} collapse={state.collapse}  initialState={value.initialState}
                             setData={setData} setAccData={setAccData} url={value.url} accUrl={value.accUrl}
                                toggle={toggle}
                             load = {load} toggleToolbar={toggleToolbar}  />
            <FormFactory formid ={formEnum.PACB} current={current} setCurrent={setCurrent} t={t} accData={accData}
                         collapse={state.collapse} styles={styles} submitQuery= {submitQuery}/>

            <Grid container spacing={2} style={{...styles.inner, backgroundColor:blue }} direction="column" >
                <EditableTable Options={{...OptionsM, selection:false, toolbar:toolbar}}
                               data={data?summary(data):value.initialState.hits} columns={columnsX}
                               theme={theme} t={t} setSelectedRows ={()=>void(0)}/>
            </Grid>
        </Grid>
         </>
  }

  return buildForm();

};
export default PACBForm;
//<EnhancedTable props={props} style={{padding: 0, height: 50}}/>
//<EditableTable Options={{...OptionsM, selection:false, toolbar:toolbar}}  data={data?.hits?data.hits:value.initialState.hits}
//               columns={columns}   theme={theme} t={t}  reducerFn ={reducerFn} renderTotal={renderSummaryRow}
//               setSelectedRows ={()=>void(0)}/>
//

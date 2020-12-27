import React, {useEffect, useState, useContext} from 'react'
import EnhancedTable from '../../Tables2/EnhancedTable';
import {accountContext} from './AccountContext';
import useFetch from "../../../utils/useFetch";
import Grid from "react-fast-grid";
import { StyledTableRow, StyledTableCell} from '../../Tables2/EnhancedTableHelper'
import {OptionsM, columnsJ, filter, JournalFormHead, FormFactory} from '../../Tables2/LineFinancialsProps';
import {styles, rowStyle, theme} from "../Tree/BasicTreeTableProps";
import {formEnum} from "../../../utils/FORMS";
import blue from "@material-ui/core/colors/blue";

const JournalForm = () => {

  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [selected, setSelected] = useState([]);
  const value = useContext(accountContext);
  const t = value.t
  const [url, ] = useState('');
  const res  = useFetch(url, {});
  const init = ()=> {return value.initialState}
  const data_ = res && res.response?res.response:[value.initialState];
  const getData =()=> { return data?.hits?data.hits:init().hits}

  const [{ res2}] = useFetch(value.accUrl, {});
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
  const [account, setAccount ] = useState(account_);
  //const [account2, ] = useState('');
  const [fromPeriod, setFromPeriod ] = useState(fromPeriod_);
  const [toPeriod, setToPeriod] = useState(toPeriod_);
  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [filteredRows, setFilteredRows] = useState(data);
  const [toolbar, setToolbar] = useState(true);
  const [record,setRecord] = useState({account:'', account2:'', fromPeriod:'', toPeriod:''});
  useEffect(() => {}, [current, setCurrent]);
  useEffect(() => {setCurrent(current_)}, [ current_,account, fromPeriod, toPeriod]);
  useEffect(() => { setAccount(account_)}, [account_, current.account ]);
  useEffect(() => { setFromPeriod(fromPeriod_)}, [fromPeriod_]);
  useEffect(() => { setToPeriod(toPeriod_)}, [toPeriod_]);
  useEffect(() => {handleFilter('')}, [data, getData()]);


  const columnsX= columnsJ(t);
  const getColumnName = ()=>columnsX.map(col =>col.field);
  const toggleToolbar= ()=> setToolbar(!toolbar );
  const toggle= ()=> setState({...state, collapse:!state.collapse });


  const handleToPeriodChange = event => {
    setToPeriod(event.target.value);
    submitQuery(event);
    event.preventDefault();
  };

  const load = event => {
    console.log("loading", event);
    event.preventDefault();
    accData?.hits?.length<2?
        value.submitQuery(event, value.accUrl, setAccData, value.initAcc):void(0)
  };

  const submitQuery = event => {
    event.preventDefault();
    accData?.hits?.length<2?
        value.submitQuery(event, value.accUrl, setAccData,value.initAcc):void(0)
    const url_=value.url.concat('/')
      .concat(account).concat('/')
      .concat(fromPeriod).concat('/')
      .concat(toPeriod);
    console.log("url_", url_);
    value.submitQuery(event, url_, setData, value.initialState)

  };


  function handleFilter(text) {
      const rows_=text?filter(getData(), getColumnName(), text ):getData()
      setFilteredRows(rows_);
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

  function buildForm(current){
   // console.log("editing", editing);
    console.log("user1xxz", current);

    const props = { title: value.title, columns:value.headers, rows:getFilteredRows(), edit:edit, editable:false
      ,  submit:submitQuery, selected:selected, colId:10, initialState:value.initialState, renderDT:renderDT
      ,  reducerFn:reducerFn, renderTotal:renderTotal, setSelected: setSelected, cancel: cancelEdit
      ,  handleFilter: handleFilter, rowsPerPageOptions: [15, 25, 100]
    }
    return <>
      <Grid container spacing={2} style={{...styles.outer }} direction="column" >
        <JournalFormHead styles={styles} title={value.title} collapse={state.collapse}  initialState={value.initialState}
                        setData={setData} setAccData={setAccData} url={value.url} accUrl={value.accUrl}
                        cancelEdit ={cancelEdit}  submitQuery= {submitQuery} toggle={toggle}
                        load = {load} toggleToolbar={toggleToolbar}  />
        <FormFactory formid ={formEnum.JOURNAL} current={current} setCurrent={setCurrent} t={t} accData={accData}
                     collapse={state.collapse} styles={styles} />

        <Grid container spacing={2} style={{...styles.inner, 'background-color':blue }} direction="column" >
         <EnhancedTable props={props} style={{padding: 0, height: 50}}/>
        </Grid>
      </Grid>
    </>
  }

  return buildForm(current);

};
export default JournalForm;

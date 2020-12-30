import React, {useEffect, useState, useContext, createRef} from 'react'
import { CInput} from '@coreui/react'
import {accountContext} from './AccountContext';
import useFetch from "../../../utils/useFetch";
//import "react-datepicker/dist/react-datepicker.css";
import Grid from "react-fast-grid";
import EditableTable from "../../Tables2/EditableTable";
import {rowStyle, styles, theme} from "../Tree/BasicTreeTableProps";
import {
  Options,
  OptionsM,
  columnsF,
  Linescolumns,
  FinancialsFormHead, FormFactory
} from '../../Tables2/LineFinancialsProps'
import {formEnum} from "../../../utils/FORMS";
import blue from "@material-ui/core/colors/blue";
const FinancialsForm = () => {
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [module, setModule] = useState('');
  const value = useContext(accountContext);
  const t = value.t
  const [url,] = useState('');
  const tableRef = createRef();
  const res  = useFetch(url, {});
  const [{ res2}] = useFetch(value.accUrl, {});
  const [{ res3}] = useFetch(value.ccUrl, {});
  const init = ()=> {return value.initialState}
  const data_ = res && res.response?res.response:[value.initialState];
  const accData_=  res2?res2:value.accData;
  const ccData_=  res3?res3:value.ccData;
  const current_= value.user;
  const initLine=value.initialState.hits[0].lines[0];
  const [toolbar, setToolbar] = useState(false);
  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [ccData, setCcData] = useState(ccData_);
  const [current,setCurrent] = useState(current_);
  const columnsX = Linescolumns(accData.hits, initLine, current, t);
  const columns= columnsF(ccData.hits, initLine, current, t);
  const getColumnName = ()=>columns.map(col =>col.field);
  useEffect(() => {setCurrent(current_)}, [ current_]);

  const toggleToolbar = ()=> setToolbar(!toolbar );
  const toggle = ()=> setState({...state, collapse:!state.collapse });

  const modules=[{ id:'112', name:'Supplier invoice'}
                ,{ id:'114', name:'Payment'}
                ,{ id:'122', name:'Receivables'}
                ,{ id:'124', name:'Settlement'}
                ,{ id:'134', name:'General ledger'}]


  const initAdd =()=> {
    const row = {...value.initialState, editing:false};
    value.editRow(row, false);
    setCurrent(row);
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    initAdd();
    //setSelected([]);
  };


  const submitQuery = (event,modelid) => {
    accData?.hits?.length<2? value.submitQuery(event, value.accUrl, setAccData, accData_):void(0)
    ccData?.hits?.length<2? value.submitQuery(event, value.ccUrl, setCcData, ccData_):void(0)
    const url_=value.url.concat('/ftrmd/').concat(modelid);
    value.submitQuery(event, url_, setData, value.initialState);
  };
  const handleModuleChange = event => {
    event.preventDefault();
    const value = event.target.value
    setModule(value);
    submitQuery(event, value);
  };

  const addAmount =(row)=> {
    return {...row, total: row.lines.reduce((acc, line) => acc + line.amount, 0)}
  }

  const datax=() =>(data?.hits?data?.hits:init().hits).map( row =>addAmount(row));

  const edit = editedRow =>{
    const record = data.hits.find(obj => obj.tid === editedRow.tid);
    setCurrent({...record, editing:true});
  }

  const getCurrentRow =
    {tid:current_.id, oid:current_.oid, costcenter:current_.costcenter, account:current_.account
      , transdate:new Date(current_.transdate), enterdate:current_.enterdate, postingdate:current_.postingdate
      , period:current_.period, posted:current_.posted, modelid:current_.modelid, company:current_.company, text:current_.text
      , typeJournal:current_.typeJournal, file_content:current_.file_content, lines:current_.lines};

  const submitPost = event => {
    event.preventDefault();
    const row =getCurrentRow
    console.log("submitPost current", row);
    setCurrent(row);
    value.submitPost([row]);
    console.log("submitEdit current", current);
  };

  const getCurrentMonth = (date)=>{
    const p=date.getUTCMonth()+1;
    return p<=10?"0".concat(p.toString()):p.toString();
  }
  const getCurrentDate = ()=>{return new Date()}
  const getPeriod = (date ) => {return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))};

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

    const row = {tid:current_.id, oid:current_.oid, costcenter:current_.costcenter, account:current_.account
      , transdate:new Date(current_.transdate).toISOString(), enterdate:new Date().toISOString()
      , postingdate:new Date().toISOString(), period:getPeriod(getCurrentDate()), posted:current_.posted
      , modelid:current_.modelid, company:current_.company, text:current_.text, typeJournal:current_.typeJournal
      , file_content:current_.file_content, lines:[] };

    console.log('submitAdd row', row);
    value.submitAdd(row, data);
    setCurrent(row);
   // console.log('submitAdd current', current);
  };

  const onNewLine =() => {
    const ref = tableRef.current
    ref.dataManager.changeRowEditing();
    ref.setState({ ...ref.dataManager.getRenderState(),
      showAddRow: !ref.state.showAddRow,
    });
  }

const addRow = (newData) =>{
    if(newData ) {
      const dx = {...current};
      dx.lines[dx.lines.length] = newData;
      setCurrent({...dx});
    }
  }
  const updateRow = (newData, oldData) =>{
    if (oldData) {
      const dx = {...current};
      const index = dx.lines.findIndex(obj => obj.lid === newData.lid);
      dx.lines[index] = {...newData};
      setCurrent({...dx});
    }
  }
  const deleteRow = (oldData) =>{
    if (oldData) {
      const dx = {...current};
      const index =dx.lines.findIndex(obj => obj.lid === oldData.lid);
      const deleted = dx.lines[index];
      dx.lines[index] = {...deleted, transid:-2 };
      setCurrent({...dx});
    }
  }
 const  editable = () => ({
   onRowAdd: async (newData) => addRow(newData),
   onRowUpdate: async (newData, oldData) => updateRow(newData, oldData),
   onRowDelete: async (oldData) => deleteRow(oldData)
 })

  function buildForm( current){
    const lines_=()=>current.lines&&current.lines.length >0 ? current.lines:[value.initialState.hits[0].lines[0]];
    const LinesFinancials = () =>  (<>
      <EditableTable id="LineTable" Options ={{...Options, paging:lines_().length>5}} flag={current.posted} data={lines_()} columns={columnsX} editable={editable()}
                     rowStyle={rowStyle} selected ={[-1]} theme={theme} t={t}  tableRef={tableRef} edit ={null}
      />
      <CInput disabled={current.posted} bsSize="sm" type="textarea" id="text-input" name="text" className="input-sm"
              placeholder="text" value={current.text} onChange={(event)  =>
          setCurrent({ ...current, text: event.target.value})} />
       </>
      )

    return <>

      <Grid container spacing={2} style={{...styles.outer }} direction="column" >
        <FinancialsFormHead styles={styles} title={value.title}  collapse={state.collapse} initAdd ={initAdd}
                        setData={setData} setAccData={setAccData} url={value.url} accUrl={value.accUrl}
                        initialState={value.initialState} cancelEdit ={cancelEdit} submitEdit={submitEdit}
                        module ={module}  modules ={modules} handleModuleChange={handleModuleChange}
                        onNewLine={onNewLine}
                        submitQuery= {submitQuery} toggle={toggle} toggleToolbar={toggleToolbar}  />
        <FormFactory formid ={formEnum.FINANCIALS} current={current} setCurrent={setCurrent} t={t} accData={accData}
                     ccData={ccData}  styles={styles}  table={LinesFinancials} onNewLine={onNewLine}
                     collapse={state.collapse}
         />
        <Grid container spacing={2} style={{...styles.inner, 'background-color':blue }} direction="column" >
          <EditableTable Options={{...OptionsM, toolbar:toolbar}} flag={current.posted} data={datax()}
                         columns={columns} rowStyle={rowStyle}  theme={theme} t={t}  edit ={edit}
                         style={{'padding-top':20, height: 50}}/>
        </Grid>
      </Grid>
    </>

  }

  return buildForm( current);

};
export default FinancialsForm;





import React, {useEffect, useState, createRef, memo} from 'react'
import { CInput} from '@coreui/react'
import Grid from "react-fast-grid";
import EditableTable from "../../Tables2/EditableTable";
import {styles} from "../Tree/BasicTreeTableProps";
import {Add, Edit, EditRow, Post, Query} from './CrudController';
import {Options, OptionsM, columnsF, Linescolumns
} from '../../Tables2/LineFinancialsProps'
import {FinancialsFormHead, FormFactory} from './FormsProps'
import {formEnum} from "../../../utils/FORMS";
import {useGlobalState} from "./Menu";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

const FinancialsForm2 = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [profile, ] = useGlobalState('profile');
  const [selected, ] = useGlobalState('selected');
  let history = useHistory()
  const [menu, ] = useGlobalState('menu');
  const datax_ =  profile?.modules?profile.modules:[];
  const module_= menu.get(selected);
  const modules_=(datax_.includes(module_.id)|| (module_.id==="0"))?module_:menu.get('/login')
  if(modules_.id==='0') history.push("/login");
  const module=modules_
  const url=SERVER_URL.concat(module.ctx)
  const accUrl=SERVER_URL.concat(module.ctx1)
  const ccUrl=SERVER_URL.concat(module.ctx2)
  const initCc = module.state2
  const initAcc = module.state1
  const initialState = module.state
  const current_= initialState[0]
  const title =module.title
  const { t,  } = useTranslation();

  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [rows, setRows] =useState([])
  const [model, setModel] = useState('');
  const tableRef = createRef();
  const initLine=initialState[0].lines[0];
  const [toolbar, setToolbar] = useState(false);
  const [data, setData] = useState(initialState);
  const [accData, setAccData] = useState(initAcc);
  const [ccData, setCcData] = useState(initCc);
  const [current,setCurrent] = useState(current_);
  const columnsX = Linescolumns(accData, initLine, current, t);
  const columns= columnsF(ccData, initLine, current, t);
  useEffect(() => {setCurrent(current_)}, [ current_]);

  const toggleToolbar = ()=> setToolbar(!toolbar );
  const toggle = ()=> setState({...state, collapse:!state.collapse });
  const setSelectedRows = (rows_)=>setRows(rows_.map( (item) =>({id:item.tid,  modelid:item.modelid})))

  const models=[{ id:'112', name:'Supplier invoice'}
                ,{ id:'114', name:'Payment'}
                ,{ id:'122', name:'Receivables'}
                ,{ id:'124', name:'Settlement'}
                ,{ id:'134', name:'General ledger'}]

  const initAdd =()=> EditRow({...initialState, editing:false}, false, setCurrent);


  const cancelEdit = (e) => {
    e.preventDefault();
    initAdd();
  };

  const isEmpty = (str) => (!str || 0 === str.length);
  const submitQuery =(event, modelid)=>{
    event.preventDefault();
    const url_=url.concat('/ftrmd/').concat(modelid);
    !isEmpty(accUrl)&&accData?.length<2&&Query(event, accUrl, profile, history, setAccData, initAcc);
    !isEmpty(ccUrl)&&ccData.length<2&&Query(event, ccUrl, profile, history, setCcData, initCc);
    !isEmpty(url_)&&Query(event, url_, profile, history, setData, initialState);
  }
  const handleModuleChange = event => {
    event.preventDefault();
    setModel(event.target.value);
    submitQuery(event, event.target.value);
  };

  const addAmount = row => ({...row, total: row.lines.reduce((acc, line) => acc + line.amount, 0)})
  const datax=() =>(data).map( row =>addAmount(row));

  const edit = editedRow =>{
    const record = data.find(obj => obj.tid === editedRow.tid);
    setCurrent({...record, editing:true});
  }

  const submitPost = event => {
    event.preventDefault();
    Post(url, profile, [current.id], "/post");
  };

  const submitCopy = event => {
    event.preventDefault();
    Post(url, profile, rows, "/copy");
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
       Edit(url, profile, row, data, setCurrent);
    } else submitAdd(event)
  };

  const submitAdd = event => {
    event.preventDefault();

    const row = {tid:current_.id, oid:current_.oid, costcenter:current_.costcenter, account:current_.account
      , transdate:new Date(current_.transdate).toISOString(), enterdate:new Date().toISOString()
      , postingdate:new Date().toISOString(), period:getPeriod(getCurrentDate()), posted:current_.posted
      , modelid:current_.modelid, company:current_.company, text:current_.text, typeJournal:current_.typeJournal
      , file_content:current_.file_content, lines:[] };
    Add(url, profile, row, data, initialState, setCurrent);

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
    const lines_=()=>current.lines&&current.lines.length >0 ? current.lines:[initialState[0].lines[0]];
    const LinesFinancials = () =>  (<>
      <EditableTable id="LineTable" Options ={{...Options, paging:lines_().length>5}} flag={current.posted} data={lines_()}
                     columns={columnsX} editable={editable()}  t={t}
                     tableRef={tableRef} />
      <CInput disabled={current.posted} bsSize="sm" type="textarea" id="text-input" name="text" className="input-sm"
              placeholder="text" value={current.text} onChange={(event)  =>
          setCurrent({ ...current, text: event.target.value})} />
       </>
      )

    const parentChildData =(row, rows) => rows.find(a => a.tid === row.transid)
    return <>
      <Grid container spacing={2} style={{...styles.outer , display:'block'}} direction="column" >
        <FinancialsFormHead styles={styles} title={title}  collapse={state.collapse} initAdd ={initAdd}
                        setData={setData} setAccData={setAccData} url={url} accUrl={accUrl}
                        initialState={initialState} cancelEdit ={cancelEdit} submitEdit={submitEdit}
                        module ={model}  modules ={models} handleModuleChange={handleModuleChange}
                        onNewLine={onNewLine} submitPost={submitPost} submitCopy={submitCopy}
                        submitQuery= {submitQuery} toggle={toggle} toggleToolbar={toggleToolbar}  />
        <FormFactory formid ={formEnum.FINANCIALS} current={current} setCurrent={setCurrent} t={t} accData={accData}
                     ccData={ccData}  styles={styles}  table={LinesFinancials} onNewLine={onNewLine}
                     collapse={state.collapse}
         />
          <EditableTable Options={{...OptionsM, toolbar:toolbar, maxBodyHeight: "960px", pageSize:5
            , pageSizeOptions:[5,10, 20, 50]}} flag={current.posted} data={datax()}
            columns={columns}  t={t}  edit ={edit} setSelectedRows ={setSelectedRows} parentChildData={parentChildData}/>

      </Grid>
    </>

  }

  return buildForm( current);

};
export default memo(FinancialsForm2);





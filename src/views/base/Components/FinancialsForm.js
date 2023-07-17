import React, {createRef, useCallback, useEffect, useState} from 'react'
import {CInput} from '@coreui/react'
import Grid from "react-fast-grid";
import EditableTable from "../../Tables2/EditableTable";
import {styles} from "../Tree/BasicTreeTableProps";
import {Add, Edit, EditRow, Get, Get1, Get2, Post} from './CrudController';
import {columnsF, Linescolumns, Options, OptionsM} from '../../Tables2/LineFinancialsProps'
import {FinancialsFormHead, FormFactory} from './FormsProps'
import {formEnum} from "../../../utils/FORMS";
import {ACCOUNT, COSTCENTER, LoginMenu, MASTERFILE, useGlobalState, useStore} from "./Menu";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import iwsStore from './Store';

//import useKeyPress from "./useKeyPress";

const FinancialsForm = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { profile,  } = useStore()
  const { token  } = profile
  const [selected, ] = useGlobalState('selected');
  let history = useHistory();
  const { t,  } = useTranslation();
  const [menu, ] = useGlobalState('menu');
  const datax_ =  profile?.modules?profile.modules:[];
  const module_= menu.get(selected);
  const modules_=(module_!==undefined)&&(datax_.includes(module_.id)|| (module_.id==="0"))?module_:LoginMenu(t)
  if(modules_.id==='0') history.push("/login");
  const module_x=modules_;
  const modifyUrl=SERVER_URL.concat(selected)

  const url=SERVER_URL.concat(module_x.ctx);
  const accUrl=SERVER_URL.concat(MASTERFILE.accURL);
  const ccUrl=SERVER_URL.concat(MASTERFILE.ccURL);
  const acc_modelid=parseInt(ACCOUNT(t).id);
  const cc_modelid=parseInt(COSTCENTER(t).id);

  const initCc = module_x.state2;
  const initAcc = module_x.state1;
  const initialState = module_x.state;
  const current_= initialState[0];
  console.log('current_',current_)
  const title =module_x.title;
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [rows, setRows] =useState([])
  const [model, setModel] = useState('');
  const tableRef = createRef();
  const initLine=initialState[0].lines[0];
  const [toolbar, setToolbar] = useState(false);
  const [current,setCurrent] = useState(current_);

  const [iwsState, setIwsState] = useState(iwsStore.initialState);
  const data_ = iwsState.get(parseInt(model));
  const data  = ()=>data_?data_:initialState;
  //useEffect(() => {}, [current, data ]);
  useEffect(() => {
    iwsStore.subscribe(setIwsState);
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);
    

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [ current, model, iwsState]);

  const accData = iwsState.get(acc_modelid)?iwsState.get(acc_modelid):[...initAcc];
  const ccData = iwsState.get(cc_modelid)?iwsState.get(cc_modelid):[...initCc];
  const columnsX = Linescolumns(accData, initLine, current, t);
  const columns= columnsF(ccData, initLine, current, t);
/*
  const onKeyPress = (event) => {
    console.log(`key pressed: ${event.key}`);
  };

  useKeyPress(['a', 'b', 'c', 's'], onKeyPress,  node = null);

 */
  const handleKeyPress = useCallback((event) => {
    if (event.ctrlKey && (event.key === "s"||event.key === "S")) {
      submitEdit(event);
      //event.preventDefault();
      console.log(`Key pressed: ${event.key}`);
    }
  }, []);

  const toggleToolbar = ()=> setToolbar(!toolbar );
  const toggle = ()=> setState({...state, collapse:!state.collapse });
  const setSelectedRows = (rows_)=>setRows(rows_.map( (item) =>({id:item.id,  modelid:item.modelid})))


  const models=[
     { id:'112', name:'Supplier invoice', account:'1810', isDebit:false}
    ,{ id:'114', name:'Payment', account:'1810', isDebit:false}
    ,{ id:'122', name:'Receivables', account:'1810', isDebit:false}
    ,{ id:'124', name:'Settlement', account:'1810', isDebit:true}
    ,{ id:'134', name:'General ledger', account:'1810', isDebit:false}]

  const initAdd =()=> EditRow({...current_, editing:false}, true, setCurrent);


  const cancelEdit = (e) => {
    e.preventDefault();
    initAdd();
  };

  const submitQuery =(event, modelid)=> {
    event.preventDefault();
    const url_=url.concat('/').concat(modelid);
    accUrl&&Get1(accUrl, token, history,  iwsStore, acc_modelid);
    ccUrl&&Get1(ccUrl, token, history,   iwsStore, cc_modelid);
    url_&&Get1(url_, token, history,   iwsStore, parseInt(modelid));
  }
  const handleModuleChange = event => {
    event.preventDefault();
    setModel(event.target.value);
    submitQuery(event, event.target.value);
  };

  const buildAmount = row => ({...row, total: row.lines.reduce((acc, line) => acc + line.amount, 0)});
  const buildData = () => data().map( row =>buildAmount(row));

  const edit = editedRow =>{
    const data = iwsState.get(editedRow.modelid)
    const record = data.find(obj => obj.id === editedRow.id);
    console.log('record',record);
    setCurrent({...record, editing:true});
  }

  const submitPost = event => {
    event.preventDefault();
    const url_ = modifyUrl.concat("/post/").concat(current.id).concat("/").concat(current.company);
    Get(url_, token, history);
  };

  const submitCopy = event => {
    event.preventDefault();
    const url_ = modifyUrl.concat("/copy")
    Post(url_, token, rows, "/copy");
  };

  const getCurrentMonth = (date)=>{
    const p=date.getUTCMonth()+1;
    return p<=10?"0".concat(p.toString()):p.toString();
  }
  const getPeriod = (date ) => {return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))};

  const toggleEdit = ()=>{
    if(current?.editing){
      delete current.editing;
    }
  }
  const submitEdit = event => {
    event.preventDefault();
    if(current.id >0) {
      toggleEdit();
      console.log('current',current);
      Edit(modifyUrl, token, current, data(), setCurrent);
      const url_= modifyUrl.concat('/').concat(current.company).concat('/').concat(current.id);
      const row = Get2(url_, token, iwsStore);
      console.log('row', row);
      console.log('current',current);
      //setCurrent(current);
    } else {
      toggleEdit();
      console.log('adding',current)
      submitAdd(event)
    }
  };

  const submitAdd = event => {
    event.preventDefault();
    const row = {id:current.id, oid:current.oid, id2:current.id2, costcenter:current.costcenter, account:current.account
      , transdate:new Date(current.transdate).toISOString(), enterdate:new Date().toISOString()
      , postingdate:new Date().toISOString(), period:getPeriod(new Date()), posted:current.posted
      , modelid:parseInt(model), company:current.company, text:current.text, typeJournal:current.typeJournal
      , file_content:current.file_content, lines:current.lines };
    Add(modifyUrl, token, row, data(), initialState, setCurrent);

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
    const model_ = models.find(obj => obj.id === model);
    const account_ = model_?model_.account:undefined;
    const accountLabel_= model_.isDebit?'account':'oaccount';
    const dx1 =current.lines.length===0?
      {...current, lines:[{...current.lines.filter(e=>!e.account.isEmpty), ...newData
        , id:-1, transid:current.id, transid2:'',[accountLabel_]:account_}]}:
      (dx.lines[current.lines.length] = {...newData, id:-1, transid:current.id, transid2:'', [accountLabel_]:account_})
    const record = (current.lines.length>1)?dx:dx1;
    console.log('record', record);
    console.log('token', token);
      const rx = delete record.editing;
    // Add (modifyUrl, token, record, data(), initialState, setCurrent)
    Edit(modifyUrl, token, record, data(), setCurrent);
      const url_= modifyUrl.concat('/').concat(current.company).concat('/').concat(current.id);
      const row = Get2(url_, token, iwsStore);
      console.log('state', iwsState.get(row.modelid));
      console.log('row', row);
      console.log('current',current);
    }
  }
  const updateRow = (newData, oldData) =>{
    if (oldData) {
      const dx = {...current};
      const idx = dx.lines.findIndex(obj => obj.id === newData.id);
      const rx = delete newData.tableData;
      (idx === -1)? dx.lines.push({...newData, transid: dx.id}): dx.lines[idx]={...newData, transid: dx.id};
      console.log('dx', dx);
      Edit(modifyUrl, token, dx, data(), setCurrent);
    }
  }
  const deleteRow = (oldData) =>{
    if (oldData) {
      const dx = {...current};
      const index =dx.lines.findIndex(obj => obj.id === oldData.id);
      const deleted = dx.lines[index];
      console.log('deleted', deleted);
      dx.lines[index] = {...deleted, transid:-2 };
      const record ={...dx}
      console.log('dx', dx);
      console.log('record', record);
      const url_= modifyUrl.concat('/').concat(current.company).concat('/').concat(current.id);
      const row = Get2(url_, token, iwsStore);
      console.log('current',current);
    }
  }
  const  editable = () => ({
    onRowAdd: async (newData) => addRow(newData),
    onRowUpdate: async (newData, oldData) => updateRow(newData, oldData),
    onRowDelete: async (oldData) => deleteRow(oldData)
  })
  function buildForm( current){

    console.log('iwsState', iwsState);
    const accd= iwsState.get(acc_modelid)?iwsState.get(acc_modelid):[...initAcc];
    const ccd= iwsState.get(cc_modelid)?iwsState.get(cc_modelid):[...initCc];

    const lines_=()=>Array.isArray(current.lines)&&current.lines.length >0 ? current.lines:[initLine];
    const LinesFinancials = () =>  (<>
          <EditableTable id="LineTable" Options ={{...Options, paging:lines_().length>5}} flag={current.posted} data={lines_()}
                         columns={columnsX} editable={editable()}  t={t}
                         tableRef={tableRef} />
          <CInput disabled={current.posted} bssize="sm" type="textarea" id="text-input" name="text" className="input-sm"
                  placeholder="text" value={current.text} onChange={(event)  =>
              setCurrent({ ...current, text: event.target.value})} />
        </>
    )

    const parentChildData =(row, rows) => Array.isArray(rows)&&rows.length >0 ?rows.find(a => a?.id === row.transid):rows


    return <>
      <Grid container spacing={2} style={{...styles.outer , display:'block'}} direction="column" >
        <FinancialsFormHead styles={styles} title={title}  collapse={state.collapse} initAdd ={initAdd}
                             url={url} accUrl={accUrl}
                            initialState={initialState} cancelEdit ={cancelEdit} submitEdit={submitEdit}
                            module ={model}  modules ={models} handleModuleChange={handleModuleChange}
                            onNewLine={onNewLine} submitPost={submitPost} submitCopy={submitCopy}
                            submitQuery= {submitQuery} toggle={toggle} toggleToolbar={toggleToolbar}  />
        <FormFactory formid ={formEnum.FINANCIALS} current={current} setCurrent={setCurrent} t={t} accData={accd}
                     ccData={ccd}  styles={styles}  table={LinesFinancials} onNewLine={onNewLine}
                     collapse={state.collapse}
        />
        <EditableTable Options={{...OptionsM, toolbar:toolbar, maxBodyHeight: "960px", pageSize:5
          , pageSizeOptions:[5,10, 20, 50]}} flag={current.posted} data={buildData()} columns={columns}
          t={t}  edit ={edit} setSelectedRows ={setSelectedRows} parentChildData={parentChildData}/>

      </Grid>
    </>
  }
  return buildForm( current);
};
export default FinancialsForm;





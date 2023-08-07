import React, {createRef, useCallback,  useLayoutEffect, useState} from 'react'
import {CInput} from '@coreui/react'
import Grid from "react-fast-grid";
import EditableTable from "../../Tables2/EditableTable";
import {styles} from "../Tree/BasicTreeTableProps";
import {Add, Edit, EditRow, Get1, Get2, Post} from './CrudController';
import {columnsF, Linescolumns, Options, OptionsM} from '../../Tables2/LineFinancialsProps'
import {FinancialsFormHead, FormFactory} from './FormsProps'
import {formEnum} from "../../../utils/FORMS";
import {ACCOUNT, COSTCENTER, LoginMenu, MASTERFILE, useGlobalState, useStore} from "./Menu";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import iwsStore from './Store';

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

  const title =module_x.title;
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [rows, setRows] =useState([])
  const [model, setModel] = useState('');
  const tableRef = createRef();
  const initLine=initialState[0].lines[0];
  const [toolbar, setToolbar] = useState(false);
  const [current, setCurrent] = useState(current_);
  const [iwsState, setIwsState] = useState(iwsStore.initialState);
  const data_ = iwsState.get(parseInt(model));
  const data  = ()=>data_?data_:initialState;

  const toggleEdit = ()=>{
    if(current?.editing){
      delete current.editing;
    }
  }

  const onNewLine =() => {
    const ref = tableRef.current
    ref.dataManager.changeRowEditing();
    ref.setState({ ...ref.dataManager.getRenderState(),
      showAddRow: !ref.state.showAddRow,
    });
  }
  const submitEdit = event => {
    event.preventDefault();
    toggleEdit();
    if(current.id >0) {
      Edit(modifyUrl, token, current, data(), setCurrent);
    } else {
      submitAdd(event)
    }
  };

  const handleKeyPress = useCallback((event) => {
    if (event.ctrlKey && (event.key === "s"||event.key === "S")) {
      submitEdit(event);
    }else if(event.ctrlKey && (event.key === "l"||event.key === "L")) {
      onNewLine();
    }
  }, );

  useLayoutEffect(() => {
      iwsStore.subscribe(setIwsState);
      // attach the event listener
      document.addEventListener('keydown', handleKeyPress);
    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [ current, model, data_, handleKeyPress]);

  const models=[
    { id:'112', name:'Supplier invoice', account:'1810', isDebit:false}
    ,{ id:'114', name:'Payment', account:'1810', isDebit:false}
    ,{ id:'122', name:'Receivables', account:'1810', isDebit:false}
    ,{ id:'124', name:'Settlement', account:'1810', isDebit:true}
    ,{ id:'134', name:'General ledger', account:'1810', isDebit:false}]

  const accData = iwsState.get(acc_modelid)?iwsState.get(acc_modelid):[...initAcc];
  const ccData = iwsState.get(cc_modelid)?iwsState.get(cc_modelid):[...initCc];
  const columnsX = Linescolumns(accData, initLine, current, models, model,  t);
  const columns= columnsF(ccData, initLine, current, t);

  const reload = ()=> {
    iwsStore.deleteKey(current.modelid );
    const url_=url.concat('/').concat(current.modelid);
    url_&&Get1(url_, token,  iwsStore, parseInt(current.modelid));
  }
  const toggleToolbar = ()=> setToolbar(!toolbar );
  const toggle = ()=> setState({...state, collapse:!state.collapse });
  const setSelectedRows = (rows_)=>setRows(rows_.map( (item) =>({id:item.id,  modelid:item.modelid})))

  function getAccountAndLabel() {
    const model_ = models.find(obj => obj.id === model);
    const account_ = model_ ? model_.account : undefined;
    const accountLabel_ = model_.isDebit ? 'account' : 'oaccount';
    return {account_, accountLabel_};
  }

  const initAdd =()=> {
    const {account_, accountLabel_} = getAccountAndLabel();
    const line =[{...current_.lines[0], id:-1, transid:current_.id1,  [accountLabel_]:account_}]
    const record = {...current_, lines:line}
    EditRow(record, true, setCurrent);
  }

  const cancelEdit = (e) => {
    e.preventDefault();
    initAdd();
  };

  const submitQuery =(event, modelid)=> {
    event.preventDefault();
    const url_=url.concat('/').concat(modelid);
    accUrl&&Get1(accUrl, token,  iwsStore, acc_modelid);
    ccUrl&&Get1(ccUrl, token, iwsStore, cc_modelid);
    url_&&Get1(url_, token,  iwsStore, parseInt(modelid));
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
    setCurrent({...record, editing:true});
  }

  const submitPost = event => {
    event.preventDefault();
    const url_ = modifyUrl.concat("/post/").concat(current.id).concat("/").concat(current.company);
    Get2(url_, token, iwsStore, setCurrent);
  };

  const submitCopy = event => {
    event.preventDefault();
    const url_ = modifyUrl.concat("/copy")
    Post(url_, token, rows);
  };

  const getCurrentMonth = (date)=>{
    const p=date.getUTCMonth()+1;
    return p<=10?"0".concat(p.toString()):p.toString();
  }
  const getPeriod = (date ) => {return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))};


  const submitAdd = event => {
    event.preventDefault();

    const row = {id:current.id, oid:current.oid, id1:current.id1, costcenter:current.costcenter, account:current.account
      , transdate:new Date(current.transdate).toISOString(), enterdate:new Date().toISOString()
      , postingdate:new Date().toISOString(), period:getPeriod(new Date()), posted:current.posted
      , modelid:parseInt(model), company:current.company, text:current.text, typeJournal:current.typeJournal
      , file_content:current.file_content, lines:current.lines };
      Add(modifyUrl, token, row, data(), setCurrent);

  };

  const addRow = (newData) =>{
    if(newData ) {
    const {account_, accountLabel_} = getAccountAndLabel();
    const dx = {...current};
    const dx1 =current.lines.length===0?
      {...current, lines:[{...current.lines.filter(e=>!e.account.isEmpty), ...newData
        , id:-1, transid:current.id1, [accountLabel_]:account_}]}:
      (dx.lines[current.lines.length] = {...newData, id:-1, transid:current.id1,  [accountLabel_]:account_})
    const record = (current.lines.length>1)?dx:dx1;
    delete record.editing;
    const result= record.id>0?Edit(modifyUrl, token, record, data(), setCurrent):
                              Add(modifyUrl, token, record, data(), setCurrent)
      setCurrent(result);
    }
  }
  const updateRow = async (newData, oldData) =>{
    if (oldData) {
      const dx = {...current};
      const idx = dx.lines.findIndex(obj => obj.id === newData.id);
      delete newData.tableData;
      (idx === -1)? dx.lines.push({...newData, transid: dx.id1}): dx.lines[idx]={...newData, transid: dx.id1};
      delete dx.editing;
      if(dx.id>0) {
        Edit(modifyUrl, token, dx, data(),  setCurrent);
      }else{
        Add(modifyUrl, token, dx, data(),  setCurrent);
      }
    }
  }
  const deleteRow = async (oldData) =>{
    if (oldData) {
      const dx = {...current};
      const index =dx.lines.findIndex(obj => obj.id === oldData.id);
      const deleted = dx.lines[index];
      console.log('deleted', deleted);
      dx.lines[index] = {...deleted, transid:-2 };
      Edit(modifyUrl, token, dx, data(), setCurrent);
    }
  }
  const OnRowAdd = async (newData) => addRow(newData)
  const  editable = () => ({onRowAdd: OnRowAdd, onRowUpdate:  updateRow, onRowDelete:  deleteRow})
  function buildForm( current){

    const accd= iwsState.get(acc_modelid)?iwsState.get(acc_modelid):[...initAcc];
    const ccd= iwsState.get(cc_modelid)?iwsState.get(cc_modelid):[...initCc];

    const lines_=()=> Array.isArray(current.lines)&&current.lines.length >0 ? current.lines:[initLine];

    const LinesFinancials = () =>  {
      return (<>
          <EditableTable id="LineTable" Options ={{...Options, paging:lines_().length>5}} flag={current.posted} data={lines_()}
                         columns={ columnsX} editable={editable()}  t={t}
                         tableRef={tableRef} />
          <CInput disabled={current.posted} bssize="sm" type="textarea" id="text-input" name="text" className="input-sm"
                  placeholder="text" value={current.text} onChange={(event)  =>
            setCurrent({ ...current, text: event.target.value})} />
        </>
      )
    }

    const parentChildData =(row, rows) => Array.isArray(rows)&&rows.length >0 ?rows.find(a => a?.id === row.transid):rows


    return <>
      <Grid container spacing={2} style={{...styles.outer , display:'block'}} direction="column" >
        <FinancialsFormHead styles={styles} title={title}  collapse={state.collapse} initAdd ={initAdd}
                             url={url} accUrl={accUrl}
                            initialState={initialState} cancelEdit ={cancelEdit} submitEdit={submitEdit}
                            module ={model}  modules ={models} handleModuleChange={handleModuleChange}
                            onNewLine={onNewLine} submitPost={submitPost} submitCopy={submitCopy} reload={reload}
                             toggle={toggle} toggleToolbar={toggleToolbar}  current={current} />
        <FormFactory formid ={formEnum.FINANCIALS} current={current} current_={current_} setCurrent={setCurrent} t={t} accData={accd}
                     ccData={ccd}  styles={styles}  table={LinesFinancials} onNewLine={onNewLine}
                     collapse={state.collapse}
        />
        <EditableTable Options={{...OptionsM, toolbar:toolbar, maxBodyHeight: "960px", pageSize:10
          , pageSizeOptions:[10, 20, 50]}} flag={current?current.posted:false} data={buildData()} columns={columns}
          t={t}  edit ={edit} setSelectedRows ={setSelectedRows} parentChildData={parentChildData}/>

      </Grid>
    </>
  }
  const currentx= current?current:current_;
  return buildForm( currentx);
};
export default FinancialsForm;





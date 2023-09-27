import React, {createRef, useCallback, useLayoutEffect, useRef, useState} from 'react'
import {CInput} from '@coreui/react'
import Grid from "react-fast-grid";
import EditableTable from "../../Tables2/EditableTable";
import {styles} from "../Tree/BasicTreeTableProps";
import {Add, Edit, EditRow, Get1, Get2, Post} from './CrudController';
import {buildExportOption, columnsF, Linescolumns,  Options} from '../../Tables2/LineFinancialsProps'
import {FinancialsFormHead, FormFactory} from './FormsProps'
import {formEnum} from "../../../utils/FORMS";
import {ACCOUNT, COSTCENTER, FMODULE, MASTERFILE, useStore} from "./Menu";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import iwsStore from './Store';

const FinancialsForm = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { profile, selected, menu,  } = useStore();
  const { token, company, locale, currency } = profile
  let history = useHistory();
  const { t,  } = useTranslation();
  console.log('menu', menu);
  console.log('selected', selected);
  const userMenu =  profile?.modules?profile.modules:[];
  const module_= menu.get(selected);
  console.log('module_', module_);
  console.log('userMenu', userMenu);

  if ((typeof module_ === "undefined") || !module_ || module_.id === '11111') history.push("/login");

  const module_x= module_;
  const modifyUrl=SERVER_URL.concat(selected)
  const url=SERVER_URL.concat(module_x.ctx).concat("/").concat(company);
  const accUrl=SERVER_URL.concat(MASTERFILE.acc).concat("/").concat(company);
  const ccUrl=SERVER_URL.concat(MASTERFILE.cc).concat("/").concat(company);
  const fmoduleUrl=SERVER_URL.concat(MASTERFILE.fmodule).concat("/").concat(company);
  const acc_modelid=parseInt(ACCOUNT(t).id);
  const cc_modelid=parseInt(COSTCENTER(t).id);
  const fmodule_modelid=parseInt(FMODULE(t).id);
  const initCc = module_x.state2;
  const initAcc = module_x.state1;
  const initialState = module_x.state;
  const current_= initialState[0];
  let title_ = t(module_x.title);
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [rows, setRows] =useState([])
  const [model, setModel] = useState('');
  const [title, setTitle] = useState(title_);
  const tableRef = createRef();
  const initLine = initialState[0].lines[0];
  const [toolbar, setToolbar] = useState(false);
  const [current, setCurrent] = useState(current_);
  const [iwsState, setIwsState] = useState(iwsStore.initialState);
  const data_ = iwsState.get(parseInt(model));
  const data  = ()=>data_?data_:initialState;
  const fModuleData = iwsState.get(fmodule_modelid)??[];
  const accData = iwsState.get(acc_modelid)??[...initAcc];
  const ccData = iwsState.get(cc_modelid)??[...initCc];

  const columnsX = Linescolumns(accData, initLine, current, fModuleData, model,  t, locale, currency);
  const columns = columnsF(ccData, initLine, current, t, locale, currency);

  const toggleEdit = ()=>{
    if(current?.editing){
      delete current.editing;
    }
  }

  const onNewLine = () => {
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
  let init = useRef(false)
  useLayoutEffect(() => {
    if (!init.current) {
      iwsStore.subscribe(setIwsState);
      init.current = true
      Get1(fmoduleUrl, token, fmodule_modelid);
      // attach the event listener
      document.addEventListener('keydown', handleKeyPress);

    }

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [init, data_]);


  const reload = ()=> {
    iwsStore.deleteKey(current.modelid );
    const url_=url.concat('/').concat(current.modelid);
    url_&&Get1(url_, token,  parseInt(current.modelid));
  }
  const toggleToolbar = ()=> setToolbar(!toolbar );
  const toggle = ()=> setState({...state, collapse:!state.collapse });
  const setSelectedRows = (rows_)=>{
    setRows(rows_.map( (item) =>({id:item.id,  modelid:item.modelid})));
    console.log('rows_', rows_);
  }

  function getAccountAndLabel() {
    console.log('model', model);
    console.log('fModuleData', fModuleData);
    const model_ = fModuleData.find(obj =>obj.id === parseInt(model));
    console.log('model_', model_);
    const account_ = model_ ? model_.account : undefined;
    const accountLabel_ = model_.isDebit ? 'account' : 'oaccount';
    const oaccount_ = account_ ? '':model_.account  ;
    const oaccountLabel_ = account_ ? 'oaccount' : 'account';
    console.log('account_', account_);
    console.log('accountLabel_', accountLabel_);
    console.log('oaccount_', oaccount_);
    console.log('oaccountLabel_', oaccountLabel_);
    console.log('current_.lines[0]', current_.lines[0]);
    return {account_, accountLabel_, oaccount_, oaccountLabel_};
  }

  const initAdd =()=> {
    const {account_, accountLabel_, oaccount_, oaccountLabel_} = getAccountAndLabel();
    console.log('account_', account_);
    console.log('accountLabel_', accountLabel_);
    console.log('oaccount_', oaccount_);
    console.log('oaccountLabel_', oaccountLabel_);
    console.log('current_.lines[0]', current_.lines[0]);
    const line =[{...current_.lines[0], id:-1, transid:current_.id1,
        [accountLabel_]:account_, [oaccountLabel_]:oaccount_}]
    console.log('line', line);
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
    accUrl&&Get1(accUrl, token, acc_modelid);
    ccUrl&&Get1(ccUrl, token, cc_modelid);
    url_&&Get1(url_, token,  parseInt(modelid));
  }
  const handleModuleChange = event => {
    event.preventDefault();
    setModel(event.target.value);
    submitQuery(event, event.target.value);
    const m= fModuleData.find(m=>m.id.toString() === event.target.value);
    title_ = m?.name?m.name:title_;
    setTitle(title_);
    setCurrent(current_);
  };

  const buildAmount = row => ({...row, total: row.lines.reduce((acc, line) => acc + line.amount, 0)});
  const buildData = () => data().map( row =>buildAmount(row));

  const edit = editedRow =>{
    const isArray = Array.isArray(editedRow)&& editedRow.length>0
    console.log('isArray', isArray);
    const row = isArray?editedRow[0]:editedRow;
    console.log('row>>>>>>>', row);
    if( row) {
      const data = iwsState.get(row.modelid);
      const record = data.find(obj => obj.id === row.id);
      setCurrent({...record, editing: true});
    }
  }

  const submitPost = event => {
    event.preventDefault();
    const url_ = modifyUrl.concat("/post/").concat(current.id).concat("/").concat(current.company);
    Get2(url_, token, setCurrent);
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

  const addRow = async (newData) =>{
    if(newData ) {
    const {account_, accountLabel_, oaccount_, oaccountLabel_} = getAccountAndLabel();
    const dx = {...current};
      console.log('newData',newData);
      console.log('dx',dx);
      const oaccount = oaccount_?oaccount_:newData.oaccount;
      const oaccountLabel =  oaccount_?'oaccount':'account'
    const dx1 =current.lines.length===0?
      {...current, lines:[{...current.lines.filter(e=>!e.account.isEmpty), ...newData
        , id:-1, transid:current.id1, [accountLabel_]:account_, [oaccountLabel]:oaccount}]}:
      (dx.lines[current.lines.length] = {...newData, id:-1, transid:current.id1})
    const record = (current.lines.length>1)?dx:dx1;
    delete record.editing;
    console.log('record',record);
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
      const accountChanged = newData.account !== oldData.account
      const oaccountChanged = newData.oaccount !== oldData.oaccount
      const accountId = accountChanged?newData.account:oldData.account;
      const oaccountId = oaccountChanged?newData.oaccount:oldData.oaccount;

      (idx === -1)? dx.lines.push({...newData, transid: dx.id1}): dx.lines[idx]={...newData, transid: dx.id1
        , ...(accountChanged &&{account:accountId}), ...(oaccountChanged &&{oaccount:oaccountId})};
      console.log('dx', dx);
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
      dx.lines[index] = {...deleted, transid:-2 };
      Edit(modifyUrl, token, dx, data(), setCurrent);
    }
  }
  //const OnRowAdd = async (newData) => addRow(newData)
  const  editable = () => ({onRowAdd: addRow, onRowUpdate:  updateRow, onRowDelete:  deleteRow})
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
                            module ={model}  modules ={fModuleData} handleModuleChange={handleModuleChange}
                            onNewLine={onNewLine} submitPost={submitPost} submitCopy={submitCopy} reload={reload}
                             toggle={toggle} toggleToolbar={toggleToolbar}  current={current} />
        <FormFactory formid ={formEnum.FINANCIALS} current={current} current_={current_} setCurrent={setCurrent} t={t} accData={accd}
                     ccData={ccd}  styles={styles}  table={LinesFinancials} onNewLine={onNewLine}
                     collapse={state.collapse}
        />
        <EditableTable Options={{...buildExportOption("ExportCSV", "Export PDF", title)
          , toolbar:toolbar, maxBodyHeight: "960px", pageSize:10
          , pageSizeOptions:[10, 20, 50]}} flag={current?current.posted:false} data={buildData()} columns={columns}
          t={t}  edit ={edit} setSelectedRows ={setSelectedRows} parentChildData={parentChildData}/>

      </Grid>
    </>
  }
  const currentx= current?current:current_;
  return buildForm( currentx);
};

export default FinancialsForm;





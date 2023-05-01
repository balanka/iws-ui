import React, {useEffect, useState, createRef, memo} from 'react'
import { CInput} from '@coreui/react'
import Grid from "react-fast-grid";
import EditableTable from "../../Tables2/EditableTable";
import {styles} from "../Tree/BasicTreeTableProps";
import {Add, Edit, EditRow, Post, Query} from './CrudController';
import {Options, OptionsM, columnsF, Linescolumns} from '../../Tables2/LineFinancialsProps'
import {FinancialsFormHead, FormFactory} from './FormsProps'
import {formEnum} from "../../../utils/FORMS";
import {useGlobalState, LoginMenu, useStore} from "./Menu";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

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
  const modifyUrl=SERVER_URL.concat(selected).concat(1).concat("/1000");
  const createUrl=SERVER_URL.concat(module_x.ctx3);
  const url=SERVER_URL.concat(module_x.ctx);
  const accUrl=SERVER_URL.concat(module_x.ctx1);
  const ccUrl=SERVER_URL.concat(module_x.ctx2);
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
  const [data, setData] = useState(initialState);
  const [accData, setAccData] = useState(initAcc);
  const [ccData, setCcData] = useState(initCc);
  const [current,setCurrent] = useState(current_);
  const columnsX = Linescolumns(accData, initLine, current, t);
  const columns= columnsF(ccData, initLine, current, t);
  useEffect(() => {}, [current, setCurrent, data, setData ]);
  const toggleToolbar = ()=> setToolbar(!toolbar );
  const toggle = ()=> setState({...state, collapse:!state.collapse });
  const setSelectedRows = (rows_)=>setRows(rows_.map( (item) =>({id:item.id,  modelid:item.modelid})))


  const models=[{ id:'112', name:'Supplier invoice'}
    ,{ id:'114', name:'Payment'}
    ,{ id:'122', name:'Receivables'}
    ,{ id:'124', name:'Settlement'}
    ,{ id:'134', name:'General ledger'}]

  const initAdd =()=> EditRow({...initialState, editing:false}, true, setCurrent);


  const cancelEdit = (e) => {
    e.preventDefault();
    initAdd();
  };

  const submitQuery =(event, modelid)=>{
    event.preventDefault();
    const url_=url.concat('/').concat(modelid);
    accUrl&&accData?.length<2&&Query(event, accUrl, token, history, setAccData, initAcc);
    ccUrl&&ccData.length<2&&Query(event, ccUrl, token, history, setCcData, initCc);
    url_&&Query(event, url_, token, history, setData, initialState);
  }
  const handleModuleChange = event => {
    event.preventDefault();
    setModel(event.target.value);
    submitQuery(event, event.target.value);
  };

  const buildAmount = row => ({...row, total: row.lines.reduce((acc, line) => acc + line.amount, 0)});
  const buildData =() => data.map( row =>buildAmount(row));

  const edit = editedRow =>{
    const record = data.find(obj => obj.id === editedRow.id);
    setCurrent({...record, editing:true});
  }

  const submitPost = event => {
    event.preventDefault();
    Post(url, token, [current.id], "/post");
  };

  const submitCopy = event => {
    event.preventDefault();
    Post(url, token, rows, "/copy");
  };

  const getCurrentMonth = (date)=>{
    const p=date.getUTCMonth()+1;
    return p<=10?"0".concat(p.toString()):p.toString();
  }
  const getCurrentDate = ()=>{return new Date()}
  const getPeriod = (date ) => {return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))};

  const submitEdit = event => {
    event.preventDefault();
    console.log('token',token)
    console.log('current',current)
    console.log('current_',current_)
    if(current.editing) {
      console.log('editing',current)
      const record = delete current.editing
      Edit(modifyUrl, token, {...current}, data, setCurrent);
    } else {
      const record = delete current.editing
      console.log('adding',current)
      Add(createUrl, token, current, data, initialState, setCurrent);
      //submitAdd(event)
    }
  };

  const submitAdd = event => {
    event.preventDefault();
    console.log('in submitAdd: adding current:',current)
    console.log('transdate:',current.transdate)
    const row = {...current_, enterdate:new Date().toISOString(), postingdate:new Date().toISOString(), period:getPeriod(getCurrentDate())};
    Add(createUrl, token, row, data, initialState, setCurrent);

  };

  const onNewLine =() => {
    const ref = tableRef.current
    ref.dataManager.changeRowEditing();
    ref.setState({ ...ref.dataManager.getRenderState(),
      showAddRow: !ref.state.showAddRow,
    });
  }

  const addRow = (newData) =>{
    console.log('newData', newData);
    console.log('current', current);
    const dx = {...current};
    console.log('dx', dx);
    console.log('current.lines.filter', {...current.lines.filter(e=>!e.account.isEmpty)});
    const dx1 =current.lines.length===0?{...current, lines:[{...current.lines.filter(e=>!e.account.isEmpty), ...newData, id:-1, transid:current.id}]}:
                                        (dx.lines[current.lines.length] = {...newData, id:-1, transid:current.id})
    const record = (current.lines.length>1)?dx:dx1;
    console.log('{...current}', dx);
    console.log('dx1', dx1);
    console.log('record', record);
    if(newData ) {
    setCurrent({...record});
    }
  }
  const updateRow = (newData, oldData) =>{
    if (oldData) {
      console.log('oldData', oldData)
      console.log('newData', newData)
      console.log('current', current)
      const dx = {...current};
      console.log('dx', dx)
      const index = dx.lines.findIndex(obj => obj.id === newData.id);
      console.log('index', index)
      const dx1 =index===-1?{...dx, lines:[{...dx.lines, ...newData}]}:dx.lines[index] = {...newData};
      console.log('dx1', dx)
      setCurrent({...dx1});
    }
  }
  const deleteRow = (oldData) =>{
    if (oldData) {
      const dx = {...current};
      const index =dx.lines.findIndex(obj => obj.id === oldData.id);
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
          <CInput disabled={current.posted} bssize="sm" type="textarea" id="text-input" name="text" className="input-sm"
                  placeholder="text" value={current.text} onChange={(event)  =>
              setCurrent({ ...current, text: event.target.value})} />
        </>
    )

    const parentChildData =(row, rows) => rows.find(a => a.id === row.transid)
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
          , pageSizeOptions:[5,10, 20, 50]}} flag={current.posted} data={buildData()} columns={columns}
          t={t}  edit ={edit} setSelectedRows ={setSelectedRows} parentChildData={parentChildData}/>

      </Grid>
    </>
  }
  return buildForm( current);
};
export default FinancialsForm;





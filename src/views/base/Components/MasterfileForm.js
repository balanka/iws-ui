import React, {memo,useEffect, useState} from 'react'
import {useGlobalState} from './Menu';
import Grid from "react-fast-grid";
import {CommonFormHead, FormFactory} from './FormsProps'
import {ColumnFactory, OptionsM} from "../../Tables2/LineFinancialsProps";
import EditableTable from "../../Tables2/EditableTable";
import {styles, theme} from "../Tree/BasicTreeTableProps";
import {useTranslation} from "react-i18next";
import { Add, Edit, EditRow, Query} from './CrudController';
import {useHistory} from "react-router-dom";
import {formEnum} from "../../../utils/FORMS";
const MasterfileForm = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [profile, ] = useGlobalState('profile');
  const [selected, ] = useGlobalState('selected');
  const [menu, ] = useGlobalState('menu');
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  let history = useHistory()
  const datax =  profile?.modules?profile.modules:[];
  const module_= menu.get(selected);
  const modules_=(datax.includes(module_.id)|| (module_.id==="0"))?module_:menu.get('/login')
  if(modules_.id==='0') history.push("/login");
  const module=modules_
  //console.log('menu.module', module);
  const url=SERVER_URL.concat(module.ctx)
  const accUrl=SERVER_URL.concat(module.ctx1)
  const vatUrl=SERVER_URL.concat(module.ctx2)
  const bankUrl=SERVER_URL.concat(module.ctx3)
  const initVat = module.state2
  const initAcc = module.state1
  const initBank = module.state3
  const initialState = module.state
  const current_= initialState[0]//.query;
  const title =module.title
  const { t,  } = useTranslation();
  const [, setRows] = useState([])
  const data_ = initialState
  const accData_ = initAcc
  const vatData_ = initVat
  const bankData_ = initBank
  const modelid_ = module.modelid;
  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [vatData, setVatData] = useState(vatData_);
  const [bankData, setBankData] = useState(bankData_);
  const [current,setCurrent] = useState(current_);
  const [toolbar, setToolbar] = useState(true);
  useEffect(() => {}, [current, setCurrent, data, setData ]);
  const toggleToolbar= ()=> setToolbar(!toolbar );
  const toggle= ()=> setState({...state, collapse:!state.collapse });
  const setSelectedRows = (rows_)=>setRows(rows_.map( item =>item.id))
  const initAdd =()=> EditRow({...initialState[0], company:profile.company, editing:false}
        , false, setCurrent);
  const cancelEdit = (e) => initAdd();
  const columns = ColumnFactory(modelid_,data, t);
  const edit = editedRow =>{
    const record = data.find(obj => obj.id === editedRow.id);
    const row = {...record, editing:true}
    setCurrent(row);
  }

  const submitEdit = event => {
    event.preventDefault();
    if(current.editing)
      Edit(url, profile, {...current}, data, setCurrent);
     else submitAdd(event)
  };

  const  isEmpty = (str) => (!str || 0 === str.length);
  const load = event => data?.length<2?submitQuery(event): void(0)
  const submitQuery =(event)=>{
    event.preventDefault();
    !isEmpty(accUrl)&&Query(event, accUrl, profile, history, setAccData, initAcc);
    !isEmpty(vatUrl)&&Query(event, vatUrl, profile, history, setVatData, initVat);
    !isEmpty(bankUrl)&&Query(event, bankUrl, profile, history, setBankData, initBank);
    !isEmpty(url)&&Query(event, url, profile, history, setData, initialState);
  }

  const submitAdd = event => {
    event.preventDefault();
    Add(url, profile, {...current}, data, initialState, setCurrent);
  };
  let parentChildData =(row, rows) => rows.find(a => a.id === row.account)
  function buildForm(current){
    return <>
      <Grid container spacing={2} style={{...styles.outer }} direction="column" >
        <CommonFormHead styles={styles} title={title} collapse={state.collapse} initAdd ={initAdd} initialState={initialState}
                        setData={setData} setAccData={setAccData} setBankData={setBankData}  url={url} accUrl={accUrl}
                        cancelEdit ={cancelEdit} submitEdit={submitEdit} submitQuery= {load} toggle={toggle}
                        toggleToolbar={toggleToolbar}  style={{...styles.inner}}/>
        <FormFactory formid ={modelid_} current={current} setCurrent={setCurrent} t={t} accData={accData} vatData={vatData}
                     bankData={bankData} collapse={state.collapse} styles={styles} style={{...styles.inner}}/>

        <Grid container spacing={2} style={{...styles.inner, display:'block' }} direction="column" >
          <EditableTable Options={{...OptionsM, toolbar:toolbar, maxBodyHeight: "960px"
            , pageSize:10, pageSizeOptions:[10, 20, 50]}}  data={data}
                         columns={columns}   theme={theme} t={t}  edit ={edit} setSelectedRows ={setSelectedRows}
                         parentChildData ={modelid_===formEnum.ACCOUNT?parentChildData:''}/>
        </Grid>
      </Grid>
    </>
  }

  return buildForm(current);

};
export default memo(MasterfileForm);

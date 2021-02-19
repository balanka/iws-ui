import React, {useEffect, useState, useContext, memo} from 'react'
import {accountContext, useGlobalState} from './AccountContext';
import Grid from "react-fast-grid";
import useFetch from "../../../utils/useFetch";
import {CommonFormHead, FormFactory} from './FormsProps'
import {ColumnFactory, OptionsM} from "../../Tables2/LineFinancialsProps";
import EditableTable from "../../Tables2/EditableTable";
import {styles, theme} from "../Tree/BasicTreeTableProps";
const MasterfileForm = () => {
  const [profile, ] = useGlobalState('profile');
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [, setRows] = useState([])
  const value = useContext(accountContext);
  const t = value.t
  const modelid_ = value.modelid;
  const [ res, loading, error] = useFetch(value.url, {});
  const [res2, loading2, error2] = useFetch(value.accUrl, {});
  const [res3 , loading3, error3] = useFetch(value.ccUrl, {});
  const [res4, loading4, error4] = useFetch(value.bankUrl, {});
  const data_ =  res?.response?res.response:value.initialState;
  const accData_=  res2?.response?res2.response:value.accData;
  const vatData_=  res3?.response?res3.response:value.ccData;
  const bankData_=  res4?.response?res4.response:[];
  const current_= value.user;
  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [vatData, setVatData] = useState(vatData_);
  const [bankData, setBankData] = useState(bankData_);
  const [current,setCurrent] = useState(current_);
  const [toolbar, setToolbar] = useState(true);
  useEffect(() => {}, [current, setCurrent, data ]);
  useEffect(() => {setCurrent(current_)}, [ current_]);

  const toggleToolbar= ()=> setToolbar(!toolbar );
  const toggle= ()=> setState({...state, collapse:!state.collapse });
  const setSelectedRows = (rows_)=>setRows(rows_.map( item =>item.id))

  const initAdd =()=> {
    const row = {...value.initialState[0], company:profile.company, editing:false};
    value.editRow(row, false);
    setCurrent(row);
  };

  const cancelEdit = (e) => initAdd();
  const columns = ColumnFactory(modelid_,data, t);
  const edit = editedRow =>{
    const record = data.find(obj => obj.id === editedRow.id);
    const row = {...record, editing:true}
    setCurrent(row);
  }

  const submitEdit = event => {
    event.preventDefault();
    if(current.editing) {
      const row = {...current}
      setCurrent(row);
      value.submitEdit(row, data);
    } else submitAdd(event)
  };

  const submitQuery =(event)=>{
    event.preventDefault();
    value.accUrl&&value.submitQuery(event, value.accUrl, setAccData, value.initAcc);
    value.ccUrl&&value.submitQuery(event, value.ccUrl, setVatData, value.initCc);
    value.bankUrl&&value.submitQuery(event, value.bankUrl, setBankData, []);
    value.url&&value.submitQuery(event, value.url, setData, value.initialState);
  }

  const submitAdd = event => {
    event.preventDefault();
    const row = {...current};
    value.submitAdd(row, data);
    setCurrent(row);
  };

  function buildForm(current){
    return <>
      <Grid container spacing={2} style={{...styles.outer }} direction="column" >
        <CommonFormHead styles={styles} title={value.title} collapse={state.collapse} initAdd ={initAdd} initialState={value.initialState}
                        setData={setData} setAccData={setAccData} setBankData={setBankData}  url={value.url} accUrl={value.accUrl}
                        cancelEdit ={cancelEdit} submitEdit={submitEdit} submitQuery= {submitQuery} toggle={toggle}
                        toggleToolbar={toggleToolbar}  style={{...styles.inner}}/>
        <FormFactory formid ={modelid_} current={current} setCurrent={setCurrent} t={t} accData={accData} vatData={vatData}
                     bankData={bankData} collapse={state.collapse} styles={styles} style={{...styles.inner}}/>

        <Grid container spacing={2} style={{...styles.inner, display:'block' }} direction="column" >
          <EditableTable Options={{...OptionsM, toolbar:toolbar}}  data={data}
                         columns={columns}   theme={theme} t={t}  edit ={edit} setSelectedRows ={setSelectedRows}/>
        </Grid>
      </Grid>
    </>
  }

  return buildForm(current);

};
export default memo(MasterfileForm)

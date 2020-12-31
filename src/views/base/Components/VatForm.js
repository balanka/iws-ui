import React, {useEffect, useState, useContext} from 'react';
import Grid from "react-fast-grid";
import blue from "@material-ui/core/colors/blue";
import useFetch from "../../../utils/useFetch";
import {accountContext, useGlobalState} from './AccountContext';
import EditableTable from "../../Tables2/EditableTable";
import {
 ColumnFactory,
  OptionsM,
  FormFactory, CommonFormHead
} from "../../Tables2/LineFinancialsProps";
import {styles, rowStyle, theme} from "../Tree/BasicTreeTableProps";

const VatForm = () => {
  const [profile, ] = useGlobalState('profile');
  const [state, setState] = useState({collapse:true, fadeIn: true, timeout: 300});
  const value = useContext(accountContext);
  const t = value.t
  const [{ res}]= useFetch(value.url, {});
  const [{ res2}] = useFetch(value.accUrl, {});
  const data_ =  res?.hits?res.hits:value.initialState;
  const accData_=  res2?.hits?res2.hits:value.accData;
  const current_= value.user;
  const modelid_ = value.modelid;
  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [current,setCurrent] = useState(current_);
  const [toolbar, setToolbar] = useState(true);
  useEffect(() => {}, [current, setCurrent, data ]);
  useEffect(() => {setCurrent(current_)}, [ current_]);

  const toggleToolbar= ()=> setToolbar(!toolbar );
  const toggle= ()=> setState({ ...state, collapse:!state.collapse });
  const initAdd =()=> setCurrent({...value.initialState.hits[0], company:profile.company, editing:false});
  const cancelEdit = (e) => {
    e.preventDefault();
    initAdd();
  };
  const columns = ColumnFactory(modelid_, data,  t);

  const edit = editedRow =>{
    const record = data.hits.find(obj => obj.id === editedRow.id);
    setCurrent({...record, editing:true});
  }

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
    const row = {...current};
    value.submitAdd(row, data);
    setCurrent(row);
  };
  const submitQuery=event => {
    event.preventDefault();
    value.submitQuery(event, value.accUrl, setAccData, value.initAcc);
    value.submitQuery(event, value.url, setData, value.initialState);
  }
  function buildForm(current) {
    return <>
       <Grid container spacing={2} style={{...styles.outer }} direction="column" >
         <CommonFormHead styles={styles} title={value.title} collapse={state.collapse} initAdd ={initAdd} setData={setData} setAccData={setAccData}
                         url={value.url} accUrl={value.accUrl} initialState={value.initialState} cancelEdit ={cancelEdit} submitEdit={submitEdit}
                         submitQuery= {submitQuery} toggle={toggle} toggleToolbar={toggleToolbar}  />
         <FormFactory formid ={modelid_} current={current} setCurrent={setCurrent} t={t} accData={accData}
                      collapse={state.collapse} styles={styles} />

      <Grid container spacing={2} style={{...styles.inner, 'background-color':blue }} direction="column" >
        <EditableTable Options={{...OptionsM, toolbar:toolbar}}  data={data?.hits?data.hits:value.initialState.hits}
                       columns={columns} rowStyle={rowStyle} theme={theme} t={t}  edit ={edit}/>
     </Grid>
   </Grid>
    </>
  }

  return buildForm(current);

};
export default VatForm;

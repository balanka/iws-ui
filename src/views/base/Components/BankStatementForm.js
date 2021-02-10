import React, {useEffect, useState, useContext} from 'react'
import {accountContext} from './AccountContext';
import Grid from "react-fast-grid";
import {useTranslation} from "react-i18next";
import useFetch from "../../../utils/useFetch";
import {OptionsM, ColumnFactory} from "../../Tables2/LineFinancialsProps";
import {BSFormHead, FormFactory} from "./FormsProps";
import EditableTable from "../../Tables2/EditableTable";
import {styles,  theme} from "../Tree/BasicTreeTableProps";

const BankStatementForm = () => {
  const { t,  } = useTranslation();
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [rows, setRows] =useState([])
  const value = useContext(accountContext);
  const modelid_ = value.modelid;
  const [ res, loading, error]= useFetch(value.url, {});
  const data_ =  res?.response?res.response:value.initialState;
  const current_= value.user;
  const [data, setData] = useState(data_);
  const [current,setCurrent] = useState(current_);
  const [toolbar, setToolbar] = useState(true);
  useEffect(() => {}, [current, setCurrent, data]);
  useEffect(() => {setCurrent(current_)}, [ current_]);
  const toggleToolbar= ()=> setToolbar(!toolbar );
  const toggle= ()=> setState({...state, collapse:!state.collapse });
  const columns = ColumnFactory(modelid_, data, t);
  const setSelectedRows = (rows_)=>setRows(rows_.map( item =>item.bid));


    const submitQuery = event => {
        event.preventDefault();
        value.submitQuery(event, value.url, setData, value.initialState)
    };
    const cancelEdit = (e) => {
        const row = {...current};
        value.editRow(row, false);
        setCurrent(row);
    };

    const submitPost = event => {
        event.preventDefault();
        value.submitPost(rows, "/post");
        //console.log("submitEdit current", current);
    };

  const edit = editedRow =>{
        const record = data.find(obj => obj.bid === editedRow.bid);
        setCurrent({...record, editing:true});
    }

  const submitEdit = event => {
        event.preventDefault();
        if(current.editing && !current.posted) {
            const row = {...current}
            setCurrent(row);
            value.submitEdit(row, data);
        }
  };


  function buildForm(current){
    return <>
        <Grid container spacing={2} style={{...styles.outer }} direction="column" >
            <BSFormHead styles={styles} title={value.title} collapse={state.collapse} setData={setData}
                             url={value.url} accUrl={value.accUrl} cancelEdit ={cancelEdit} submitEdit={submitEdit}
                            submitQuery= {submitQuery} submitPost= {submitPost} toggle={toggle} toggleToolbar={toggleToolbar}  />
            <FormFactory formid ={modelid_} current={current} setCurrent={setCurrent} t={t}
                          collapse={state.collapse} styles={styles} />
            <Grid container spacing={2} style={{...styles.inner, display:'block'}} direction="column" >
               <EditableTable Options={{...OptionsM, toolbar:toolbar}}  data={data?data:value.initialState}
                  columns={columns}  theme={theme} t={t}  edit ={edit} setSelectedRows ={setSelectedRows}/>

            </Grid>
        </Grid>
   </>;
  }

  return buildForm(current);

};
export default BankStatementForm;



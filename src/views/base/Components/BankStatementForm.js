import React, {useEffect, useState, useContext} from 'react'
import {accountContext, useGlobalState} from './AccountContext';
import Grid from "react-fast-grid";
import blue from "@material-ui/core/colors/blue";
import {useTranslation} from "react-i18next";
import useFetch from "../../../utils/useFetch";
import axios from "axios";
import {ColumnsBS as columns, OptionsM, filter, CustomerFormHead, FormFactory} from "../../Tables2/LineFinancialsProps";
import EditableTable from "../../Tables2/EditableTable";
import {formEnum} from "../../../utils/FORMS";
import {styles, rowStyle, theme} from "../Tree/BasicTreeTableProps";

const BankStatementForm = () => {
  const { t,  } = useTranslation();
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [profile, ] = useGlobalState('profile');
  const value = useContext(accountContext);
  const init = ()=> {return value.initialState}
  const [{ res}]= useFetch(value.url, {});
  const data_ =  res?.hits?res.hits:[value.initialState];
  const getData =()=> { return data?.hits?data.hits:init().hits}
  const current_= value.user;
  const [data, setData] = useState(data_);
  const [current,setCurrent] = useState(current_);
  const [filteredRows, setFilteredRows] = useState(data);
  const [toolbar, setToolbar] = useState(true);
  useEffect(() => {}, [current, setCurrent, data]);
  useEffect(() => {setCurrent(current_)}, [ current_]);
  useEffect(() => {handleFilter('')}, [data]);

  const toggleToolbar= ()=> {
        setToolbar(!toolbar );
    }

  const submitGet = (url, func, result) => {
    axios.get( url, {headers: {'authorization':profile.token}})
      .then(response => {
        const resp = response.data;
        result=response.data;

        func(resp);
        result=resp;
        return result;
      }).catch(function (error) {
      console.log('error', error);
    });
    return result;
  }
  const fetchData =(url_, func)=>{
    let result='xxx';
    const res = submitGet(url_, func, result);
    console.log("res", res);
    const datax = res?.hits ? res.hits : value.initialState;
    return datax;
  }
  const submitQuery = event => {
    event.preventDefault();
    console.log("submitQuery current", current);
    let result='xxx';
    const url_=value.url //.concat('/')
    console.log("url_", url_);
    fetchData(url_, setData, result);
    console.log("result", result);
  };
    const cancelEdit = (e) => {
        const row = {...current};
        value.editRow(row, false);
        setCurrent(row);
    };
    const columnsX = columns([], value.initialState, current, t);
    const getColumnName = ()=>columnsX.map(col =>col.field);

  function handleFilter(text) {
      const rows_=text?filter(data.hits, getColumnName(), text ):data.hits
      setFilteredRows(rows_);
  }
  const toggle= ()=> {
    setState({...state, collapse:!state.collapse });
  }

  const edit = editedRow =>{
        const record = filteredRows.find(obj => obj.bid === editedRow.bid);
        const row = {...record, editing:true}
        setCurrent(row);
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
    console.log("user1xx", current);
    return <>
        <Grid container spacing={2} style={{...styles.outer }} direction="column" >
            <CustomerFormHead styles={styles} title={value.title} collapse={state.collapse}
                              setData={setData} url={value.url} accUrl={value.accUrl}
                               initialState={value.initialState} cancelEdit ={cancelEdit} submitEdit={submitEdit}
                              submitQuery= {submitQuery} toggle={toggle} toggleToolbar={toggleToolbar}  />
            <FormFactory formid ={formEnum.BANKSTATEMENT} current={current} setCurrent={setCurrent} t={t}
                          collapse={state.collapse} styles={styles} />
            <Grid container spacing={2} style={{...styles.inner, 'background-color':blue }} direction="column" >
               <EditableTable Options={{...OptionsM, toolbar:toolbar}}  data={filteredRows} columns={columnsX} rowStyle={rowStyle}
                        theme={theme} t={t}  edit ={edit} style={{padding:0, height:80}}/>
            </Grid>
        </Grid>
   </>;
  }

  return buildForm(current);

};
export default BankStatementForm;



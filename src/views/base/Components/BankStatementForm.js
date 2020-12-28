import React, {useEffect, useState, useContext} from 'react'
import {accountContext, useGlobalState} from './AccountContext';
import Grid from "react-fast-grid";
import blue from "@material-ui/core/colors/blue";
import {useTranslation} from "react-i18next";
import useFetch from "../../../utils/useFetch";
import axios from "axios";
import {ColumnsBS , OptionsM,  CommonFormHead, FormFactory} from "../../Tables2/LineFinancialsProps";
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
  const [toolbar, setToolbar] = useState(true);
  useEffect(() => {}, [current, setCurrent, data]);
  useEffect(() => {setCurrent(current_)}, [ current_]);

  const toggleToolbar= ()=> setToolbar(!toolbar );
  const toggle= ()=> setState({...state, collapse:!state.collapse });
  const columns = ColumnsBS([], value.initialState, current, t);

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



  const edit = editedRow =>{
        const record = data.hits.find(obj => obj.bid === editedRow.bid);
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
            <CommonFormHead styles={styles} title={value.title} collapse={state.collapse} setData={setData}
                             url={value.url} accUrl={value.accUrl} cancelEdit ={cancelEdit} submitEdit={submitEdit}
                            submitQuery= {submitQuery} toggle={toggle} toggleToolbar={toggleToolbar}  />
            <FormFactory formid ={formEnum.BANKSTATEMENT} current={current} setCurrent={setCurrent} t={t}
                          collapse={state.collapse} styles={styles} />
            <Grid container spacing={2} style={{...styles.inner, 'background-color':blue }} direction="column" >
               <EditableTable Options={{...OptionsM, toolbar:toolbar}}  data={data?.hits?data.hits:value.initialState.hits}
                  columns={columns}  theme={theme} t={t}  edit ={edit}/>

            </Grid>
        </Grid>
   </>;
  }

  return buildForm(current);

};
export default BankStatementForm;



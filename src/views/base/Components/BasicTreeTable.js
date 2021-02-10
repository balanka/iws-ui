import React, {useContext, useState, useEffect, memo} from "react";
import {accountContext} from "../Components/AccountContext";
import useFetch from "../../../utils/useFetch";
import Grid from "react-fast-grid";
import {formEnum} from "../../../utils/FORMS";
import {JournalFormHead, FormFactory} from './FormsProps';
import {styles} from "../Tree/BasicTreeTableProps";
import EditableTable from "../../Tables2/EditableTable";
import {OptionsM, ColumnsBalancesheet as columns} from '../../Tables2/LineFinancialsProps';

const  BasicTreeTable =()=> {

    const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
    const value = useContext(accountContext);
    const t = value.t
    const [ res, loading, error ]= useFetch(value.url, {});
    const init = ()=> {return value.initialState}
    const data_ = res && res.response?res.response:value.initialState;
    const getData =()=>  data?data:init()
    const [res2, loading2, error2] = useFetch(value.accUrl, {});
    const accData_=  res2 && res2.response?res2.response:value.accData;
    const current_= getData()[0]
    const [current,setCurrent] = useState(current_);
    const [data, setData] = useState(data_);
    const [accData, setAccData] = useState(accData_);
    const [toolbar, setToolbar] = useState(false);
    useEffect(() => {setCurrent(current_)}, [current_]);
    const toggleToolbar= ()=> setToolbar(!toolbar );
    const toggle= ()=> setState({...state, collapse:!state.collapse });
    const columnsX = columns(t);
  
    const url_=() =>value.url.concat('/')
        .concat(current.account).concat('/')
        .concat(current.fromPeriod).concat('/')
        .concat(current.toPeriod);

      const load = event => {
        event.preventDefault();
        accData?.length<2?
            value.submitQuery(event, value.accUrl, setAccData, value.initAcc):
            current.account&&current.fromPeriod&&current.toPeriod?
             value.submitQuery(event, url_(), setData, value.initialState): void(0)
      };

    const parentChildData =(row, rows) => rows.find(a => a.id === row.account)
    function buildForm(){
        return <>
          <Grid container spacing={2} style={{...styles.outer }} direction="column" >
            <JournalFormHead styles={styles} title={value.title} collapse={state.collapse}  initialState={value.initialState}
                            setData={setData} setAccData={setAccData} url={value.url} accUrl={value.accUrl}
                             toggle={toggle} load = {load} toggleToolbar={toggleToolbar}  />
                            
            <FormFactory formid ={formEnum.BALANCETREE} current={current} setCurrent={setCurrent} t={t} accData={accData}
                         collapse={state.collapse} styles={styles} submitQuery= {load}  />
            <Grid container spacing={2} style={{...styles.inner}} direction="column" >
              <EditableTable Options={{...OptionsM, selection:false, toolbar:toolbar}} flag={false} data={getData()}
                         columns={columnsX}  t={t}   parentChildData={parentChildData}/>
            </Grid>
          </Grid>
        </>
      }
      return buildForm();
};
export default  memo(BasicTreeTable)

import React, {useState, useContext} from 'react'
import {accountContext} from './AccountContext';
import useFetch from "../../../utils/useFetch";
import Grid from "react-fast-grid";
import {useTranslation} from "react-i18next";
import {FormFactory,JournalFormHead} from './FormsProps'
import {columnsPACB, OptionsM} from "../../Tables2/LineFinancialsProps";
import {formEnum} from "../../../utils/FORMS";
import blue from "@material-ui/core/colors/blue";
import {styles, theme} from "../Tree/BasicTreeTableProps";
import EditableTable from "../../Tables2/EditableTable";
const PACBForm = () => {
  const { t,  } = useTranslation();
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});

  const [isDebit, setIsDebit ] = useState(true);
  const value = useContext(accountContext);
  const [{ res}, ]= useFetch(value.url, {});
  const [{ res2},] = useFetch(value.accUrl, {});
  const data_ =  res?.hits?res.hits:[value.initialState];
  const init = ()=> {return value.initialState}
  const getData =()=> { return data?.hits?data.hits:init().hits}
  const accData_ =  res2?.hits?res2.hits:value.accData;
  const current_= init().hits[0].query;

  const [current,setCurrent] = useState(current_);
  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [toolbar, setToolbar] = useState(true);

  const columnsX= columnsPACB(t);
  const toggleToolbar= ()=> setToolbar(!toolbar );
  const toggle= ()=> setState({...state, collapse:!state.collapse });

  const url_=() =>value.url.concat('/')
        .concat(current.account).concat('/')
        .concat(current.fromPeriod).concat('/')
        .concat(current.toPeriod);

    const summary =(data)=> {
        const row_=data;
        const row = row_?.hits?row_?.hits?.slice():row_.slice();
        let debit=0, credit=0, balance=0
        let currency=''
        let company=''

        const available=row.length>0
        for(let i = 0, len = row.length-1; i <= len; ++i) {
            debit=debit+row[i].debit
            credit=credit+row[i].credit
            balance=isDebit? (balance + debit-credit):(balance+credit-debit)
              const runningBalance = isDebit? (row[i].debit+row[i].idebit-row[i].credit-row[i].icredit):
                (row[i].credit+row[i].icredit-row[i].debit-row[i].idebit)
            currency = row[i].currency
            company = row[i].company
            row[i] = {...row[i], balance:runningBalance}
        }
        const len=row.length
        row[len] = {period:"Total", idebit:available?row[0].idebit:0, debit:debit, icredit:available?row[0].icredit:0
            , credit:credit, balance:balance, currency:currency,company:company  }
        return row
    }

    const load = event => {
        event.preventDefault();
        accData?.hits?.length<2?
            value.submitQuery(event, value.accUrl, setAccData, value.initAcc):
            current.account&&current.fromPeriod&&current.toPeriod?
            value.submitQuery(event, url_(), setData, value.initialState): void(0)
        setIsDebit(accData.hits.find(x=>x.id===current.account).isDebit)
        console.log("accDataX", isDebit);
    };


    const submitQuery = event => {
        event.preventDefault();
        accData?.hits?.length<2?
            value.submitQuery(event, value.accUrl, setAccData,value.initAcc):
            value.submitQuery(event, url_(), setData, value.initialState)
        console.log("accDataX", accData);
    };


  function buildForm(){

    return <>
        <Grid container spacing={2} style={{...styles.outer }} direction="column" >
            <JournalFormHead styles={styles} title={value.title} collapse={state.collapse}  initialState={value.initialState}
                             setData={setData} setAccData={setAccData} url={value.url} accUrl={value.accUrl}
                                toggle={toggle}
                             load = {load} toggleToolbar={toggleToolbar}  />
            <FormFactory formid ={formEnum.PACB} current={current} setCurrent={setCurrent} t={t} accData={accData}
                         collapse={state.collapse} styles={styles} submitQuery= {submitQuery}/>

            <Grid container spacing={2} style={{...styles.inner, backgroundColor:blue }} direction="column" >
                <EditableTable Options={{...OptionsM, selection:false, toolbar:toolbar}}
                               data={data?summary(data):value.initialState.hits} columns={columnsX}
                               theme={theme} t={t} setSelectedRows ={()=>void(0)}/>
            </Grid>
        </Grid>
         </>
  }

  return buildForm();

};
export default PACBForm;


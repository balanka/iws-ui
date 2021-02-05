import React, {useState, useContext} from 'react'
import {accountContext} from './AccountContext';
import useFetch from "../../../utils/useFetch";
import Grid from "react-fast-grid";
import {useTranslation} from "react-i18next";
import {FormFactory,JournalFormHead} from './FormsProps'
import {columnsPACB, ColumnJournal, OptionsM} from "../../Tables2/LineFinancialsProps";
import {formEnum} from "../../../utils/FORMS";
import {styles, theme} from "../Tree/BasicTreeTableProps";
import EditableTable from "../../Tables2/EditableTable";
const JForm = () => {
  const { t,  } = useTranslation();
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});

  const [isDebit, setIsDebit ] = useState(true);
  const value = useContext(accountContext);
  const [{ res}, ]= useFetch(value.url, {});
  const [{ res2},] = useFetch(value.accUrl, {});
  const data_ =  res?.hits?res.hits:[value.initialState];
  const init = ()=> {return value.initialState}
  const accData_ =  res2?.hits?res2.hits:value.accData;
  const current_= init().hits[0].query;
  const modelid = value.modelid;
  const [current,setCurrent] = useState(current_);
  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [toolbar, setToolbar] = useState(true);

  const columnsX= modelid===formEnum.PACB?columnsPACB(t):ColumnJournal(t);
  const toggleToolbar= ()=> setToolbar(!toolbar );
  const toggle= ()=> setState({...state, collapse:!state.collapse });

  const url_=() =>value.url.concat('/')
        .concat(current.account).concat('/')
        .concat(current.fromPeriod).concat('/')
        .concat(current.toPeriod);

    const summaryPCB =(data)=> {
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
        const idebit = available?row[0].idebit:0
        const icredit = available?row[0].icredit:0
        row[len] = {period:t('common.total'), idebit:idebit, debit:debit, icredit:icredit
            , credit:credit, balance:row[len-1].balance, currency:currency,company:company  }
        return row
    }
    const summaryJ =(data)=> {
        const row_=data;
        const row = row_?.hits?row_?.hits?.slice():row_.slice();
        let debit=0, credit=0, amount=0
        let currency=''
        let company=''
        const available=row.length>0
        for(let i = 0, len = row.length-1; i <= len; ++i) {
            debit=debit+row[i].debit
            credit=credit+row[i].credit
            amount=amount+row[i].amount
            currency = row[i].currency
            company = row[i].company
            row[i] = {...row[i], amount:amount}
        }
        const len=row.length
        const idebit = available?row[0].idebit:0
        const icredit = available?row[0].icredit:0
        row[len] = {id:Number.MAX_VALUE, transid:t('common.total'), account:'', oaccount:"", transdate:'', enterdate:''
            , postingdate:"", period:"", amount:amount, idebit:idebit, debit:debit, icredit:icredit
            , credit:credit, balance:row[len-1].balance, currency:currency,ide:"", year:"", month: ""
            , text:"", typeJournal:"", file_content:"", company:company  }
        return row
    }
    const summary =(data)=>modelid===formEnum.PACB?summaryPCB(data):summaryJ(data)
    const load = event => {
        event.preventDefault();
        accData?.hits?.length<2?
            value.submitQuery(event, value.accUrl, setAccData, value.initAcc):
            current.account&&current.fromPeriod&&current.toPeriod?
            value.submitQuery(event, url_(), setData, value.initialState): void(0)
        setIsDebit(accData.hits.find(x=>x.id===current.account).isDebit)
    };

    const submitQuery = event => {
        event.preventDefault();
        accData?.hits?.length<2?
            value.submitQuery(event, value.accUrl, setAccData,value.initAcc):
            value.submitQuery(event, url_(), setData, value.initialState)
    };


  function buildForm(){
    return <>
        <Grid container spacing={2} style={{...styles.outer }} direction="column" >
            <JournalFormHead styles={styles} title={value.title} collapse={state.collapse}
                 initialState={value.initialState}  setData={setData} setAccData={setAccData} url={value.url}
                accUrl={value.accUrl} toggle={toggle} load = {load} toggleToolbar={toggleToolbar}  />
            <FormFactory formid ={modelid} current={current} setCurrent={setCurrent} t={t} accData={accData}
                         collapse={state.collapse} styles={styles} submitQuery= {submitQuery}/>

            <Grid container spacing={2} style={{...styles.inner, display:'block'}} direction="column" >
                <EditableTable Options={{...OptionsM, toolbar:toolbar}}
                               data={data?summary(data):value.initialState.hits} columns={columnsX}
                               theme={theme} t={t} setSelectedRows ={()=>void(0)}/>
            </Grid>
        </Grid>
         </>
  }

  return buildForm();

};
export default JForm;


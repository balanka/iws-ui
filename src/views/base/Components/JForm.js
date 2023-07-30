import React, {useState, memo, useEffect} from 'react'
import Grid from "react-fast-grid";
import {useTranslation} from "react-i18next";
import {FormFactory,JournalFormHead} from './FormsProps'
import {columnsPACB, ColumnJournal, OptionsM} from "../../Tables2/LineFinancialsProps";
import {formEnum} from "../../../utils/FORMS";
import {styles, theme} from "../Tree/BasicTreeTableProps";
import EditableTable from "../../Tables2/EditableTable";
import {Get1, Query} from './CrudController';
import {ACCOUNT, useGlobalState, useStore} from "./Menu";
import {useHistory} from "react-router-dom";
import iwsStore from "./Store";

function Internal(isDebit, t, modelid, accData, accUrl, profile, history, setAccData, initAcc, current, getUrl, setData
    , initialState, setIsDebit, title, state, url, toggle, toggleToolbar, setCurrent, toolbar, data, columnsX) {
    console.log('dataZZ',data);
    const summaryPCB = (data) => {
        const row_ = data;
        const row = row_ ? row_?.slice() : row_.slice();
        let debit = 0, credit = 0, balance = 0;
        let currency = '';
        let company = '';

        const available = row.length > 0;
        for (let i = 0, len = row.length - 1; i <= len; ++i) {
            debit = debit + row[i].debit;
            credit = credit + row[i].credit;
            balance = isDebit ? (balance + debit - credit) : (balance + credit - debit);
            const runningBalance = isDebit ? (row[i].debit + row[i].idebit - row[i].credit - row[i].icredit) :
                (row[i].credit + row[i].icredit - row[i].debit - row[i].idebit)
            currency = row[i].currency;
            company = row[i].company;
            row[i] = {...row[i], balance: runningBalance};
        }
        const len = row ? row.length : 0;
        const idebit = available ? row[0].idebit : 0;
        const icredit = available ? row[0].icredit : 0;
        if (len > 0)
            row[len] = {
                period: t('common.total'), idebit: idebit, debit: debit, icredit: icredit
                , credit: credit, balance: row[len - 1].balance, currency: currency, company: company
            };
        return row;
    }
    const summaryJ = (data_) => {
        const row_ = data_;
        console.log('data_',data_);
        const row = row_?.slice();
        const available = row.length > 0;
        let idebit = available ? row[0].idebit : 0;
        let icredit = available ? row[0].icredit : 0;
        let debit = 0, credit = 0, amount = 0;
        let currency = ''
        let company = '';

        for (let i = 0, len = row.length - 1; i <= len; ++i) {
            idebit =  row[i].idebit;
            debit =  row[i].debit;
            icredit =  row[i].icredit;
            credit =  row[i].credit;
            amount = amount + row[i].amount;
            currency = row[i].currency;
            company = row[i].company;
        }
        const len = row.length;

        if (len > 0)
            row[len] = {
                id: Number.MAX_VALUE,
                transid: t('common.total'),
                account: '',
                oaccount: "",
                transdate: '',
                enterdate: '',
                postingdate: "",
                period: "",
                amount: amount,
                idebit: idebit,
                debit: debit,
                icredit: icredit,
                credit: credit,
                balance: row[len - 1].balance,
                currency: currency,
                ide: "",
                year: "",
                month: "",
                text: "",
                typeJournal: "",
                file_content: "",
                company: company
            };
        return row;
    }
    const summary = (data_) => modelid === formEnum.PACB ? summaryPCB(data_) : summaryJ(data_)
    const load = event => {
        event.preventDefault();
        accData?.length < 2 ?
            Query(event, accUrl, profile, history, setAccData, initAcc) :
            current.account && current.fromPeriod && current.toPeriod ?
                Query(event, getUrl(), profile, history, setData, initialState) : void (0)
    };

    const submitQuery_ = event => {
        event.preventDefault();
        accData?.length < 2 ?
            Query(event, accUrl, profile, history, setAccData, initAcc) :
            Query(event, getUrl(), profile, history, setData, initialState)
    };
    function buildForm() {
        return <>
            <Grid container spacing={1} style={{...styles.outer}} direction="column">
                <JournalFormHead styles={styles} title={title} collapse={state.collapse}
                                 initialState={initialState} setData={setData} setAccData={setAccData} url={url}
                                 accUrl={accUrl} toggle={toggle} load={load} toggleToolbar={toggleToolbar}/>
                <FormFactory formid={modelid} current={current} setCurrent={setCurrent} t={t} accData={accData}
                             collapse={state.collapse} styles={styles} submitQuery={submitQuery_}/>

                <Grid container spacing={2} style={{...styles.inner, display: 'block'}} direction="column">
                    <EditableTable Options={{...OptionsM, toolbar: toolbar, pageSize:13, pageSizeOptions:[15, 25, 50]}}
                                   data={data ? summary(data) : initialState} columns={columnsX}
                                   theme={theme} t={t} setSelectedRows={() => void (0)}/>
                </Grid>
            </Grid>
        </>
    }
    return buildForm();
}

const JForm = () => {
    const { t,  } = useTranslation();
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const { profile,  } = useStore()
    const { token  } = profile
    const [selected, ] = useGlobalState('selected');
    console.log('selected',selected)
    const [menu, ] = useGlobalState('menu');
    const datax =  profile?.modules?profile.modules:[];
    let history = useHistory()
    console.log('datax',datax)
    const module_= menu.get(selected);
    console.log('module_',module_)
    const modules_=(datax.includes(module_.id)|| (module_.id==="0"))?module_:menu.get('/login')
    if(modules_.id==='0') history.push("/login");
    const module = modules_
    const url=SERVER_URL.concat(module.ctx)
    const accUrl=SERVER_URL.concat(module.ctx1)
    const initAcc =module.state1
    const initialState = module_.state
    console.log('module_',module_.state[0])
    const current_= module_.state[0].query;//initialState[0].query;
    const title =module.title
    const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
    const [isDebit, setIsDebit ] = useState(true);
    const modelid = module.modelid;
    const [current,setCurrent] = useState(current_);
    const [data, setData] = useState(initialState);
    const [accData, setAccData] = useState(initAcc);
    const [toolbar, setToolbar] = useState(true);
    const [iwsState, setIwsState] = useState(iwsStore.initialState);
    const columnsX= modelid===formEnum.PACB?columnsPACB(t):ColumnJournal(t);
    const toggleToolbar= ()=> setToolbar(!toolbar );
    const toggle= ()=> setState({...state, collapse:!state.collapse });
    const acc_modelid=parseInt(ACCOUNT(t).id);
    const accData_ = iwsState.get(acc_modelid)?iwsState.get(acc_modelid):[...initAcc];
    console.log('accData_', accData_)
    let init = false
    useEffect(() => {
        if(!init) {
            iwsStore.subscribe(setIwsState);
            init = true
        }
        // load account data as they are needed
        accUrl&&Get1(accUrl, token,  iwsStore, acc_modelid);
    },[init] );

    const getUrl=() =>url.concat('/')
        .concat(current.account).concat('/')
        .concat(current.fromPeriod).concat('/')
        .concat(current.toPeriod);

    return Internal(isDebit, t, modelid, accData_, accUrl, token, history, setAccData, initAcc, current, getUrl, setData
        , initialState, setIsDebit, title, state, url, toggle, toggleToolbar, setCurrent, toolbar, data, columnsX);

};
export default memo(JForm);


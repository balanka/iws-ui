import React, {useState, useEffect, memo, useRef} from "react";
import Grid from "react-fast-grid";
import {formEnum} from "../../../utils/FORMS";
import {JournalFormHead, FormFactory} from './FormsProps';
import {styles} from "../Tree/BasicTreeTableProps";
import EditableTable from "../../Tables2/EditableTable";
import {Get, Get1} from './CrudController';
import {useStore, ACCOUNT, MASTERFILE} from "./Menu";
import {useHistory} from "react-router-dom";
import {ColumnsBalancesheet as columns, buildExportOption} from '../../Tables2/LineFinancialsProps';
import {useTranslation} from "react-i18next";
import iwsStore from "./Store";


function Internal(data, setData, accUrl, initAcc, accData, setAccData, profile, history, current, initialState, state
    , title, getUrl, url, toggle, toggleToolbar, setCurrent, t, toolbar, columnsX) {

    const load = event => {
        event.preventDefault();
         accData?.length < 2 ?
           Get(accUrl, profile, history, setAccData) :
          current.account && current.fromPeriod && current.toPeriod ?
            Get(getUrl(), profile, history, setData) : void (0)
    };

    const submitQuery_ = event => {
        event.preventDefault();
       Get(getUrl(), profile, history, setData);

    };


    let parentChildFn =(row, rows) => rows.find(a => a.id === row.account)

    function buildForm() {
        return <>
            <Grid container spacing={2} style={{...styles.outer}} direction="column">
                <JournalFormHead styles={styles} title={title} collapse={state.collapse} initialState={initialState}
                                 setData={setData} setAccData={setAccData} url={url} accUrl={accUrl}
                                 toggle={toggle} load={load} toggleToolbar={toggleToolbar}/>
                <FormFactory formid={formEnum.BALANCETREE} current={current} setCurrent={setCurrent} t={t} accData={accData}
                             collapse={state.collapse} styles={styles} submitQuery={submitQuery_}/>

                <Grid container spacing={2} style={{...styles.inner}} direction="column">
                    <EditableTable Options={{...buildExportOption("EXPORT_CSV", "EXPORT_PDF", title)
                        , selection: false, grouping: true, toolbar: toolbar, exportAllData: true}}
                        flag={false} data={data} columns={columnsX} t={t} parentChildData={parentChildFn}/>

                </Grid>
            </Grid>
        </>
    }

    return buildForm();
}

const  BasicTreeTable =()=> {
    const { t,  } = useTranslation();
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const { profile,  } = useStore()
    const { token, company, locale, currency  } = profile
    const {  selected, menu } = useStore();
    let history = useHistory()
    const module_= menu.get(selected);
    if ((typeof module_ === "undefined") || !module_ || module_.id === '11111') history.push("/login");
    if(module_.id==='0') history.push("/login");
    const url=SERVER_URL.concat(module_.ctx).concat("/").concat(company);
    const accUrl=SERVER_URL.concat(MASTERFILE.acc).concat("/").concat(company);
    const initAcc =module_.state1
    const initialState = module_.state

    const current_= initialState;
    const title = t(module_.title);
    const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
    const [current,setCurrent] = useState(current_);
    const [data, setData] = useState(initAcc);
    const [setAccData] = useState(initAcc);

    const [toolbar, setToolbar] = useState(false);
    const [iwsState, setIwsState] = useState(iwsStore.initialState);
    const acc_modelid=parseInt(ACCOUNT(t).id);
    const accData_ = iwsState.get(acc_modelid)?iwsState.get(acc_modelid):[...initAcc];
    const init = useRef(false)
    useEffect(() => {
        if(!init.current) {
            iwsStore.subscribe(setIwsState);
            init.current = true
        }
        // load account data as they are needed
        accUrl&&Get1(accUrl, token,  acc_modelid);
        setCurrent(current_)
    }, [current_, accUrl, token, acc_modelid]);
    const toggleToolbar= ()=> setToolbar(!toolbar );
    const toggle = ()=> setState({...state, collapse:!state.collapse });
    const columnsX = columns(t, locale, currency);
    const getUrl=() =>url.concat('/')
        .concat(current.account).concat('/')
        .concat(current.fromPeriod).concat('/')
        .concat(current.toPeriod);

    return Internal(data, setData, accUrl, initAcc, accData_, setAccData, token, history, current?current:current_, initialState
      , state, title, getUrl, url, toggle, toggleToolbar, setCurrent, t, toolbar, columnsX);
};
export default  memo(BasicTreeTable)

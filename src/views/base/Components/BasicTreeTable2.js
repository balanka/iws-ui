import React, { useState, useEffect, memo} from "react";
import Grid from "react-fast-grid";
import {formEnum} from "../../../utils/FORMS";
import {JournalFormHead, FormFactory} from './FormsProps';
import {styles} from "../Tree/BasicTreeTableProps";
import EditableTable from "../../Tables2/EditableTable";
import {Get, Query} from './CrudController';
import {useGlobalState, LOGIN_MENU} from "./Menu";
import {useHistory} from "react-router-dom";
import {OptionsM, ColumnsBalancesheet as columns} from '../../Tables2/LineFinancialsProps';
import {useTranslation} from "react-i18next";

function Internal(data, setData, accUrl, initAcc, accData, setAccData, profile, current, initialState, state
    , title, getUrl, url, toggle, toggleToolbar, setCurrent, t, toolbar, columnsX) {
    const load = event => {
        event.preventDefault();
        accData?.length < 2 ?
            Query(event, accUrl, profile, setAccData, initAcc) :
            current.account && current.fromPeriod && current.toPeriod ?
                Query(event, getUrl(), profile, setData, initialState) : void (0)
    };
    const parentChildData = (row, rows) => rows.find(a => a.id === row.account)

    function buildForm() {
        return <>
            <Grid container spacing={2} style={{...styles.outer}} direction="column">
                <JournalFormHead styles={styles} title={title} collapse={state.collapse} initialState={initialState}
                                 setData={setData} setAccData={setAccData} url={url} accUrl={accUrl}
                                 toggle={toggle} load={load} toggleToolbar={toggleToolbar}/>

                <FormFactory formid={formEnum.BALANCETREE} current={current} setCurrent={setCurrent} t={t}
                             accData={accData}
                             collapse={state.collapse} styles={styles} submitQuery={load}/>
                <Grid container spacing={2} style={{...styles.inner}} direction="column">
                    <EditableTable Options={{...OptionsM, selection: false, grouping: true, toolbar: toolbar}}
                                   flag={false} data={data}
                                   columns={columnsX} t={t} parentChildData={parentChildData}/>
                </Grid>
            </Grid>
        </>
    }

    return buildForm();
}

const  BasicTreeTable2 =()=> {
    const { t,  } = useTranslation();
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const [profile, ] = useGlobalState('profile');
    const [selected, ] = useGlobalState('selected');
    const [menu, ] = useGlobalState('menu');
    const datax =  profile?.modules?profile.modules:[];
    let history = useHistory()
    //console.log('selected', selected);
    //console.log('menu.get(selected)', menu.get(selected));
    const module_= menu.get(selected);
    const loginMenu = menu&&menu.length>0?menu.get('/login'):LOGIN_MENU(t)[0]
    //if(!module_) history.push("/login");
    /*console.log('menu', menu);
    console.log('loginMenu', loginMenu);
    console.log('module_', module_);

     */
    const modules_= (module_)&&datax.includes(module_.id)?module_:loginMenu
    //console.log('modules_', modules_);
    if(modules_.id==='0') history.push("/login");
    const module = modules_
    //console.log('menu.module', module);
    const url=SERVER_URL.concat(module.ctx)
    const accUrl=SERVER_URL.concat(module.ctx1)
    const initAcc =module.state1
    const initialState = module.state
    const current_= initialState;
    const title =module.title
    const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
    const [current,setCurrent] = useState(current_);
    const [data, setData] = useState(initAcc);
    const [accData, setAccData] = useState(initAcc);
    Get(url, profile, setAccData);
    //console.log('modules_', modules_);
    const [toolbar, setToolbar] = useState(false);
    useEffect(() => {setCurrent(current_)}, [current_]);
    const toggleToolbar= ()=> setToolbar(!toolbar );
    const toggle = ()=> setState({...state, collapse:!state.collapse });
    const columnsX = columns(t);
    const getUrl=() =>url.concat('/')
        .concat(current.account).concat('/')
        .concat(current.fromPeriod).concat('/')
        .concat(current.toPeriod);
    return Internal(data, setData, accUrl, initAcc, accData, setAccData, profile, current, initialState, state
        , title, getUrl, url, toggle, toggleToolbar, setCurrent, t, toolbar, columnsX);
};
export default  memo(BasicTreeTable2)

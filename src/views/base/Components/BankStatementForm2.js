import React, {useEffect, useState, memo} from 'react'
import Grid from "react-fast-grid";
import {useTranslation} from "react-i18next";
import {OptionsM, ColumnFactory} from "../../Tables2/LineFinancialsProps";
import {BSFormHead, FormFactory} from "./FormsProps";
import EditableTable from "../../Tables2/EditableTable";
import {styles,  theme} from "../Tree/BasicTreeTableProps";
import {Edit, EditRow, Post, Query} from './CrudController';
import {LOGIN_MENU, useGlobalState} from "./Menu";
import {useHistory} from "react-router-dom";

function internal(url, profile, initialState, data, setData,  current, setCurrent,  title, state
    , toggle, toggleToolbar, modelid_, t, toolbar, columns, rows, setSelectedRows) {

    const isEmpty = (str) => (!str || 0 === str.length);
    const submitQuery = event => {
        event.preventDefault();
        !isEmpty(url) && Query(event, url, profile, setData, initialState);
    };
    const cancelEdit = (e) => EditRow({...current}, false, setCurrent);

    const submitPost = event => {
        event.preventDefault();
        Post(url, profile, rows, "/post");
    };

    const edit = editedRow => {
        const record = data.find(obj => obj.bid === editedRow.bid);
        const row = {...record, editing: true}
        setCurrent(row);
    }

    const submitEdit = event => {
        event.preventDefault();
        if (current.editing && !current.posted) {
            const row = {...current}
            setCurrent(row);
            Edit(url, profile, row, data, setCurrent);
        }
    };


    function buildForm(current) {
        return <>
            <Grid container spacing={2} style={{...styles.outer}} direction="column">
                <BSFormHead styles={styles} title={title} collapse={state.collapse} setData={setData}
                            url={url} cancelEdit={cancelEdit} submitEdit={submitEdit}
                            submitQuery={submitQuery} submitPost={submitPost} toggle={toggle}
                            toggleToolbar={toggleToolbar}/>
                <FormFactory formid={modelid_} current={current} setCurrent={setCurrent} t={t}
                             collapse={state.collapse} styles={styles}/>
                <Grid container spacing={2} style={{...styles.inner, display: 'block'}} direction="column">
                    <EditableTable Options={{...OptionsM, toolbar: toolbar}} data={data}
                                   columns={columns} theme={theme} t={t} edit={edit} setSelectedRows={setSelectedRows}/>

                </Grid>
            </Grid>
        </>;
    }

    return buildForm(current);
}

const BankStatementForm2 = () => {
    const { t,  } = useTranslation();
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const [profile, ] = useGlobalState('profile');
    const [selected, ] = useGlobalState('selected');
    const [menu, ] = useGlobalState('menu');
    const datax =  profile?.modules?profile.modules:[];
    let history = useHistory()

    const module_= menu.get(selected);
    const loginMenu = menu&&menu.length>0?menu.get('/login'):LOGIN_MENU(t)[0]
    const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
    const [rows, setRows] =useState([])
    const modules_= (module_)&&datax.includes(module_.id)?module_:loginMenu
    if(modules_.id==='0') history.push("/login");
    const module = modules_
    const url=SERVER_URL.concat(module.ctx)
    const initialState = module.state
    const current_= initialState[0]
    const title =module.title
    const modelid_ = module.modelid;
    const [data, setData] = useState(initialState);
    const [current,setCurrent] = useState(current_);
    const [toolbar, setToolbar] = useState(true);
    useEffect(() => {}, [current, setCurrent, data]);
    useEffect(() => {setCurrent(current_)}, [ current_]);
    const toggleToolbar= ()=> setToolbar(!toolbar );
    const toggle= ()=> setState({...state, collapse:!state.collapse });
    const columns = ColumnFactory(modelid_, data, t);
    const setSelectedRows = (rows_)=>setRows(rows_.map( item =>item.bid));
     return internal(url, profile, initialState, data, setData,  current, setCurrent,  title, state
        , toggle, toggleToolbar, modelid_, t, toolbar, columns, rows, setSelectedRows);

};
export default memo(BankStatementForm2);



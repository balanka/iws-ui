import React, {useEffect, useState, memo} from 'react'
import Grid from "react-fast-grid";
import {useTranslation} from "react-i18next";
import {OptionsM,  ColumnsBS} from "../../Tables2/LineFinancialsProps";
import {BSFormHead, FormFactory} from "./FormsProps";
import EditableTable from "../../Tables2/EditableTable";
import {styles,  theme} from "../Tree/BasicTreeTableProps";
import {Edit, EditRow, Get, Get2} from './CrudController';
import { useStore} from "./Menu";
import {useHistory} from "react-router-dom";

function internal(url, token, history, initialState, data, setData,  current, setCurrent,  title, state
    , toggle, toggleToolbar, modelid_, t, toolbar, columns, rows, setSelectedRows, module_) {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const isEmpty = (str) => (!str || 0 === str.length);
    const submitQuery = event => {
        event.preventDefault();
        !isEmpty(url) && Get( url, token, history,setData);
    };
    const cancelEdit = (e) => EditRow({...current}, false, setCurrent);

    const submitPost = event => {
        event.preventDefault();
        const url_= SERVER_URL.concat(module_.state3).concat("/post/").concat(current.company).concat("/").concat(rows.join(","));
        Get2(url_, token, setCurrent);
    };

    const edit = editedRow => {
        const record = data.find(obj => obj.id === editedRow.id);
        const row = {...record, editing: true}
        setCurrent(row);
    }

    const submitEdit = event => {
        event.preventDefault();
        if (current.editing && !current.posted) {
            delete current.editing
            const url_= SERVER_URL.concat(module_.state3)
            Edit(url_, token, {...current}, data, setCurrent);
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

const BankStatementForm = () => {
    const { t,  } = useTranslation();
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const { profile,  } = useStore()
    const { token, company} = profile
    const {  selected, menu } = useStore();
    let history = useHistory();
    const module_= menu.get(selected);

    const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
    const [rows, setRows] =useState([])
    if ((typeof module_ === "undefined") || !module_ || module_.id === '11111') history.push("/login");
    const url=SERVER_URL.concat(module_.ctx).concat("/").concat(company);
    const initialState = module_.state
    const current_= initialState[0]
    const title = t(module_.title);
    const modelid_ = module_.modelid;
    const [data, setData] = useState(initialState);
    const [current,setCurrent] = useState(current_);
    const [toolbar, setToolbar] = useState(true);
    useEffect(() => {}, [current, setCurrent, data]);
    const toggleToolbar= ()=> setToolbar(!toolbar );
    const toggle= ()=> setState({...state, collapse:!state.collapse });
    const columns = ColumnsBS(t);
    const setSelectedRows = (rows_)=>{
        let rowsx = rows_.map(item=>item.id);
        setRows(rowsx);
        console.log('rows', rowsx);
    };

    return internal(url, token, history,initialState, data, setData,  current, setCurrent,  title, state
        , toggle, toggleToolbar, modelid_, t, toolbar, columns, rows, setSelectedRows, module_);

};
export default memo(BankStatementForm);



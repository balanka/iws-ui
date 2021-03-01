import React, {useState} from 'react'
import {AccountContext} from "./AccountContext";
import {useGlobalState} from './Menu';
import { Query, Get, Post,  Login,  Add, Edit, EditRow} from './CrudController';

const CrudAccount =  (props)=> {
    const { form, initialState, initAcc, initCc, url, accUrl, ccUrl, bankUrl, modelid, get, title, headers} = props
    const [ current, setCurrent ] = useState(initialState);
    const [ editing, setEditing ] = useState(false);
    const [profile, setProfile] = useGlobalState('profile');
    const submitEdit = (record, data) =>Edit(url, profile, record, data, setCurrent);
    const submitAdd = (record, data) => Add(url, profile, record, data, initialState, setCurrent);
    const submitPost = (record, ctx) =>  Post(url, profile, record, ctx);
    const submitLogin = (history, url, data) => Login(history, url, data, setProfile);
    const submitGet = (url, history, func) => Get(url, profile, history, func);
    const submitQuery = (event, url, func, history, init) =>Query(event, url, profile, history, func, init);
    const deleteUser =() => setEditing(false);
    const editRow = (current, flag)  =>EditRow(current, flag, setCurrent);


    return (
     <div className="animated fadeIn">
        <AccountContext  form ={form} url={url}  get={get} title={title} accUrl={accUrl} ccUrl={ccUrl} bankUrl={bankUrl}
                         submitAdd={submitAdd} submitGet={submitGet} l submitEdit={submitEdit} submitPost={submitPost}
                         login={submitLogin} editing={editing} setEditing={setEditing}  current={current}
        setCurrent={setCurrent} initialState={initialState} initAcc={initAcc} initCc={initCc} editRow={editRow}
                         headers={headers} modelid={modelid} deleteUser={deleteUser} submitQuery={submitQuery}>
                  <>
                      { form }
                 </>
         </AccountContext>
        </div>
    )
};
export default  CrudAccount


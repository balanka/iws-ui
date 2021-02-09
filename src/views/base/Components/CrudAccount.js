import React, {useState, Fragment} from 'react'
import {AccountContext, useGlobalState} from "./AccountContext";
import { Query, Get, Post,  login,  Add, Edit} from './CrudController';

const CrudAccount =  (props)=> {
    const { form, initialState, initAcc, initCc, url, accUrl, ccUrl, bankUrl, modelid, get, title, headers} = props
    const [ current, setCurrent ] = useState(initialState);
    const [ editing, setEditing ] = useState(false);
    const [profile, setProfile] = useGlobalState('profile');

    const submitEdit = (record, data) =>Edit(url, profile, record, data, setCurrent);
    const submitAdd = (record, data) => Add(url, profile, record, data, initialState, setCurrent);
    const submitPost = (record, ctx) =>  Post(url, profile, record, ctx);
    const submitLogin = (url, data) => login(url, data, setProfile);
    const submitGet = (url, func) => Get(url, profile, func);
    const submitQuery = (event, url, func, init) =>Query(event, url, profile, func, init);
    const deleteUser =() => setEditing(false);

    return (
     <div className="animated fadeIn">
        <AccountContext  form ={form} url={url}  get={get} title={title} accUrl={accUrl} ccUrl={ccUrl} bankUrl={bankUrl}
                         submitAdd={submitAdd} submitGet={submitGet} l submitEdit={submitEdit} submitPost={submitPost}
                         login={submitLogin} editing={editing} setEditing={setEditing}  current={current}
                         setCurrent={setCurrent} initialState={initialState} initAcc={initAcc} initCc={initCc}
                         headers={headers} modelid={modelid} deleteUser={deleteUser} submitQuery={submitQuery}>
            <div className="flex-row">
                <div className="flex-large">
                  <Fragment>
                      { form }
                 </Fragment>
                </div>
            </div>
         </AccountContext>
        </div>
    )
};
export default CrudAccount


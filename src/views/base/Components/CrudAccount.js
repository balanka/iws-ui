import React, {useState, Fragment} from 'react'
import MasterfileForm from "./MasterfileForm";
import PACBForm  from "./PACBForm";
import JournalForm from "./JournalForm";
import FinancialsForm from "./FinancialsForm";
import BankStatementForm from './BankStatementForm';
import {AccountContext, useGlobalState} from "./AccountContext";
import Login from '../../pages/login/Login'
import TreeTableForm from "../Tree/TreeTableForm";
import BasicTreeTable from "../Tree/BasicTreeTable";
import axios from "axios";

const CrudAccount =  (props)=> {
    const [ current, setCurrent ] = useState(props.initialState);
    const [ editing, setEditing ] = useState(false);
    const [profile, setProfile] = useGlobalState('profile');

  const renderComponent =(componentName)=> {
    const componentLookup = {
      companyForm      : <MasterfileForm/>,
      masterfileForm   : <MasterfileForm/>,
      bankStmtForm     : <BankStatementForm/>,
      pacForm          : <PACBForm/>,
      financialsForm   : <FinancialsForm/>,
      balancesheetForm : <TreeTableForm/>,
      journalForm      : <JournalForm/>,
      loginForm        : <Login/>,
      treeForm         : <BasicTreeTable/>
    };
    return (<Fragment>
           {componentLookup[componentName]}
          </Fragment>);
    }

    const submitEdit = (newRecord, data) => {
     //console.log("newRecordX", newRecord);
     axios.patch( props.url, newRecord, {headers: {'authorization':profile.token}})
      .then(response => {
         console.log('response.data.', response.data);
        const index = data.hits.findIndex(obj => obj.id === newRecord.id);
        data.hits[index]= newRecord;
        setCurrent(newRecord);
      }).catch(function (error) {
         console.log('error', error);
       });
  };
    const submitAdd = (record, data) => {
      //console.log("Record", record);
    axios.post( props.url, record, {headers: {'authorization':profile.token}})
      .then(response => {
        //console.log('responsex', response.data);
        const i = data.hits.findIndex(obj => obj.id === record.id);
        const index = i === -1? data.hits.length+1:i;
        //console.log(' index', index);
        data.hits[index]=record;
        const row = {...props.initialState, editing:false};
        setEditing(false);
        setCurrent(row);
        //console.log(' row', row);
      }).catch(function (error) {
        console.log('error', error);
      });
  };
    const submitPost = (record, ctx) => {
     axios.patch(props.url.concat(ctx), record, {headers: {'authorization':profile.token}})
      .then(response => {
        console.log('responsex', response.data);
      }).catch(function (error) {
      console.log('error', error);
    });
  };
    const login = (url, data) => {
        axios.post( url, data)
            .then(response => {
                const {authorization} = response.headers
                setProfile({token:authorization, company:response.data.company, modules:response.data.menu})
            }).catch(function (error) {
            console.log('error', error);
        });
    }

    const submitGet = (url, func) => {
        axios.get( url, {headers: {'authorization':profile.token}})
            .then(response => {
                const resp = response.data
                func(resp)
                return resp;
            }).catch(function (error) {
            console.log('error', error);
        });
      //  return res;
    }

    const submitQuery = (event, url, func, init) => {
      console.log("url", url);
        const fetchData =(url_, func)=>{
            const res = submitGet(url_, func);
            console.log("resx", res);
            const datax = res?.hits ? res.hits : init;
            return datax;
        }
        fetchData(url, func);
        event.preventDefault();
    };

    const deleteUser =() => setEditing(false);

    return (
      <div className="animated fadeIn">
          <AccountContext  form ={props.form} url={props.url}  get={props.get} title={props.title} lineTitle={props.lineTitle}
                           accUrl={props.accUrl} ccUrl={props.ccUrl} submitAdd={submitAdd} submitGet={submitGet} login={login}
                           editing={editing} setEditing={setEditing}  current={current}
                           setCurrent={setCurrent} submitEdit={submitEdit} submitPost={submitPost} 
                           initialState={props.initialState} headers={props.headers}
                           initAcc={props.initAcc} initCc={props.initCc} modelid={props.modelid}
                           deleteUser={deleteUser} submitQuery={submitQuery}>

            <div className="flex-row">
                <div className="flex-large">
                  <Fragment>
                      {   renderComponent(props.form)}
                 </Fragment>
                </div>
            </div>
         </AccountContext>
        </div>
    )
};
export default CrudAccount


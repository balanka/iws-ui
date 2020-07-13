import React, {useState, Fragment} from 'react'
import AccountForm from "./AccountForm";
import CostCenterForm from "./CostCenterForm";
import CustomerForm from "./CustomerForm";
import VatForm from "./VatForm";
import PACBForm  from "./PACBForm";
import JournalForm from "./JournalForm";
import FinancialsForm from "./FinancialsForm";
import GenericMasterfileForm from "./GenericMasterfileForm";
import BankStatementForm from './BankStatementForm';
import {AccountContext, useGlobalState} from "./AccountContext";
import Login from '../../pages/login/Login'
import TreeTableForm from "../Tree/TreeTableForm";
import axios from "axios";

export  function CrudAccount  (props) {
    const [ current, setCurrent ] = useState(props.initialState);
    const [ editing, setEditing ] = useState(false);
    const [token, setToken] = useGlobalState('token');

  const renderComponent =(componentName)=> {
    const componentLookup = {
      accountForm      : (<AccountForm/>),
      costCenterForm   : (<CostCenterForm/>),
      customerForm     : (<CustomerForm/>),
      supplierForm     : (<CustomerForm/>),
      bankStmtForm     : (<BankStatementForm/>),
      vatForm          : (<VatForm/>),
      pacForm          : (<PACBForm/>),
      financialsForm   : (<FinancialsForm/>),
      balancesheetForm : (<TreeTableForm/>),
      journalForm      : (<JournalForm/>),
      loginForm        : (<Login/>),
      masterfileForm   : (<GenericMasterfileForm/>)
    };
    return (<Fragment>
           {componentLookup[componentName]}
          </Fragment>);
    }

    const submitEdit = (newRecord, data) => {
     console.log("newRecord", newRecord);
     axios.patch( props.url, newRecord, {headers: {'authorization':token}})
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
      console.log("Record", record);
      console.log("props.url", props.url);
    axios.post( props.url, record, {headers: {'authorization':token}})
      .then(response => {
        console.log('responsex', response.data);
        const i = data.hits.findIndex(obj => obj.id === record.id);
        const index = i === -1? data.hits.length+1:i;
        console.log(' index', index);
        data.hits[index]=record;
        const row = {...props.initialState, editing:false};
        setEditing(false);
        setCurrent(row);
        console.log(' row', row);
      }).catch(function (error) {
        console.log('error', error);
      });
  };
    const submitPost = (record) => {
    console.log("Record", record);
    console.log("props.url", props.url);
    axios.patch(props.url.concat("/post"), record, {headers: {'authorization':token}})
      .then(response => {
        console.log('responsex', response.data);
      }).catch(function (error) {
      console.log('error', error);
    });
  };
    const login = (url, data) => {
        axios.post( url, data)
            .then(response => {
                console.log('responsex', response.data);
                const {authorization} = response.headers
                const tken= response.data.hash
                setToken(authorization)
                console.log('tken', tken)
                console.log('token', token);
            }).catch(function (error) {
            console.log('error', error);
        });
    }

    const submitGet = (url, func) => {
        console.log('authorization2', token);
        let res=null
        axios.get( url, {headers: {'authorization':token}})
            .then(response => {
                console.log('response.data', response.data);
                console.log('response.headers', response.headers);
                const resp = response.data
                res=resp
                func(resp)
                return resp;
            }).catch(function (error) {
            console.log('error', error);
        });
        return res;
    }

    const submitQuery = (event, url, func, init) => {

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
    const editRow = (current_, isNew)  => {
      console.log('isNew', isNew );
      console.log('current_', current_ );
      const flag = typeof isNew==='undefined' || typeof current_.editing==='undefined' ;
      const row = {...current_, editing:flag};
      console.log('row1_', row );
       setCurrent(row);
       setEditing( row.editing);
    };

    return (
      <div className="animated fadeIn">
          <AccountContext  form ={props.form} url={props.url}  get={props.get} title={props.title} lineTitle={props.lineTitle}
                           accUrl={props.accUrl} ccUrl={props.ccUrl} submitAdd={submitAdd} submitGet={submitGet} login={login}
                           editing={editing} setEditing={setEditing} editRow={editRow} current={current}
                           setCurrent={setCurrent} submitEdit={submitEdit} submitPost={submitPost} initAcc={props.initAcc}
                           initialState={props.initialState} addLabel={props.addLabel} headers={props.headers}
                           initAcc={props.initAcc} initCc={props.initCc} updateLabel={props.updateLabel}
                           deleteUser={deleteUser} submitQuery={submitQuery}>

            <div className="flex-row">
                <div className="flex-large">
                  <Fragment>
                     {renderComponent(props.form)}
                 </Fragment>
                </div>
            </div>
         </AccountContext>
        </div>
    )
}


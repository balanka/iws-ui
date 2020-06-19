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
import {AccountContext} from "./AccountContext";
import TreeTableForm from "../Tree/TreeTableForm";
import axios from "axios";

export default function CrudAccount(props) {
    const [ current, setCurrent ] = useState(props.initialState);
    const [ editing, setEditing ] = useState(false);

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
      masterfileForm   : (<GenericMasterfileForm/>)
    };
    return (<Fragment>
           {componentLookup[componentName]}
          </Fragment>);
    }

    const submitEdit = (newRecord, data) => {
     console.log("newRecord", newRecord);
     axios.patch( props.url, newRecord)
      .then(response => {
        console.log(' response.data.', response.data);
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
    axios.post( props.url, record)
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
    axios.patch(props.url.concat("/post"), record)
      .then(response => {
        console.log('responsex', response.data);
        //setEditing(false);
        //setCurrent(row);
        //console.log(' row', row);
      }).catch(function (error) {
      console.log('error', error);
    });
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
                           accUrl={props.accUrl} ccUrl={props.ccUrl} submitAdd={submitAdd}
                           editing={editing} setEditing={setEditing} editRow={editRow} current={current}
                           setCurrent={setCurrent} submitEdit={submitEdit} submitPost={submitPost}
                           initialState={props.initialState} addLabel={props.addLabel} headers={props.headers}
                           updateLabel={props.updateLabel} deleteUser={deleteUser} >

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

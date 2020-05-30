import React, {useState, Fragment, useEffect, useContext} from 'react'
import AccountForm from "./AccountForm";
import CostCenterForm from "./CostCenterForm";
import CustomerForm from "./CustomerForm";
import VatForm from "./VatForm";
import GenericMasterfileForm from "./GenericMasterfileForm";
import {AccountContext} from "./AccountContext";
import {crudGenericContext} from "./CrudGenericContext";
import LookUp from "../../../utils/LookUp";
import AsyncHook from "../../../utils/useAsyncHook";

import axios from "axios";


export default function CrudAccount(props) {
    //const value = useContext(crudGenericContext);
   // const registry = value.registry;
    // const iwsMap = value.iwsMap;
    console.log("value", value);
    console.log("iwsMap", iwsMap);
    console.log("registry", registry);
    console.log("iwsMap", iwsMap);
    const [ current, setCurrent ] = useState(props.initialState);
    const [ editing, setEditing ] = useState(false);

    useEffect(() => {},[props.url, props.get]);
  /*
  const renderComponent =(componentName)=> {
    const componentLookup = {
      accountForm    : (<AccountForm/>),
      costCenterForm : (<CostCenterForm/>),
      customerForm   : (<CustomerForm/>),
      supplierForm   : (<CustomerForm/>),
      vatForm   : (<VatForm/>),
      masterfileForm : (<GenericMasterfileForm/>)
    };
    return (<Fragment>
           {componentLookup[componentName]}
          </Fragment>);
    }
   */
    const submitEdit = (newRecord, data) => {
     console.log("newRecord", newRecord);
     axios.patch( props.url, newRecord)
      .then(response => {
        console.log(' response.data.', response.data);
        const index = data.hits.findIndex(obj => obj.id.value === newRecord.id.value);
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
        const i = data.hits.findIndex(obj => obj.id.value === record.id.value);
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

    const deleteUser = id => setEditing(false);
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
        <div className="container">
          <AccountContext form ={props.form} url={props.url}  get={props.get}  accUrl={props.accUrl} submitAdd={submitAdd} editing={editing}
                                setEditing={setEditing} editRow={editRow} current={current}
                                setCurrent={setCurrent} submitEdit={submitEdit} iwsMap={iwsMap}
                               initialState={props.initialState} addLabel={props.addLabel} headers={props.headers}
                               updateLabel={props.updateLabel} deleteUser={deleteUser} >

            <h1>{props.title}</h1>
            <div className="flex-row">
                <div className="flex-large">
                  <Fragment>
                     {renderComponent(props.form)};
                 </Fragment>
                </div>
            </div>
         </AccountContext>
        </div>
    )
}

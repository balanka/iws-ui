import React, {useState, Fragment, useEffect} from 'react'
import GenericMasterfileForm from "./GenericMasterfileForm";
import  {CrudGenericContext} from './CrudGenericContext'
import axios from "axios";

export default function CrudGeneric(props) {

    const [ current, setCurrent ] = useState(props.initialState);
    const [ editing, setEditing ] = useState(false);
    const c=<GenericMasterfileForm/>

    useEffect(() => {},[props.url, props.get]);

    const submitEdit = (newRecord, data) => {
     console.log("newRecord", newRecord);
     axios.patch( props.url, newRecord)
      .then(response => {
        console.log('response.data.', response.data);
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
        console.log('response.data.', response.data);
        const i = data.hits.findIndex(obj => obj.id.value === record.id.value);
        const index = i === -1? data.hits.length+1:i;
        console.log(' index', index);
        data.hits[index]=record;
        const row = {...props.initialState, editing:false};
        setEditing(false);
        setCurrent(row);
      }).catch(function (error) {
        console.log('error', error);
      });
  };

    const deleteUser = id => setEditing(false);
    const editRow = (current_, isNew)  => {
      console.log('isNew', isNew );
      console.log('current_', current_ );
      const flag = typeof isNew==='undefined' || typeof current_.editing==='undefined' ;
      const row = {id:current_.id, name:current_.name,description:current_.description,
      modelId:current_.modelId, parent:current_.parent, editing:flag };
      console.log('row', row );
       setCurrent(row);
       setEditing( row.editing);
    };

    return (
        <div className="container">
          <CrudGenericContext  url={props.url}  get={props.get}  submitAdd={submitAdd}
                               editing={editing} setEditing={setEditing} editRow={editRow}
                               current={current} setCurrent={setCurrent} submitEdit={submitEdit}
                               initialState={props.initialState} addLabel={props.addLabel} headers={props.headers}
                               updateLabel={props.updateLabel} deleteUser={deleteUser} >

            <h1>{props.title}</h1>
            <div className="flex-row">
                <div className="flex-large">
                     <Fragment>
                          <GenericMasterfileForm/>
                      </Fragment>
                </div>
            </div>
         </CrudGenericContext>
        </div>
    )
}

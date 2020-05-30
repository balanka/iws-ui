import React, {useEffect, useState, useContext}from 'react'

import {AccountContext} from './AccountContext';

export default function Select2 (props) {

  const {  value } = props.current.parent;
  const {value2 } = useContext(AccountContext);
  const [record, setRecord] = useState(props.current);
  useEffect(() => {}, [ value, record, setRecord ]);

  const handleInputChange = (event) => {
    const current_ = props.current;
    const { name, value } = event.target;
    console.log("current_", current_);
    console.log("value", value);
    console.log("value2", value2);
    console.log("data", props.data);
    const row = {id:current_.id, name:current_.name,description:current_.description,
                  modelId:current_.modelId, parent:value};
        setRecord(row);
        props.editRow(row);
        props.refresh(true);
    };
  const mapping = (item) =>
    item.value === value ?
      <option key={item.id} value={item.value} selected>{item.label}</option> :
      <option key={item.id} value={item.value}>{item.label}</option>;


  return (
    <select key ={props.id} name={props.name} id={props.id}
            value={props.editing?props.current.parent:value}
            onChange={handleInputChange}
            isSearchable='true'
            options={props.data.map (mapping)}/>

  );
};

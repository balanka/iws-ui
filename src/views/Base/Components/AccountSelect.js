import React, { useState, useEffect } from 'react'
import {Input} from "reactstrap";

 export default function AccountSelect (props) {
     const editing_ = props.editing;
     const [data, setData] = useState(props.data);
     const [current, setCurrent ] = useState([]);
     const [editing, setEditing ] = useState(editing_);

   useEffect(() => { setEditing(editing_)}, [editing_ ]);
   console.log("editing", editing);
     useEffect( () => {}, [data, setData, props.data]);

   useEffect( () => {
     console.log("props.current++++++", props.current);
     setCurrent(props.current);
     console.log("current++++++", current);

   }, [props.current, props.data]);

   const handleInputChange = (event) => {
     const current_ = props.current;
     const { name, value } = event.target;
      console.log("data", props.data);
     console.log("props.editing", props.editing);
     console.log("editing", editing);
     const row = {id:current_.id, name:current_.name,description:current_.description,
       modelId:current_.modelId, parent:value, editing:editing };
     //setCurrent(row);
     props.setEditing(editing);
     props.editRow(row, editing);
     props.setParent(value);
     //props.refresh(false);
   };

   const mapping = (item) =>
     item.id === current.id ?
       <option key={item.id} value={item.value} selected>{item.label}</option> :
       <option key={item.id} value={item.value}>{item.label}</option>;

    return (
      <Input className ="flex-row" type="select" name={props.name} id={props.id}
             value={ current.parent}
             onChange={handleInputChange} >
        { props.data.map (mapping)}

      </Input>
     );
};

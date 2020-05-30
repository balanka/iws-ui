import React, { useState, useEffect } from 'react'
import {Input} from "reactstrap";

 export default function InputSelect2 (props) {
     const editing_ = props.editing;
     const parent_ = props.parent;
     const [data, setData] = useState(props.data);
     const [parent, setParent] = useState(parent_);
     const [current, setCurrent ] = useState(props.current);
     const [editing, setEditing ] = useState(editing_);
   useEffect(() => { setParent(parent_)}, [parent_ ]);
   useEffect(() => { setEditing(editing_)}, [editing_ ]);
   console.log("editing", editing);
   console.log("current", current);
     useEffect( () => {}, [data, setData, props.data]);

   useEffect( () => {
     console.log("props.current++++++", props.current);
     setCurrent(props.current);
     console.log("current++++++", current);

   }, [props.current, props.data, parent]);

   const handleInputChange = (event) => {
     const current_ = props.current;
     const { name, value } = event.target;
      console.log("data", props.data);
     console.log("props.editing", props.editing);
     console.log("editing", editing);
     console.log("parent", parent);
     console.log("props.parent", props.parent);
     //const row={...props.current, editing:editing};
     const row = {id:current_.id, name:current_.name,description:current_.description,
       modelId:current_.modelId, parent:value, editing:editing };
     setCurrent(row);
     console.log("row", row);
     props.setEditing(editing);
     //props.editRow(row);
     props.setParent1(value);
     //props.setParent(row);
   };

    return (
      <Input className ="flex-row" type="select" name={props.name} id={props.id}
             value={props.parent} onChange={handleInputChange} >
              {props.data.map (item =>
                     <option key={item.id} value={item.value}>{item.label}</option>)}

      </Input>
     );
};

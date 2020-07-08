import React, { useState, useEffect } from 'react'
import {Input} from "reactstrap";

export default function Select (props) {
  const [data, setData] = useState(props.data);
  const [ current, setCurrent ] = useState(props.current);
  const [ , setCurrentP ] = useState(props.setParent);
  const current1 = props.current;
  console.log("data", data);
  console.log("props.data", props.data);
  console.log("current", current);
  console.log("current1", current1);
  console.log("props.current", props.current);
  //useEffect( () => {
 // }, [data, setData]);
  /*
  useEffect( () => {
    console.log("current++++++", current);
    typeof current ==='undefined'? console.log("current undefined is ", ):props.setParent(current)
    //props.setParent(current)

  }, [current, setCurrent]);
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target
    console.log("value", value)
    console.log("name", name)
    console.log("data", data)
   /*
    var selectx = document.getElementById(props.id);
    console.log("selectx", selectx);
    console.log("selectx.options",selectx.options);
    console.log("selectx.selectedIndex", selectx.selectedIndex);

    */
    var selectx = document.getElementById(props.id);
    console.log("selectx", selectx.value);
    console.log("value",value)
    console.log("current",current)
    console.log("current1",current1)
    console.log("props.current",props.current)
    var x = current;
    const x1 = {id:x.id, name:x.name,description:x.description, modelId:x.modelId, parent:value};
    console.log("x1",x1);
     //setCurrent(x1);
     props.setParent(x1);

    //setCurrentP(x1);
    console.log("current after",current);
    props.refresh(false);
  };
  const mapping = (item) => <option value={item.value} selected >{item.label}</option>;
  const mapping1 = (item) => <option value={item.value}>{item.label}</option>;
 {/*
  <Input type="select" name="select" id="exampleSelect">
    <option>1</option>
    <option>2</option>
   */
    }

  return (
    <Input  type="select" name={props.name} id={props.id}   value={current.parent} onChange={handleInputChange} >
      { props.data.map (mapping)}
    </Input>
  );
};

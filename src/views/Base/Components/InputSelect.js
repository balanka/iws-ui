import React, { useState, useEffect } from 'react'
import {Input} from "reactstrap";

export default function InputSelect (props) {
  const [data, setData] = useState(props.data);
  const [ current, setCurrent ] = useState(props.current);
  const [ , setCurrentP ] = useState(props.setParent);
  console.log("data", data);
  console.log("props.data", props.data);
  console.log("current", current);
  console.log("props.current", props.current);
  useEffect( () => {
  }, [data, setData]);
  useEffect( () => {
    console.log("current++++++", current);
    props.setParent(current)

  }, [current, setCurrent]);

  const handleInputChange = () => {
    console.log(props.id);
    var selectx = document.getElementById(props.id);
    console.log("selectx", selectx);
    console.log("selectx.options",selectx.options);
    console.log("data",data);
    var val=selectx.options[selectx.selectedIndex].value;
    var val1=selectx.options[selectx.selectedIndex].value;
    console.log("props.data", props.data);
    console.log("indexOf"+val, props.data.indexOf(val1));
    console.log("selectx.selectedIndex", selectx.selectedIndex);
    console.log("val",val1);
    console.log("val",val)
    var x = props.current;
    const x1 = {id:x.id, name:x.name,username:x.username, parent:val};
    console.log("x1",x1);
    setCurrent(x1);
    setCurrent(x1);
    setCurrentP(x1);
    console.log("current after",current);
    props.refresh(false);
  };
  const mapping = (item) => <option value={item.value} selected >{item.label}</option>;

  return (
    <Input className ="flex-row" type="select" name={props.name} id={props.id}   value={ props.value} onChange={handleInputChange} >
      { props.data.map (mapping)}
    </Input>
  );
};

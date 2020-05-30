import React, { useState, useEffect } from 'react'
export default function RenderSelect (props) {

  const [ current, setCurrent ] = useState(props.current);
  useEffect( () => {
  }, [props, current, setCurrent]);


  const mapping = (item, parent) => {
    console.log("parent", props.parent);
   return item.value == parent ?
      <option key={item.id} value={item.value} selected>{item.label}</option> :
      <option key={item.id} value={item.value}>{item.label}</option>;
  }

  return props.data.map (item => mapping(item,props.parent));

};

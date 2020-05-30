import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Input} from "reactstrap";


 export default function InputSelect (props) {
     const [options, setOptions] = useState([]);

    useEffect( () => {
      async function fetchM () {
           const result = await axios( props.url);
           const mappingx = (item) => (
             {label: item.id.value.concat ( " ").concat (item.name), value: item.id.value}
           )
           setOptions(result.data.hits.map (mappingx))
            };
         fetchM();
     }, [options, setOptions]);

   const handleInputChange = () => {
     console.log(props.id)
     var myselect = document.getElementById(props.id)
     console.log(myselect)
     var val=myselect.options[myselect.selectedIndex].value;
     var x = props.current
     console.log(x)
     props.setData({id:x.id, name:x.name,description:x.description, modelId:x.modelId, parent:val} )
     //console.log(data)
   }
   const mapping = (item) => <option value={item.value}>{item.label}</option>;

    return (
      <Input className ="flex-row" type="select" name={props.name} id={props.id}   onChange={handleInputChange} >
        {options.map (mapping)}
      </Input>
     );
};

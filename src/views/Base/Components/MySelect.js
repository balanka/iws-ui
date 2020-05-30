import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { List } from 'react-virtualized';
import axios from 'axios';
import {Row} from "reactstrap";


const MenuList = props => {

    const rows = props.children;
    const renderer = ({ key, index, isScrolling, isVisible, style }) => (
      <Row>
        <div  key={key} style={style} isScrolling={isScrolling} isVisible ={isVisible} >{rows[index]} </div>
      </Row>
    );

    return (

        <List
            width={335}
            height={330}
            rowHeight={27}
            value={"TEST"}
            rowCount={rows.length}
            rowRenderer={renderer }
        />

    )
};



 export default function MySelect (props) {
     const { url} = props;
     const [options, setOptions] = useState([]);
     useEffect( () => {
         const mapping = (item) => (
             {label: item.id.concat ( " ").concat (item.name),
               value: item.id}
         )
         async function fetchM (url) {
             const result = await axios( url);
             setOptions(result.data.hits.map (mapping))
            };
         fetchM(url);
     }, [url]);


    return (

             <Select //style={{width: '100%'}}
                 components={{MenuList}} width={300} height={300}
                 //components={{ MenuList}}
                 defaultValue={options[0]}
                 options={options}
                 bsSize="sm" />
     );

};

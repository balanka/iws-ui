import React, {useEffect, useState, useContext}from 'react'
import Select from 'react-select';
import { List } from 'react-virtualized';
import axios from 'axios';
import {Row} from "reactstrap";


const MenuList = props => {
    //console.log(props.name)
    //console.log(props.children)
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
            rowCount={rows.length}
            rowRenderer={renderer }
        />

    )
};



 export default function MySelectNew (props) {
    // const { url} = props;
     const [current] = useState(props.current);
     console.log("current", current);
   const [options, setOptions] =useState(props.data)
    // const data = props.data;
     useEffect( () => {},[current]);



    return (

             <Select //style={{width: '100%'}}
                 components={{MenuList}} width={300} height={300}
                 //components={{ MenuList}}
                 value={current}
                 options={options}
                 bsSize="sm" />
     );

};

import React, { useState, useEffect } from 'react'
//import ComboboxInput from 'coreui/lib/components/ComboboxInput';
import axios from 'axios';
 export default function ComboBox (props) {
     const { url} = props;
     const [data, setData] = useState([]);
     useEffect( () => {

         async function fetchM (url) {
             const result = await axios( url);
             console.log(result.data)
             setData(result.data.hits)
            };
         fetchM(url);
     }, [url]);

    return (<div></div>

     );

};

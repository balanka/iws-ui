import React, {useState, createContext, useEffect, useContext} from 'react'
import axios from "axios";
//import {crudGenericContext} from "./CrudGenericContext";
export const accountContext2 = createContext();
export  const AccountContext2 = props => {
    const [query, setQuery] = useState(props.get);
    //const ctx=useContext(crudGenericContext);
    const crudCtx=props.value;
    const iwsMapx=props.iwsMap
     //console.log('ctx', ctx.value);
     console.log('iwsMap1', iwsMap);
    const [ iwsMap, setIwsMap] = useState(iwsMapx);
    const [ data, setData] = useState({ hits:[]});
    const [ accData, setAccData] = useState({ hits:[]});
    const [ loading, setLoading ] = useState(false);
    const [ loadingAcc, setLoadingAcc ] = useState(false);
    const url = props.url;
    console.log('url', url );
    console.log(' initialState', props.initialState );
    console.log(' data', data );
  useEffect(() => {},[iwsMapx]);

    const fetchData=(_url, isLoading, modelid, setFetchedData)=>{
      const r=iwsMap.get(modelid);
      if (isLoading && (typeof r==='undefined'||iwsMap.get(modelid).length===0) ){
        console.log('fetchingDatax'+isLoading+ 'iwsMap'+r+'modelid'+modelid);
       axios
      .get(_url)
        .then(response => {
              console.log('response.data', response.data);
              //setData(response.data);
               iwsMap[modelid]=response.data.hits;
              setFetchedData(response.data);
              console.log('data.hits.length', data.hits.length);
              console.log('drudCtx.value.iwsMap', iwsMap);
            }
        )
     };
    };
  useEffect(() => {
    setLoading(true);
    console.log('mounted or updated', loading);
    console.log('query', query);
    console.log('url', props.url.concat(props.get));
    const url_ = props.url.concat(props.get);
    const str=props.get;
    const modelid_ = str.substring(str.indexOf("/")+1,str.length);
    console.log("url_", url_);
    console.log("modelid_", modelid_);
    fetchData(url_, loading, modelid_, setData);
    return () => {
      setLoading(false);
    }
  }, [props, url, query, loading, setData]);

  useEffect(() => {
    setLoadingAcc(true);
    console.log('loadingAcc', loadingAcc);
    console.log('query', query);
    console.log('props.accUrl'+query+ "--"+loadingAcc, props.accUrl);
    const str=props.accUrl
    if(typeof str!=='undefined') {
      const modelid_ = str.substring(str.lastIndexOf("/")+1, str.length);
      console.log("modelid_", modelid_);
      fetchData(props.accUrl, loadingAcc, modelid_, setAccData);
    }
    return () => {
      setLoadingAcc(false);
    }
  }, [loadingAcc, setAccData]);

    return (
          <accountContext2.Provider value={{data:data, accData:accData,setData:setData, setAccData:setAccData, user:props.current, editing:props.editing
            , editRow:props.editRow, setCurrent:props.setCurrent, submitEdit:props.submitEdit, submitAdd:props.submitAdd
            , initialState:props.initialState, addLabel:props.addLabel, updateLabel:props.updateLabel
            , deleteUser:props.deleteUser, headers:props.headers}}>
            {props.children}
         </accountContext2.Provider>
    );
}

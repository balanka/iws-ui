
import React, {useState, createContext, useEffect, useContext} from 'react'
import axios from "axios";
import useAsyncHook from "../../../utils/useAsyncHook";

export const accountContext = createContext();
export  const AccountContext = props => {
  const [url, setUrl] = useState(props.url);
  const [get, setGet] = useState(props.get);
  const [accUrl, setAccUrl] = useState(props.accUrl);
  const data      = useAsyncHook(url, get);
  const accData   = useAsyncHook(accUrl,'');
  //useEffect(() => { setUrl(url); setAccUrl(accUrl)},[url, accUrl, get]);

  console.log('url', url );
  console.log('accUrl', accUrl );
  console.log('initialState', props.initialState );
  console.log('data', data );
  console.log('accData', accData );

  return (
    <accountContext.Provider value={{data:data, accData:accData, user:props.current, editing:props.editing
      , editRow:props.editRow, setCurrent:props.setCurrent, submitEdit:props.submitEdit, submitAdd:props.submitAdd
      , initialState:props.initialState, addLabel:props.addLabel, updateLabel:props.updateLabel
      , deleteUser:props.deleteUser, headers:props.headers}}>
      {props.children}
    </accountContext.Provider>
  );
}

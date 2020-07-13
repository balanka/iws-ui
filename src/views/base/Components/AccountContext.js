import React, {createContext} from 'react'

import useFetch from "../../../utils/useFetch";
import {createGlobalState} from "react-hooks-global-state";

const initialState = {token:'noTOken'}
export const { useGlobalState } = createGlobalState(initialState);
export const accountContext = createContext(null);
export  const AccountContext = (props) => {

const [token, setToken] = useGlobalState('token');

  const url = props.url.concat(props.get);

/*
  const res  = useFetch( url,{headers: {'authorization':token}});
  const res2 = useFetch(props.accUrl, {headers: {'authorization':token}});
  const res3 = useFetch(props.ccUrl, {headers: {'authorization':token}});
  const data = res && res.response?res.response:{hits:[]};
  const accData = res2 && res2.response?res2.response:{hits:[]};
  const ccData = res3 && res3.response?res3.response:{hits:[]};
  */
    const data = {hits:[]};
    const accData = props.initAcc;
    const ccData = props.initCc //{hits:[]};
  console.log('props.url', props.url );
  console.log('props.accUrl', props.accUrl );
  console.log('initialState', props.initialState );
  console.log('data', data );
  console.log('accData', accData );

  return (
    <accountContext.Provider value={{data:data, accData:accData, ccData:ccData,user:props.current, editing:props.editing
      , editRow:props.editRow, setCurrent:props.setCurrent, submitEdit:props.submitEdit, submitAdd:props.submitAdd
      , submitGet:props.submitGet, login:props.login, submitPost:props.submitPost, initialState:props.initialState
      , addLabel:props.addLabel, updateLabel:props.updateLabel, title:props.title, lineTitle:props.lineTitle
      , deleteUser:props.deleteUser, headers:props.headers, url:props.url, get:props.get, accUrl:props.accUrl
      , initAcc:props.initAcc, submitQuery:props.submitQuery}}>
      {props.children}
    </accountContext.Provider>
  );
}



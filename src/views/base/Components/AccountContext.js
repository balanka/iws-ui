import React, {createContext} from 'react'
import {createGlobalState} from "react-hooks-global-state";
import {useTranslation} from "react-i18next";

const initialState = {profile:{token:'noTOken', company:'', modules:[]}}

export const { useGlobalState } = createGlobalState(initialState);
export const accountContext = createContext(null);

export  const AccountContext = (props) => {
    const { t,  } = useTranslation();
    const data = [];
    const accData = props.initAcc;
    const ccData = props.initCc;
    const bankData =[];

  return (
    <accountContext.Provider value={{data:data, accData:accData, ccData:ccData, bankData:bankData, user:props.current
      ,editing:props.editing, editRow:props.editRow, setCurrent:props.setCurrent, submitEdit:props.submitEdit, submitAdd:props.submitAdd
      , submitGet:props.submitGet, login:props.login, submitPost:props.submitPost, initialState:props.initialState
      , addLabel:props.addLabel, updateLabel:props.updateLabel, title:props.title, lineTitle:props.lineTitle
      , deleteUser:props.deleteUser, headers:props.headers, url:props.url, get:props.get, accUrl:props.accUrl, ccUrl:props.ccUrl
      , bankUrl:props.bankUrl, initAcc:props.initAcc, submitQuery:props.submitQuery, t:t,  modelid:props.modelid}}>
      {props.children}
    </accountContext.Provider>
  );
}



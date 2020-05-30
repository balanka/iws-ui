import React, {createContext, useContext} from 'react'
import useFetch from "../../../utils/useFetch";

export const accountContext = createContext();
export  const AccountContext = props => {

  const res  = useFetch(props.url.concat(props.get), {});
  const res2 = useFetch(props.accUrl, {});
  const res3 = useFetch(props.ccUrl, {});
  const data = res && res.response?res.response:{hits:[]};
  const accData = res2 && res2.response?res2.response:{hits:[]};
  const ccData = res3 && res3.response?res3.response:{hits:[]};
  console.log('props.url', props.url );
  console.log('props.accUrl', props.accUrl );
  console.log('initialState', props.initialState );
  console.log('data', data );
  console.log('accData', accData );

  return (
    <accountContext.Provider value={{data:data, accData:accData, ccData:ccData,user:props.current, editing:props.editing
      , editRow:props.editRow, setCurrent:props.setCurrent, submitEdit:props.submitEdit, submitAdd:props.submitAdd
      , submitPost:props.submitPost, initialState:props.initialState
      , addLabel:props.addLabel, updateLabel:props.updateLabel, title:props.title, lineTitle:props.lineTitle
      , deleteUser:props.deleteUser, headers:props.headers, url:props.url, get:props.get, accUrl:props.accUrl}}>
      {props.children}
    </accountContext.Provider>
  );
}



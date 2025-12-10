import React, {useState, useEffect} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry} from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {CommonFormHead} from './FormsProps'
import { MASTERFILE} from './Menu'
import iwsStore from '../utils/Store'
import { formEnum } from '../utils/FormEnum'
import { userColumnDefs} from '../ColumnsDefs.ts'
import { IUser} from '../Models.ts'
import {UserGrid} from '../IWSGrid'
import Login from './Login'
import UserTabs from "./UserTabs.tsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from '../utils/FormUtils.tsx'
import useForm from "./UseForm.ts";
import UseMasterfileForm from "./UseMasterfileForm.ts";
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const STYLES = {
  inner: {
    borderRadius: 5,
    boxShadow: '0 20px 50px #BBF',
    padding: 10,
    paddingLeft: 25,
    paddingRight: 20,
    //height: 350,
    paddingTop: 30,
  }
}

 const UserForm = () => {
   const [{profile, menu, selected, t}] = useForm()
   const { company } = profile
     const dispatch = useDispatch()
     let navigate = useNavigate()
     console.log('selected>>>', selected)
     let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
     module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
     if (module_ === '11111' || module_ === 11111) return <Login/>
     const [state] = useState({collapse: true, fadeIn: true, timeout: 300})
     const modelid: number = module_ ? module_.modelid : 1111
     console.log('modelid', modelid)
     const acc_modelid  = formEnum.ACCOUNT
     const acc_ctx = `${modelid === formEnum.COSTCENTER ?  MASTERFILE.acc:-1}/${acc_modelid}/${company}`
     console.log('acc_ctx', acc_ctx)
     console.log('module_', module_)
     console.log('initialState', module_.state[0])
     const current_: IUser =  module_.state[0]
     const [setIwsState] = useState(iwsStore.initialState)

     const minHeight = 400
     const maxHeight = 700
   const [{language, initAdd, added, disable, edit, edited, submitEdit, cancelEdit, reload
     , handleLanguageChange, toggle, title, rowData, current, setCurrent}] = UseMasterfileForm(current_)

     useEffect(() => {
         iwsStore.subscribe(setIwsState)
         setCurrent(current_)
     }, [])

     const onRowSelected = (event: RowSelectedEvent) =>
           setCurrent((event.data instanceof Array) ? event.data[0] : event.data)

     const styles = {
         outer: {
             borderRadius: 5,
             boxShadow: "0 30px 40px #BBB",
             padding: 4,
         },
     }
     return (
       <Grid container spacing={10} style={{...STYLES.inner}} direction="column">
           <CommonFormHead
                 title={title}
                 collapse={state.collapse}
                 initAdd={initAdd}
                 edited={edited??false}
                 added={added?? added ===undefined}
                 disable={disable??true}
                 edit={edit}
                 cancelEdit={cancelEdit}
                 submitEdit={submitEdit}
                 submitQuery={reload}
                 reload={reload}
                 toggle={toggle}
                 logout={logout}
                 navigate={navigate}
                 language={language}
                 handleLanguageChange={handleLanguageChange}
                 dispatch={dispatch}
             />
           <UserTabs collapse ={state.collapse} current={current} setCurrent={setCurrent} disable={disable} t={t} height={0}/>
           <Grid item style={{...styles.outer, paddingTop:15, height: state.collapse?minHeight:maxHeight}}>
               <UserGrid columnDefs={userColumnDefs(t)} onRowSelected={onRowSelected} rowData={rowData}/>
            </Grid>
       </Grid>
     )
}
export default  UserForm

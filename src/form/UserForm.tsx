import React, {useState, useEffect} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry} from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {CommonFormHead} from './FormsProps'
import iwsStore from '../utils/Store'
import { userColumnDefs} from '../ColumnsDefs.ts'
import { IUser} from '../Models.ts'
import {UserGrid} from '../IWSGrid'
import Login from './Login'
import UserTabs from "./UserTabs.tsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from '../utils/FormUtils.tsx'
import useForm from './UseForm.ts'
import UseMasterfileForm from './UseMasterfileForm.ts'
import {styles as stylesx} from "./BasicTreeTableProps.tsx";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

 const UserForm = () => {
   const [{ t, toggle, state, handleLanguageChange, module_}] = useForm()
     const dispatch = useDispatch()
     let navigate = useNavigate()
     if (module_ === '11111' || module_ === 11111) return <Login/>

     const current_: IUser =  module_.state[0]
     const [setIwsState] = useState(iwsStore.initialState)
     const minHeight = 400
     const maxHeight = 700
     const [{language, initAdd, added, disable, edit, edited, submitEdit, cancelEdit, reload
           , title, rowData, current, setCurrent}] = UseMasterfileForm(current_)

     useEffect(() => {
         iwsStore.subscribe(setIwsState)
         setCurrent(current_)
     }, [])

     const onRowSelected = (event: RowSelectedEvent) =>
           setCurrent((event.data instanceof Array) ? event.data[0] : event.data)

     return (
       <Grid container spacing={10} style={{...stylesx.inner0}} direction="column">
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
           <Grid item style={{...stylesx.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight}}>
               <UserGrid columnDefs={userColumnDefs(t)} onRowSelected={onRowSelected} rowData={rowData}/>
            </Grid>
       </Grid>
     )
}
export default  UserForm

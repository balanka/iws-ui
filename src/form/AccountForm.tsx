import React, {useState, useEffect} from 'react'
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
import { styles as stylesx } from './BasicTreeTableProps.tsx'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { CommonFormHead } from './FormsProps.tsx'
import {initAcc} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import { AccountMainForm } from './FormsProps.tsx'
import {accountColumnDefs} from '../ColumnsDefs.ts'
import {IAccount} from '../Models.ts'
import {AccountGrid,  defaultColDefX} from '../IWSGrid.tsx'
import Login from './Login'
import {logout} from '../utils/FormUtils.tsx'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import UseMasterfileForm from './UseMasterfileForm.ts'
import useForm from './UseForm.ts'
import {CCollapse} from "@coreui/react";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])
 const AccountForm = () => {
   const [{profile, selected, t, toggle, toggleTable, state, visible, module_}] = useForm()
   const {locale} = profile
   const dispatch = useDispatch()
   let navigate = useNavigate()
   if (module_ === '11111' || module_ === 11111) return <Login/>
   const height = 33
   const current_: IAccount = initAcc[0]
   const [setIwsState] = useState(iwsStore.initialState)
   const [{language, initAdd, added, disable, edit, edited, submitEdit, cancelEdit, reload, handleLanguageChange
     , title, rowData, current, setCurrent}] = UseMasterfileForm(current_)

   useEffect(() => {
     iwsStore.subscribe(setIwsState)
     setCurrent(current_)
   }, [selected])

   const onRowSelected = (event: RowSelectedEvent<IAccount[], any>) =>
     setCurrent((event.data instanceof Array) ? event.data[0] : event.data)

     return (<>
             <CommonFormHead
                 //styles={{paddingTop: 10, paddingBottom: 5}}
                 title={title}
                 collapse={state.collapse}
                 initAdd={initAdd}
                 edited={edited??false}
                 added={added?? added ===undefined}
                 edit={edit}
                 disable={disable??true}
                 cancelEdit={cancelEdit}
                 submitEdit={submitEdit}
                 submitQuery={reload}
                 reload={reload}
                 toggle={toggle}
                 toggleTable={toggleTable}
                 logout={logout}
                 navigate={navigate}
                 language={language}
                 handleLanguageChange={handleLanguageChange}
                 dispatch={dispatch}
             />

            <Grid container style={{...stylesx.innerX, display: !state.collapse?'none':''}} maximize direction="row" zeroMinWidth>
                 <AccountMainForm  collapse={state.collapse} current={current}
                                  setCurrent={setCurrent}
                                  disable={disable}
                                  t={t}
                                  locale={`${locale}`}
                                  accData={rowData}
                                  height={height}/>
                 </Grid>
       <CCollapse visible={visible}>

       <Grid container
                 // @ts-ignore
                     style={{...stylesx.outer, height: 400, paddingTop: 10, display: visible?'none':'', display: visible?'':'none'}} maximize direction="column">
                    <AccountGrid columnDefs={accountColumnDefs(t)} onRowSelected={onRowSelected}
                              defaultColDef={{...defaultColDefX, filter:true}}
                              rowData={rowData}/>
                </Grid>
         </CCollapse>
         </>
     )
}
export default AccountForm

import React, {useState, useEffect} from 'react'
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
import { styles as stylesx } from './BasicTreeTableProps'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { CommonFormHead } from './FormsProps'
import {Get} from './CrudController.ts'
import {initStore, MASTERFILE, } from './Menu'
import iwsStore from '../utils/Store'
import  { StoreTabs }  from './StoreTabs.tsx'
import { formEnum } from '../utils/FormEnum'
import {storeColumnDefs} from '../ColumnsDefs.ts'
import {IAccount, IStore} from '../Models.ts'
import { StoreGrid} from '../IWSGrid.tsx'
import Login from "./Login.tsx";
import {logout} from '../utils/FormUtils.tsx'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import UseMasterfileForm from './UseMasterfileForm.ts'
import useForm from './UseForm.ts'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])
 const StoreForm= () => {
     const [{profile, t, state, handleLanguageChange, toggle, company, module_}] = useForm()
     const { token, locale } = profile
     const dispatch = useDispatch()
     let navigate = useNavigate()
     if (module_ === '11111' || module_ === 11111) return <Login/>
     const current_: IStore = initStore[0]
     const [, setIwsState] = useState(iwsStore.initialState)
     const [accData, setAccData] = useState<IAccount[]>([])
     const acc_modelid = formEnum.ACCOUNT
     const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
     const zIndex = 9999
     const height= 20
   const [{language, initAdd, added, disable, edit, edited, submitEdit, cancelEdit, reload
     , title, rowData, current, setCurrent}] = UseMasterfileForm(current_)

     useEffect(() => {
         iwsStore.subscribe(setIwsState)
         Get(acc_ctx, token, acc_modelid, setAccData)
     }, [])

     const onRowSelected = (event: RowSelectedEvent) => setCurrent(event.data)
     return (<>
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

             <Grid container maximize direction="column"
                 // @ts-ignore
                   style={{...stylesx.outer, padding: 5, display: !state.collapse?'none':''}} >
                 <StoreTabs collapse = {state.collapse} current={current} setCurrent={setCurrent} disable={disable}
                            t={t} zIndex={zIndex-1} accData={accData} locale={locale??'fr-FR'}  height={height} />
             </Grid>
             <Grid container
                 // @ts-ignore
                   style={{...stylesx.outer, height: 250, paddingTop: 20}} maximize direction="column">
                 <StoreGrid columnDefs={storeColumnDefs(t)} onRowSelected={onRowSelected} rowData={rowData}/>
             </Grid>
         </>
     )
}
export default StoreForm

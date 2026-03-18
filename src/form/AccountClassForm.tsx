import React, {useState, useEffect} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry} from 'ag-grid-community'
//import { ExcelExportModule, MasterDetailModule, MultiFilterModule, SetFilterModule } from 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {CommonFormHead, MasterfilesMainForm2} from './FormsProps'
import {Get} from './CrudController'
import {initAcc, MASTERFILE} from './Menu'
import iwsStore from '../utils/Store'
import { formEnum } from '../utils/FormEnum'
import {masterfileColumnDefs} from '../ColumnsDefs.ts'
import {IAccount, IMasterfile2} from '../Models.ts'
import {MasterfileGrid} from '../IWSGrid'
import Login from './Login'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from '../utils/FormUtils.tsx'
import UseMasterfileForm from './UseMasterfileForm.ts'
import useForm from './UseForm.ts'
import { styles as stylesx} from './BasicTreeTableProps.tsx'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

 const AccountClassForm = () => {
   const [{profile, t,  language, toggle, toggleTable, state, visible, modelid, company, module_ }] = useForm()
     const {token} = profile
     const dispatch = useDispatch()
     let navigate = useNavigate()
     if (module_ === '11111' || module_ === 11111) return <Login/>
     const current_: IMasterfile2 =  module_.state[0]
     const [iwsState, setIwsState] = useState(iwsStore.initialState)
     const [accData, setAccData] = useState<IAccount[]>(initAcc)
     const [{initAdd, added, disable, edit, edited, submitEdit, cancelEdit, reload, handleLanguageChange
      , title, rowData, current, setCurrent}] = UseMasterfileForm(current_)
     const acc_modelid  = formEnum.ACCOUNT
     const acc_ctx = `${modelid === formEnum.COSTCENTER ?  MASTERFILE.acc:-1}/${acc_modelid}/${company}`
     const minHeight = 400
     const maxHeight = 700
     useEffect(() => {
         iwsStore.subscribe(setIwsState)
         !acc_ctx.includes('-1')&&Get(acc_ctx, token??'noToken', acc_modelid, setAccData)
         setCurrent(current_)
     }, [current_])

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
                 t={t}
             />
             <MasterfilesMainForm2 collapse ={state.collapse} current={current} setCurrent={setCurrent} disable={disable} t={t} height={0}
                                       accData={ iwsState.get(formEnum.ACCOUNT) ?? accData}/>
                 <Grid item
                   // @ts-ignore
                       style={{...stylesx.outer, paddingTop:15, height: state.collapse?minHeight:maxHeight, display: visible?'':'none'}}>
                     <MasterfileGrid columnDefs={masterfileColumnDefs(t)} onRowSelected={onRowSelected} rowData={rowData}/>
                 </Grid>
         </Grid>
     )
}
export default  AccountClassForm

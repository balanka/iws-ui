import React  from 'react'
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
import {styles} from './BasicTreeTableProps.tsx'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {initAcc, MASTERFILE} from './Menu.tsx'
import { AccountMainForm } from './FormsProps.tsx'
import {accountColumnDefs} from '../ColumnsDefs.ts'
import {IAccount} from '../Models.ts'
import Login from './Login'
import UseMasterfileForm from './UseMasterfileForm.ts'
import useForm from './UseForm.ts'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])
 const AccountForm = () => {
   const [{profile, t,  module_}] = useForm()
   const { locale} = profile
   if (module_ === '11111' || module_ === 11111) return <Login/>
   const height = 33
   const minHeight = 350
   const maxHeight = 700
   const current_: IAccount = initAcc[0]
   const colDef = accountColumnDefs(t)

   const [{header, body, disable, table, state, visible, rowData, current, setCurrent}] = UseMasterfileForm(current_,  colDef, MASTERFILE.acc)
   const mainForm = AccountMainForm({collapse:state.collapse, current:current??current_, setCurrent:setCurrent
     ,  disable:disable, t:t, locale:`${locale}`, accData:rowData, height:height})
   return (
     <>
       {header}
       {body??mainForm}
       <Grid item style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight, display:visible?'':'none'}}>
         {table}
       </Grid>
     </>
   )

}
export default AccountForm

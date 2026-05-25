import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import {styles} from './BasicTreeTableProps.tsx'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {initAcc} from './Menu.tsx'
import { AccountMainForm } from './AccountMainForm.tsx'
import {accountColumnDefs} from '../ColumnsDefs.ts'
import {IAccount} from '../Models.ts'
import UseMasterfileForm from './UseMasterfileForm.tsx'
import useForm from './UseForm.ts'
import {CInputGroup} from "@coreui/react";
import Login from "./Login.tsx";
import React from "react";



ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])
 const AccountForm = () => {
   const [{selected, profile, t, module_}] = useForm()
   if (module_ === '11111' || module_ === 11111) return <Login/>
   const { locale} = profile
   const height = 33
   const minHeight = 350
   const maxHeight = 700
   const current_: IAccount = initAcc
   const colDef = accountColumnDefs(t)
   const {header, body, table, disable, visible, state, rowData, current, setCurrent} =  UseMasterfileForm(current_,  colDef, selected)
   const safeBody = React.isValidElement(body) ? body : null;
   const mainForm = AccountMainForm({collapse:state.collapse, current:current??current_, setCurrent:setCurrent
     ,  disable:disable, t:t, locale:`${locale}`, accData:rowData, height:height})
   return (
     <>
       {header}
       <CInputGroup
       //@ts-ignore
         style={{...styles.outer, display: !state.collapse?'none':''}}>
          {safeBody??mainForm}
       </CInputGroup>
       <div  style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight,  minWidth:"100%", display:visible?'':'none'}}>
         {table}
       </div>
     </>
   )

}
export default AccountForm

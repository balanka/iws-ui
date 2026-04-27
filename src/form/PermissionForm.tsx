import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {MASTERFILE} from './Menu'
import useForm from './UseForm.ts'
import {PermissionMainForm} from './PermissionMainForm.tsx'
import {permissionColumnDefs} from "../ColumnsDefs.ts";
import UseMasterfileForm from "./UseMasterfileForm.tsx";
import {styles} from './BasicTreeTableProps.tsx'
import React from "react";
import Login from "./Login.tsx";


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

 const PermissionForm = () => {
     const [{ t, module_}]  = useForm()
     if (module_ === '11111' || module_ === 11111) return <Login/>
     const height = 20
     const current_ =  module_.state[0]
     const minHeight = 400
     const maxHeight = 700
     const coldef:ColDef[]= permissionColumnDefs(t)

     const [{header, body, table, disable, state, visible, current, setCurrent}] = UseMasterfileForm(current_, coldef, MASTERFILE.perm)
     const safeBody = React.isValidElement(body) ? body : null
     const mainForm = PermissionMainForm ({collapse:state.collapse,  current:current, setCurrent:setCurrent
     , disable:disable, t:t, height:height})
   return (
      <>
        {header}
        {safeBody??mainForm}
         <div  style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight, display:visible?'':'none'}}>
          {table}
        </div>
      </>
    )

}
export default  PermissionForm

import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { MasterfileFormWithout } from './MasterfileFormWithout'
import {MASTERFILE} from './Menu'
import {masterfileColumnDefs} from '../ColumnsDefs.ts'
import useForm from './UseForm.ts'
import UseMasterfileForm from './UseMasterfileForm.tsx'
import {styles} from './BasicTreeTableProps.tsx'
import React from "react";
import Login from "./Login.tsx";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])
 const RealEstateForm = () => {
     const [{t, module_}]  = useForm()
     if (module_ === '11111' || module_ === 11111) return <Login/>
     const height = 33
     const current_ =  module_.state
     const minHeight = 450
     const maxHeight = 550
     const colDef:ColDef[]= masterfileColumnDefs(t)
   const {header, body, table, disable, visible, state, current, setCurrent} = UseMasterfileForm(current_, colDef, MASTERFILE.realEstate)
     const safeBody = React.isValidElement(body) ? body : null;
     const mainForm = MasterfileFormWithout({collapse:state.collapse,  current:current??current_, setCurrent:setCurrent
     , disable:disable, height:height, accData:[], t:t, fieldName:t('common.parent'), propertyName:'parent'})
    return (
      <>
       {header}
        <div
          // @ts-ignore
          style={{...styles.outer, height:180, padding:5, paddingTop: 20 }} >
        {safeBody??mainForm}
       </div>
       <div  style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight, display:visible?'':'none'}}>
         {table}
       </div>
     </>
   )
}
export default  RealEstateForm

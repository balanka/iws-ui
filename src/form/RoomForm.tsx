import React, {useEffect, useState} from 'react'
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
import {Get} from "./CrudController.ts";
import {IMasterfile2} from "../Models.ts";
import {formEnum} from "../utils/FormEnum.tsx";
import Login from "./Login.tsx";


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])
 const RoomForm = () => {
     const [{profile, t, company, module_}]  = useForm()
    if (module_ === '11111' || module_ === 11111) return <Login/>
    const {token} = profile
    const url = MASTERFILE.apartment
    const ctx =  `${url}/${formEnum.APARTMENT}/${company}`

    const [accData, setAccData] = useState<IMasterfile2[]>([])
     const height = 33
     const current_ =  module_.state
     const minHeight = 450
     const maxHeight = 550
     const colDef:ColDef[]= masterfileColumnDefs(t)
     console.log('ctx')
     const {header, body, table, disable, state, current, setCurrent} = UseMasterfileForm(current_, colDef, MASTERFILE.room)

   useEffect(() => {
     Get(ctx, token, formEnum.APARTMENT, setAccData)
     setCurrent(current_)
   }, [])


   const safeBody = React.isValidElement(body) ? body : null;
   const mainForm = MasterfileFormWithout({collapse:state.collapseForm,  current:current??current_, setCurrent:setCurrent
     , disable:disable, height:height, accData:accData, t:t
     , fieldName:t('common.parent'), propertyName:'parent'})
    return (
      <>
       {header}
        {safeBody??mainForm}
       <div  style={{...styles.outer0, paddingTop:15, height: state.collapseForm?minHeight:maxHeight
         , display:state.collapseTable?'':'none'}}>
         {table}
       </div>
     </>
   )
}
export default  RoomForm

import React, {useState, useEffect} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {FModuleMainForm,} from './FModuleMainForm'
import { Get} from './CrudController'
import {MASTERFILE} from './Menu'
import { formEnum } from '../utils/FormEnum'
import {fmoduleColumnDefs} from '../ColumnsDefs.ts'
import {IFmodule, IMasterfile2} from '../Models.ts'
import useForm from './UseForm.ts'
import UseMasterfileForm from './UseMasterfileForm.tsx'
import {styles} from "./BasicTreeTableProps.tsx";
import {CInputGroup} from "@coreui/react-pro";
import Login from "./Login.tsx";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

 const FModuleForm = () => {
     const [{ profile,  t, module_, company}]  = useForm()
     const {token} = profile
     if (module_ === '11111' || module_ === 11111) return <Login/>
     const parent_ctx = `${module_?.state3}/${company}`
     const acc_ctx = `${module_?.state2}/${company}`
     const current_: IFmodule =  module_.state

     const [accData, setAccData] = useState<IMasterfile2[]>([])
     const [accountData, setAccountData] = useState<IMasterfile2[]>([])
     const height = 33
     const minHeight = 400
     const maxHeight = 700
     const colDef=fmoduleColumnDefs(t)
   const {header, body, table, disable, visible, state, rowData, current, setCurrent} = UseMasterfileForm(current_, colDef, MASTERFILE.fmodule)
   useEffect(() => {
     Promise.all([
       Get(parent_ctx, token, module_.modelid, setAccData),
      Get(acc_ctx, token, formEnum.ACCOUNT, setAccountData)
     ]).then(() => {
         console.log('All data fetched successfully')
         // additional logic after all requests complete
       }).catch(error => {
       console.error('Error fetching data', error)
     })
     setCurrent(current_)
   }, [])

   console.log('accDataX', accData);
   console.log('accountDataX', accountData);
    const mainForm = FModuleMainForm ({collapse: state.collapse, current:current, setCurrent:setCurrent, accData:accData.filter(m=>
                   (parseInt(m.id.toString())===formEnum.FINANCIALS|| parseInt(m.id.toString())===formEnum.TRANSACTION))
                   , accountData:accountData, rowData:rowData, disable:disable, height:height,  t:t})
   const safeBody = React.isValidElement(body) ? body : null;
   return (
     <>
       {header}
       <CInputGroup
         //@ts-ignore
         style={{...styles.outer, display: !state.collapse?'none':'', width:"100%"}} >
         {safeBody ? safeBody :mainForm}
       </CInputGroup>
       <div  style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight, width:"100%", display:visible?'':'none'}}>
         {table}
       </div>
     </>
   )
}
export default  FModuleForm

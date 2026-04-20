import {useState, useEffect} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {FModuleMainForm,} from './FModuleMainForm'
import { Get} from './CrudController'
import {MASTERFILE} from './Menu'
import iwsStore from '../utils/Store'
import { formEnum } from '../utils/FormEnum'
import {fmoduleColumnDefs} from '../ColumnsDefs.ts'
import {IFmodule, IMasterfile2} from '../Models.ts'
import useForm from './UseForm.ts'
import UseMasterfileForm from './UseMasterfileForm.tsx'
import {styles} from "./BasicTreeTableProps.tsx";
import {CInputGroup} from "@coreui/react";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

 const FModuleForm = () => {
     const [{ profile, menu, selected, t,  company}]  = useForm()
     const {token} = profile
     let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
     const parent_ctx = `${module_?.state3}/${company}`
     module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN

     const acc_ctx = `${module_?.state2}/${company}`
     const current_: IFmodule =  module_.state[0]
     const [, setIwsState] = useState(iwsStore.initialState)
     const [accData, setAccData] = useState<IMasterfile2[]>([])
     const [accountData, setAccountData] = useState<IMasterfile2[]>([])
     const height = 33
     const minHeight = 400
     const maxHeight = 700
     const [{header, body, table, disable,  state, visible, rowData, current, setCurrent, handleKeyPress}] = UseMasterfileForm(current_, fmoduleColumnDefs(t), MASTERFILE.fmodule)
    const mainForm = FModuleMainForm ({collapse: state.collapse, current:current, setCurrent:setCurrent, accData:accData.filter(m=>
                   (parseInt(m.id.toString())===formEnum.FINANCIALS|| parseInt(m.id.toString())===formEnum.TRANSACTION))
                   , accountData:accountData, rowData:rowData, disable:disable, height:height,  t:t})
     useEffect(() => {
         iwsStore.subscribe(setIwsState)
         Get(parent_ctx, token, module_.modelid, setAccData)
         Get(acc_ctx, token, formEnum.ACCOUNT, setAccountData)
         setCurrent(current_)
         // attach the event listener
         document.onkeydown = handleKeyPress
         document.addEventListener('onKeyDown', handleKeyPress)
     }, [current_])
   return (
     <>
       {header}
       <CInputGroup
         //@ts-ignore
         style={{...styles.outer, display: !state.collapse?'none':'', width:"100%"}} >
         {body?body():mainForm}
       </CInputGroup>
       <div  style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight, width:"100%", display:visible?'':'none'}}>
         {table}
       </div>
     </>
   )
}
export default  FModuleForm

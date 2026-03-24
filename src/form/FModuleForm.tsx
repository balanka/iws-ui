import React, {useState, useEffect} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {FModuleMainForm,} from './FormsProps'
import { Get} from './CrudController'
import {MASTERFILE} from './Menu'
import iwsStore from '../utils/Store'
import { formEnum } from '../utils/FormEnum'
import {fmoduleColumnDefs} from '../ColumnsDefs.ts'
import {IFmodule, IMasterfile2} from '../Models.ts'
import useForm from './UseForm.ts'
import UseMasterfileForm from './UseMasterfileForm.ts'
import {styles} from "./BasicTreeTableProps.tsx";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

 const FModuleForm = () => {
     const [{ profile, menu, selected, t,  company}]  = useForm()
     const {token} = profile
     let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
     const parent_ctx = `${module_?.state3}/${company}`
     module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
     const height = 20
     const acc_ctx = `${module_?.state2}/${company}`
     const current_: IFmodule =  module_.state[0]
     const [, setIwsState] = useState(iwsStore.initialState)
     const [accData, setAccData] = useState<IMasterfile2[]>([])
     const [accountData, setAccountData] = useState<IMasterfile2[]>([])
     const minHeight = 400
     const maxHeight = 700
     const [{header, body, table, disable,  state, visible, rowData, current, setCurrent}] = UseMasterfileForm(current_, fmoduleColumnDefs(t), MASTERFILE.fmodule)
    const mainForm = FModuleMainForm ({collapse:state.collapse, current:current, setCurrent:setCurrent, accData:accData.filter(m=>
                   (parseInt(m.id.toString())===formEnum.FINANCIALS|| parseInt(m.id.toString())===formEnum.TRANSACTION))
                   , accountData:accountData, rowData:rowData, disable:disable, height:height,  t:t})
     useEffect(() => {
         iwsStore.subscribe(setIwsState)
         Get(parent_ctx, token, module_.modelid, setAccData)
         Get(acc_ctx, token, formEnum.ACCOUNT, setAccountData)
         setCurrent(current_)
     }, [current_])
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
export default  FModuleForm

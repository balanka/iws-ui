import React, {useState, useEffect} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import {styles} from './BasicTreeTableProps'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {Get} from './CrudController.ts'
import {initStore, MASTERFILE, } from './Menu'
import  { StoreTabs }  from './StoreTabs.tsx'
import { formEnum } from '../utils/FormEnum'
import {storeColumnDefs} from '../ColumnsDefs.ts'
import {IAccount, IMasterfile, IStore} from '../Models.ts'
import Login from "./Login.tsx";
import UseMasterfileForm from './UseMasterfileForm.tsx'
import useForm from './UseForm.ts'


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])
 const StoreForm= () => {
     const [{profile,  t,  company, module_}] = useForm()
     const { token, locale, currency, stockAcc, expenseAcc } = profile
     if (module_ === '11111' || module_ === 11111) return <Login/>
     const current_: IStore = {...initStore, account:stockAcc??'', oaccount:expenseAcc??'' , stocks:[], company:company}
     const [ccData, setCcData] = useState<IMasterfile[]>([])
     const [accData, setAccData] = useState<IAccount[]>([])
     const acc_modelid = formEnum.ACCOUNT
     const cc_modelid = formEnum.COSTCENTER
     const cc_ctx = `${MASTERFILE.masterfile}/${cc_modelid}/${company}`
     const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
     const minHeight = 300
     const maxHeight = 600
     const height = 33
     const colDef:ColDef[] = storeColumnDefs(t)
     const {header, body, table, disable, visible, state, current, setCurrent, zIndex} =  UseMasterfileForm(current_, colDef, MASTERFILE.store)
     const safeBody = React.isValidElement(body) ? body : null;
     const mainForm = StoreTabs({collapse:state.collapse, current:current, setCurrent:setCurrent
       , disable:disable, currency:currency??'EUR', t:t, zIndex:zIndex-1, ccData:ccData, accData:accData
      , locale:locale??'fr-FR', height:height, minMaxHieght:state.collapse?minHeight:maxHeight })
   useEffect(() => {
     Get(cc_ctx, token, cc_modelid, setCcData)
     Get(acc_ctx, token, acc_modelid, setAccData)
     setCurrent(current_)
   }, [])

   return (
     <>
         {header}
         {safeBody??mainForm}
       <div  style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight,  minWidth:"100%", display:visible?'':'none'}}>
         {table}
       </div>
     </>
   )
}
export default StoreForm

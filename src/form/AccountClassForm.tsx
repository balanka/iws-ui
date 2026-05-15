import React, { useState, useEffect } from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {MasterfileFormWithout} from './MasterfileFormWithout'
import {Get} from './CrudController'
import {initAcc, MASTERFILE} from './Menu'
import { formEnum } from '../utils/FormEnum'
import {masterfileColumnDefs} from '../ColumnsDefs.ts'
import {IAccount, IMasterfile2} from '../Models.ts'
import Login from './Login'
import UseMasterfileForm from './UseMasterfileForm.tsx'
import useForm from './UseForm.ts'
import {styles} from './BasicTreeTableProps.tsx'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

 const AccountClassForm = () => {
   const [{profile, t, modelid, company, module_ }] = useForm()
     const {token} = profile
     if (module_ === '11111' || module_ === 11111) return <Login/>
     const current_: IMasterfile2 =  module_.state[0]
     const [accData, setAccData] = useState<IAccount[]>(initAcc)
     const acc_modelid  = formEnum.ACCOUNT
     const acc_ctx = `${modelid === formEnum.COSTCENTER ?  MASTERFILE.acc:-1}/${acc_modelid}/${company}`
     const minHeight = 400
     const maxHeight = 700
     const height = 20
     const colDef:ColDef[]= masterfileColumnDefs(t)
   useEffect(() => {
     !acc_ctx.includes('-1')&&Get(acc_ctx, token??'noToken', acc_modelid, setAccData)
     setCurrent(current_)
   }, [])

   const {header, body, table, disable, visible, state, current, setCurrent}  = UseMasterfileForm(current_,  colDef, MASTERFILE.accountClass)
   const safeBody = React.isValidElement(body) ? body : null;
   const mainForm = MasterfileFormWithout({collapse:state.collapse, current:current??current_, setCurrent:setCurrent
      , height:height, accData:accData, t:t, disable:disable, fieldName:t('common.account'), propertyName:'account' })
   return (
     <>
       {header}
       {safeBody ? safeBody :mainForm}
       <div  style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight,  minWidth:"100%", display:visible?'':'none'}}>
         {table}
       </div>
     </>
   )

}
export default  AccountClassForm

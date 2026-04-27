//import React from "react"
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  GridReadyEvent,
  ModuleRegistry
} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'

import {initCust, initEmp, initSup} from './Menu.tsx'

import {formEnum} from '../utils/FormEnum.tsx'
import {IBusinespartner} from '../Models.ts'
import useForm from './UseForm.ts'
import { CustomerTabs } from "./CustomerTabs.tsx"
import {UseCustomerForm} from "./UseCustomerForm.tsx";
import {customerColumnDefs} from "../ColumnsDefs.ts";
import {styles} from './BasicTreeTableProps.tsx'
import {CInputGroup} from "@coreui/react";
import Login from "./Login.tsx";
import React from "react";


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const CustomerForm = () => {
  const [{ profile, t,  modelid, module_ }] = useForm()
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const { locale, stockAcc, expenseAcc, vat, currency } = profile
  const initial = modelid ===formEnum.CUSTOMER?initCust[0]:(modelid ===formEnum.SUPPLIER)?initSup[0]:initEmp[0]
  const current_ : IBusinespartner= {...initial, account:stockAcc??'', oaccount:expenseAcc??'', vatCode:vat??'', currency:currency??''}
  const height = 28
  const minHeight = 350
  const maxHeight = 700
  const zIndex = 9999
  const onGridReady = (params: GridReadyEvent) => setGridApi(params.api)
  const [{header, body, table, disable,  state, visible, rowData, accData, bankData, vatData, ccyData, current
    , setCurrent, currentBankAccount, setCurrentBankAccount, setGridApi}] = UseCustomerForm(current_, customerColumnDefs(t))
  const safeBody = React.isValidElement(body) ? body : null;

  const mainForm = CustomerTabs({ collapse:state.collapse, current:current, setCurrent:setCurrent
                             , currentBankAccount:currentBankAccount
                             , setCurrentBankAccount:setCurrentBankAccount
                             , disable:disable, t:t, locale:locale?? 'fr-FR'
                             , data:rowData, accData:accData, bankData:bankData
                             , vatData:vatData, height:height, ccyData:ccyData
                             , zIndex:zIndex-1
                             , onGridReady:onGridReady
                             // @ts-ignore
                             ,  stylesx:{...styles, height:state.collapse?minHeight:maxHeight, padding: 5, paddingLeft: 10, paddingBottom: 5}})

  return (
    <>
      {header}
      <CInputGroup
        //@ts-ignore
          style={{...styles.outer , display: !state.collapse?'none':''}} >
         {safeBody??mainForm}
       </CInputGroup>
      <div  style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight,  minWidth:"100%", display:visible?'':'none'}}>
        {table}
      </div>
    </>
  )
}
export default  CustomerForm

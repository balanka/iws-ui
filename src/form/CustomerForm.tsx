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

import {initCust, initEmp, initSup, MASTERFILE} from './Menu.tsx'

import {formEnum} from '../utils/FormEnum.tsx'
import {IAccount, IBusinespartner, IContact, IMasterfile, IVat} from '../Models.ts'
import useForm from './UseForm.ts'
import { CustomerTabs } from "./CustomerTabs.tsx"
import {UseCustomerForm} from "./UseCustomerForm.tsx";
import {customerColumnDefs} from "../ColumnsDefs.ts";
import {styles} from './BasicTreeTableProps.tsx'
import {CInputGroup} from "@coreui/react-pro";
import Login from "./Login.tsx";
import React, {useEffect, useState} from "react";
import {Get} from "./CrudController.ts";



ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const CustomerForm = () => {
  const [{ profile, t,  modelid, module_, company }] = useForm()
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const { token, locale, stockAcc, expenseAcc, vat, currency } = profile
  const initial = modelid ===formEnum.CUSTOMER?initCust:(modelid ===formEnum.SUPPLIER)?initSup:initEmp
  const current_ : IBusinespartner= {...initial, account:stockAcc??'', oaccount:expenseAcc??'', vatCode:vat??'', currency:currency??''}
  const height = 28
  const minHeight = 350
  const maxHeight = 700
  const zIndex = 9999
  const acc_modelid = formEnum.ACCOUNT
  const bank_modelid = formEnum.BANK
  const ccy_modelid = formEnum.CURRENCY
  const vat_modelid = formEnum.VAT
  const contact_modelid = formEnum.CONTACT
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const bank_ctx = `${MASTERFILE.masterfile}/${bank_modelid}/${company}`
  const ccy_ctx = `${MASTERFILE.masterfile}/${ccy_modelid}/${company}`
  const vat_ctx = `${MASTERFILE.vat}/${vat_modelid}/${company}`
  const contact_ctx = `${MASTERFILE.contact}/${contact_modelid}/${company}`
  const [accData, setAccData] = useState<IAccount[]>([])
  const [vatData, setVatData] = useState<IVat[]>([])
  const [bankData, setBankData] = useState<IMasterfile[]>([])
  const [ccyData, setCcyData] = useState<IMasterfile[]>([])
  const [contactData, setContactData] = useState<IContact[]>([])

  const onGridReady = (params: GridReadyEvent) => setGridApi(params.api)
  const [{header, body, table, disable,  state, visible, rowData, current , setCurrent, currentBankAccount
    , setCurrentBankAccount, setGridApi}] = UseCustomerForm(current_, customerColumnDefs(t))
   //const isLoaded = (modelid:number)=> iwsStore.getByModelId(modelid)&& iwsStore.getByModelId(modelid).length>0
  useEffect(() => {
    Promise.all([
      Get(acc_ctx, token, acc_modelid, setAccData),
      Get(bank_ctx, token, bank_modelid, setBankData),
      Get(ccy_ctx, token, ccy_modelid, setCcyData),
      Get(vat_ctx, token, vat_modelid, setVatData),
      Get(contact_ctx, token, contact_modelid, setContactData)
    ])
      .then(() => {
         console.log('All data fetched successfully');
         // additional logic after all requests complete
       })
       .catch(error => {
         console.error('Error fetching data', error);
       });
  }, []);


  const safeBody = React.isValidElement(body) ? body : null;
  const mainForm = CustomerTabs({ collapse:state.collapse, current:current, setCurrent:setCurrent
                             , currentBankAccount:currentBankAccount
                             , setCurrentBankAccount:setCurrentBankAccount
                             , disable:disable, t:t, locale:locale?? 'fr-FR'
                             , data:rowData, accData:accData, bankData:bankData
                             , vatData:vatData, height:height, ccyData:ccyData, contactData:contactData
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

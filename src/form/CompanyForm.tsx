import React, {useEffect, useState} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, GridReadyEvent, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {initComp, MASTERFILE} from './Menu.tsx'
import {customerColumnDefs} from '../ColumnsDefs.ts'
import {IAccount, ICompany, IContact, IMasterfile, IVat} from '../Models.ts'
import {CompanyTabs} from './CompanyTabs.tsx'
import useForm from './UseForm.ts'
import {Get,  Get3,} from "./CrudController.ts";
import {styles} from './BasicTreeTableProps.tsx'
import {UseCustomerForm} from "./UseCustomerForm.tsx";
import {CInputGroup} from "@coreui/react-pro";
import Login from "./Login.tsx";
import {formEnum} from "../utils/FormEnum.tsx";
import iwsStore from "../utils/Store.tsx";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const CompanyForm = () => {
  const [{ profile, t, module_, company }] = useForm()
  const { token, locale } = profile
  if (module_ === '11111' || module_ === 11111) return <Login/>

  const current_ : ICompany= initComp
  const height = 25
  const minHeight = 450
  const maxHeight = 700
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
  const ctx =  `${MASTERFILE.comp}/${formEnum.COMPANY}`
  const [accData, setAccData] = useState<IAccount[]>([])
  const [vatData, setVatData] = useState<IVat[]>([])
  const [bankData, setBankData] = useState<IMasterfile[]>([])
  const [ccyData, setCcyData] = useState<IMasterfile[]>([])
  const [contactData, setContactData] = useState<IContact[]>([])

  const reload = () => {
    iwsStore.deleteByModelId(formEnum.COMPANY)
     Get3(ctx, token,  formEnum.COMPANY, current, setRowData, setCurrent)
    const rowData_ = rowData?.filter(x => x.id === company)
    const currentx = rowData_?.length > 0 ? rowData_[0] : current_
    setRowData([...rowData_ ])
    setCurrent(currentx)
  }
  const [{header, body, table, disable,  state, visible, rowData,  setRowData, current, setCurrent, currentBankAccount
    , setCurrentBankAccount, setGridApi}] = UseCustomerForm(current_, customerColumnDefs(t), reload)
  const isLoaded = (modelid:number)=> iwsStore.getByModelId(modelid)&& iwsStore.getByModelId(modelid).length>0
  useEffect(() => {
    Promise.all([
      !isLoaded(acc_modelid)&&Get(acc_ctx, token, acc_modelid, setAccData),
      !isLoaded(bank_modelid)&&Get(bank_ctx, token, bank_modelid, setBankData),
      !isLoaded(ccy_modelid)&&Get(ccy_ctx, token, ccy_modelid, setCcyData),
      !isLoaded(vat_modelid)&&Get(vat_ctx, token, vat_modelid, setVatData),
      !isLoaded(contact_modelid)&&Get(contact_ctx, token, contact_modelid, setContactData)])
      .then(() => {
        console.log('All data fetched successfully');
        // additional logic after all requests complete
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, []);

  const onGridReady = (params: GridReadyEvent) => setGridApi(params.api)
  const mainForm = CompanyTabs({ collapse: state.collapse, current:current, setCurrent:setCurrent
    , currentBankAccount:currentBankAccount
    , setCurrentBankAccount:setCurrentBankAccount
    , disable:disable, t:t, locale:locale?? 'fr-FR'
    , data:rowData, accData:accData, bankData:bankData
    , vatData:vatData, height:height, ccyData:ccyData, contactData:contactData
    , onGridReady:onGridReady
    // @ts-ignore
    ,  stylesx:{...styles, height:state.collapse?minHeight:maxHeight, padding: 5, paddingLeft: 10, paddingBottom: 5}})
  const safeBody = React.isValidElement(body) ? body : null;

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
export default  CompanyForm

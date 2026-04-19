import  {useEffect, useState} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, GridReadyEvent, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {initComp} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import {customerColumnDefs} from '../ColumnsDefs.ts'
import {ICompany} from '../Models.ts'
import {CompanyTabs} from './CompanyTabs.tsx'
import useForm from './UseForm.ts'
import {Get2} from "./CrudController.ts";
import {styles} from './BasicTreeTableProps.tsx'
import {UseCustomerForm} from "./UseCustomerForm.tsx";
import {CInputGroup} from "@coreui/react";
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const CompanyForm = () => {
  const [{ profile, selected, t, modelid }] = useForm()
  const { token, locale } = profile
  const [, setIwsState] = useState(iwsStore.initialState)
  const current_ : ICompany= initComp[0]
  const height = 25
  const minHeight = 450
  const maxHeight = 700
  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    setCurrent(current_)
    Get2(`${selected}/${modelid}`, token, setRowData)
  }, [selected])


  const onGridReady = (params: GridReadyEvent) => setGridApi(params.api)
  const [{header, body, table, disable,  state, visible, rowData, setRowData, accData, bankData, vatData, ccyData, current
    , setCurrent, currentBankAccount, setCurrentBankAccount, setGridApi}] = UseCustomerForm(current_, customerColumnDefs(t))

  const mainForm = CompanyTabs({ collapse: state.collapse, current:current, setCurrent:setCurrent
    , currentBankAccount:currentBankAccount
    , setCurrentBankAccount:setCurrentBankAccount
    , disable:disable, t:t, locale:locale?? 'fr-FR'
    , data:rowData, accData:accData, bankData:bankData
    , vatData:vatData, height:height, ccyData:ccyData
    , onGridReady:onGridReady
    // @ts-ignore
    ,  stylesx:{...styles, height:state.collapse?minHeight:maxHeight, padding: 5, paddingLeft: 10, paddingBottom: 5}})

  return (
    <>
      {header}
      <CInputGroup
        //@ts-ignore
        style={{...styles.outer , display: !state.collapse?'none':''}} >
        {body??mainForm}
      </CInputGroup>
      <div  style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight,  minWidth:"100%", display:visible?'':'none'}}>
        {table}
      </div>
    </>
  )

}
export default  CompanyForm

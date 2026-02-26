import React, {useState, useEffect} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, GridReadyEvent, ModuleRegistry} from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
import { styles as stylesx } from './BasicTreeTableProps.tsx'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { CommonFormHead } from './FormsProps.tsx'
import { initCust, initEmp, initSup} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import  { CustomerTabs }  from './CustomerTabs.tsx'
import { formEnum } from '../utils/FormEnum.tsx'
import {customerColumnDefs} from '../ColumnsDefs.ts'
import {IBusinespartner, ICustomer} from '../Models.ts'
import { CustomerGrid} from '../IWSGrid.tsx'
import Login from './Login.tsx'
import {logout} from '../utils/FormUtils.tsx'
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import useCustomerForm from './UseCustomerForm.ts'
import useForm from './UseForm.ts'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const CustomerForm = () => {
  const [{ profile, selected, t, toggle, state, modelid, module_ }] = useForm()
  const { locale, stockAcc, expenseAcc, vat, currency } = profile
  const [, setIwsState] = useState(iwsStore.initialState)
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const initial = modelid ===formEnum.CUSTOMER?initCust[0]:(modelid ===formEnum.SUPPLIER)?initSup[0]:initEmp[0]
  const current_ : IBusinespartner= {...initial, account:stockAcc??'', oaccount:expenseAcc??'', vatCode:vat??'', currency:currency??''}
  const  [{ edited, added, disable, language, accData, bankData, ccyData
    , rowData, setRowData, vatData, current, setCurrent, currentBankAccount, setCurrentBankAccount
    , edit, initAdd, reload, cancelEdit, submitEdit, handleLanguageChange, onNewBankAccount
    , onDeleteBankAccount, onNewSalaryItem, submitQuery, onRowSelected, title:title, setGridApi}] = useCustomerForm<ICustomer>(current_)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const height = 20
  const minHeight = 350
  const maxHeight = 700
  const zIndex = 9999
  const onGridReady = (params: GridReadyEvent) => setGridApi(params.api)
  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    setCurrent(current_)
    setRowData([])
  }, [selected])

  return ( <>
          <CommonFormHead
              title={title}
              collapse={state.collapse}
              initAdd={initAdd}
              edited={edited??false}
              added={added?? added ===undefined}
              disable={disable}
              edit={edit}
              onNewBankAccount={onNewBankAccount}
              onDeleteBankAccount={onDeleteBankAccount}
              onNewSalaryItem={onNewSalaryItem}
              cancelEdit={cancelEdit}
              submitEdit={submitEdit}
              submitQuery={submitQuery}
              reload={reload}
              toggle={toggle}
              logout={logout}
              navigate={navigate}
              language={language}
              handleLanguageChange={handleLanguageChange}
              dispatch={dispatch}
          />
          <Grid container style={{...stylesx.inner, display: !state.collapse?'none':''}} maximize direction="row" zeroMinWidth>
              <CustomerTabs  current={current} setCurrent={setCurrent}
                             currentBankAccount ={currentBankAccount}
                             setCurrentBankAccount={setCurrentBankAccount}
                             disable={disable} t={t} locale={locale?? 'fr-FR'}
                             data ={rowData} accData ={accData} bankData={bankData}
                             vatData ={vatData} height={height} ccyData={ccyData}
                             zIndex={zIndex-1}
                             onGridReady={onGridReady}
                             // @ts-ignore
                             stylesx={{...stylesx, height:state.collapse?minHeight:maxHeight, padding: 5, paddingLeft: 10, paddingBottom: 5}}/>
          </Grid>
            <Grid container
                // @ts-ignore
                  style={{...stylesx.outer, height:state.collapse?minHeight:maxHeight, paddingTop: 10}} maximize direction="column">
              <CustomerGrid columnDefs ={customerColumnDefs(t)}  onRowSelected={onRowSelected} rowData ={rowData}/>
            </Grid>
      </>
  )
}
export default  CustomerForm

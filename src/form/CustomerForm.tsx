import React, {useState, useEffect, useCallback} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, GridApi, GridReadyEvent, ModuleRegistry} from 'ag-grid-community'
//import { ExcelExportModule, MasterDetailModule, MultiFilterModule, SetFilterModule } from 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
import { styles as stylesx } from './BasicTreeTableProps.tsx'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { CommonFormHead } from './FormsProps.tsx'
import {Add, Edit, Get} from './CrudController.ts'
import {initBankAccount, initCust, initEmp, initSup, MASTERFILE, useStore} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import  { CustomerTabs }  from './CustomerTabs.tsx'
import { formEnum } from '../utils/FormEnum.tsx'
import {customerColumnDefs} from '../ColumnsDefs.ts'
import {
  IAccount,
  IBankAccount, IBusinespartner,
  ICustomer,
  IEmployee,
  IMasterfile,
  ISupplier,
  IVat
} from '../Models.ts'
import { CustomerGrid} from '../IWSGrid.tsx'
import Login from './Login.tsx'
import {logout} from './TransactionLib.ts'
import { useTranslation } from 'react-i18next'
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  // ExcelExportModule,
  // SetFilterModule,
  // MultiFilterModule,
  // MasterDetailModule,
])

const CustomerForm = () => {
  const { profile, menu, selected } = useStore()
  const { t, i18n} = useTranslation()
  const { token, company, locale, currency } = profile
  const localex= locale?? 'fr-FR'
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [language, setLanguage] = useState('en-US')
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  if (module_ === '11111' || module_ === 11111) return <Login/>
  let title =  company?.concat(' / ').concat(t(module_.title))
  const [state, setState] = useState({ collapse: true, fadeIn: true, timeout: 300 })
  const [disable, setDisable] = useState(true)
  const [gridApi,  setGridApi] = useState<GridApi>()

  const height = 20
  const modelid = module_? module_.modelid:1111
  const acc_modelid = formEnum.ACCOUNT
  const bank_modelid = formEnum.BANK
  const ccy_modelid = formEnum.CURRENCY
  const vat_modelid = formEnum.VAT
  const ctx = `${selected}/${modelid}/${company}`

  const modifyUrl = selected
  console.log('ctx', ctx)
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const bank_ctx = `${MASTERFILE.masterfile}/${bank_modelid}/${company}`
  const ccy_ctx = `${MASTERFILE.masterfile}/${ccy_modelid}/${company}`
  const vat_ctx = `${MASTERFILE.vat}/${vat_modelid}/${company}`
  const initialState:ICustomer|ISupplier|IEmployee= modelid ===formEnum.CUSTOMER?initCust[0]:(modelid ===formEnum.SUPPLIER)?initSup[0]:initEmp[0]
  const current_:ICustomer|ISupplier|IEmployee = initialState
  const [current, setCurrent] = useState<ICustomer|ISupplier|IEmployee>(current_)
  const [edited, setEdited] = useState<boolean|undefined>(false)
  const [added, setAdded] = useState<boolean|undefined>(undefined)
  const [, setIwsState] = useState(iwsStore.initialState)
  const toggle = () => setState({ ...state, collapse: !state.collapse })

  const [accData, setAccData] = useState<IAccount[]>([])
  const [rowData, setRowData] = useState<ICustomer[]|ISupplier[]|IEmployee[]>([])
  const [vatData, setVatData] = useState<IVat[]>([])
  const [bankData, setBankData] = useState<IMasterfile[]>([])
  const [ccyData, setCcyData] = useState<IMasterfile[]>([])
  const [currentBankAccount, setCurrentBankAccount] = useState<IBankAccount>(initBankAccount)
  const minHeight = 350
  const maxHeight = 700
  const zIndex = 9999
  const onGridReady = (params: GridReadyEvent) => setGridApi(params.api)
  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    Get(acc_ctx, token, acc_modelid, setAccData)
    Get(bank_ctx, token, bank_modelid, setBankData)
    Get(ccy_ctx, token, ccy_modelid, setCcyData)
    Get(vat_ctx, token, vat_modelid, setVatData)
    setCurrent(current_)
    setRowData([])
  }, [selected])

  const handleLanguageChange = (event:any) => {
    event.preventDefault()
    const value = event.target.value
    setLanguage(value)
    i18n.changeLanguage(value)
  }
  const onNewSalaryItem = () => {}

  const edit = () => {
    console.log('edit called!!!')
    if(edited) {
      setEdited(false )
      setDisable(true)
      setAdded(false)
    } else {
      setEdited(true)
      setDisable(false)
      setAdded(true)
    }
  }
  const submitEdit = (event:any) => {
    event.preventDefault()
    if(edited) {
      Edit(modifyUrl, token, { ...current }, rowData, setCurrent)
    } else if (!edited && !disable) {
      Add(modifyUrl, token, { ...current }, rowData, setCurrent)
    }
    setDisable(true)
    setEdited(false)
    setAdded(true)
  }
  const cancelEdit = () => {
    if(edited) {
      setEdited(false)
      setDisable(true)
      setAdded(true)
    }
  }

  const initAdd = () => {
    const newRow = { ...current_, company: company, currency: currency}
    setCurrent(newRow)
    setAdded(true)
    setEdited(false)
    setDisable(false)
  }

  const reload = () => {
    iwsStore.deleteKey(current.modelid)
    Get(ctx, token, current.modelid, setRowData)
    setCurrent(current_)
  }
  const submitQuery = (event:any) => {
    event.preventDefault()
    Get(ctx, token, modelid, setRowData)
    Get(acc_ctx, token, acc_modelid, setAccData)
    Get(vat_ctx, token, vat_modelid, setVatData)
  }
  const addLine =
      ( line:IBankAccount)  => {
        const newLine:IBankAccount = {...line, modelid:-1, owner: `${current.id}`}
        const dx: ICustomer|ISupplier|IEmployee = {...current}
         if(dx.hasOwnProperty('bankaccounts')){
           dx.bankaccounts.push(newLine)
         } else dx['bankaccounts'] = [{...newLine}]
        gridApi!.applyTransaction({add: [newLine]})
        return dx
      }

  const onRemoveSelectedLine = useCallback(
      ( event:any, current:ICustomer|ISupplier|IEmployee, setCurrent:(arg:IBusinespartner) =>void) => {
        event.preventDefault()
        const dx: ICustomer|ISupplier|IEmployee = {...current}
        const idx = dx?.bankaccounts.findIndex((obj: IBankAccount) => obj.id === currentBankAccount.id)
        if (idx >= 0) dx.bankaccounts[idx] = {...currentBankAccount, modelid: -2}
        setCurrent(dx)
      }, [currentBankAccount]);

  const onNewBankAccount = //useCallback(
    () => {
    setEdited(true)
    setDisable(false)
    console.log('current>>>>', current)
    const record = addLine ( {...initBankAccount, owner: `${current.id}` })
    setCurrent(record)
  }//,
  //   [current],
  // )
  const onDeleteBankAccount = (event:any) => {
    onRemoveSelectedLine (event, current,  setCurrent);
     Edit(modifyUrl, token, current, rowData, setCurrent)
  }
  const onRowSelected = (event: RowSelectedEvent) => {
    const selected:ICustomer|ISupplier|IEmployee = event.data
    const bankAccounts:IBankAccount[] = selected?.bankaccounts
    const selectedBankAccount:IBankAccount = bankAccounts?bankAccounts[0]:initBankAccount
    setCurrent(selected)
    setCurrentBankAccount(selectedBankAccount)
  }

  console.log('ccyData>>>>', ccyData);
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
                             disable={disable} t={t} locale={localex}
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
              <CustomerGrid
                  // @ts-ignore
                  theme="legacy" columnDefs ={customerColumnDefs(t)}  onRowSelected={onRowSelected} rowData ={rowData}/>
            </Grid>
      </>
  )
}
export default  CustomerForm

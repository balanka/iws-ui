import {ReactNode, useCallback, useEffect, useState} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, GridApi, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {Add, Edit, Get} from './CrudController.ts'
import {initBankAccount, MASTERFILE} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import {formEnum} from '../utils/FormEnum.tsx'
import {IAccount, IBankAccount, IBusinespartner, IMasterfile, IVat} from '../Models.ts'
import {UseCustomerFormResult} from '../Props.ts'
import useForm from './UseForm.ts'
import {CustomerGrid} from '../IWSGrid.tsx'
import {CommonFormHead} from "./FormsProps.tsx";
import {logout} from "../utils/FormUtils.tsx";
import Login from "./Login.tsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const UseCustomerForm = <T extends IBusinespartner>(current_: T, colDef: ColDef[]): [UseCustomerFormResult<T>] => {
  const [{profile, menu, selected, visible, t, title, language, state, toggle, toggleTable, handleLanguageChange, modelid
    , company}] = useForm()
  const {token, currency} = profile
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  let body: React.JSX.Element | null = (module_ === '11111' || module_ === 11111) ? Login() : null
  const [disable, setDisable] = useState(true)
  const [gridApi, setGridApi] = useState<GridApi>()
  const acc_modelid = formEnum.ACCOUNT
  const bank_modelid = formEnum.BANK
  const ccy_modelid = formEnum.CURRENCY
  const vat_modelid = formEnum.VAT
  const ctx = `${selected}/${modelid}/${company}`
  const modifyUrl = selected
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const bank_ctx = `${MASTERFILE.masterfile}/${bank_modelid}/${company}`
  const ccy_ctx = `${MASTERFILE.masterfile}/${ccy_modelid}/${company}`
  const vat_ctx = `${MASTERFILE.vat}/${vat_modelid}/${company}`

  //let body =(module_ === '11111' || module_ === 11111)?Login ():null
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [current, setCurrent] = useState<T>(current_)
  const [edited, setEdited] = useState<boolean | undefined>(false)
  const [added, setAdded] = useState<boolean | undefined>(undefined)
  const [, setIwsState] = useState(iwsStore.initialState)
  const [accData, setAccData] = useState<IAccount[]>([])
  const [rowData, setRowData] = useState<T[]>([])
  const [vatData, setVatData] = useState<IVat[]>([])
  const [bankData, setBankData] = useState<IMasterfile[]>([])
  const [ccyData, setCcyData] = useState<IMasterfile[]>([])
  const [currentBankAccount, setCurrentBankAccount] = useState<IBankAccount>(initBankAccount)
  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    Get(acc_ctx, token, acc_modelid, setAccData)
    Get(bank_ctx, token, bank_modelid, setBankData)
    Get(ccy_ctx, token, ccy_modelid, setCcyData)
    Get(vat_ctx, token, vat_modelid, setVatData)
    setCurrent(current_)
    setRowData([])
    // attach the event listener
    document.onkeydown = handleKeyPress
    document.addEventListener('onKeyDown', handleKeyPress)
  }, [selected])

  const handleKeyPress = useCallback((event:any) => {
    switch (event.keyCode) {
      case 112:
        submitEdit(event)
        return
      case 114:
        reload()
        return
      default:
        return

    }}, [])
  const onNewSalaryItem = () => {
  }
  const edit = () => {
    console.log('edit called!!!')
    if (edited) {
      setEdited(false)
      setDisable(true)
      setAdded(false)
    } else {
      setEdited(true)
      setDisable(false)
      setAdded(true)
    }
  }
  const submitEdit = (event: any) => {
    event.preventDefault()
    if (edited) {
      Edit(modifyUrl, token, {...current}, rowData, setRowData, setCurrent)
    } else if (!edited && !disable) {
      Add(modifyUrl, token, {...current}, rowData, setRowData, setCurrent)
    }
    setDisable(true)
    setEdited(false)
    setAdded(true)
  }
  const cancelEdit = () => {
    if (edited) {
      setEdited(false)
      setDisable(true)
      setAdded(true)
    }
  }

  const initAdd = () => {
    const newRow = {...current_, bankaccounts: [], company: company, currency: currency}
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
  const submitQuery = (event: any) => {
    event.preventDefault()
    Get(ctx, token, modelid, setRowData)
    Get(acc_ctx, token, acc_modelid, setAccData)
    Get(vat_ctx, token, vat_modelid, setVatData)
  }
  const addLine =
    (line: IBankAccount) => {
      const newLine: IBankAccount = {...line, modelid: -1, owner: `${current.id}`}
      const dx: T = {...current}
      if (dx.hasOwnProperty('bankaccounts')) {
        dx.bankaccounts.push(newLine)
      } else dx['bankaccounts'] = [{...newLine}]
      gridApi!.applyTransaction({add: [newLine]})
      return dx
    }

  const onRemoveSelectedLine = useCallback(
    (event: any, current: T, setCurrent: (arg: T) => void) => {
      event.preventDefault()
      const dx: T = {...current}
      const idx = dx?.bankaccounts.findIndex((obj: IBankAccount) => obj.id === currentBankAccount.id)
      if (idx >= 0) dx.bankaccounts[idx] = {...currentBankAccount, modelid: -2}
      setCurrent(dx)
    }, [currentBankAccount]);

  const onNewBankAccount =
    () => {
      setEdited(true)
      setDisable(false)
      const record = addLine({...initBankAccount, owner: `${current.id}`})
      setCurrent(record)
    }

  const onDeleteBankAccount = (event: any) => {
    onRemoveSelectedLine(event, current, setCurrent);
    Edit(modifyUrl, token, current, rowData, setRowData, setCurrent)
  }
  const onRowSelected = (event: RowSelectedEvent) => {
    const selected: T = event.data
    const bankAccounts: IBankAccount[] = selected?.bankaccounts
    const selectedBankAccount: IBankAccount = bankAccounts ? bankAccounts[0] : initBankAccount
    setCurrent(selected)
    setCurrentBankAccount(selectedBankAccount)
  }

  const header: ReactNode = CommonFormHead({
    title: title
    , collapse: state.collapse
    , initAdd: initAdd
    , edited: edited ?? false
    , added: added ?? added === undefined
    , disable: disable ?? true
    , edit: edit
    , onNewBankAccount: onNewBankAccount
    , onDeleteBankAccount: onDeleteBankAccount
    , onNewSalaryItem: onNewSalaryItem
    , cancelEdit: cancelEdit
    , submitEdit: submitEdit
    , submitQuery: submitQuery
    , reload: reload
    , toggle: toggle
    , toggleTable: toggleTable
    , logout: logout
    , navigate: navigate
    , language: language
    , handleLanguageChange: handleLanguageChange
    , dispatch: dispatch
    , t: t
  })

  // @ts-ignore
  const table: ReactNode = CustomerGrid({columnDefs: colDef, onRowSelected: onRowSelected, rowData: rowData})

  return [{
    header: header,
    body: body,
    table,
    disable,
    visible,
    rowData,
    current,
    setCurrent,
    currentBankAccount,
    setCurrentBankAccount,
    setGridApi,
    accData: accData,
    bankData: bankData,
    vatData: vatData,
    ccyData: ccyData,
    setRowData,
    state:state

  }]


}
export default  UseCustomerForm

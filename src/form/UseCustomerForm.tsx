import {ReactNode, useCallback, useEffect, useState} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, GridApi, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {Add, Edit, Get} from './CrudController.ts'
import {initBankAccount} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import {formEnum} from '../utils/FormEnum.tsx'
import {IBankAccount, IBusinespartner} from '../Models.ts'
import {UseCustomerFormResult} from '../Props.ts'
import useForm from './UseForm.ts'
import {CustomerGrid} from '../IWSGrid.tsx'
import { CommonFormHead } from './CommonFormHead'
import {logout} from "../utils/FormUtils.tsx";
import Login from "./Login.tsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

export const UseCustomerForm = <T extends IBusinespartner>(current_: T, colDef: ColDef[], reload?:()=>void): [UseCustomerFormResult<T>] => {
  const [{profile, menu, selected, visible, t, title, language, state, toggle, toggleTable, handleLanguageChange, modelid
    , company}] = useForm()
  const {token, currency} = profile
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  let body: React.JSX.Element | null = (module_ === '11111' || module_ === 11111) ? Login() : null
  const [disable, setDisable] = useState(true)
  const [gridApi, setGridApi] = useState<GridApi>()
  const ctx = `${selected}/${modelid}/${company}`
  const modifyUrl = selected

  //let body =(module_ === '11111' || module_ === 11111)?Login ():null
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [current, setCurrent] = useState<T>(current_)
  const [edited, setEdited] = useState<boolean | undefined>(false)
  const [added, setAdded] = useState<boolean | undefined>(undefined)
  const [rowData, setRowData] = useState<T[]>([])
  const [currentBankAccount, setCurrentBankAccount] = useState<IBankAccount>(initBankAccount)

  // Subscribe to store changes (when other components modify the same modelid)
  // useEffect(() => {
  //   const subscription = iwsStore.subscribe(() => {
  //     const freshData = iwsStore.getByModelId(modelid) as T[];
  //     setRowData(freshData);
  //     Get(acc_ctx, token, acc_modelid, setAccData)
  //     Get(bank_ctx, token, bank_modelid, setBankData)
  //     Get(ccy_ctx, token, ccy_modelid, setCcyData)
  //     Get(vat_ctx, token, vat_modelid, setVatData)
  //     document.onkeydown = handleKeyPress
  //     document.addEventListener('onKeyDown', handleKeyPress)
  //   });
  //   return () => subscription.unsubscribe();
  // }, [modelid]);

  useEffect(() => {
    const subscription = iwsStore.subscribe(() => {
      const freshData = iwsStore.getByModelId(modelid) as T[];
      setRowData(freshData);
      // attach the event listener
      document.onkeydown = handleKeyPress
      document.addEventListener('onKeyDown', handleKeyPress)
    });
    return () => {subscription.unsubscribe(); document.removeEventListener('onKeyDown', handleKeyPress)}
  }, []);

  useEffect(() => {
    if (rowData.length === 0) {
      Get(ctx, token, modelid, setRowDataAndStore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Wrapper that updates both state and the store
  const setRowDataAndStore = useCallback((value: React.SetStateAction<T[]>) => {
    if (typeof value === 'function') {
      setRowData(prev => {
        const newData = value(prev);
        newData.forEach(item => iwsStore.set(item));
        return newData;
      });
    } else {
      setRowData(value);
      value.forEach(item => iwsStore.set(item));
    }
  }, []);

  const handleKeyPress = useCallback((event:any) => {
    switch (event.keyCode) {
      case 112:
        submitEdit(event)
        return
      case 114:
        reload?reload():reloadx()
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
  const submitEdit = async (event: any) => {
    event.preventDefault()
    try {
      if (edited) {
        const updated = await Edit(modifyUrl, token, current, setCurrent);
        // Update the local list optimistically with the server response
        const index = rowData.findIndex((obj) => obj && obj.id === updated.id);
        if (index >= 0) {
          const newList = [...rowData];
          newList[index] = updated;
          setRowData(newList);
        }
      }else if (!edited && !disable) {
        const created = await Add(modifyUrl, token, {...current}, rowData, setRowData, setCurrent);
        console.log('created', created);
      }

    } catch (error) {
      console.error('Edit failed', error);
      // Show user notification
    }
    setDisable(true)
    setEdited(false)
    setAdded(true)
  };

  // const submitEdit = (event: any) => {
  //   event.preventDefault()
  //   if (edited) {
  //     const updated= Edit(modifyUrl, token, {...current}, setCurrent)
  //     const index = rowData.findIndex((obj:T) => obj && (obj.id === updated.id))
  //     if (index>=0) {
  //       rowData[index] = updated
  //       setRowData([...rowData])
  //     }
  //     setCurrent(updated)
  //   } else if (!edited && !disable) {
  //     Add(modifyUrl, token, {...current}, rowData, setRowData, setCurrent)
  //   }
  //   setDisable(true)
  //   setEdited(false)
  //   setAdded(true)
  // }
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

  const reloadx = () => {
    iwsStore.deleteByModelId(current.modelid)
    Get(ctx, token, current.modelid, setRowData)
    setCurrent(current_)
  }
  const submitQuery = (event: any) => {
    event.preventDefault()
    Get(ctx, token, modelid, setRowData)
    // Get(acc_ctx, token, acc_modelid, setAccData)
    // Get(vat_ctx, token, vat_modelid, setVatData)
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

  const onDeleteBankAccount = async (event: any) => {
    onRemoveSelectedLine(event, current, setCurrent);
    try {
    const updated = await Edit(modifyUrl, token, current, setCurrent)
    const index = rowData.findIndex((obj:T) => obj && (obj.id === updated.id))
    if (index>=0) {
      const newList = [...rowData];
      newList[index] = updated
      setRowData([...newList])
    }
    //setCurrent(updated)
    } catch (error) {
      console.error('Edit failed', error);
      // Show user notification
    }
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
    , reload: reload??reloadx
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
    // accData: accData,
    // bankData: bankData,
    // vatData: vatData,
    // ccyData: ccyData,
    setRowData,
    state:state
  }]
}


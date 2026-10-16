import { ReactNode, MutableRefObject, useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ColDef,
  GridApi,
  ModuleRegistry,
} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-ignore
import type { RowSelectedEvent } from 'ag-grid-community/dist/types/src/events'
import { Add, Edit, Get } from './CrudController.ts'
import { initBankAccount } from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import { formEnum } from '../utils/FormEnum.tsx'
import { IBankAccount, IBusinespartner } from '../Models.ts'
import { UseCustomerFormResult } from '../Props.ts'
import useForm from './useForm.ts'
import { CustomerGrid } from '../IWSGrid.tsx'
import { CommonFormHead } from './CommonFormHead'
import { logout } from '../utils/FormUtils.tsx'
import Login from './Login.tsx'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

export const useCustomerForm = <T extends IBusinespartner>(
  current_: T,
  colDef: ColDef[],
  reload?: (() => void) | MutableRefObject<() => void>
): [UseCustomerFormResult<T>] => {
  const [{
    profile, menu, selected, t, title, language, state,
    toggle, toggleTable, handleLanguageChange, modelid, company,
  }] = useForm()

  const { token, currency } = profile
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [disable, setDisable] = useState(true)
  const [gridApi, setGridApi] = useState<GridApi>()
  const [current, setCurrent] = useState<T>(current_)
  const [edited, setEdited] = useState<boolean | undefined>(false)
  const [added, setAdded] = useState<boolean | undefined>(undefined)
  const [currentBankAccount, setCurrentBankAccount] = useState<IBankAccount>(initBankAccount)

  const ctx = `${selected}/${modelid}/${company}`
  const modifyUrl = selected

  // ── Reactive store read via useSyncExternalStore ────────────────────────
  const snapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  )

  const rowData = useMemo<T[]>(() => {
    const inner = snapshot.get(modelid)
    return inner ? (Array.from(inner.values()) as T[]) : []
  }, [snapshot, modelid])

  // Write-through to the store. React re-renders via the subscription above.
  const setRowDataAndStore = useCallback(
    (value: React.SetStateAction<T[]>) => {
      if (typeof value === 'function') {
        const inner = iwsStore.getRawMap().get(modelid)
        const base = inner ? (Array.from(inner.values()) as T[]) : []
        const next = (value as (p: T[]) => T[])(base)
        next.forEach(item => iwsStore.set(item))
      } else {
        value.forEach(item => iwsStore.set(item))
      }
    },
    [modelid]
  )

  // Public setRowData — kept as API surface; forwards to store
  const setRowData = setRowDataAndStore

  // Initial load if store is empty
  useEffect(() => {
    const inner = iwsStore.getRawMap().get(modelid)
    const cached = inner ? Array.from(inner.values()) : []
    if (cached.length === 0) {
      Get(ctx, token, modelid, setRowDataAndStore)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelid])

  const submitEdit = useCallback(
    async (event: any) => {
      event?.preventDefault?.()
      console.log(` modifyUrl:${modifyUrl} -> current ${current}`)
      try {
        if (edited) {
          const updated = await Edit(modifyUrl, token, current)
          if (!updated) return

          const index = rowData.findIndex(
            (obj) => String(obj?.id) === String(updated.id)
          )
          if (index >= 0) {
            const newList = [...rowData]
            newList[index] = updated as T
            setRowDataAndStore(newList)
          }
        } else if (!edited && !disable) {
          const created = await Add(
            modifyUrl, token, { ...current }, rowData,
            setRowDataAndStore, setCurrent
          )
          console.log('created', created)
        }
      } catch (error) {
        console.error('Edit failed', error)
      }
      setDisable(true)
      setEdited(false)
      setAdded(true)
    },
    [edited, disable, current, rowData, modifyUrl, token, setRowDataAndStore]
  )

  const reloadx = useCallback(() => {
    iwsStore.deleteByModelId(current.modelid)
    Get(ctx, token, current.modelid, setRowDataAndStore)
    setCurrent(current_)
  }, [ctx, token, current.modelid, current_, setRowDataAndStore])

  // ── reload: accept either a plain fn OR a ref (read .current at call) ──
  const reloadFn = useCallback(() => {
    if (typeof reload === 'function') {
      reload()
    } else if (reload && typeof reload === 'object' && 'current' in reload) {
      reload.current()
    }
  }, [reload])

  const handleKeyPress = useCallback(
    (event: any) => {
      switch (event.keyCode) {
        case 112:
          submitEdit(event)
          return
        case 114:
          (reload ? reloadFn : reloadx)()
          return
        default:
          return
      }
    },
    [submitEdit, reload, reloadFn, reloadx]
  )

  // Register key handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => handleKeyPress(e)
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [handleKeyPress])

  // ── Early return AFTER all hooks ────────────────────────────────────────
  const body: React.JSX.Element | null =
    module_ === '11111' || module_ === 11111 ? <Login /> : null

  // ── Handlers ────────────────────────────────────────────────────────────
  const edit = () => {
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

  const cancelEdit = () => {
    if (edited) {
      setEdited(false)
      setDisable(true)
      setAdded(true)
    }
  }

  const initAdd = () => {
    const newRow = { ...current_, bankaccounts: [], company, currency }
    setCurrent(newRow)
    setAdded(true)
    setEdited(false)
    setDisable(false)
  }

  const submitQuery = (event: any) => {
    event.preventDefault()
    Get(ctx, token, modelid, setRowDataAndStore)
  }

  const addLine = (line: IBankAccount) => {
    const newLine: IBankAccount = { ...line, modelid: -1, owner: `${current.id}` }
    const dx: T = { ...current }
    if (dx.hasOwnProperty('bankaccounts')) {
      dx.bankaccounts.push(newLine)
    } else {
      dx['bankaccounts'] = [{ ...newLine }]
    }
    gridApi!.applyTransaction({ add: [newLine] })
    return dx
  }

  const onRemoveSelectedLine = useCallback(
    (event: any, current: T, setCurrent: (arg: T) => void) => {
      event.preventDefault()
      const dx: T = { ...current }
      const idx = dx?.bankaccounts.findIndex(
        (obj: IBankAccount) => String(obj.id) === String(currentBankAccount.id)
      )
      if (idx >= 0) dx.bankaccounts[idx] = { ...currentBankAccount, modelid: -2 }
      setCurrent(dx)
    },
    [currentBankAccount]
  )

  const onNewSalaryItem = () => {}

  const onNewBankAccount = () => {
    setEdited(true)
    setDisable(false)
    const record = addLine({ ...initBankAccount, owner: `${current.id}` })
    setCurrent(record)
  }

  const onDeleteBankAccount = async (event: any) => {
    onRemoveSelectedLine(event, current, setCurrent)
    try {
      const updated = await Edit(modifyUrl, token, current)
      if (!updated) return
      const index = rowData.findIndex(
        (obj: T) => String(obj?.id) === String(updated.id)
      )
      if (index >= 0) {
        const newList = [...rowData]
        newList[index] = updated as T
        setRowDataAndStore(newList)
      }
    } catch (error) {
      console.error('Edit failed', error)
    }
  }

  const onRowSelected = (event: RowSelectedEvent) => {
    if (!event?.data) return
    const selected: T = event.data
    const bankAccounts: IBankAccount[] = selected?.bankaccounts ?? []
    const selectedBankAccount: IBankAccount = bankAccounts[0] ?? initBankAccount

    setCurrentBankAccount(selectedBankAccount)
    setCurrent(prev =>
      String(prev?.id) === String(selected?.id) ? prev : selected
    )
  }

  const header: ReactNode = (
    <CommonFormHead
      title={title}
      collapse={state.collapseForm}
      initAdd={initAdd}
      edited={edited ?? false}
      added={added ?? added === undefined}
      disable={disable ?? true}
      edit={edit}
      onNewBankAccount={onNewBankAccount}
      onDeleteBankAccount={onDeleteBankAccount}
      onNewSalaryItem={onNewSalaryItem}
      cancelEdit={cancelEdit}
      submitEdit={submitEdit}
      submitQuery={submitQuery}
      reload={reload ? reloadFn : reloadx}
      toggle={toggle}
      toggleTable={toggleTable}
      logout={logout}
      navigate={navigate}
      language={language}
      handleLanguageChange={handleLanguageChange}
      dispatch={dispatch}
      t={t}
    />
  )

  const table: ReactNode = (
    <CustomerGrid
      columnDefs={colDef}
      onRowSelected={onRowSelected}
      rowData={rowData}
    />
  )

  return [{
    header,
    body,
    table,
    disable,
    visible: state.collapseTable,
    rowData,
    current,
    setCurrent,
    currentBankAccount,
    setCurrentBankAccount,
    setGridApi,
    setRowData,
    state,
  }]
}

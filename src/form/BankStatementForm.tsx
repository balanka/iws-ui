import { useState, useEffect, useMemo, useSyncExternalStore } from 'react'
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ModuleRegistry,
} from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-expect-error -- legacy, see TODO
import type { RowSelectedEvent } from 'ag-grid-community/dist/types/src/events'
import { Edit, Get, Get2 } from './CrudController'
import { initBS, MASTERFILE } from './Menu'
import iwsStore from '../utils/Store'
import { bankStatementColumnDefs } from '../ColumnsDefs.ts'
import { IBankStatement } from '../Models.ts'
import { BankStatementGrid } from '../IWSGrid.tsx'
import BankStatementTabs from './BankStatementTabs.tsx'
import Login from './Login'
import { logout } from '../utils/FormUtils.tsx'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useForm from './useForm.ts'
import { styles } from './BasicTreeTableProps.tsx'
import BankStatementFormHead from './BankStatementFormHead.tsx'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const BankStatementForm = () => {
  const [{
    profile, t, language, toggle, toggleTable,
    handleLanguageChange, state, modelid, company, module_,
  }] = useForm()

  const { token, locale, currency } = profile
  const currencyx = currency ?? 'EUR'
  const minHeight = 330
  const maxHeight = 500
  const height = 33
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const current_: IBankStatement = initBS
  const [current, setCurrent] = useState<IBankStatement>(current_)
  const [rows, setRows] = useState<string[] | bigint[]>([])

  // ── Reactive store read for rowData ─────────────────────────────────────
  const snapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  )

  const rowData = useMemo<IBankStatement[]>(() => {
    const inner = snapshot.get(initBS.modelid)
    return inner ? (Array.from(inner.values()) as IBankStatement[]) : []
  }, [snapshot])

  // Write-through setter (kept for API compatibility)
  const setRowData = (value: React.SetStateAction<IBankStatement[]>) => {
    if (typeof value === 'function') {
      const inner = iwsStore.getRawMap().get(initBS.modelid)
      const base = inner ? (Array.from(inner.values()) as IBankStatement[]) : []
      const next = (value as (p: IBankStatement[]) => IBankStatement[])(base)
      next.forEach(item => iwsStore.set(item))
    } else {
      value.forEach(item => iwsStore.set(item))
    }
  }

  // Initial load if store is empty
  useEffect(() => {
    if (!token) return
    const inner = iwsStore.getRawMap().get(initBS.modelid)
    if (!inner || inner.size === 0) {
      const ctx = `${module_?.ctx ?? ''}/${modelid}/${company}`
      Get(ctx, token, modelid, (() => {}) as React.Dispatch<React.SetStateAction<IBankStatement[]>>)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, modelid, company])

  // ── Early return AFTER all hooks ────────────────────────────────────────
  if (module_ === '11111' || module_ === 11111) return <Login />

  const modifyUrl = module_.ctx
  const ctx = `${module_.ctx}/${modelid}/${company}`
  const title = t(module_.title)

  const cancelEdit = () => {
    setCurrent(current_)
  }

  const submitEdit = async () => {
    try {
      const updated = await Edit(modifyUrl, token, current)
      if (!updated) return

      const index = rowData.findIndex(
        (obj) => String(obj?.id) === String(updated.id)
      )
      if (index >= 0) {
        const newList = [...rowData]
        newList[index] = updated
        setRowData(newList)
      }
    } catch (error) {
      console.error('Edit failed', error)
    }
  }

  const reload = () => {
    iwsStore.deleteByModelId(current.modelid)
    Get(ctx, token, modelid, setRowData)
    setCurrent(current_)
  }

  const onRowSelected = (event: RowSelectedEvent) => {
    if (!event?.data) return
    const _data: IBankStatement[] = event.data instanceof Array ? event.data : [event.data]
    setRows(_data.map((item: IBankStatement) => item.id))

    // Don't let AG Grid's re-selection event overwrite a just-saved value
    setCurrent((prev) =>
      String(prev?.id) === String(_data[0]?.id) ? prev : _data[0]
    )
  }

  const submitPost = (event: any) => {
    event.preventDefault()
    const url_ = `${MASTERFILE.bs}/post/${current.company}/${rows.join(',')}`
    Get2(url_, token, setCurrent)
  }

  const importData = () => {
    const url_ = `${module_.ctx}/${current.path}/${current.header}/${current.char}/${current.extension}/${company}`
    url_ && Get(url_, token, current.modelid, setRowData)
  }

  return (
    <>
      <BankStatementFormHead
        title={title}
        collapse={state.collapseForm}
        cancelEdit={cancelEdit}
        submitEdit={submitEdit}
        importData={importData}
        submitPost={submitPost}
        reload={reload}
        toggle={toggle}
        toggleTable={toggleTable}
        logout={logout}
        navigate={navigate}
        language={language}
        handleLanguageChange={handleLanguageChange}
        dispatch={dispatch}
        current={current}
        t={t}
      />

      <div
        style={{
          ...styles.outer,
          paddingTop: 1,
          paddingBottom: 10,
          display: !state.collapseForm ? 'none' : '',
        }}
      >
        <BankStatementTabs
          collapse={state.collapseForm}
          current={current}
          setCurrent={setCurrent}
          t={t}
          height={height}
          currency={currencyx}
          locale={locale ?? 'fr-FR'}
        />
      </div>

      <div
        style={{
          ...styles.outer,
          paddingTop: 15,
          height: state.collapseForm ? minHeight : maxHeight,
          minWidth: '100%',
          display: state.collapseTable ? '' : 'none',
        }}>
        <BankStatementGrid
          columnDefs={bankStatementColumnDefs(t, locale ?? 'fr-FR', currency ?? 'EUR')}
          onRowSelected={onRowSelected}
          rowData={rowData}
        />
      </div>
    </>
  )
}

export default BankStatementForm

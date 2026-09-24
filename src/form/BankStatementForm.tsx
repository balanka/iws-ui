import { useState, useEffect } from 'react'
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ModuleRegistry,
} from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
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
import useForm from './UseForm.ts'
import { styles } from './BasicTreeTableProps.tsx'
import BankStatementFormHead from './BankStatementFormHead.tsx'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const BankStatementForm = () => {
  const [{
    profile, t, selected, language, toggle, toggleTable,
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
  const [rowData, setRowData] = useState<IBankStatement[]>([])

  useEffect(() => {
    const subscription = iwsStore.subscribe((store) => {
      setRowData(store.get(initBS.modelid) as unknown as IBankStatement[])
    })
    return () => subscription.unsubscribe()
  }, [selected])


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

      // id is a bigint, JSON returns number/string — compare as strings
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
      // TODO: show user notification
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
    console.log('current', current)
    const url_ = `${module_.ctx}/${current.path}/${current.header}/${current.char}/${current.extension}/${company}`
    console.log('url_', url_)
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
        // @ts-ignore
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
        // @ts-ignore
        style={{
          ...styles.outer,
          paddingTop: 15,
          height: state.collapseForm ? minHeight : maxHeight,
          minWidth: '100%',
          display: state.collapseTable ? '' : 'none',
        }}
      >
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

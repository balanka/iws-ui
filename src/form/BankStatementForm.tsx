import React, {useState, useEffect} from 'react'
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ModuleRegistry
} from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { BSFormHead} from './FormsProps'
import {Edit, Get, Get2} from './CrudController'
import {initBS, MASTERFILE} from './Menu'
import iwsStore from '../utils/Store'
import {bankStatementColumnDefs} from '../ColumnsDefs.ts'
import {IBankStatement} from '../Models.ts'
import {BankStatementGrid} from '../IWSGrid.tsx'
import BankStatementTabs from './BankStatementTabs.tsx'
import Login from './Login'
import {logout} from '../utils/FormUtils.tsx'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import useForm from './UseForm.ts'
import { styles as stylesx} from './BasicTreeTableProps.tsx'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const BankStatementForm = () => {
  const [{profile, t,  selected, language, toggle, handleLanguageChange, state, modelid, company,  module_ }] = useForm()
  const { token, locale, currency } = profile
  const currencyx = currency ??'EUR'
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const modifyUrl = module_.ctx

  if (module_ === '11111' || module_ === 11111) return <Login/>
  const title = t(module_.title)
  const ctx = `${module_.ctx}/${modelid}/${company}`
  const current_: IBankStatement = initBS[0]
  const [current, setCurrent] = useState<IBankStatement>(current_)
  const [rows, setRows] = useState<string[]|bigint[]>([])
  const [, setIwsState] = useState(iwsStore.initialState)
  const [rowData, setRowData] = useState<IBankStatement[]>([])

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
     setCurrent(current_)
  }, [selected])

  const cancelEdit = () => {
    setCurrent(current_)
  }
  const submitEdit = () => Edit(modifyUrl, token, current, rowData, setCurrent)

  const reload = () => {
    iwsStore.deleteKey(current.modelid)
    Get(ctx, token, modelid, setRowData)
    setCurrent(current_)
}

  const onRowSelected = (event: RowSelectedEvent) => {
    const _data:IBankStatement[] = (event.data instanceof Array)?event.data:[event.data]
    let rowsx = _data.map((item:IBankStatement) => item.id)
    // @ts-ignore
    setRows(rowsx)
    setCurrent(_data[0])
  }

  const submitPost = (event:any) => {
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

  const minHeight = 330
  const maxHeight = 500
  const height = 33
  return (
        <>
          <BSFormHead
              title={title}
              collapse={state.collapse}
              cancelEdit={cancelEdit}
              submitEdit={submitEdit}
              importData={importData}
              submitPost={submitPost}
              reload={reload}
              toggle={toggle}
              logout={logout}
              navigate={navigate}
              language={language}
              handleLanguageChange={handleLanguageChange}
              dispatch={dispatch}
              current={current}
          />
          <Grid item
                //@ts-ignore
                style={{...stylesx.outer0, paddingTop:2, paddingBottom:1, display: !state.collapse?'none':''}}>
            <BankStatementTabs collapse ={state.collapse} current={current} setCurrent={setCurrent}  t={t}  height={height}
              currency={currencyx}  locale={locale ??'fr-FR'}/>
          </Grid>
            <Grid item
                  //@ts-ignore
                  style={{...stylesx.outer, paddingTop: 10, height: state.collapse?minHeight:maxHeight, width:'100%' }}>
              <BankStatementGrid
                   columnDefs ={bankStatementColumnDefs(t)}  onRowSelected={onRowSelected} rowData ={rowData}/>
            </Grid>
    </>
  )
}
export default BankStatementForm

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
import {initBS, MASTERFILE, useStore} from './Menu'
import iwsStore from '../utils/Store'
import { useTranslation } from 'react-i18next'
import { formEnum } from '../utils/FormEnum'
import {bankStatementColumnDefs} from '../ColumnsDefs.ts'
import {IBankStatement} from '../Models.ts'
import {BankStatementGrid} from '../IWSGrid.tsx'
import BankStatementTabs from "./BankStatementTabs.tsx";
import Login from './Login'
import {logout} from '../utils/FormUtils.tsx'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 30px 40px #BBB",
    padding: 4,
  },
}

const BankStatementForm = () => {
  // @ts-ignore
  const { profile, menu, selected } = useStore()
  const { t, i18n} = useTranslation()
  const { token, company, locale, currency } = profile
  const localex = locale ??'fr-FR'
  const currencyx = currency ??'EUR'
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [language, setLanguage] = useState('en-US')
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  //module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  const modifyUrl = module_.ctx
  module_ =  module_ ?? formEnum.LOGIN
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const title = t(module_.title)
  const [state, setState] = useState({ collapse: true, fadeIn: true, timeout: 300 })
  //const [toolbar, setToolbar] = useState(true)
  const height = 33
  const modelid :number = module_? module_.modelid:1111
  const ctx = `${module_.ctx}/${modelid}/${company}`
  const current_: IBankStatement = initBS[0]
  const [current, setCurrent] = useState<IBankStatement>(current_)
  const [rows, setRows] = useState<string[]|bigint[]>([])
  const [, setIwsState] = useState(iwsStore.initialState)

  //const toggleToolbar = () => setToolbar(!toolbar)
  const toggle = () => setState({ ...state, collapse: !state.collapse })

  const [rowData, setRowData] = useState<IBankStatement[]>([])

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
     //Get(ctx, token, modelid, setRowData)
     setCurrent(current_)
  }, [selected])

  const cancelEdit = () => {
    setCurrent(current_)
  }
  const submitEdit = () => Edit(modifyUrl, token, current, rowData, setCurrent)


  //const cancelEdit = () => initAdd()
  // const initAdd = () => {
  //   const newRow = { ...initialState, company: company, currency: currency, editing: false }
  //   EditRow(newRow, true, setCurrent)
  // }

  const reload = () => {
    iwsStore.deleteKey(current.modelid)
    //const url_ = modifyUrl?.concat('/').concat(current.modelid)
    Get(ctx, token, modelid, setRowData)
    //Get1(ctx, token, current.modelid)
    setCurrent(current_)
}

  // const submitQuery = (event:any) => {
  //   event.preventDefault()
  //   Get(ctx, token, modelid, setRowData)
  // }
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

  const handleLanguageChange = (event:any) => {
    event.preventDefault()
    const value = event.target.value
    setLanguage(value)
    i18n.changeLanguage(value)
  }
  const minHeight = 400
  const maxHeight = 700
  return (
        <>
        {/*<Grid container spacing={10} style={{...STYLES.inner}} direction="column">*/}
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
          <Grid item style={{...styles.outer, paddingTop:15, height: state.collapse?minHeight:maxHeight}}>
            <BankStatementTabs collapse ={state.collapse} current={current} setCurrent={setCurrent}  t={t}  height={height}
              currency={currencyx}  locale={localex}/>
            <Grid item style={{paddingTop: 5, height:'75%', width:'100%' }}>
              <BankStatementGrid
                   columnDefs ={bankStatementColumnDefs(t)}  onRowSelected={onRowSelected} rowData ={rowData}/>
            </Grid>
          </Grid>
    </>
  )
}
export default BankStatementForm

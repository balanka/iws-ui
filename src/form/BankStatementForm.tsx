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
import { Get, Get1, Get2} from './CrudController'
import {initBS, MASTERFILE, useStore} from './Menu'
import iwsStore from '../utils/Store'
import { useTranslation } from 'react-i18next'
import { formEnum } from '../utils/FormEnum'
import {bankStatementColumnDefs} from '../ColumnsDefs.ts'
import {IBankStatement} from '../Models.ts'
import {BankStatementGrid} from '../IWSGrid.tsx'
import BankStatementTabs from "./BankStatementTabs.tsx";
import Login from './Login'


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const STYLES = {
  inner: {
    borderRadius: 5,
    boxShadow: '0 20px 50px #BBF',
    padding: 10,
    paddingLeft: 25,
    paddingRight: 20,
    //height: 350,
    paddingTop: 30,
  }
}
const BankStatementForm = () => {
  // @ts-ignore
  const { profile, menu, selected } = useStore()
  const { t, } = useTranslation()
  const { token, company, locale, currency } = profile
  const localex = locale ??'fr-FR'
  const currencyx = currency ??'EUR'
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  //module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  module_ =  module_ ?? formEnum.LOGIN
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const title = t(module_.title)
  const [state, setState] = useState({ collapse: true, fadeIn: true, timeout: 300 })
  const [toolbar, setToolbar] = useState(true)
  const height = 33
  const modelid :number = module_? module_.modelid:1111
  const ctx = `${module_.ctx}/${modelid}/${company}`
  const current_: IBankStatement = initBS[0]
  const [current, setCurrent] = useState<IBankStatement>(current_)
  const [rows, setRows] = useState<string[]|bigint[]>([])
  const [, setIwsState] = useState(iwsStore.initialState)

  const toggleToolbar = () => setToolbar(!toolbar)
  const toggle = () => setState({ ...state, collapse: !state.collapse })

  const [rowData, setRowData] = useState<IBankStatement[]>([])

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
     Get(ctx, token, modelid, setRowData)
     setCurrent(current_)
  }, [selected])

  const submitEdit = () => {}
  //const cancelEdit = () => initAdd()
  // const initAdd = () => {
  //   const newRow = { ...initialState, company: company, currency: currency, editing: false }
  //   EditRow(newRow, true, setCurrent)
  // }

  const reload = () => {
    iwsStore.deleteKey(current.modelid)
    //const url_ = modifyUrl?.concat('/').concat(current.modelid)
    Get1(ctx, token, current.modelid)
    setCurrent(current_)
}

  const submitQuery = (event:any) => {
    event.preventDefault()
    Get(ctx, token, modelid, setRowData)
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
    const url_ = `${module_.ctx}/${current.path}/${current.header}/${current.char}/${current.extension}/${company}`
    console.log('url_', url_)
    url_ && Get(url_, token, current.modelid, setRowData)
  }

  // const gridOptions: GridOptions<IBankStatement> = {
  //   rowStyle: {background: 'lightBlue'},
  //   // @ts-ignore
  //   getRowStyle: (params: { node: { rowIndex: number } }) => {
  //     if (params.node.rowIndex % 2 === 0) {
  //       return {background: '#fff9e6'}
  //     } else return {background: 'lightBlue'}
  //   },
  //   defaultColDef: {
  //     resizable: true,
  //     editable: false,
  //     flex: 1,
  //     filter: true,
  //   },
  //   rowHeight: 20,
  //   rowSelection: {
  //     mode: "multiRow",
  //   },
  //   onRowSelected: onRowSelected,
  //   paginationPageSizeSelector: [5, 10, 20, 50],
  //   pagination: true,
  //   paginationPageSize: 10,
  //   autoSizeStrategy: {
  //     type: "fitGridWidth",
  //   },
  //   // @ts-ignore
  //   columnDefs: bankStatementColumnDefs(t),
  //
  // }
  return (
        <Grid container spacing={10} style={{...STYLES.inner}} direction="column">
          <BSFormHead
              title={title}
              collapse={state.collapse}
              //setData={setRowData}
              submitEdit={submitEdit}
              reload={reload}
              importData={importData}
              submitQuery={submitQuery}
              submitPost={submitPost}
              toggle={toggle}
              toggleToolbar={toggleToolbar}
              current={current}
          />
          <Grid container style={{...STYLES.inner}} maximize direction="row" zeroMinWidth>
            <BankStatementTabs current={current} setCurrent={setCurrent}  t={t}  height={height}
              currency={currencyx}  locale={localex}/>
            <Grid item style={{paddingTop: 5, height:300, width:1500 }}>
              <BankStatementGrid
                  // @ts-ignore
                   columnDefs ={bankStatementColumnDefs(t)}  onRowSelected={onRowSelected} rowData ={rowData}/>
            </Grid>
          </Grid>
        </Grid>
  )
}
export default BankStatementForm

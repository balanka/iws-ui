import React, {useEffect, useState} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry, PinnedRowModule} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {JournalFormHead, JournalMainForm} from './FormsProps'
import {Get} from './CrudController'
import {initAcc, initModule, MASTERFILE, PACB_QUERY_PARM, useStore} from './Menu'
import iwsStore from '../utils/Store'
import {useTranslation} from 'react-i18next'
import {formEnum} from '../utils/FormEnum'
import {journalColumnsDefs} from '../ColumnsDefs.ts'
import {IAccount, IJournal, IModule, IPACBQueryParam} from '../Models.ts'
import {defaultColDefX, JournalGrid} from '../IWSGrid.tsx'
import Login from './Login.tsx'
import {formatumber2Digits} from '../utils/Utils.ts'
import {useDispatch} from 'react-redux'
import {logout} from './TransactionLib.ts'
import {generateDocx} from '../utils/XlsUtils.ts'

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  //RowGroupingModule,
  PinnedRowModule,
  // ExcelExportModule,
  // SetFilterModule,
  // MultiFilterModule,
  // MasterDetailModule,
])

const STYLES = {
  inner: {
    borderRadius: 5,
    boxShadow: '0 20px 50px #BBF',
    padding: 10,
    paddingTop: 30,
    // paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 3,
  },
  inner2: {
    borderRadius: 5,
    boxShadow: '0 20px 50px #BBF',
    paddingTop:5,
    paddingLeft: 1,
    paddingRight: 2,
  },
}
const Journal = () => {
  // @ts-ignore
  const { profile, menu, selected } = useStore()
  const { t, } = useTranslation()
  const { token, currency, company } = profile
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const title =  `${company}/${t(module_.title)}`
  const module_modelid = formEnum.MODULE
  const module_ctx = `${MASTERFILE.module}/${module_modelid}/${company}`
  const dispatch = useDispatch()

  const height = 20
  const modelid :number = module_? module_.modelid:1111
  console.log('module_', module_)
  const acc_modelid = formEnum.ACCOUNT
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const current_ = {...PACB_QUERY_PARM, modelid:modelid, currency:currency??''}
  const [current, setCurrent] = useState<IPACBQueryParam>(current_)
  const [, setIwsState] = useState(iwsStore.initialState)
  const [accData, setAccData] = useState<IAccount[]>([])
  const [rowData, setRowData] = useState<IJournal[]>([])
  const [module, setModule] = useState<IModule[]>([])

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    Get(acc_ctx, token, acc_modelid, setAccData)
    Get(module_ctx, token, module_modelid, setModule)
    setCurrent(current_)
  }, [selected, modelid])

  const buildUrl = () => `${module_.ctx}/${company}/${current.account}/${current.fromPeriod ===-1 ?
    current.toPeriod:current.fromPeriod}/${current.toPeriod}`
  const getUrlAll = () => `${module_.ctx}/${company}/${current.fromPeriod ===-1 ?
    current.toPeriod:current.fromPeriod}/${current.toPeriod}`

  const submitQuery_ = (event:any) => {
    event.preventDefault()
    accData?.length < 2
      ? Get(acc_ctx, token,  acc_modelid, setAccData)
      : Get(buildUrl(), token,  modelid, setRowData)
  }
  const submitQuery2 = (event:any) => {
    event.preventDefault()
    accData?.length < 2
      ? Get(acc_ctx, token,  acc_modelid, setAccData)
      : Get(getUrlAll(), token, modelid, setRowData)
  }

  const onRowSelected = (event: RowSelectedEvent) =>
    setCurrent((event.data instanceof Array)?event.data[0]:event.data)

  const formatter = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const toBalance2 = (m:IJournal) => {
    const currentAcc= accData.find(acc=>acc.id === m.account)??initAcc[0]
    const x= m?.bdebit??0.0
    const y= m?.bcredit??0.0
    const balance = currentAcc.isDebit ? x-y :y-x

    return {...m, id:m.id, modelid:m.modelid, currency:m.currency, account:m.account
      , transdate: formatter.format(new Date(m.transdate)), text: m.text.substring(0, 50)
      , amount:m.amount==0.0?'':formatumber2Digits (m.amount,'de-DE', 2)
      , idebit: m.idebit==0.0?'':formatumber2Digits (m.idebit,'de-DE', 2)
      , icredit:m.icredit==0.0?'':formatumber2Digits (m.icredit,'de-DE', 2)
      , debit:m.debit==0.0?'':formatumber2Digits (m.debit,'de-DE', 2)
      , credit:m.credit==0.0?'':formatumber2Digits (m.credit,'de-DE', 2)
      , bdebit:m.bdebit==0.0?'':formatumber2Digits (m.idebit+m.debit,'de-DE', 2)
      , bcredit:m.bcredit==0.0?'':formatumber2Digits (m.icredit+m.credit,'de-DE', 2)
      , balance: formatumber2Digits(balance, 'de-DE', 2)
      , period:m.period, name:'', company:m.company
    }
  }

  const getData =() => {
    const total_bdebit = rowData.filter(rd=>rd.side).reduce((accumulator:number, currentData:IJournal):number => accumulator + currentData.amount, 0.0)
    const total_bcredit:number = rowData.filter(rd=>!rd.side).reduce((accumulator:number, currentData:IJournal):number => accumulator + currentData.amount , 0.0)
    return {
      fromPeriod:current.fromPeriod
      , toPeriod:current.toPeriod
      , currency:rowData?rowData[0].currency:''
      , total_bdebit:total_bdebit==0.0?'':formatumber2Digits (total_bdebit,'de-DE', 2)
      , total_bcredit:total_bcredit==0.0?'':formatumber2Digits (total_bcredit,'de-DE', 2)
      , data: rowData.map(toBalance2)}
  }
  const templateName = () =>  (module.find((m:IModule) => Number(m.id) === modelid) ?? initModule[0]).description
  return (
    <Grid container style={{...STYLES.inner}} maximize direction="row" zeroMinWidth>
      <JournalFormHead style={{...STYLES.inner2}} title={title} submitQuery={submitQuery_} dispatch={dispatch}
                       logout ={logout} submitQuery2={submitQuery2} balancesheet={false} t={t}
                       templateName={templateName}
                       current={ { id: `${current.fromPeriod}${current.toPeriod}`, modelid:current.modelid, company:company}}
                       getData={getData}
                       submitPrintPreview = {generateDocx}
      />
      <JournalMainForm current={current} setCurrent={setCurrent} t={t} accData={accData} height={height}
        // @ts-ignore
                       stylesx={{height: 950, paddingBottom: 5}} ids={['3310', "1100"]}/>
      <Grid item style={{paddingLeft: 1, paddingRight: 1, paddingTop: 5, height: 560, width: 1500}}>
        <JournalGrid
          columnDefs ={journalColumnsDefs(t)}
          defaultColDef ={{...defaultColDefX, filter:true}}
          onRowSelected={onRowSelected}
          rowData={rowData}/>
      </Grid>
    </Grid>
  )
}
export default Journal

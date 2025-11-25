import React, {useState, useEffect} from 'react'
import {
    AllCommunityModule,
    ClientSideRowModelModule,
    //GridReadyEvent,
    ModuleRegistry,
    PinnedRowModule
} from 'ag-grid-community'
//import { RowGroupingModule } from 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { JournalFormHead, JournalMainForm } from './FormsProps'
import { Get} from './CrudController'
import {initAcc, initModule, MASTERFILE, PACB_QUERY_PARM, useStore} from './Menu'
import iwsStore from '../utils/Store'
import { useTranslation } from 'react-i18next'
import { formEnum } from '../utils/FormEnum'
import {journalColumnsDefs} from '../ColumnsDefs.ts'
import {IAccount, IJournal, IModule, IPACBQueryParam, IPeriodicAccountBalance2} from '../Models.ts'
import {JournalGrid} from '../IWSGrid.tsx'
import Login from './Login.tsx'
import  {defaultColDefX} from '../IWSGrid.tsx'
import {formatumber2Digits} from '../utils/Utils.ts'
import {useDispatch} from 'react-redux'
import {logout} from './TransactionLib.ts'
import {generateDocx} from "../utils/XlsUtils.ts";


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
  const { token, company } = profile
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const title =  company?.concat(' / ').concat(t(module_.title))
  const module_modelid = formEnum.MODULE
  const module_ctx = `${MASTERFILE.module}/${module_modelid}/${company}`
  //const initialState:IPACBQueryParam = module_.state
  //const ALL = { ...initialState, id: '*', name: '**ALL**' }
  const dispatch = useDispatch()
  //const [state, setState] = useState({ collapse: true, fadeIn: true, timeout: 300 })
  //const [toolbar, setToolbar] = useState(true)
  const height = 20

  const modelid :number = module_? module_.modelid:1111
  console.log('module_', module_)
  const acc_modelid = formEnum.ACCOUNT
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const current_ = {...PACB_QUERY_PARM, modelid:modelid}
  const [current, setCurrent] = useState<IPACBQueryParam>(current_)
  const [, setIwsState] = useState(iwsStore.initialState)
  //const toggleToolbar = () => setToolbar(!toolbar)
  //const toggle = () => setState({ ...state, collapse: !state.collapse })
  const [accData, setAccData] = useState<IAccount[]>([])
  const [rowData, setRowData] = useState<IJournal[]>([])
  const [module, setModule] = useState<IModule[]>([])

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
     Get(acc_ctx, token, acc_modelid, setAccData)
     Get(module_ctx, token, module_modelid, setModule)
     setCurrent(current_)
  }, [selected, modelid])

  // const buildUrl = () => `${module_.ctx}/${company}/${current.account}/${current.fromPeriod}/${current.toPeriod}`
  const buildJournalUrl = () => `${module_.ctx}/${company}/${current.account}/${current.fromPeriod ===-1 ?
                                                   current.toPeriod:current.fromPeriod}/${current.toPeriod}`
  const buildJournalUrlAll = () => `${module_.ctx}/${company}/${current.fromPeriod ===-1 ?
                                                      current.toPeriod:current.fromPeriod}/${current.toPeriod}`

  // const getUrlAll = () =>  modelid === formEnum.PACB ? `${module_.ctx}/${company}/${current.fromPeriod}/${current.toPeriod}`: buildJournalUrlAll()
  // const getUrl = modelid === formEnum.PACB ? buildUrl : buildJournalUrl
  const submitQuery_ = (event:any) => {
    event.preventDefault()
    accData?.length < 2
        ? Get(acc_ctx, token,  acc_modelid, setAccData)
        : Get(buildJournalUrl(), token,  modelid, setRowData)
  }
  const submitQuery2 = (event:any) => {
    event.preventDefault()
    accData?.length < 2
        ? Get(acc_ctx, token,  acc_modelid, setAccData)
        : Get(buildJournalUrlAll(), token, modelid, setRowData)
  }

  const onRowSelected = (event: RowSelectedEvent) =>
          setCurrent((event.data instanceof Array)?event.data[0]:event.data)

  let currency= profile?.currency??'XOF'
   const toBalance2 = (m:IJournal) => {
     const currentAcc= accData.find(acc=>acc.id === m.account)??initAcc[0]
     const x= m?.bdebit??0.0
     const y= m?.bcredit??0.0
     const balance = currentAcc.isDebit ? x-y :y-x

        return { id:m.id, modelid:m.modelid, currency:m.currency, account:m.account
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
       const daten = () => rowData.map(toBalance2)

  const total_debit = rowData.reduce((accumulator:number, currentData:IJournal):number => accumulator + currentData.debit, 0.0)
  const total_credit = rowData.reduce((accumulator:number, currentData:IJournal):number => accumulator + currentData.credit, 0.0)
  const total_idebit = rowData.reduce((accumulator:number, currentData:IJournal):number => accumulator + currentData.idebit, 0.0)
  const total_icredit = rowData.reduce((accumulator:number, currentData:IJournal):number => accumulator + currentData.icredit, 0.0)
  const total_bdebit:number = rowData.reduce((accumulator:number, currentData:IJournal):number => accumulator + currentData.idebit+currentData.debit, 0.0)
  const total_bcredit:number = rowData.reduce((accumulator:number, currentData:IJournal):number => accumulator + currentData.icredit +currentData.credit, 0.0)


  const data: {id: string, modelid:number, company:string
    , fromPeriod:number, toPeriod:number
    , currency:string, total_idebit:string
    , total_icredit:string, total_debit:string
    , total_credit:string
    , total_bdebit:string, total_bcredit:string, lines:IPeriodicAccountBalance2 []} =
      { id: `${current.fromPeriod}${current.toPeriod}`, modelid:current.modelid, company:company
        , fromPeriod:current.fromPeriod, toPeriod:current.toPeriod, currency:currency
        , total_idebit:total_idebit==0.0?'':formatumber2Digits (total_idebit,'de-DE', 2)
        , total_icredit:total_icredit==0.0?'':formatumber2Digits (total_icredit,'de-DE', 2)
        , total_debit:total_debit==0.0?'':formatumber2Digits (total_debit,'de-DE', 2)
        , total_credit:total_credit==0.0?'':formatumber2Digits (total_credit,'de-DE', 2)
        , total_bdebit:total_bdebit==0.0?'':formatumber2Digits (total_bdebit,'de-DE', 2)
        , total_bcredit:total_bcredit==0.0?'':formatumber2Digits (total_bcredit,'de-DE', 2)
        , lines:daten()
      }

  const getData =() =>data
  const templateName = () =>  (module.find((m:IModule) => Number(m.id) === modelid) ?? initModule[0]).description
  console.log('templateName', templateName())
  return (
      <Grid container style={{...STYLES.inner}} maximize direction="row" zeroMinWidth>
        <JournalFormHead style={{...STYLES.inner2}} title={title} submitQuery={submitQuery_} dispatch={dispatch}
               logout ={logout} submitQuery2={submitQuery2} balancesheet={false} t={t}
                         templateName={templateName}
                         current={data}
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

import React, {useState, useEffect} from 'react'
import {
    AllCommunityModule,
    ClientSideRowModelModule,
    ModuleRegistry,
    PinnedRowModule
} from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { JournalFormHead, JournalMainForm } from './FormsProps'
import { Get} from './CrudController'
import {initAcc, MASTERFILE, PACB_QUERY_PARM, useStore} from './Menu'
import iwsStore from '../utils/Store'
import { useTranslation } from 'react-i18next'
import { formEnum } from '../utils/FormEnum'
import {pacColumnsDefs} from '../ColumnsDefs.ts'
import {
  IAccount,
  IModule,
  IPACBQueryParam,
  IPeriodicAccountBalance,
  IPeriodicAccountBalance2
} from '../Models.ts'
import {PeriodicAccountBalanceGrid} from '../IWSGrid.tsx'
import Login from './Login.tsx'
import  {defaultColDefX} from '../IWSGrid.tsx'
import {formatumber2Digits} from '../utils/Utils.ts'
import {useDispatch} from 'react-redux'
import {logout} from './TransactionLib.ts'

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
const JForm = () => {
  // @ts-ignore
  const {profile, menu, selected} = useStore()
  const {t,} = useTranslation()
  const {token, company} = profile
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const title = company?.concat(' / ').concat(t(module_.title))
  //const initialState:IPACBQueryParam = module_.state
  //const ALL = { ...initialState, id: '*', name: '**ALL**' }
  const dispatch = useDispatch()
  const height = 20

  const modelid: number = module_ ? module_.modelid : 1111
  const acc_modelid = formEnum.ACCOUNT
  const module_modelid = formEnum.MODULE
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const module_ctx = `${MASTERFILE.module}/${module_modelid}/${company}`
  const current_ = {...PACB_QUERY_PARM, modelid: modelid}
  const [current, setCurrent] = useState<IPACBQueryParam>(current_)
  const [, setIwsState] = useState(iwsStore.initialState)
  const [accData, setAccData] = useState<IAccount[]>([])
  const [rowData, setRowData] = useState<IPeriodicAccountBalance[]>([])
  const [, setModule] = useState<IModule[]>([])
  //const [_,   setGridApi] = useState<GridApi>()

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    Get(acc_ctx, token, acc_modelid, setAccData)
    Get(module_ctx, token, module_modelid, setModule)
    setCurrent(current_)
  }, [selected])

  const buildUrl = () => `${module_.ctx}/${company}/${current.account}/${current.fromPeriod}/${current.toPeriod}`
  const getUrlAll = () => `${module_.ctx}/${company}/${current.fromPeriod}/${current.toPeriod}`

  const submitQuery_ = (event: any) => {
    event.preventDefault()
    accData?.length < 2
      ? Get(acc_ctx, token, acc_modelid, setAccData)
      : Get(buildUrl(), token, modelid, setRowData)
  }
  const submitQuery2 = (event: any) => {
    event.preventDefault()
    accData?.length < 2
      ? Get(acc_ctx, token, acc_modelid, setAccData)
      : Get(getUrlAll(), token, modelid, setRowData)
  }

  const onRowSelected = (event: RowSelectedEvent) => setCurrent((event.data instanceof Array) ? event.data[0] : event.data)
  const format = (d: IPeriodicAccountBalance) => {
    const currentAcc = accData.find(acc => acc.id === d.account) ?? initAcc[0]
    const balance = currentAcc.isDebit ?
       (d.idebit + d.debit - d.icredit - d.credit): (d.icredit + d.credit - d.idebit - d.debit)
    return {
      ...d
      , idebit: d.idebit.toFixed(2)
      , icredit: d.icredit.toFixed(2)
      , debit: d.debit.toFixed(2)
      , credit: d.credit.toFixed(2)
      , bdebit: (d.idebit + d.debit).toFixed(2)
      , bcredit: (d.icredit + d.credit).toFixed(2)
      , balance: balance.toFixed(2)
    }
  }
  const sumData = (data: IPeriodicAccountBalance[]) => {
    const idebit = data.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData.idebit, 0.0)
    const icredit = data.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData.icredit, 0.0)
    const debit = data.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData.debit, 0.0)
    const credit = data.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData.credit, 0.0)
    const bdebit = data.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData?.bdebit, 0.0)
    const bcredit = data.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData?.bcredit, 0.0)
    const accountx = data.reduce((_, currentData: IPeriodicAccountBalance) => currentData?.account, '')
    const currency = data.reduce((_, currentData: IPeriodicAccountBalance) => currentData?.currency, '')
    const modelidx = data.reduce((_, currentData: IPeriodicAccountBalance) => currentData?.modelid, -1)
    const companyx = data.reduce((_, currentData: IPeriodicAccountBalance) => currentData?.company, '')
    return {idebit, icredit, debit, credit, bdebit, bcredit, accountx, currency, modelidx, companyx};
  }
  const {currency, modelidx, companyx} = sumData(rowData)
  const totalPac0: IPeriodicAccountBalance = {
    id: '-1', name: 'Total', idebit: Number(0.0.toFixed(2))
    , icredit: Number(0.0.toFixed(2))
    , debit: Number(0.0.toFixed(2))
    , credit: Number(0.0.toFixed(2))
    , bdebit: Number(0.0.toFixed(2))
    , bcredit: Number(0.0.toFixed(2))
    , balance: Number(0.0.toFixed(2)), account: '', modelid: modelidx, period: 0, currency: currency, company: companyx
  }

  const totalPac = (rowData: IPeriodicAccountBalance[]):IPeriodicAccountBalance => {
    //const {idebit, icredit, debit, credit, bdebit, bcredit, accountx, currency, modelidx, companyx} = sumData(datax)
    const idebit = rowData.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData.idebit, 0.0)
    const icredit = rowData.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData.icredit, 0.0)
    const debit = rowData.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData.debit, 0.0)
    const credit = rowData.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData.credit, 0.0)
    const currentAcc = accData.find(acc => acc.id === current.account) ?? initAcc[0]
    //const bdebitv = rowData.reduce((accumulator, currentData: IPeriodicAccountBalance) => accumulator+ currentData?.idebit+currentData?.debit, 0.0)
    //const bcreditv = rowData.reduce((accumulator, currentData: IPeriodicAccountBalance) => accumulator + currentData?.icredit+ currentData?.credit, 0.0)
    const balance = currentAcc.isDebit ? (idebit+debit - credit-credit) : (icredit+credit - idebit+debit)
    console.log('currentAcc>>>', currentAcc)
    console.log('debit>>>', debit)
    console.log('credit>>>', credit)
    console.log('balance>>>', balance)
    const total = {
      id: '-1', name: 'Total', account: ''
      , idebit: Number(idebit.toFixed(2))
      , icredit: Number(icredit.toFixed(2))
      , debit: Number(debit.toFixed(2))
      , credit: Number(credit.toFixed(2))
      , bdebit: Number((idebit+debit).toFixed(2))
      , bcredit: Number((icredit+credit).toFixed(2))
      , balance: Number(balance.toFixed(2)), modelid: modelidx, period: 0, currency: currency, company: companyx
    }
    console.log('total>>>', total)
    return total
  }
    const templateFileName = 'Balancesx.docx'
   // let currency = profile?.currency ?? 'XOF'
    const toBalance2 = (m: IPeriodicAccountBalance) => {
      const currentAcc= accData.find(acc=>acc.id === m.account)??initAcc[0]
        return {
            id: m.id, name: m.name, modelid: m.modelid, currency: m.currency, account: m.account
            , idebit: m.idebit == 0.0 ? '' : formatumber2Digits(m.idebit, 'de-DE', 2)
            , icredit: m.icredit == 0.0 ? '' : formatumber2Digits(m.icredit, 'de-DE', 2)
            , debit: m.debit == 0.0 ? '' : formatumber2Digits(m.debit, 'de-DE', 2)
            , credit: m.credit == 0.0 ? '' : formatumber2Digits(m.credit, 'de-DE', 2)
            , bdebit: m.bdebit == 0.0 ? '' : formatumber2Digits(m.bdebit, 'de-DE', 2)
            , bcredit: m.bcredit == 0.0 ? '' : formatumber2Digits(m.bcredit, 'de-DE', 2)
            , balance: currentAcc.isDebit ? formatumber2Digits(m.bdebit-m.bcredit, 'de-DE', 2) :
                                            formatumber2Digits(m.bcredit-m.bdebit, 'de-DE', 2)
            , period: m.period, company: m.company
        }
    }
    const daten = () => rowData.map((m) => toBalance2(m))
    const total_debit = rowData.reduce((accumulator: number, currentData: IPeriodicAccountBalance): number => accumulator + currentData.debit, 0.0)
    const total_credit = rowData.reduce((accumulator: number, currentData: IPeriodicAccountBalance): number => accumulator + currentData.credit, 0.0)
    const total_idebit = rowData.reduce((accumulator: number, currentData: IPeriodicAccountBalance): number => accumulator + currentData.idebit, 0.0)
    const total_icredit = rowData.reduce((accumulator: number, currentData: IPeriodicAccountBalance): number => accumulator + currentData.icredit, 0.0)
    const total_bdebit: number = rowData.reduce((accumulator: number, currentData: IPeriodicAccountBalance): number => accumulator + currentData?.bdebit, 0.0)
    const total_bcredit: number = rowData.reduce((accumulator: number, currentData: IPeriodicAccountBalance): number => accumulator + currentData?.bcredit, 0.0)
    const total_modelid: number = rowData.reduce((_, currentData: IPeriodicAccountBalance): number =>  currentData?.modelid, -1)
    const total_currency: string = rowData.reduce((_, currentData: IPeriodicAccountBalance): string =>  currentData?.currency, '')
    const total_company: string = rowData.reduce((_, currentData: IPeriodicAccountBalance): string =>  currentData?.company, '')

    const totalBalance = {
        total_idebit: total_idebit == 0.0 ? '' : formatumber2Digits(total_idebit, 'de-DE', 2)
        , total_icredit: total_icredit == 0.0 ? '' : formatumber2Digits(total_icredit, 'de-DE', 2)
        , total_debit: total_debit == 0.0 ? '' : formatumber2Digits(total_debit, 'de-DE', 2)
        , total_credit: total_credit == 0.0 ? '' : formatumber2Digits(total_credit, 'de-DE', 2)
        , total_bdebit: total_bdebit == 0.0 ? '' : formatumber2Digits(total_bdebit, 'de-DE', 2)
        , total_bcredit: total_bcredit == 0.0 ? '' : formatumber2Digits(total_bcredit, 'de-DE', 2)
        , modelid:total_modelid
        , currency:total_currency
        , company:total_company
    }
    const data: {
        fromPeriod: number,
        toPeriod: number,
        currency: string,
        total_idebit: string,
        total_icredit: string,
        total_debit: string,
        total_credit: string,
        total_bdebit: string,
        total_bcredit: string,
        lines: IPeriodicAccountBalance2 []
    } = {...totalBalance, fromPeriod: current.fromPeriod, toPeriod: current.toPeriod, currency: currency, lines: daten()}

  // const formatLines = (line:ILineFinancials):ILineFinancials =>  {
  //   return  { ...line
  //     // @ts-ignore
  //     , amount:Number(line.amount).toFixed(2)}
  // }
  // const templateName = () =>
  //   templateFileName ? templateFileName: (module.find((m:IMasterfile) => Number(m.id) === current.modelid) ?? initModule[0]).description

  const buildTotal = (data:IPeriodicAccountBalance[]):void =>{
    let d= [...data]
    if (current.toPeriod == undefined || current.toPeriod == -1) {
      d.splice(0, d.length)
       d.push(totalPac0)
    } else {
      const index = d.findIndex(d => d.period === 0)
      const total = totalPac(data)
      console.log('total', total)
      if (index === -1) {
       d.push(total)
        setRowData(d)
      }
    }
  }

  buildTotal(rowData)

  return (
        <Grid container style={{...STYLES.inner}} maximize direction="row" zeroMinWidth>
            <JournalFormHead style={{...STYLES.inner2}} title={title} submitQuery={submitQuery_} dispatch={dispatch}
                             logout={logout} submitQuery2={submitQuery2} balancesheet={true} t={t}
                             templateFileName={templateFileName} current={data}/>
            <JournalMainForm current={current} setCurrent={setCurrent} t={t} accData={accData} height={height}
                // @ts-ignore
                             stylesx={{height: 950, paddingBottom: 5}} ids={['3310', "1100"]}/>
            <Grid item style={{paddingLeft: 1, paddingRight: 1, paddingTop: 20, height: 600, width: 1500}}>
                <PeriodicAccountBalanceGrid
                  columnDefs ={pacColumnsDefs(t)}
                  defaultColDef ={defaultColDefX}
                  onRowSelected={onRowSelected}
                    rowData={ rowData.map(format)}/>
            </Grid>
        </Grid>
    )
}
export default JForm

import React, {useEffect, useState} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry, PinnedRowModule} from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {JournalFormHead, JournalMainForm} from './FormsProps'
import {initAcc} from './Menu'
import iwsStore from '../utils/Store'
import {formEnum} from '../utils/FormEnum'
import {pacColumnsDefs} from '../ColumnsDefs.ts'
import {IPeriodicAccountBalance} from '../Models.ts'
import {defaultColDefX, PeriodicAccountBalanceGrid} from '../IWSGrid.tsx'
import Login from './Login.tsx'
import {formatumber2Digits} from '../utils/Utils.ts'
import {useDispatch} from 'react-redux'
import {logout} from './TransactionLib.ts'
import {generateDocx} from '../utils/XlsUtils.ts'
import useJForm from './UseJForm.ts'

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  PinnedRowModule,
])


const JForm = () => {
  // @ts-ignore
  const [, setIwsState] = useState(iwsStore.initialState)
  const  [{profile, menu, selected, t, accData, rowData, setRowData, current_, current, setCurrent, submitQuery, submitQuery2
    , onRowSelected, templateName, title, styles}] = useJForm<IPeriodicAccountBalance>()

  const {currency, company} = profile
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  if (module_ === '11111' || module_ === 11111) return <Login/>
  //const title =  `${company}/${t(module_.title)}`
  const dispatch = useDispatch()
  const height = 20

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    setCurrent(current_)
  }, [selected])

  const format = (d: IPeriodicAccountBalance) => {
    const  totalx_debit= d.idebit + d.debit
    const  totalx_credit= d.icredit + d.credit
    const balance = (totalx_debit> totalx_credit?totalx_debit-totalx_credit:totalx_credit-totalx_debit).toFixed(2)
    return {
      ...d
      , idebit: d.idebit.toFixed(2)
      , icredit: d.icredit.toFixed(2)
      , debit: d.debit.toFixed(2)
      , credit: d.credit.toFixed(2)
      , bdebit: totalx_debit> totalx_credit?balance:''
      , bcredit: totalx_credit>totalx_debit?balance:''
      , balance: balance
    }
  }
  const sumData = (data: IPeriodicAccountBalance[]) => {
    const idebit = data.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData.idebit, 0.0)
    const icredit = data.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData.icredit, 0.0)
    const debit = data.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData.debit, 0.0)
    const credit = data.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData.credit, 0.0)
    const  total_debit= idebit + debit
    const  total_credit= icredit + credit
    const balance = (total_debit> total_credit?total_debit-total_credit:total_credit-total_debit).toFixed(2)
    const bdebit = total_debit > total_credit?balance:''
    const bcredit = total_credit >total_debit?balance:''
    const accountx = data.reduce((_, currentData: IPeriodicAccountBalance) => currentData?.account, '')
    const currencyx = data.reduce((_, currentData: IPeriodicAccountBalance) => currentData?.currency, '')
    const modelidx = data.reduce((_, currentData: IPeriodicAccountBalance) => currentData?.modelid, -1)
    const companyx = data.reduce((_, currentData: IPeriodicAccountBalance) => currentData?.company, '')
    return {idebit, icredit, debit, credit, bdebit, bcredit, accountx, currencyx, modelidx, companyx};
  }
  const {currencyx, modelidx, companyx} = sumData(rowData)
  const totalPac0:IPeriodicAccountBalance = {
    id: '-1', name: 'Total', idebit: Number(0.0.toFixed(2))
    , icredit: Number(0.0.toFixed(2))
    , debit: Number(0.0.toFixed(2))
    , credit: Number(0.0.toFixed(2))
    , bdebit: Number(0.0.toFixed(2))
    , bcredit: Number(0.0.toFixed(2))
    , balance: Number(0.0.toFixed(2)), account: '', modelid: modelidx, period:0, currency: currencyx, company: companyx
  }

  const totalPac = (rowData: IPeriodicAccountBalance[]):IPeriodicAccountBalance => {
    const idebit = rowData.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData.idebit, 0.0)
    const icredit = rowData.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData.icredit, 0.0)
    const debit = rowData.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData.debit, 0.0)
    const credit = rowData.reduce((acc, currentData: IPeriodicAccountBalance) => acc + currentData.credit, 0.0)
    const currencyx = rowData.reduce((_, currentData: IPeriodicAccountBalance) => currentData?.currency, '')
    const currentAcc = accData.find(acc => acc.id === current.account) ?? initAcc[0]
    const balance = currentAcc.isDebit ? (idebit+debit - credit-credit) : (icredit+credit - idebit+debit)

    return {
      id: '-1', name: 'Total', account: ''
      , idebit: Number(idebit.toFixed(2))
      , icredit: Number(icredit.toFixed(2))
      , debit: Number(debit.toFixed(2))
      , credit: Number(credit.toFixed(2))
      , bdebit: Number((idebit + debit).toFixed(2))
      , bcredit: Number((icredit + credit).toFixed(2))
      , balance: Number(balance.toFixed(2))
      , modelid: modelidx, period: 0, currency: currencyx, company: companyx
    }
  }

    const toBalance2 = (m: IPeriodicAccountBalance) => {
      const debit: number = m.idebit+m.debit
      const credit = m.icredit+m.credit
      const total_bdebit: number = debit>credit ? debit-credit:0
      const total_bcredit: number = credit>debit ? credit-debit:0
      return {
          id: m.id, name: m.name, modelid: m.modelid, currency: m.currency, account: m.account
        , idebit: m.idebit == 0.0 ? '' : formatumber2Digits(m.idebit, 'de-DE', 2)
        , icredit: m.icredit == 0.0 ? '' : formatumber2Digits(m.icredit, 'de-DE', 2)
        , debit: m.debit == 0.0 ? '' : formatumber2Digits(m.debit, 'de-DE', 2)
        , credit: m.credit == 0.0 ? '' : formatumber2Digits(m.credit, 'de-DE', 2)
        , bdebit: debit>credit ? formatumber2Digits(total_bdebit, 'de-DE', 2):''
        , bcredit: credit>debit ? formatumber2Digits(total_bcredit, 'de-DE', 2):''
        , period: m.period, company: m.company
     }
    }
    const getData  = ()=> {
      return {
        id: `${current.fromPeriod}${current.toPeriod}`
        , fromPeriod: current.fromPeriod, toPeriod: current.toPeriod
        , data: rowData.map(toBalance2)
      }
    }

    const buildTotal = (data:IPeriodicAccountBalance[]):void =>{
      let d= [...data]
      if (current.toPeriod == undefined || current.toPeriod == -1) {
          d.splice(0, d.length)
          d.push(totalPac0)
      } else {
        const index = d.findIndex(d => d.period === 0)
        const total = totalPac(data)
        if (index === -1) {
          d.push(total)
          setRowData(d)
        }
      }
    }

  buildTotal(rowData)

  return (
        <Grid container style={{...styles.inner}} maximize direction="row" zeroMinWidth>
            <JournalFormHead style={{...styles.inner2}} title={title} submitQuery={submitQuery} dispatch={dispatch}
                             logout={logout} submitQuery2={submitQuery2} balancesheet={true} t={t}
                             templateName ={templateName} getData={getData} current ={{...current, currency:currency, company:company}}
                             submitPrintPreview = {generateDocx}/>
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

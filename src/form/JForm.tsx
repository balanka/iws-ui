import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  PinnedRowModule,
  SelectionChangedEvent
} from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { JournalFormHead } from './JournalFormHead'
import { JournalMainForm } from './JournalMainForm'
import {initAcc} from './Menu'
import {pacColumnsDefs} from '../ColumnsDefs.ts'
import {IPeriodicAccountBalance} from '../Models.ts'
import {defaultColDefX, PeriodicAccountBalanceGrid} from '../IWSGrid.tsx'
import Login from './Login.tsx'
import {formatumber2Digits} from '../utils/Utils.ts'
import {useDispatch} from 'react-redux'
import {logout} from '../utils/FormUtils.tsx'
import {generateDocx} from '../utils/XlsUtils.ts'
import useJForm from './UseJForm.ts'
import useForm from './UseForm.ts'
import {useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import {TEMPLATE_ENUM} from "../Props.ts";

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  PinnedRowModule,
])


const JForm = () => {
  const [{ profile,  t, title, language, handleLanguageChange, module_}] = useForm()
  const  [{ accData, rowData, setRowData,  current, setCurrent, submitQuery, submitQuery2
    , onRowSelected, fmodule, styles}] = useJForm<IPeriodicAccountBalance>()

  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const gridRef = useRef<AgGridReact>(null);
  const {currency, locale, company} = profile
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const dispatch = useDispatch()
  const height = 20

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
    const currentAcc = accData.find(acc => acc.id === current.account) ?? initAcc
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
  // const getSelectedRows = () => {
  //   if (gridRef.current) {
  //     const selectedData = gridRef.current.api.getSelectedRows();
  //     console.log('Button clicked! Selected rows:', selectedData);
  //     // Process the selected data here, e.g., send it to an API
  //   }
  // };
    const onSelectionChanged = (event: SelectionChangedEvent) => {
      const selectedData = event.api.getSelectedRows();
      setSelectedRows(selectedData);
      console.log('Selected rows updated:', selectedData);
    };
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

  console.log('Selected rows:', selectedRows);

  return (
        <div  style={{...styles.inner}}>
            <JournalFormHead style={{...styles.inner2}} title={title} submitQuery={submitQuery} dispatch={dispatch}
                             logout={logout} submitQuery2={submitQuery2} balancesheet={true} t={t}
                             fmodule ={fmodule} getData={getData} enumId={TEMPLATE_ENUM.FIRST} current ={{...current, currency:currency, company:company}}
                             // @ts-ignore
                             submitPrintPreview = {generateDocx} language={language} handleLanguageChange={handleLanguageChange}/>
            <JournalMainForm current={current} setCurrent={setCurrent} t={t} accData={accData} height={height}
                // @ts-ignore
                             stylesx={{height: 950, paddingBottom: 5}} ids={['3310', "1100"]}/>
            <div style={{paddingLeft: 1, paddingRight: 1, paddingTop: 20, height: 600, width: '100%'}}>
              {/*<PacTable items={rowData.map(format)} key ='packTable'/>*/}
              {/*<PacTable2 items={rowData.map(format)} key ='packTable'/>*/}
                <PeriodicAccountBalanceGrid columnDefs ={pacColumnsDefs(t, locale??'fr-FR', currency??'EUR')} defaultColDef ={defaultColDefX}
                      onRowSelected={onRowSelected} onSelectionChanged ={onSelectionChanged}  gridRef={gridRef} rowData={ rowData.map(format)}/>
            </div>
        </div>
    )
}
export default JForm

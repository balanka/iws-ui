import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry, PinnedRowModule} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { JournalMainForm} from './JournalMainForm'
import { JournalFormHead } from './JournalFormHead'

import {initAcc} from './Menu'
import {journalColumnsDefs} from '../ColumnsDefs.ts'
import {IJournal} from '../Models.ts'
import {defaultColDefX, JournalGrid} from '../IWSGrid.tsx'
import Login from './Login.tsx'
import {formatumber2Digits} from '../utils/Utils.ts'
import {useDispatch} from 'react-redux'
import {logout} from '../utils/FormUtils.tsx'
import {generateDocx} from '../utils/XlsUtils.ts'
import useJForm from './UseJForm.ts'
import useForm from './UseForm.ts'
import {TEMPLATE_ENUM} from "../Props.ts";

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  PinnedRowModule,
])

const Journal = () => {
  const [{  t, title, language, profile, handleLanguageChange, company,  module_}] = useForm()
  const {currency, locale} = profile
  const  [{ accData, rowData, current, setCurrent, fmodule, submitQuery, submitQuery2, onRowSelected, styles}] = useJForm<IJournal>()
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const dispatch = useDispatch()
  const height = 20
  const formatter = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const toBalance2 = (m:IJournal) => {
    const currentAcc= accData.find(acc=>acc.id === m.account)??initAcc
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

  return (
    <div style={{...styles.inner}} >
      <JournalFormHead style={{...styles.inner2}} title={title} submitQuery={submitQuery} dispatch={dispatch}
                       logout ={logout} submitQuery2={submitQuery2} balancesheet={false} t={t}
                       template1EnumId={TEMPLATE_ENUM.FIRST} fmodule ={fmodule}
                       current={ { ...current, id: `${current.fromPeriod}${current.toPeriod}`, modelid:current.modelid, company:company}}
                       getData={getData} submitPrintPreview = {generateDocx}  language={language} handleLanguageChange={handleLanguageChange}
      />
      <JournalMainForm current={current} setCurrent={setCurrent} t={t} accData={accData} height={height}
        // @ts-ignore
                       stylesx={{height: 950, paddingBottom: 5}} ids={['3310', "1100"]}/>
      <div style={{paddingLeft: 1, paddingRight: 1, paddingTop: 20, height: 600, width: '100%'}}>
      {/*<div style={{paddingLeft: 1, paddingRight: 1, paddingTop: 5, height: 560, width: '100%'}}>*/}
        <JournalGrid columnDefs ={journalColumnsDefs(t, locale??'fr-FR', currency??'EUR')} defaultColDef ={{...defaultColDefX, filter:true}}
                     onRowSelected={onRowSelected} rowData={rowData}/>
      </div>
    </div>
  )
}
export default Journal

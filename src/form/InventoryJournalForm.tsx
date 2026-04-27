import  {useEffect, useState} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry, PinnedRowModule} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {JournalFormHead} from './JournalFormHead'
import { InventoryJournalMainForm }  from './InventoryJournalMainForm'
import iwsStore from '../utils/Store'
import {inventoryJournalColumnsDefs} from '../ColumnsDefs.ts'
import {IArticle, InventoryJournal, IStore} from '../Models.ts'
import {defaultColDefX, InventoryJournalGrid} from '../IWSGrid.tsx'
import Login from './Login.tsx'
import {useDispatch} from 'react-redux'
import {logout} from '../utils/FormUtils.tsx'
import {generateDocx} from '../utils/XlsUtils.ts'
import useForm from './UseForm.ts'
import {Get} from "./CrudController.ts";
import {MASTERFILE} from "./Menu.tsx";
import {formEnum} from "../utils/FormEnum.tsx";
import useArticleAccountForm from "./UseArticleAccountForm.ts";

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  PinnedRowModule,
])

const InventoryJournalForm = () => {
  const [{ profile,  selected, t, title, language, handleLanguageChange, company, module_}] = useForm()
  const { token} = profile
  const  [{ rowData, current_, current, setCurrent, submitQuery, onRowSelected
    , templateName, styles}] = useArticleAccountForm<InventoryJournal>()
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const dispatch = useDispatch()
  const [, setIwsState] = useState(iwsStore.initialState)
  const [artData, setArtData] = useState<IArticle[]>([])
  const [storeData, setStoreData] = useState<IStore[]>([])
  const height = 20
  const art_ctx = `${MASTERFILE.article}/${formEnum.ARTICLE}/${company}`
  const store_ctx = `${MASTERFILE.store}/${formEnum.STORE}/${company}`

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    Get(art_ctx, token, formEnum.ARTICLE, setArtData)
    Get(store_ctx, token, formEnum.STORE, setStoreData)
    setCurrent(current_)
  }, [selected])

  console.log('current_', current_)

  const getData = () => {
    return []
  }

  return (
    <div  style={{...styles.inner}} >
      <JournalFormHead style={{...styles.inner2}} title={title} submitQuery={submitQuery} dispatch={dispatch}
                       logout ={logout}  balancesheet={false} t={t}
                       templateName={templateName}
                       current={ { ...current, id: `${current.fromPeriod}${current.toPeriod}`, modelid:current.modelid, company:company}}
                       getData={getData} submitPrintPreview = {generateDocx} language={language} handleLanguageChange={handleLanguageChange}
      />
      <InventoryJournalMainForm current={current} setCurrent={setCurrent} t={t} artData={artData} storeData ={storeData} height={height}
        // @ts-ignore
                       stylesx={{height: 950, paddingBottom: 5}} />
      <div  style={{paddingLeft: 1, paddingRight: 1, paddingTop: 15, height: 560, width: 1500}}>
        <InventoryJournalGrid columnDefs ={inventoryJournalColumnsDefs(t)} defaultColDef ={{...defaultColDefX, filter:true}}
                     onRowSelected={onRowSelected} rowData={rowData}/>
      </div>
    </div>
  )
}
export default InventoryJournalForm

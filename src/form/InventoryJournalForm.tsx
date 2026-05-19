import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry, PinnedRowModule} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {JournalFormHead} from './JournalFormHead'
import { InventoryJournalMainForm }  from './InventoryJournalMainForm'
import {inventoryJournalColumnsDefs} from '../ColumnsDefs.ts'
import {InventoryJournal} from '../Models.ts'
import {defaultColDefX, InventoryJournalGrid} from '../IWSGrid.tsx'
import Login from './Login.tsx'
import {useDispatch} from 'react-redux'
import {logout} from '../utils/FormUtils.tsx'
import {generateDocx} from '../utils/XlsUtils.ts'
import useForm from './UseForm.ts'
import useArticleAccountForm from "./UseArticleAccountForm.ts";


ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  PinnedRowModule,
])

const InventoryJournalForm = () => {
  const [{ t, title, language, handleLanguageChange, company, module_}] = useForm()
  //const { token} = profile
  const  [{ rowData, current_, current, setCurrent, submitQuery, onRowSelected, articleData, storeData
    , templateName, styles}] = useArticleAccountForm<InventoryJournal>()
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const dispatch = useDispatch()
  // const [articleData, setArticleData] = useState<IArticle[]>([])
  // const [storeData, setStoreData] = useState<IStore[]>([])
  const height = 20
  // const art_ctx = `${MASTERFILE.article}/${formEnum.ARTICLE}/${company}`
  // const store_ctx = `${MASTERFILE.store}/${formEnum.STORE}/${company}`

  // useEffect(() => {
  //     Get(art_ctx, token, formEnum.ARTICLE, setArticleData)
  //     Get(store_ctx, token, formEnum.STORE, setStoreData)
  //     //setCurrent(current_)
  //
  // }, [])


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
      <InventoryJournalMainForm current={current} setCurrent={setCurrent} t={t} artData={articleData} storeData ={storeData} height={height}
        // @ts-ignore
                       stylesx={{height: 950, paddingBottom: 5}} />
      <div  style={{paddingLeft: 1, paddingRight: 1, paddingTop: 10, height: 560, width: "100%"}}>
        <InventoryJournalGrid columnDefs ={inventoryJournalColumnsDefs(t)} defaultColDef ={{...defaultColDefX, filter:true}}
                     onRowSelected={onRowSelected} rowData={rowData}/>
      </div>
    </div>
  )
}
export default InventoryJournalForm

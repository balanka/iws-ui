import React, {useState, useEffect} from 'react'
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'
//import { ExcelExportModule, MasterDetailModule, MultiFilterModule, SetFilterModule } from 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
import { styles as stylesx } from './BasicTreeTableProps'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {CommonFormHead, AssetMainForm} from './FormsProps'
import {Add, Edit,  Get} from './CrudController'
import {initAsset, MASTERFILE, useStore} from './Menu'
import iwsStore from '../utils/Store'
import { useTranslation } from 'react-i18next'
import { formEnum } from '../utils/FormEnum'
import {assetColumnDefs} from '../ColumnsDefs.ts'
import {IAccount, IAsset} from '../Models.ts'
import {AssetGrid} from '../IWSGrid.tsx'
import Login from './Login'
import {logout} from "./TransactionLib.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
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
    paddingLeft: 10,
    paddingRight: 14,
    //height: 350,
    paddingTop: 30,
    paddingBottom: 3,
  },
  header: {
    borderRadius: 5,
    //boxShadow: '0 10px 30px #BBB',
    padding: 1,
    height: 40,
    paddingTop: 1,
    paddingBottom: 1,
  },
}
const AssetForm = () => {
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
  module_ =  module_ ?? formEnum.LOGIN
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const title =  company?.concat(' / ').concat(t(module_.title))
  const [state, setState] = useState({ collapse: true, fadeIn: true, timeout: 300 })
  const [disable, setDisable] = useState(true)
  const height = 33

  const modelid :number = module_? module_.modelid:1111
  const acc_modelid = formEnum.ACCOUNT
  const ctx = `${MASTERFILE.asset}/${modelid}/${company}`
  const modifyUrl = MASTERFILE.asset
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const current_: IAsset = initAsset[0]
  const [current, setCurrent] = useState<IAsset>(current_)
  const [edited, setEdited] = useState<boolean|undefined>(false)
  const [added, setAdded] = useState<boolean|undefined>(undefined)
  const [, setIwsState] = useState(iwsStore.initialState)
  const toggle = () => setState({ ...state, collapse: !state.collapse })
  const [accData, setAccData] = useState<IAccount[]>([])
  const [rowData, setRowData] = useState<IAsset[]>([])
  const minHeight = 350
  const maxHeight = 700

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    !acc_ctx.includes('-1')&&Get(acc_ctx, token, acc_modelid, setAccData)
    //Get(ctx, token, modelid, setRowData)
     setCurrent(current_)
  }, [])

  const handleLanguageChange = (event:any) => {
    event.preventDefault()
    const value = event.target.value
    setLanguage(value)
    i18n.changeLanguage(value)
  }

  const edit = () => {
    console.log('edit called!!!')
    if(edited) {
      setEdited(false )
      setDisable(true)
      setAdded(false)
    } else {
      setEdited(true)
      setDisable(false)
      setAdded(true)
    }
  }
  const submitEdit = (event:any) => {
    event.preventDefault()
    if(edited) {
      Edit(modifyUrl, token, { ...current }, rowData, setCurrent)
    } else if (!edited && !disable) {
      Add(modifyUrl, token, { ...current }, rowData, setCurrent)
    }
    setDisable(true)
    setEdited(false)
    setAdded(true)
  }
  const cancelEdit = () => {
    if(edited) {
      setEdited(false)
      setDisable(true)
      setAdded(true)
    }
  }

  const initAdd = () => {
    const newRow:IAsset = { ...current_, company: company, currency: currencyx}
    setCurrent(newRow)
    setAdded(true)
    setEdited(false)
    setDisable(false)
  }


  const reload = () => {
    iwsStore.deleteKey(current.modelid)
    Get(ctx, token, modelid, setRowData)
    Get(acc_ctx, token, acc_modelid, setAccData)
    setCurrent(current_)
  }

  const submitQuery = (event:any) => {
    event.preventDefault()
    Get(acc_ctx, token, acc_modelid, setAccData)
    Get(ctx, token, modelid, setRowData)
  }
  const onRowSelected = (event: RowSelectedEvent) =>
        setCurrent((event.data instanceof Array)?event.data[0]:event.data)

  // @ts-ignore
  return (
    <div style={{paddingTop: 15}}>
      <Grid container spacing={10} style={{...STYLES.inner}} direction="row">
          <CommonFormHead
              title={title}
              collapse={state.collapse}
              initAdd={initAdd}
              edited={edited??false}
              added={added?? added ===undefined}
              disable={disable}
              edit={edit}
              cancelEdit={cancelEdit}
              submitEdit={submitEdit}
              submitQuery={submitQuery}
              reload={reload}
              toggle={toggle}
              logout={logout}
              navigate={navigate}
              language={language}
              handleLanguageChange={handleLanguageChange}
              dispatch={dispatch}
          />
          <Grid container style={{...STYLES.inner, display: !state.collapse?'none':''}} maximize direction="row" zeroMinWidth>
            <AssetMainForm current={current} setCurrent={setCurrent} disable={disable} t={t}
                                 accData ={accData} height={height} locale ={localex} currency ={currencyx} zIndex={9999}/>
         </Grid>
        <Grid container
            // @ts-ignore
              style={{...stylesx.outer, height:state.collapse?minHeight:maxHeight, paddingTop: 30}} maximize direction="column" >
          <AssetGrid
              // @ts-ignore
              theme="legacy" columnDefs ={assetColumnDefs(t)}  onRowSelected={onRowSelected} rowData ={rowData}/>
        </Grid>
      </Grid>

    </div>

  )
}
export default AssetForm
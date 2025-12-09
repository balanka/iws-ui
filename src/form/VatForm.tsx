import React, {useState, useEffect} from 'react'
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'
//import { ExcelExportModule, MasterDetailModule, MultiFilterModule, SetFilterModule } from 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
import { styles as stylesx } from './BasicTreeTableProps.tsx'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { CommonFormHead } from './FormsProps.tsx'
import {Add, Edit, Get, Get1} from './CrudController.ts'
import {initVat, MASTERFILE, useStore} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import { useTranslation } from 'react-i18next'
import { VatMainForm } from './FormsProps.tsx'
import { formEnum } from '../utils/FormEnum.tsx'
import {IVat} from '../Models.ts'
import {VatGrid} from '../IWSGrid.tsx'
import {vatColumnDefs} from '../ColumnsDefs'
import Login from './Login'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from '../utils/FormUtils.tsx'


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
    paddingRight: 10,
    paddingTop: 10,
  }
}
const VatForm = () => {
  const { profile, menu, selected } = useStore()
  const { t, i18n} = useTranslation()
  const { token, company } = profile
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [language, setLanguage] = useState('en-US')
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  const modelid:number = module_? module_.modelid:1111
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const [state, setState] = useState({ collapse: true, fadeIn: true, timeout: 300 })
  const [disable, setDisable] = useState(true)
  const height = 20
  const initialState:IVat  = initVat[0]
  const current_ :IVat = initialState
  const title = company?.concat(' / ').concat(t(module_.title))
  const [current, setCurrent] = useState<IVat>(current_)
  const [edited, setEdited] = useState<boolean|undefined>(false)
  const [added, setAdded] = useState<boolean|undefined>(undefined)
  const [, setIwsState] = useState(iwsStore.initialState)

  const toggle = () => setState({ ...state, collapse: !state.collapse })
  const acc_modelid = formEnum.ACCOUNT
  const ctx = `${MASTERFILE.vat}/${modelid}/${company}`
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const modifyUrl = module_.ctx //selected
  const [rowData, setRowData] = useState<IVat[]>([])
  const [accData, setAccData] = useState([])
  const minHeight = 300
  const maxHeight = 600
  const zIndex = 9999

  const handleLanguageChange = (event:any) => {
    event.preventDefault()
    const value = event.target.value
    setLanguage(value)
    i18n.changeLanguage(value)
  }
  useEffect(() => {
    iwsStore.subscribe(setIwsState)
      Get(ctx, token, modelid, setRowData)
      Get(acc_ctx, token, acc_modelid, setAccData)
  }, [])

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
    const newRow = { ...current_, company: company}
    setCurrent(newRow)
    setAdded(true)
    setEdited(false)
    setDisable(false)
  }
  const reload = () => {
    iwsStore.deleteKey(current.modelid)
    const url_ = modifyUrl?.concat('/').concat(current.modelid)
    url_ && Get1(url_, token, current.modelid)
    setCurrent(current_)
  }

  const submitQuery = (event: any) => {
    event.preventDefault()
    Get(ctx, token, modelid, setRowData)
    Get(acc_ctx, token, acc_modelid, setAccData)
  }
  const onRowSelected = (event: RowSelectedEvent) => setCurrent(event.data)


  return (<>
          <CommonFormHead
              title={title}
              collapse={state.collapse}
              initAdd={initAdd}
              edited={edited??false}
              added={added?? added ===undefined}
              disable={disable??true}
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
          <Grid container style={{...STYLES.inner, height:state.collapse?minHeight:maxHeight
                                   , display: !state.collapse?'none':''}} maximize direction="row" zeroMinWidth>
              <VatMainForm current={current} setCurrent={setCurrent}
                           disable={disable} t={t} accData ={accData} height={height} zIndex={zIndex}/>
          </Grid>
          <Grid container
              // @ts-ignore
                style={{...stylesx.outer, height:250, paddingTop: 10}} maximize direction="column">
            <VatGrid
                // @ts-ignore
                theme="legacy" columnDefs ={vatColumnDefs(t)}  onRowSelected={onRowSelected}
                     rowData ={rowData} />
          </Grid>
    </>
  )
}
export default VatForm

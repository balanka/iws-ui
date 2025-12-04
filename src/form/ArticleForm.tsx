import React, {useState, useEffect} from 'react'
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
import { styles as stylesx } from './BasicTreeTableProps'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { CommonFormHead } from './FormsProps'
import {Add, Edit} from './CrudController'
import {initArticle, MASTERFILE, useStore} from './Menu'
import iwsStore from '../utils/Store'
import { useTranslation } from 'react-i18next'
import  { ArticleTabs }  from './ArticleTabs.tsx'
import { formEnum } from '../utils/FormEnum'
import { Get } from './CrudController.ts'
import {articleColumnDefs} from '../ColumnsDefs.ts'
import {IAccount, IArticle, IMasterfile, IVat} from '../Models.ts'
import {ArticleGrid} from '../IWSGrid.tsx'
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

 const ArticleForm = () => {
     const {profile, menu, selected} = useStore()
     const {t, i18n} = useTranslation()
     const {token, company, locale, currency} = profile
     const dispatch = useDispatch()
     let navigate = useNavigate()
     const [language, setLanguage] = useState('en-US')
     let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
     //module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
     module_ =  module_ ?? formEnum.LOGIN
     if (module_ === '11111' || module_ === 11111) return <Login/>
     let title = company?.concat(' / ').concat(t(module_.title))
     const [state, setState] = useState({collapse: true, fadeIn: true, timeout: 300})
     const [disable, setDisable] = useState(true)
     const height = 20
     const initialState = initArticle[0]
     const modelid: number = initialState.modelid //module_? module_.modelid:1111
     const acc_modelid = formEnum.ACCOUNT
     const vat_modelid = formEnum.VAT
     const qttyUnit_modelid = formEnum.QUANTITYUNIT
     const group_modelid = formEnum.ARTICLE_GROUP
     const ctx = `${MASTERFILE.article}/${modelid}/${company}`
     const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
     const vat_ctx = `${MASTERFILE.vat}/${vat_modelid}/${company}`
     const qttyUnit_ctx = `${MASTERFILE.masterfile}/${qttyUnit_modelid}/${company}`
     const group_ctx = `${MASTERFILE.masterfile}/${group_modelid}/${company}`
     const modifyUrl = MASTERFILE.article //selected
     const zIndex = 9999
     const current_: IArticle = initialState
     const [current, setCurrent] = useState<IArticle>(current_)
     const [edited, setEdited] = useState<boolean|undefined>(false)
     const [added, setAdded] = useState<boolean|undefined>(undefined)
     const [, setIwsState] = useState(iwsStore.initialState)
     const toggle = () => setState({...state, collapse: !state.collapse})
     const [accData, setAccData] = useState<IAccount[]>([])
     const [rowData, setRowData] = useState<IArticle[]>([])
     const [groupData, setGroupData] = useState<IMasterfile[]>([])
     const [quantityUnitData, setQuantityUnitData] = useState<IMasterfile[]>([])
     const [vatData, setVatData] = useState<IVat[]>([])

     useEffect(() => {
         iwsStore.subscribe(setIwsState)
         Get(acc_ctx, token??'noToken', acc_modelid, setAccData)
         Get(group_ctx, token??'noToken', group_modelid, setGroupData)
         Get(qttyUnit_ctx, token??'noToken', qttyUnit_modelid, setQuantityUnitData)
         Get(vat_ctx, token??'noToken', vat_modelid, setVatData)
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
         const newRow = { ...current_, company:`${company}`, currency: `${currency}`, stocks:[]}
         setCurrent(newRow)
         setAdded(true)
         setEdited(false)
         setDisable(false)
     }

     const reload = () => {
         iwsStore.deleteKey(current.modelid)
         console.log('Get ', iwsStore.get(current.modelid))
         Get(ctx, token??'noToken', current.modelid, setRowData)
         setCurrent(current_)
     }
     const load = (event: any) => {
         event.preventDefault()
         Get(acc_ctx, token??'noToken', acc_modelid, setAccData)
         Get(qttyUnit_ctx, token??'noToken', qttyUnit_modelid, setQuantityUnitData)
         Get(vat_ctx, token??'noToken', vat_modelid, setVatData)
         ctx && Get(ctx, token??'noToken', modelid, setRowData)
         setCurrent(current_)
     }
     const onRowSelected = (event: RowSelectedEvent) =>
              setCurrent((event.data instanceof Array) ? event.data[0] : event.data)
     return (<>
             <CommonFormHead
                 title={title}
                 collapse={state.collapse}
                 initAdd={initAdd}
                 edited={edited??false}
                 added={added?? added ===undefined}
                 edit={edit}
                 disable={disable??true}
                 cancelEdit={cancelEdit}
                 submitEdit={submitEdit}
                 submitQuery={load}
                 reload={reload}
                 toggle={toggle}
                 logout={logout}
                 navigate={navigate}
                 language={language}
                 handleLanguageChange={handleLanguageChange}
                 dispatch={dispatch}
             />
             <Grid container style={{...stylesx.innerX, display: !state.collapse?'none':''}} maximize direction="row" zeroMinWidth>
                 <ArticleTabs current={current} setCurrent={setCurrent} disable={disable} t={t} data ={rowData}
                              accData={accData} quantityUnitData ={quantityUnitData} locale={`${locale}`} currency={`${currency}`}
                              vatData={vatData} groupData={groupData} height={height} zIndex={zIndex-1}/>
             </Grid>
             <Grid container
                 // @ts-ignore
                   style={{...stylesx.outer, height: 300, paddingTop: 10}} maximize direction="column">
                 <ArticleGrid columnDefs={articleColumnDefs(t)} onRowSelected={onRowSelected} rowData={rowData}/>
             </Grid>
         </>
     )
}
export default  ArticleForm

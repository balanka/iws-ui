import React, {useState, useEffect} from 'react'
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
import { styles as stylesx } from './BasicTreeTableProps.tsx'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { CommonFormHead } from './FormsProps.tsx'
import {Add, Edit, Get} from './CrudController.ts'
import {initAcc, MASTERFILE, useStore} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import { useTranslation } from 'react-i18next'
import { AccountMainForm } from './FormsProps.tsx'
import { formEnum } from '../utils/FormEnum.tsx'
import {accountColumnDefs} from '../ColumnsDefs.ts'
import {IAccount} from '../Models.ts'
import {AccountGrid,  defaultColDefX} from '../IWSGrid.tsx'
import Login from './Login'
import {logout} from '../utils/FormUtils.tsx'
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
 const AccountForm = () => {
     const {profile, menu, selected} = useStore()
     const {t, i18n} = useTranslation()
     const {token, company, currency, locale} = profile
     const dispatch = useDispatch()
     let navigate = useNavigate()
     const [language, setLanguage] = useState('en-US')
     let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
     //module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
     module_ =  module_ ?? formEnum.LOGIN
     if (module_ === '11111' || module_ === 11111) return <Login/>
     const title = company?.concat(' / ').concat(t(module_.title))
     const modelid: number = module_ ? module_.modelid : 1111
     const [state, setState] = useState({collapse: true, fadeIn: true, timeout: 300})
     const [disable, setDisable] = useState(true)
     const height = 33
     const current_: IAccount = initAcc[0]
     const [current, setCurrent] = useState<IAccount>(current_)
     const [edited, setEdited] = useState<boolean|undefined>(false)
     const [added, setAdded] = useState<boolean|undefined>(undefined)
     const [setIwsState] = useState(iwsStore.initialState)
     const toggle = () => setState({...state, collapse: !state.collapse})
     const ctx = `${MASTERFILE.acc}/${modelid}/${company}`
     const modifyUrl = MASTERFILE.acc
     const [rowData, setRowData] = useState<IAccount[]>([])

     useEffect(() => {
         iwsStore.subscribe(setIwsState)
         Get(ctx, token??'noToken', modelid, setRowData)
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
         const newRow = { ...current_, company: `${company}`, currency: `${currency}`}
         setCurrent(newRow)
         setAdded(true)
         setEdited(false)
         setDisable(false)
     }

     const reload = () => {
         iwsStore.deleteKey(current.modelid)
         Get(ctx, token??'noToken', current.modelid, setRowData)
         setCurrent(current_)
     }

     const submitQuery = (event: any) => {
         event.preventDefault()
         Get(ctx, token??'noToken', modelid, setRowData)
     }
     const onRowSelected = (event: RowSelectedEvent<IAccount[], any>) =>
         setCurrent((event.data instanceof Array) ? event.data[0] : event.data)

     return (<>
             <CommonFormHead
                 //styles={{paddingTop: 10, paddingBottom: 5}}
                 title={title}
                 collapse={state.collapse}
                 initAdd={initAdd}
                 edited={edited??false}
                 added={added?? added ===undefined}
                 edit={edit}
                 disable={disable??true}
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
             {/*<Grid container style={{...stylesx.inner, display: !state.collapse?'none':''}} maximize direction="row" zeroMinWidth>*/}
                 <AccountMainForm  collapse={state.collapse} current={current}
                                  setCurrent={setCurrent}
                                  disable={disable}
                                  t={t}
                                  locale={`${locale}`}
                                  accData={rowData}
                                  height={height}/>
             {/*</Grid>*/}
             <Grid container
                 // @ts-ignore
                   style={{...stylesx.outer, height: 400, paddingTop: 10}} maximize direction="column">
                 <AccountGrid columnDefs={accountColumnDefs(t)} onRowSelected={onRowSelected}
                              defaultColDef={{...defaultColDefX, filter:true}}
                              rowData={rowData}/>
             </Grid>
         </>
     )
}
export default AccountForm

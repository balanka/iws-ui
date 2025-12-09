import React, {useState, useEffect} from 'react'
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
import { styles as stylesx } from './BasicTreeTableProps'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { CommonFormHead } from './FormsProps'
import {Add, Edit, Get, Get1} from './CrudController.ts'
import {initStore, MASTERFILE,  useStore} from './Menu'
import iwsStore from '../utils/Store'
import { useTranslation } from 'react-i18next'
import  { StoreTabs }  from './StoreTabs.tsx'
import { formEnum } from '../utils/FormEnum'
import {storeColumnDefs} from '../ColumnsDefs.ts'
import {IAccount, IStore} from '../Models.ts'
import { StoreGrid} from '../IWSGrid.tsx'
import Login from "./Login.tsx";
import {logout} from '../utils/FormUtils.tsx'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])
 const StoreForm= () => {
     const {profile, menu, selected} = useStore()
     const {t, i18n} = useTranslation()
     const {token, company, locale} = profile
     const localex= locale??'fr-FR'
     const dispatch = useDispatch()
     let navigate = useNavigate()
     const [language, setLanguage] = useState('en-US')
     let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
     module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
     const modelid = module_ ? module_.modelid : 1111
     if (module_ === '11111' || module_ === 11111) return <Login/>
     let title = company?.concat(' / ').concat(t(module_.title))
     const [state, setState] = useState({collapse: true, fadeIn: true, timeout: 300})
     const [disable, setDisable] = useState(true)
     const current_: IStore = initStore[0]
     const [current, setCurrent] = useState(current_)
     const [, setIwsState] = useState(iwsStore.initialState)
     const [edited, setEdited] = useState<boolean|undefined>(false)
     const [added, setAdded] = useState<boolean|undefined>(undefined)
     const toggle = () => setState({...state, collapse: !state.collapse})
     const [accData, setAccData] = useState<IAccount[]>([])
     const [rowData, setRowData] = useState<IStore[]>([])
     const acc_modelid = formEnum.ACCOUNT
     const ctx = `${selected}/${modelid}/${company}`
     const modifyUrl = selected
     const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
     const zIndex = 9999
     const height= 20
     useEffect(() => {
         iwsStore.subscribe(setIwsState)
         Get(ctx, token, modelid, setRowData)
         Get(acc_ctx, token, acc_modelid, setAccData)
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
         const newRow = {...current_, company: company, stocks:[]}
         setCurrent(newRow)
         setAdded(true)
         setEdited(false)
         setDisable(false)
     }

     const reload = () => {
         iwsStore.deleteKey(current.modelid)
         Get1(ctx, token, current.modelid)
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

             <Grid container
                 // @ts-ignore
                   style={{...stylesx.outer, padding: 5, display: !state.collapse?'none':''}} maximize direction="column">
                 <StoreTabs collapse = {state.collapse} current={current} setCurrent={setCurrent} disable={disable} t={t} zIndex={zIndex-1}
                            accData={accData} locale={localex}  height={height} />
             </Grid>
             <Grid container
                 // @ts-ignore
                   style={{...stylesx.outer, height: 250, paddingTop: 20}} maximize direction="column">
                 <StoreGrid columnDefs={storeColumnDefs(t)} onRowSelected={onRowSelected} rowData={rowData}/>
             </Grid>
         </>
     )
}
export default StoreForm

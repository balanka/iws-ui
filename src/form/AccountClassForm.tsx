import React, {useState, useEffect} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry} from 'ag-grid-community'
//import { ExcelExportModule, MasterDetailModule, MultiFilterModule, SetFilterModule } from 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {CommonFormHead, MasterfilesMainForm2} from './FormsProps'
import {Add, Edit, Get} from './CrudController'
import {initAcc, MASTERFILE, useStore} from './Menu'
import iwsStore from '../utils/Store'
import { useTranslation } from 'react-i18next'
import { formEnum } from '../utils/FormEnum'
import {masterfileColumnDefs} from '../ColumnsDefs.ts'
import {IAccount, IMasterfile2} from '../Models.ts'
import {MasterfileGrid} from '../IWSGrid'
import Login from './Login'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "./TransactionLib.ts";


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
    paddingLeft: 25,
    paddingRight: 20,
    //height: 350,
    paddingTop: 30,
  }
}

 const AccountClassForm = () => {
     const {profile, menu, selected} = useStore()
     const {t, i18n} = useTranslation()
     const {token, company} = profile
     const dispatch = useDispatch()
     let navigate = useNavigate()
     const [language, setLanguage] = useState('en-US')
     console.log('selected>>>', selected)
     let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
     //module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
     module_ =  module_ ?? formEnum.LOGIN
     if (module_ === '11111' || module_ === 11111) return <Login/>
     const title =  company?.concat(' / ').concat(t(module_.title))
     const [state, setState] = useState({collapse: true, fadeIn: true, timeout: 300})
     const [disable, setDisable] = useState(true)
     //const height = 20

     const modelid: number = module_ ? module_.modelid : 1111
     console.log('modelid', modelid)
     const acc_modelid  = formEnum.ACCOUNT
     const acc_ctx = `${modelid === formEnum.COSTCENTER ?  MASTERFILE.acc:-1}/${acc_modelid}/${company}`
     console.log('acc_ctx', acc_ctx)
     const ctx = `${modelid === formEnum.PAYROLL_TAX_RANGE ? MASTERFILE.payrollTaxRange : MASTERFILE.masterfile}/${modelid}/${company}`
     const modifyUrl = MASTERFILE.masterfile
     console.log('module_', module_)
     console.log('initialState', module_.state[0])
     const current_: IMasterfile2 =  module_.state[0]
     const [current, setCurrent] = useState<IMasterfile2>(current_)
     const [edited, setEdited] = useState<boolean|undefined>(false)
     const [added, setAdded] = useState<boolean|undefined>(undefined)
     const [iwsState, setIwsState] = useState(iwsStore.initialState)
     const toggle = () => setState({...state, collapse: !state.collapse})
     const [rowData, setRowData] = useState<IMasterfile2[]>([])
     const [accData, setAccData] = useState<IAccount[]>(initAcc)
     const minHeight = 400
     const maxHeight = 700
     //const [error_acc, isloading_acc, accData] = useGet<IAccount>(acc_ctx, token, initAcc) //useState<IAccount[]>(initAcc)
      console.log('accData>>', accData)
     useEffect(() => {
         iwsStore.subscribe(setIwsState)
         !acc_ctx.includes('-1')&&Get(acc_ctx, token??'noToken', acc_modelid, setAccData)
         setCurrent(current_)
         //setRowData([])
     }, [current_])
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
         const newRow = {...current_, company: company}
         setCurrent(newRow)
         setAdded(true)
         setEdited(false)
         setDisable(false)
     }

     const reload = () => {
         if (current.modelid===formEnum.MODULE) return
         iwsStore.deleteKey(current.modelid)
         Get(ctx, token??'noToken', current.modelid, setRowData)
         //Get(acc_ctx, token, acc_modelid, setAccData)
         setCurrent(current_)
     }

     const submitQuery = (event: any) => {
         event.preventDefault()
         Get(ctx, token??'noToken', modelid, setRowData)
         setCurrent(current_)
     }
     const onRowSelected = (event: RowSelectedEvent) =>
           setCurrent((event.data instanceof Array) ? event.data[0] : event.data)

     const styles = {
         outer: {
             borderRadius: 5,
             boxShadow: "0 30px 40px #BBB",
             padding: 4,
         },
     }
     return (
         <Grid container spacing={10} style={{...STYLES.inner}} direction="column">
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
                 submitQuery={submitQuery}
                 reload={reload}
                 toggle={toggle}
                 logout={logout}
                 navigate={navigate}
                 language={language}
                 handleLanguageChange={handleLanguageChange}
                 dispatch={dispatch}
             />
             <MasterfilesMainForm2 collapse ={state.collapse} current={current} setCurrent={setCurrent} disable={disable} t={t} height={0}
                                       accData={ iwsState.get(formEnum.ACCOUNT) ?? accData}/>
                 <Grid item style={{...styles.outer, paddingTop:15, height: state.collapse?minHeight:maxHeight}}>
                     <MasterfileGrid
                         // @ts-ignore
                         theme="legacy" columnDefs={masterfileColumnDefs(t)} onRowSelected={onRowSelected}
                         rowData={rowData}/>
                 </Grid>
         </Grid>
     )
}
export default  AccountClassForm

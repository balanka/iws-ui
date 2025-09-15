import React, {useState, useEffect, FC} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {CommonFormHead, MasterfileMainForm, MasterfilesMainForm2, PermissionMainForm} from './FormsProps'
import {Add, Edit, Get} from './CrudController'
import {MASTERFILE, useStore} from './Menu'
import iwsStore from '../utils/Store'
import { useTranslation } from 'react-i18next'
import { formEnum } from '../utils/FormEnum'
import {masterfileColumnDefs, permissionColumnDefs, userColumnDefs} from '../ColumnsDefs.ts'
import {IMasterfile, IMasterfile2, IPermission, IRole} from '../Models.ts'
import {MasterfileGrid} from '../IWSGrid'
import Login from './Login'
import {TFunction} from "i18next";
import {Masterfile2FormProps} from "../Props.ts";
import RoleTabs from "./RoleTabs.tsx";
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


const getCtx = (modelid:number, company:string ) => {
    switch (modelid) {
        case formEnum.PAYROLL_TAX_RANGE:
            return `${MASTERFILE.payrollTaxRange}/${modelid}/${company}`
        case formEnum.PERMISSION:
            return `${MASTERFILE.perm}/${modelid}/${company}`
        case formEnum.ROLE:
            return `${MASTERFILE.role}/${modelid}/${company}`
        default:
            return `${MASTERFILE.masterfile}/${modelid}/${company}`
    }
}
 const getColumns = (modelid:number,  t:TFunction<'translation', undefined> ) => {
     switch (modelid) {
         case formEnum.PERMISSION:
             return permissionColumnDefs(t)
         case formEnum.USER:
             return userColumnDefs(t)
         default:
             return masterfileColumnDefs(t)
     }
 }

 const MasterfileForm = () => {
     const {profile, menu, selected} = useStore()
     const {t, i18n} = useTranslation()
     const {token, company} = profile
     console.log('selected>>>', selected)
     const dispatch = useDispatch()
     let navigate = useNavigate()
     const [language, setLanguage] = useState('en-US')
     console.log('menu', menu)
     let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
     console.log('module_X', module_)
     console.log('module_.state3', module_?.state3)
     const parent_ctx = `${module_?.state3}/${company}`
     console.log('parent_ctx', parent_ctx)
     module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
     console.log('module_', module_)
     if (module_ === '11111' || module_ === 11111) return <Login/>
     const title = company?.concat(' / ').concat(t(module_.title))
     const [state, setState] = useState({collapse: true, fadeIn: true, timeout: 300})
     const [disable, setDisable] = useState(true)
     const height = 20

     const modelid: number = module_ ? module_.modelid : 1111
     console.log('modelid', modelid)
     const acc_modelid  = formEnum.ACCOUNT
     const acc_ctx = `${modelid === formEnum.COSTCENTER ?  MASTERFILE.acc:-1}/${acc_modelid}/${company}`

     console.log('acc_ctx', acc_ctx)
     const ctx = getCtx(modelid, company)
     const modifyUrl = MASTERFILE.masterfile
     console.log('module_', module_)
     console.log('initialState', module_.state[0])
     const current_: IMasterfile2 =  module_.state[0]
     const current_2: IMasterfile =  module_.state[0]
     const current_3: IPermission =  module_.state[0]
     const current_4: IRole =  module_.state[0]
     const [current, setCurrent] = useState<IMasterfile2>(current_)
     const [current2, setCurrent2] = useState<IMasterfile>(current_2)
     const [current3, setCurrent3] = useState<IPermission>(current_3)
     const [current4, setCurrent4] = useState<IRole>(current_4)
     const [edited, setEdited] = useState<boolean|undefined>(false)
     const [added, setAdded] = useState<boolean|undefined>(undefined)
     const [, setIwsState] = useState(iwsStore.initialState)
     const toggle = () => setState({...state, collapse: !state.collapse})
     const [rowData, setRowData] = useState<IMasterfile2[]>([])
     const [accData, setAccData] = useState<IMasterfile2[]>([])

     const minHeight = 400
     const maxHeight = 700

     useEffect(() => {
         iwsStore.subscribe(setIwsState)
         Get(parent_ctx, token, module_.modelid, setAccData)
         setCurrent(current_)
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
         const newRow = { ...current_, company: company}
         setCurrent(newRow)
         setAdded(true)
         setDisable(false)
         setEdited(false)
     }

     const reload = () => {
         if (current.modelid===formEnum.MODULE ) {
             setRowData(iwsStore.get(400))
             return
         }
         iwsStore.deleteKey(current.modelid)
         Get(ctx, token, current.modelid, setRowData)
         setCurrent(current_)
     }

     const submitQuery = (event: any) => {
         event.preventDefault()
         Get(ctx, token, modelid, setRowData)
         setCurrent(current_)
     }
     const onRowSelected = (event: RowSelectedEvent) => {
         setCurrent((event.data instanceof Array) ? event.data[0] : event.data)
         setCurrent2((event.data instanceof Array) ? event.data[0] : event.data)
         setCurrent3((event.data instanceof Array) ? event.data[0] : event.data)
         setCurrent4((event.data instanceof Array) ? event.data[0] : event.data)
     }

     const MasterfileForm:FC<Masterfile2FormProps<IMasterfile2>> = (props:Masterfile2FormProps<IMasterfile2>) => {
         switch (props.current.modelid) {
             case formEnum.BANK:
             case formEnum.QUANTITYUNIT:
             {
                 const current = current2
                 const setCurrent = setCurrent2
                 const props1:Masterfile2FormProps<IMasterfile> = {...props, current, setCurrent}
                 return  MasterfileMainForm(props1)
             }
             case formEnum.PERMISSION:
             {
                 const current = current3
                 const setCurrent = setCurrent3
                 const props1:Masterfile2FormProps<IPermission> = {...props, current, setCurrent}
                 return  PermissionMainForm(props1)
             }
             case formEnum.ROLE:
             {
                 const current = current4
                 const setCurrent = setCurrent4
                 const props1:Masterfile2FormProps<IRole> = {...props, current, setCurrent}
                 return  RoleTabs(props1)
             }
             default:
                 return MasterfilesMainForm2(props)
         }
     }

     const styles = {
         outer: {
             borderRadius: 5,
             boxShadow: "0 30px 40px #BBB",
             padding: 4,
         },
     }
     const collapse=  state.collapse
     const props:Masterfile2FormProps<IMasterfile2> = { }
     console.log('current', current)
     console.log('rowData', rowData)
     //console.log('current', iwsStore.get(400))
     return (
         <>
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
             <MasterfileForm collapse={collapse} current={current} setCurrent={setCurrent} disable={disable}
                              height={height} accData={accData} t={t}/>
             <Grid item style={{...styles.outer, paddingTop:15, height: state.collapse?minHeight:maxHeight}}>
                 <MasterfileGrid
                         // @ts-ignore
                         theme="legacy" columnDefs={getColumns(modelid, t)} onRowSelected={onRowSelected}
                         rowData={rowData}/>
             </Grid>
         </>
     )
}
export default  MasterfileForm

import React, {useState, useEffect, FC} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {
  CommonFormHead, FModuleMainForm,
  MasterfileMainForm,
  MasterfilesMainForm2,
  PermissionMainForm
} from './FormsProps'
import {Add, Edit, Get} from './CrudController'
import {MASTERFILE} from './Menu'
import iwsStore from '../utils/Store'
import { formEnum } from '../utils/FormEnum'
import {fmoduleColumnDefs, masterfileColumnDefs, permissionColumnDefs, userColumnDefs} from '../ColumnsDefs.ts'
import {IFmodule, IMasterfile, IMasterfile2, IPermission, IRole} from '../Models.ts'
import {MasterfileGrid} from '../IWSGrid'
import Login from './Login'
import {TFunction} from "i18next";
import {Masterfile2FormProps} from "../Props.ts";
import RoleTabs from "./RoleTabs.tsx";
import {logout} from '../utils/FormUtils.tsx'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import useForm from "./UseForm.ts";


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])


const getCtx = (modelid:number, company:string ) => {
    switch (modelid) {
        case formEnum.PAYROLL_TAX_RANGE:
            return `${MASTERFILE.payrollTaxRange}/${modelid}/${company}`
        case formEnum.PERMISSION:
            return `${MASTERFILE.perm}/${modelid}/${company}`
        case formEnum.ROLE:
          return `${MASTERFILE.role}/${modelid}/${company}`
        case formEnum.ACCOUNT_CLASS:
           return `${MASTERFILE.masterfile}/${modelid}/${company}`
        case formEnum.FMODULE:
            return `${MASTERFILE.fmodule}/${modelid}/${company}`
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
       case formEnum.FMODULE:
         console.log('modelid', modelid)
           return fmoduleColumnDefs(t)
         default:
             return masterfileColumnDefs(t)
     }
 }

 const MasterfileForm = () => {
     const [{ profile, menu, selected, t, title:title, language, handleLanguageChange, state, toggle, modelid, company}]  = useForm()
     const {token} = profile
     const dispatch = useDispatch()
     let navigate = useNavigate()

     // console.log('menu', menu)
     let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
     const parent_ctx = `${module_?.state3}/${company}`
     const acc_ctx = `${module_?.state2}/${company}`
     console.log('parent_ctx', parent_ctx)
     module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
     console.log('module_', module_)
     if (module_ === '11111' || module_ === 11111) return <Login/>
     //const [state, setState] = useState({collapse: true, fadeIn: true, timeout: 300})
     const [disable, setDisable] = useState(true)
     const height = 20
     const ctx = getCtx(modelid, company)
     const modifyUrl = module_.ctx
     const current_: IMasterfile2 =  module_.state[0]
     const current_2: IMasterfile =  module_.state[0]
     const current_3: IPermission =  module_.state[0]
     const current_4: IRole =  module_.state[0]
     const current_5: IFmodule =  module_.state[0]
     const [current, setCurrent] = useState<IMasterfile2>(current_)
     const [current2, setCurrent2] = useState<IMasterfile>(current_2)
     const [current3, setCurrent3] = useState<IPermission>(current_3)
     const [current4, setCurrent4] = useState<IRole>(current_4)
     const [current5, setCurrent5] = useState<IFmodule>(current_5)
     const [edited, setEdited] = useState<boolean|undefined>(false)
     const [added, setAdded] = useState<boolean|undefined>(undefined)
     const [, setIwsState] = useState(iwsStore.initialState)
     const [rowData, setRowData] = useState<IMasterfile2[]>([])
     const [rowData2, ] = useState<IMasterfile[]>([])
     const [rowData3, ] = useState<IPermission[]>([])
     const [rowData4, ] = useState<IRole[]>([])
     const [rowData5, ] = useState<IFmodule[]>([])
     const [accData, setAccData] = useState<IMasterfile2[]>([])
     const [accountData, setAccountData] = useState<IMasterfile2[]>([])
     const minHeight = 400
     const maxHeight = 700
     useEffect(() => {
         iwsStore.subscribe(setIwsState)
         Get(parent_ctx, token, module_.modelid, setAccData)
         Get(acc_ctx, token, formEnum.ACCOUNT, setAccountData)
         setCurrent(current_)
     }, [current_])

     const edit = () => {
         console.log('edit called!!!', current)
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
             Edit(modifyUrl, token, { ...getCurrent() }, getRowData(), setCurrent)
         } else if (!edited && !disable) {
             Add(modifyUrl, token, {...getCurrent()}, getRowData(), currentSetter)
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
         const setter: (arg:any)=>void = currentSetter()
         setter(newRow)
         setAdded(true)
         setDisable(false)
         setEdited(false)
     }

     const reload = () => {
         if (current.modelid===formEnum.MODULE ) {
             setRowData(iwsStore.get(formEnum.MODULE))
             return
         }
         iwsStore.deleteKey(modelid)
         Get(ctx, token, modelid, setRowData)
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
         setCurrent5((event.data instanceof Array) ? event.data[0] : event.data)
     }
     const getRowData  = () => {
       switch (modelid) {
         case formEnum.BANK:
         case formEnum.CURRENCY:
         case formEnum.QUANTITYUNIT:
           return  rowData2
         case formEnum.PERMISSION:
           return  rowData4
         case formEnum.ROLE:
           return  rowData3
         case formEnum.FMODULE:
           return  rowData5
         default:
           return rowData
      }
    }

   const getCurrent  = () => {
     switch (modelid) {
       case formEnum.BANK:
       case formEnum.CURRENCY:
       case formEnum.QUANTITYUNIT:
         return  current2
       case formEnum.PERMISSION:
         return  current4
       case formEnum.ROLE:
         return  current3
       case formEnum.FMODULE:
         return  current5
       default:
         return current
     }
   }
   const currentSetter: ()=>( arg:any)=>void  = () => {
     switch (modelid) {
       case formEnum.BANK:
       case formEnum.CURRENCY:
       case formEnum.QUANTITYUNIT:
         return  setCurrent2
       case formEnum.PERMISSION:
         return  setCurrent4
       case formEnum.ROLE:
         return  setCurrent3
       case formEnum.FMODULE:
         return  setCurrent5
       default:
         return setCurrent
     }
   }
     const MasterfileForm:FC<Masterfile2FormProps<IMasterfile2>> = (props:Masterfile2FormProps<IMasterfile2>) => {
         switch (props.current.modelid) {
             case formEnum.BANK:
           case formEnum.CURRENCY:
             case formEnum.QUANTITYUNIT:
                 return  <MasterfileMainForm collapse={collapse} current={current2} setCurrent={setCurrent2}
                                             disable={disable} t={t}  height={height} />
             case formEnum.PERMISSION:
                 return  <PermissionMainForm collapse={collapse} current={current3} setCurrent={setCurrent3}
               disable={disable} t={t}  height={height} />
             case formEnum.ROLE:
                 return  <RoleTabs  collapse={collapse} current={current4} setCurrent={setCurrent4}
               disable={disable} t={t}  height={height} />
             case formEnum.FMODULE:
                return  <FModuleMainForm collapse={collapse} current={current5} setCurrent={setCurrent5}
                                      disable={disable} t={t} accData={accData} accountData={accountData}
                                         rowData={rowData} height={height} />
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
                 <MasterfileGrid columnDefs={getColumns(modelid, t)} onRowSelected={onRowSelected} rowData={rowData}/>
             </Grid>
         </>
     )
}
export default  MasterfileForm

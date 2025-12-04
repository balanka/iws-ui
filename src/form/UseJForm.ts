import {Dispatch, SetStateAction, useState} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry, PinnedRowModule} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {Get} from './CrudController'
import { MASTERFILE, PACB_QUERY_PARM, useStore} from './Menu'


import {formEnum} from '../utils/FormEnum'

import {
  IAccount,
  IPACBQueryParam,
  IProfile,
} from '../Models.ts'
import {useTranslation} from "react-i18next";
import {TFunction} from "i18next";


ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  //RowGroupingModule,
  PinnedRowModule,
  // ExcelExportModule,
  // SetFilterModule,
  // MultiFilterModule,
  // MasterDetailModule,
])

interface UseJFormProps<T> {
  accData: IAccount[],
  setAccData: Dispatch<SetStateAction<IAccount[]>>,
  setRowData: Dispatch<SetStateAction<T[]>>
}

interface UseJFormResult {
  profile: IProfile,
  menu: Map<any, any>,
  selected: string
  t:TFunction<'translation', undefined>,
  module_ctx:string,
  acc_ctx:string,
  current_:IPACBQueryParam,
  current:IPACBQueryParam,
  setCurrent:Dispatch<SetStateAction<IPACBQueryParam>>
  submitQuery: (event: any, current: IPACBQueryParam) => void,
  submitQuery2: (event: any, current: IPACBQueryParam) => void,
  onRowSelected: (event: RowSelectedEvent) => void
  //, format:(arg:T)=>any
  // , templateName: ()=>string
  // , rowData:T[]
  // , setRowData:Dispatch<SetStateAction<T[]>>
  // , accData:IAccount[]
}

const UseJForm = <T>(useJFormProps: UseJFormProps<T>): [UseJFormResult] => {
  // @ts-ignore
  const {accData, setAccData, setRowData} = useJFormProps
  const {profile, menu, selected} = useStore()
  const {token, currency, company} = profile
  const {t,} = useTranslation()
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  //if (module_ === '11111' || module_ === 11111) return <Login/>

  const modelid: number = module_ ? module_.modelid : 1111
  const acc_modelid = formEnum.ACCOUNT
  const module_modelid = formEnum.MODULE
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const module_ctx = `${MASTERFILE.module}/${module_modelid}/${company}`
  const current_ = {...PACB_QUERY_PARM, modelid: modelid, currency:currency??''}
  const [current, setCurrent] = useState<IPACBQueryParam>(current_)
  //const [, setIwsState] = useState(iwsStore.initialState)
  // const [accData, setAccData] = useState<IAccount[]>([])
  // const [rowData, setRowData] = useState<T[]>([])
  //const [module, setModule] = useState<IModule[]>([])
  console.log('module_', module_)
  console.log('selected', selected)
  console.log('current_', current_)
  console.log('current', current)

  //useCallback(() => {
  // useEffect(() => {
  //   iwsStore.subscribe(setIwsState)
  //   console.log('acc_ctx', acc_ctx)
  //   console.log('module_ctx', module_ctx)
  //   Get(acc_ctx, token, acc_modelid, setAccData)
  //   Get(module_ctx, token, module_modelid, setModule)
  //   setCurrent(current_)
  // }, [selected])

  const buildUrl = (current:IPACBQueryParam) => `${module_.ctx}/${company}/${current.account}/${current.fromPeriod ===-1 ?
                                                current.toPeriod:current.fromPeriod}/${current.toPeriod}`
  const getUrlAll = (current:IPACBQueryParam) => `${module_.ctx}/${company}/${current.fromPeriod ===-1 ?
                                               current.toPeriod:current.fromPeriod}/${current.toPeriod}`

  const submitQuery = (event: any, current:IPACBQueryParam ) => {
    event.preventDefault()
    console.log('buildUrl()', buildUrl(current))
    accData?.length < 2 && Get(acc_ctx, token, acc_modelid, setAccData)
    Get(buildUrl(current), token, modelid, setRowData)
  }
  const submitQuery2 = (event: any, current:IPACBQueryParam) => {
    event.preventDefault()
    console.log('getUrlAll()', getUrlAll(current))
    accData?.length < 2 && Get(acc_ctx, token, acc_modelid, setAccData)
    Get(getUrlAll(current), token, modelid, setRowData)
  }

   const onRowSelected = (event: RowSelectedEvent) => setCurrent((event.data instanceof Array) ? event.data[0] : event.data)
   //const templateName = () =>  (module.find((m:IModule) => Number(m.id) === current.modelid) ?? initModule[0]).description

  return [{ profile, menu, selected, t, module_ctx, acc_ctx, current_, current, setCurrent, submitQuery, submitQuery2, onRowSelected}]
}
export default UseJForm

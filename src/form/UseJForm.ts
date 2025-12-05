import {useEffect, useState} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry, PinnedRowModule} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {Get} from './CrudController'
import {initModule, MASTERFILE, PACB_QUERY_PARM, useStore} from './Menu'
import {formEnum} from '../utils/FormEnum'
import {IAccount, IModule, IPACBQueryParam} from '../Models.ts'
import {useTranslation} from "react-i18next";
import iwsStore from "../utils/Store.tsx";
import {UseJFormResult} from "../Props.ts";


ModuleRegistry.registerModules([
  AllCommunityModule, ClientSideRowModelModule, PinnedRowModule,
])

const STYLES = {
  inner: {
    borderRadius: 5,
    boxShadow: '0 20px 50px #BBF',
    padding: 10,
    paddingTop: 30,
    // paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 3,
  },
  inner2: {
    borderRadius: 5,
    boxShadow: '0 20px 50px #BBF',
    paddingTop:5,
    paddingLeft: 1,
    paddingRight: 2,
  },
}

const UseJForm = <T>(): [UseJFormResult<T>] => {

  const {profile, menu, selected} = useStore()
  const {token, currency, company} = profile
  const {t,} = useTranslation()
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  const title =  `${company}/${t(module_.title)}`

  const modelid: number = module_ ? module_.modelid : 1111
  const acc_modelid = formEnum.ACCOUNT
  const module_modelid = formEnum.MODULE
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const module_ctx = `${MASTERFILE.module}/${module_modelid}/${company}`
  const current_ = {...PACB_QUERY_PARM, modelid: modelid, currency:currency??''}
  const [current, setCurrent] = useState<IPACBQueryParam>(current_)
  const [, setIwsState] = useState(iwsStore.initialState)
   const [accData, setAccData] = useState<IAccount[]>([])
   const [rowData, setRowData] = useState<T[]>([])
  const [module, setModule] = useState<IModule[]>([])

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    Get(acc_ctx, token, acc_modelid, setAccData)
    Get(module_ctx, token, module_modelid, setModule)
    setCurrent(current_)
  }, [selected])

  const buildUrl = (current:IPACBQueryParam) => `${module_.ctx}/${company}/${current.account}/${current.fromPeriod ===-1 ?
                                                current.toPeriod:current.fromPeriod}/${current.toPeriod}`
  const getUrlAll = (current:IPACBQueryParam) => `${module_.ctx}/${company}/${current.fromPeriod ===-1 ?
                                               current.toPeriod:current.fromPeriod}/${current.toPeriod}`

  const submitQuery = (event: any, current:IPACBQueryParam ) => {
    event.preventDefault()
    accData?.length < 2 && Get(acc_ctx, token, acc_modelid, setAccData)
    Get(buildUrl(current), token, modelid, setRowData)
  }
  const submitQuery2 = (event: any, current:IPACBQueryParam) => {
    event.preventDefault()
    accData?.length < 2 && Get(acc_ctx, token, acc_modelid, setAccData)
    Get(getUrlAll(current), token, modelid, setRowData)
  }

   const onRowSelected = (event: RowSelectedEvent) => setCurrent((event.data instanceof Array) ? event.data[0] : event.data)
   const templateName = () =>  (module.find((m:IModule) => Number(m.id) === current.modelid) ?? initModule[0]).description

  return [{ profile, menu, selected, t, accData, rowData, setRowData, current_, current, setCurrent
    , submitQuery, submitQuery2, onRowSelected, templateName, title:title, styles:STYLES}]
}
export default UseJForm

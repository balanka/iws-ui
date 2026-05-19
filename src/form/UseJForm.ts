import {useEffect, useState} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry, PinnedRowModule} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {Get} from './CrudController'
import {initModule, MASTERFILE, PACB_JOURNAL_QUERY_PARM} from './Menu'
import {formEnum} from '../utils/FormEnum'
import {JournalProps} from '../Props.ts'
import {IAccount, IModule} from '../Models.ts'
import {UseJFormResult} from '../Props.ts'
import useForm from './UseForm.ts'

ModuleRegistry.registerModules([
  AllCommunityModule, ClientSideRowModelModule, PinnedRowModule,
])

export const  styles = {
  inner: {
    borderRadius: 5,
    boxShadow: '0 20px 50px #BBF',
    padding: 5,
    // paddingTop:5,
    // paddingLeft: 5,
    // paddingRight: 5,
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
  const [{ profile, menu, selected, t, title, modelid, module_}] = useForm()
  const {token, currency, company} = profile
  const acc_modelid = formEnum.ACCOUNT
  const module_modelid = formEnum.MODULE
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const module_ctx = `${MASTERFILE.module}/${module_modelid}/${company}`
  const current_ = {...PACB_JOURNAL_QUERY_PARM, modelid: modelid, currency:currency??''}
  const [current, setCurrent] = useState<JournalProps>(current_)
  const [accData, setAccData] = useState<IAccount[]>([])
  const [rowData, setRowData] = useState<T[]>([])
  const [module, setModule] = useState<IModule[]>([])
  useEffect(() => {
    //const subscription = iwsStore.subscribe(() => {
      //const freshData = iwsStore.getByModelId(modelid) as T[];
      //setRowData(freshData);
      Get(acc_ctx, token, acc_modelid, setAccData)
      Get(module_ctx, token, module_modelid, setModule)
      setCurrent(current_)
   // return () => subscription.unsubscribe();
  }, [selected]);

 const fromPeriod = current.fromPeriod ===-1 ? `${current.toPeriod.toString().substring(0,4)}00`
                                                            :current.fromPeriod
  const buildUrl = (current:JournalProps) =>
         `${module_.ctx}/${company}/${current.account}/${fromPeriod}/${current.toPeriod}`
  const getUrlAll = (current:JournalProps) =>
         `${module_.ctx}/${company}/${fromPeriod}/${current.toPeriod}`

  const submitQuery = (event: any, current:JournalProps ) => {
    event.preventDefault()
    accData?.length < 2 && Get(acc_ctx, token, acc_modelid, setAccData)
    Get(buildUrl(current), token, modelid, setRowData)
  }
  const submitQuery2 = (event: any, current:JournalProps) => {
    event.preventDefault()
    accData?.length < 2 && Get(acc_ctx, token, acc_modelid, setAccData)
    Get(getUrlAll(current), token, modelid, setRowData)
  }

   const onRowSelected = (event: RowSelectedEvent) =>
         setCurrent((event.data instanceof Array) ? event.data[0] : event.data)
   const templateName = () =>
        (module.find((m:IModule) => Number(m.id) === current.modelid) ?? initModule[0]).description

  return [{ profile, menu, selected, t, accData, rowData, setRowData, current_, current, setCurrent
    , submitQuery, submitQuery2, onRowSelected, templateName, title:title, styles:styles}]
}
export default UseJForm

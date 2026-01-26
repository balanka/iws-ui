import {useEffect, useState} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry, PinnedRowModule} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {Get} from './CrudController'
import {ARTICLE_ACCOUNT_QUERY_PARM, initModule, MASTERFILE} from './Menu'
import {formEnum} from '../utils/FormEnum'
import {IJournalProps, UseArticleAccountResult} from '../Props.ts'
import {IArticle, IModule, IStore} from '../Models.ts'
import iwsStore from '../utils/Store.tsx'
import useForm from './UseForm.ts'

ModuleRegistry.registerModules([
  AllCommunityModule, ClientSideRowModelModule, PinnedRowModule,
])

export const  styles = {
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

const UseArticleAccountForm = <T>(): [UseArticleAccountResult<T>] => {
  const [{ profile, menu, selected, t, title, modelid, module_}] = useForm()
  const {token, currency, company} = profile
  const art_modelid = formEnum.ARTICLE
  const store_modelid = formEnum.STORE
  const module_modelid = formEnum.MODULE
  const art_ctx = `${MASTERFILE.article}/${art_modelid}/${company}`
  const store_ctx = `${MASTERFILE.store}/${store_modelid}/${company}`
  const module_ctx = `${MASTERFILE.module}/${module_modelid}/${company}`
  const current_:IJournalProps = {...ARTICLE_ACCOUNT_QUERY_PARM, modelid: modelid, currency:currency??''}
  const [current, setCurrent] = useState<IJournalProps>(current_)
  const [, setIwsState] = useState(iwsStore.initialState)
  const [articleData, setArticleData] = useState<IArticle[]>([])
  const [storeData, setStoreData] = useState<IStore[]>([])
  const [rowData, setRowData] = useState<T[]>([])
  const [module, setModule] = useState<IModule[]>([])

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    Get(art_ctx, token, art_modelid, setArticleData)
    Get(store_ctx, token, store_modelid, setStoreData)
    Get(module_ctx, token, module_modelid, setModule)
    setCurrent(current_)
  }, [selected])

 const fromPeriod = current.fromPeriod ===-1 ? `${current.toPeriod.toString().substring(0,4)}00`
                                                            :current.fromPeriod
  const buildUrl = (current:IJournalProps) =>
         `${module_.ctx}/${company}/${current.store}/${current.article}/${fromPeriod}/${current.toPeriod}`

  const submitQuery = (event: any, current:IJournalProps) => {
    event.preventDefault()
    Get(buildUrl(current), token, modelid, setRowData)
  }

   const onRowSelected = (event: RowSelectedEvent) =>
         setCurrent((event.data instanceof Array) ? event.data[0] : event.data)
   const templateName = () =>
        (module.find((m:IModule) => Number(m.id) === current.modelid) ?? initModule[0]).description

  return [{ profile, menu, selected, t, articleData, storeData, rowData, setRowData, current_, current, setCurrent
    , submitQuery, onRowSelected, templateName, title:title, styles:styles}]
}
export default UseArticleAccountForm

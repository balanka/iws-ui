import {Dispatch, SetStateAction, useCallback, useEffect, useRef, useState} from 'react'
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  GridApi,
  ModuleRegistry,
} from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {Add, Edit, EditRow, Get, Get2, Get3} from './CrudController.ts'
import {initCust, initfModule, MASTERFILE} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import {formEnum} from '../utils/FormEnum.tsx'
import {
  IAccount,
  IArticle,
  ICustomer,
  IFmodule,
  IModule,
  IStore,
  ISupplier,
  IVat, IWSTransaction,
} from '../Models.ts'
import {ILine, SaveProps, UseTransactionFormResult} from '../Props.ts'
import useForm from './UseForm.ts'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const UseTransactionForm = <T extends IWSTransaction<ILine>,
              L extends ILine>(current_ :T, currentLine_ :L, currentLine:L): [UseTransactionFormResult<T, ILine>]  => {
   const [{ profile, menu, selected, t, i18n, modelid}] = useForm()
   const { token, company, currency } = profile
   let templateFileName =''
  const [language, setLanguage] = useState('en-US')
  const [, setDisable] = useState(true)
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  let title_ = `${company}/${t(module_.title)}`
  const [current, setCurrent] = useState<T>(current_)
  const [iwsState, setIwsState] = useState(iwsStore.initialState)
  //console.log('current>>>>', current)
  const acc_modelid = formEnum.ACCOUNT
  const art_modelid = formEnum.ARTICLE
  const vat_modelid = formEnum.VAT
  const store_modelid = formEnum.STORE
  const sup_modelid = formEnum.SUPPLIER
  const cust_modelid = formEnum.CUSTOMER
  const module_modelid = formEnum.MODULE
  const fmodule_modelid = formEnum.FMODULE
  const modifyUrl = selected
  let ctx = `${module_.ctx}/${modelid}/${company}`
  const art_ctx = `${MASTERFILE.article}/${art_modelid}/${company}`
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const vat_ctx = `${MASTERFILE.vat}/${vat_modelid}/${company}`
  const store_ctx = `${MASTERFILE.store}/${store_modelid}/${company}`
  const sup_ctx = `${MASTERFILE.sup}/${sup_modelid}/${company}`
  const cust_ctx = `${MASTERFILE.cust}/${cust_modelid}/${company}`
  const module_ctx = `${MASTERFILE.module}/${module_modelid}/${company}`
  const fmodule_ctx = `${MASTERFILE.fmodule}/${fmodule_modelid}/${company}`
  const [rows, ] = useState<bigint[]>([])
  const [rowData, setRowData] = useState<T[]>([])
  const [storeData, setStoreData] = useState<IStore[]>([])
   const [accData, setAccData] = useState<IAccount[]>([])
  const [articleData, setArticleData] = useState<IArticle[]>([])
  const [vatData, setVatData] = useState<IVat[]>([])
  const [, setCustomerData] = useState<ICustomer[]>([])
  const [, setSupplier] = useState<ISupplier[]>([])
  const [, setPartnerData] = useState<ICustomer[]|ISupplier[]>(initCust)
  const [, setModule] = useState<IModule[]>([])
  const [copyFrom, setCopyFRom] = useState<number[]>([])
  const [copyFromTransaction, setCopyFromTransaction] = useState<T[]>([])
  const [fmodule, setFmodule] = useState<IFmodule[]>([])
  const [model, setModel] = useState<number>(-1)
  const [partnerId, setPartnerId] = useState<number>(-1)
  const [isFetching, setIsFetching] = useState(false)
  const [title, setTitle] = useState(title_)
  const [gridApi,   setGridApi] = useState<GridApi>()
  const zIndex:number = 99999
  const EXPORT_FILE_EXTENSION= "xlsx"
  console.log('rowData', rowData)

  const handleKeyPress = useCallback((event:any) => {
    if (event.ctrlKey && (event.key === 's' || event.key === 'S')) {
      submitEdit(event, )
    } else if (event.ctrlKey && (event.key === 'l' || event.key === 'L')) {
      onNewLine()
    }
  }, [])

  let init = useRef(false)
  useEffect(() => {
    if (!init.current) {
        iwsStore.subscribe(setIwsState)
        init.current = true
        Get(art_ctx, token, art_modelid, setArticleData)
        Get(fmodule_ctx, token, fmodule_modelid, setFmodule)
        Get(acc_ctx, token, acc_modelid, setAccData)
        Get(store_ctx, token, store_modelid, setStoreData)
        Get(vat_ctx, token, vat_modelid, setVatData)
        Get(cust_ctx, token, cust_modelid, setCustomerData)
        Get(sup_ctx, token, sup_modelid, setSupplier)
        Get(module_ctx, token, fmodule_modelid, setModule)
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress)
    }
    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [partnerId, copyFrom, current])

  const handleLanguageChange = (event:any) => {
    event.preventDefault()
    const value = event.target.value
    setLanguage(value)
    i18n.changeLanguage(value)
  }
  const handleModuleChange = (value:any) => {
    setModel(value)
    const mx:IFmodule = fmodule.find((m:IFmodule) => m.id === value) ?? initfModule[0]
     templateFileName = mx.description
    console.log('mx>>>>', mx)
    console.log('templateFileName >>>>', templateFileName)
    title_ = mx?.name ? mx.name : title_
    const copyFromIds = mx? mx.copyFrom:-1
    const titlex = `${company}/${title_}`
    //console.log('titlex>>>>', titlex)
    setTitle(titlex)
    setCopyFRom([copyFromIds])
    setPartnerId(parseInt(mx.account))
    setCurrent(current_)
    ctx = `${module_.ctx}/${mx.id}/${company}`
    const ctx_copyFrom = `${module_.ctx}/${copyFromIds}/${company}`
    const _partnerCtx:string = parseInt(mx.account)===formEnum.CUSTOMER?MASTERFILE.cust:
                              (parseInt(mx.account)==formEnum.SUPPLIER)?MASTERFILE.sup:''
    const partnerCtx = `${_partnerCtx}/${parseInt(mx.account)}/${company}`
    Get(ctx_copyFrom, token, copyFromIds, setCopyFromTransaction)
    submitQuery( ctx, partnerCtx, parseInt(mx.account))
    const currentx = rowData.length>0?rowData[0]:current_
    setCurrent(currentx)
  }

     function buildPostCall (rows: BigInt[], current:T, modifyUrl: string, token: string, setCurrent:Dispatch<SetStateAction<T>>) {
         const ids = rows.length > 0 ? rows : [current.id]
         const url_ = `${modifyUrl}/post/${ids.join(',')}/${current.modelid}/${current.company}`
         Get2(url_, token, setCurrent)
     }

  const callSubmitPost = (event:any, modifyUrl:string, token:string, current:T
      , setCurrent:Dispatch<SetStateAction<T>>,  rows:BigInt[]):void => {
    event.preventDefault()
      buildPostCall(rows, current, modifyUrl, token, setCurrent)
  }

  const submitPost = (event:any) => callSubmitPost(event, module_.ctx, token, current, setCurrent, rows)
  const submitAdd = (event:any) => {
    event.preventDefault()
    const row: T = { ...current, modelid: model, company: company}
    Add(modifyUrl, token, row, rowData, setCurrent)
  }
     const addLine = useCallback(
         ( line:L, setCurrent:Dispatch<SetStateAction<T>>) => {
             const dx: T = {...current}
             const newLine:L = {...line, id: BigInt(-1), transid: current.id1}
             dx.lines.push(newLine)
             gridApi!.applyTransaction({add: [newLine]})
             setCurrent(dx)
         },
         [current],
     )

     const onRemoveSelectedLine = useCallback(
         ( event:any, current:T, setCurrent:Dispatch<SetStateAction<T>>) => {
             event.preventDefault()
             const dx: T = {...current}
            if(!dx.hasOwnProperty('lines')) dx['lines']=[]
             const idx = dx.lines.findIndex((obj: ILine) => obj.id === currentLine.id)
             if (idx >= 0) dx.lines[idx] = {...currentLine, transid: BigInt(-2)}
             gridApi!.applyTransaction({remove: [currentLine]})
             setCurrent(dx)
     }, [currentLine]);
   const templateName:()=>string = () =>
     templateFileName ? templateFileName: (fmodule.find((m:IFmodule) => Number(m.id) === current.modelid) ?? initfModule[0]).description

  const callSubmitEdit = (event:any, modifyUrl:string, token:string, current:T
      , setCurrent:Dispatch<SetStateAction<T>>, data:T[], submitAdd: (arg:any)=>void) => {
      event.preventDefault();
      BigInt(current.id) > 0 ? Edit(modifyUrl, token, current, data, setCurrent) : submitAdd(event)
  }
  const submitCancel = (event:any) =>  callSubmitCancel(event, ctx, token, current, setCurrent, rowData )
  const callSubmitCancel = (event:any, _ctx:string, token:string, current:T
      , setCurrent:Dispatch<SetStateAction<T>>, data:T[],) => {
    event.preventDefault()
    const url_ = _ctx.replace('ltr', 'cancelnLtr')
    BigInt(current.id )> 0 ? Edit(url_, token, current, data, setCurrent) : current
  }
  const onNewLine = () => addLine (currentLine_,  setCurrent)
  const onDeleteLine = (event:any) => {
      onRemoveSelectedLine (event, current,  setCurrent);
      (BigInt(current.id) > 0) && Edit(modifyUrl, token, current, rowData, setCurrent)//submitAdd(current)
  }
  const submitEdit = (event:any) =>
      callSubmitEdit(event, modifyUrl, token, current, setCurrent, rowData, submitAdd)

  const initAdd = () => {
    setDisable(false)
    const newRow:T = {...current_, company: company, currency: currency, editing: false}
    EditRow(newRow, true, setCurrent)
  }
  const reload = () => {
    iwsStore.deleteKey(current.modelid)
    Get(ctx, token, current.modelid, setRowData)
    setCurrent(current_)
  }
  const copyCall = (id:BigInt) => {
    setDisable(false)
    const idx = copyFromTransaction.findIndex((obj: T) => obj.id === id)
    console.log('idx', idx)
    if (idx >= 0) {
      const tr = copyFromTransaction[idx] ?? current_
      const linesx = tr.lines.map((line) => {
        return {...line, id: BigInt(-1), transid: current_.id1}
      })
      const newRow = {
        ...tr, id: current_.id, id1: current_.id1, modelid: model, company: company
        , currency: currency, posted: false, editing: false, lines: linesx
      }
      Add(modifyUrl, token, newRow, rowData, setCurrent)
    }
  }
  const submitQuery = (ctx:string, partnerCtx:string, partnerModelid:number) => {
    setIsFetching(true)
    !iwsState.get(fmodule_modelid)&&Get(fmodule_ctx, token, fmodule_modelid, setFmodule)
    !iwsState.get(acc_modelid)&&Get(acc_ctx, token, acc_modelid, setAccData)
    !iwsState.get(art_modelid)&&Get(art_ctx, token, art_modelid, setArticleData)
    !iwsState.get(store_modelid)&&Get(store_ctx, token, store_modelid, setStoreData)
    !iwsState.get(vat_modelid)&&Get(vat_ctx, token, vat_modelid, setVatData)
    !iwsState.get(partnerModelid)&&Get(partnerCtx, token, partnerModelid, setPartnerData)
    Get3(ctx, token, modelid, setRowData, setCurrent)
    setIsFetching(false)
  }

  const onRowSelected = (event: RowSelectedEvent) => setCurrent(event.data)

  const sheetName ="Sheet1"
  const exportFileName =()=> {
     const filename = templateName().split('.')[0]
    return `${filename}.${EXPORT_FILE_EXTENSION}`
  }
   const saveProps:SaveProps = { 'fileName': exportFileName(), 'sheetName':sheetName, 'data':current.lines }

   return [{ profile, menu, selected, t, language, isFetching, storeData, accData, articleData, fmodule, rowData
     , setRowData, vatData, current_, current, setCurrent, initAdd, reload, submitEdit, copyFromTransaction
     , handleLanguageChange, handleModuleChange, handleKeyPress, onNewLine, onRowSelected, onDeleteLine, submitCancel, submitPost
     , copyCall, setGridApi, templateName, zIndex, saveProps, partnerId, modelid, title}]
}
export default UseTransactionForm

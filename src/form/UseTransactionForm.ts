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
import {Add, COPY, Edit, EditRow, Get, Get2} from './CrudController.ts'
import {initfModule, MASTERFILE} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import {formEnum} from '../utils/FormEnum.tsx'
import {
  IAccount, IFinancials,
  IFmodule,
  IModule,
  IWSTransaction,
} from '../Models.ts'
import {ILine, SaveProps, UseTransactionFormResult} from '../Props.ts'
import useForm from './UseForm.ts'
import {isArrayAndNotEmpty} from "../utils/Utils.ts";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const UseTransactionForm = <T extends IWSTransaction<L>,
              L extends ILine>(current_ :T, initialLine :L, currentLine:L, setCurrentLine:Dispatch<SetStateAction<L>>
           , rowData:T[], setRowData:Dispatch<SetStateAction<T[]>>): [UseTransactionFormResult<T, ILine>]  => {
   const [{ profile, menu, selected, t, language, handleLanguageChange, modelid, module_}] = useForm()
   const { token, company, currency } = profile
   let templateFileName =''
  const [, setDisable] = useState(true)
  const [current, setCurrent] = useState<T>(current_)
  const [, setIwsState] = useState(iwsStore.initialState)
  const acc_modelid = formEnum.ACCOUNT
  const module_modelid = formEnum.MODULE
  const fmodule_modelid = formEnum.FMODULE
  const modifyUrl = selected
  let ctx = `${module_.ctx}/${modelid}/${company}`
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const module_ctx = `${MASTERFILE.module}/${module_modelid}/${company}`
  const fmodule_ctx = `${MASTERFILE.fmodule}/${fmodule_modelid}/${company}`
  const [rows, ] = useState<bigint[]>([])
   const [accData, setAccData] = useState<IAccount[]>([])
  const [, setModule] = useState<IModule[]>([])
  const [copyFromTransaction, setCopyFromTransaction] = useState<T[]>([])
  const [fmodule, setFmodule] = useState<IFmodule[]>([])
  const [model, setModel] = useState<number>(-1)
  const [isFetching, setIsFetching] = useState(false)
  const [gridApi,   setGridApi] = useState<GridApi>()
  const zIndex:number = 99999
  const EXPORT_FILE_EXTENSION= "xlsx"
  const handleKeyPress = useCallback((event:any) => {
   // let isMetaKey =  event.metaKey
    console.log('event.keyCode', event.keyCode)
    console.log('event.functionKey', event.functionKey)
    switch (event.keyCode) {
      case 112:
        submitEdit(event); return
      case 113:
        onNewLine();return
      case 114:
        reload();return
      default:
        return
    }
  }, [])

  let init = useRef(false)
  useEffect(() => {
    if (!init.current) {
        iwsStore.subscribe(setIwsState)
        init.current = true
         Get(fmodule_ctx, token, fmodule_modelid, setFmodule)
         Get(acc_ctx, token, acc_modelid, setAccData)
         Get(module_ctx, token, fmodule_modelid, setModule)
        // attach the event listener
          document.onkeydown = handleKeyPress
         document.addEventListener('onKeyDown', handleKeyPress)
    }
    // remove the event listener
    return () => {
      document.removeEventListener('onKeyDown', handleKeyPress)
    }
  }, [current])

     function buildPostCall (rows: BigInt[], current:T, modifyUrl: string, token: string, setCurrent:Dispatch<SetStateAction<T>>) {
         const ids = rows.length > 0 ? rows : [current?.id]
         const url_ = `${modifyUrl}/post/${ids.join(',')}/${current?.modelid}/${current?.company}`
         Get2(url_, token, setCurrent)
     }

  const callSubmitPost = (event:any, modifyUrl:string, token:string, current:T
      , setCurrent:Dispatch<SetStateAction<T>>,  rows:BigInt[]):void => {
    event.preventDefault()
      buildPostCall(rows, current, modifyUrl, token, setCurrent)
  }

  const submitPost = (event:any) => callSubmitPost(event, module_?.ctx, token, current, setCurrent, rows)
  const submitAdd = (event:any) => {
    event.preventDefault()
    const row: T = { ...current, modelid: model, company: company}
    Add(modifyUrl, token, row, rowData, setRowData, setCurrent)
  }
     const addLine = useCallback(
         ( line:L, setCurrent:Dispatch<SetStateAction<T>>) => {
             const dx: T = {...current}
           console.log('Line', line)
             const  newLine:L = {...line, id: BigInt(-1), transid: current?.id, company:company}
           console.log('newLine', newLine)
           if(dx.hasOwnProperty('lines'))
             dx.lines.push(newLine)
           else dx['lines'] = [{...newLine}]
           gridApi!?.applyTransaction({add: [newLine]})
           console.log('dx', dx)
           setCurrent(dx)
           setCurrentLine({...newLine})
         },
         [current],
     )

     const onRemoveSelectedLine = useCallback(
         ( event:any, current:T, setCurrent:Dispatch<SetStateAction<T>>) => {
             event.preventDefault()
             const dx: T = {...current}
            if(!dx.hasOwnProperty('lines')) dx['lines']=[]
             const idx = dx?.lines?.findIndex((obj: ILine) => obj?.id === currentLine?.id)
             if (idx >= 0) dx.lines[idx] = {...currentLine, transid: BigInt(-2)}
             gridApi!.applyTransaction({remove: [currentLine]})
             setCurrent(dx)
     }, [currentLine]);
   const templateName:()=>string = () =>
     templateFileName ? templateFileName: (fmodule.find((m:IFmodule) => Number(m?.id) === current?.modelid) ?? initfModule[0]).description

  const callSubmitEdit = (event:any, modifyUrl:string, token:string, current:T
      , setCurrent:Dispatch<SetStateAction<T>>, data:T[], submitAdd: (arg:any)=>void) => {
      event.preventDefault();
      console.log(' newly added or edited current', current )
      if(BigInt(current?.id) > 0){
       const x= Edit(modifyUrl, token, current, data, setRowData, setCurrent)
        setCurrent(x)
        event.preventDefault();
      } else {
        submitAdd(event)
        event.preventDefault();
      }
      //gridApi!.applyTransaction({update: [current]})
  }
  const submitCancel = (event:any) =>  callSubmitCancel(event, ctx, token, current, setCurrent, rowData )
  const callSubmitCancel = (event:any, _ctx:string, token:string, current:T
      , setCurrent:Dispatch<SetStateAction<T>>, data:T[],) => {
    event.preventDefault()
    const url_ = _ctx.replace('ltr', 'cancelnLtr')
    BigInt(current.id )> 0 ? Edit(url_, token, current, data, setRowData, setCurrent) : current
  }
  const onNewLine = () => addLine (initialLine,  setCurrent)
  const onDeleteLine = (event:any) => {
      onRemoveSelectedLine (event, current,  setCurrent);
      (BigInt(current.id) > 0) && Edit(modifyUrl, token, current, rowData, setRowData, setCurrent)//submitAdd(current)
  }
  const submitEdit = (event:any) =>
      callSubmitEdit(event, modifyUrl, token, current, setCurrent, rowData, submitAdd)

  const initAdd = () => {
    setDisable(false)
    const currentN = {...current_, modelid:model, lines:[{...initialLine}]}
    const newRow:T = {...currentN, company: company, currency: currency, editing: false}
    console.log('newRow',  newRow)
    setCurrentLine(initialLine)
    EditRow(newRow, true, setCurrent)
  }
  const reload = () => {
    iwsStore.deleteKey(current.modelid)
    Get(ctx, token, current.modelid, setRowData)
    //setCurrent(current_)
  }
  // copyFromFTr/id/modelidFrom/modelidTo/company
  const copyCall = (id:BigInt, event:any) => {
    setDisable(false)
    const  eventx: string[]= event.toString().split(' ')
    // console.log('eventx', eventx)
    const  modelidFrom= parseInt(eventx[1])
    // console.log('modelidFrom', modelidFrom)
    // console.log('model', model)
    // console.log('current', current)
    const company= current.company
    const url = `/copyFromFTr/${id}/${modelidFrom}/${model}/${company}`
    console.log('url', url)
    COPY(url, token, rowData, setRowData, setCurrent)
  }

  const onRowSelected = (event: RowSelectedEvent) => {
     // console.log('event.data', event)
     let transaction:T= isArrayAndNotEmpty(event.data) ?event.data[0]:event.data
     const line= transaction?.lines?.length>0?transaction?.lines[0]:initialLine
     setCurrentLine(line)
     setCurrent(transaction?? event as IFinancials)

  }

  const sheetName ="Sheet1"
  const exportFileName =()=> {
     const filename = templateName().split('.')[0]
    return `${filename}.${EXPORT_FILE_EXTENSION}`
  }
   const saveProps:SaveProps = { 'fileName': exportFileName(), 'sheetName':sheetName, 'data':current?.lines??[] }

   return [{ profile, menu, selected, t, language, accData, setAccData, fmodule, setFmodule
     , current_, current, setCurrent, initAdd, reload, submitEdit, copyFromTransaction, setCopyFromTransaction
     , handleLanguageChange, setModel, handleKeyPress, onNewLine, onRowSelected, onDeleteLine, submitCancel, submitPost
     , copyCall, setGridApi, templateName, zIndex, saveProps, modelid, isFetching, setIsFetching}]
}
export default UseTransactionForm

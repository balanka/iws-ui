import {Dispatch, SetStateAction, useCallback, useEffect, useRef, useState} from 'react'
import {
  AllCommunityModule,
  ClientSideRowModelModule, ColDef,
  GridApi, GridOptions, IDetailCellRendererParams,
  ModuleRegistry, RowClassParams,
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
  IFinancials,
  IFmodule,
  IModule,
  IWSTransaction,
} from '../Models.ts'
import {ILine, SaveProps, UseTransactionFormResult} from '../Props.ts'
import useForm from './UseForm.ts'
import {isArrayAndNotEmpty} from "../utils/Utils.ts";
import {TFunction} from "i18next";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const UseTransactionForm = <T extends IWSTransaction<L>,
              L extends ILine>(current_ :T, initialLine :L, currentLine:L, setCurrentLine:Dispatch<SetStateAction<L>>
           , rowData:T[], setRowData:Dispatch<SetStateAction<T[]>>): [UseTransactionFormResult<T, ILine>]  => {
   const [{ profile,  selected, language, handleLanguageChange, modelid, module_}] = useForm()
   const { token, company, currency } = profile
   let templateFileName =''
  const [, setDisable] = useState(true)
  const [current, setCurrent] = useState<T>(current_)
  const module_modelid = formEnum.MODULE
  const fmodule_modelid = formEnum.FMODULE
  const modifyUrl = selected
  let ctx = `${module_.ctx}/${modelid}/${company}`
  const module_ctx = `${MASTERFILE.module}/${module_modelid}/${company}`
  const fmodule_ctx = `${MASTERFILE.fmodule}/${fmodule_modelid}/${company}`
  const [rows, ] = useState<bigint[]>([])
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
    const subscription = iwsStore.subscribe((store) => {
      if (!init.current) {
        init.current = true
        setRowData(store.get(current_.modelid) as unknown as T[]);
        Get(fmodule_ctx, token, fmodule_modelid, setFmodule)
        Get(module_ctx, token, module_modelid, setModule)
        // attach the event listener
      }
    })
      document.onkeydown = handleKeyPress
      document.addEventListener('onKeyDown', handleKeyPress)
    // remove the event listener
    return () => {
      subscription.unsubscribe()
      document.removeEventListener('onKeyDown', handleKeyPress)
    }
  }, [current])

     function buildPostCall (rows: BigInt[], current:T, modifyUrl: string, token: string, setCurrent:Dispatch<SetStateAction<T>>) {
         const ids = rows?.length > 0 ? rows : [current?.id]
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
    (line: L, setCurrent: Dispatch<SetStateAction<T>>) => {
      console.log('addLine called - THIS SHOULD NOT HAPPEN ON EVERY KEYSTROKE', new Date().toLocaleTimeString() +current)

      setCurrent((prevCurrent: T) => {
        const newLine: L = {...line, id: BigInt(-1), transid: prevCurrent?.id, company: company, modelid:current.modelid}
        console.log('addLine newLine', newLine)
        const dx: T = {...prevCurrent}
        if (dx.hasOwnProperty('lines')) {
          dx.lines.push(newLine)
        } else {
          dx['lines'] = [{...newLine}]
        }
        if (gridApi) {
          gridApi.applyTransactionAsync({add: [newLine]})
        }
        setCurrentLine({...newLine})
        console.log('dxdxdxdxdx', dx)
        return dx
      })
    },
    [current]
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
     templateFileName ? templateFileName: (fmodule.find((m:IFmodule) => Number(m?.id) === current?.modelid) ?? initfModule).description

  const callSubmitEdit = async (event:any, modifyUrl:string, token:string, current:T
      , setCurrent:Dispatch<SetStateAction<T>>, data:T[], submitAdd: (arg:any)=>void) => {
      event.preventDefault();
      try {
      console.log(' newly added or edited current', current )
         if(BigInt(current?.id) > 0){
           const updated= await Edit(modifyUrl, token, current,  setCurrent)
           console.log(' updated', updated )
           const index = data.findIndex((obj: T) => obj?.id === updated?.id)
           if (index >= 0) {
              const newList = [...data]
              newList[index] = updated
             setRowData(newList)
             console.log(' newList', newList )
           }
        setCurrent(updated)
        } else {
         submitAdd(event)
       }
     } catch (error) {
      console.error('Edit failed', error);
    // Show user notification
     }
  }
  const submitCancel = (event:any) =>  callSubmitCancel(event, ctx, token, current, setCurrent, rowData )
  const callSubmitCancel = async (event:any, _ctx:string, token:string, current:T
      , setCurrent:Dispatch<SetStateAction<T>>, data:T[],) => {
      event.preventDefault()
      const url_ = _ctx.replace('ltr', 'cancelnLtr')
      let updated;
      if (BigInt(current.id) > 0) {
        updated = await Edit(url_, token, current,  setCurrent)
      } else {
        updated = current;
      }
      const index = data.findIndex((obj: T) => obj?.id === updated?.id)
     if (index >= 0) {
      const newList = [...data]
      newList[index] = updated
      setRowData(newList)
    }
    return updated
  }
  const onNewLine = () => addLine (initialLine,  setCurrent)
  const onDeleteLine = async (event:any) => {
      onRemoveSelectedLine (event, current,  setCurrent);
      let updated;
      if (BigInt(current.id) > 0) {
        updated = await Edit(modifyUrl, token, current, setCurrent);
      } else {
        updated = current;
      }
      const index = rowData.findIndex((obj: T) => obj?.id === updated?.id)
      if (index >= 0) {
        const newList = [...rowData]
        newList[index] = updated
        setRowData(newList)
      }
    //setCurrent(updated)
  }
  const submitEdit = (event:any) =>
      callSubmitEdit(event, modifyUrl, token, current, setCurrent, rowData, submitAdd)

  const initAdd = () => {
    setDisable(false)
    const newLine = {...initialLine, modelid:model, company:company}
    const currentN = {...current_, modelid:model, lines:[newLine]}
    //const newRow:T = {...currentN, company: company, currency: currency, editing: false}
    const newRow:T = {...currentN, company: company, currency: currency}
    console.log('newRow',  newRow)
    setCurrentLine(newLine)
    EditRow(newRow, true, setCurrent)
  }
  const reload = () => {
    iwsStore.deleteByModelId(current.modelid)
    Get(ctx, token, current.modelid, setRowData)
    //setCurrent(current_)
  }
  // copyFromFTr/id/modelidFrom/modelidTo/company
  const copyCall = async (id:BigInt, event:any) => {
    setDisable(false)
    const  eventx: string[]= event.toString().split(' ')
    const  modelidFrom= parseInt(eventx[1])
    //const company= current.company
    const url = `${modifyUrl}x/${id}/${modelidFrom}/${model}/${company}`
    console.log('url', url)
    const record = await COPY(url, token, rowData, setRowData, setCurrent)
    console.log('record', record)
    setCurrent(record)
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

  const gridOptions = (
    columnDefs: (t: TFunction<'transalation', undefined>) => ColDef[],
    lineColumnDefs: (t: TFunction<'transalation', undefined>) => ColDef[],
    t: TFunction<'transalation', undefined>
  ): GridOptions<T> => {
    return {
      rowStyle: { background: 'lightBlue' },

      // ✅ Correctly typed getRowStyle
      getRowStyle: (params: RowClassParams<T>) => {
        if (params.node.rowIndex !== null && params.node.rowIndex % 2 === 0) {
          return { background: '#fff9e6' };
        }
        return undefined; // explicit return for odd rows
      },

      defaultColDef: {
        resizable: true,
        editable: false,
        flex: 1,
        filter: true,
      },
      rowHeight: 20,
      rowSelection: {
        mode: "multiRow",
        checkboxes: true,
        copySelectedRows: true,
      },
      paginationPageSizeSelector: [5, 10, 20, 50],
      pagination: true,
      paginationPageSize: 10,
      detailRowAutoHeight: true,
      autoSizeStrategy: {
        type: 'fitGridWidth' as const,   // ✅ literal type
      },
      columnDefs: columnDefs(t),
      detailCellRendererParams: {
        detailGridOptions: {
          getRowStyle: (params: RowClassParams<any>) => {
            if (params.node.rowIndex !== null && params.node.rowIndex % 2 === 0) {
              return { background: '#fff9e6' };
            }
            return undefined;
          },
          columnDefs: lineColumnDefs(t),
          defaultColDef: { flex: 1 },
        },
        getDetailRowData: (params: any) => {
          params.successCallback(params.data.lines);
        },
      } as IDetailCellRendererParams<T, L>,
    };
  };

   return [{ language, fmodule, setFmodule, current, setCurrent, initAdd, reload, submitEdit, onRowSelected, onNewLine, copyFromTransaction, setCopyFromTransaction
     , onDeleteLine, submitCancel, submitPost, copyCall, setGridApi, templateName, zIndex,  handleLanguageChange, setModel
     , saveProps, modelid, isFetching, setIsFetching
     , gridOptions }]

}
export default UseTransactionForm

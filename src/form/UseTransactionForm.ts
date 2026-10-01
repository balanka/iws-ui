import {
  Dispatch, SetStateAction, useCallback, useEffect, useRef, useState,
} from 'react'
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ColDef,
  GridApi,
  GridOptions,
  IDetailCellRendererParams,
  ModuleRegistry, RowClassParams,
  //RowClassParams,
} from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type { RowSelectedEvent } from 'ag-grid-community/dist/types/src/events'
import { Add, COPY, Edit, EditRow, Get, Get2 } from './CrudController.ts'
import { MASTERFILE } from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import { formEnum } from '../utils/FormEnum.tsx'
import { IFmodule, IModule, IWSTransaction } from '../Models.ts'
import { ILine, SaveProps, UseTransactionFormResult } from '../Props.ts'
import useForm from './UseForm.ts'
import { isArrayAndNotEmpty } from '../utils/Utils.ts'
import { TFunction } from 'i18next'
import { templateNames } from '../utils/XlsUtils.ts'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const UseTransactionForm = <
  T extends IWSTransaction<L>,
  L extends ILine
>(
  current_: T,
  initialLine: L,
  currentLine: L,
  setCurrentLine: Dispatch<SetStateAction<L>>,
  rowData: T[],
  setRowData: Dispatch<SetStateAction<T[]>>,
  model: number
): [UseTransactionFormResult<T, ILine>] => {
  // ── 1. useForm + all state hooks (unconditional) ────────────────────────
  const [{ profile, selected, language, handleLanguageChange, modelid, module_ }] = useForm()
  const { token, company, currency } = profile

  const [, setDisable] = useState(true)
  const [current, setCurrent] = useState<T>(current_)
  const [rows] = useState<bigint[]>([])
  const [, setModule] = useState<IModule[]>([])
  const [copyFromTransaction, setCopyFromTransaction] = useState<T[]>([])
  const [fmodule, setFmodule] = useState<IFmodule[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [gridApi, setGridApi] = useState<GridApi>()

  const init = useRef(false)
  const handleKeyPressRef = useRef<(e: KeyboardEvent) => void>(() => {})

  // ── 2. Derived ──────────────────────────────────────────────────────────
  const module_modelid = formEnum.MODULE
  const fmodule_modelid = formEnum.FMODULE
  const modifyUrl = selected
  const ctx = `${module_.ctx}/${modelid}/${company}`
  const module_ctx = `${MASTERFILE.module}/${module_modelid}/${company}`
  const fmodule_ctx = `${MASTERFILE.fmodule}/${fmodule_modelid}/${company}`
  const zIndex = 99999
  const EXPORT_FILE_EXTENSION = 'xlsx'

  // ── 3. Effects: store subscription + initial load ───────────────────────
  useEffect(() => {
    const subscription = iwsStore.subscribe((store) => {
      if (!init.current) {
        init.current = true
        setRowData(store.get(current_.modelid) as unknown as T[])
        Get(fmodule_ctx, token, fmodule_modelid, setFmodule)
        Get(module_ctx, token, module_modelid, setModule)
      }
    })
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current_.modelid, module_ctx, fmodule_ctx, token, fmodule_modelid, module_modelid])

  // ── 4. Handlers ─────────────────────────────────────────────────────────
  const buildPostCall = (
    rows: bigint[],
    current: T,
    modifyUrl: string,
    token: string,
    setCurrent: Dispatch<SetStateAction<T>>
  ) => {
    const ids = rows?.length > 0 ? rows : [current?.id]
    const url_ = `${modifyUrl}/post/${ids.join(',')}/${current?.modelid}/${current?.company}`
    Get2(url_, token, setCurrent)
  }

  const callSubmitPost = (
    event: any,
    modifyUrl: string,
    token: string,
    current: T,
    setCurrent: Dispatch<SetStateAction<T>>,
    rows: bigint[]
  ) => {
    event.preventDefault()
    buildPostCall(rows, current, modifyUrl, token, setCurrent)
  }

  const submitPost = (event: any) =>
    callSubmitPost(event, module_?.ctx, token, current, setCurrent, rows)

  const submitAdd = (event: any) => {
    event.preventDefault()
    const row: T = { ...current, modelid: model, company }
    Add(modifyUrl, token, row, rowData, setRowData, setCurrent)
  }

  const addLine = useCallback(
    (line: L, setCurrentFn: Dispatch<SetStateAction<T>>) => {
      setCurrentFn((prevCurrent: T) => {
        const newLine: L = {
          ...line,
          id: BigInt(-1),
          transid: prevCurrent?.id,
          company,
          modelid: prevCurrent.modelid,
        }
        const dx: T = { ...prevCurrent }
        if (Object.prototype.hasOwnProperty.call(dx, 'lines')) {
          dx.lines = [...dx.lines, newLine]
        } else {
          dx['lines'] = [{ ...newLine }]
        }
        if (gridApi) {
          gridApi.applyTransactionAsync({ add: [newLine] })
        }
        setCurrentLine({ ...newLine })
        return dx
      })
    },
    [company, gridApi, setCurrentLine]
  )

  const onNewLine = useCallback(() => addLine(initialLine, setCurrent), [addLine, initialLine])

  const onRemoveSelectedLine = useCallback(
    (event: any, current: T, setCurrent: Dispatch<SetStateAction<T>>) => {
      event.preventDefault()
      const dx: T = { ...current }
      if (!Object.prototype.hasOwnProperty.call(dx, 'lines')) dx['lines'] = []
      const idx = dx?.lines?.findIndex(
        (obj: ILine) => String(obj?.id) === String(currentLine?.id)
      )
      if (idx >= 0) dx.lines[idx] = { ...currentLine, transid: BigInt(-2) }
      gridApi?.applyTransaction({ remove: [currentLine] })
      setCurrent(dx)
    },
    [currentLine, gridApi]
  )

  const callSubmitEdit = async (
    event: any,
    modifyUrl: string,
    token: string,
    current: T,
    setCurrent: Dispatch<SetStateAction<T>>,
    data: T[],
    submitAdd: (arg: any) => void
  ) => {
    event.preventDefault()
    try {
      if (BigInt(current?.id ?? 0) > 0n) {
        const updated = await Edit(modifyUrl, token, current)
        if (!updated) return
        const index = data.findIndex(
          (obj: T) => String(obj?.id) === String(updated?.id)
        )
        if (index >= 0) {
          const newList = [...data]
          newList[index] = updated
          setRowData(newList)
        }
        setCurrent(updated)
      } else {
        submitAdd(event)
      }
    } catch (error) {
      console.error('Edit failed', error)
    }
  }

  const submitEdit = useCallback(
    (event: any) =>
      callSubmitEdit(event, modifyUrl, token, current, setCurrent, rowData, submitAdd),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modifyUrl, token, current, rowData]
  )

  const callSubmitCancel = async (
    event: any,
    _ctx: string,
    token: string,
    current: T,
    data: T[]
  ) => {
    event.preventDefault()
    const url_ = _ctx.replace('ltr', 'cancelnLtr')
    let updated: T
    if (BigInt(current.id ?? 0) > 0n) {
      updated = await Edit(url_, token, current)
    } else {
      updated = current
    }
    const index = data.findIndex(
      (obj: T) => String(obj?.id) === String(updated?.id)
    )
    if (index >= 0) {
      const newList = [...data]
      newList[index] = updated
      setRowData(newList)
    }
    return updated
  }

  const submitCancel = (event: any) =>
    callSubmitCancel(event, ctx, token, current, rowData)

  const onDeleteLine = async (event: any) => {
    onRemoveSelectedLine(event, current, setCurrent)
    let updated: T
    if (BigInt(current.id ?? 0) > 0n) {
      updated = await Edit(modifyUrl, token, current)
    } else {
      updated = current
    }
    const index = rowData.findIndex(
      (obj: T) => String(obj?.id) === String(updated?.id)
    )
    if (index >= 0) {
      const newList = [...rowData]
      newList[index] = updated
      setRowData(newList)
    }
  }

  const reload = useCallback(() => {
    iwsStore.deleteByModelId(current.modelid)
    Get(ctx, token, current.modelid, setRowData)
  }, [ctx, token, current.modelid, setRowData])

  const initAdd = () => {
    setDisable(false)
    const newLine = { ...initialLine, modelid: model, company }
    const currentN = { ...current_, modelid: model, lines: [newLine] }
    const newRow: T = { ...currentN, company, currency }
    setCurrentLine(newLine)
    EditRow(newRow, true, setCurrent)
  }

  const copyCall = async (id: BigInt, event: any) => {
    setDisable(false)
    const eventx: string[] = event.toString().split(' ')
    const modelidFrom = parseInt(eventx[1])
    const url = `${modifyUrl}x/${id}/${modelidFrom}/${model}/${company}`
    const record = await COPY(url, token, rowData, setRowData, setCurrent)
    setCurrent(record)
  }

  const onRowSelected = (event: RowSelectedEvent) => {
    if (!event?.data) return
    const transaction: T = isArrayAndNotEmpty(event.data) ? event.data[0] : event.data
    const line = transaction?.lines?.length > 0 ? transaction.lines[0] : initialLine
    setCurrentLine(line)
    setCurrent(prev =>
      String(prev?.id) === String(transaction?.id) ? prev : transaction
    )
  }

  // ── 5. Key handler: latest-ref pattern ──────────────────────────────────
  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case 112: // F1
        submitEdit(event)
        return
      case 113: // F2
        onNewLine()
        return
      case 114: // F3
        reload()
        return
      default:
        return
    }
  }
  handleKeyPressRef.current = handleKeyPress

  useEffect(() => {
    const listener = (e: KeyboardEvent) => handleKeyPressRef.current(e)
    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [])

  // ── 6. Export helpers ───────────────────────────────────────────────────
  const sheetName = 'Sheet1'
  const exportFileName = () => {
    const filenames_ = templateNames(current, fmodule)
    const filename1 = filenames_[0].split('.')[0]
    const filename2 = filenames_[1].split('.')[0]
    const names: [string, string] = [
      `${filename1}.${EXPORT_FILE_EXTENSION}`,
      `${filename2}.${EXPORT_FILE_EXTENSION}`,
    ]
    return names
  }
  const saveProps: SaveProps = {
    fileNames: exportFileName(),
    sheetName,
    data: current?.lines ?? [],
  }


  const gridOptions = (
    columnDefs: (t: TFunction<'transalation', undefined>, locale:string, currency:string ) => ColDef[], locale:string, currency:string
    , lineColumnDefs: (t: TFunction<'transalation', undefined>, locale:string, currency:string) => ColDef[]
    , t: TFunction<'transalation', undefined>
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
      columnDefs: columnDefs(t, locale, currency),
      detailCellRendererParams: {
        detailGridOptions: {
          getRowStyle: (params: RowClassParams<any>) => {
            if (params.node.rowIndex !== null && params.node.rowIndex % 2 === 0) {
              return { background: '#fff9e6' };
            }
            return undefined;
          },
          columnDefs: lineColumnDefs(t, locale, currency),
          defaultColDef: { flex: 1 },
        },
        getDetailRowData: (params: any) => {
          params.successCallback(params.data.lines);
        },
      } as IDetailCellRendererParams<T, L>,
    };
  };


  return [{
    language,
    fmodule,
    setFmodule,
    current,
    setCurrent,
    initAdd,
    reload,
    submitEdit,
    onRowSelected,
    onNewLine,
    copyFromTransaction,
    setCopyFromTransaction,
    onDeleteLine,
    submitCancel,
    submitPost,
    copyCall,
    setGridApi,
    templateName: templateNames,
    zIndex,
    handleLanguageChange,
    saveProps,
    modelid,
    isFetching,
    setIsFetching,
    gridOptions,
  }]
}

export default UseTransactionForm

import {
  Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore,
} from 'react'
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ColDef,
  GridApi,
  GridOptions,
  IDetailCellRendererParams,
  ModuleRegistry, RowClassParams,
} from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-expect-error -- legacy, see TODO
import type { RowSelectedEvent } from 'ag-grid-community/dist/types/src/events'
import { Add, COPY, Edit, EditRow, Get, Get2 } from './CrudController.ts'
import { MASTERFILE } from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import { formEnum } from '../utils/FormEnum.tsx'
import { IFmodule, IModule, IWSTransaction } from '../Models.ts'
import { ILine, SaveProps, UseTransactionFormResult } from '../Props.ts'
import useForm from './useForm.ts'
import { isArrayAndNotEmpty } from '../utils/Utils.ts'
import { TFunction } from 'i18next'
import { templateNames } from '../utils/XlsUtils.ts'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const useTransactionForm = <
  T extends IWSTransaction<L>,
  L extends ILine>(
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
  const [copyFromTransaction, setCopyFromTransaction] = useState<T[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [gridApi, setGridApi] = useState<GridApi>()

  const initRef = useRef(false)
  const handleKeyPressRef = useRef<(e: KeyboardEvent) => void>(() => {})

  const module_modelid = formEnum.MODULE
  const fmodule_modelid = formEnum.FMODULE
  const modifyUrl = selected
  // Guard against module_ being undefined on first render
  const ctx = module_?.ctx ? `${module_.ctx}/${modelid}/${company}` : ''
  const module_ctx = `${MASTERFILE.module}/${module_modelid}/${company}`
  const fmodule_ctx = `${MASTERFILE.fmodule}/${fmodule_modelid}/${company}`
  const zIndex = 99999
  const EXPORT_FILE_EXTENSION = 'xlsx'

  // ── 2. Reactive read of fmodule (replaces local state + subscription) ──
  const snapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  )

  const fmodule = useMemo<IFmodule[]>(() => {
    const inner = snapshot.get(fmodule_modelid)
    return inner ? (Array.from(inner.values()) as IFmodule[]) : []
  }, [snapshot, fmodule_modelid])

  // ── 3. Initial load: seed rowData from store if it already has entries,
  //       and fetch reference data (fmodule / module) if their stores are empty.
  useEffect(() => {
    if (!token) return

    // Seed the caller's rowData once from the store if it's populated
    if (!initRef.current) {
      const cached = iwsStore.getRawMap().get(current_.modelid)
      if (cached && cached.size > 0) {
        setRowData(Array.from(cached.values()) as unknown as T[])
      }
      initRef.current = true
    }

    const snap = iwsStore.getRawMap()

    const tryFetch = <X,>(mId: number, url: string) => {
      const inner = snap.get(mId)
      if (!inner || inner.size === 0) {
        Get(url, token, mId, (() => {}) as Dispatch<SetStateAction<X[]>>)
      }
    }

    tryFetch<IFmodule>(fmodule_modelid, fmodule_ctx)
    tryFetch<IModule>(module_modelid, module_ctx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, company, current_.modelid, fmodule_ctx, module_ctx, fmodule_modelid, module_modelid])

  const buildPostCall = (
    ids: bigint[],
    current: T,
    modifyUrl: string,
    token: string,
    setCurrent: Dispatch<SetStateAction<T>>
  ) => {
    const idsToUse = ids?.length > 0 ? ids : [current?.id]
    const url_ = `${modifyUrl}/post/${idsToUse.join(',')}/${current?.modelid}/${current?.company}`
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
    callSubmitPost(event, module_?.ctx ?? modifyUrl, token, current, setCurrent, rows)

  const submitAdd = (event: any) => {
    event.preventDefault()
    const row: T = { ...current, modelid: model, company }
    Add(modifyUrl, token, row, rowData, setRowData, setCurrent)
  }

  const addLine = (line: L, setCurrentFn: Dispatch<SetStateAction<T>>) => {
    setCurrentFn((prevCurrent: T) => {
      if (!prevCurrent) return prevCurrent
      const newLine: L = {
        ...line,
        id: BigInt(-1),
        transid: prevCurrent?.id,
        company,
        modelid: prevCurrent.modelid,
      }
      const dx: T = { ...prevCurrent }
      if (Object.prototype.hasOwnProperty.call(dx, 'lines')) {
        dx.lines = [...(dx.lines ?? []), newLine]
      } else {
        dx['lines'] = [{ ...newLine }]
      }
      if (gridApi) {
        gridApi.applyTransactionAsync({ add: [newLine] })
      }
      setCurrentLine({ ...newLine })
      return dx
    })
  }

  const onNewLine = () => addLine(initialLine, setCurrent)

  const onRemoveSelectedLine = (
    event: any,
    current: T,
    setCurrent: Dispatch<SetStateAction<T>>
  ) => {
    event.preventDefault()
    const dx: T = { ...current }
    if (!Object.prototype.hasOwnProperty.call(dx, 'lines')) dx['lines'] = []
    const idx = dx?.lines?.findIndex(
      (obj: ILine) => String(obj?.id) === String(currentLine?.id)
    )
    if (idx >= 0) dx.lines[idx] = { ...currentLine, transid: BigInt(-2) }
    gridApi?.applyTransaction({ remove: [currentLine] })
    setCurrent(dx)
  }

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

  const submitEdit = (event: any) =>
    callSubmitEdit(event, modifyUrl, token, current, setCurrent, rowData, submitAdd)

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
    callSubmitCancel(event, ctx || modifyUrl, token, current, rowData)

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

  const reload = () => {
    iwsStore.deleteByModelId(current.modelid)
    Get(ctx, token, current.modelid, setRowData)
  }

  const initAdd = () => {
    setDisable(false)
    const newLine = { ...initialLine, modelid: model, company }
    const currentN = { ...current_, modelid: model, lines: [newLine] }
    const newRow: T = { ...currentN, company, currency }
    setCurrentLine(newLine)
    EditRow(newRow, true, setCurrent)
  }

  const copyCall = async (id: bigint, event: any) => {
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

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case 112: submitEdit(event); return
      case 113: onNewLine(); return
      case 114: reload(); return
      default: return
    }
  }

  // Latest-ref pattern — the listener stays stable, the ref always points
  // at the freshest handler. No useCallback needed.
  useEffect(() => {
    handleKeyPressRef.current = handleKeyPress
  })

  useEffect(() => {
    const listener = (e: KeyboardEvent) => handleKeyPressRef.current(e)
    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [])

  const sheetName = 'Sheet1'
  const exportFileName = useCallback(() => {
    const filenames_ = templateNames(current, fmodule)
    const filename1 = filenames_[0].split('.')[0]
    const filename2 = filenames_[1].split('.')[0]
    const names: [string, string] = [
      `${filename1}.${EXPORT_FILE_EXTENSION}`,
      `${filename2}.${EXPORT_FILE_EXTENSION}`,
    ]
    return names
  }, [current, fmodule])

  const saveProps: SaveProps <L> = {
    fileNames: exportFileName(),
    sheetName,
    data: current?.lines ?? [],
  }

  const gridOptions = (
    columnDefs: (t: TFunction<'transalation', undefined>, locale: string, currency: string) => ColDef[],
    locale: string,
    currency: string,
    lineColumnDefs: (t: TFunction<'transalation', undefined>, locale: string, currency: string) => ColDef[],
    t: TFunction<'transalation', undefined>
  ): GridOptions<T> => {
    return {
      rowStyle: { background: 'lightBlue' },
      getRowStyle: (params: RowClassParams<T>) => {
        if (params.node.rowIndex !== null && params.node.rowIndex % 2 === 0) {
          return { background: '#fff9e6' };
        }
        return undefined;
      },

      defaultColDef: {
        resizable: true,
        editable: false,
        flex: 1,
        filter: true,
      },
      rowHeight: 20,
      rowSelection: {
        mode: 'multiRow',
        checkboxes: true,
        copySelectedRows: true,
      },
      paginationPageSizeSelector: [5, 10, 20, 50],
      pagination: true,
      paginationPageSize: 10,
      detailRowAutoHeight: true,
      autoSizeStrategy: {
        type: 'fitGridWidth' as const,
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
    setFmodule: () => {},   // kept for API compat; fmodule is now reactive
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

export default useTransactionForm

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  PinnedRowModule,
} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-expect-error -- legacy, see TODO
import type { RowSelectedEvent } from 'ag-grid-community/dist/types/src/events'
import { Get } from './CrudController'
import { ARTICLE_ACCOUNT_QUERY_PARM, MASTERFILE } from './Menu'
import { formEnum } from '../utils/FormEnum'
import { IJournalProps, UseArticleAccountResult } from '../Props.ts'
import { IArticle, IFmodule, IModule, IStore } from '../Models.ts'
import useForm from './useForm.ts'
import iwsStore from '../utils/Store.tsx'

ModuleRegistry.registerModules([
  AllCommunityModule, ClientSideRowModelModule, PinnedRowModule,
])

export const styles = {
  inner: {
    borderRadius: 5,
    boxShadow: '0 20px 50px #BBF',
    padding: 10,
    paddingTop: 30,
    paddingRight: 5,
    paddingBottom: 3,
  },
  inner2: {
    borderRadius: 5,
    boxShadow: '0 20px 50px #BBF',
    paddingTop: 5,
    paddingLeft: 1,
    paddingRight: 2,
  },
}

const useArticleAccountForm = <T,>(): [UseArticleAccountResult<T>] => {
  const [{ profile, menu, selected, t, title, modelid, module_ }] = useForm()
  const { token, currency, company } = profile

  const art_modelid = formEnum.ARTICLE
  const store_modelid = formEnum.STORE
  const module_modelid = formEnum.MODULE
  const fmodule_modelid = formEnum.FMODULE

  const art_ctx = `${MASTERFILE.article}/${art_modelid}/${company}`
  const store_ctx = `${MASTERFILE.store}/${store_modelid}/${company}`
  const module_ctx = `${MASTERFILE.module}/${module_modelid}/${company}`
  const fmodule_ctx = `${MASTERFILE.fmodule}/${fmodule_modelid}/${company}`

  const current_: IJournalProps = {
    ...ARTICLE_ACCOUNT_QUERY_PARM,
    modelid: modelid,
    currency: currency ?? '',
  }
  const [current, setCurrent] = useState<IJournalProps>(current_)

  // ── Reactive store snapshot ─────────────────────────────────────────────
  const snapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  )

  const articleData = useMemo<IArticle[]>(() => {
    const inner = snapshot.get(art_modelid)
    return inner ? (Array.from(inner.values()) as IArticle[]) : []
  }, [snapshot, art_modelid])

  const storeData = useMemo<IStore[]>(() => {
    const inner = snapshot.get(store_modelid)
    return inner ? (Array.from(inner.values()) as IStore[]) : []
  }, [snapshot, store_modelid])

  const fmodule = useMemo<IFmodule[]>(() => {
    const inner = snapshot.get(fmodule_modelid)
    return inner ? (Array.from(inner.values()) as IFmodule[]) : []
  }, [snapshot, fmodule_modelid])

  // rowData is whatever query result was written into the store under `modelid`
  const rowData = useMemo<T[]>(() => {
    const inner = snapshot.get(modelid)
    return inner ? (Array.from(inner.values()) as T[]) : []
  }, [snapshot, modelid])

  // Write-through setRowData (kept for API compatibility)
  const setRowData = useCallback(
    (value: React.SetStateAction<T[]>) => {
      if (typeof value === 'function') {
        const inner = iwsStore.getRawMap().get(modelid)
        const base = inner ? (Array.from(inner.values()) as T[]) : []
        const next = (value as (p: T[]) => T[])(base)
        next.forEach(item => iwsStore.set(item as any))
      } else {
        value.forEach(item => iwsStore.set(item as any))
      }
    },
    [modelid]
  )

  // Initial load of reference data — only if empty
  useEffect(() => {
    if (!token) return
    const snap = iwsStore.getRawMap()

    const tryFetch = <X,>(modelId: number, ctx: string) => {
      const inner = snap.get(modelId)
      if (!inner || inner.size === 0) {
        Get(ctx, token, modelId, (() => {}) as React.Dispatch<React.SetStateAction<X[]>>)
      }
    }

    tryFetch<IArticle>(art_modelid, art_ctx)
    tryFetch<IStore>(store_modelid, store_ctx)
    tryFetch<IModule>(module_modelid, module_ctx)
    tryFetch<IFmodule>(fmodule_modelid, fmodule_ctx)
  }, [
    token, company,
    art_ctx, store_ctx, module_ctx, fmodule_ctx,
    art_modelid, store_modelid, module_modelid, fmodule_modelid,
  ])

  const fromPeriod =
    current.fromPeriod === -1
      ? `${current.toPeriod.toString().substring(0, 4)}00`
      : current.fromPeriod

  const buildUrl = (current: IJournalProps) =>
    `${module_.ctx}/${company}/${current.store}/${current.article}/${fromPeriod}/${current.toPeriod}`

  const submitQuery = (event: any, current: IJournalProps) => {
    event.preventDefault()
    Get(buildUrl(current), token, modelid, setRowData)
  }

  const onRowSelected = (event: RowSelectedEvent) =>
    setCurrent(event.data instanceof Array ? event.data[0] : event.data)

  return [{
    profile, menu, selected, t,
    articleData, storeData, rowData, setRowData,
    current_, current, setCurrent,
    fmodule, submitQuery, onRowSelected,
    title, styles,
  }]
}

export default useArticleAccountForm

import { useEffect, useMemo, useSyncExternalStore } from 'react'
import { AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { initArticle, MASTERFILE } from './Menu'

import { ArticleTabs } from './ArticleTabs.tsx'
import { formEnum } from '../utils/FormEnum'
import { Get } from './CrudController.ts'
import { articleColumnDefs } from '../ColumnsDefs.ts'
import { IAccount, IArticle, IMasterfile, IVat } from '../Models.ts'
import UseMasterfileForm from './useMasterfileForm.tsx'
import useForm from './useForm.ts'
import Login from './Login.tsx'
import { MasterfileFormShell } from './MasterfileFormShell.tsx'
import iwsStore from '../utils/Store.tsx'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const ArticleForm = () => {
  const [{ profile, t, module_ }] = useForm()

  const { token, company, locale, currency, stockAcc, expenseAcc, revenueAcc, vat } = profile

  const acc_modelid = formEnum.ACCOUNT
  const vat_modelid = formEnum.VAT
  const qttyUnit_modelid = formEnum.QUANTITYUNIT
  const group_modelid = formEnum.ARTICLE_GROUP
  const ccy_modelid = formEnum.CURRENCY

  const initialState: IArticle = {
    ...initArticle,
    account: stockAcc ?? '',
    oaccount: expenseAcc ?? '',
    revenueAccount: revenueAcc ?? '',
    vatCode: vat ?? '',
    currency: currency ?? '',
    stocks: [],
  }
  const current_: IArticle = initialState

  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const vat_ctx = `${MASTERFILE.vat}/${vat_modelid}/${company}`
  const qttyUnit_ctx = `${MASTERFILE.masterfile}/${qttyUnit_modelid}/${company}`
  const group_ctx = `${MASTERFILE.masterfile}/${group_modelid}/${company}`
  const ccy_ctx = `${MASTERFILE.masterfile}/${ccy_modelid}/${company}`

  const height = 33
  const colDef: ColDef[] = articleColumnDefs(t, locale ?? 'fr-FR', currency ?? 'EUR')

  // ── Reactive store reads ────────────────────────────────────────────────
  const snapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  )

  const accData = useMemo<IAccount[]>(() => {
    const inner = snapshot.get(acc_modelid)
    return inner ? (Array.from(inner.values()) as IAccount[]) : []
  }, [snapshot, acc_modelid])

  const groupData = useMemo<IMasterfile[]>(() => {
    const inner = snapshot.get(group_modelid)
    return inner ? (Array.from(inner.values()) as IMasterfile[]) : []
  }, [snapshot, group_modelid])

  const quantityUnitData = useMemo<IMasterfile[]>(() => {
    const inner = snapshot.get(qttyUnit_modelid)
    return inner ? (Array.from(inner.values()) as IMasterfile[]) : []
  }, [snapshot, qttyUnit_modelid])

  const vatData = useMemo<IVat[]>(() => {
    const inner = snapshot.get(vat_modelid)
    return inner ? (Array.from(inner.values()) as IVat[]) : []
  }, [snapshot, vat_modelid])

  const ccyData = useMemo<IMasterfile[]>(() => {
    const inner = snapshot.get(ccy_modelid)
    return inner ? (Array.from(inner.values()) as IMasterfile[]) : []
  }, [snapshot, ccy_modelid])

  const { header, body, table, disable, state, rowData, current, setCurrent, zIndex } =
    UseMasterfileForm<IArticle>(current_, colDef, MASTERFILE.article)

  // Fire-and-forget related store fetches — only if empty
  useEffect(() => {
    if (!token) return
    const snap = iwsStore.getRawMap()

    const tryFetch = <T,>(modelId: number, ctx: string) => {
      const inner = snap.get(modelId)
      if (!inner || inner.size === 0) {
        Get(ctx, token, modelId, (() => {}) as React.Dispatch<React.SetStateAction<T[]>>)
      }
    }

    tryFetch<IAccount>(acc_modelid, acc_ctx)
    tryFetch<IMasterfile>(group_modelid, group_ctx)
    tryFetch<IMasterfile>(qttyUnit_modelid, qttyUnit_ctx)
    tryFetch<IVat>(vat_modelid, vat_ctx)
    tryFetch<IMasterfile>(ccy_modelid, ccy_ctx)
  }, [
    token, company,
    acc_ctx, group_ctx, qttyUnit_ctx, vat_ctx, ccy_ctx,
    acc_modelid, group_modelid, qttyUnit_modelid, vat_modelid, ccy_modelid,
  ])

  const mainForm = (
    <ArticleTabs
      collapse={state.collapseForm}
      current={current}
      setCurrent={setCurrent}
      disable={disable}
      t={t}
      data={rowData}
      accData={accData}
      quantityUnitData={quantityUnitData}
      locale={`${locale}`}
      currency={`${currency}`}
      vatData={vatData}
      groupData={groupData}
      ccyData={ccyData}
      height={height}
      zIndex={zIndex - 1}
    />
  )

  // ── Early return AFTER all hooks ────────────────────────────────────────
  if (module_ === '11111' || module_ === 11111) return <Login />

  return (
    <MasterfileFormShell
      header={header}
      body={body}
      table={table}
      state={state}
      minHeight={400}
      maxHeight={700}
      mainForm={mainForm}
    />
  )
}

export default ArticleForm

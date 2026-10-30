import { useEffect, useMemo, useSyncExternalStore } from 'react'
import { AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-expect-error -- legacy, see TODO
import type { RowSelectedEvent } from 'ag-grid-community/dist/types/src/events'
import { AssetMainForm } from './AssetMainForm'
import { Get } from './CrudController'
import { initAsset, MASTERFILE } from './Menu'
import { formEnum } from '../utils/FormEnum'
import { assetColumnDefs } from '../ColumnsDefs.ts'
import { IAccount, IAsset, IMasterfile } from '../Models.ts'
import UseMasterfileForm from './useMasterfileForm.tsx'
import useForm from './useForm.ts'
import Login from './Login.tsx'
import { MasterfileFormShell } from './MasterfileFormShell.tsx'
import iwsStore from '../utils/Store.tsx'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const AssetForm = () => {
  const [{ profile, t, module_ }] = useForm()

  const { token, company, locale, currency } = profile
  const currencyx = currency ?? 'EUR'

  const acc_modelid = formEnum.ACCOUNT
  const ccy_modelid = formEnum.CURRENCY
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const ccy_ctx = `${MASTERFILE.masterfile}/${ccy_modelid}/${company}`

  const current_: IAsset = initAsset
  const height = 30
  const colDef: ColDef[] = assetColumnDefs(t, locale ?? 'fr-FR', currency ?? 'EUR')

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

  const ccyData = useMemo<IMasterfile[]>(() => {
    const inner = snapshot.get(ccy_modelid)
    return inner ? (Array.from(inner.values()) as IMasterfile[]) : []
  }, [snapshot, ccy_modelid])

  const { header, body, table, disable, state, current, setCurrent } =
    UseMasterfileForm<IAsset>(current_, colDef, MASTERFILE.asset)

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
    tryFetch<IMasterfile>(ccy_modelid, ccy_ctx)
  }, [token, company, acc_ctx, ccy_ctx, acc_modelid, ccy_modelid])

  // Sync current when module changes
  useEffect(() => {
    setCurrent(current ?? current_)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module_?.state])

  // ── Early return AFTER all hooks ────────────────────────────────────────
  if (module_ === '11111' || module_ === 11111) return <Login />

  const mainForm = AssetMainForm({
    collapse: state.collapseForm,
    current,
    setCurrent,
    disable,
    t,
    accData,
    ccyData,
    height,
    locale: locale ?? 'fr-FR',
    currency: currencyx,
    zIndex: 9999,
  })

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

export default AssetForm

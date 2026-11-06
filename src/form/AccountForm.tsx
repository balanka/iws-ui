import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { initAcc, MASTERFILE } from './Menu.tsx'
import { AccountMainForm } from './AccountMainForm.tsx'
import { accountColumnDefs } from '../ColumnsDefs.ts'
import {IAccount, IMasterfile} from '../Models.ts'
import useMasterfileForm from './useMasterfileForm.tsx'
import useForm from './useForm.ts'
import { MasterfileFormShell } from './MasterfileFormShell.tsx'
import {useEffect, useMemo, useSyncExternalStore} from "react";
import {formEnum} from "../utils/FormEnum.tsx";
import iwsStore from "../utils/Store.tsx";
import {Get} from "./CrudController.ts";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const AccountForm = () => {
  const [{ profile, t, company }] = useForm()
  const { locale, token } = profile
  const ccy_modelid = formEnum.CURRENCY
  const ccy_ctx = `${MASTERFILE.masterfile}/${ccy_modelid}/${company}`

  const height = 33
  const current_: IAccount = initAcc
  const colDef = accountColumnDefs(t)

  // ── Reactive store reads ────────────────────────────────────────────────
  const snapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  )
  const ccyData = useMemo<IMasterfile[]>(() => {
    const inner = snapshot.get(ccy_modelid)
    return inner ? (Array.from(inner.values()) as IMasterfile[]) : []
  }, [snapshot, ccy_modelid])


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
    tryFetch<IMasterfile>(ccy_modelid, ccy_ctx)
  }, [token, company, ccy_ctx, ccy_modelid])
  const {
    header, body, table, disable, state, rowData, current, setCurrent,
  } = useMasterfileForm<IAccount>(current_, colDef, MASTERFILE.acc)

  const mainForm = (
    <AccountMainForm
      collapse={state.collapseForm}
      current={current}
      setCurrent={setCurrent}
      accData={rowData}
      currencyData={ccyData}
      t={t}
      locale={`${locale}`}
      disable={disable}
      height={height}
    />
  )

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

export default AccountForm

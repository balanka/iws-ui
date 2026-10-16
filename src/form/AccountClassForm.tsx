import React, { useEffect, useMemo, useSyncExternalStore } from 'react'
import { AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-ignore
import type { RowSelectedEvent } from 'ag-grid-community/dist/types/src/events'
import { MasterfileFormWithout } from './MasterfileFormWithout'
import { Get } from './CrudController'
import { initAcc, MASTERFILE } from './Menu'
import { formEnum } from '../utils/FormEnum'
import { masterfileColumnDefs } from '../ColumnsDefs.ts'
import { IAccount, IMasterfile2 } from '../Models.ts'
import Login from './Login'
import UseMasterfileForm from './useMasterfileForm.tsx'
import useForm from './useForm.ts'
import { styles } from './BasicTreeTableProps.tsx'
import iwsStore from '../utils/Store.tsx'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const AccountClassForm = () => {
  const [{ profile, t, modelid, company, module_ }] = useForm()
  const { token } = profile

  const current_: IMasterfile2 = module_.state

  const acc_modelid = formEnum.ACCOUNT
  const acc_ctx = `${modelid === formEnum.COSTCENTER ? MASTERFILE.acc : -1}/${acc_modelid}/${company}`
  const canFetchAcc = !acc_ctx.includes('-1')

  const minHeight = 400
  const maxHeight = 700
  const height = 20
  const colDef: ColDef[] = masterfileColumnDefs(t)

  // ── Reactive store read for accounts ────────────────────────────────────
  const snapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  )

  const accData = useMemo<IAccount[]>(() => {
    const inner = snapshot.get(acc_modelid)
    return inner ? (Array.from(inner.values()) as IAccount[]) : [initAcc]
  }, [snapshot, acc_modelid])

  const { header, body, table, disable, state, current, setCurrent } =
    UseMasterfileForm<IMasterfile2>(current_, colDef, MASTERFILE.accountClass)

  // Sync current when module_.state changes
  useEffect(() => {
    setCurrent(current_)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module_?.state])

  // Fire-and-forget account fetch — only if empty
  useEffect(() => {
    if (!token || !canFetchAcc) return
    const inner = iwsStore.getRawMap().get(acc_modelid)
    if (!inner || inner.size === 0) {
      Get(acc_ctx, token, acc_modelid, (() => {}) as React.Dispatch<React.SetStateAction<IAccount[]>>)
    }
  }, [token, acc_ctx, acc_modelid, canFetchAcc])

  // ── Early return AFTER all hooks ────────────────────────────────────────
  if (module_ === '11111' || module_ === 11111) return <Login />

  const safeBody = React.isValidElement(body) ? body : null
  const mainForm = MasterfileFormWithout({
    collapse: state.collapseForm,
    current: current ?? current_,
    setCurrent,
    height,
    accData,
    t,
    disable,
    fieldName: t('common.account'),
    propertyName: 'account',
  })

  return (
    <>
      {header}
      {safeBody ? safeBody : mainForm}
      <div
        style={{
          ...styles.outer0,
          paddingTop: 15,
          height: state.collapseForm ? minHeight : maxHeight,
          minWidth: '100%',
          display: state.collapseTable ? '' : 'none',
        }}
      >
        {table}
      </div>
    </>
  )
}

export default AccountClassForm

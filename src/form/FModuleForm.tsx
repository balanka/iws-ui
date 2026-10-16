import React, { useEffect, useMemo, useSyncExternalStore } from 'react'
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-ignore
import type { RowSelectedEvent } from 'ag-grid-community/dist/types/src/events'
import { FModuleMainForm } from './FModuleMainForm'
import { Get } from './CrudController'
import { MASTERFILE } from './Menu'
import { formEnum } from '../utils/FormEnum'
import { fmoduleColumnDefs } from '../ColumnsDefs.ts'
import { IFmodule, IMasterfile2 } from '../Models.ts'
import useForm from './useForm.ts'
import useMasterfileForm from './useMasterfileForm.tsx'
import { styles } from './BasicTreeTableProps.tsx'
import { CInputGroup } from '@coreui/react-pro'
import Login from './Login.tsx'
import iwsStore from '../utils/Store.tsx'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const FModuleForm = () => {
  const [{ profile, t, module_, company }] = useForm()
  const { token } = profile

  const parent_modelid = module_?.modelid
  const parent_ctx = `${module_?.state3}/${company}`
  const acc_ctx = `${MASTERFILE.acc}/${formEnum.ACCOUNT}/${company}`

  const current_: IFmodule = module_.state

  const height = 33
  const minHeight = 400
  const maxHeight = 700
  const colDef = fmoduleColumnDefs(t)

  // ── Reactive store reads ────────────────────────────────────────────────
  const snapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  )

  const accData = useMemo<IMasterfile2[]>(() => {
    if (parent_modelid === undefined) return []
    const inner = snapshot.get(parent_modelid)
    return inner ? (Array.from(inner.values()) as IMasterfile2[]) : []
  }, [snapshot, parent_modelid])

  const accountData = useMemo<IMasterfile2[]>(() => {
    const inner = snapshot.get(formEnum.ACCOUNT)
    return inner ? (Array.from(inner.values()) as IMasterfile2[]) : []
  }, [snapshot])

  const { header, body, table, disable, state, rowData, current, setCurrent } =
    useMasterfileForm<IFmodule>(current_, colDef, MASTERFILE.fmodule)

  // Fire-and-forget related store fetches — only if empty
  useEffect(() => {
    if (!token) return
    const snap = iwsStore.getRawMap()

    const tryFetch = <T,>(modelId: number | undefined, ctx: string) => {
      if (modelId === undefined) return
      const inner = snap.get(modelId)
      if (!inner || inner.size === 0) {
        Get(ctx, token, modelId, (() => {}) as React.Dispatch<React.SetStateAction<T[]>>)
      }
    }

    tryFetch<IMasterfile2>(formEnum.ACCOUNT, acc_ctx)
    tryFetch<IMasterfile2>(parent_modelid, parent_ctx)
  }, [token, company, acc_ctx, parent_ctx, parent_modelid])

  // Sync current when module changes
  useEffect(() => {
    setCurrent(current_)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module_?.state])

  // ── Early return AFTER all hooks ────────────────────────────────────────
  if (module_ === '11111' || module_ === 11111) return <Login />

  const filteredAccData = accData.filter(m => {
    const id = parseInt(m.id.toString())
    return id === formEnum.FINANCIALS || id === formEnum.TRANSACTION
  })

  const mainForm = FModuleMainForm({
    collapse: state.collapseForm,
    current,
    setCurrent,
    accData: filteredAccData,
    accountData,
    rowData,
    disable,
    height,
    t,
  })

  const safeBody = React.isValidElement(body) ? body : null

  return (
    <>
      {header}
      <CInputGroup
        // @ts-ignore
        style={{ ...styles.outer, display: !state.collapseForm ? 'none' : '', width: '100%' }}
      >
        {safeBody ?? mainForm}
      </CInputGroup>
      <div
        style={{
          ...styles.outer0,
          paddingTop: 15,
          height: state.collapseForm ? minHeight : maxHeight,
          width: '100%',
          display: state.collapseTable ? '' : 'none',
        }}
      >
        {table}
      </div>
    </>
  )
}

export default FModuleForm

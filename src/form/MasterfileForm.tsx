import React, { useEffect, useMemo, useSyncExternalStore } from 'react'
import { AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-ignore
import type { RowSelectedEvent } from 'ag-grid-community/dist/types/src/events'
import { Get } from './CrudController'
import { MASTERFILE } from './Menu'
import { formEnum } from '../utils/FormEnum'
import { masterfileColumnDefs, userColumnDefs } from '../ColumnsDefs.ts'
import { IMasterfile, IMasterfile2 } from '../Models.ts'
import useForm from './useForm.ts'
import UseMasterfileForm from './useMasterfileForm.tsx'
import { styles } from './BasicTreeTableProps.tsx'
import { CInputGroup } from '@coreui/react-pro'
import { MasterfileFormWithChildren } from './MasterfileFormWithChildren'
import Login from './Login.tsx'
import { isLoaded } from '../utils/FormUtils.tsx'
import iwsStore from '../utils/Store.tsx'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const MasterfileForm = () => {
  const [{ profile, t, modelid, company, module_ }] = useForm()
  const { token } = profile

  const url = MASTERFILE.masterfile
  const ctx = `${url}/${modelid}/${company}`
  const current_: IMasterfile = module_?.state ?? ({} as IMasterfile)

  const coldef: ColDef[] = (formEnum.USER === modelid)
    ? userColumnDefs(t)
    : masterfileColumnDefs(t)

  const minHeight = 350
  const maxHeight = 700
  const height = 28

  // ── Reactive store read for children ────────────────────────────────────
  const snapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  )

  const accData = useMemo<IMasterfile2[]>(() => {
    const mId = module_?.modelid
    if (mId === undefined) return []
    const inner = snapshot.get(mId)
    return inner ? (Array.from(inner.values()) as IMasterfile2[]) : []
  }, [snapshot, module_?.modelid])

  const { header, body, table, disable, state, current, setCurrent } =
    UseMasterfileForm<IMasterfile>(current_, coldef, MASTERFILE.masterfile)

  // Fire-and-forget fetch — only if empty
  useEffect(() => {
    if (!token) return
    const mId = module_?.modelid
    if (mId === undefined) return
    if (!isLoaded(mId)) {
      Get(ctx, token, mId, (() => {}) as React.Dispatch<React.SetStateAction<IMasterfile2[]>>)
    }
  }, [token, ctx, module_?.modelid])

  // Sync current when module changes
  useEffect(() => {
    setCurrent(current_)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module_?.state])

  // ── Early return AFTER all hooks ────────────────────────────────────────
  if (module_ === '11111' || module_ === 11111) return <Login />

  const safeBody = React.isValidElement(body) ? body : null

  return (
    <>
      {header}
      <CInputGroup
        // @ts-ignore
        style={{ ...styles.outer, width: '100%', display: !state.collapseForm ? 'none' : '' }}
      >
        {safeBody ?? (
          <MasterfileFormWithChildren
            // @ts-ignore
            current={current}
            setCurrent={setCurrent}
            accData={accData}
            t={t}
            disable={disable}
            height={height}
            fieldName={t('fmodule.parent')}
            propertyName="parent"
          />
        )}
      </CInputGroup>
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

export default MasterfileForm

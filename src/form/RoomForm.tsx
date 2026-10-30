import { useEffect, useMemo, useSyncExternalStore } from 'react'
import { AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-expect-error -- legacy, see TODO
import type { RowSelectedEvent } from 'ag-grid-community/dist/types/src/events'
import { MasterfileFormWithout } from './MasterfileFormWithout'
import { MASTERFILE } from './Menu'
import { masterfileColumnDefs } from '../ColumnsDefs.ts'
import useForm from './useForm.ts'
import UseMasterfileForm from './useMasterfileForm.tsx'
import { Get } from './CrudController.ts'
import { IMasterfile2 } from '../Models.ts'
import { formEnum } from '../utils/FormEnum.tsx'
import Login from './Login.tsx'
import { MasterfileFormShell } from './MasterfileFormShell.tsx'
import iwsStore from '../utils/Store.tsx'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const RoomForm = () => {
  const [{ profile, t, company, module_ }] = useForm()
  const { token } = profile

  const url = MASTERFILE.apartment
  const apartmentModelId = formEnum.APARTMENT
  const ctx = `${url}/${apartmentModelId}/${company}`

  const height = 33
  const current_ = module_?.state ?? ({} as IMasterfile2)
  const colDef: ColDef[] = masterfileColumnDefs(t)

  // ── Reactive store read for parents ─────────────────────────────────────
  const snapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  )

  const accData = useMemo<IMasterfile2[]>(() => {
    const inner = snapshot.get(apartmentModelId)
    return inner ? (Array.from(inner.values()) as IMasterfile2[]) : []
  }, [snapshot, apartmentModelId])

  const { header, body, table, disable, state, current, setCurrent } =
    UseMasterfileForm<IMasterfile2>(current_, colDef, MASTERFILE.room)

  // Fire-and-forget parent fetch — only if empty
  useEffect(() => {
    if (!token) return
    const inner = iwsStore.getRawMap().get(apartmentModelId)
    if (!inner || inner.size === 0) {
      Get(ctx, token, apartmentModelId, (() => {}) as React.Dispatch<React.SetStateAction<IMasterfile2[]>>)
    }
  }, [token, company, ctx, apartmentModelId])

  // Sync current when module changes
  useEffect(() => {
    setCurrent(current_)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module_?.state])

  // ── Early return AFTER all hooks ────────────────────────────────────────
  if (module_ === '11111' || module_ === 11111) return <Login />

  const mainForm = MasterfileFormWithout({
    collapse: state.collapseForm,
    current: current ?? current_,
    setCurrent,
    disable,
    height,
    accData,
    t,
    fieldName: t('common.parent'),
    propertyName: 'parent',
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

export default RoomForm

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
import { MasterfileFormShell } from './MasterfileFormShell.tsx'
import iwsStore from '../utils/Store.tsx'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const ApartmentForm = () => {
  const [{ profile, t, company, module_ }] = useForm()
  const { token } = profile

  const url = MASTERFILE.realEstate
  const realEstateModelId = formEnum.REALESTATE
  const ctx = `${url}/${realEstateModelId}/${company}`

  const height = 33
  const current_ = module_.state
  const colDef: ColDef[] = masterfileColumnDefs(t)

  // ── Reactive store read for parent (real estate) rows ───────────────────
  const snapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  )

  const accData = useMemo<IMasterfile2[]>(() => {
    const inner = snapshot.get(realEstateModelId)
    return inner ? (Array.from(inner.values()) as IMasterfile2[]) : []
  }, [snapshot, realEstateModelId])

  const { header, body, table, disable, state, current, setCurrent } =
    UseMasterfileForm<IMasterfile2>(current_, colDef, MASTERFILE.apartment)

  // Sync current when module_.state changes
  useEffect(() => {
    setCurrent(current_)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module_?.state])

  // Fire-and-forget parent fetch — only if store is empty
  useEffect(() => {
    if (!token) return
    const inner = iwsStore.getRawMap().get(realEstateModelId)
    if (!inner || inner.size === 0) {
      Get(ctx, token, realEstateModelId, (() => {}) as React.Dispatch<React.SetStateAction<IMasterfile2[]>>)
    }
  }, [token, company, ctx, realEstateModelId])

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

export default ApartmentForm

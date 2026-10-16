import { AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type { RowSelectedEvent } from 'ag-grid-community/dist/types/src/events'
import { MasterfileFormWithout } from './MasterfileFormWithout'
import { initRealEstate, MASTERFILE } from './Menu'
import { masterfileColumnDefs } from '../ColumnsDefs.ts'
import useForm from './useForm.ts'
import useMasterfileForm from './useMasterfileForm.tsx'
import { MasterfileFormShell } from './MasterfileFormShell.tsx'
import type { IRealEstate} from '../Models.ts'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const RealEstateForm = () => {
  const [{ t }] = useForm()

  const height = 33
  const current_: IRealEstate = initRealEstate
  const minHeight = 450
  const maxHeight = 550
  const colDef: ColDef[] = masterfileColumnDefs(t)

  const { header, body, table, disable, state, current, setCurrent } =
    useMasterfileForm<IRealEstate>(current_, colDef, MASTERFILE.realEstate)

  const mainForm = (
    <MasterfileFormWithout
      collapse={state.collapseForm}
      current={current ?? current_}
      setCurrent={setCurrent}
      accData={[]}
      t={t}
      disable={disable}
      height={height}
      propertyName={'parent'}
      fieldName={t('common.parent')}
    />
  )

  return (
    <MasterfileFormShell
      header={header}
      body={body}
      table={table}
      state={state}
      minHeight={minHeight}
      maxHeight={maxHeight}
      mainForm={mainForm}
    />
  )
}

export default RealEstateForm

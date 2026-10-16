import { AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type { RowSelectedEvent } from 'ag-grid-community/dist/types/src/events'
import { MASTERFILE } from './Menu'
import useForm from './useForm.ts'
import { PermissionMainForm } from './PermissionMainForm.tsx'
import { permissionColumnDefs } from '../ColumnsDefs.ts'
import { MasterfileFormShell } from './MasterfileFormShell.tsx'
import useMasterfileForm from './useMasterfileForm.tsx'
import type {IMasterfile, IPermission} from '../Models.ts'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const PermissionForm = () => {
  const [{ t, module_ }] = useForm()

  const height = 20
  const current_ = module_?.state ?? ({} as IMasterfile)
  const coldef: ColDef[] = permissionColumnDefs(t)

  const {
    header, body, table, disable, state, current, setCurrent} = useMasterfileForm<IMasterfile>(current_, coldef, MASTERFILE.perm)

  const mainForm = (
    <PermissionMainForm
      collapse={state.collapseForm}
      current={current as IPermission}
      setCurrent={setCurrent}
      disable={disable}
      t={t}
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

export default PermissionForm

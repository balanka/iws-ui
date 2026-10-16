import { ColDef } from 'ag-grid-community'
import { MASTERFILE } from './Menu'
import { masterfileColumnDefs } from '../ColumnsDefs.ts'
import { IRole } from '../Models.ts'
import useForm from './useForm.ts'
import useMasterfileForm from './useMasterfileForm.tsx'
import RoleTabs from './RoleTabs.tsx'
import { MasterfileFormShell } from './MasterfileFormShell.tsx'

const RoleForm = () => {
  const [{ t, module_ }] = useForm()

  const height = 33
  const current_: IRole = module_?.state ?? ({} as IRole)
  const coldef: ColDef[] = masterfileColumnDefs(t)

  const {
    header, body, table, disable, state, current, setCurrent,
  } = useMasterfileForm<IRole>(current_, coldef, MASTERFILE.role)

  const mainForm = (
    <RoleTabs
      collapse={state.collapseForm}
      current={current}
      setCurrent={setCurrent}
      t={t}
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

export default RoleForm

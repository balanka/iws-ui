import { AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-ignore
import type { RowSelectedEvent } from 'ag-grid-community/dist/types/src/events'
import { userColumnDefs } from '../ColumnsDefs.ts'
import { IUser } from '../Models.ts'
import UserTabs from './UserTabs.tsx'
import useForm from './useForm.ts'
import useMasterfileForm from './useMasterfileForm.tsx'
import { styles } from './BasicTreeTableProps.tsx'
import Login from './Login.tsx'
import { MASTERFILE } from './Menu.tsx'
import { CInputGroup } from '@coreui/react-pro'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const UserForm = () => {
  const [{ t, module_ }] = useForm()

  const current_: IUser = module_?.state ?? ({} as IUser)
  const minHeight = 400
  const maxHeight = 700
  const colDef: ColDef[] = userColumnDefs(t)

  const {
    header, body, table, disable, state, current, setCurrent,
  } = useMasterfileForm<IUser>(current_, colDef, MASTERFILE.user)

  // ── Early return AFTER all hooks ────────────────────────────────────────
  if (module_ === '11111' || module_ === 11111) return <Login />

  const mainForm = UserTabs({
    collapse: state.collapseForm,
    current,
    setCurrent,
    disable,
    t,
    height: 33,
  })

  return (
    <>
      {header}
      <CInputGroup
        //@ts-ignore — CoreUI style prop accepts custom CSS vars
        style={{ ...styles.outer, display: state.collapseForm ? '' : 'none' }}
      >
        {body ?? mainForm}
      </CInputGroup>
      <div
        style={{
          ...styles.outer0,
          paddingTop: 2,
          height: state.collapseForm ? minHeight : maxHeight,
          display: state.collapseTable ? '' : 'none',
        }}
      >
        {table}
      </div>
    </>
  )
}

export default UserForm

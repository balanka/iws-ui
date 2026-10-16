import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type { RowSelectedEvent } from 'ag-grid-community/dist/types/src/events'
import { initAcc, MASTERFILE } from './Menu.tsx'
import { AccountMainForm } from './AccountMainForm.tsx'
import { accountColumnDefs } from '../ColumnsDefs.ts'
import { IAccount } from '../Models.ts'
import useMasterfileForm from './useMasterfileForm.tsx'
import useForm from './useForm.ts'
import { MasterfileFormShell } from './MasterfileFormShell.tsx'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const AccountForm = () => {
  const [{ profile, t }] = useForm()
  const { locale } = profile

  const height = 33
  const current_: IAccount = initAcc
  const colDef = accountColumnDefs(t)

  const {
    header, body, table, disable, state, rowData, current, setCurrent,
  } = useMasterfileForm<IAccount>(current_, colDef, MASTERFILE.acc)

  const mainForm = (
    <AccountMainForm
      collapse={state.collapseForm}
      current={current}
      setCurrent={setCurrent}
      accData={rowData}
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

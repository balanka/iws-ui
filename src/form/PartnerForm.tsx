import { AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

import { PartnerMainForm } from './PartnerMainForm'
import { MASTERFILE } from './Menu'
import { PartnerColumnDefs } from '../ColumnsDefs.ts'
import useForm from './useForm.ts'
import useMasterfileForm from './useMasterfileForm.tsx'
import { MasterfileFormShell } from './MasterfileFormShell.tsx'
import type { IBusinespartner } from '../Models.ts'


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const PartnerForm = () => {
  const [{ t, module_ }] = useForm()

  const height = 28
  const current_ = module_?.state ?? ({} as IBusinespartner)
  const colDef: ColDef[] = PartnerColumnDefs(t)

  const {
    header, body, table, disable, state, current, setCurrent,
  } = useMasterfileForm<IBusinespartner>(current_, colDef, MASTERFILE.contact)

  const partner = (
    <PartnerMainForm
      collapse={state.collapseForm}
      current={current}
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
      mainForm={partner}
    />
  )
}

export default PartnerForm

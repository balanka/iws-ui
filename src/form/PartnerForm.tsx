import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'


// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {PartnerMainForm} from './PartnerMainForm'

import {MASTERFILE} from './Menu'
import {PartnerColumnDefs} from '../ColumnsDefs.ts'
import useForm from './UseForm.ts'
import UseMasterfileForm from './UseMasterfileForm.tsx'
import {styles} from './BasicTreeTableProps.tsx'
import {CInputGroup} from "@coreui/react";


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])
 const PartnerForm = () => {
     const [{t, module_}]  = useForm()
     const height = 28
     const current_ =  module_.state[0]
     const minHeight = 450
     const maxHeight = 700
     const colDef:ColDef[]= PartnerColumnDefs(t)
    const [{header, body, disable, table, state, visible, current, setCurrent}] = UseMasterfileForm(current_,  colDef, MASTERFILE.partner)
    const mainForm = PartnerMainForm ({collapse:state.collapse,  current:current, setCurrent:setCurrent
     , disable:disable, t:t, height:height})
    return (
      <>
       {header}
        <CInputGroup
          //@ts-ignore
          style={{...styles.outer , display: !state.collapse?'none':''}} >
          {body?body():mainForm}
        </CInputGroup>
        <div  style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight, display:visible?'':'none'}}>
         {table}
       </div>
     </>
   )
}
export default  PartnerForm

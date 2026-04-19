import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {MASTERFILE} from './Menu'
import { masterfileColumnDefs} from '../ColumnsDefs.ts'
import {IRole} from '../Models.ts'
import useForm from './UseForm.ts'
import UseMasterfileForm from './UseMasterfileForm.tsx';
import RoleTabs from "./RoleTabs.tsx";
import {styles} from './BasicTreeTableProps.tsx'


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

 const RoleForm = () => {
     const [{ t, module_}]  = useForm()
     const height = 33
     const current_: IRole =  module_.state[0]
     const minHeight = 400
     const maxHeight = 700
     const coldef:ColDef[]= masterfileColumnDefs(t)
     const [{header, body, table, state, visible, current, setCurrent, disable}] = UseMasterfileForm(current_, coldef, MASTERFILE.role )
     const mainForm = RoleTabs ({collapse:state.collapse,  current:current, setCurrent:setCurrent
     , disable:disable, t:t, height:height})

   return (
     <>
       {header}
       {body??mainForm}
       <div  style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight,  minWidth:"100%", display:visible?'':'none'}}>
         {table}
       </div>
     </>
   )
}
export default  RoleForm

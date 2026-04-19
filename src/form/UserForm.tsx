import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {userColumnDefs} from '../ColumnsDefs.ts'
import { IUser} from '../Models.ts'
import UserTabs from "./UserTabs.tsx";
import useForm from './UseForm.ts'
import UseMasterfileForm from './UseMasterfileForm.tsx'
import {styles} from "./BasicTreeTableProps.tsx";


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

 const UserForm = () => {
   const [{ t,  state, module_, selected, visible}] = useForm()
   const current_: IUser =  module_.state[0]
   const minHeight = 400
   const maxHeight = 700
   const colDef:ColDef[] = userColumnDefs(t)
   const [{header, body, disable, table, current, setCurrent}] = UseMasterfileForm(current_, colDef, selected)
   const mainForm = UserTabs({collapse:state.collapse, current:current, setCurrent:setCurrent, disable:disable, t:t, height:33})

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
export default  UserForm

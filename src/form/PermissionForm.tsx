import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {MASTERFILE} from './Menu'
import { formEnum } from '../utils/FormEnum'
import useForm from './UseForm.ts'
import {PermissionMainForm} from './PermissionMainForm.tsx'
import {permissionColumnDefs} from "../ColumnsDefs.ts";
import UseMasterfileForm from "./UseMasterfileForm.tsx";
import {styles} from './BasicTreeTableProps.tsx'


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

 const PermissionForm = () => {
     const [{  menu, selected, t}]  = useForm()
     let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
     module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
     const height = 20
     const current_ =  module_.state[0]
     const minHeight = 400
     const maxHeight = 700
     const coldef:ColDef[]= permissionColumnDefs(t)

     const [{header, body, table, disable, state, visible, current, setCurrent}] = UseMasterfileForm(current_, coldef, MASTERFILE.perm)
      const mainForm = PermissionMainForm ({collapse:state.collapse,  current:current, setCurrent:setCurrent
     , disable:disable, t:t, height:height})
   return (
      <>
        {header}
        {body??mainForm}
         <div  style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight, display:visible?'':'none'}}>
          {table}
        </div>
      </>
    )

}
export default  PermissionForm

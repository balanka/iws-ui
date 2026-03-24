import React from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {userColumnDefs} from '../ColumnsDefs.ts'
import { IUser} from '../Models.ts'
import Login from './Login'
import UserTabs from "./UserTabs.tsx";
import useForm from './UseForm.ts'
import UseMasterfileForm from './UseMasterfileForm.ts'
import {styles} from "./BasicTreeTableProps.tsx";


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

 const UserForm = () => {
   const [{ t,  state, module_, selected, visible}] = useForm()
   if (module_ === '11111' || module_ === 11111) return <Login/>
   const current_: IUser =  module_.state[0]
   const minHeight = 400
   const maxHeight = 700
   const colDef:ColDef[] = userColumnDefs(t)
   const [{header, body, disable, table, current, setCurrent}] = UseMasterfileForm(current_, colDef, selected)
   const mainForm = UserTabs({collapse:state.collapse, current:current, setCurrent:setCurrent, disable:disable, t:t, height:0})

   return (
     <>
       {header}
       <Grid container style={{ borderRadius: 5, boxShadow: '0 20px 50px #BBF', padding: 10
         , height:state.collapse?minHeight:maxHeight
         , display: !state.collapse?'none':''}} maximize direction="row" zeroMinWidth>
         {body??mainForm}
       </Grid>
       <Grid item style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight, display:visible?'':'none'}}>
         {table}
       </Grid>
     </>
   )
}
export default  UserForm

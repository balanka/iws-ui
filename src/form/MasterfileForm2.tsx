// import React from 'react'
// import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
// import 'ag-grid-community/styles/ag-grid.css'
// import 'ag-grid-community/styles/ag-theme-quartz.css'
// import Grid from 'react-fast-grid'
//
// // @ts-ignore
// import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
// import {MasterfilesForm} from './FormsProps'
// import {MASTERFILE} from './Menu'
// import { formEnum } from '../utils/FormEnum'
// import {masterfileColumnDefs} from '../ColumnsDefs.ts'
// import useForm from './UseForm.ts'
// import UseMasterfileForm from './UseMasterfileForm.ts'
// import {styles} from "./BasicTreeTableProps.tsx";
//
//
// ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])
//
//  const MasterfileForm2 = () => {
//      const [{ menu, selected, t}]  = useForm()
//      let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
//      module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
//      const height = 33
//      const current_ =  module_.state[0]
//      const minHeight = 400
//      const maxHeight = 700
//      const coldef:ColDef[]= masterfileColumnDefs(t)
//      // const [{header, body, table, disable, state, visible, current, setCurrent}] = UseMasterfileForm(current_, coldef,  url)
//     const [{header, body, table, disable,  state, visible, current, setCurrent}] = UseMasterfileForm(current_,coldef, MASTERFILE.masterfile)
//     const mainForm = MasterfilesForm({collapse:state.collapse,  current:current??current_, setCurrent:setCurrent
//       ,  disable:disable, height:height, accData:[], t:t})
//
//
//    return (
//      <>
//        {header}
//        {body??mainForm}
//        <Grid item style={{...styles.outer0, paddingTop:5, height: state.collapse?minHeight:maxHeight, display:visible?'':'none'}}>
//          {table}
//        </Grid>
//      </>
//    )
//
// }
//export default  MasterfileForm2

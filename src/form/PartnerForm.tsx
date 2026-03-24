import React from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {PartnerMainForm} from './FormsProps'

import {MASTERFILE} from './Menu'
import { formEnum } from '../utils/FormEnum'
import {PartnerColumnDefs} from '../ColumnsDefs.ts'
import useForm from './UseForm.ts'
import UseMasterfileForm from './UseMasterfileForm.ts'
import {styles} from './BasicTreeTableProps.tsx'


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])
 const PartnerForm = () => {
     const [{  menu, selected, t}]  = useForm()
     let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
     module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
     const height = 20
     const current_ =  module_.state[0]
     const minHeight = 400
     const maxHeight = 700
     const colDef:ColDef[]= PartnerColumnDefs(t)
    const [{header, body, disable, table, state, visible, current, setCurrent}] = UseMasterfileForm(current_,  colDef, MASTERFILE.partner)
    const mainForm = PartnerMainForm ({collapse:state.collapse,  current:current, setCurrent:setCurrent
     , disable:disable, t:t, height:height})
    return (
      <>
       {header}
        {body??mainForm}
       <Grid item style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight, display:visible?'':'none'}}>
         {table}
       </Grid>
     </>
   )
}
export default  PartnerForm

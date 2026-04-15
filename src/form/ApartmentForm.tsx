import React, {useEffect, useState} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {MasterfilesForm} from './FormsProps'

import {MASTERFILE} from './Menu'
import {masterfileColumnDefs} from '../ColumnsDefs.ts'
import useForm from './UseForm.ts'
import UseMasterfileForm from './UseMasterfileForm.ts'
import {styles} from './BasicTreeTableProps.tsx'
import iwsStore from "../utils/Store.tsx";
import {Get} from "./CrudController.ts";
import {IMasterfile2} from "../Models.ts";
import {formEnum} from "../utils/FormEnum.tsx";


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])
 const ApartmentForm = () => {
     const [{profile, t, company, module_}]  = useForm()
    const {token} = profile
    const url = MASTERFILE.realEstate
    const ctx =  `${url}/${formEnum.REALESTATE}/${company}`
    const [, setIwsState] = useState(iwsStore.initialState)
    const [accData, setAccData] = useState<IMasterfile2[]>([])
     const height = 33
     console.log('module_', module_)
     const current_ =  module_.state[0]
     console.log('current_', current_)
     const minHeight = 450
     const maxHeight = 700
     const colDef:ColDef[]= masterfileColumnDefs(t)
   useEffect(() => {
     iwsStore.subscribe(setIwsState)
     Get(ctx, token, formEnum.REALESTATE, setAccData)
     setCurrent(current_)
     // attach the event listener
     document.onkeydown = handleKeyPress
     document.addEventListener('onKeyDown', handleKeyPress)
   }, [current_])
   console.log('ctx', ctx)
   const [{header, body, table, disable,  state, visible, current, setCurrent, handleKeyPress}] = UseMasterfileForm(current_, colDef, MASTERFILE.apartment)
   const mainForm = MasterfilesForm({collapse:state.collapse,  current:current??current_, setCurrent:setCurrent
     , disable:disable, height:height, accData:accData, t:t
     , fieldName:t('common.parent'), propertyName:'parent'})
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
export default  ApartmentForm

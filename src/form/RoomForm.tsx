import {useEffect, useState} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { MasterfileFormWithout } from './MasterfileFormWithout'
import {MASTERFILE} from './Menu'
import {masterfileColumnDefs} from '../ColumnsDefs.ts'
import useForm from './UseForm.ts'
import UseMasterfileForm from './UseMasterfileForm.tsx'
import {styles} from './BasicTreeTableProps.tsx'
import iwsStore from "../utils/Store.tsx";
import {Get} from "./CrudController.ts";
import {IMasterfile2} from "../Models.ts";
import {formEnum} from "../utils/FormEnum.tsx";


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])
 const RoomForm = () => {
     const [{profile, t, company, module_}]  = useForm()
    const {token} = profile
    const url = MASTERFILE.apartment
    const ctx =  `${url}/${formEnum.APARTMENT}/${company}`
    const [, setIwsState] = useState(iwsStore.initialState)
    const [accData, setAccData] = useState<IMasterfile2[]>([])
     const height = 33
     const current_ =  module_.state[0]
     const minHeight = 450
     const maxHeight = 700
     const colDef:ColDef[]= masterfileColumnDefs(t)
   useEffect(() => {
     iwsStore.subscribe(setIwsState)
     Get(ctx, token, formEnum.APARTMENT, setAccData)
     setCurrent(current_)
   }, [current_])
   console.log('ctx')
   const [{header, body, table, disable,  state, visible, current, setCurrent}] = UseMasterfileForm(current_, colDef, MASTERFILE.room)
   const mainForm = MasterfileFormWithout({collapse:state.collapse,  current:current??current_, setCurrent:setCurrent
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
export default  RoomForm

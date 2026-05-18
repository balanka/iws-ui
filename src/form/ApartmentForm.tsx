import {useEffect, useState} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {MasterfileFormWithout} from './MasterfileFormWithout'
import {MASTERFILE} from './Menu'
import {masterfileColumnDefs} from '../ColumnsDefs.ts'
import useForm from './UseForm.ts'
import UseMasterfileForm from './UseMasterfileForm.tsx'
import {styles} from './BasicTreeTableProps.tsx'
import {Get} from "./CrudController.ts";
import {IMasterfile2} from "../Models.ts";
import {formEnum} from "../utils/FormEnum.tsx";


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])
 const ApartmentForm = () => {
    const [{profile, t, company, module_}]  = useForm()
    const {token} = profile
    const url = MASTERFILE.realEstate
    const ctx =  `${url}/${formEnum.REALESTATE}/${company}`
    const [accData, setAccData] = useState<IMasterfile2[]>([])
     const height = 33
     console.log('module_', module_)
     const current_ =  module_.state[0]
     console.log('current_', current_)
     const minHeight = 450
     const maxHeight = 700
     const colDef:ColDef[]= masterfileColumnDefs(t)
     const {header, body, table, disable, visible, state, current, setCurrent} = UseMasterfileForm(current_, colDef, MASTERFILE.apartment)
     useEffect(() => {
       Get(ctx, token, formEnum.REALESTATE, setAccData)
       setCurrent(current_)
     }, [])

   console.log('ctx', ctx)
   const mainForm = MasterfileFormWithout({collapse:state.collapse,  current:current??current_, setCurrent:setCurrent
     , disable:disable, height:height, accData:accData, t:t
     , fieldName:t('common.parent'), propertyName:'parent'})
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
export default  ApartmentForm

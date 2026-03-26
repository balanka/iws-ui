import React, {useState, useEffect} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {MasterfilesForm} from './FormsProps'
import { Get} from './CrudController'
import {MASTERFILE} from './Menu'
import iwsStore from '../utils/Store'
import { formEnum } from '../utils/FormEnum'
import {masterfileColumnDefs, userColumnDefs} from '../ColumnsDefs.ts'
import {IMasterfile2} from '../Models.ts'
import useForm from './UseForm.ts'
import UseMasterfileForm from './UseMasterfileForm.ts'
import {styles} from './BasicTreeTableProps.tsx'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const MasterfileForm = () => {
  const [{ profile, menu, selected, t,  modelid, company}]  = useForm()
  const {token} = profile
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN

  //const height = 20
  const url = MASTERFILE.masterfile
  const ctx =  `${url}/${modelid}/${company}`
  const current_: IMasterfile2 =  module_.state[0]
  const [, setIwsState] = useState(iwsStore.initialState)
  const [accData, setAccData] = useState<IMasterfile2[]>([])
  const coldef:ColDef[]= (formEnum.USER===modelid)?userColumnDefs(t):masterfileColumnDefs(t)
  const minHeight = 350
  const maxHeight = 700
  const height = 33
  const [{header, body, table, disable,  state, visible, current, setCurrent}] = UseMasterfileForm(current_,coldef, MASTERFILE.masterfile)
  const mainForm = MasterfilesForm({collapse:state.collapse,  current:current??current_, setCurrent:setCurrent
                                            , disable:disable, height:height, accData:accData, t:t
                                            , fieldName:t('common.parent'), propertyName:'parent'})

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    Get(ctx, token, module_.modelid, setAccData)
    //Get(acc_ctx, token, formEnum.ACCOUNT, setAccountData)
    setCurrent(current_)
  }, [current_])

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
export default  MasterfileForm

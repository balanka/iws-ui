import React, { useState, useEffect } from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { Get} from './CrudController'
import {MASTERFILE} from './Menu'
import iwsStore from '../utils/Store'
import { formEnum } from '../utils/FormEnum'
import {masterfileColumnDefs, userColumnDefs} from '../ColumnsDefs.ts'
import {IMasterfile, IMasterfile2} from '../Models.ts'
import useForm from './UseForm.ts'
import UseMasterfileForm from './UseMasterfileForm.tsx'
import {styles} from './BasicTreeTableProps.tsx'
import {CInputGroup} from "@coreui/react";
import {MasterfileFormWithChildren} from './MasterfileFormWithChildren'
import Login from "./Login.tsx";


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const MasterfileForm = () => {
  const [{ profile,  t,  modelid, company, module_}]  = useForm()
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const {token} = profile
  const url = MASTERFILE.masterfile
  const ctx =  `${url}/${modelid}/${company}`
  console.log('module_', module_)
  const current_: IMasterfile =  module_.state[0]
  console.log('module_xxx', module_)
  const [, setIwsState] = useState(iwsStore.initialState)
  const [accData, setAccData] = useState<IMasterfile2[]>([])
  const coldef:ColDef[]= (formEnum.USER===modelid)?userColumnDefs(t):masterfileColumnDefs(t)
  const minHeight = 350
  const maxHeight = 700
  const height = 28
  const [{header, body, table, disable,  state, visible, current, setCurrent, handleKeyPress}] = UseMasterfileForm(current_,coldef, MASTERFILE.masterfile)
  const safeBody = React.isValidElement(body) ? body : null
  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    Get(ctx, token, module_.modelid, setAccData)
    setCurrent(current_)
    // attach the event listener
    document.onkeydown = handleKeyPress
    document.addEventListener('onKeyDown', handleKeyPress)
  }, [current_])
   console.log('body', body)
  return (
    <>
      {header}
      <CInputGroup
        //@ts-ignore
          style={{...styles.outer,  width:'100%', display: !state.collapse?'none':''}} >
          {safeBody??
            <MasterfileFormWithChildren
              //@ts-ignore
              current={current}
              setCurrent={setCurrent}
              accData={accData}
              t={t}
              disable={disable}
              height={height}
              fieldName={t('fmodule.parent')}
              propertyName="parent"
            />
          }
      </CInputGroup>
      <div  style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight,  minWidth:"100%", display:visible?'':'none'}}>
        {table}
      </div>
    </>
  )
}
export default  MasterfileForm

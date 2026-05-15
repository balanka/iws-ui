import React, {useState, useEffect} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {Get} from './CrudController.ts'
import {initVat, MASTERFILE} from './Menu.tsx'
import { formEnum } from '../utils/FormEnum.tsx'
import { IVat} from '../Models.ts'
import {vatColumnDefs} from '../ColumnsDefs'
import Login from './Login'
import UseMasterfileForm from './UseMasterfileForm.tsx'
import useForm from './UseForm.ts'
import {styles} from './BasicTreeTableProps.tsx'
import {VatMainForm} from "./VatMainForm.tsx";
import {CInputGroup} from "@coreui/react";
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const VatForm = () => {
  const [{ profile, selected, t,  company, module_ }] = useForm()
  const { token} = profile
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const current_ :IVat = initVat[0]
  const acc_modelid = formEnum.ACCOUNT
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const [accData, setAccData] = useState([])
  const minHeight = 300
  const maxHeight = 600
  const height = 28
  const colDef:ColDef[] = vatColumnDefs(t)
  const {header, body, table, disable, visible, state, current, setCurrent, zIndex} =  UseMasterfileForm(current_,  colDef, selected)
  useEffect(() => {
    Get(acc_ctx, token, acc_modelid, setAccData)
    setCurrent(current_)
  }, [])

  const safeBody = React.isValidElement(body) ? body : null;
  return (
    <>
      {header}
      <CInputGroup
        //@ts-ignore
        style={{...styles.outer , display: !state.collapse?'none':''}} >
        {safeBody??VatMainForm({current, setCurrent, accData, t, disable, height, zIndex})}
      </CInputGroup>
      <div  style={{...styles.outer0, paddingTop:2, height: state.collapse?minHeight:maxHeight, display:visible?'':'none'}}>
        {table}
      </div>
    </>
  )

}
export default VatForm

import React, {useState, useEffect} from 'react'
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { CommonFormHead } from './FormsProps.tsx'
import {Get} from './CrudController.ts'
import {initVat, MASTERFILE} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import { VatMainForm } from './FormsProps.tsx'
import { formEnum } from '../utils/FormEnum.tsx'
import {IVat} from '../Models.ts'
import {VatGrid} from '../IWSGrid.tsx'
import {vatColumnDefs} from '../ColumnsDefs'
import Login from './Login'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from '../utils/FormUtils.tsx'
import UseMasterfileForm from './UseMasterfileForm.ts'
import useForm from './UseForm.ts'
import { styles as stylesx} from './BasicTreeTableProps.tsx'
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const VatForm = () => {
  const [{ profile, selected, t, toggle, state, handleLanguageChange, company, module_ }] = useForm()
  const { token} = profile
  const dispatch = useDispatch()
  let navigate = useNavigate()
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const current_ :IVat = initVat[0]
  const [, setIwsState] = useState(iwsStore.initialState)
  const acc_modelid = formEnum.ACCOUNT
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const [accData, setAccData] = useState([])
  const minHeight = 300
  const maxHeight = 600
  const height = 20
  const [{language, initAdd, added, disable, edit, edited, submitEdit, cancelEdit, reload
    , title, zIndex, rowData, current, setCurrent}] = UseMasterfileForm(current_)

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
      Get(acc_ctx, token, acc_modelid, setAccData)
  }, [selected])

  const onRowSelected = (event: RowSelectedEvent) => setCurrent(event.data)

  return (<>
          <CommonFormHead
              title={title}
              collapse={state.collapse}
              initAdd={initAdd}
              edited={edited??false}
              added={added?? added ===undefined}
              disable={disable??true}
              edit={edit}
              cancelEdit={cancelEdit}
              submitEdit={submitEdit}
              submitQuery={reload}
              reload={reload}
              toggle={toggle}
              logout={logout}
              navigate={navigate}
              language={language}
              handleLanguageChange={handleLanguageChange}
              dispatch={dispatch}/>
          <Grid container style={{ borderRadius: 5, boxShadow: '0 20px 50px #BBF', padding: 10
                                    , height:state.collapse?minHeight:maxHeight
                                   , display: !state.collapse?'none':''}} maximize direction="row" zeroMinWidth>
              <VatMainForm current={current} setCurrent={setCurrent}
                           disable={disable} t={t} accData ={accData} height={height} zIndex={zIndex}/>
          </Grid>
          <Grid container
              // @ts-ignore
                style={{...stylesx.outer, height:250, paddingTop: 10}} maximize direction="column">
            <VatGrid columnDefs ={vatColumnDefs(t)}  onRowSelected={onRowSelected} rowData ={rowData} />
          </Grid>
    </>
  )
}
export default VatForm

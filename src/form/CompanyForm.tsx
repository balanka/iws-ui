import React, {useEffect, useState} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, GridReadyEvent, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
import {styles as stylesx} from './BasicTreeTableProps.tsx'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {CommonFormHead} from './FormsProps.tsx'
import {initComp} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import {formEnum} from '../utils/FormEnum.tsx'
import {customerColumnDefs} from '../ColumnsDefs.ts'
import {ICompany} from '../Models.ts'
import {CustomerGrid} from '../IWSGrid.tsx'
import Login from './Login.tsx'
import {CompanyTabs} from './CompanyTabs.tsx'
import {logout} from '../utils/FormUtils.tsx'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import useForm from './UseForm.ts'
import useCustomerForm from './UseCustomerForm.ts'
import {Get2} from "./CrudController.ts";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const STYLES = {
  inner: {
    borderRadius: 5,
    boxShadow: '0 20px 50px #BBF',
    padding: 10,
    paddingLeft: 25,
    paddingRight: 20,
    //height: 350,
    paddingTop: 30,
  }
}
const CompanyForm = () => {
  const [{ profile, menu, selected, t, modelid, company }] = useForm()
  const { token, locale } = profile
  const [, setIwsState] = useState(iwsStore.initialState)
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const current_ : ICompany= initComp[0]
  const  [{ edited, added, disable, language, accData, bankData, ccyData
    , rowData, setRowData, vatData, current, setCurrent, currentBankAccount, setCurrentBankAccount
    , edit, initAdd, reload, cancelEdit, submitEdit, handleLanguageChange, onNewBankAccount
    , onDeleteBankAccount, submitQuery, onRowSelected, title:title, setGridApi}] = useCustomerForm<ICompany>(current_)
  const localex= locale?? 'fr-FR'
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [state, setState] = useState({ collapse: true, fadeIn: true, timeout: 300 })
  const height = 20
  const toggle = () => setState({ ...state, collapse: !state.collapse })
  const minHeight = 350
  const maxHeight = 700
  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    setCurrent(current_)
    Get2(`${selected}/${modelid}`, token, setRowData)
  }, [selected])


  const onGridReady = (params: GridReadyEvent) => setGridApi(params.api)
  return (
        <Grid container spacing={10} style={{...STYLES.inner}} direction="column">
          <CommonFormHead
              title={title}
              collapse={state.collapse}
              initAdd={initAdd}
              edited={edited??false}
              added={added?? added ===undefined}
              disable={disable}
              edit={edit}
              onNewBankAccount={onNewBankAccount}
              onDeleteBankAccount={onDeleteBankAccount}
              cancelEdit={cancelEdit}
              submitEdit={submitEdit}
              submitQuery={submitQuery}
              reload={reload}
              toggle={toggle}
              logout={logout}
              navigate={navigate}
              language={language}
              handleLanguageChange={handleLanguageChange}
              dispatch={dispatch}
          />
          <Grid container style={{...stylesx.inner, display: !state.collapse?'none':''}} maximize direction="row" zeroMinWidth>
              <CompanyTabs  current={current} setCurrent={setCurrent}
                             currentBankAccount ={currentBankAccount}
                             setCurrentBankAccount={setCurrentBankAccount}
                             disable={disable} t={t} locale={localex}
                             data ={rowData} accData ={accData} bankData={bankData} ccyData={ccyData}
                             vatData ={vatData} height={height}
                            onGridReady={onGridReady}
                             // @ts-ignore
                             stylesx={{...stylesx, height:state.collapse?minHeight:maxHeight, padding: 5, paddingLeft: 10, paddingBottom: 5}}/>
          </Grid>
            <Grid container
                // @ts-ignore
                  style={{...stylesx.outer, height:state.collapse?minHeight:maxHeight, paddingTop: 10}} maximize direction="column">
              <CustomerGrid columnDefs ={customerColumnDefs(t)}  onRowSelected={onRowSelected} rowData ={rowData.filter(row =>row.id===company)} />
            </Grid>
        </Grid>
  )
}
export default  CompanyForm

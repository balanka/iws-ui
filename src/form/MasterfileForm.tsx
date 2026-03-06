import React, {useState, useEffect} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'

// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {CommonFormHead, MasterfilesMainForm2,} from './FormsProps'
import { Get} from './CrudController'
import {MASTERFILE} from './Menu'
import iwsStore from '../utils/Store'
import { formEnum } from '../utils/FormEnum'
import {masterfileColumnDefs, userColumnDefs} from '../ColumnsDefs.ts'
import {IMasterfile2} from '../Models.ts'
import {MasterfileGrid} from '../IWSGrid'
import Login from './Login'
import {logout} from '../utils/FormUtils.tsx'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import useForm from './UseForm.ts'
import UseMasterfileForm from './UseMasterfileForm.ts'



ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const MasterfileForm = () => {
  const [{ profile, menu, selected, t, state, toggle, modelid, company}]  = useForm()
  const {token} = profile
  const dispatch = useDispatch()
  let navigate = useNavigate()
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const height = 20
  const url = MASTERFILE.masterfile
  const ctx =  `${url}/${modelid}/${company}`
  const current_: IMasterfile2 =  module_.state[0]
  const [, setIwsState] = useState(iwsStore.initialState)
  const [accData, setAccData] = useState<IMasterfile2[]>([])
  //const acc_ctx = `${module_?.state2}/${company}`

  const minHeight = 400
  const maxHeight = 700
  const [{language, initAdd, added, disable, edit, edited, submitEdit, cancelEdit, reload, title,  rowData, current
    , setRowData, setCurrent, handleLanguageChange, onRowSelected}] = UseMasterfileForm(current_, ctx, url)
  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    Get(ctx, token, module_.modelid, setAccData)
    //Get(acc_ctx, token, formEnum.ACCOUNT, setAccountData)
    setCurrent(current_)
  }, [current_])

  const submitQuery = (event: any) => {
    event.preventDefault()
    Get(ctx, token, modelid, setRowData)
    setCurrent(current_)
  }
  // const onRowSelected = (event: RowSelectedEvent) =>
  //   setCurrent((event.data instanceof Array) ? event.data[0] : event.data)

  const styles = {
    outer: {
      borderRadius: 1, // 5,
      boxShadow: "0 30px 40px #BBB",
      padding: 5,
    },
  }
  const collapse=  state.collapse
  console.log('current', current)
  return (
    <>
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
        submitQuery={submitQuery}
        reload={reload}
        toggle={toggle}
        logout={logout}
        navigate={navigate}
        language={language}
        handleLanguageChange={handleLanguageChange}
        dispatch={dispatch}
      />
      <MasterfilesMainForm2 collapse={collapse} current={current??current_} setCurrent={setCurrent} disable={disable}
                            height={height} accData={accData} t={t}/>
      <Grid item style={{...styles.outer, paddingTop:15, height: state.collapse?minHeight:maxHeight}}>
        <MasterfileGrid columnDefs={(formEnum.USER===modelid)?userColumnDefs(t):masterfileColumnDefs(t)} onRowSelected={onRowSelected} rowData={rowData}/>
      </Grid>
    </>
  )
}
export default  MasterfileForm

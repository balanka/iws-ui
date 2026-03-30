import React, {useState, useEffect} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {Get} from './CrudController.ts'
import {initVat, MASTERFILE} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import { VatMainForm } from './FormsProps.tsx'
import { formEnum } from '../utils/FormEnum.tsx'
import {IVat} from '../Models.ts'
import {vatColumnDefs} from '../ColumnsDefs'
import Login from './Login'
import UseMasterfileForm from './UseMasterfileForm.ts'
import useForm from './UseForm.ts'
import {styles} from './BasicTreeTableProps.tsx'
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const VatForm = () => {
  const [{ profile, selected, t,  company, module_ }] = useForm()
  const { token} = profile

  if (module_ === '11111' || module_ === 11111) return <Login/>
  const current_ :IVat = initVat[0]
  const [, setIwsState] = useState(iwsStore.initialState)
  const acc_modelid = formEnum.ACCOUNT
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const [accData, setAccData] = useState([])
  const minHeight = 300
  const maxHeight = 600
  const height = 20
  const colDef:ColDef[] = vatColumnDefs(t)
  const [{header, body, disable, table, visible, state, current, setCurrent, zIndex}] = UseMasterfileForm(current_,  colDef, selected)
  const mainForm = VatMainForm ({current:current, setCurrent:setCurrent, disable:disable, t:t, accData:accData, height:height, zIndex:zIndex})

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    Get(acc_ctx, token, acc_modelid, setAccData)
  }, [selected])

  return (
    <>
      {header}
      <div
        //@ts-ignore
        style={{...styles.outer,  borderRadius: 5, boxShadow: '0 20px 50px #BBF', padding: 1
         //, height:state.collapse?minHeight:maxHeight
          , display: !state.collapse?'none':''}} >
        {body??mainForm}
      </div>
      <div  style={{...styles.outer0, paddingTop:2, height: state.collapse?minHeight:maxHeight, display:visible?'':'none'}}>
        {table}
      </div>
    </>
  )


  //
  // const onRowSelected = (event: RowSelectedEvent) => setCurrent(event.data)
  //
  // return (<>
  //         <CommonFormHead
  //             title={title}
  //             collapse={state.collapse}
  //             initAdd={initAdd}
  //             edited={edited??false}
  //             added={added?? added ===undefined}
  //             disable={disable??true}
  //             edit={edit}
  //             cancelEdit={cancelEdit}
  //             submitEdit={submitEdit}
  //             submitQuery={reload}
  //             reload={reload}
  //             toggle={toggle}
  //             toggleTable={toggleTable}
  //             logout={logout}
  //             navigate={navigate}
  //             language={language}
  //             handleLanguageChange={handleLanguageChange}
  //             dispatch={dispatch}
  //             t={t}
  //         />
  //         <Grid container style={{ borderRadius: 5, boxShadow: '0 20px 50px #BBF', padding: 10
  //                                   , height:state.collapse?minHeight:maxHeight
  //                                  , display: !state.collapse?'none':''}} maximize direction="row" zeroMinWidth>
  //             <VatMainForm current={current} setCurrent={setCurrent}
  //                          disable={disable} t={t} accData ={accData} height={height} zIndex={zIndex}/>
  //         </Grid>
  //         <Grid container
  //             // @ts-ignore
  //               style={{...stylesx.outer, height:250, paddingTop: 10, display:visible?'':'none'}} maximize direction="column">
  //           <VatGrid columnDefs ={vatColumnDefs(t)}  onRowSelected={onRowSelected} rowData ={rowData} />
  //         </Grid>
  //   </>
  // )
}
export default VatForm

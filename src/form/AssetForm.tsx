import React, {useState, useEffect} from 'react'
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
import { styles as stylesx } from './BasicTreeTableProps'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {CommonFormHead, AssetMainForm} from './FormsProps'
import { Get} from './CrudController'
import {initAsset, MASTERFILE} from './Menu'
import iwsStore from '../utils/Store'
import { formEnum } from '../utils/FormEnum'
import {assetColumnDefs} from '../ColumnsDefs.ts'
import {IAccount, IAsset} from '../Models.ts'
import {AssetGrid} from '../IWSGrid.tsx'
import Login from './Login'
import {logout} from '../utils/FormUtils.tsx'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import UseMasterfileForm from './UseMasterfileForm.ts'
import useForm from './UseForm.ts'


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const STYLES = {
  inner: {
    borderRadius: 5,
    boxShadow: '0 20px 50px #BBF',
    padding: 10,
    paddingLeft: 10,
    paddingRight: 14,
    //height: 350,
    paddingTop: 30,
    paddingBottom: 3,
  },
  header: {
    borderRadius: 5,
    //boxShadow: '0 10px 30px #BBB',
    padding: 1,
    height: 40,
    paddingTop: 1,
    paddingBottom: 1,
  },
}
const AssetForm = () => {
  // @ts-ignore
  const [{profile, t, toggle, state, module_}] = useForm()
  const { token, company, locale, currency } = profile
  const currencyx = currency ??'EUR'
  const dispatch = useDispatch()
  let navigate = useNavigate()
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const acc_modelid = formEnum.ACCOUNT
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const current_: IAsset = initAsset[0]
  const [, setIwsState] = useState(iwsStore.initialState)
  const [accData, setAccData] = useState<IAccount[]>([])
  const minHeight = 350
  const maxHeight = 700
  const height = 33
  const [{language, initAdd, added, disable, edit, edited, submitEdit, cancelEdit, reload
    , handleLanguageChange, title, rowData, current, setCurrent}] = UseMasterfileForm(current_)

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    !acc_ctx.includes('-1')&&Get(acc_ctx, token, acc_modelid, setAccData)
     setCurrent(current_)
  }, [])

  const onRowSelected = (event: RowSelectedEvent) =>
        setCurrent((event.data instanceof Array)?event.data[0]:event.data)

  // @ts-ignore
  return (
    <>
          <CommonFormHead
              title={title}
              collapse={state.collapse}
              initAdd={initAdd}
              edited={edited??false}
              added={added?? added ===undefined}
              disable={disable}
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
              dispatch={dispatch}
          />

          <Grid container style={{...STYLES.inner, display: !state.collapse?'none':''}} maximize direction="row" zeroMinWidth>
            <AssetMainForm current={current} setCurrent={setCurrent} disable={disable} t={t}
                                 accData ={accData} height={height} locale ={locale ??'fr-FR'} currency ={currencyx} zIndex={9999}/>
         </Grid>
        <Grid container
            // @ts-ignore
              style={{...stylesx.outer, height:state.collapse?minHeight:maxHeight, paddingTop: 30}} maximize direction="column" >
          <AssetGrid columnDefs ={assetColumnDefs(t)}  onRowSelected={onRowSelected} rowData ={rowData}/>
        </Grid>
    </>

  )
}
export default AssetForm

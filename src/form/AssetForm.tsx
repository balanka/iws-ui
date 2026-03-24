import React, {useState, useEffect} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
import {styles} from './BasicTreeTableProps'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {AssetMainForm} from './FormsProps'
import { Get} from './CrudController'
import {initAsset, MASTERFILE} from './Menu'
import iwsStore from '../utils/Store'
import { formEnum } from '../utils/FormEnum'
import {assetColumnDefs} from '../ColumnsDefs.ts'
import {IAccount, IAsset, IMasterfile} from '../Models.ts'
import Login from './Login'
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
  const [{profile, t, module_}] = useForm()
  const { token, company, locale, currency } = profile
  const currencyx = currency ??'EUR'
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const acc_modelid = formEnum.ACCOUNT
  const ccy_modelid = formEnum.CURRENCY
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const ccy_ctx = `${MASTERFILE.masterfile}/${ccy_modelid}/${company}`
  const current_: IAsset = initAsset[0]
  const [, setIwsState] = useState(iwsStore.initialState)
  const [accData, setAccData] = useState<IAccount[]>([])
  const [ccyData, setCcyData] = useState<IMasterfile[]>([])
  const minHeight = 350
  const maxHeight = 700
  const height = 33

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    !acc_ctx.includes('-1')&&Get(acc_ctx, token, acc_modelid, setAccData)
    Get(ccy_ctx, token, ccy_modelid, setCcyData)
     setCurrent(current_)
  }, [])

  const colDef:ColDef[]= assetColumnDefs(t)
  const [{header, body, disable, state, visible, table, current, setCurrent}] = UseMasterfileForm<IAsset>(current_,  colDef, MASTERFILE.asset)
  const mainForm = AssetMainForm ({current:current, setCurrent:setCurrent, disable:disable, t:t, accData:accData
    , ccyData:ccyData, height:height, locale:locale ??'fr-FR', currency:currencyx, zIndex:9999})
  return (
    <>
      {header}
      <Grid container style={{...STYLES.inner, display: !state.collapse?'none':''}} maximize direction="row" zeroMinWidth>
         {body??mainForm}
      </Grid>
      <Grid item style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight, display:visible?'':'none'}}>
        {table}
      </Grid>
    </>
  )
}
export default AssetForm

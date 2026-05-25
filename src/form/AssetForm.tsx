import { useState, useEffect } from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import {styles} from './BasicTreeTableProps'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {AssetMainForm} from './AssetMainForm'
import { Get} from './CrudController'
import {initAsset, MASTERFILE} from './Menu'
import { formEnum } from '../utils/FormEnum'
import {assetColumnDefs} from '../ColumnsDefs.ts'
import {IAccount, IAsset, IMasterfile} from '../Models.ts'
import UseMasterfileForm from './UseMasterfileForm.tsx'
import useForm from './UseForm.ts'
import Login from "./Login.tsx";
import {isLoaded} from "../utils/FormUtils.tsx";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const AssetForm = () => {
  // @ts-ignore
  const [{profile, t, module_}] = useForm()
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const { token, company, locale, currency } = profile
  const currencyx = currency ??'EUR'
  const acc_modelid = formEnum.ACCOUNT
  const ccy_modelid = formEnum.CURRENCY
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const ccy_ctx = `${MASTERFILE.masterfile}/${ccy_modelid}/${company}`
  const current_: IAsset = initAsset
  const [accData, setAccData] = useState<IAccount[]>([])
  const [ccyData, setCcyData] = useState<IMasterfile[]>([])
  const minHeight = 350
  const maxHeight = 700
  const height = 30
  const colDef:ColDef[]= assetColumnDefs(t)
  const {header, body, table, disable, visible, state, current, setCurrent} = UseMasterfileForm<IAsset>(current_,  colDef, MASTERFILE.asset)

  useEffect(() => {
    Promise.all([
      !isLoaded(acc_modelid)&&Get(acc_ctx, token, acc_modelid, setAccData),
      !isLoaded(ccy_modelid)&&Get(ccy_ctx, token, ccy_modelid, setCcyData)
    ]).then(() => {
      console.log('All data fetched successfully')
      // additional logic after all requests complete
    }).catch(error => {
      console.error('Error fetching data', error)
    })
    setCurrent(current??current_)
  }, [])


  const mainForm = AssetMainForm ({collapse:state.collapse, current:current, setCurrent:setCurrent, disable:disable, t:t, accData:accData
    , ccyData:ccyData, height:height, locale:locale ??'fr-FR', currency:currencyx, zIndex:9999})
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
export default AssetForm

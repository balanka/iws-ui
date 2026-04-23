import {useState, useEffect} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import {styles} from './BasicTreeTableProps'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {AssetMainForm} from './AssetMainForm'
import { Get} from './CrudController'
import {initAsset, MASTERFILE} from './Menu'
import iwsStore from '../utils/Store'
import { formEnum } from '../utils/FormEnum'
import {assetColumnDefs} from '../ColumnsDefs.ts'
import {IAccount, IAsset, IMasterfile} from '../Models.ts'
import UseMasterfileForm from './UseMasterfileForm.tsx'
import useForm from './UseForm.ts'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const AssetForm = () => {
  // @ts-ignore
  const [{profile, t, module_}] = useForm()
  const { token, company, locale, currency } = profile
  const currencyx = currency ??'EUR'
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
  const height = 30

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    !acc_ctx.includes('-1')&&Get(acc_ctx, token, acc_modelid, setAccData)
    Get(ccy_ctx, token, ccy_modelid, setCcyData)
    setCurrent(current_)
    // attach the event listener
    document.onkeydown = handleKeyPress
    document.addEventListener('onKeyDown', handleKeyPress)
  }, [])

  const colDef:ColDef[]= assetColumnDefs(t)
  const [{header, body, disable, state, visible, table, current, setCurrent, handleKeyPress}] = UseMasterfileForm<IAsset>(current_,  colDef, MASTERFILE.asset)
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

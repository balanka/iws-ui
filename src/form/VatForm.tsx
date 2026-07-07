import React, {useState, useEffect} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import {Get} from './CrudController.ts'
import {initVat, MASTERFILE} from './Menu.tsx'
import { formEnum } from '../utils/FormEnum.tsx'
import {IAccount, IVat} from '../Models.ts'
import {vatColumnDefs} from '../ColumnsDefs'
import Login from './Login'
import UseMasterfileForm from './UseMasterfileForm.tsx'
import useForm from './UseForm.ts'
import {styles} from './BasicTreeTableProps.tsx'
import {VatMainForm} from "./VatMainForm.tsx";
import {CInputGroup} from "@coreui/react-pro";
import {isLoaded} from "../utils/FormUtils.tsx";
import iwsStore from "../utils/Store.tsx";
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const VatForm = () => {
  const [{ profile, selected, t,  company, module_ }] = useForm()
  const { token} = profile
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const current_ :IVat = initVat
  const acc_modelid = formEnum.ACCOUNT
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const [accData, setAccData] = useState<IAccount[]>([])
  const minHeight = 300
  const maxHeight = 600
  const height = 28
  const colDef:ColDef[] = vatColumnDefs(t)
  const {header, body, table, disable, visible, state, current, setCurrent, zIndex} =  UseMasterfileForm(current_,  colDef, selected)
  useEffect(() => {
    async function loadData() {
      if (isLoaded(acc_modelid)) {
        // Cache hit → update state immediately
        const cached:IAccount[] = iwsStore.getByModelId(acc_modelid);
        setAccData(cached);
      } else {
        // Cache miss → fetch and let Get update state via callback
        await Get(acc_ctx, token, acc_modelid, setAccData);
      }
      setCurrent(current_);
    }
    loadData();
  }, [token, company]);


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

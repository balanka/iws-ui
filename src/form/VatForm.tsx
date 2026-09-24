import {VatMainForm} from "./VatMainForm.tsx";
import Login from "./Login.tsx";
import {CInputGroup} from "@coreui/react-pro";
import iwsStore from "../utils/Store.tsx";
import {IAccount, IVat} from "../Models.ts";
import {Get} from "./CrudController.ts";
import {isLoaded} from "../utils/FormUtils.tsx";
import React, {useEffect, useState} from "react";
import {vatColumnDefs} from "../ColumnsDefs.ts";
import {ColDef} from "ag-grid-community";
import useForm from "./UseForm.ts";
import {initVat, MASTERFILE} from "./Menu.tsx";
import {formEnum} from "../utils/FormEnum.tsx";
import {styles} from './BasicTreeTableProps.tsx'
import UseMasterfileForm from './UseMasterfileForm.tsx'

const VatForm = () => {
  const [{ profile, selected, t, company, module_ }] = useForm()
  const { token } = profile

  const current_: IVat = initVat
  const acc_modelid = formEnum.ACCOUNT
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const [accData, setAccData] = useState<IAccount[]>([])
  const minHeight = 300
  const maxHeight = 600
  const height = 28
  const colDef: ColDef[] = vatColumnDefs(t)
  const { header, body, table, disable, state, current, setCurrent, zIndex } = UseMasterfileForm(current_, colDef, selected)

  useEffect(() => {
    async function loadData() {
      if (isLoaded(acc_modelid)) {
        const cached: IAccount[] = iwsStore.getByModelId(acc_modelid)
        setAccData(cached)
      } else {
        await Get(acc_ctx, token, acc_modelid, setAccData)
      }
      // remove this line — see below
      // setCurrent(current_)
    }
    loadData()
  }, [token, company])

  // NOW the early return, after all hooks:
  if (module_ === '11111' || module_ === 11111) return <Login />

  const safeBody = React.isValidElement(body) ? body : null
  return (
    <>
      {header}
      <CInputGroup
        //@ts-ignore
        style={{ ...styles.outer, display: !state.collapseForm ? 'none' : '' }}>
        {safeBody ?? <VatMainForm current={current} setCurrent={setCurrent}
                                  accData={accData} t={t} disable={disable}
                                  height={height} zIndex={zIndex} />}
      </CInputGroup>
      <div style={{ ...styles.outer0, paddingTop: 2,
        height: state.collapseForm ? minHeight : maxHeight,
        display: state.collapseTable ? '' : 'none' }}>
        {table}
      </div>
    </>
  )
}
export default VatForm

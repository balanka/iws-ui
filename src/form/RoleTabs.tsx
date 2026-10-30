import IWSTabs from './IWSTabs.tsx'
import {RoleProps} from '../Props.ts'
import {RightGrid} from '../IWSGrid.tsx'
// @ts-expect-error -- legacy, see TODO
import type {RowSelectedEvent} from "ag-grid-community/dist/types/src/events";
import {
  UserRightsColumns,
} from "../ColumnsDefs.ts";

import {styles} from "./BasicTreeTableProps.tsx";
import MasterfileFormWithout from "./MasterfileFormWithout.tsx";

const RoleTabs = ({ collapse, current, setCurrent, disable, t, height }:RoleProps) => {

  const minHeight = 200
  const maxHeight = 300
  const onRightSelected = (event: RowSelectedEvent) => {
    setCurrent((event.data instanceof Array) ? event.data[0] : event.data)
  }

  const generalForm =
    <MasterfileFormWithout collapse={collapse}
                           current={current} setCurrent={setCurrent}
                           disable={disable} t={t} height={height} accData={[]} propertyName={""} fieldName={""}/>

  const rightTable =
        <div
          style={{...styles.outer, paddingTop:15, height: collapse?minHeight:maxHeight,  minWidth:"100%"}}>
            <RightGrid
            // @ts-expect-error -- legacy, see TODO
                theme="legacy" columnDefs={UserRightsColumns(t)} onRowSelected={onRightSelected}
                rowData={current?.rights}/>
        </div>


  const GetTabContent = () => {
    return [
      { title: t('common.general'), id: 1, form: generalForm },
      //{ title: t('role.title'), id: 2, form: getRoleTable() },
      { title: t('role.rights'), id: 2, form: rightTable },
    ]
  }

  return <IWSTabs tabList={GetTabContent()} />
}
export default RoleTabs

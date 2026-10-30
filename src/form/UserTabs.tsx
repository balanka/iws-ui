
import { UserMainForm } from './UserMainForm'
import IWSTabs from './IWSTabs.tsx'
import {UserFormProps} from '../Props.ts'
import {RightGrid, RoleGrid} from '../IWSGrid.tsx'
// @ts-expect-error -- legacy, see TODO
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {
  UserRightsColumns,
  UserRoleColumnDefs
} from '../ColumnsDefs.ts'
import {IRole, IUserRight} from '../Models.ts'
import {IDetailCellRendererParams, GridOptions} from 'ag-grid-community'
import {initRole} from "./Menu.tsx";

const UserTabs = ({ collapse, current, setCurrent, disable, t, height }:UserFormProps) => {
  const styles = {
    outer: {
      borderRadius: 5,
      boxShadow: "0 30px 40px #BBB",
      padding: 4,
    },
  }
  const minHeight = 200
  const maxHeight = 300

  const onRowSelected = (event: RowSelectedEvent) => {
    console.log('event.data', event.data)
    console.log('current.roles', current.roles)
    //setCurrent((event.data instanceof Array) ? event.data[0] : event.data)
  }
  const onRightSelected = (event: RowSelectedEvent) => {
    console.log('event.data', event.data)
    console.log('current.roles.rights', current?.roles[0].rights)
    //setCurrent((event.data instanceof Array) ? event.data[0] : event.data)
  }
  const defaultColDef  =  {
    resizable: true,
    editable: false,
    flex: 1,
    //floatingFilter: true,
    //filter: "agTextColumnFilter",
  }

  const gridOptions: GridOptions<IRole> = {
    rowStyle: { background: 'lightBlue' },
    // @ts-expect-error -- legacy, see TODO
    getRowStyle: (params: { node: { rowIndex: number} }) => {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#fff9e6' }
      }
    },

    defaultColDef,
    rowHeight: 20,
    rowSelection: {
      mode: "multiRow",
    },
    onRowSelected:onRowSelected,
    paginationPageSizeSelector: [5, 10, 20, 50],
    pagination: true,
    paginationPageSize: 10,
    //masterDetail: true,
    detailRowHeight: 200,
    detailRowAutoHeight: true,
    autoSizeStrategy: {
      type: "fitGridWidth",
    },
    // @ts-expect-error -- legacy, see TODO
    columnDefs: UserRoleColumnDefs(t),
    // @ts-expect-error -- legacy, see TODO
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs:UserRightsColumns(t),
        defaultColDef: {
          flex: 1,
        },
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.rights);
      },
    } as IDetailCellRendererParams<IRole, IUserRight>,
    alwaysShowVerticalScroll: true,
    //onFirstDataRendered: onFirstDataRendered,
  }
  const getGeneralForm = () =>
      <UserMainForm collapse ={collapse} current={current} setCurrent={setCurrent} disable={disable} t={t} height={height}/>

  const getRightTable = () => (
      <div  style={{...styles.outer, paddingTop:15, height: collapse?minHeight:maxHeight,  minWidth:"100%"}}>
        <RightGrid
            // @ts-expect-error -- legacy, see TODO
            theme="legacy" columnDefs={UserRightsColumns(t)} onRowSelected={onRightSelected}
            rowData={current?.rights}/>
      </div>
  )
  const getRoleTable = () => (
      <div  style={{...styles.outer, paddingTop:15, height: collapse?minHeight:maxHeight, display: !collapse ? 'none' : ''}}>
          <RoleGrid
          // @ts-expect-error -- legacy, see TODO
            theme="legacy" gridOptions ={gridOptions} onRowSelected={onRowSelected}
            rowData={current?.roles??initRole}/>
      </div>
  )
  const GetTabContent = () => {
    return [
      { title: t('common.general'), id: 1, form: getGeneralForm() },
      { title: t('role.title'), id: 2, form: getRoleTable() },
      { title: t('role.rights'), id: 3, form: getRightTable() },
    ]
  }

  return <IWSTabs tabList={GetTabContent()} />
}
export default UserTabs

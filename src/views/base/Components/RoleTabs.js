import React, { createRef } from 'react'
import { Tabs } from '../tabs/Tabs'
import { MasterfilesMainForm } from './FormsProps'
import { OptionsM, RightsColumns } from '../tables/LineFinancialsProps'
import EditableTable from '../tables/EditableTable'
import Grid from 'react-fast-grid'
import { Add, Edit } from './CrudController'
import { useStore } from './Menu'
import { useTranslation } from 'react-i18next'
import { styles } from '../Tree/BasicTreeTableProps'
import { blue } from '@material-ui/core/colors'

const RoleTabs = (props) => {
  // eslint-disable-next-line react/prop-types
  const { current, setCurrent, modifyUrl, data } = props
  const { profile } = useStore()
  const { t } = useTranslation()
  const { token } = profile
  const tableRef = createRef()

  const updateRow = async (newData, oldData) => {
    if (oldData) {
      const dx = { ...current }
      const idx = dx.rights.findIndex((obj) => obj.moduleid === newData.moduleid)
      delete newData.tableData
      if (idx === -1) dx.rights.push({ ...newData, moduleid: dx.moduleid })
      else dx.rights[idx] = { ...newData, moduleid: dx.moduleid }
      const isEditing = dx.editing
      delete dx.editing
      if (dx.id > 0 || isEditing) {
        Edit(modifyUrl, token, dx, data, setCurrent)
      } else {
        Add(modifyUrl, token, dx, data, setCurrent)
      }
    }
  }
  const deleteRow = async (oldData) => {
    if (oldData) {
      const dx = { ...current }
      const index = dx.rights.findIndex((obj) => obj.moduleid === oldData.moduleid)
      const deleted = dx.rights[index]
      dx.rights[index] = { ...deleted, moduleid: -2 }
      Edit(modifyUrl, token, dx, data(), setCurrent)
    }
  }

  const addRow = (newData) => {
    if (newData) {
      const dx = { ...current }
      const dx1 =
        // eslint-disable-next-line react/prop-types
        current.rights.length === 0
          ? // eslint-disable-next-line react/prop-types
            {
              ...current,
              rights: [
                {
                  // eslint-disable-next-line react/prop-types
                  ...current.rights.filter((e) => e.moduleid !== -1),
                  ...newData,
                  roleid: -1,
                  // eslint-disable-next-line react/prop-types
                  moduleid: current.moduleid,
                  // eslint-disable-next-line react/prop-types
                  short: current.short,
                },
              ],
            }
          : // eslint-disable-next-line react/prop-types
            (dx.rights[current.rights.length] = {
              ...newData,
              roleid: -1,
              // eslint-disable-next-line react/prop-types
              moduleid: current.moduleid,
              // eslint-disable-next-line react/prop-types
              short: current.short,
              modelid: 151,
            })
      // eslint-disable-next-line react/prop-types
      const record = current.rights.length > 1 ? dx : dx1
      delete record.editing
      const result =
        record.id > 0
          ? Edit(modifyUrl, token, record, rights_(), setCurrent)
          : Add(modifyUrl, token, record, rights_(), setCurrent)
      setCurrent(result)
    }
  }
  const OnRowAdd = async (newData) => addRow(newData)
  const editable = () => ({ onRowAdd: OnRowAdd, onRowUpdate: updateRow, onRowDelete: deleteRow })
  const getGeneralForm = () => (
    <Grid
      container
      spacing={0.5}
      style={{ ...styles.inner, backgroundColor: blue }}
      direction="column"
    >
      <MasterfilesMainForm current={current} setCurrent={setCurrent} t={t} height={35} />
    </Grid>
  )

  // eslint-disable-next-line react/prop-types
  let current_
  const rights_ = () =>
    // eslint-disable-next-line react/prop-types
    Array.isArray(current?.rights) && current.rights?.length > 0 ? current.rights : current_.rights
  const getTable = () => (
    <Grid
      container
      spacing={0.5}
      style={{ ...styles.inner, backgroundColor: blue }}
      direction="column"
    >
      <EditableTable
        id="LineTable"
        Options={{ ...OptionsM, paging: rights_().length > 5 }}
        flag={false}
        data={rights_()}
        /* eslint-disable-next-line react/prop-types */
        columns={RightsColumns(data, current.rights[0], current, t)}
        t={t}
        editable={editable()}
        tableRef={tableRef}
      />
    </Grid>
  )

  const GetTabContent = () => {
    return [
      { title: t('common.general'), id: 1, form: getGeneralForm() },
      { title: t('role.rights'), id: 2, form: getTable() },
    ]
  }

  return <Tabs tabList={GetTabContent()} />
}
export default RoleTabs

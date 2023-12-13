/* eslint-disable */
import React, { createRef } from 'react'
import { Tabs } from '../tabs/Tabs'
import { UserForm } from './FormsProps'
import { OptionsM, RightsColumns, RoleColumns } from '../tables/LineFinancialsProps'
import EditableTable from '../tables/EditableTable'
import { formEnum } from '../utils/FORMS'
import Grid from "react-fast-grid";
import { Add, Edit } from './CrudController'
import { useStore } from "./Menu";
import { useTranslation } from "react-i18next";
import {styles} from "../Tree/BasicTreeTableProps";
import {blue} from "@material-ui/core/colors";
const UserTabs =  (props) => {
  const {formid, current, setCurrent,  modifyUrl, data} = props
  const {profile,} = useStore()
  const {t,} = useTranslation()
  const {token, company, locale, currency} = profile
  const tableRef = createRef()
  const roleTableRef = createRef()

  const updateRow = async (newData, oldData) =>{
    if (oldData) {
      const dx = {...current}
      const idx = dx.rights.findIndex(obj => obj.moduleid === newData.moduleid)
      delete newData.tableData
      (idx === -1) ? dx.rights.push({...newData, moduleid: dx.moduleid}) : dx.rights[idx] = {
        ...newData,
        moduleid: dx.moduleid
      }
      const isEditing = dx.editing
      delete dx.editing
      if (dx.id > 0 || isEditing) {
        Edit(modifyUrl, token, dx, data, setCurrent)
      } else {
        Add(modifyUrl, token, dx, data, setCurrent)
      }
    }
  }
  const deleteRow = async (oldData) =>{
    if (oldData) {
      const dx = {...current}
      const index = dx.rights.findIndex(obj => obj.moduleid === oldData.moduleid)
      const deleted = dx.rights[index]
      dx.rights[index] = {...deleted, moduleid: -2}
      Edit(modifyUrl, token, dx, data(), setCurrent)
    }
  }

  const addRow = (newData) =>{
    if (newData) {
      const dx = {...current}
      const dx1 = current.rights.length === 0 ?
        {
          ...current, rights: [{
            ...current.rights.filter(e => e.moduleid !== -1), ...newData
            , roleid: -1, moduleid: current.moduleid, short: current.short
          }]
        } :
        (dx.rights[current.rights.length] = {
          ...newData,
          roleid: -1,
          moduleid: current.moduleid,
          short: current.short,
          modelid: 151
        })
      const record = (current.rights.length > 1) ? dx : dx1
      delete record.editing
       record.id > 0 ?
         Edit(modifyUrl, token, record, rights_(), setCurrent) :
         Add(modifyUrl, token, record, rights_(), setCurrent)

    }
  }
  const OnRowAdd = async (newData) => addRow(newData)
  const  editable = () => ({onRowAdd: OnRowAdd, onRowUpdate:  updateRow, onRowDelete:  deleteRow})
  const getGeneralForm = () =>
        (
         <Grid container spacing={0.5} style={{...styles.inner, 'backgroundColor': blue}} direction='column'>
           <UserForm  current={current} setCurrent={setCurrent} t={t} height={35}/>
         </Grid>
       )



  const rights_ =()=> Array.isArray(current?.rights)&&current.rights?.length >0 ? current.rights:[]
  const roles_ =()=> Array.isArray(current?.roles)&&current.roles?.length >0 ? current.roles:[]
  const getRightTable = () =>
     (
        <Grid container spacing={0.5} style={{...styles.inner, 'backgroundColor': blue}} direction='column'>
          <EditableTable id='LineTable' Options ={{...OptionsM, paging:rights_().length>5}} flag={false} data={rights_()}
                         columns={ RightsColumns (data, current.rights[0], current,  t)} editable={editable()}  t={t}
                         tableRef={tableRef} />
        </Grid>
    )
  const getRoleTable = () =>
    (
      <Grid container spacing={0.5} style={{...styles.inner, 'backgroundColor': blue}} direction='column'>
        <EditableTable id='RoleTable' Options ={{...OptionsM, paging:roles_().length>5}} flag={false} data={roles_()}
                       columns={ RoleColumns (data, current.roles[0], current,  t)} editable={editable()}  t={t}
                       tableRef={roleTableRef} />
      </Grid>
    )
  const GetTabContent = (mainFormId) => {
    return [
      {title: t('common.general'), id: 1, form: getGeneralForm()},
      {title: t('role.title'), id: 2, form: getRoleTable()},
      {title: t('role.rights'), id: 3, form: getRightTable()},
    ]
  }

  return <Tabs tabList={GetTabContent(formid)}/>
}
export default UserTabs

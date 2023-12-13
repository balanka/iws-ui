/* eslint-disable */
import React, { createRef } from 'react'
import { Tabs } from '../tabs/Tabs'
import {AddressForm, CustomerGeneralForm, FormFactory, FormWrapper, FormWrapper2} from './FormsProps'
import {ColumnFactory, OptionsM} from '../tables/LineFinancialsProps'
import EditableTable from '../tables/EditableTable'
import { formEnum } from '../utils/FORMS'
import Grid from "react-fast-grid";
import { Add, Edit } from './CrudController'
import { useStore } from "./Menu";
import { useTranslation } from "react-i18next";
import {styles} from "../Tree/BasicTreeTableProps";
import {blue} from "@material-ui/core/colors";

const CustomerTabs =  (props) => {
  const {formid, current, setCurrent, accData, vatData, bankData, modifyUrl, data, tableRef} = props
  const {profile,} = useStore()
  const {t,} = useTranslation()
  const {token, company, locale, currency} = profile
 // const tableRef = createRef()
  const columnsX = (formid) => ColumnFactory(formid, bankData, t, profile.locale, profile.currency)
  const addRow = (newData) => {
    const dx = {...current}
    const company = (formid === formEnum.COMPANY) ? current.id : current.company
    dx.bankaccounts[dx.bankaccounts.length] = {...newData, owner: current.id, company: company, modelid: -3}
    Add(modifyUrl, token, dx, data, setCurrent)
    setCurrent({...dx})
  }
  const updateRow = (newData, oldData) => {
    const dx = {...current}
    const index = dx.bankaccounts.findIndex(obj => obj.id === oldData.id)
    dx.bankaccounts[index] = {...newData, owner: current.id, modelid: -2}
    Edit(modifyUrl, token, dx, data, setCurrent)
  }
  const deleteRow = (oldData) => {
    const dx = {...current}
    const index = dx.bankaccounts.findIndex(obj => obj.id === oldData.id)
    console.log('index', index)
    const deleted = dx.bankaccounts[index]
    console.log('deleted', deleted)
    dx.bankaccounts[index] = {...deleted, modelid: -1}
    Edit(modifyUrl, token, dx, data, setCurrent)
  }

  const editable = () => ({
    onRowAdd: async (newData) => addRow(newData),
    onRowUpdate: async (newData, oldData) => updateRow(newData, oldData),
    onRowDelete: async (oldData) => deleteRow(oldData)
  })

  const getSubFormId = (mainFormId) => {
    switch (mainFormId) {
      case formEnum.CUSTOMER:
      case formEnum.EMPLOYEE:
      case formEnum.SUPPLIER:
        return formEnum.BUSINESS_PARTNER_GENERAL_INFO_FORM
      case formEnum.COMPANY:
        return  formEnum.COMPANY_GENERAL_INFO_FORM
      default:
        return <>Invalid Tab</>
    }
  }
  const getAccountFormId = (mainFormId) => {
    switch (mainFormId) {
      case formEnum.CUSTOMER:
      case formEnum.EMPLOYEE:
      case formEnum.SUPPLIER:
        return formEnum.BUSINESS_PARTNER_ACCOUNT_FORM
      case formEnum.COMPANY:
       return  formEnum.COMPANY_ACCOUNT_FORM
      default:
        return <>Invalid Tab</>
    }
  }

  const getAddressForm = () =>  <FormWrapper {...props} form = {AddressForm}/>
  const getGeneralForm = (mainFormId) =>
        <FormFactory formid={getSubFormId(mainFormId)}  current={current}
                           setCurrent={setCurrent} t={t} height={35}/>

  const getAccountForm = (mainFormId) =>
    <FormFactory formid={getAccountFormId(mainFormId)}   current={current}
                  setCurrent={setCurrent} t={t} accData={accData} vatData={vatData} height={35}/>

  const getTable = (formid) =>
        <Grid container spacing={0.5} style={{...styles.inner, 'backgroundColor': blue}} direction='column'>
          <EditableTable id='bankaccouts' Options={{...OptionsM, paging: false}} flag={false}
                         data={current ? current.bankaccounts : []} columns={columnsX(formid)}
                         editable={editable()} t={t} tableRef={tableRef}/>
        </Grid>

  const GetTabContent = (mainFormId, subFormId) => {
    return [
      {title: t('common.general'), id: 1, form: getGeneralForm(mainFormId)},
      {title: t('common.address'), id: 2, form: getAddressForm()},
      {title: t('common.accounts'), id: 3, form: getAccountForm(mainFormId)},
      {title: t('common.bankaccounts'), id: 4, form: getTable(subFormId)},
    ]
  }

  return <Tabs tabList={GetTabContent(formid, formEnum.BANKACCOUNT)}/>
}
export default CustomerTabs

import React from 'react'
import { Tabs } from '../tabs/Tabs'
import { AddressForm, FormFactory, FormWrapper } from './FormsProps'
import { ColumnFactory, Options } from '../tables/LineFinancialsProps'
import EditableTable from '../tables/EditableTable'
import { formEnum } from '../utils/FORMS'
import Grid from 'react-fast-grid'
import { Add, Edit } from './CrudController'
import { styles } from '../Tree/BasicTreeTableProps'
import { blue } from '@material-ui/core/colors'

const CustomerTabs = (props) => {
  // eslint-disable-next-line react/prop-types
  const {
    // eslint-disable-next-line react/prop-types
    formid,
    // eslint-disable-next-line react/prop-types
    current,
    // eslint-disable-next-line react/prop-types
    setCurrent,
    // eslint-disable-next-line react/prop-types
    accData,
    // eslint-disable-next-line react/prop-types
    vatData,
    // eslint-disable-next-line react/prop-types
    bankData,
    // eslint-disable-next-line react/prop-types
    modifyUrl,
    // eslint-disable-next-line react/prop-types
    data,
    // eslint-disable-next-line react/prop-types
    tableRef,
    // eslint-disable-next-line react/prop-types
    t,
    // eslint-disable-next-line react/prop-types
    locale,
    // eslint-disable-next-line react/prop-types
    currency,
    // eslint-disable-next-line react/prop-types
    token,
    /* eslint-disable-next-line react/prop-types */
    disable,
  } = props
  const columnsX = (formid) => ColumnFactory(formid, bankData, t, locale, currency)
  const addRow = (newData) => {
    const dx = { ...current }
    // eslint-disable-next-line react/prop-types
    const company = formid === formEnum.COMPANY ? current.id : current.company
    dx.bankaccounts[dx.bankaccounts.length] = {
      ...newData,
      // eslint-disable-next-line react/prop-types
      owner: current.id,
      company: company,
      modelid: -3,
    }
    Add(modifyUrl, token, dx, data, setCurrent)
    setCurrent({ ...dx })
  }
  const updateRow = (newData, oldData) => {
    const dx = { ...current }
    const index = dx.bankaccounts.findIndex((obj) => obj.id === oldData.id)
    // eslint-disable-next-line react/prop-types
    dx.bankaccounts[index] = { ...newData, owner: current.id, modelid: -2 }
    Edit(modifyUrl, token, dx, data, setCurrent)
  }
  const deleteRow = (oldData) => {
    const dx = { ...current }
    const index = dx.bankaccounts.findIndex((obj) => obj.id === oldData.id)
    console.log('index', index)
    const deleted = dx.bankaccounts[index]
    console.log('deleted', deleted)
    dx.bankaccounts[index] = { ...deleted, modelid: -1 }
    Edit(modifyUrl, token, dx, data, setCurrent)
  }

  const editable = () => ({
    onRowAdd: async (newData) => addRow(newData),
    onRowUpdate: async (newData, oldData) => updateRow(newData, oldData),
    onRowDelete: async (oldData) => deleteRow(oldData),
  })

  const getSubFormId = (mainFormId) => {
    switch (mainFormId) {
      case formEnum.CUSTOMER:
      case formEnum.EMPLOYEE:
      case formEnum.SUPPLIER:
        return formEnum.BUSINESS_PARTNER_GENERAL_INFO_FORM
      case formEnum.COMPANY:
        return formEnum.COMPANY_GENERAL_INFO_FORM
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
        return formEnum.COMPANY_ACCOUNT_FORM
      default:
        return <>Invalid Tab</>
    }
  }

  const getAddressForm = () => <FormWrapper {...props} form={AddressForm} />
  const getGeneralForm = (mainFormId) => (
    <FormFactory
      formid={getSubFormId(mainFormId)}
      current={current}
      setCurrent={setCurrent}
      t={t}
      height={35}
      disable={disable}
    />
  )

  const getAccountForm = (mainFormId) => (
    <FormFactory
      formid={getAccountFormId(mainFormId)}
      current={current}
      setCurrent={setCurrent}
      t={t}
      accData={accData}
      vatData={vatData}
      height={35}
      disable={disable}
    />
  )

  const getTable = (formid) => (
    <Grid
      container
      spacing={0.5}
      style={{ ...styles.inner, backgroundColor: blue }}
      direction="column"
    >
      <EditableTable
        id="bankaccouts"
        Options={{
          ...Options,
          tableLayout: 'auto',
          // eslint-disable-next-line react/prop-types
          paging: current.bankaccounts.length > 8,
          search: true,
          pageSizeOptions: [5, 10, 20],
        }}
        flag={false}
        /* eslint-disable-next-line react/prop-types */
        data={current ? current.bankaccounts : []}
        columns={columnsX(formid)}
        editable={editable()}
        t={t}
        tableRef={tableRef}
      />
    </Grid>
  )
  const GetTabContent = (mainFormId) => {
    return [
      { title: t('common.general'), id: 1, form: getGeneralForm(mainFormId) },
      { title: t('common.address'), id: 2, form: getAddressForm() },
      { title: t('common.accounts'), id: 3, form: getAccountForm(mainFormId) },
      { title: t('common.bankaccounts'), id: 4, form: getTable(formEnum.BANKACCOUNT) },
    ]
  }

  return <Tabs tabList={GetTabContent(formid)} />
}
export default CustomerTabs

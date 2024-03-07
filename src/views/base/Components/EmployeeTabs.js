import React from 'react'
import { Tabs } from '../tabs/Tabs'
import { AddressForm, FormFactory, FormInCollapsibleWrapper } from './FormsProps'
import { ColumnFactory, Options } from '../tables/LineFinancialsProps'
import EditableTable from '../tables/EditableTable'
import { formEnum } from '../utils/FORMS'
import Grid from 'react-fast-grid'
import { Add, Edit } from './CrudController'
import { useTranslation } from 'react-i18next'
import { styles } from '../Tree/BasicTreeTableProps'
import { blue } from '@material-ui/core/colors'

const EmployeeTabs = (props) => {
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
    tableRef2,
    // eslint-disable-next-line react/prop-types
    locale,
    // eslint-disable-next-line react/prop-types
    currency,
    // eslint-disable-next-line react/prop-types
    token,
    // eslint-disable-next-line react/prop-types
    company,
    // eslint-disable-next-line react/prop-types
    disable,
  } = props
  const { t } = useTranslation()
  const columnsX = (formid) => ColumnFactory(formid, bankData, t, locale, currency)
  const columnsY = (formid) => ColumnFactory(formid, accData, t, locale, currency)
  const addRow = (newData) => {
    const dx = { ...current }
    // eslint-disable-next-line react/prop-types
    const companyx = formid === formEnum.COMPANY ? current.id : company
    dx.bankaccounts[dx.bankaccounts.length] = {
      ...newData,
      // eslint-disable-next-line react/prop-types
      owner: current.id,
      company: companyx,
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

  const addSalaryItem = (newData) => {
    const dx = { ...current }
    console.log('dx', dx)
    // eslint-disable-next-line react/prop-types
    dx.salaryItems[dx.salaryItems.length] = {
      ...newData,
      id: '-3',
      // eslint-disable-next-line react/prop-types
      owner: current.id,
      // eslint-disable-next-line react/prop-types
      company: current.company,
    }
    Add(modifyUrl, token, dx, data, setCurrent)
    setCurrent({ ...dx })
  }
  const updateSalaryItem = (newData, oldData) => {
    const dx = { ...current }
    console.log('dx', dx)
    const index = dx.salaryItems.findIndex(
      (obj) => obj.id === oldData.id && obj.owner === oldData.owner,
    )
    console.log('index', index)
    // eslint-disable-next-line react/prop-types
    dx.salaryItems[index] = { ...newData, id: '-2' }
    Edit(modifyUrl, token, dx, data, setCurrent)
  }
  const deleteSalaryItem = (oldData) => {
    const dx = { ...current }
    const index = dx.salaryItems.findIndex(
      (obj) => obj.id === oldData.id && obj.owner === oldData.owner,
    )
    console.log('index', index)
    const deleted = dx.salaryItems[index]
    console.log('deleted', deleted)
    dx.salaryItems[index] = { ...deleted, id: '-1' }
    Edit(modifyUrl, token, dx, data, setCurrent)
  }
  const SalaryItemEditable = () => ({
    onRowAdd: async (newData) => addSalaryItem(newData),
    onRowUpdate: async (newData, oldData) => updateSalaryItem(newData, oldData),
    onRowDelete: async (oldData) => deleteSalaryItem(oldData),
  })
  const editable = () => ({
    onRowAdd: async (newData) => addRow(newData),
    onRowUpdate: async (newData, oldData) => updateRow(newData, oldData),
    onRowDelete: async (oldData) => deleteRow(oldData),
  })
  const getGeneralForm = () => (
    <FormFactory
      formid={formEnum.BUSINESS_PARTNER_GENERAL_INFO_FORM}
      current={current}
      setCurrent={setCurrent}
      t={t}
      locale={locale}
      currency={currency}
      height={35}
      disable={disable}
    />
  )

  const getAccountForm = () => (
    <FormFactory
      formid={formEnum.BUSINESS_PARTNER_ACCOUNT_FORM}
      current={current}
      setCurrent={setCurrent}
      t={t}
      accData={accData}
      vatData={vatData}
      locale={locale}
      currency={currency}
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
        Options={{ ...Options, paging: false }}
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

  const getSalaryItemTable = (formid) => {
    // eslint-disable-next-line react/prop-types
    console.log('current.salaryItem', current.salaryItems)
    return (
      <Grid
        container
        spacing={0.5}
        style={{ ...styles.inner, backgroundColor: blue }}
        direction="column"
      >
        <EditableTable
          id="salaryItems"
          Options={{ ...Options, paging: false }}
          flag={false}
          /* eslint-disable-next-line react/prop-types */
          data={current ? current.salaryItems : []}
          columns={columnsY(formid)}
          editable={SalaryItemEditable()}
          t={t}
          tableRef={tableRef2}
        />
      </Grid>
    )
  }
  const getAddressForm = () => <FormInCollapsibleWrapper {...props} form={AddressForm} />
  const GetTabContent = (mainFormId, subFormId) => {
    return [
      { title: t('common.general'), id: 1, form: getGeneralForm() },
      { title: t('common.address'), id: 2, form: getAddressForm() },
      { title: t('common.accounts'), id: 3, form: getAccountForm() },
      { title: t('common.bankaccounts'), id: 4, form: getTable(formEnum.BANKACCOUNT) },
      { title: t('salary.item.title'), id: 5, form: getSalaryItemTable(subFormId) },
    ]
  }

  return <Tabs tabList={GetTabContent(formid, formEnum.EMPLOYEE_SALARY_ITEM_TABLE)} />
}
export default EmployeeTabs

import React from 'react'
import { Tabs } from '../tabs/Tabs'
import { AddressForm, FormFactory } from './FormsProps'
import { ColumnFactory, Options } from '../tables/LineFinancialsProps'
import EditableTable from '../tables/EditableTable'
import { formEnum } from '../utils/FORMS'
import Grid from 'react-fast-grid'
import { Add, Edit } from './CrudController'
import { useStore } from './Menu'
import { useTranslation } from 'react-i18next'
import { styles } from '../Tree/BasicTreeTableProps'
import { blue } from '@material-ui/core/colors'

const EmployeeTabs = (props) => {
  console.log('props', props)
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
    // onNewBankAccount,
    // eslint-disable-next-line react/prop-types
    // onNewSalaryItem,
  } = props
  const { profile } = useStore()
  const { t } = useTranslation()
  const { token, company, locale, currency } = profile
  console.log('locale', locale)
  console.log('accData', accData)
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

  const getSubFormId = (mainFormId) => {
    switch (mainFormId) {
      case formEnum.EMPLOYEE:
        return formEnum.BUSINESS_PARTNER_GENERAL_INFO_FORM
      default:
        return <>Invalid Tab</>
    }
  }
  const getAccountFormId = (mainFormId) => {
    switch (mainFormId) {
      case formEnum.EMPLOYEE:
        return formEnum.BUSINESS_PARTNER_ACCOUNT_FORM
      default:
        return <>Invalid Tab</>
    }
  }

  const getGeneralForm = (mainFormId) => (
    <FormFactory
      formid={getSubFormId(mainFormId)}
      current={current}
      setCurrent={setCurrent}
      t={t}
      height={35}
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
  const GetTabContent = (mainFormId, subFormId) => {
    return [
      { title: t('common.general'), id: 1, form: getGeneralForm(mainFormId) },
      {
        title: t('common.address'),
        id: 2,
        form: <AddressForm current={current} setCurrent={setCurrent} t={t} />,
      },
      { title: t('common.accounts'), id: 3, form: getAccountForm(mainFormId) },
      { title: t('common.bankaccounts'), id: 4, form: getTable(formEnum.BANKACCOUNT) },
      { title: t('salary.item.title'), id: 5, form: getSalaryItemTable(subFormId) },
    ]
  }

  return <Tabs tabList={GetTabContent(formid, formEnum.EMPLOYEE_SALARY_ITEM_TABLE)} />
}
export default EmployeeTabs

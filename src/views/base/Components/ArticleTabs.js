import React from 'react'
import { Tabs } from '../tabs/Tabs'
import { FormFactory } from './FormsProps'
import { formEnum } from '../utils/FORMS'
import Grid from 'react-fast-grid'
import { styles } from '../Tree/BasicTreeTableProps'
import { blue } from '@material-ui/core/colors'
import EditableTable from '../tables/EditableTable'
import { ColumnFactory, Options } from '../tables/LineFinancialsProps'

const ArticleTabs = (props) => {
  // eslint-disable-next-line react/prop-types
  console.log('props >>>>>++++', props)
  const {
    // eslint-disable-next-line react/prop-types
    current, // eslint-disable-next-line react/prop-types
    setCurrent, // eslint-disable-next-line react/prop-types
    accData, // eslint-disable-next-line react/prop-types
    vatData, // eslint-disable-next-line react/prop-types
    stockData, // eslint-disable-next-line react/prop-types
    tableRef, // eslint-disable-next-line react/prop-types
    locale, // eslint-disable-next-line react/prop-types
    currency, // eslint-disable-next-line react/prop-types
    t, // eslint-disable-next-line react/prop-types
    disable, // eslint-disable-next-line react/prop-types
    height,
  } = props

  const columnsX = (formid) => ColumnFactory(formid, stockData, t, locale, currency)
  const getTable = (formid) => (
    <Grid
      container
      spacing={0.5}
      style={{ ...styles.inner, backgroundColor: blue }}
      direction="column"
    >
      <EditableTable
        id="stock"
        Options={{
          ...Options,
          tableLayout: 'auto', // eslint-disable-next-line react/prop-types
          paging: current ? current.stocks?.length > 8 : false,
          search: true,
          pageSizeOptions: [5, 10, 20],
        }}
        flag={false} // eslint-disable-next-line react/prop-types
        data={current ? current.stocks : []}
        columns={columnsX(formid)}
        //editable={editable()}
        t={t}
        tableRef={tableRef}
      />
    </Grid>
  )

  const getGeneralForm = () => (
    <FormFactory
      formid={formEnum.ARTICLE_GENERAL_INFO_FORM}
      current={current}
      setCurrent={setCurrent}
      t={t}
      height={height}
      disable={disable}
    />
  )

  const getAccountForm = () => (
    <FormFactory
      formid={formEnum.ARTICLE_ACCOUNT_FORM}
      current={current}
      setCurrent={setCurrent}
      t={t}
      collapse={true}
      accData={accData}
      vatData={vatData}
      height={height}
      disable={disable}
    />
  )
  const GetTabContent = () => {
    return [
      { title: t('common.general'), id: 1, form: getGeneralForm() },
      { title: t('common.accounts'), id: 2, form: getAccountForm() },
      { title: t('stock.title'), id: 3, form: getTable(formEnum.STOCK) },
    ]
  }

  return <Tabs tabList={GetTabContent()} />
}
export default ArticleTabs

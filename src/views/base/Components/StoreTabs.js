import React from 'react'
import { Tabs } from '../tabs/Tabs'
import { MasterfilesMainForm2 } from './FormsProps'
import { formEnum } from '../utils/FORMS'
import Grid from 'react-fast-grid'
import { styles } from '../Tree/BasicTreeTableProps'
import { blue } from '@material-ui/core/colors'
import EditableTable from '../tables/EditableTable'
import { ColumnFactory, Options } from '../tables/LineFinancialsProps'

const StoreTabs = (props) => {
  // eslint-disable-next-line react/prop-types
  const {
    // eslint-disable-next-line react/prop-types
    current, // eslint-disable-next-line react/prop-types
    setCurrent, // eslint-disable-next-line react/prop-types
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
        id="store_stock"
        Options={{
          ...Options,
          tableLayout: 'auto', // eslint-disable-next-line react/prop-types
          paging: current ? current.stocks?.length > 8 : false,
          search: true,
          pageSizeOptions: [5, 10, 20],
        }}
        flag={false} // eslint-disable-next-line react/prop-types
        data={current ? current.stocks ?? [] : []}
        columns={columnsX(formid)}
        //editable={editable()}
        t={t}
        tableRef={tableRef}
      />
    </Grid>
  )

  const getGeneralForm = () => (
    <MasterfilesMainForm2
      current={current}
      setCurrent={setCurrent}
      t={t}
      height={height}
      disable={disable}
    />
  )
  const GetTabContent = () => {
    console.log('current>>>>>', current)
    return [
      { title: t('common.general'), id: 1, form: getGeneralForm() },
      { title: t('stock.title'), id: 2, form: getTable(formEnum.STOCK) },
    ]
  }

  return <Tabs tabList={GetTabContent()} />
}
export default StoreTabs

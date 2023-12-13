import React from 'react'
import { Tabs } from '../tabs/Tabs'
import { BankStatementMainForm, BankStatementParameterForm } from './FormsProps'

import Grid from 'react-fast-grid'
import { styles } from '../Tree/BasicTreeTableProps'
import { blue } from '@material-ui/core/colors'
import { useStore } from './Menu'
const BankStatementTabs = (props) => {
  // eslint-disable-next-line react/prop-types
  const { current, setCurrent, t, locale, currency, height } = props
  const { profile } = useStore()
  const { company } = profile

  const getGeneralForm = () => (
    <Grid
      container
      spacing={0.5}
      style={{ ...styles.inner, backgroundColor: blue }}
      direction="column"
    >
      <BankStatementMainForm
        current={current}
        setCurrent={setCurrent}
        t={t}
        locale={locale}
        currency={currency}
        height={height}
      />
    </Grid>
  )

  const getParameterForm = () => (
    <Grid
      container
      spacing={0.5}
      style={{ ...styles.inner, backgroundColor: blue }}
      direction="column"
    >
      <BankStatementParameterForm
        current={current}
        setCurrent={setCurrent}
        t={t}
        company={company}
        height={35}
      />
    </Grid>
  )

  const GetTabContent = () => {
    return [
      { title: t('common.general'), id: 1, form: getGeneralForm() },
      { title: t('bankstatement.parameter'), id: 2, form: getParameterForm() },
    ]
  }

  return <Tabs tabList={GetTabContent()} />
}
export default BankStatementTabs

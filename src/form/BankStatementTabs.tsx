import React from 'react'
import { IWSTabs } from './IWSTabs.tsx'
import Grid from 'react-fast-grid'
import { styles } from './BasicTreeTableProps'
import {BankStatementMainForm, BankStatementParameterForm} from './FormsProps'
import {BankStatementProps} from "../Props.ts";

const BankStatementTabs = ({ collapse, current, setCurrent,  locale,  t,  currency, height }:BankStatementProps) => {

  const getGeneralForm = () =>
      <BankStatementMainForm collapse={collapse} current={current} setCurrent={setCurrent} t={t}
                             locale={locale} currency={currency} height={height}/>
  const getParameterForm = () =>
    <Grid container spacing={1} style={{ ...styles.inner, backgroundColor: "#bbdefb", display: !collapse?'none':'' }} direction="column">
      <BankStatementParameterForm current={current} setCurrent={setCurrent} t={t} height={35}/>
    </Grid>


  const GetTabContent = () => {
    return [
      { title: t('common.general'), id: 1, form: getGeneralForm() },
      { title: t('bankstatement.parameter'), id: 2, form: getParameterForm() },
    ]
  }

  return <IWSTabs tabList={GetTabContent()} />
}
export default BankStatementTabs

import React, { memo } from 'react'
import { Tabs } from '../tabs/Tabs'
import { FormFactory } from './FormsProps'
import { formEnum } from '../utils/FORMS'

const ArticleTabs = (props) => {
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
    t,
    /* eslint-disable-next-line react/prop-types */
    disable,
    // eslint-disable-next-line react/prop-types
    height,
  } = props

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
      accData={accData}
      vatData={vatData}
      height={height}
      disable={disable}
    />
  )
  const GetTabContent = () => {
    return [
      { title: t('common.general'), id: 1, form: getGeneralForm() },
      { title: t('common.accounts'), id: 3, form: getAccountForm() },
    ]
  }

  return <Tabs tabList={GetTabContent()} />
}
export default ArticleTabs

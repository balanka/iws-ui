import React, { memo } from 'react'
import { Tabs } from '../tabs/Tabs'
import { FormFactory } from './FormsProps'
import { formEnum } from '../utils/FORMS'

const ArticleTabs = (props) => {
  // eslint-disable-next-line react/prop-types
  console.log('props >>>>>++++', props)
  const {
    // eslint-disable-next-line react/prop-types
    current, // eslint-disable-next-line react/prop-types
    setCurrent, // eslint-disable-next-line react/prop-types
    accData, // eslint-disable-next-line react/prop-types
    vatData, // eslint-disable-next-line react/prop-types
    t, // eslint-disable-next-line react/prop-types
    disable, // eslint-disable-next-line react/prop-types
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
    ]
  }

  return <Tabs tabList={GetTabContent()} />
}
export default ArticleTabs

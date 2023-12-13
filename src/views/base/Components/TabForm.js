import React from 'react'
import { Tabs } from '../tabs/Tabs'

const TabForm = (props) => {
  // eslint-disable-next-line react/prop-types
  const { tabList } = props
  return <Tabs tabList={tabList} />
}
export default TabForm

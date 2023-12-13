import React, { useState } from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import PropTypes from 'prop-types'

export const Tabs = (props) => {
  const tabList = props.tabList
  const [activeKey, setActiveKey] = useState(1)
  const getNavItem = (item) => {
    const isActive = () => activeKey === item.id
    return (
      <CNavItem role="presentation">
        <CNavLink
          active={isActive()}
          component="button"
          role="tab"
          aria-controls={`${item.title}-tab-pane`}
          aria-selected={isActive()}
          onClick={() => setActiveKey(item.id)}
        >
          {item.title}
        </CNavLink>
      </CNavItem>
    )
  }
  const getPane = (item) => {
    const isVisible = () => activeKey === item.id
    return (
      <CTabPane role="tabpanel" aria-labelledby={item.title} visible={isVisible()}>
        {item.form}
      </CTabPane>
    )
  }

  return (
    <>
      <CNav variant="pills" role="tablist">
        {tabList.map((item) => getNavItem(item))}
      </CNav>
      <CTabContent>{tabList.map((item) => getPane(item))}</CTabContent>
    </>
  )
}
Tabs.propTypes = {
  tabList: PropTypes.array,
}
export default Tabs

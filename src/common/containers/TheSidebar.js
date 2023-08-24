import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  //CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CNavItem,
  CProgress,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem
} from '@coreui/react'
import CCreateElement from './CCreateElement'
import CIcon from '@coreui/icons-react'

// sidebar nav config
import Navigation from './Navigation'
import {useTranslation} from "react-i18next";
import logo_svg from '../../assets/icons/logo-kabasoft.svg';

const TheSidebar = () => {
  const { t,  } = useTranslation();
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)


  return (
    <CSidebar
      show={show}
      unfoldable
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}

    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={95}
          src={logo_svg}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={25}
        />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={Navigation(t)}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
          }}
        />

        <CSidebarNavDivider />
        <CSidebarNavTitle>System Utilization</CSidebarNavTitle>
        <CNavItem className="px-3 d-compact-none c-d-minimized-none">
          <div className="text-uppercase mb-1"><small><b>CPU Usage</b></small></div>
          <CProgress size="xs" value={25} color="info" />
          <small className="text-muted">348 Processes. 1/4 Cores.</small>
        </CNavItem>
        <CNavItem className="px-3 d-compact-none c-d-minimized-none">
          <div className="text-uppercase mb-1"><small><b>Memory Usage</b></small></div>
          <CProgress size="xs" value={70} color="warning" />
          <small className="text-muted">11444GB/16384MB</small>
        </CNavItem>
        <CNavItem className="px-3 mb-3 d-compact-none c-d-minimized-none">
          <div className="text-uppercase mb-1"><small><b>SSD 1 Usage</b></small></div>
          <CProgress size="xs" value={95} color="danger" />
          <small className="text-muted">243GB/256GB</small>
        </CNavItem>
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)

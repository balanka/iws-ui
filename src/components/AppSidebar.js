import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarHeader, CSidebarNav } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
//import { ReactSVG } from 'react-svg'
import '../scss/simplebar.min.css'

import Navigation from './Navigation'
import { useTranslation } from 'react-i18next'
import CIcon from '@coreui/icons-react'

import { logo1 } from '../assets/icons/logo1'
//import { sygnet } from '../assets/brand/sygnet'

//https://github.com/coreui/coreui-free-react-admin-template/issues/154
const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const { t } = useTranslation()
  const handleClickOpen = (event) => {
    console.log('handleClickOpen', event.target.childNodes[0].textContent)
    console.log('handleClickOpen', event.target.childNodes[0].data)
    console.log('handleClickOpen', event.target.value)
  }

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand className="d-none d-md-flex" to="/">
          <CIcon customClassName="sidebar-brand-full" icon={logo1} height={100} width={300} />
        </CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav onClick={handleClickOpen}>
        <SimpleBar>
          <AppSidebarNav items={Navigation(t)} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)

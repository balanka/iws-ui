import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarHeader, CSidebarNav } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import Navigation from './Navigation'
import CIcon from '@coreui/icons-react'
import { logo } from '../assets/icons/logo'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state:any) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state:any) => state.sidebarShow)

  // @ts-ignore
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

        <CSidebarBrand className="d-none d-md-flex"
                    // @ts-ignore
                       to="/">
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={100} width={200} />
        </CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={Navigation()} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}
export default AppSidebar

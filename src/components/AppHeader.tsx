import { useEffect, useRef, useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CFormSelect,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CDropdownToggle,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  useColorModes,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'
import { languages } from '../form/languages.ts'
import { AppHeaderDropdown } from './header'
import { useTranslation } from 'react-i18next'
import IconButton from "@mui/material/IconButton";
import iwsStore from "../utils/Store.tsx";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";

const AppHeader = () => {
  const { i18n } = useTranslation()
  let navigate = useNavigate()
  const headerRef = useRef(null)
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const logout = () => { console.log('Logout!!!!'); iwsStore.clear(); navigate('/dashboard'); window.location.reload()}
  const dispatch = useDispatch()
  // @ts-ignore
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [language, setLanguage] = useState()

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
      // @ts-ignore
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])
  const changeLanguage = (lng:string) => {
    i18n.changeLanguage(lng)
  }
  const mapping = (item:{id:string, name:string}) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  )
  const handleInputChange = (event:any) => {
    event.preventDefault()
    const value = event.target.value
    setLanguage(value)
    changeLanguage(value)
  }


  return (
    <CHeader position="sticky" className="mb-4" style={{height:50}}>
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="sm" />
        </CHeaderToggler>
        <CHeaderToggler className="ps-1" onClick={(event) => handleInputChange(event)}>
          <CFormSelect
            className="flex-row"
            type="select"
            name="language"
            id="language-id"
            value={language}
            onChange={(event) => handleInputChange(event)}
          >
            {languages.map((item) => mapping(item))}
          </CFormSelect>
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>

            <CNavLink to="/dashboard"
                // @ts-ignore
                      component={NavLink}></CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#"></CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#"></CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="sm" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/tab" href="#"
                // @ts-ignore
                component={NavLink}></CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#" to="/tab">
              <CIcon icon={cilList} size="sm" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="sm" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="sm" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="sm" />
              ) : (
                <CIcon icon={cilSun} size="sm" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                  // @ts-ignore
                component="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="sm" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                  // @ts-ignore
                component="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="sm" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                  // @ts-ignore
                component="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="sm" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                      onClick={()=>logout()}>
            <ExitToAppTwoToneIcon/>
          </IconButton>
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
    </CHeader>
  )
}

export default AppHeader

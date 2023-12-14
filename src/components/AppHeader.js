import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
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
} from '@coreui/react'
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
import { languages } from '../views/base/Components/Login'
import { AppHeaderDropdown } from './header'
import { useTranslation } from 'react-i18next'

const AppHeader = () => {
  const { i18n } = useTranslation()
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [language, setLanguage] = useState()

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }
  const mapping = (item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  )
  const handleInputChange = (event) => {
    event.preventDefault()
    const value = event.target.value
    setLanguage(value)
    changeLanguage(value)
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="xs" />
        </CHeaderToggler>
        <CHeaderToggler className="ps-1" onClick={(event) => handleInputChange(event)}>
          <CFormSelect
            className="flex-row"
            type="select"
            name="language"
            id="language-id"
            value={language}
            onChange={(event) => {
              handleInputChange(event)
            }}
          >
            {languages.data.map((item) => mapping(item))}
          </CFormSelect>
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}></CNavLink>
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
              <CIcon icon={cilBell} size="xs" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/tab" href="#" component={NavLink}></CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#" to="/tab">
              <CIcon icon={cilList} size="xs" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="xs" />
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
                <CIcon icon={cilMoon} size="xs" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="xs" />
              ) : (
                <CIcon icon={cilSun} size="xs" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                component="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="xs" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                component="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="xs" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                component="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="xs" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
    </CHeader>
  )
}

export default AppHeader

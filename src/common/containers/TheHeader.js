import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CLink, CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {languages} from '../../views/base/Components/Login'


import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks
}  from './index'
import {useTranslation} from "react-i18next";

const TheHeader = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch()
  const asideShow = useSelector(state => state.asideShow)
  const darkMode = useSelector(state => state.darkMode)
  const sidebarShow = useSelector(state => state.sidebarShow)
  const [language, setLanguage] = useState();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  const mapping = item => <option key={item.id} value={item.id}>{item.name}</option>

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }
  const handleInputChange = event => {
    event.preventDefault();
    const value  = event.target.value;
      setLanguage(value)
      changeLanguage(value)
  };
  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/dashboard"
          >
            <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
          </CLink>
        </div>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={ event =>{handleInputChange(event)}}
          title="Language"
        >
          <CSelect className ="flex-row" type="select" name="language" id="language-id"
                   value={language} onChange={ event =>{handleInputChange(event)}} >
            {languages.data.map(item => mapping(item))};
          </CSelect>
        </CToggler>
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={() => dispatch({type: 'set', darkMode: !darkMode})}
          title="Toggle Light/Dark Mode"
        >
          <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
          <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
        </CToggler>
        <TheHeaderDropdownNotif/>
        <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/>
        <TheHeaderDropdown/>
        <CToggler
          inHeader
          className="d-md-down-none"
          onClick={() => dispatch({type: 'set', asideShow: !asideShow})}
        >
          <CIcon className="mr-2" size="lg" name="cil-applications-settings" />
        </CToggler>
      </CHeaderNav>

    </CHeader>
  )
}

export default TheHeader

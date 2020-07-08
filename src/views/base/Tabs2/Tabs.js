import React, { useState } from 'react'
import {CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CCard, CCardBody, CTabs, CCardHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {setDefaultLocale } from  "react-datepicker";
import de from 'date-fns/locale/de';
import {dateFormat} from "../../../utils/utils";
import {CrudAccount} from '../Components/CrudAccount'
import Login from '../../pages/login/Login'
import {useTranslation} from "react-i18next";
const Tabs = () => {
  const [active, setActive] = useState(1)
  const { t, i18n } = useTranslation();
  const [state,setState] = useState( {activeTab: new Array(1).fill('1')})
  setDefaultLocale('de');

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  const toggle = (tabPane, tab) =>{
    const newArray = state.activeTab.slice();
    newArray[tabPane] = tab;
    setState({activeTab: newArray,});
  }
  const getCurrentMonth = (date)=>{
    const p=date.getUTCMonth()+1;
    return p<=10?"0".concat(p.toString()):p.toString();
  }
  const getPeriod = (date ) => {return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))};
  const initAcc = {hits:[{id:'', name: '', description: '', enterdate:new Date().getTime(), postingdate:new Date().getTime()
      , changedate:new Date().getTime(), company:'', modelid:9, account:'-1', isDebit:false, balancesheet:false
      , idebit:0.0,icredit:0.0, debit:0.0, credit:0.0 }]}
  const initbank = { hits:[ {id:'', name: '', description: '', enterdate:new Date().getTime(), postingdate:new Date().getTime()
      , changedate:new Date().getTime(), modelid:11, account:'-1', company:''}]}
  const initCC = { hits:[ {id:'', name: '', description: '', enterdate:new Date().getTime(), postingdate:new Date().getTime()
      , changedate:new Date().getTime(), modelid:6, account:'-1', company:''}]}
  const initVat={ hits:[{ id:'', name:'', description:'', percent:'', inputVatAccount:'', outputVatAccount:''
      , enterdate:new Date().toISOString(), postingdate:new Date().toISOString(), changedate:new Date().toISOString()
      , company:'', modelid:14}]}
  const initCust={hits:[{ id:'', name:'', description:'', street:'', city:'', state:'', zip:''
      , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
      , enterdate:new Date().getTime(), postingdate:new Date().getTime()
      , changedate:new Date().getTime(), company:'', modelid:3}]}
  const initSup={hits:[{ id:'', name:'', description:'', street:'', city:'', state:'', zip:''
      , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
      , enterdate:new Date().getTime(), postingdate:new Date().getTime()
      , changedate:new Date().getTime(), company:'', modelid:1}]}

  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'


  return (
    <CRow>
      <CCol xs="12" md="6" className="mb-4">
        <CCard>
          <CCardHeader>
            Index indentifiers
          </CCardHeader>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    Home
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Profile
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Messages
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  {`1. ${lorem}`}
                </CTabPane>
                <CTabPane>
                  {`2. ${lorem}`}
                </CTabPane>
                <CTabPane>
                  {`3. ${lorem}`}
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6" className="mb-4">
        <CCard>
          <CCardHeader>
            Id indentifiers
          </CCardHeader>
          <CCardBody>
            <CTabs activeTab="home">
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink data-tab="home">
                    Home
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="profile">
                    Profile
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="messages">
                    Messages
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane data-tab="home">
                  {`1. ${lorem}`}
                </CTabPane>
                <CTabPane data-tab="profile">
                  {`2. ${lorem}`}
                </CTabPane>
                <CTabPane data-tab="messages">
                  {`3. ${lorem}`}
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs="12" md="6" className="mb-4">
        <CCard>
          <CCardHeader>
            No fade animation tabs
          </CCardHeader>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-calculator" />
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-basket" />
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-chart-pie"/>
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent fade={false}>
                <CTabPane>
                  {`1. ${lorem}`}
                </CTabPane>
                <CTabPane>
                  {`2. ${lorem}`}
                </CTabPane>
                <CTabPane>
                  {`3. ${lorem}`}
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs="12" md="6" className="mb-4">
        <CCard>
          <CCardHeader>
            Controlled tabs
          </CCardHeader>
          <CCardBody>
            <CTabs activeTab={active} onActiveTabChange={idx => setActive(idx)}>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-calculator" />
                    { active === 0 && ' Home'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-basket" />
                    { active === 1 && ' Profile'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-chart-pie"/>
                    { active === 2 && ' Messages'}
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  {`1. ${lorem}`}
                </CTabPane>
                <CTabPane>
                  {`2. ${lorem}`}
                </CTabPane>
                <CTabPane>
                  {`3. ${lorem}`}
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tabs

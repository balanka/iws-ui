import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow, CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {useStore} from './Menu';
import { Login as Login_} from './CrudController';
import { useTranslation} from 'react-i18next';
import {LOGIN_MENU, MENU} from "./Menu";

export const languages = {data:[
    {id:'en', name:'English'},
    {id:'de', name:'Deutsch'},
    {id:'fr', name:'Francais'}
  ]
}
const Login = () => {
  let history = useHistory()
  const { t, i18n } = useTranslation();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { setProfile, setMenu, setModule, setRoutes, } = useStore();
  const module= LOGIN_MENU(t)[0];
  const url=SERVER_URL.concat(module.ctx)
  const current_ =module.state
  const [current,setCurrent] = useState(current_);
  const companies={data:[
      {id:'1000', name:'KABA Soft GmbH'},
      {id:'2000', name:'KABA Soft CI'},
      {id:'3000', name:'KABA Soft Guinea'},
      {id:'4000', name:'KABA Soft Spain'},
    ]}

  const submit = event => {
    event.preventDefault();
    const data={"userName": current.username, "password": current.password, "company":current.company, "language":current.language}
    Login_(history, url, data, setProfile, MENU, t, setMenu, setModule, setRoutes);
  }

  const handleEvent=(event, value ) =>{
    event.preventDefault();
    event.stopPropagation();
    setCurrent({...value})
  }

  return (<>
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm >
                      <h1>Login</h1>
                      <p className="text-muted">{t('login.signIn')}</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Username" id="username" autoComplete="username"
                                onChange={(event)  => handleEvent(event, { ...current, username: event.target.value})}/>
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" id="pwd" placeholder="Password" autoComplete="current-password"
                                onChange={(event ) =>handleEvent(event,{ ...current, password: event.target.value})}/>
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CSelect className ="flex-row" type="select" name="company" id="company-id"
                                 value={current.company} onChange={(event ) =>handleEvent(event, {...current, company: event.target.value})} >
                          {companies.data.map(item => <option key ={item.id} value ={item.id}>{item.id.concat (" ").concat (item.name)}</option>)};
                        </CSelect>
                        <CSelect className ="flex-row" type="select" name="language" id="language-id"
                                 value={current.language} onChange={(event ) =>{handleEvent(event,{...current, language: event.target.value});
                                i18n.changeLanguage(event.target.value)}} >
                          {languages.data.map(item =><option key ={item.id} value ={item.id}>{item.id.concat (" ").concat (item.name)}</option> )};
                        </CSelect>
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary" className="px-4" onClick = {(event) =>submit(event)}>Login</CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">{t('login.forgotpwd')}</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>{t('login.signUpNow')}</CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Login

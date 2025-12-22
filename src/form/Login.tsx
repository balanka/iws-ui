import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect, CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'


import { useStore } from './Menu'
import { Login as Login_ } from './CrudController'
import { useTranslation } from 'react-i18next'
//import { useTranslation } from "next-i18next";
import { LOGIN_MENU } from './Menu'
import '../../public/scss/style.scss'
import {ILoggingContext} from "../Models.ts";
import { setDefaultLocale } from  "react-datepicker";
import {Show} from "../utils/FormUtils.tsx";
import '../i18n.tsx';
// import { en} from 'date-fns/locale/en'
// import { de,  } from 'date-fns/locale/de'
// import { fr} from 'date-fns/locale/fr'
// registerLocale('en', en)

export const languages = {
  data: [
    { id: 'en', name: 'English' },
    { id: 'de', name: 'Deutsch' },
    { id: 'fr', name: 'Francais' },
  ],
}
const Login = () => {
  let navigate = useNavigate()
  const {t, i18n} = useTranslation()
  const {menu, selected, profile, setProfile, setMenu, setModule, setRoutes} = useStore()
  //const {currency} = profile
  let module_ = menu ? menu.get(selected) : LOGIN_MENU(t)[0]
  module_ = module_ ? module_ : LOGIN_MENU(t)[0]
  const url = module_?.ctx ?? module_.path
  let current_ = module_.state[0]
  const [current, setCurrent] = useState(current_)
  const companies = {
    data: [
      {id: '1000', name: 'KABA Soft GmbH'},
      {id: '2000', name: 'KABA Soft CI'},
      {id: '3000', name: 'KABA Soft Guinea'},
      {id: '4000', name: 'KABA Soft Spain'},
      {id: '5000', name: 'SALAM'},
      {id: '5500', name: 'ETOILE CHANGE'},
      {id: '5600', name: 'SPI-GUINEE'},
    ],
  }

  const submit = (event: any) => {
    event.preventDefault()
    const currentx = current ? current : current_
    const data: ILoggingContext = {
      userName: currentx.username,
      password: currentx.password,
      company: currentx.company,
      language: currentx.language,
    }
    Login_(navigate, url, data, setProfile, t, setMenu, setModule, setRoutes, profile)
    console.log('responseprofile>>>', profile)

    navigate('/dashboard', {replace: true})
    //window.location.reload()

  }

  const handleEvent = (event: any, value: any) => {
    event.preventDefault()
    event.stopPropagation()
    current_ = {...value}
    setCurrent({...value})
  }
  const signUp = (
      <CCard className="text-white bg-primary py-5 d-md-down-none"
             style={{width: '44%'}}>
        <CCardBody className="text-center">
          <div>
            <h2>Sign up</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link to="/register">
              <CButton color="primary" className="mt-3" active tabIndex={-1}>
                {t('login.signUpNow')}
              </CButton>
            </Link>
          </div>
        </CCardBody>
      </CCard>
  )

  function child(error?: string) {
    return (
  <CCard className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
    <CCardBody className="text-center">
      <div><h2>Error!!!</h2><p>{error}</p></div>
    </CCardBody>
  </CCard>
 )
}

  // @ts-ignore
  return (
    <>
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">{t('login.signIn')}</p>
                      <CInputGroup className="mb-3">
                        <CInputGroup>
                          <CInputGroupText/>
                        </CInputGroup>
                        <CFormInput
                          type="text"
                          placeholder="Username"
                          id="username"
                          autoComplete="username"
                          onChange={(event:any) =>
                            handleEvent(event, { ...current, username: event.target.value })
                          }
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroup>
                          <CInputGroupText/>
                        </CInputGroup>
                        <CFormInput
                          type="password"
                          id="pwd"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={(event:any) =>
                            handleEvent(event, { ...current, password: event.target.value })
                          }
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroup>
                          <CInputGroupText/>
                        </CInputGroup>
                        <CFormSelect
                          className="flex-row"
                          type="select"
                          name="company"
                          id="company-id"
                          value={current.company}
                          onFocus={(event) =>
                            handleEvent(event, { ...current, company: event.target.value })
                          }
                          onChange={(event) =>
                            handleEvent(event, { ...current, company: event.target.value })
                          }
                        >
                          {companies.data.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.id.concat(' ').concat(item.name)}
                            </option>
                          ))}
                        </CFormSelect>
                        <CFormSelect
                          className="flex-row"
                          type="select"
                          name="language"
                          id="language-id"
                          value={current.language}
                          onFocus={(event) =>
                            handleEvent(event, { ...current, language: event.target.value })
                          }
                          onChange={(event) => {
                            handleEvent(event, { ...current, language: event.target.value })
                            i18n
                              .changeLanguage(event.target.value)
                              .then(() => setProfile({ ...profile, language: event.target.value }))
                               setDefaultLocale( event.target.value)
                          }}
                        >
                          {languages.data.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.id.concat(' ').concat(item.name)}
                            </option>
                          ))}
                        </CFormSelect>
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton
                            color="primary"
                            className="px-4"
                            onClick={(event:any) => submit(event)}
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">
                            {t('login.forgotpwd')}
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                {/*{Show(profile?.error??'', signUp(), child(profile.error))}*/}
                <
                    // @ts-ignore
                  Show when ={profile.error} fallback = {signUp} children={child(profile.error)}/>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Login

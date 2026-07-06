import {TFunction} from "i18next";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm, CFormInput, CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow
} from "@coreui/react-pro";
import {Link} from "react-router-dom";
import {LoginProps} from "../Props.ts";
import {setDefaultLocale} from "react-datepicker";
import {Show} from "../utils/FormUtils.tsx";


const signUp = (t:TFunction<'translation', undefined>) =>(
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
const  errorFn = (error?: string) =>{
  return (
    <CCard className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
      <CCardBody className="text-center">
        <div><h2>Error!!!</h2><p>{error}</p></div>
      </CCardBody>
    </CCard>
  )
}
export const LoginForm = ({languages, companies, current, t, i18n, profile, setProfile, submit
                            , handleEvent}:LoginProps ) => {
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
                          placeholder="UserName"
                          id="userName"
                          autoComplete="username"
                          onChange={(event: any) =>
                            handleEvent(event, {...current, userName: event.target.value})
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
                          onChange={(event: any) =>
                            handleEvent(event, {...current, password: event.target.value})
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
                            handleEvent(event, {...current, company: event.target.value})
                          }
                          onChange={(event) =>
                            handleEvent(event, {...current, company: event.target.value})
                          }
                        >
                          {companies.map((item) => (
                            <option key={item.id} value={item.id}>{`${item.id} ${item.name}`}</option>
                          ))}
                        </CFormSelect>
                        <CFormSelect
                          className="flex-row"
                          type="select"
                          name="language"
                          id="language-id"
                          value={current.language}
                          onFocus={(event) =>
                            handleEvent(event, {...current, language: event.target.value})
                          }
                          onChange={(event) => {
                            handleEvent(event, {...current, language: event.target.value})
                            i18n.changeLanguage(event.target.value)
                              .then(() => setProfile({...profile, language: event.target.value}))
                            setDefaultLocale(event.target.value)
                          }}
                        >
                          {languages.map((item) => (
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
                            onClick={(event: any) => submit(event)}
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
                <
                  // @ts-ignore
                  Show when={profile.error} fallback={signUp(t)} children={errorFn(profile.error)}/>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

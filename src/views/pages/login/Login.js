import React , {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
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
import {capitalize} from "../../../utils/utils";
import {accountContext, useGlobalState} from '../../base/Components/AccountContext';
import axios from "axios";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
export const languages = {data:[
    {id:'en', name:'English'},
    {id:'de', name:'Deutsch'},
    {id:'fr', name:'Francais'}
  ]
}
const Login = () => {
  const { t, i18n } = useTranslation();
  const [token, setToken] = useGlobalState('token');
  const value = useContext(accountContext);
  const [username, setUsername] = useState();
  const [pwd, setPwd] = useState();
  const [company, setCompany] = useState();
  const [language, setLanguage] = useState();
  const companies={data:[
             {id:'1000', name:'KABA Soft GmbH'},
             {id:'2000', name:'KABA Soft CI'},
             {id:'3000', name:'KABA Soft Guinea'},
             {id:'4000', name:'KABA Soft Spain'},
             ]
          }

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  const submit = event => {
    event.preventDefault();
    const url ="http://localhost:8080/users/login"
    const url2 ="http://localhost:8080/iws/mf"
    const data={"userName": "bmk", "password": "wuduwali2x"}
    const auth=login(url, data);
    //const auth = useFetch(url,data)
    console.log("auth", auth);
    // const list=submitGet(url2)
    // console.log("list", list);
  }

  const login = (url, data) => {
    axios.post( url, data)
      .then(response => {
        console.log('responsex', response.data);
        const {authorization} =  response.headers
        const tken = response.data.hash
        setToken(authorization)
        console.log('tken', tken)
        console.log('authorization', authorization);
        return authorization
      }).catch(function (error) {
      console.log('error', error);
    });
  }

  const submitGet = (url) => {
    console.log('authorization2', token);
    axios.get( url, {headers: {'authorization':token}})
      .then(response => {
        console.log('response.data', response.data);
        console.log('response.headers', response.headers);
        const resp = response.data
        return resp;
      }).catch(function (error) {
      console.log('error', error);
    });
  }
  const mapping = item => <option key={item.id} value={item.id}>
    {item.id+ " ".concat (item.name)}</option>

  const handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    if(name =='username') setUsername(value)
    if(name =='pwd') setPwd(value)
    if(name =='company') setCompany(value)
    if(name =='language') {
      setLanguage(value)
      changeLanguage(value)
    }
  };

  return (
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
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" id="username" autoComplete="username" onChange={handleInputChange}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" id="pwd" placeholder="Password" autoComplete="current-password" onChange={handleInputChange}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CSelect className ="flex-row" type="select" name="company" id="company-id"
                              value={company} onChange={handleInputChange} >
                             {companies.data.map(item => mapping(item))};
                      </CSelect>
                      <CSelect className ="flex-row" type="select" name="language" id="language-id"
                           value={language} onChange={handleInputChange} >
                          {languages.data.map(item => mapping(item))};
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
  )
}

export default Login

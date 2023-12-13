/* eslint-disable */
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {CInputGroup, CFormSelect} from '@coreui/react'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupText, Row } from 'reactstrap'
import CIcon from '@coreui/icons-react'
import {useStore} from './Menu'
import { Login as Login_} from './CrudController'
import { useTranslation} from 'react-i18next'
import {LOGIN_MENU} from "./Menu"
import '../../../scss/style.scss'

export const languages = {
  data:[
    {id:'en', name:'English'},
    {id:'de', name:'Deutsch'},
    {id:'fr', name:'Francais'}
  ]
}
const Login = () => {
  let navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { menu, selected, profile, setProfile, setMenu, setModule, setRoutes, } = useStore()
  const { locale, currency } = profile
  let module_ = menu?menu.get(selected):LOGIN_MENU(t, locale, currency)[0]
  module_ = module_?module_:LOGIN_MENU(t, locale, currency)[0]
  const url = module_?.ctx??module_.path
  let current_ = module_.state[0]
  const [current,setCurrent] = useState(current_)
  const companies={data:[
      {id:'1000', name:'KABA Soft GmbH'},
      {id:'2000', name:'KABA Soft CI'},
      {id:'3000', name:'KABA Soft Guinea'},
      {id:'4000', name:'KABA Soft Spain'},
    ]}

  const submit = event => {
    event.preventDefault()
    const currentx = current?current:current_
    console.log('current', currentx)
    const data={
      "userName": currentx.username,
      "password": currentx.password,
      "company":currentx.company,
      "language":currentx.language
    }
    Login_(navigate, url, data, setProfile,  t,  locale, currency, setMenu, setModule, setRoutes)
  }

  const handleEvent=(event, value ) =>{
    event.preventDefault()
    event.stopPropagation()
    current_= {...value}
    setCurrent({...value})
    //if (e.name ==='language') changeLanguage(value)
  }

  return (<>
      <div className="c-app c-default-layout flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form >
                      <h1>Login</h1>
                      <p className="text-muted">{t('login.signIn')}</p>
                      <InputGroup className="mb-3">
                        <CInputGroup>
                          <InputGroupText>
                            <CIcon name="cil-user" />
                          </InputGroupText>
                        </CInputGroup>
                        <Input type="text" placeholder="Username" id="username" autoComplete="username"
                                onChange={(event)  =>
                                  handleEvent(event, { ...current, username: event.target.value})}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <CInputGroup>
                          <InputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </InputGroupText>
                        </CInputGroup>
                        <Input type="password" id="pwd" placeholder="Password" autoComplete="current-password"
                                onChange={(event ) =>
                                  handleEvent(event,{ ...current, password: event.target.value})}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <CInputGroup>
                          <InputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </InputGroupText>
                        </CInputGroup>
                        <CFormSelect className ="flex-row" type="select" name="company" id="company-id"
                                 value={current.company}
                                 onFocus={(event ) =>handleEvent(event, {...current, company: event.target.value})}
                                 onChange={(event ) =>handleEvent(event, {...current, company: event.target.value})} >
                          {companies.data.map(item => <option key ={item.id} value ={item.id}>{item.id.concat (" ").concat (item.name)}</option>)}
                        </CFormSelect>
                        <CFormSelect className ="flex-row" type="select" name="language" id="language-id"
                                 value={current.language}
                                 onFocus={(event ) =>handleEvent(event, {...current, language: event.target.value})}
                                 onChange={(event ) =>{handleEvent(event,{...current, language: event.target.value})
                                i18n.changeLanguage(event.target.value).then(r => setProfile({...profile, language:event.target.value}))}} >
                          {languages.data.map(item => <option key ={item.id} value ={item.id}>{item.id.concat (" ").concat (item.name)}</option>)}
                        </CFormSelect>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick = {(event) =>submit(event)}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">{t('login.forgotpwd')}</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>{t('login.signUpNow')}</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Login

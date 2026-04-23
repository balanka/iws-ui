import  {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Login as Login_ } from './CrudController'
import { LOGIN_MENU } from './Menu'
import '../../public/scss/style.scss'
import {ILoggingContext} from '../Models.ts'
import '../i18n.tsx';
import {IMenu} from '../Props.ts'
import useForm from './UseForm.ts'
import {LoginForm} from './LoginForm.tsx'
import {languages} from './languages.ts'
import {companies} from './company.ts'

const Login = () => {
  const [{ profile, setProfile, menu, setMenu, setModule, setRoutes,selected, t, i18n,
    }] = useForm()
  let navigate = useNavigate()

  let module_: IMenu<ILoggingContext> = menu ? menu.get(selected) : LOGIN_MENU(t)[0]
  module_ = module_ ? module_ : LOGIN_MENU(t)[0]
  const url = module_?.ctx //?? module_.path
  let current_ = module_.state[0]
  const [current, setCurrent] = useState(current_)


  const submit = (event: any) => {
    event.preventDefault()
    const currentx = current ? current : current_
    const data: ILoggingContext = {
      userName: currentx.userName,
      password: currentx.password,
      company: currentx.company,
      language: currentx.language,
    }
    Login_(navigate, url, data, setProfile, t, setMenu, setModule, setRoutes, profile)
    navigate('/dashboard', {replace: true})
    //window.location.reload()
  }

  const handleEvent = (event: any, value: any) => {
    event.preventDefault()
    event.stopPropagation()
    current_ = {...value}
    setCurrent({...value})
  }

  return <LoginForm companies = {companies} languages ={languages} current = {current}  t ={t} i18n = {i18n}  profile = {profile}
                    setProfile ={setProfile} submit ={submit} handleEvent={handleEvent}/>
}

export default Login

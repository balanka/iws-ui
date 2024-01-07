import axios from 'axios'
import { MASTERFILE, MENU } from './Menu'
import iwsStore from './Store'
import React from 'react'
import { formEnum } from '../utils/FORMS'

const API_SERVER_PORT = 8091
const SERVER_URL = 'http://127.0.0.1:'.concat(API_SERVER_PORT)
const Edit = (url, token, record, data, setCurrent) => {
  const url_ = SERVER_URL.concat(url)
  var result
  axios
    .put(url_, record, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      const resp = response.data
      console.log('response', response)
      const index = data.findIndex((obj) => {
        return obj ? obj.id === record.id : false
      })
      data[index] = resp
      result = resp
      setCurrent(resp)
      console.log('resultX', result)
    })
    .catch(function (error) {
      console.log('error', error)
    })
  console.log('resultX', result)
  return result
}

const Add = (url, token, record, data, setCurrent) => {
  const url_ = SERVER_URL.concat(url)
  let result
  console.log('Adding', record)
  axios
    .post(url_, record, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      const resp = response.data
      const index = data.length + 1
      data[index] = resp
      result = resp
      console.log('response', resp)
      setCurrent(resp)
    })
    .catch(function (error) {
      console.log('error', error)
    })
  return result
}
const Post = (url, profile, record) => {
  axios
    .patch(url, record, { headers: { Authorization: `Bearer ${profile.token}` } })
    .then((response) => {
      console.log('responsex', response.data)
    })
    .catch(function (error) {
      console.log('error', error)
    })
}

const importFn = (str) => React.lazy(() => import(`./${str}`))
const Login = (
  history,
  url,
  data,
  setProfile,
  t,
  locale,
  currency,
  setMenu,
  setModule,
  setRoutes,
) => {
  const url_ = SERVER_URL.concat(url)
  console.log(' url', url)
  console.log(' url_', url_)
  axios
    .post(url_, data)
    .then((response) => {
      const token = response.data.hash
      const result = Map.groupBy(response.data.rights, ({ moduleid }) => moduleid)
      const userRights = Array.from(result, (entry) => ({
        key: entry[0],
        value: entry[1].map((e) => e.short).reduce((a, b) => a.concat(b)),
      }))
      const company = response.data.company
      let currency = ''
      let locale = ''
      const moduleURL = SERVER_URL.concat(MASTERFILE.module)
        .concat('/')
        .concat(formEnum.MODULE)
        .concat('/')
        .concat(data.company)
      const companyURL = SERVER_URL.concat(MASTERFILE.comp).concat('/').concat(data.company)
      axios.get(companyURL, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
        const company_ = response.data
        locale = company_.locale
        currency = company_.currency
      })
      axios
        .get(moduleURL, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          const module_ = response.data
          iwsStore.put(400, module_)
          const moduleIds = module_.filter((e) => result.has(parseInt(e.id)))
          const userMenu = moduleIds.map((m) => parseInt(m.id))
          const menu = moduleIds.map((m) => m.path).filter((p) => p !== '/')
          const menu_t = MENU(t, locale, currency)
          const routes_t = module_.map((e) => {
            return {
              ...e,
              component: e.description,
              element: e.description ? importFn(e.description) : undefined,
            }
          })

          const newMenu = new Map([...menu_t].filter(([k, _]) => menu.includes(k)))
          const newRoutes = routes_t.filter((r) => menu.includes(r.path))
          const profile = {
            token: token,
            company: company,
            modules: userMenu,
            rights: userRights,
            locale: locale,
            currency: currency,
          }
          setProfile(profile)
          setModule(module_)
          setMenu(newMenu)
          setRoutes(newRoutes)
        })
        .catch(function (error) {
          console.log('Error', error)
          if (JSON.stringify(error).includes('401')) {
            console.log('error', 'Session expired!!!!! Login again!!!!')
            history('/login')
          }
          console.log('error', error)
        })
      history('/dashboard')
    })
    .catch(function (error) {
      console.log('error', error)
    })
}
const Get = (url, token, history, func) => {
  const url_ = SERVER_URL.concat(url)
  let result
  axios
    .get(url_, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      const resp = response.data
      console.log('responseRRRRRR', resp)
      func ? func(resp) : void false
      result = { ...resp }
      console.log('resp', resp)
    })
    .catch(function (error) {
      console.log('Error', error)
      if (JSON.stringify(error).includes('401')) {
        console.log('error', 'Session expired!!!!! Login again!!!!')
        history('/login')
      }

      console.log('error', error)
    })
  console.log('resultRRRRRR', result)
  return result
}

const Get1 = (url, token, key_) => {
  const url_ = SERVER_URL.concat(url)
  let result
  console.log('url', url_)
  console.log('key_', key_)
  axios
    .get(url_, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      const resp = response.data
      console.log('key_', key_)
      console.log('respRRRRRR', resp)
      iwsStore.put(key_, resp)
      console.log('iwsStore.get(key_)', iwsStore.get(key_))
      result = { ...resp }
    })
    .catch(function (error) {
      console.log('error', error)
    })
  console.log('resultRRRRRR', result)
  return result
}

const Get2 = (url, token, setCurrent) => {
  const url_ = SERVER_URL.concat(url)
  let result
  console.log('url_', url_)
  axios
    .get(url_, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      const resp = response.data
      console.log('responseRRRRRR2', resp)
      result = resp
      console.log('result', result)
      iwsStore.update(resp.modelid, resp.id, { ...resp })
      console.log('result', result)
      Array.isArray(resp) && resp.length > 0 ? setCurrent(resp[0]) : setCurrent(resp)
      //setCurrent(resp)
    })
    .catch(function (error) {
      console.log('error', error)
    })
  console.log('result', result)
  return result
}

const EditRow = (edited, isNew, setCurrent) => {
  const flag = edited.id === -1 || !isNew
  const row = { ...edited, editing: flag }
  setCurrent(row)
}

export { Get, Get1, Get2, Post, Login, Add, Edit, EditRow }
/*
export function useFetchData() {
  const [ data, setData ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ errMessage, setErrMessage ] = useState('');
  useEffect(() => {
    setIsLoading(true);
    // Calls API to get list of customers
    getCustomers().then((response) => {
      setData(response.data.data);
      setIsLoading(false);
      setErrMessage('');
    }).catch((e) => {
      setErrMessage(e.message);
      setIsLoading(false);
    });
  }, []);
  return [ data, isLoading, errMessage ];
}

import { useFetchData } from './customHooks';
...
const [ data, isLoading, errMessage ] = useFetchData();
 */

import axios from 'axios'
import { MASTERFILE, MENU } from './Menu'
import iwsStore from './Store'
import React from 'react'
import { formEnum } from '../utils/FORMS'

const SERVER_IP = 'REACT_APP_HOST_IP_ADDRESS'
const SERVER_PORT = 'REACT_APP_PORT'
const SERVER_URL = 'http://'.concat(SERVER_IP).concat(':').concat(SERVER_PORT) //'http://0.0.0.0:8091'
console.log('SERVER_IP', SERVER_IP)
console.log('SERVER_PORT', SERVER_PORT)
console.log('SERVER_URL_', SERVER_URL)
const getFn1 = (url, token) => axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
const getFn = (url, token) => axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
const putFn = (url, token, record) =>
  axios.put(url, record, { headers: { Authorization: `Bearer ${token}` } })
const postFn = (url, token, record) =>
  axios.post(url, record, { headers: { Authorization: `Bearer ${token}` } })
const post1Fn = (url, record) => axios.post(url, record)
const Post = (url, profile, record) => patchFn(url, profile.token, record)

const patchFn = (url, token, record) =>
  axios
    .patch(url, record, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      console.log('responsex', response.data)
    })
    .catch(function (error) {
      console.log('error', error)
    })
const Edit = (url, token, record, data, setCurrent) => {
  var result
  const url_ = SERVER_URL.concat(url)
  console.log('url_', url_)
  console.log('record', record)
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
  let result
  console.log('Adding', record)
  axios
    .post(SERVER_URL.concat(url), record, { headers: { Authorization: `Bearer ${token}` } })
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

const importFn = (str) => React.lazy(() => import(`./${str}`))
const Login = (
  navigate,
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
  post1Fn(url_, data).then((response) => {
    const token = response.data.hash
    const result = Map.groupBy(response.data.rights, ({ moduleid }) => moduleid)
    console.log(' result', result)
    const userRights = Array.from(result, (entry) => ({
      key: entry[0],
      value: entry[1].map((e) => e.short).reduce((a, b) => a.concat(b)),
    }))
    const company = response.data.company
    const moduleURL = SERVER_URL.concat(MASTERFILE.module)
      .concat('/')
      .concat(formEnum.MODULE)
      .concat('/')
      .concat(company)
    const companyURL = SERVER_URL.concat(MASTERFILE.comp).concat('/').concat(company)
    getFn1(companyURL, token, navigate)
      .then((response) => {
        const locale = response.data.locale
        const currency = response.data.currency
        const incomeStmtAcc = response.data.incomeStmtAcc
        getFn(moduleURL, token)
          .then((response) => {
            const module_ = response.data
            console.log('module_', module_)
            iwsStore.put(formEnum.MODULE, module_)
            const moduleIds = module_.filter((e) => result.has(parseInt(e.id)))
            console.log('moduleIds', moduleIds)
            const userMenu = moduleIds.map((m) => parseInt(m.id))
            const menu = moduleIds.map((m) => m.path).filter((p) => p !== '/')
            console.log('menu', menu)
            const menu_t = MENU(t, locale, currency)
            console.log('menu_t', menu_t)
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
              incomeStmtAcc: incomeStmtAcc,
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
              navigate('/login')
            }
            console.log('error', error)
          })
        navigate('/dashboard')
      })
      .catch(function (error) {
        console.log('error', error)
      })
  })
}
const Get = (url, token, history, func) => {
  let result
  getFn(SERVER_URL.concat(url), token)
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
  let result
  getFn(SERVER_URL.concat(url), token)
    .then((response) => {
      const resp = response.data
      console.log('key_', key_)
      console.log('respRRRRRR', resp)
      iwsStore.put(key_, resp)
      result = { ...resp }
    })
    .catch(function (error) {
      console.log('error', error)
    })
  console.log('resultRRRRRR', result)
  return result
}

const Get2 = (url, token, setCurrent) => {
  let result
  getFn(SERVER_URL.concat(url), token)
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
  const flag = !isNew
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

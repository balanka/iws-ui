import axios from 'axios'
import {MASTERFILE, MENU} from './Menu'
import iwsStore from '../utils/Store.jsx'
import {formEnum} from '../utils/FormEnum.tsx'
import {groupBy} from '../utils/Utils'
import {ILoggingContext, IProfile, IWSModel} from "../Models.ts";
import {NavigateFunction} from "react-router-dom";
import {TFunction} from "i18next";
// @ts-ignore
const SERVER_IP:string = 'REACT_APP_HOST_IP_ADDRESS'
// @ts-ignore
const SERVER_PORT:string  = 'REACT_APP_PORT'
// @ts-ignore

//const SERVER_URL = 'http://'.concat(SERVER_IP).concat(':').concat(SERVER_PORT) //'http://0.0.0.0:8091'
const SERVER_URL = 'http://127.0.0.1:8091'// `http://${SERVER_IP}:${SERVER_PORT}` //'http://0.0.0.0:8091'

//const SERVER_URL = 'http://0.0.0.0:8091'// `http://${SERVER_IP}:${SERVER_PORT}` //'http://0.0.0.0:8091'
console.log(' SERVER_URL', SERVER_URL)
/* Helper function for fetching  and setting  user menu, profile, etc... */
const getFn1 = (url: string
    , token: string
    , profile: IProfile
    , setProfile: (argo: IProfile) => void) =>
    axios.get(url, {headers: {Authorization: `Bearer ${token}`}})
        .then((response) => {
            const resp = JSON.parse(JSON.stringify(response.data))
            const profilex = {...profile, locale: resp.locale, currency: resp.currency
                , incomeStmtAcc: resp.incomeStmtAcc}
            setProfile(profilex)
        })
        .catch(function (error: any) {
            setProfile({...profile, error: error})
        })

/* Helper function for fetching data from api using tge url and the token */
const getFn = (url:string, token:string) =>
                    axios.get(url, { headers: { Authorization: `Bearer ${token}` } })

/* After successfully login get user's menu and set user's profile, etc... */
const getOtherUserData = (companyURL: string, token: string, moduleURL: string
    , result: Map<number, any>, company: string, userRights: { key: number, value: any }[]
    , t: any
    , profile: IProfile
    , setProfile: (argo: IProfile) => void
    , setMenu: (argo: any) => void
    , setModule: (argo: any) => void
    , setRoutes: (argo: any) => void
    , navigate:NavigateFunction): void => {
    getFn(companyURL, token)
        .then((response) => {
            const locale: string = response.data.locale
            const currency: string = response.data.currency
            const incomeStmtAcc: string = response.data.incomeStmtAcc
            getFn(moduleURL, token)
                .then((response) => {
                    const module_ = response.data
                    iwsStore.put(formEnum.MODULE, module_)
                    const moduleIds = module_.filter((e: any) => result.has(parseInt(e.id)))
                    const userMenu = moduleIds.map((m: any) => parseInt(m.id))
                    const menu = moduleIds.map((m: any) => m.path).filter((p: string) => p !== '/')
                    const menu_t = MENU(t)
                    const routes_t = module_.map((e: any) => {
                        return {
                            ...e,
                            component: e.description,
                            element: e.description, //? importFn(e.description) : undefined,
                        }
                    })

                    const newMenu = new Map([...menu_t].filter(([k, _]) => menu.includes(k)))
                    const newRoutes = routes_t.filter((r: any) => menu.includes(r.path))
                    profile.token = token
                    const profilex: IProfile = {
                        ...profile,
                        token: token,
                        company: company,
                        modules: userMenu,
                        rights: userRights,
                        locale: locale,
                        currency: currency,
                        incomeStmtAcc: incomeStmtAcc,
                    }
                    const profile_ :IProfile = JSON.parse(JSON.stringify(profilex))
                    setProfile(profile_)
                    setModule(module_)
                    setMenu(newMenu)
                    setRoutes(newRoutes)
                })
                .catch(function (error) {
                    console.log('Error', error)
                    const errorText = JSON.stringify(error)
                    if (errorText.includes('40') || errorText.includes('50')) {
                        console.log('error', errorText)
                        navigate('/login')
                    }
                    console.log('error', error)
                })
            // navigate('/dashboard')
        })
        .catch(function (error) {
            console.log('errorXXX', error)
            navigate('/login')
        })
}

/* Helper function for login */
const loginFunction = (companyURL: string, token:string, moduleURL: string
    , result: Map<number, any>, company:string, profile:IProfile, setProfile:(p: IProfile) =>void
                        , userRights: { key: number; value: any}[]
    , t: TFunction<'translation', undefined>
    , setMenu: (argo: any) => void
    , setModule: (argo: any) => void
    , setRoutes: (argo: any) => void
    , navigate:NavigateFunction) => {
    /* Get and set user menu, profile, etc... */
    getFn1(companyURL, token, profile, setProfile)
    /* Get and set user menu, profile, etc... */
    getOtherUserData(companyURL, token, moduleURL, result, company, userRights, t, profile, setProfile
        , setMenu, setModule, setRoutes, navigate )
}

/* Login using the user provided credentials and get the user data and set the profile */
const post1Fn = <A>(ctx: string, record: A,
                    profile: IProfile, setProfile: (p: IProfile) => void
    , companyURL: string, moduleURL: string, company: string
    , t: TFunction<'translation', undefined>
    , setMenu: (argo: any) => void
    , setModule: (argo: any) => void
    , setRoutes: (argo: any) => void
    , navigate: NavigateFunction
):IProfile => {
   /* Login using the user provided credentials and get the user data and set the profile */
    axios.post(ctx, record).then((response: any) => {
       // RESPONSE = response
        console.log(' response.data', response?.data)
        profile.token=response.data.hash
        profile.company=response.data.company
        profile.rights=response.data.rights
        profile.roles=response.data.roles
        setProfile({...profile, token:response.data.hash, company:response.data.company
            , roles:response.data.roles, rights:response.data.rights})
        const token = profile.token
        const rights = profile.rights??[]
        const allRights =  [...rights]
        const result:Map<number, any> = groupBy(allRights, ({ moduleid }) => moduleid)
        const userRights = Array.from(result, (entry) => ({
            // @ts-ignore
            key: entry[0],
            // @ts-ignore
            value: entry[1].map((e:any) => e.short).reduce((a:string, b:string) => `${a}${b}`),
        }))
        /* Get and set user menu, profile, etc... */
        loginFunction(companyURL, token, moduleURL, result, company, profile, setProfile, userRights
            , t, setMenu, setModule, setRoutes,  navigate)

    }).catch(function (error: any) {
        console.log('ErrorXXX', error)
        setProfile({...profile, error: error.message})
        if (error.message.includes('40') || error.message.includes('50') ) {
                navigate('/login')
        }
        console.log('error', error.message)
    })
    console.log('profile', profile)
    return profile
}
const Post = <A>(ctx:string, profile:any, record:A) => patchFn(ctx, profile.token, record)

const patchFn = <A>(ctx:string, token:string, record:A) =>
    axios
        .patch(`${SERVER_URL}${ctx}`, record, {headers: {Authorization: `Bearer ${token}`}})
        .then((response: { data: any }) => {
            console.log('responsex', response.data)
        })
        .catch(function (error: any) {
            console.log('error', error)
    })
const Edit = <A>(ctx:string, token:string, record:IWSModel, data:IWSModel[], setCurrent:(arg0:A) =>void)=> {
    console.log('record>>>', record)
    var result
    const url = `${SERVER_URL}${ctx}`
    axios
        .put(url, record, {headers: {Authorization: `Bearer ${token}`}})
        .then((response: { data: any }) => {
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
        .catch(function (error: any) {
            console.log('error', error)
        })
    return result
}

const Add = <A>(ctx:string, token:string, record:A, data:A[], setCurrent:(arg0:A)=>void) => {
    console.log('Adding ctx/record', `${ctx}/${record}`)
    const url = `${SERVER_URL}${ctx}`
    console.log('Adding url', url)
    axios.post(url, record, {headers: {Authorization: `Bearer ${token}`}})
        .then((response: { data: any }) => {
            const resp = response.data
            const index = data.length + 1
            data[index] = resp
            console.log('response', resp)
            setCurrent(resp)
        })
        .catch(function (error: any) {
            console.log('error', error)
        })
}

//const importFn = (str:string) => React.lazy(() => import(`./${str}.jsx`))
const Login = (
  navigate:NavigateFunction,
  ctx:string,
  loggingContext: ILoggingContext,
  setProfile:(argo:IProfile)=>void,
  t: TFunction<'translation', undefined>,
  setMenu:(argo:any)=>void,
  setModule:(argo:any)=>void,
  setRoutes:(argo:any)=>void,
  profile:IProfile,
):void => {
    const url = `${SERVER_URL}${ctx}`
    const company = loggingContext.company
    const moduleURL: string = `${SERVER_URL}${MASTERFILE.module}/${formEnum.MODULE}/${company}`
    const companyURL: string = `${SERVER_URL}${MASTERFILE.comp}/${company}/${formEnum.COMPANY}`
    /* Login using the user provided credentials */
    post1Fn(url, loggingContext, profile, setProfile, companyURL, moduleURL, company
        , t, setMenu, setModule, setRoutes, navigate)

}

const  Get3 = <A>(ctx:string, token:string, key: string|number
                  , setRowData: (arg0:A[]) => void, setCurrent:(arg:A)=>void): void => {
  const url = `${SERVER_URL}${ctx}`
  fetch(url, {
    headers: {
      method: 'GET',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
    .then((response) => response.json())
    .then((data: A[]) => {
      if (Array.isArray(data)) {
        iwsStore.put(key, data)
        setRowData(data as A[])
        data.length>0? setCurrent(data[0]):void(0)
      } else {
        console.log('key>>>>', key)
        console.log('data>>>>', data)
      }
    }).catch(function (error) {
    console.log('Error', error)
    if (JSON.stringify(error).includes('401')) {
      console.log('error', 'Session expired!!!!! Login again!!!!')
      // history('/login')
    }
  })
}
const  Get = <A>(ctx:string, token:string, key: string|number, setRowData: (arg0:A[]) => void): void => {
    console.log('Error ctx', ctx)
    const url = `${SERVER_URL}${ctx}`
    console.log('Error url', url)
    fetch(url, {
        headers: {
            method: 'GET',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => response.json())
        .then((data: A[]) => {
            console.log('data>>>>', data)
            if (Array.isArray(data)) {
                console.log('dataXXX>>>>', data)
                iwsStore.put(key, data)
                setRowData(data as A[])
            } else{
                console.log('key>>>>', key)
                console.log('data>>>>', data)
            }
        }).catch(function (error) {
        console.log('Error', error)
        if (JSON.stringify(error).includes('401')) {
            console.log('error', 'Session expired!!!!! Login again!!!!')
            // history('/login')
        }
    })
}

const Get1 = (ctx:string, token:string, key_ : string|number) => {
    const url = `${SERVER_URL}${ctx}`
    console.log('urlurlurlurl Get1', url)
    console.log('urlurlurlurl Get1 ctx', ctx)
    getFn(url, token)
        .then((response) => {
            const resp = response.data
            iwsStore.put(key_, resp)
        })
        .catch(function (error) {
            console.log('error', error)
        })
}


const Get2 = <A>(ctx:string, token:string, setCurrent:(arg0: A) => void ) => {
    const url = `${SERVER_URL}${ctx}`
    console.log('urlurlurlurl', url)
    getFn(url, token)
        .then((response) => {
            const resp = response.data
            console.log('responseRRRRRR2', resp)
            iwsStore.update(resp.modelid, resp.id, {...resp})
            Array.isArray(resp) && resp.length > 0 ? setCurrent(resp[0]) : void (0)
            setCurrent(resp)
        })
        .catch(function (error) {
            console.log('error', error)
        })
}

const EditRow = <A>(edited:A, isNew:boolean, setCurrent :(arg0: A) => void) =>
    setCurrent({ ...edited, editing: !isNew })

export { Get, Get1, Get2, Get3, Post, Login, Add, Edit, EditRow }

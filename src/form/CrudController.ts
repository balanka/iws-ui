import {MASTERFILE, MENU} from './Menu'
import iwsStore from '../utils/Store.jsx'
import {formEnum} from '../utils/FormEnum.tsx'
import {groupBy} from '../utils/Utils'
import {HttpMethod, ILoggingContext, IProfile, IWSModel} from '../Models.ts'
import {NavigateFunction} from "react-router-dom";
import {TFunction} from "i18next";
import {Dispatch, SetStateAction} from "react";
// @ts-ignore
const SERVER_IP:string = 'REACT_APP_HOST_IP_ADDRESS'
// @ts-ignore
const SERVER_PORT:string  = 'REACT_APP_PORT'
// @ts-ignore

//const SERVER_URL = `http://${SERVER_IP}:${SERVER_PORT}`//'http://'.concat(SERVER_IP).concat(':').concat(SERVER_PORT) //'http://0.0.0.0:8091'
const SERVER_URL = 'http://127.0.0.1:8091'// `http://${SERVER_IP}:${SERVER_PORT}` //'http://0.0.0.0:8091'

//const SERVER_URL = 'http://0.0.0.0:8091'// `http://${SERVER_IP}:${SERVER_PORT}` //'http://0.0.0.0:8091'
console.log(' SERVER_URL', SERVER_URL)
const fetchFn00 = (url: string,  record:any) =>
   fetch(url,  {body: JSON.stringify(record), method: 'POST'}).then((response: any) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })

const fetchFnPost0 = (url: string,  record:any) =>
      fetch (url, {body: JSON.stringify(record), method:'POST',}).then((response: any) => {
           if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
              }
         return response.json();
      })

const fetchFn = (url: string, method_:HttpMethod, token:string, record:any) => {
  console.log( 'method',method_ )
  console.log( 'record', record)
  console.log( 'url', url)
  return fetch(url, {
    body: JSON.stringify(record),
    method: method_,
    headers: {Authorization: `Bearer ${token}`, Accept: "application/json", "Content-Type": "application/json",}
  }).then((response: any) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.statusText}`);
      }
      return response.json();
    })
 }

//type ApiRoute = `/api/${string}`;
// type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
//
// async function api<T>(method: Method, route: ApiRoute): Promise<T> {
//   const res = await fetch(route, { method });
//   return res.json();
// }
// api('GET', '/api/users');     // ✓ works
// api('GET', '/users');         // ✗ error: must start with /api/
// api('PATCH', '/api/users');   // ✗ error: PATCH not allowed



/* Helper function for fetching data from api using the url and the token */
const getFn = (url:string, token:string) =>fetchFn(url, 'GET', token, undefined )

/* Helper function for fetching  and setting  user menu, profile, etc... */
const getFn1 = (url: string, token: string, profile: IProfile, setProfile: (argo: IProfile) => void) =>
          fetchFn00(url, token).then((data:any) => {
            console.log(' data ', data)
            const resp:any = JSON.parse(JSON.stringify(data))
            const profile_ = {...profile, locale: resp.locale, currency: resp.currency, incomeStmtAcc: resp.incomeStmtAcc}
            setProfile(profile_)
        }).catch(function (error: any) {
            setProfile({...profile, error: error})
        })

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
   /* 1- Fetch company data from  api */
    getFn(companyURL, token)
        .then((response) => {
            const locale: string = response.locale
            const currency: string = response.currency
            const incomeStmtAcc: string = response.incomeStmtAcc
            const stockAcc = response.account??''
            const expenseAcc= response.oaccount??''
            const revenueAcc= response.salesClearingAcc??''
            const vat= response.vatCode
          console.log('response>>>', response)
          /* Fetch Module data from  api and use to build user menu on UI */
            getFn(moduleURL, token)
                .then((response) => {
                    const module_ = response
                    iwsStore.put(formEnum.MODULE, module_)
                    const moduleIds = module_.filter((e: any) => result.has(parseInt(e.id)))
                    const userMenu = moduleIds.map((m: any) => parseInt(m.id))
                    const menu = moduleIds.map((m: any) => m.path).filter((p: string) => p !== '/')
                    const menu_t = MENU(t)
                    const routes_t = module_.map((e: any) => {
                        return {...e,
                            component: e.description, element: e.description, //? importFn(e.description) : undefined,
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
                        stockAcc: stockAcc,
                        expenseAcc: expenseAcc,
                        revenueAcc: revenueAcc,
                        vat:vat
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
  fetchFnPost0(ctx, record).then((data:any) =>  {
       console.log(' response', data)
        profile.token=data.hash
        profile.company=data.company
        profile.rights=data.rights
        profile.roles=data.roles
        setProfile({...profile, token:data.hash, company:data.company
            , roles:data.roles, rights:data.rights})
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

const Edit = <A>(ctx:string, token:string, record:IWSModel, data:IWSModel[], setCurrent:Dispatch<SetStateAction<A>>)=> {
    console.log('record>>>', record)
    var result
    const url = `${SERVER_URL}${ctx}`
    fetchFn(url, 'PUT', token, record )
        .then((response: any ) => {
            const resp = response
            console.log('response', response)
            const index = data.findIndex((obj) => obj && (obj.id === record.id))
            data[index] = resp
            result = resp
            setCurrent(resp)
        })
        .catch(function (error: any) {
            console.log('error', error)
        })
    return result
}

const Add = <A>(ctx:string, token:string, record:A, data:A[]
                , setRowData:Dispatch<SetStateAction<A[]>> , setCurrent:Dispatch<SetStateAction<A>> ) => {
    console.log('Adding ctx/record', `${ctx}/${record}`)
    const url = `${SERVER_URL}${ctx}`
    console.log('Adding url', url)
     fetchFn(url, 'POST', token, record )
      .then((response) => {
            const resp = response as A
            console.log('response', resp)
            setCurrent(resp)
           setRowData([...data, resp])
        })
        .catch(function (error: any) {
            console.log('error', error)
        })
}

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
                  , current_ :A, setRowData: (arg0:A[]) => void, setCurrent:Dispatch<SetStateAction<A>>): void => {
  const url = `${SERVER_URL}${ctx}`
    getFn(url, token ).then((data: A[]) => {
      if (Array.isArray(data) && data.length>0) {
        iwsStore.put(key, data)
        setRowData(data as A[])
        setCurrent(data[0])
      } else {
        setRowData([])
        setCurrent(current_)
      }
    }).catch(function (error) {
    console.log('Error', error)
    if (JSON.stringify(error).includes('401')) {
      console.log('error', 'Session expired!!!!! Login again!!!!')
      // history('/login')
    }
  })
}
const  Get = <A>(ctx:string, token:string, key: string|number, setRowData: Dispatch<SetStateAction<A[]>>): void => {
    const url = `${SERVER_URL}${ctx}`
    console.log('url', url)
     getFn(url,  token ).then((data: A[]) => {
            //console.log('data>>>>', data)
            if (Array.isArray(data)) {
                //console.log('dataXXX>>>>', data)
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
        }
    })
}

const Get1 = (ctx:string, token:string, key_ : string|number) => {
    const url = `${SERVER_URL}${ctx}`
    console.log('url', url)
    getFn(url, token).then((response) => iwsStore.put(key_, response))
        .catch(function (error) {
            console.log('error', error)
        })
}

const Get2 = <A>(ctx:string, token:string, setCurrent:Dispatch<SetStateAction<A>> ) => {
    const url = `${SERVER_URL}${ctx}`
    console.log('url', url)
    getFn(url, token).then((response) => {
            const resp = response
            console.log('responseRRRRRR2', resp)
            iwsStore.update(resp.modelid, resp.id, {...resp})
            Array.isArray(resp) && resp.length > 0 ? setCurrent(resp[0]) : void (0)
            setCurrent(resp)
        })
        .catch(function (error) {
            console.log('error', error)
        })
}

const EditRow = <A>(edited:A, isNew:boolean, setCurrent :Dispatch<SetStateAction<A>>) =>
    setCurrent({ ...edited, editing: !isNew })

export { Get, Get1, Get2, Get3,  Login, Add, Edit, EditRow }

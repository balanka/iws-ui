
import {Edit, Get1, Get2, Post} from './CrudController.ts'
import iwsStore from '../utils/Store.jsx'
import {IWSModel} from '../Models.ts'
import {NavigateFunction} from "react-router-dom";


const getCurrentMonth = (date:Date) => {
  const p = date.getUTCMonth() + 1
  return p <= 10 ? '0'.concat(p.toString()) : p.toString()
}
const getPeriod = (date:Date) => {
  return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))
}
const toggleEdit = (current:any) => {
  if (current?.editing) {
    delete current.editing
  }
}

const logout = (navigate:NavigateFunction) => {
  iwsStore.clear()
  navigate('/dashboard')
  window.location.reload()
}

const formatCurrency = (number:number, currency:string, locale:string) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(number)

// const callSubmitPostAll = <A>(event:any, modifyUrl:string, token:string, rows:A[]) => {
//   event.preventDefault()
//   const url_ = modifyUrl.concat('/copy')
//   Post(url_, token, rows)
// }

const callSubmitCopy = <A>(event:any, modifyUrl:string, token:string, rows:A[]) => {
  event.preventDefault()
  const url_ = modifyUrl.concat('/copy')
  Post(url_, token, rows)
}
const callSubmitEdit = (event:any, modifyUrl:string, token:string, current:IWSModel
                           , setCurrent:(arg:IWSModel)=>void, data:IWSModel[], submitAdd: (arg:any)=>void) => {
  event.preventDefault()
  toggleEdit(current)
  // @ts-ignore
  if (current.id > 0) {
    Edit(modifyUrl, token, current, data, setCurrent)
  } else {
    submitAdd(event)
  }
}

const callReload = (ctx:string, token:string, modelid:number) => {
  iwsStore.deleteKey(modelid)
  //const url_ = url.concat('/').concat(model).concat('/').concat(company)
  console.log('callReload', ctx)
  Get1(ctx, token, modelid)
}

const callSubmitPost = (event:any, modifyUrl:string, token:string, current:IWSModel
                           , setCurrent:(arg:IWSModel)=>void,  rows:IWSModel[]):void => {
  event.preventDefault()
  const ids = rows.length > 0 ? rows.map((c:IWSModel) => c.id) : [current.id]
  const url_ = `${modifyUrl}/post/${ids}/${current.company}`
  Get2(url_, token, setCurrent)
}

export {
  getPeriod,
  formatCurrency,
  callSubmitEdit,
  callReload,
  callSubmitCopy,
  callSubmitPost,
  logout,
  toggleEdit,
}

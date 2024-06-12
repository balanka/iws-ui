import { initAcc, initArticle, initCc, initStore } from './Menu'
import { formEnum } from '../utils/FORMS'
import { Get1 } from './CrudController'

const getCurrentMonth = (date) => {
  const p = date.getUTCMonth() + 1
  return p <= 10 ? '0'.concat(p.toString()) : p.toString()
}
const getPeriod = (date) => {
  return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))
}
const toggleEdit = (current) => {
  if (current?.editing) {
    delete current.editing
  }
}
const fetchData = (url, token, modelId) => {
  url && Get1(url, token, modelId)
}

const getData = (iwsState, modelId, partnerId, initData) => {
  const artData = iwsState.get(formEnum.ARTICLE) ?? [...initArticle]
  const storeData = iwsState.get(formEnum.STORE) ?? [...initStore]
  const accData = iwsState.get(formEnum.ACCOUNT) ?? [...initAcc]
  const ccData = iwsState.get(formEnum.COSTCENTER) ?? [...initCc]
  const partnerData = iwsState.get(parseInt(partnerId)) ?? []
  const data_ = iwsState.get(modelId)
  const data = () => (data_ ? data_ : initData)
  return { data, artData, storeData, accData, partnerData, ccData }
}

export { getData, getPeriod, toggleEdit, fetchData }

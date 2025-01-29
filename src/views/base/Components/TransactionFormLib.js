import { initAcc, initArticle, initCc, initStore } from './Menu'
import { formEnum } from '../utils/FORMS'
import { Add, Edit, EditRow, Get1, Get2, Post } from './CrudController'
import iwsStore from './Store'

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
const formatCurrency = (number, currency, locale) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(number)
const callSubmitCancel = (event, modifyUrl, token, current, setCurrent, data) => {
  event.preventDefault()
  toggleEdit(current)
  const url_ = modifyUrl.replace('ltr', 'cancelnLtr')
  // eslint-disable-next-line no-unused-expressions
  current.id > 0 ? Edit(url_, token, current, data(), setCurrent) : current
}
const callSubmitCopy = (event, modifyUrl, token, rows) => {
  event.preventDefault()
  const url_ = modifyUrl.concat('/copy')
  Post(url_, token, rows)
}
const callSubmitEdit = (event, modifyUrl, token, current, setCurrent, data, submitAdd) => {
  event.preventDefault()
  toggleEdit(current)
  if (current.id > 0) {
    Edit(modifyUrl, token, current, data(), setCurrent)
  } else {
    submitAdd(event)
  }
}
const callOnNewLine = (tableRef) => {
  const ref = tableRef.current
  ref.dataManager.changeRowEditing()
  ref.setState({ ...ref.dataManager.getRenderState(), showAddRow: !ref.state.showAddRow })
}
const callReload = (url, token, model, company) => {
  iwsStore.deleteKey(model)
  const url_ = url.concat('/').concat(model).concat('/').concat(company)
  url_ && Get1(url_, token, parseInt(model))
}
const callSetSelectedRows = (rows_, setRows) => {
  setRows(rows_.map((item) => ({ id: item.id, modelid: item.modelid })))
}

const callInitAdd = (current_, model, setCurrent) => {
  const line = [
    {
      ...current_.lines[0],
      id: -1,
      transid: current_.id1,
    },
  ]
  const record = { ...current_, modelid: parseInt(model), lines: line }
  EditRow(record, true, setCurrent)
}
const callAddRow = async (newData, current, data, modifyUrl, token, setCurrent) => {
  if (newData) {
    const dx = { ...current }
    const dx1 =
      current.lines.length === 0
        ? {
            ...current,
            lines: [
              {
                ...current.lines.filter((e) => !e.account.isEmpty),
                ...newData,
                id: -1,
                transid: current.id1,
              },
            ],
          }
        : (dx.lines[current.lines.length] = { ...newData, id: -1, transid: current.id1 })
    const record = current.lines.length > 1 ? dx : dx1
    delete record.editing
    const result =
      record.id > 0
        ? Edit(modifyUrl, token, record, data(), setCurrent)
        : Add(modifyUrl, token, record, data(), setCurrent)
    setCurrent(result)
  }
}
const callDeleteRow = async (oldData, current, modifyUrl, token, data, setCurrent) => {
  if (oldData) {
    const dx = { ...current }
    const index = dx.lines.findIndex((obj) => obj.id === oldData.id)
    const deleted = dx.lines[index]
    dx.lines[index] = { ...deleted, transid: -2 }
    Edit(modifyUrl, token, dx, data(), setCurrent)
  }
}
const callSubmitPost = (event, modifyUrl, token, current, setCurrent, rows) => {
  event.preventDefault()
  const ids = rows.length > 0 ? rows.map((c) => c.id) : [current.id]
  const url_ = modifyUrl.concat('/post/').concat(ids).concat('/').concat(current.company)
  Get2(url_, token, setCurrent)
}
const callCancelEdit = (event, initAdd) => {
  event.preventDefault()
  initAdd()
}
export {
  getData,
  getPeriod,
  fetchData,
  formatCurrency,
  callSubmitEdit,
  callSubmitCancel,
  callOnNewLine,
  callReload,
  callSetSelectedRows,
  callInitAdd,
  callCancelEdit,
  callAddRow,
  callDeleteRow,
  callSubmitPost,
  callSubmitCopy,
}

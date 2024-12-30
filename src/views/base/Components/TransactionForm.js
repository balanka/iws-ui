import React, { createRef, useCallback, useLayoutEffect, useRef, useState } from 'react'
import { CFormInput } from '@coreui/react'
import Grid from 'react-fast-grid'
import EditableTable from '../tables/EditableTable'
import { styles } from '../Tree/BasicTreeTableProps'
import { Add, Edit } from './CrudController'
import {
  buildExportOption,
  Options,
  Transactioncolumns,
  TransactionLinesColumns,
} from '../tables/LineFinancialsProps'
import { FinancialsFormHead, FormFactory } from './FormsProps'
import { formEnum } from '../utils/FORMS'
import { LOGIN, MASTERFILE, TRANSACTION, useStore } from './Menu'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import iwsStore from './Store'
import {
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
} from './TransactionFormLib'

const TransactionForm = (callback, deps) => {
  const { profile, selected, menu } = useStore()
  const { token, company, locale, currency } = profile
  let navigate = useNavigate()
  const { t } = useTranslation()

  let module_ = menu && menu.get(!selected || selected === '/login' ? '/cc' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : LOGIN(t)

  if (typeof module_ === 'undefined' || !module_ || module_.id === '11111')
    return navigate('/login')
  const modifyUrl = selected
  const url = module_.ctx //.concat('/').concat(company)
  const artUrl = MASTERFILE.article.concat('/').concat(formEnum.ARTICLE).concat('/').concat(company)
  const storeUrl = MASTERFILE.store.concat('/').concat(formEnum.STORE).concat('/').concat(company)
  const accUrl = MASTERFILE.acc.concat('/').concat(formEnum.ACCOUNT).concat('/').concat(company)
  const custUrl = MASTERFILE.cust.concat('/').concat(formEnum.CUSTOMER).concat('/').concat(company)
  const supUrl = MASTERFILE.sup.concat('/').concat(formEnum.SUPPLIER).concat('/').concat(company)
  const fmoduleUrl = MASTERFILE.fmodule
    .concat('/')
    .concat(formEnum.FMODULE)
    .concat('/')
    .concat(company)
  const initialState = module_.state
  const current_ = initialState[0]
  console.log('current_', current_)
  let title_ = t(module_.title)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState({ collapse: true, fadeIn: true, timeout: 300 })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [rows, setRows] = useState([])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [model, setModel] = useState('')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [partnerId, setPartnerId] = useState('')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [title, setTitle] = useState(title_)
  const tableRef = createRef()
  const initLine = current_ && current_?.lines[0] ? current_?.lines[0] : []
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [toolbar, setToolbar] = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [current, setCurrent] = useState(current_)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [iwsState, setIwsState] = useState(iwsStore.initialState)
  const fModuleData = (iwsState.get(formEnum.FMODULE) ?? []).filter(
    (m) => m.parent === TRANSACTION(t).id,
  )
  const { data, artData, storeData, accData, partnerData } = getData(
    iwsState,
    parseInt(model),
    partnerId,
    initialState,
  )
  const total = (lines) =>
    lines
      .map((l) => (l === undefined ? 0.0 : l.quantity * l.price))
      .reduce((sum, amount) => sum + amount)
  const buildAmount = (row) => ({
    ...row,
    total: row.lines ? total(row.lines ?? []) : 0,
  })
  const buildData = () => data().map((row) => (row.id === -1 ? 0.0 : buildAmount(row)))
  const columnsX = TransactionLinesColumns(
    artData,
    initLine,
    current,
    fModuleData,
    model,
    t,
    locale,
    currency,
  )
  const columns = Transactioncolumns(storeData, accData, current, t, locale, currency)
  const onNewLine = () => callOnNewLine(tableRef)
  const submitEdit = (event) =>
    callSubmitEdit(event, modifyUrl, token, current, setCurrent, data, submitAdd)
  const submitCancel = (event) =>
    callSubmitCancel(event, modifyUrl, token, current, setCurrent, data)

  // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
  const handleKeyPress = useCallback((event) => {
    if (event.ctrlKey && (event.key === 's' || event.key === 'S')) {
      submitEdit(event)
    } else if (event.ctrlKey && (event.key === 'l' || event.key === 'L')) {
      onNewLine()
    }
  })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let init = useRef(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    if (!init.current) {
      iwsStore.subscribe(setIwsState)
      init.current = true
      fetchData(fmoduleUrl, token, formEnum.FMODULE)
      // attach the event listener
      document.addEventListener('keydown', handleKeyPress)
    }

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [init])
  const reload = () => callReload(url, token, model, company)
  const toggleToolbar = () => setToolbar(!toolbar)
  const toggle = () => setState({ ...state, collapse: !state.collapse })
  const setSelectedRows = (rows_) => callSetSelectedRows(rows_, setRows)
  const initAdd = () => callInitAdd(current_, model, setCurrent)
  const cancelEdit = (event) => callCancelEdit(event, initAdd)
  const allUrls = [
    { url: storeUrl, modelid: formEnum.STORE },
    { url: accUrl, modelid: formEnum.ACCOUNT },
    { url: artUrl, modelid: formEnum.ARTICLE },
    { url: custUrl, modelid: formEnum.CUSTOMER },
    { url: supUrl, modelid: formEnum.SUPPLIER },
    { url: fmoduleUrl, modelid: formEnum.FMODULE },
  ]
  const callEdit = (editedRow, setCurrent) => {
    const isArray = Array.isArray(editedRow) && editedRow.length > 0
    const row = isArray ? editedRow[0] : editedRow
    if (row) {
      const data = iwsState.get(row.modelid)
      const record = data.find((obj) => obj.id === row.id)
      setCurrent({ ...record, editing: true })
    }
  }
  const callSubmitQuery = (event, url, token, modelid, company, allUrls) => {
    event.preventDefault()
    const url_ = url.concat('/').concat(modelid).concat('/').concat(company)
    console.log(' allUrls', allUrls)
    allUrls.forEach((o) => !iwsState.get(o.modelid) && fetchData(o.url, token, o.modelid))
    fetchData(url_, token, parseInt(modelid))
  }

  const submitQuery = (event, url, token, modelid, company, allUrls) =>
    callSubmitQuery(event, url, token, modelid, company, allUrls)
  const handleModuleChange = (event, value) => {
    event.preventDefault()
    setModel(value.id)
    //submitQuery(event, value.id)
    const mx = fModuleData.find((m) => m.id === value.id)
    console.log('mx>>>>', mx)
    console.log('current_', current_)
    title_ = mx?.name ? mx.name : title_
    setTitle(title_)
    setPartnerId(mx.account)
    setCurrent(current_)
    submitQuery(event, url, token, value.id, company, allUrls)
    //setCurrent(current_)
  }

  const edit = (editedRow) => callEdit(editedRow, setCurrent)
  const submitPost = (event) => callSubmitPost(event, modifyUrl, token, current, setCurrent, rows)
  const submitCopy = (event) => callSubmitCopy(event, modifyUrl, token, rows)
  const submitAdd = (event) => {
    event.preventDefault()
    const row = {
      id: current.id,
      oid: current.oid,
      id1: current.id1,
      store: current.store,
      account: current.account,
      transdate: new Date(current.transdate).toISOString(),
      enterdate: new Date().toISOString(),
      postingdate: new Date().toISOString(),
      period: getPeriod(new Date()),
      posted: current.posted,
      modelid: parseInt(model),
      company: company,
      text: current.text,
      lines: current.lines,
    }
    Add(modifyUrl, token, row, data(), setCurrent)
  }

  const addRow = (newData) => callAddRow(newData, current, data, modifyUrl, token, setCurrent)
  const deleteRow = (oldData) => callDeleteRow(oldData, current, modifyUrl, token, data, setCurrent)
  const updateRow = async (newData, oldData) => {
    if (oldData) {
      const dx = { ...current, company: company }
      const idx = dx.lines.findIndex((obj) => obj.id === newData.id)
      delete newData.tableData
      const articleChanged = newData.article !== oldData.article
      const articleId = articleChanged ? newData.article : oldData.article
      const artIdx = artData.findIndex((obj) => obj.id === articleId)
      const article = artData[artIdx]
      const artName = article ? article.name : 'article notfound'
      if (idx === -1) {
        dx.lines.push({ ...newData, articleName: artName, transid: dx.id1 })
      } else {
        dx.lines[idx] = {
          ...newData,
          transid: dx.id1,
          ...(articleChanged && { article: articleId, articleName: artName }),
        }
      }
      delete dx.editing
      if (dx.id > 0) {
        Edit(modifyUrl, token, dx, data(), setCurrent)
      } else Add(modifyUrl, token, dx, data(), setCurrent)
    }
  }

  const editable = () => ({ onRowAdd: addRow, onRowUpdate: updateRow, onRowDelete: deleteRow })
  function buildForm(current) {
    const lines_ = () =>
      Array.isArray(current.lines) && current.lines.length > 0 ? current.lines : [initLine]

    const buildLinesTransaction = () => {
      const renderSummaryRow = ({ column, data }) => {
        const total = t('common.total')
        return column.field === 'articleName'
          ? { value: total, style: styles.fieldStyle }
          : column.field === 'price'
            ? {
                value: formatCurrency(
                  data.reduce((sum, row) => sum + row.quantity * row.price, 0),
                  currency,
                  locale,
                ),
                style: styles.fieldStyle,
              }
            : new Array(column.width).fill('')
      }
      return (
        <>
          <Grid item>
            <EditableTable
              id="LineTable"
              Options={{ ...Options, paging: lines_().length > 5 }}
              flag={current.posted}
              data={lines_()}
              columns={columnsX}
              editable={editable()}
              t={t}
              tableRef={tableRef}
              renderSummaryRow={renderSummaryRow}
            />
            <CFormInput
              disabled={current.posted}
              bssize="sm"
              type="textarea"
              id="text-input"
              name="text"
              className="input-sm"
              placeholder="text"
              value={current.text}
              style={{ height: 30, fontSize: 11 }}
              onChange={(event) => setCurrent({ ...current, text: event.target.value })}
            />
          </Grid>
        </>
      )
    }

    const getHeader = (fModuleData, initialState) => {
      return (
        <FinancialsFormHead
          styles={styles}
          title={title}
          collapse={state.collapse}
          initAdd={initAdd}
          url={url}
          storeUrl={storeUrl}
          initialState={initialState}
          cancelEdit={cancelEdit}
          submitEdit={submitEdit}
          submitCancel={submitCancel}
          module={model}
          modules={fModuleData}
          handleModuleChange={handleModuleChange}
          onNewLine={onNewLine}
          submitPost={submitPost}
          submitCopy={submitCopy}
          reload={reload}
          toggle={toggle}
          toggleToolbar={toggleToolbar}
          current={current}
          t={t}
        />
      )
    }
    const getTable = (current, tableData, title) => {
      return (
        <div style={{ paddingTop: 5 }}>
          <Grid item xs spacing={0.5}>
            <EditableTable
              Options={{
                ...buildExportOption(t('common.exportCSV'), t('common.exportPDF'), title),
                toolbar: toolbar,
                maxBodyHeight: '960px',
                pageSize: 10,
                pageSizeOptions: [5, 10, 20, 50],
                showFirstLastPageButtons: true,
              }}
              flag={current ? current.posted : false}
              data={tableData}
              columns={columns}
              t={t}
              edit={edit}
              setSelectedRows={setSelectedRows}
              //parentChildData={parentChildData}
            />
          </Grid>
        </div>
      )
    }
    const getMainForm = (formId, current, current_, mainTable, accountData, storeData) => {
      return (
        <Grid item>
          <FormFactory
            formid={formId}
            current={current}
            current_={current_}
            setCurrent={setCurrent}
            t={t}
            accData={accountData}
            storeData={storeData}
            styles={styles}
            table={mainTable}
            collapse={state.collapse}
          />
        </Grid>
      )
    }
    return (
      <>
        {getHeader(fModuleData, initialState)}
        {getMainForm(
          formEnum.TRANSACTION,
          current,
          current_,
          buildLinesTransaction,
          partnerData,
          storeData,
        )}
        {getTable(current, buildData(), title)}
      </>
    )
  }

  return buildForm(current ? current : current_)
}

export default TransactionForm

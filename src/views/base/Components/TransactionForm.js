import React, { createRef, useCallback, useLayoutEffect, useRef, useState } from 'react'
import { CFormInput } from '@coreui/react'
import Grid from 'react-fast-grid'
import EditableTable from '../tables/EditableTable'
import { styles } from '../Tree/BasicTreeTableProps'
import { Add, Edit, EditRow, Get1, Get2, Post } from './CrudController'
import {
  buildExportOption,
  Options,
  Transactioncolumns,
  TransactionLinesColumns,
} from '../tables/LineFinancialsProps'
import { FormFactory, TransactionFormHead } from './FormsProps'
import { formEnum } from '../utils/FORMS'
import { LOGIN, MASTERFILE, TRANSACTION, useStore } from './Menu'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import iwsStore from './Store'
import { fetchData, getData, getPeriod, toggleEdit } from './TransactionFormLib'

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
  const url = module_.ctx.concat('/').concat(company)
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

  const buildAmount = (row) => ({
    ...row,
    total: row.lines.reduce((acc, line) => {
      return parseFloat(acc + parseFloat(line?.quality * line?.price), 0)
    }),
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
  const onNewLine = () => {
    const ref = tableRef.current
    ref.dataManager.changeRowEditing()
    ref.setState({ ...ref.dataManager.getRenderState(), showAddRow: !ref.state.showAddRow })
  }
  const submitEdit = (event) => {
    event.preventDefault()
    toggleEdit(current)
    if (current.id > 0) {
      Edit(modifyUrl, token, current, data(), setCurrent)
    } else {
      submitAdd(event)
    }
  }
  const submitCancel = (event) => {
    event.preventDefault()
    toggleEdit(current)
    const url_ = modifyUrl.replace('ltr', 'cancelnLtr')
    // eslint-disable-next-line no-unused-expressions
    current.id > 0 ? Edit(url_, token, current, data(), setCurrent) : current
  }
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
  const reload = () => {
    iwsStore.deleteKey(model)
    const url_ = url.concat('/').concat(model)
    url_ && Get1(url_, token, parseInt(model))
  }
  const toggleToolbar = () => setToolbar(!toolbar)
  const toggle = () => setState({ ...state, collapse: !state.collapse })
  const setSelectedRows = (rows_) => {
    setRows(rows_.map((item) => ({ id: item.id, modelid: item.modelid })))
  }

  const initAdd = () => {
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

  const cancelEdit = (e) => {
    e.preventDefault()
    initAdd()
  }

  const submitQuery = (event, modelid) => {
    event.preventDefault()
    const url_ = url.concat('/').concat(modelid)
    !iwsState.get(formEnum.STORE) && fetchData(storeUrl, token, formEnum.STORE)
    !iwsState.get(formEnum.ACCOUNT) && fetchData(accUrl, token, formEnum.ACCOUNT)
    !iwsState.get(formEnum.ARTICLE) && fetchData(artUrl, token, formEnum.ARTICLE)
    !iwsState.get(formEnum.CUSTOMER) && fetchData(custUrl, token, formEnum.CUSTOMER)
    !iwsState.get(formEnum.SUPPLIER) && fetchData(supUrl, token, formEnum.SUPPLIER)
    !iwsState.get(formEnum.FMODULE) && fetchData(fmoduleUrl, token, formEnum.FMODULE)
    fetchData(url_, token, parseInt(modelid))
  }
  const handleModuleChange = (event, value) => {
    event.preventDefault()
    setModel(value.id)
    //submitQuery(event, value.id)
    const mx = fModuleData.find((m) => m.id === value.id)
    console.log('mx>>>>', mx)
    title_ = mx?.name ? mx.name : title_
    setTitle(title_)
    setPartnerId(mx.account)
    submitQuery(event, value.id)
    setCurrent(current_)
  }

  const edit = (editedRow) => {
    const isArray = Array.isArray(editedRow) && editedRow.length > 0
    const row = isArray ? editedRow[0] : editedRow
    if (row) {
      const data = iwsState.get(row.modelid)
      const record = data.find((obj) => obj.id === row.id)
      setCurrent({ ...record, editing: true })
    }
  }

  const submitPost = (event) => {
    event.preventDefault()
    const ids = rows.length > 0 ? rows.map((c) => c.id) : [current.id]
    const url_ = modifyUrl.concat('/post/').concat(ids).concat('/').concat(current.company)
    Get2(url_, token, setCurrent)
  }

  const submitCopy = (event) => {
    event.preventDefault()
    const url_ = modifyUrl.concat('/copy')
    Post(url_, token, rows)
  }
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

  const addRow = async (newData) => {
    if (newData) {
      const dx = { ...current }
      const dx1 =
        current.lines.length === 0
          ? {
              ...current,
              lines: [
                {
                  ...current.lines.filter((e) => !e.article.isEmpty),
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
  const updateRow = async (newData, oldData) => {
    if (oldData) {
      const dx = { ...current, company: company }
      const idx = dx.lines.findIndex((obj) => obj.id === newData.id)
      delete newData.tableData
      const articleChanged = newData.article !== oldData.article
      const articleId = articleChanged ? newData.article : oldData.article

      if (idx === -1) {
        dx.lines.push({ ...newData, transid: dx.id1 })
      } else {
        dx.lines[idx] = {
          ...newData,
          transid: dx.id1,
          ...(articleChanged && { article: articleId }),
        }
      }
      delete dx.editing
      if (dx.id > 0) {
        Edit(modifyUrl, token, dx, data(), setCurrent)
      } else Add(modifyUrl, token, dx, data(), setCurrent)
    }
  }
  const deleteRow = async (oldData) => {
    if (oldData) {
      const dx = { ...current }
      const index = dx.lines.findIndex((obj) => obj.id === oldData.id)
      const deleted = dx.lines[index]
      dx.lines[index] = { ...deleted, transid: -2 }
      Edit(modifyUrl, token, dx, data(), setCurrent)
    }
  }
  const editable = () => ({ onRowAdd: addRow, onRowUpdate: updateRow, onRowDelete: deleteRow })
  function buildForm(current) {
    const lines_ = () =>
      Array.isArray(current.lines) && current.lines.length > 0 ? current.lines : [initLine]

    const buildLinesTransaction = () => {
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
        <TransactionFormHead
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

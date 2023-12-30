import React, { createRef, useCallback, useLayoutEffect, useRef, useState } from 'react'
import { CFormInput } from '@coreui/react'
import Grid from 'react-fast-grid'
import EditableTable from '../tables/EditableTable'
import { styles } from '../Tree/BasicTreeTableProps'
import { Add, Edit, EditRow, Get1, Get2, Post } from './CrudController'
import { buildExportOption, columnsF, Linescolumns, Options } from '../tables/LineFinancialsProps'
import { FinancialsFormHead, FormFactory } from './FormsProps'
import { formEnum } from '../utils/FORMS'
import { ACCOUNT, COSTCENTER, FMODULE, LOGIN, MASTERFILE, useStore } from './Menu'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import iwsStore from './Store'

const FinancialsForm = (callback, deps) => {
  const { profile, selected, menu } = useStore()
  const { token, company, locale, currency } = profile
  let navigate = useNavigate()
  const { t } = useTranslation()

  let module_ = menu && menu.get(!selected || selected === '/login' ? '/cc' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : LOGIN(t)

  if (typeof module_ === 'undefined' || !module_ || module_.id === '11111')
    return navigate('/login')
  console.log('module_', module_)
  console.log('typeof module_', typeof module_)
  const modifyUrl = selected
  const url = module_.ctx.concat('/').concat(company)
  const accUrl = MASTERFILE.acc.concat('/').concat(company)
  const ccUrl = MASTERFILE.cc.concat('/').concat(company)
  const fmoduleUrl = MASTERFILE.fmodule.concat('/').concat(company)
  const acc_modelid = parseInt(ACCOUNT(t).id)
  const cc_modelid = parseInt(COSTCENTER(t).id)
  const fmodule_modelid = parseInt(FMODULE(t).id)
  const initCc = module_.state2
  const initAcc = module_.state1
  const initialState = module_.state
  const current_ = initialState[0]
  let title_ = t(module_.title)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState({ collapse: true, fadeIn: true, timeout: 300 })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [rows, setRows] = useState([])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [model, setModel] = useState('')
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
  const data_ = iwsState.get(parseInt(model))
  const data = () => (data_ ? data_ : initialState)
  const fModuleData = iwsState.get(fmodule_modelid) ?? []
  const accData = iwsState.get(acc_modelid) ?? [...initAcc]
  const ccData = iwsState.get(cc_modelid) ?? [...initCc]

  const columnsX = Linescolumns(accData, initLine, current, fModuleData, model, t, locale, currency)
  const columns = columnsF(ccData, initLine, current, t, locale, currency)

  const toggleEdit = () => {
    if (current?.editing) {
      delete current.editing
    }
  }

  const onNewLine = () => {
    const ref = tableRef.current
    ref.dataManager.changeRowEditing()
    ref.setState({ ...ref.dataManager.getRenderState(), showAddRow: !ref.state.showAddRow })
  }
  const submitEdit = (event) => {
    event.preventDefault()
    toggleEdit()
    if (current.id > 0) {
      Edit(modifyUrl, token, current, data(), setCurrent)
    } else {
      submitAdd(event)
    }
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
      Get1(fmoduleUrl, token, fmodule_modelid)
      // attach the event listener
      document.addEventListener('keydown', handleKeyPress)
    }

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [init, data_])
  const reload = () => {
    iwsStore.deleteKey(current.modelid)
    const url_ = url.concat('/').concat(current.modelid)
    url_ && Get1(url_, token, parseInt(current.modelid))
  }
  const toggleToolbar = () => setToolbar(!toolbar)
  const toggle = () => setState({ ...state, collapse: !state.collapse })
  const setSelectedRows = (rows_) => {
    setRows(rows_.map((item) => ({ id: item.id, modelid: item.modelid })))
  }

  function getAccountAndLabel() {
    const model_ = fModuleData.find((obj) => obj.id === parseInt(model))
    const account_ = model_ ? model_.account : undefined
    const accountLabel_ = model_.isDebit ? 'account' : 'oaccount'
    const oaccount_ = account_ ? '' : model_.account
    const oaccountLabel_ = account_ ? 'oaccount' : 'account'
    return { account_, accountLabel_, oaccount_, oaccountLabel_ }
  }

  const initAdd = () => {
    const { account_, accountLabel_, oaccount_, oaccountLabel_ } = getAccountAndLabel()
    const line = [
      {
        ...current_.lines[0],
        id: -1,
        transid: current_.id1,
        [accountLabel_]: account_,
        [oaccountLabel_]: oaccount_,
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
    accUrl && Get1(accUrl, token, acc_modelid)
    ccUrl && Get1(ccUrl, token, cc_modelid)
    url_ && Get1(url_, token, parseInt(modelid))
  }
  const handleModuleChange = (event, value) => {
    event.preventDefault()
    setModel(value.id)
    submitQuery(event, value.id)
    const mx = fModuleData.find((m) => m.id === value.id)
    title_ = mx?.name ? mx.name : title_
    setTitle(title_)
    setCurrent(current_)
  }

  const buildAmount = (row) => ({
    ...row,
    total: row.lines.reduce((acc, line) => acc + line.amount, 0),
  })
  const buildData = () => data().map((row) => buildAmount(row))

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

  const getCurrentMonth = (date) => {
    const p = date.getUTCMonth() + 1
    return p <= 10 ? '0'.concat(p.toString()) : p.toString()
  }
  const getPeriod = (date) => {
    return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))
  }
  const submitAdd = (event) => {
    event.preventDefault()
    const row = {
      id: current.id,
      oid: current.oid,
      id1: current.id1,
      costcenter: current.costcenter,
      account: current.account,
      transdate: new Date(current.transdate).toISOString(),
      enterdate: new Date().toISOString(),
      postingdate: new Date().toISOString(),
      period: getPeriod(new Date()),
      posted: current.posted,
      modelid: parseInt(model),
      company: company,
      text: current.text,
      typeJournal: current.typeJournal,
      file_content: current.file_content,
      lines: current.lines,
    }
    Add(modifyUrl, token, row, data(), setCurrent)
  }

  const addRow = async (newData) => {
    if (newData) {
      const { account_, accountLabel_, oaccount_ } = getAccountAndLabel()
      const dx = { ...current }
      const oaccount = oaccount_ ? oaccount_ : newData.oaccount
      const oaccountLabel = oaccount_ ? 'oaccount' : 'account'
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
                  [accountLabel_]: account_,
                  [oaccountLabel]: oaccount,
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
      const accountChanged = newData.account !== oldData.account
      const oaccountChanged = newData.oaccount !== oldData.oaccount
      const accountId = accountChanged ? newData.account : oldData.account
      const oaccountId = oaccountChanged ? newData.oaccount : oldData.oaccount

      if (idx === -1) {
        dx.lines.push({ ...newData, transid: dx.id1 })
      } else {
        dx.lines[idx] = {
          ...newData,
          transid: dx.id1,
          ...(accountChanged && { account: accountId }),
          ...(oaccountChanged && { oaccount: oaccountId }),
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
    const accd = iwsState.get(acc_modelid) ? iwsState.get(acc_modelid) : [...initAcc]
    const ccd = iwsState.get(cc_modelid) ? iwsState.get(cc_modelid) : [...initCc]

    const lines_ = () =>
      Array.isArray(current.lines) && current.lines.length > 0 ? current.lines : [initLine]

    const LinesFinancials = () => {
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

    const parentChildData = (row, rows) =>
      Array.isArray(rows) && rows.length > 0 ? rows.find((a) => a?.id === row.transid) : rows

    return (
      <>
        <FinancialsFormHead
          styles={styles}
          title={title}
          collapse={state.collapse}
          initAdd={initAdd}
          url={url}
          accUrl={accUrl}
          initialState={initialState}
          cancelEdit={cancelEdit}
          submitEdit={submitEdit}
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
        <Grid item>
          <FormFactory
            formid={formEnum.FINANCIALS}
            current={current}
            current_={current_}
            setCurrent={setCurrent}
            t={t}
            accData={accd}
            ccData={ccd}
            styles={styles}
            table={LinesFinancials}
            collapse={state.collapse}
          />
        </Grid>
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
              data={buildData()}
              columns={columns}
              t={t}
              edit={edit}
              setSelectedRows={setSelectedRows}
              parentChildData={parentChildData}
            />
          </Grid>
        </div>
      </>
    )
  }

  return buildForm(current ? current : current_)
}

export default FinancialsForm

import React, { useEffect, useState, memo } from 'react'
import Grid from 'react-fast-grid'
import { useTranslation } from 'react-i18next'
import { buildExportOption, ColumnsBS } from '../tables/LineFinancialsProps'
import { BSFormHead, FormFactory } from './FormsProps'
import EditableTable from '../tables/EditableTable'
import { styles, theme } from '../Tree/BasicTreeTableProps'
import { Edit, EditRow, Get, Get1, Get2 } from './CrudController'
import { LOGIN, useStore } from './Menu'
import { useNavigate } from 'react-router-dom'
import iwsStore from './Store'

const BankStatementForm = () => {
  const { t } = useTranslation()
  const { profile, selected, menu } = useStore()
  const { token, company, locale, currency } = profile
  let navigate = useNavigate()
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/cc' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : LOGIN(t)
  if (typeof module_ === 'undefined' || !module_ || module_.id === '11111')
    return navigate('/login')

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState({ collapse: true, fadeIn: true, timeout: 300 })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [rows, setRows] = useState([])
  const url = module_.ctx.concat('/').concat(company)
  const initialState = module_.state
  const current_ = initialState[0]
  const title = t(module_.title)
  const modelid_ = module_.modelid
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState(initialState)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [current, setCurrent] = useState(current_)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [toolbar, setToolbar] = useState(true)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {}, [current, setCurrent, data])
  const toggleToolbar = () => setToolbar(!toolbar)
  const toggle = () => setState({ ...state, collapse: !state.collapse })
  const columns = ColumnsBS(t, locale, currency)
  const setSelectedRows = (rows_) => {
    let rowsx = rows_.map((item) => item.id)
    setRows(rowsx)
  }

  return internal(
    url,
    token,
    navigate,
    initialState,
    data,
    setData,
    current || current_,
    current_,
    setCurrent,
    title,
    state,
    toggle,
    toggleToolbar,
    modelid_,
    t,
    toolbar,
    columns,
    rows,
    setSelectedRows,
    module_,
    locale,
    currency,
    company,
  )
}
function internal(
  url,
  token,
  history,
  initialState,
  data,
  setData,
  current,
  current_,
  setCurrent,
  title,
  state,
  toggle,
  toggleToolbar,
  modelid_,
  t,
  toolbar,
  columns,
  rows,
  setSelectedRows,
  module_,
  locale,
  currency,
  company,
) {
  const isEmpty = (str) => !str || 0 === str.length
  const submitQuery = (event) => {
    event.preventDefault()
    !isEmpty(url) && Get(url, token, history, setData)
  }
  const cancelEdit = (e) => EditRow({ ...current }, false, setCurrent)
  const submitPost = (event) => {
    event.preventDefault()
    const url_ = module_.state3
      .concat('/post/')
      .concat(current.company)
      .concat('/')
      .concat(rows.join(','))
    Get2(url_, token, setCurrent)
  }

  const reload = () => {
    iwsStore.deleteKey(current.modelid)
    console.log('url', url)
    url && Get1(url, token, parseInt(current.modelid))
    setCurrent(current_)
  }
  const importData = () => {
    const url_ = module_.ctx
      .concat('/')
      .concat(current.path)
      .concat('/')
      .concat(current.header)
      .concat('/')
      .concat(current.char)
      .concat('/')
      .concat(current.extension)
      .concat('/')
      .concat(company)
    console.log('url_', url_)
    url_ && Get(url_, token, history)
  }

  const edit = (editedRow) => {
    const isArray = Array.isArray(editedRow) && editedRow.length > 0
    const row = isArray ? editedRow[0] : editedRow
    if (row) {
      const record = data.find((obj) => obj.id === row.id)
      setCurrent({ ...record, editing: true })
    }
  }

  const submitEdit = (event) => {
    event.preventDefault()
    if (current.editing && !current.posted) {
      delete current.editing
      const url_ = module_.state3
      Edit(url_, token, { ...current }, data, setCurrent)
    }
  }
  function buildForm(current) {
    return (
      <Grid container spacing={2} style={{ ...styles.outer }} direction="column">
        <BSFormHead
          styles={styles}
          title={title}
          collapse={state.collapse}
          setData={setData}
          url={url}
          cancelEdit={cancelEdit}
          submitEdit={submitEdit}
          reload={reload}
          importData={importData}
          submitQuery={submitQuery}
          submitPost={submitPost}
          toggle={toggle}
          toggleToolbar={toggleToolbar}
          current={current}
        />
        <FormFactory
          formid={modelid_}
          current={current}
          setCurrent={setCurrent}
          t={t}
          locale={locale}
          currency={currency}
          collapse={state.collapse}
          height={25}
          styles={styles}
        />

        <Grid
          container
          spacing={2}
          style={{ ...styles.inner, display: 'block' }}
          direction="column"
        >
          <EditableTable
            Options={{ ...buildExportOption('ExportCSV', 'Export PDF', title), toolbar: toolbar }}
            data={data}
            columns={columns}
            theme={theme}
            t={t}
            edit={edit}
            setSelectedRows={setSelectedRows}
          />
        </Grid>
      </Grid>
    )
  }
  return buildForm(current)
}
export default memo(BankStatementForm)

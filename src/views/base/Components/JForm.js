import React, { useState, memo, useRef, useLayoutEffect } from 'react'
import Grid from 'react-fast-grid'
import { useTranslation } from 'react-i18next'
import { FormFactory, JournalFormHead } from './FormsProps'
import { columnsPACB, ColumnJournal, buildExportOption } from '../tables/LineFinancialsProps'
import { formEnum } from '../utils/FORMS'
import { styles, theme } from '../Tree/BasicTreeTableProps'
import EditableTable from '../tables/EditableTable'
import { Get, Get1 } from './CrudController'
import { ACCOUNT, LOGIN, MASTERFILE, useStore } from './Menu'
import { useNavigate } from 'react-router-dom'
import iwsStore from './Store'

/* eslint-disable-next-line react/prop-types */
function Internal(
  isDebit,
  t,
  modelid,
  accData,
  accUrl,
  profile,
  history,
  setAccData,
  initAcc,
  current,
  getUrl,
  setData,
  initialState,
  setIsDebit,
  title,
  state,
  url,
  toggle,
  toggleToolbar,
  setCurrent,
  toolbar,
  data,
  columnsX,
) {
  const summaryPCB = (data) => {
    const row_ = data
    const row = row_ ? row_?.slice() : row_.slice()
    let debit = 0,
      credit = 0,
      balance = 0
    let currency = ''
    let company = ''

    const available = row.length > 0
    for (let i = 0, len = row.length - 1; i <= len; ++i) {
      debit = debit + row[i].debit
      credit = credit + row[i].credit
      balance = isDebit ? balance + debit - credit : balance + credit - debit
      const runningBalance = isDebit
        ? row[i].debit + row[i].idebit - row[i].credit - row[i].icredit
        : row[i].credit + row[i].icredit - row[i].debit - row[i].idebit
      currency = row[i].currency
      company = row[i].company
      row[i] = { ...row[i], balance: runningBalance }
    }
    const len = row ? row.length : 0
    const idebit = available ? row[0].idebit : 0
    const icredit = available ? row[0].icredit : 0
    if (len > 0)
      row[len] = {
        period: t('common.total'),
        idebit: idebit,
        debit: debit,
        icredit: icredit,
        credit: credit,
        balance: row[len - 1].balance,
        currency: currency,
        company: company,
      }
    return row
  }
  const summaryJ = (data_) => {
    const row_ = data_
    console.log('data_', data_)
    const row = row_?.slice()
    const available = row.length > 0
    let idebit = available ? row[0].idebit : 0
    let icredit = available ? row[0].icredit : 0
    let debit = 0,
      credit = 0,
      amount = 0
    let currency = ''
    let company = ''

    for (let i = 0, len = row.length - 1; i <= len; ++i) {
      idebit = row[i].idebit
      debit = debit + row[i].debit
      icredit = row[i].icredit
      credit = credit + row[i].credit
      amount = amount + row[i].amount
      currency = row[i].currency
      company = row[i].company
    }
    const len = row.length

    if (len > 0)
      row[len] = {
        id: Number.MAX_VALUE,
        transid: t('common.total'),
        account: '',
        oaccount: '',
        transdate: '',
        enterdate: '',
        postingdate: '',
        period: '',
        amount: amount,
        idebit: idebit,
        debit: debit,
        icredit: icredit,
        credit: credit,
        balance: row[len - 1].balance,
        currency: currency,
        ide: '',
        year: '',
        month: '',
        text: '',
        typeJournal: '',
        file_content: '',
        company: company,
      }
    return row
  }
  const summary = (data_) => (modelid === formEnum.PACB ? summaryPCB(data_) : summaryJ(data_))
  const submitQuery_ = (event) => {
    event.preventDefault()
    console.log('getUrl()', getUrl())
    accData?.length < 2
      ? Get(accUrl, profile, history, setAccData)
      : Get(getUrl(), profile, history, setData)
  }
  function buildForm() {
    return (
      <Grid container spacing={1} style={{ ...styles.outer }} direction="column">
        <JournalFormHead
          styles={styles}
          title={title}
          collapse={state.collapse}
          initialState={initialState}
          setData={setData}
          setAccData={setAccData}
          accUrl={accUrl}
          toggle={toggle}
          toggleToolbar={toggleToolbar}
        />
        <FormFactory
          formid={modelid}
          current={current}
          setCurrent={setCurrent}
          t={t}
          accData={accData}
          collapse={state.collapse}
          styles={styles}
          submitQuery={submitQuery_}
        />
        <Grid
          container
          spacing={2}
          style={{ ...styles.inner, display: 'block' }}
          direction="column"
        >
          <EditableTable
            Options={{
              ...buildExportOption(t('common.exportCSV'), t('common.exportPDF'), title),
              grouping: true,
              toolbar: toolbar,
              pageSize: 13,
              pageSizeOptions: [15, 25, 50],
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }}
            data={data ? summary(data) : initialState}
            columns={columnsX}
            theme={theme}
            t={t}
            setSelectedRows={() => void 0}
          />
        </Grid>
      </Grid>
    )
  }
  return buildForm()
}

const JForm = () => {
  const { t } = useTranslation()
  const { profile, selected, menu } = useStore()
  const { token, company, locale, currency } = profile
  let navigate = useNavigate()
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/cc' : selected)
  console.log('selected', selected)
  console.log('menu', menu)
  console.log('module_', module_)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : LOGIN(t)
  if (typeof module_ === 'undefined' || !module_ || module_.id === '11111')
    return navigate('/login')

  const url = module_.ctx.concat('/').concat(company)
  const accUrl = MASTERFILE.acc.concat('/').concat(company)
  const initAcc = module_.state1
  const initialState = module_.state
  const ALL = { ...initialState, id: '*', name: '**ALL**' }
  console.log('module_', module_)
  const current_ = module_.state ? module_?.state[0].query : []
  const title = t(module_.title)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState({ collapse: true, fadeIn: true, timeout: 300 })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isDebit, setIsDebit] = useState(true)
  const modelid = module_.modelid
  console.log('modelid', modelid)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [current, setCurrent] = useState(current_)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState(initialState)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [setAccData] = useState(initAcc)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [toolbar, setToolbar] = useState(true)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [iwsState, setIwsState] = useState(iwsStore.initialState)
  const columnsX =
    modelid === formEnum.PACB
      ? columnsPACB(t, locale, currency)
      : ColumnJournal(t, locale, currency)
  const toggleToolbar = () => setToolbar(!toolbar)
  const toggle = () => setState({ ...state, collapse: !state.collapse })
  const acc_modelid = parseInt(ACCOUNT(t).id)
  console.log('acc_modelid', acc_modelid)
  const accData_ = iwsState.get(acc_modelid) ? iwsState.get(acc_modelid) : [...initAcc]
  console.log('accData_', accData_)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let init = useRef(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    if (!init.current) {
      iwsStore.subscribe(setIwsState)
      init.current = true
    }
    // load account data as they are needed
    accUrl && Get1(accUrl, token, acc_modelid)
  }, [init, accUrl, token, acc_modelid])

  const getUrl = () =>
    url
      .concat('/')
      .concat(current.account)
      .concat('/')
      .concat(current.fromPeriod)
      .concat('/')
      .concat(current.toPeriod)

  return Internal(
    isDebit,
    t,
    modelid,
    selected === MASTERFILE.pac ? [ALL].concat(accData_) : accData_,
    accUrl,
    token,
    navigate,
    setAccData,
    initAcc,
    current,
    getUrl,
    setData,
    initialState,
    setIsDebit,
    title,
    state,
    url,
    toggle,
    toggleToolbar,
    setCurrent,
    toolbar,
    data,
    columnsX,
  )
}
export default memo(JForm)

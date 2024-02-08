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
  getUrlAll,
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
    // eslint-disable-next-line no-undef
    const row_ = data
    const row = row_ ? row_?.slice() : row_.slice()
    let debit = 0,
      idebit = 0,
      credit = 0,
      icredit = 0
    let currency = ''
    let company = ''
    for (let i = 0, len = row.length - 1; i <= len; ++i) {
      debit = debit + row[i].debit
      credit = credit + row[i].credit
      idebit = idebit + row[i].idebit
      icredit = icredit + row[i].icredit
      currency = row[i].currency
      company = row[i].company
      row[i] = { ...row[i], balance: '' }
    }
    const len = row ? row.length : 0
    if (len > 0)
      row[len] = {
        period: t('common.total'),
        idebit: idebit,
        debit: debit,
        icredit: icredit,
        credit: credit,
        balance: isDebit ? idebit + debit - credit - icredit : credit + icredit - debit - idebit,
        currency: currency,
        company: company,
      }
    return row
  }
  const summaryJ = (data_) => {
    // const row_ = data_
    const row = data_?.slice()
    const idx = Math.max(...row.map((i) => i.id))
    const last_row = row.find((e) => e.id === idx)
    const available = row.length > 0
    const lastDebit = available && last_row ? last_row.debit : 0
    const lastCredit = available && last_row ? last_row.credit : 0
    let amount = 0
    let currency = ''
    let company = ''
    for (let i = 0, len = row.length - 1; i <= len; ++i) {
      amount = amount + row[i].amount
      currency = row[i].currency
      company = row[i].company
    }
    const len = row.length

    if (len > 0)
      row[len] = {
        transid: t('common.total'),
        account: '',
        oaccount: '',
        transdate: '',
        enterdate: '',
        postingdate: '',
        period: '',
        amount: amount,
        idebit: '',
        debit: lastDebit,
        icredit: '',
        credit: lastCredit,
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
    accData?.length < 2
      ? Get(accUrl, profile, history, setAccData)
      : Get(getUrl(), profile, history, setData)
  }
  const submitQuery2 = (event) => {
    event.preventDefault()
    accData?.length < 2
      ? Get(accUrl, profile, history, setAccData)
      : Get(getUrlAll(), profile, history, setData)
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
          submitQuery2={submitQuery2}
          balancesheet={modelid === formEnum.PACB}
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
              pageSize: 14,
              pageSizeOptions: [14, 25, 50],
              showFirstLastPageButtons: true,
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
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : LOGIN(t)
  if (typeof module_ === 'undefined' || !module_ || module_.id === '11111')
    return navigate('/login')

  const url = module_.ctx.concat('/').concat(company)
  const accUrl = MASTERFILE.acc.concat('/').concat(formEnum.ACCOUNT).concat('/').concat(company)
  const initAcc = module_.state1
  const initialState = module_.state
  const ALL = { ...initialState, id: '*', name: '**ALL**' }
  const current_ = module_.state ? module_?.state[0].query : []
  const title = t(module_.title)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState({ collapse: true, fadeIn: true, timeout: 300 })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isDebit, setIsDebit] = useState(true)
  const modelid = module_.modelid
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
  const accData_ = iwsState.get(acc_modelid) ? iwsState.get(acc_modelid) : [...initAcc]
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

  const buildUrl = () =>
    url.concat('/').concat(current.account).concat('/').concat(current.toPeriod)
  const buildJournalUrl = () =>
    url
      .concat('/')
      .concat(current.account)
      .concat('/')
      .concat(current.fromPeriod)
      .concat('/')
      .concat(current.toPeriod)
  const getUrlAll = () => url.concat('/').concat(current.toPeriod)
  const getUrl = modelid === formEnum.PACB ? buildUrl : buildJournalUrl
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
    getUrlAll,
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

import React, { useState, useEffect, memo, useRef } from 'react'
import Grid from 'react-fast-grid'
import { formEnum } from '../utils/FORMS'
import { JournalFormHead, FormFactory } from './FormsProps'
import { styles } from '../Tree/BasicTreeTableProps'
import EditableTable from '../tables/EditableTable'
import { Get, Get1 } from './CrudController'
import { useStore, ACCOUNT, MASTERFILE, LOGIN } from './Menu'
import { useNavigate } from 'react-router-dom'
import { ColumnsBalancesheet as columns, buildExportOption } from '../tables/LineFinancialsProps'
import { useTranslation } from 'react-i18next'
import iwsStore from './Store'
const BasicTreeTable = () => {
  const { t } = useTranslation()
  const { profile } = useStore()
  const { token, company, locale, currency } = profile
  const { selected, menu } = useStore()
  let navigate = useNavigate()
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : LOGIN(t)
  if (typeof module_ === 'undefined' || !module_ || module_.id === '11111')
    return navigate('/login')
  if (module_.id === '0') navigate.push('/login')
  const url = module_.ctx.concat('/').concat(company)
  const accUrl = MASTERFILE.acc.concat('/').concat(formEnum.ACCOUNT).concat('/').concat(company)
  const initAcc = module_.state1
  const initialState = module_.state

  const current_ = initialState
  const title = t(module_.title)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState({ collapse: true, fadeIn: true, timeout: 300 })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [current, setCurrent] = useState(current_)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState(initAcc)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [setAccData] = useState(initAcc)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [toolbar, setToolbar] = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [iwsState, setIwsState] = useState(iwsStore.initialState)
  const acc_modelid = parseInt(ACCOUNT(t).id)
  const accData_ = iwsState.get(acc_modelid) ? iwsState.get(acc_modelid) : [...initAcc]
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const init = useRef(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!init.current) {
      iwsStore.subscribe(setIwsState)
      init.current = true
    }
    // load account data as they are needed
    accUrl && Get1(accUrl, token, acc_modelid)
    setCurrent(current_)
  }, [current_, accUrl, token, acc_modelid])
  const toggleToolbar = () => setToolbar(!toolbar)
  const toggle = () => setState({ ...state, collapse: !state.collapse })
  const columnsX = columns(t, locale, currency)
  const getUrl = () =>
    url
      .concat('/')
      .concat(current.account)
      .concat('/')
      .concat(current.fromPeriod)
      .concat('/')
      .concat(current.toPeriod)

  return Internal(
    data,
    setData,
    accUrl,
    initAcc,
    accData_,
    setAccData,
    token,
    navigate,
    current ? current : current_,
    initialState,
    state,
    title,
    getUrl,
    url,
    toggle,
    toggleToolbar,
    setCurrent,
    t,
    toolbar,
    columnsX,
  )
  function Internal(
    data,
    setData,
    accUrl,
    initAcc,
    accData,
    setAccData,
    profile,
    history,
    current,
    initialState,
    state,
    title,
    getUrl,
    url,
    toggle,
    toggleToolbar,
    setCurrent,
    t,
    toolbar,
    columnsX,
  ) {
    const load = (event) => {
      event.preventDefault()
      accData?.length < 2
        ? Get(accUrl, profile, history, setAccData)
        : current.account && current.fromPeriod && current.toPeriod
          ? Get(getUrl(), profile, history, setData)
          : void 0
    }

    const submitQuery_ = (event) => {
      event.preventDefault()
      Get(getUrl(), profile, history, setData)
    }
    let parentChildFn = (row, rows) => rows.find((a) => a.id === row.account)

    const buildForm = () => (
      <Grid container spacing={2} style={{ ...styles.outer }} direction="column">
        <JournalFormHead
          styles={styles}
          title={title}
          collapse={state.collapse}
          initialState={initialState}
          setData={setData}
          setAccData={setAccData}
          url={url}
          accUrl={accUrl}
          toggle={toggle}
          load={load}
          toggleToolbar={toggleToolbar}
        />
        <FormFactory
          formid={formEnum.BALANCETREE}
          current={current}
          setCurrent={setCurrent}
          t={t}
          accData={accData}
          collapse={state.collapse}
          height={35}
          styles={styles}
          submitQuery={submitQuery_}
        />

        <Grid container spacing={2} style={{ ...styles.inner }} direction="column">
          <EditableTable
            Options={{
              ...buildExportOption(t('common.exportCSV'), t('common.exportPDF'), title),
              selection: false,
              toolbar: toolbar,
              exportAllData: true,
            }}
            flag={false}
            data={data}
            columns={columnsX}
            t={t}
            parentChildData={parentChildFn}
          />
        </Grid>
      </Grid>
    )
    return buildForm()
  }
}
export default memo(BasicTreeTable)

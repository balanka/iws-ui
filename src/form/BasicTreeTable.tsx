import React, { useState, useEffect,  useRef } from 'react'
import Grid from 'react-fast-grid'
import { formEnum } from '../utils/FormEnum'
import { JournalFormHead } from './FormsProps'
import { styles } from '../BasicTreeTableProps'
import { Get, Get1 } from './CrudController'
import { useStore,  MASTERFILE, LOGIN } from './Menu'
import { useNavigate } from 'react-router-dom'
//import { ColumnsBalancesheet as columns, buildExportOption } from './LineFinancialsProps'
import { useTranslation } from 'react-i18next'
import iwsStore from '../utils/Store.jsx'
const BasicTreeTable = () => {
  const { t } = useTranslation()
  const { profile } = useStore()
  const { token, company,  } = profile
  const { selected, menu } = useStore()
  let navigate = useNavigate()
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : LOGIN(t)
  if (typeof module_ === 'undefined' || !module_ || module_.id === '11111')
    return navigate('/login')
  if (module_.id === '0') navigate('/login')
  const url = module_.ctx.concat('/').concat(company) 
  const accUrl = `${MASTERFILE.acc}/${formEnum.ACCOUNT}/${company}`
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
  const accData_ = iwsState.get(formEnum.ACCOUNT) ?? [...initAcc]
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const init = useRef(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!init.current) {
      iwsStore.subscribe(setIwsState)
      init.current = true
    }
    // load account data as they are needed
    accUrl && Get1(accUrl, token, formEnum.ACCOUNT)
    setCurrent(current_)
  }, [current_, accUrl, token, formEnum.ACCOUNT])
  const toggleToolbar = () => setToolbar(!toolbar)
  const toggle = () => setState({ ...state, collapse: !state.collapse })
  //const columnsX = columns(t, locale, currency)
  const getUrl = () =>
    url
      .concat('/')
      .concat(current.account)
      //.concat('/')
      //.concat(current.fromPeriod)
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
    // setCurrent,
    // t,
    // toolbar,
    //columnsX,
  )
  function Internal(
      _data:any,
    setData:any,
    accUrl:any,
      _initAcc:any,
    accData:any,
    setAccData:any,
    profile:any,
    history:any,
    current:any,
    initialState:any,
    state:any,
    title:any,
    getUrl:any,
    url:any,
    toggle:any,
    toggleToolbar:any,
    // setCurrent,
    // t,
    // toolbar,
    // columnsX,
  ) {
    const load = (event:any) => {
      event.preventDefault()
      accData?.length < 2
        ? Get(accUrl, profile, history, setAccData)
        : current.account && current.fromPeriod && current.toPeriod
          ? Get(getUrl(), profile, history, setData)
          : void 0
    }

    // const submitQuery_ = (event:any) => {
    //   event.preventDefault()
    //   Get(getUrl(), profile, history, setData)
    // }
    // let parentChildFn = (row:any, rows:any[]) => rows.find((a:any) => a.id === row.account)


    const buildForm = () => (
      <Grid container spacing={2}
          // @ts-ignore
            style={{ ...styles.outer }} direction="column">
        <JournalFormHead
            // @ts-ignore
          stylesx={styles}
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
        {/*<FormFactory*/}
        {/*  formid={formEnum.BALANCETREE}*/}
        {/*  current={current}*/}
        {/*  setCurrent={setCurrent}*/}
        {/*  t={t}*/}
        {/*  accData={accData}*/}
        {/*  collapse={state.collapse}*/}
        {/*  height={35}*/}
        {/*  styles={styles}*/}
        {/*  submitQuery={submitQuery_}*/}
        {/*  balancesheet={true}*/}
        {/*/>*/}

        <Grid container spacing={2} style={{ ...styles.inner }} direction="column">
          {/*<EditableTable*/}
          {/*  Options={{*/}
          {/*    ...buildExportOption(t('common.exportCSV'), t('common.exportPDF'), title),*/}
          {/*    selection: false,*/}
          {/*    toolbar: toolbar,*/}
          {/*    exportAllData: true,*/}
          {/*  }}*/}
          {/*  flag={false}*/}
          {/*  data={data}*/}
          {/*  columns={columnsX}*/}
          {/*  t={t}*/}
          {/*  parentChildData={parentChildFn}*/}
          {/*/>*/}
        </Grid>
      </Grid>
    )
    return buildForm()
  }
}
export default BasicTreeTable

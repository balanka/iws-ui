import React, {useEffect, useRef, useState} from 'react'
import Grid from 'react-fast-grid'
import {formEnum} from '../utils/FormEnum'
import {BalanceSheetHead, JournalMainForm} from './FormsProps'
import {Get, Get2} from './CrudController'
import {LOGIN, MASTERFILE, useStore} from './Menu'
import {useNavigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import iwsStore from '../utils/Store.jsx'
import {TFunction} from "i18next";
import {logout} from "./TransactionLib.ts";
import {styles as stylesx} from "./BasicTreeTableProps.tsx";
import {useDispatch} from "react-redux";
import {IAccount} from "../Models.ts";

const STYLES = {
  inner: {
    borderRadius: 5,
    boxShadow: '0 20px 50px #BBF',
    padding: 10,
    paddingTop: 30,
    // paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 3,
  },
  inner2: {
    borderRadius: 5,
    boxShadow: '0 20px 50px #BBF',
    paddingTop:5,
    paddingLeft: 1,
    paddingRight: 2,
  },
}

// const  myTheme = themeQuartz.withParams({
//   /* Low spacing = very compact */
//   spacing: 2,
//   /* Changes the color of the grid text */
//   foregroundColor:'rgb(126, 46, 132)',// '#8CBACC80', // 'rgb(14, 68, 145)',
//   /* Changes the color of the grid background */
//   backgroundColor: 'rgb(249, 245, 227)', //'rgb(241, 247, 255)',
//
//   oddRowBackgroundColor: 'rgba(120, 255, 0, 0.5)',
//   //oddRowBackgroundColor: '#fff9e6', //'rgb(0, 0, 0, 0.03)',
//
//   selectedRowBackgroundColor: 'rgba(0, 255, 0, 0.1)',
//   /* Changes the header color of the top row */
//   headerBackgroundColor: 'rgb(228, 237, 250)',
//
//
//   /* Changes the hover color of the row*/
//   rowHoverColor: 'rgb(216, 226, 255)',
//   dataFontSize:12,
//   //fontSize: 10,
// });
const BasicTreeTable = () => {
  const {t} = useTranslation()
  const {profile} = useStore()
  const {token, company} = profile
  const {selected, menu} = useStore()
  let navigate = useNavigate()
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : LOGIN(t)
  if (typeof module_ === 'undefined' || !module_ || module_.id === '11111')
    return navigate('/login')
  if (module_.id === '0') navigate('/login')
  const url = module_.ctx.concat('/').concat(company)
  const accUrl = `${MASTERFILE.acc}/${formEnum.ACCOUNT}/${company}`
  console.log('module_', module_)
  const initAcc = module_.state1
  const current_ = module_.state
  const title = t(module_.title)
  //const [state, setState] = useState({ collapse: true, fadeIn: true, timeout: 300 })
  const [current, setCurrent] = useState(current_)
  const [data, setData] = useState<IAccount[]>(initAcc)
  const [accData, setAccData] = useState(initAcc)
  // const [toolbar, setToolbar] = useState(false)
  const [, setIwsState] = useState(iwsStore.initialState)
  //const accData_ = iwsState.get(formEnum.ACCOUNT) ?? [...initAcc]
  const init = useRef(false)
  const dispatch = useDispatch()
  const height = 20
  useEffect(() => {
    if (!init.current) {
      iwsStore.subscribe(setIwsState)
      init.current = true
    }
    // load account data as they are needed
    accUrl && Get2(accUrl, token, setAccData)
    setCurrent(current_)
  }, [current_, accUrl])
  //const toggleToolbar = () => setToolbar(!toolbar)
  //const toggle = () => setState({ ...state, collapse: !state.collapse })
  //const columnsX = columns(t, locale ?? 'en_US', currency ?? 'EUR')
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
    //accUrl,
    initAcc,
    accData,
    //setAccData,
    token,
    navigate,
    current ? current : current_,
    //initialState,
    //state,
    title,
    getUrl,
    //url,
    // toggle,
    // toggleToolbar,
    // setCurrent,
    t,
    // toolbar,
    //columnsX,
  )

  function Internal(
    _data: any,
    setData: any,
    //accUrl: any,
    _initAcc: IAccount[],
    accData: IAccount[],
    //setAccData: any,
    profile: any,
    history: any,
    current: any,
    //initialState:any,
    //state:any,
    title: any,
    getUrl: any,
    //url:any,
    //toggle:any,
    //toggleToolbar:any,
    // setCurrent,
    t: TFunction<'translation', undefined>,
    //toolbar:any,
    //columnsX: any,
  ) {
    const load = (event:any) => {
      event.preventDefault()
      Get(getUrl(), profile, history, setData)
    }
    // const load = (event: any) => {
    //   event.preventDefault()
    //
    //   accData?.length < 2
    //     ? Get(accUrl, profile, history, setAccData)
    //     : current.account && current.fromPeriod && current.toPeriod
    //       ? Get(getUrl(), profile, history, setData)
    //       : void 0
    // }

    // const submitQuery_ = (event:any) => {
    //   event.preventDefault()
    //   Get(getUrl(), profile, history, setData)
    // }
    // let parentChildFn = (row: IAccount, rows: IAccount[]) => {
    //   console.log('row', row)
    //   console.log('rows', rows)
    //   rows?.find((a: IAccount) => a.account === row.id)
    // }

    console.log('dataXXX', data)
    const buildForm = () => {
      return (
        <Grid container style={{...STYLES.inner}} maximize direction="row" zeroMinWidth>
          <BalanceSheetHead style={{...STYLES.inner2}} title={title} submitQuery={load} dispatch={dispatch}
                            logout={logout} t={t}
                            templateFileName={""}/>
          <JournalMainForm current={current} setCurrent={setCurrent} t={t} accData={accData} height={height}
            //@ts-ignore
                           stylesx={{height: 950, paddingBottom: 5}} ids={['3310', "1100"]}/>
          <Grid container
            //@ts-ignore
                style={{...stylesx.outer, height: 600, width: "100%", paddingTop: 10}} maximize direction="column">
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
    }
    return buildForm()
  }
}
export default BasicTreeTable

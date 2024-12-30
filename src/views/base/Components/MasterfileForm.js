import React, { createRef, Suspense, useCallback, useLayoutEffect, useState } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import { MASTERFILE, useStore } from './Menu'
import Grid from 'react-fast-grid'
import { CommonFormHead, FormFactory } from './FormsProps'
import { ColumnFactory, buildExportOption } from '../tables/LineFinancialsProps'
import EditableTable from '../tables/EditableTable'
import { styles, theme } from '../Tree/BasicTreeTableProps'
import { useTranslation } from 'react-i18next'
import { Add, Edit, EditRow, Get1 } from './CrudController'
import { useNavigate } from 'react-router-dom'
import iwsStore from './Store'
import { formEnum } from '../utils/FORMS'

const MasterfileForm = (callback, deps) => {
  const { profile, menu, selected } = useStore()
  const { t } = useTranslation()
  const { token, company, locale, currency, incomeStmtAcc } = profile
  console.log('profile', profile)
  let navigate = useNavigate()
  const tableRef = createRef()
  const tableRef2 = createRef()
  const [state, setState] = useState({ collapse: true, fadeIn: true, timeout: 300 })
  const [toolbar, setToolbar] = useState(true)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [disable, setDisable] = useState(true)
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  console.log('module_', module_)
  if (module_ === '11111' || module_ === 11111) return navigate('/login')
  else {
    console.log('module_x', module_)
    const url =
      module_.ctx === MASTERFILE.comp
        ? module_.ctx
        : module_?.ctx
            .concat('/')
            .concat(module_?.id)
            .concat('/')
            .concat(company ?? '')
    const accUrl = MASTERFILE.acc
      .concat('/')
      .concat(formEnum.ACCOUNT)
      .concat('/')
      .concat(company ?? '')
    const vatUrl = MASTERFILE.vat
      .concat('/')
      .concat(formEnum.VAT)
      .concat('/')
      .concat(company ?? '')
    const classUrl = MASTERFILE.accountClass
      .concat('/')
      .concat(formEnum.ACCOUNT_CLASS)
      .concat('/')
      .concat(company)
    const groupUrl = MASTERFILE?.accountGroup
      .concat('/')
      .concat(formEnum.ACCOUNT_GROUP)
      .concat('/')
      .concat(company)
    const bankUrl = MASTERFILE?.masterfile
      .concat('/')
      .concat(formEnum.BANK)
      .concat('/')
      .concat(company)
    const storeUrl = MASTERFILE?.store
      .concat('/')
      .concat(formEnum.STORE)
      .concat('/')
      .concat(company)
    const moduleUrl = MASTERFILE?.module.concat('/').concat(company)
    const modifyUrl = module_.ctx //selected
    const initialState = module_.state
    const current_ = initialState[0]
    const title = t(module_.title)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [, setRows] = useState([])
    const modelid_ = module_.modelid
    const acc_modelId = formEnum.ACCOUNT
    const bank_modelId = formEnum.BANK
    const vat_modelId = formEnum.VAT
    const store_modelId = formEnum.STORE
    const module_modelId = formEnum.MODULE
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [current, setCurrent] = useState(current_)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [iwsState, setIwsState] = useState(iwsStore.initialState)
    const datax = iwsState.get(modelid_)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const data = typeof datax === 'undefined' ? [] : datax
    const isNotArrayOrEmpty = (array) => !Array.isArray(array) || !array.length
    const accd = iwsState.get(acc_modelId) ?? []
    const bankd = iwsState.get(bank_modelId) ?? []
    const vatd = iwsState.get(vat_modelId) ?? []
    const stored = iwsState.get(store_modelId) ?? []

    const submitEdit = (event) => {
      event.preventDefault()
      const editing = current.editing
      delete current.editing
      if (editing && !disable) {
        Edit(modifyUrl, token, { ...current }, data, setCurrent)
      } else {
        Add(modifyUrl, token, { ...current }, data, setCurrent)
      }
      setDisable(true)
    }
    const reload = () => {
      iwsStore.deleteKey(current.modelid)
      const url_ = modifyUrl?.concat('/').concat(current.modelid)
      url_ && Get1(url_, token, parseInt(current.modelid))
      setCurrent(current_)
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleKeyPress = useCallback((event) => {
      if (event.ctrlKey && (event.key === 's' || event.key === 'S')) {
        submitEdit(event)
      }
    }, [])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      iwsStore.subscribe(setIwsState)
      document.addEventListener('keydown', handleKeyPress)
      return () => {
        document.removeEventListener('keydown', handleKeyPress)
      }
    }, [current, data, handleKeyPress])
    const toggleToolbar = () => setToolbar(!toolbar)
    const toggle = () => setState({ ...state, collapse: !state.collapse })
    const setSelectedRows = (rows_) => setRows(rows_.map((item) => item.id))
    const initAdd = () => {
      setDisable(false)
      const newRow = { ...initialState[0], company: company, currency: currency, editing: false }
      EditRow(newRow, true, setCurrent)
    }
    const cancelEdit = (e) => {
      initAdd()
    }
    const columns = ColumnFactory(modelid_, iwsState.get(modelid_), t, locale, currency)
    const edit = (editedRow) => {
      const isArray = Array.isArray(editedRow) && editedRow.length > 0
      const row = isArray ? editedRow[0] : editedRow
      if (row) {
        const record = data.find((obj) => obj.id === row.id)
        setCurrent({ ...record, editing: true })
      }
    }
    const fetchData = (urlx, datax, modelIdx, token) => {
      isNotArrayOrEmpty(datax) &&
        urlx &&
        current.modelid !== modelIdx &&
        Get1(urlx, token, modelIdx)
    }
    const load = (event) => submitQuery(event)
    const submitQuery = (event) => {
      event.preventDefault()
      // fetch  account data
      fetchData(accUrl, accd, acc_modelId, token)
      // fetch  vat data
      fetchData(vatUrl, vatd, vat_modelId, token)
      // fetch  bank data
      fetchData(bankUrl, bankd, bank_modelId, token)
      // fetch  store data
      fetchData(storeUrl, stored, store_modelId, token)
      // fetch  module data
      fetchData(moduleUrl, [], module_modelId, token)
      url && Get1(url, token, current_.modelid)
    }

    const onNewBankAccount = () => {
      const ref = tableRef.current
      ref.dataManager.changeRowEditing()
      ref.setState({ ...ref.dataManager.getRenderState(), showAddRow: !ref.state.showAddRow })
    }

    const onNewSalaryItem = () => {
      const ref = tableRef2.current
      ref.dataManager.changeRowEditing()
      ref.setState({ ...ref.dataManager.getRenderState(), showAddRow: !ref.state.showAddRow })
    }
    const parentChildFn = (row, rows) => rows.find((a) => (a?.id ? a.id === row?.parent : false))

    function buildForm(current) {
      return (
        <Suspense fallback={<CSpinner color="primary" />}>
          <CommonFormHead
            styles={styles}
            title={title}
            collapse={state.collapse}
            initAdd={initAdd}
            initialState={initialState}
            url={url}
            accUrl={accUrl}
            onNewBankAccount={onNewBankAccount}
            onNewSalaryItem={onNewSalaryItem}
            cancelEdit={cancelEdit}
            submitEdit={submitEdit}
            submitQuery={load}
            reload={reload}
            toggle={toggle}
            toggleToolbar={toggleToolbar}
            setDisable={setDisable}
            disable={disable}
            style={{ ...styles.inner }}
          />

          <FormFactory
            formid={modelid_}
            disable={disable}
            current={current}
            current_={current_}
            setCurrent={setCurrent}
            t={t}
            locale={locale}
            currency={currency}
            company={company}
            incomeStmtAcc={incomeStmtAcc}
            navigate={navigate}
            accData={accd}
            vatData={vatd}
            bankData={bankd}
            storeData={stored}
            onNewLine={onNewSalaryItem}
            tableRef={tableRef}
            tableRef2={tableRef2}
            modifyUrl={modifyUrl}
            token={token}
            data={data}
            onNewBankAccount={onNewBankAccount}
            onNewSalaryItem={onNewSalaryItem}
            collapse={state.collapse}
            height={33}
            styles={styles}
            style={{ ...styles.inner }}
            title={title}
          />
          <Grid container spacing={1} style={{ ...styles.outer }} direction="column">
            <EditableTable
              Options={{
                ...buildExportOption(t('common.exportCSV'), t('common.exportPDF'), title),
                toolbar: toolbar,
                maxBodyHeight: '960px',
                pageSize: 10,
                pageSizeOptions: [10, 20, 50],
                showFirstLastPageButtons: true,
              }}
              data={data}
              columns={columns}
              theme={theme}
              t={t}
              edit={edit}
              setSelectedRows={setSelectedRows}
              parentChildData={current_.modelid === formEnum.VAT ? parentChildFn : null}
            />
          </Grid>
        </Suspense>
      )
    }

    return buildForm(current ? current : current_)
  }
}
export default MasterfileForm

import React, { createRef, memo, useCallback, useLayoutEffect, useState } from 'react'
import { MASTERFILE, useStore, ACCOUNT, BANK, VAT, LOGIN } from './Menu'
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
  const { token, company, locale, currency } = profile
  let navigate = useNavigate()
  const tableRef = createRef()
  const tableRef2 = createRef()
  const [state, setState] = useState({ collapse: true, fadeIn: true, timeout: 300 })
  const [toolbar, setToolbar] = useState(true)

  console.log('menu>>>>>', menu)
  console.log('selected>>>>>', selected)
  console.log('locale>>>>>', locale)
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : LOGIN(t)
  console.log('module_>>>>>', module_)
  if (typeof module_ === 'undefined' || !module_ || module_.id === '11111')
    return navigate('/login')
  const url =
    module_.ctx === MASTERFILE.comp ? module_.ctx : module_.ctx.concat('/').concat(company)
  const accUrl = MASTERFILE.acc.concat('/').concat(company)
  const vatUrl = MASTERFILE.vat.concat('/').concat(company)
  const bankUrl = MASTERFILE.bank.concat('/').concat(company)
  const moduleUrl = MASTERFILE.module.concat('/').concat(company)
  const modifyUrl = selected
  const initialState = module_.state
  const current_ = initialState[0]
  const title = t(module_.title)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, setRows] = useState([])
  const modelid_ = module_.modelid
  const acc_modelId = parseInt(ACCOUNT(t, locale, currency).id)
  const bank_modelId = parseInt(BANK(t, locale).id)
  const vat_modelId = parseInt(VAT(t, locale).id)
  const module_modelId = formEnum.MODULE
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [current, setCurrent] = useState(current_)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [iwsState, setIwsState] = useState(iwsStore.initialState)
  const datax = iwsState.get(modelid_)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = typeof datax === 'undefined' ? [] : datax

  const submitAdd = (event) => {
    event.preventDefault()
    delete current.editing
    Add(modifyUrl, token, { ...current }, data, setCurrent)
  }

  const submitEdit = (event) => {
    event.preventDefault()
    if (current.editing) {
      delete current.editing
      Edit(modifyUrl, token, { ...current }, data, setCurrent)
    } else submitAdd(event)
  }
  const reload = () => {
    iwsStore.deleteKey(current.modelid)
    const url_ = modifyUrl.concat('/').concat(current.modelid)
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
  const initAdd = () =>
    EditRow(
      { ...initialState[0], company: company, currency: currency, editing: false },
      true,
      setCurrent,
    )
  const cancelEdit = (e) => initAdd()
  const columns = ColumnFactory(modelid_, iwsState.get(modelid_), t, locale, currency)
  const edit = (editedRow) => {
    const isArray = Array.isArray(editedRow) && editedRow.length > 0
    const row = isArray ? editedRow[0] : editedRow
    if (row) {
      const record = data.find((obj) => obj.id === row.id)
      setCurrent({ ...record, editing: true })
    }
  }

  const isNotArrayOrEmpty = (array) => !Array.isArray(array) || !array.length
  const accd = iwsState.get(acc_modelId) ?? []
  const bankd = iwsState.get(bank_modelId) ?? []
  const vatd = iwsState.get(vat_modelId) ?? []

  const load = (event) => submitQuery(event)
  const submitQuery = (event) => {
    event.preventDefault()
    isNotArrayOrEmpty(accd) &&
      accUrl &&
      current.modelid !== acc_modelId &&
      Get1(accUrl, token, acc_modelId)
    isNotArrayOrEmpty(vatd) &&
      vatUrl &&
      current.modelid !== vat_modelId &&
      Get1(vatUrl, token, vat_modelId)
    isNotArrayOrEmpty(bankd) &&
      bankUrl &&
      current.modelid !== bank_modelId &&
      Get1(bankUrl, token, bank_modelId)
    moduleUrl && current.modelid !== module_modelId && Get1(moduleUrl, token, module_modelId)
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
  function buildForm(current) {
    return (
      <>
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
          style={{ ...styles.inner }}
        />

        <FormFactory
          formid={modelid_}
          current={current}
          setCurrent={setCurrent}
          t={t}
          locale={locale}
          currency={currency}
          accData={accd}
          vatData={vatd}
          bankData={bankd}
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
          />
        </Grid>
      </>
    )
  }

  return buildForm(current ? current : current_)
}
export default memo(MasterfileForm)

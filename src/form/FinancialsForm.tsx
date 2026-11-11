import { useState, useEffect, useMemo, useSyncExternalStore } from 'react'
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  GridReadyEvent,
  ModuleRegistry,
  SelectEditorModule,
} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { styles, styles as stylesx } from './BasicTreeTableProps.tsx'
// @ts-expect-error -- legacy, see TODO
import type { RowSelectedEvent } from 'ag-grid-community/dist/types/src/events'
import { FinancialsMainForm } from './FinancialsMainForm'
import { FinancialsFormHead } from './FinancialsFormHead.tsx'
import {
  FINANCIALS,
  initAcc,
  initContact,
  initfModule,
  initFtr,
  initLineFinancials,
  initReminderBalance,
  MASTERFILE,
} from './Menu.tsx'
import { formEnum } from '../utils/FormEnum.tsx'
import {
  IAccount,
  IContact,
  IFinancials,
  IFmodule,
  ILineFinancials,
  IMasterfile,
  ITransaction,
  ReminderBalance,
} from '../Models.ts'
import { LineTFinancialsGrid, TransactionGrid } from '../IWSGrid.tsx'
import { financialsColumnDefs, LinesFinancialsColumns } from '../ColumnsDefs.ts'
import { logout } from '../utils/FormUtils.tsx'
import Login from './Login'
import { CSpinner } from '@coreui/react-pro'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { capitalizeFirst, generateDocx } from '../utils/XlsUtils.ts'
import useTransactionForm from './useTransactionForm.ts'
import useForm from './useForm.ts'
import { AddList, Get, Get3, GET4, GetListData } from './CrudController.ts'
import { getLocalizedOrdinal, getMonthName, isArrayAndNotEmpty } from '../utils/Utils.ts'
import { toCardinal } from 'n2words/fr-FR'
import { TEMPLATE_ENUM } from '../Props.ts'
import iwsStore from '../utils/Store.tsx'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, SelectEditorModule])

const FinancialsForm = () => {
  // ── useForm + router/redux ──────────────────────────────────────────────
  const [{ profile, t, toggle, toggleTable, state, module_ }] = useForm()
  const { token, currency, company, locale } = profile
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // ── Stable initial values ───────────────────────────────────────────────
  const current_: IFinancials = useMemo(
    () => ({ ...initFtr, company }),
    [company]
  )
  const initialLine: ILineFinancials = useMemo(
    () => ({
      ...initLineFinancials,
      currency: currency ?? '',
      company: `-${company}`,
    }),
    [currency, company]
  )

  // ── State ───────────────────────────────────────────────────────────────
  const [currentLine, setCurrentLine] = useState<ILineFinancials>(initialLine)
  const [rowData, setRowData] = useState<IFinancials[]>([])
  const [model, setModel] = useState<number>(-1)

  const [{
    language, fmodule, current, setCurrent, initAdd, reload, submitEdit, onRowSelected,
    onNewLine, copyFromTransaction, setCopyFromTransaction, onDeleteLine, submitCancel,
    submitPost, copyCall, setGridApi, zIndex, handleLanguageChange, saveProps,
    isFetching, setIsFetching, gridOptions,
  }] = useTransactionForm(current_, initialLine, currentLine, setCurrentLine, rowData, setRowData, model)

  const [title, setTitle] = useState(`${company} /${t(module_.title)}`)

  const acc_modelid = formEnum.ACCOUNT
  const cc_modelid = formEnum.COSTCENTER
  const contact_modelid = formEnum.CONTACT

  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const cc_ctx = `${MASTERFILE.masterfile}/${cc_modelid}/${company}`
  const contact_ctx = `${MASTERFILE.contact}/${contact_modelid}/${company}`

  // ── Reactive store reads ────────────────────────────────────────────────
  const snapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  )

  const accData = useMemo<IAccount[]>(() => {
    const inner = snapshot.get(acc_modelid)
    const list = inner ? (Array.from(inner.values()) as IAccount[]) : []
    return list.length > 0 ? list : [initAcc]
  }, [snapshot, acc_modelid])

  const ccData = useMemo<IMasterfile[]>(() => {
    const inner = snapshot.get(cc_modelid)
    return inner ? (Array.from(inner.values()) as IMasterfile[]) : []
  }, [snapshot, cc_modelid])

  const contactData = useMemo<IContact[]>(() => {
    const inner = snapshot.get(contact_modelid)
    return inner ? (Array.from(inner.values()) as IContact[]) : []
  }, [snapshot, contact_modelid])

  const [accFilter, setAccFilter] = useState<string[]>([])
  const [oaccFilter, setOAccFilter] = useState<string[]>([])
  const [, setReminderBalance] = useState<ReminderBalance[]>([initReminderBalance])

  // ── Masterfile fetch — only if store is empty ───────────────────────────
  useEffect(() => {
    if (!token) return
    const snap = iwsStore.getRawMap()

    const tryFetch = <X,>(mId: number, url: string) => {
      const inner = snap.get(mId)
      if (!inner || inner.size === 0) {
        Get(url, token, mId, (() => {}) as React.Dispatch<React.SetStateAction<X[]>>)
      }
    }

    tryFetch<IAccount>(acc_modelid, acc_ctx)
    tryFetch<IMasterfile>(cc_modelid, cc_ctx)
    tryFetch<IContact>(contact_modelid, contact_ctx)
  }, [token, company, acc_ctx, cc_ctx, contact_ctx, acc_modelid, cc_modelid, contact_modelid])

  // ── Callbacks ───────────────────────────────────────────────────────────
  const submitQuery = async (ctx: string,  modelid4Fetch:number, event?: any) => {
    event?.preventDefault()
    //setIsFetching(true)
    //let shown = false
    const showTimer = setTimeout(() => { //shown = true;
      setIsFetching(true) }, 150)
    try {
      const snap = iwsStore.getRawMap()
      const jobs: Promise<unknown>[] = []

      const tryFetch = <X,>(mId: number, url: string) => {
        const inner = snap.get(mId)
        if (!inner || inner.size === 0) {
          jobs.push(Get(url, token, mId, (() => {}) as React.Dispatch<React.SetStateAction<X[]>>) as unknown as Promise<void>)
        }
      }

      tryFetch<IAccount>(acc_modelid, acc_ctx)
      tryFetch<IMasterfile>(cc_modelid, cc_ctx)
      jobs.push(Get3(ctx, token, modelid4Fetch, current_, setRowData, setCurrent) as unknown as Promise<void>)

      await Promise.all(jobs)
    } catch (error) {
      console.error('Error fetching data', error)
    } finally {
      clearTimeout(showTimer)
      // if (shown) {
      //   // keep it up at least 200 ms so it doesn't blink
      //   await new Promise((r) => setTimeout(r, 200))
      // }
      setIsFetching(false)
    }
  } //, [acc_ctx, cc_ctx, token, acc_modelid, cc_modelid, modelid, current_, setCurrent, setIsFetching])

  const handleModuleChange = (selectedValue: any) => {
    const numericId = parseInt(String(selectedValue?.value ?? selectedValue), 10)
    setModel(numericId)
    const mx: IFmodule = fmodule.find((m: IFmodule) => parseInt(`${m?.id}`, 10) === numericId) ?? initfModule
    setTitle(`${company}/${mx?.name ?? 'Not found'}`)
    setAccFilter(mx.accFilter?.replace(/\s/g, '').split(','))
    setOAccFilter(mx.oaccFilter?.replace(/\s/g, '').split(','))
    const copyFromIds = (mx?.copyFrom ?? '-1').replace(/\s/g, '').split(',')
    const ctx_ = `${module_.ctx}/${numericId}/${company}`
    const ctx_copyFrom = `${module_.ctx}/n/${company}/${copyFromIds}`
    const idx = copyFromIds.map((i) => parseInt(i, 10)).reduce((a, c) => a + c, 0)

    Get(ctx_copyFrom, token, idx, setCopyFromTransaction)
    void submitQuery(ctx_, numericId)
  }
  // const handleModuleChange = (selected: any) => {
  //   const id = selected?.value !== undefined ? String(selected.value) : String(selected)
  //   const numericId = parseInt(id, 10)
  //   setModel(numericId)
  //
  //   const mx: IFmodule = fmodule.find((m: IFmodule) => String(m.id) === id) ?? initfModule
  //   const moduleName = mx?.name ?? 'Not found'
  //   setTitle(`${company}/${moduleName}`)
  //
  //   const copyFromIds = (mx?.copyFrom ?? '-1').replace(/\s/g, '').split(',')
  //
  //   setCurrent(current_)
  //   setAccFilter(mx.accFilter?.replace(/\s/g, '').split(','))
  //   setOAccFilter(mx.oaccFilter?.replace(/\s/g, '').split(','))
  //
  //   const ctx_ = `${module_.ctx}/${numericId}/${company}`
  //   const ctx_copyFrom = `${module_.ctx}/n/${company}/${copyFromIds}`
  //   const idx = copyFromIds.map((i) => parseInt(i, 10)).reduce((acc, curr) => acc + curr, 0)
  //   Get(ctx_copyFrom, token, idx, setCopyFromTransaction)
  //   void submitQuery(ctx_, numericId)
  //   // const currentx =
  //   //   rowData?.filter((m) => m.modelid === current_.modelid).length > 0
  //   //     ? rowData[0]
  //   //     : current_
  //   // setCurrent({ ...currentx, modelid: numericId })
  // }

  const onRowSelectedL = (event: RowSelectedEvent) => {
    if (!event?.data) return
    const line: ILineFinancials = isArrayAndNotEmpty(event.data) ? event.data[0] : event.data
    if (!line) return
    if (String(currentLine?.id) === String(line.id)) return
    setCurrentLine({ ...line })
  }

  const onGridReady = (params: GridReadyEvent) => setGridApi(params.api)

  const buildTotal = (c: ITransaction | IFinancials) =>
     (c as IFinancials)?.lines?.reduce((acc: number, line: ILineFinancials) => acc + line.amount, 0.0)

  const formatLines = (line: ILineFinancials) => ({
    ...line,
    amount: line.amount.toLocaleString(locale, { style: 'currency', currency }),
  })

  const getData = async (): Promise<any> => {
    const ftr_ctx = `${module_.ctx}/${current.oid}/${formEnum.CUSTOMER_INVOICE_LOGISTIC}/${company}`
    const total_ = buildTotal(current)
    const contact = contactData.find((m) => m.id === current.contact) ?? initContact
    const appartmentId = current.costcenter.substring(
      current.costcenter.length - 2,
      current.costcenter.length
    )
    const year = Number(`${current?.period}`.substring(0, 4))
    const month = Number(`${current?.period}`.substring(5, 6))
    const monthName = getMonthName(month - 1, locale ?? 'fr-FR')
    const date = new Date(year, month, 0)
    const invoiceData = (await GET4<IFinancials>(ftr_ctx, token)) ?? initFtr
    const rent = (invoiceData.lines?.at(0) ?? initLineFinancials).amount
    const lastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate()

    const startDay1AsOrdinal = getLocalizedOrdinal(1, locale ?? 'fr-FR')
    const rentx = rent ?? 1
    return {
      ...current,
      date: new Date().toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }),
      appartmentId,
      year,
      month,
      from: `${startDay1AsOrdinal} ${monthName} ${year}`,
      to: `${lastDay} ${monthName} ${year}`,
      transdate: current.transdate,
      name: contact.name,
      rent: (rent ?? 0).toLocaleString('de-DE', {
        style: 'currency',
        currency: currency || 'EUR',
        useGrouping: true,
      }),
      numberOfMonth: total_ / rentx,
      total: total_?.toLocaleString('de-DE', {
        style: 'currency',
        currency: currency || 'EUR',
        useGrouping: true,
      }),
      totalText: toCardinal(total_).split(' ').map(capitalizeFirst).join('.'),
      lines: current.lines.map(formatLines),
    }
  }

  const getMonth = (d: ReminderBalance) => {
    const month = new Date(
      Number(d?.period.toString().substring(0, 4)),
      Number(d?.period.toString().substring(4, 6)) - 1,
      5, 0, 0, 0, 0
    ).toLocaleDateString(locale, { month: 'long' })
    return capitalizeFirst(month)
  }

  const getData2 = async () => {
    const ctx_ = `${module_.ctx}/balance/${current.account}/${company}`
    const appartmentId = current.costcenter.substring(
      current.costcenter.length - 2,
      current.costcenter.length
    )
    const data = await GetListData<ReminderBalance>(ctx_, token, formEnum.REMINDER_BALANCE)
    const contact = contactData.find((m) => m.id === current.contact) ?? initContact
    const total = Number(data.reduce((acc: number, line: ReminderBalance) => acc + line.balance, 0.0))
    setReminderBalance(data)
    return {
      id: current.id.toString(),
      appartmentId,
      name: contact.name,
      date: new Date().toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }),
      month: getMonth(data[data.length - 1]),
      year: Number(`${data[data.length - 1]?.period}`.substring(0, 4)),
      total: total.toLocaleString('de-DE', {
        style: 'currency',
        currency,
        useGrouping: true,
      }),
      totalText: toCardinal(total).split(' ').map(capitalizeFirst).join('.'),
      lines: data.map((d: ReminderBalance) => ({
        id: d.id,
        month: getMonth(d),
        year: Number(`${d.period}`.substring(0, 4)),
        balance: Number(d.balance).toLocaleString('de-DE', {
          style: 'currency',
          currency: currency || 'EUR',
          useGrouping: true,
        }),
      })),
    }
  }

  const processImport = (dataToImport: IFinancials[]) => {
    const ctx_ = '/ftrL'
    const arr: Promise<unknown>[] = []
    for (let i = 0; i < dataToImport.length; i += 20) {
      const chunk = dataToImport.slice(i, i + 20)
      arr.push(AddList(ctx_, token, chunk, rowData, setRowData))
    }
    Promise.all(arr).catch((error) => {
      console.error('Import failed', error)
    })
  }
  const fmoduleData = useMemo(() => (fmodule ?? []).filter((m: IFmodule) => m.parent === FINANCIALS.id), [fmodule])
  if (module_ === '11111' || module_ === 11111) return <Login />

  const minHeight = 300
  const maxHeight = 650
  const height = 30
  // ── Render ──────────────────────────────────────────────────────────────
  return  (
    <>
      {isFetching && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.5)', zIndex: 9999,
        }}>
          <CSpinner color="primary" />
        </div>
      )}
    <>
      <FinancialsFormHead
        title={title}
        saveProps={saveProps}
        collapse={state.collapseForm}
        initAdd={initAdd}
        submitEdit={submitEdit}
        fmodule={fmodule}
        getData={getData}
        getData2={getData2}
        submitPrintPreview={generateDocx}
        template1EnumId={TEMPLATE_ENUM.FIRST}
        template2EnumId={TEMPLATE_ENUM.SECOND}
        submitCancel={submitCancel}
        onNewLine={onNewLine}
        onDeleteLine={onDeleteLine}
        submitPost={submitPost}
        reload={reload}
        logout={logout}
        navigate={navigate}
        language={language}
        handleLanguageChange={handleLanguageChange}
        dispatch={dispatch}
        toggle={toggle}
        toggleTable={toggleTable}
        current={current}
        t={t}
        zIndex={zIndex - 1}
        fileInputProps={{
          company,
          currency: currency ?? 'EUR',
          masterfiles: accData,
          onImportComplete: processImport,
        }}
      />

      <div
        style={{
          ...styles.outer,
          width: '100%',
          height: 365,
          display: !state.collapseForm ? 'none' : '',
        }}
      >
        <FinancialsMainForm
          collapse={state.collapseForm}
          current={current ?? current_}
          setCurrent={setCurrent}
          accData={accData}
          storeData={ccData}
          contactData={contactData}
          modules={fmoduleData}
          copyFromTransaction={copyFromTransaction}
          handleModuleChange={handleModuleChange}
          submitCopy={copyCall}
          accountFilter={accFilter}
          oaccountFilter={oaccFilter}
          currentLineFinancials={currentLine ?? initialLine}
          setCurrentLineFinancials={setCurrentLine}
          t={t}
          height={height}
          zIndex={zIndex - 2}
          locale={locale ?? 'fr-GN'}
          currency={currency ?? 'GNF'}
        />

        <div
          style={{
            ...stylesx.outer,
            display: !state.collapseForm ? 'none' : '',
            width: '100%',
            height: 160,
            padding: 2,
            paddingTop: 3,
            zIndex: 4,
          }}
        >
          <LineTFinancialsGrid
            // @ts-expect-error -- legacy, see TODO
            theme="legacy"
            columnDefs={LinesFinancialsColumns(t, locale ?? 'fr-GN', currency ?? 'GNF')}
            onRowSelected={onRowSelectedL}
            onGridReady={onGridReady}
            rowData={
              !current.hasOwnProperty('lines')
                ? [{ ...currentLine, transid: current?.id }]
                : current.lines
            }
            pagination={false}
          />
        </div>
      </div>

      <div
        style={{
          ...stylesx.outer,
          height: state.collapseForm ? minHeight : maxHeight,
          padding: 2,
          width: '100%',
          zIndex: 1,
          display: state.collapseTable ? '' : 'none',
        }}
        data-maximize
        data-direction="column">
        <TransactionGrid
          // @ts-expect-error -- legacy, see TODO
          gridOptions={gridOptions(
            (t: any) => financialsColumnDefs(t, locale ?? 'fr-GN', currency ?? 'GNF'),
            locale ?? 'fr-GN',
            currency ?? 'GNF',
            (t: any) => LinesFinancialsColumns(t, locale ?? 'fr-GN', currency ?? 'GNF'),
            t
          )}
          onRowSelected={onRowSelected}
          rowData={rowData}
        />
      </div>
    </>
   </>
  )
}

export default FinancialsForm

import { useState, useEffect, useMemo, useSyncExternalStore } from 'react'
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  GridReadyEvent,
  ModuleRegistry,
} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { styles } from './BasicTreeTableProps.tsx'
// @ts-expect-error -- legacy, see TODO
import type { RowSelectedEvent } from 'ag-grid-community/dist/types/src/events'
import { FinancialsFormHead } from './FinancialsFormHead.tsx'
import { TransactionMainForm } from './TransactionMainForm.tsx'
import {
  initCust, initfModule,
  initLineTransaction,
  initLtr,
  MASTERFILE,
  TRANSACTION,
} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import {
  IAccount,
  IArticle,
  ICustomer,
  IFinancials,
  IFmodule,
  ILineFinancials,
  ILineTransaction,
  IStore,
  ISupplier,
  ITransaction,
  IVat,
  ReminderBalance,
} from '../Models.ts'
import { TransactionGrid } from '../IWSGrid.tsx'
import { lineTransactionColumnDefs, transactionColumnDefs } from '../ColumnsDefs.ts'
import { logout } from '../utils/FormUtils.tsx'
import Login from './Login.tsx'
import { CSpinner } from '@coreui/react-pro'
import { TransactionDetailsTabs } from './TransactionDetailsTabs.tsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { capitalizeFirst, generateDocx } from './../utils/XlsUtils.ts'
import useTransactionForm from './useTransactionForm.ts'
import useForm from './useForm.ts'
import { formEnum } from '../utils/FormEnum.tsx'
import { Get, Get3, GetListData, Gets } from './CrudController.ts'
import { toCardinal } from 'n2words/fr-FR'
import { TEMPLATE_ENUM } from '../Props.ts'
import { capitalize1rst, getMonthName } from '../utils/Utils.ts'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule])

const TransactionForm = () => {
  // ── Hooks: useForm + router/redux ───────────────────────────────────────
  const [{ profile, t, toggle, toggleTable, state, module_, modelid }] = useForm()
  const { token, currency, locale, company } = profile
  const localex = locale ?? 'fr-FR'
  const currencyx = currency ?? 'EUR'
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogin = module_ === '11111' || module_ === 11111
  const titleText = isLogin ? company : `${company}/${t((module_ as any)?.title)}`
  const current_: ITransaction = initLtr
  const minHeight = 220
  const maxHeight = 800
  const height = 35

  const initialLine: ILineTransaction = useMemo(
    () => ({ ...initLineTransaction, currency: currency ?? localex }),
    [currency, localex]
  )
  const [currentLine, setCurrentLine] = useState<ILineTransaction>(initialLine)
  const [rowData, setRowData] = useState<ITransaction[]>([])
  const [model, setModel] = useState<number>(-1)

  const [{
    language, fmodule, current, setCurrent, initAdd, reload, submitEdit, copyFromTransaction, setCopyFromTransaction,
    onRowSelected, onNewLine, handleLanguageChange, onDeleteLine, submitCancel, submitPost, copyCall, setGridApi,
    zIndex, saveProps, isFetching, setIsFetching, gridOptions,
  }] = useTransactionForm(current_ ?? initLtr, initialLine, currentLine, setCurrentLine, rowData, setRowData, model)

  // ── Modelid constants + contexts ────────────────────────────────────────
  const art_modelid = formEnum.ARTICLE
  const vat_modelid = formEnum.VAT
  const store_modelid = formEnum.STORE
  const sup_modelid = formEnum.SUPPLIER
  const cust_modelid = formEnum.CUSTOMER
  const acc_modelid = formEnum.ACCOUNT

  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const art_ctx = `${MASTERFILE.article}/${art_modelid}/${company}`
  const vat_ctx = `${MASTERFILE.vat}/${vat_modelid}/${company}`
  const store_ctx = `${MASTERFILE.store}/${store_modelid}/${company}`
  const sup_ctx = `${MASTERFILE.sup}/${sup_modelid}/${company}`
  const cust_ctx = `${MASTERFILE.cust}/${cust_modelid}/${company}`

  // ── Reactive store snapshot ─────────────────────────────────────────────
  const snapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  )

  const accData = useMemo<IAccount[]>(() => {
    const inner = snapshot.get(acc_modelid)
    return inner ? (Array.from(inner.values()) as IAccount[]) : []
  }, [snapshot, acc_modelid])

  const articleData = useMemo<IArticle[]>(() => {
    const inner = snapshot.get(art_modelid)
    return inner ? (Array.from(inner.values()) as IArticle[]) : []
  }, [snapshot, art_modelid])

  const storeData = useMemo<IStore[]>(() => {
    const inner = snapshot.get(store_modelid)
    return inner ? (Array.from(inner.values()) as IStore[]) : []
  }, [snapshot, store_modelid])

  const vatData = useMemo<IVat[]>(() => {
    const inner = snapshot.get(vat_modelid)
    return inner ? (Array.from(inner.values()) as IVat[]) : []
  }, [snapshot, vat_modelid])

  const customerData = useMemo<ICustomer[]>(() => {
    const inner = snapshot.get(cust_modelid)
    return inner ? (Array.from(inner.values()) as ICustomer[]) : []
  }, [snapshot, cust_modelid])

  // ── Form state (partner selection, filters, etc.) ───────────────────────
  const [partnerId, setPartnerId] = useState<number>(-1)
  const [accFilter, setAccFilter] = useState<string[]>([])
  const [oaccFilter, setOAccFilter] = useState<string[]>([])
  const [title, setTitle] = useState(titleText)
  const [, setReminderBalance] = useState<ReminderBalance[]>([])

  // Partner list is derived from the store, keyed by partnerId
  const accData1 = useMemo<ICustomer[] | ISupplier[]>(() => {
    if (partnerId <= 0) return [initCust]
    const inner = snapshot.get(partnerId)
    if (!inner || inner.size === 0) return [initCust]
    return Array.from(inner.values()) as ICustomer[] | ISupplier[]
  }, [snapshot, partnerId])

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

    tryFetch<IArticle>(art_modelid, art_ctx)
    tryFetch<IStore>(store_modelid, store_ctx)
    tryFetch<IVat>(vat_modelid, vat_ctx)
    tryFetch<ICustomer>(cust_modelid, cust_ctx)
    tryFetch<ISupplier>(sup_modelid, sup_ctx)
    tryFetch<IAccount>(acc_modelid, acc_ctx)
  }, [
    token, company,
    art_ctx, store_ctx, vat_ctx, cust_ctx, sup_ctx, acc_ctx,
    art_modelid, store_modelid, vat_modelid, cust_modelid, sup_modelid, acc_modelid,
  ])

  const onGridReady = (params: GridReadyEvent) => setGridApi(params.api)

  const formatLines = (line: ILineTransaction | ILineFinancials): ILineTransaction | ILineFinancials => {
    const l = line as ILineTransaction
    return {
      ...l,
      quantity: l.quantity.toLocaleString('de-DE'),
      price: l.price.toLocaleString('de-DE'),
      vat: toLocaleString2(l.vat, locale||'de-DE', currency||'EUR'),
      net: toLocaleString2(l.quantity * l.price, locale||'de-DE', currency||'EUR'),
    } as unknown as ILineTransaction
  }

  const buildVatTotal = (c: ITransaction | IFinancials) =>
    ((c?.lines ?? []) as ILineTransaction[]).reduce((acc, line) => acc + line.vat, 0.0)

  const buildTotal = (c: ITransaction | IFinancials) =>
    (c as ITransaction)?.lines?.reduce(
      (acc: number, line: ILineTransaction) => acc + line.quantity * line.price,
      0.0
    )
  const  toLocaleString2 = (amount:number, locale:string, currency:string)=>
    amount? new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
    : ''
  const getData = (): any => {
    const net = buildTotal(current)
    const vatTotal = buildVatTotal(current)
    const total = Math.round(net + vatTotal)
    const customer = customerData.find((m) => m.id === current.account) ?? initCust
    const address = `${customer.street} ${customer.city} ${customer.country}`
    const year = Number(`${current.period}`.substring(0, 4))
    const month = Number(`${current.period}`.substring(5, 6))
    const monthName = capitalize1rst(getMonthName(month - 1, locale ?? 'fr-FR'))
    return {id: current.id,
      oid: current.oid,
      customerId: current.account,
      name: customer.name,
      phone: customer.phone,
      address,
      date: new Date().toLocaleDateString(locale, {
      day: 'numeric', month: 'long', year: 'numeric',
      }),
      transdate: new Date(current?.transdate).toLocaleDateString(locale, {day: 'numeric', month: 'long', year: 'numeric'}),
      period: `${monthName} ${year}`,
      net:  toLocaleString2(net, locale||'de-DE', currency||'EUR'),
      vatTotal: toLocaleString2(vatTotal, locale||'de-DE', currency||'EUR'),
      total: total?.toLocaleString(locale, { style: 'currency', currency }),
      totalText: toCardinal(total).split(' ').map(capitalizeFirst).join(' '),
      lines: current.lines.map(formatLines),
      text: current.text,
      footText: current.footText,
    }
  }

  const getData2 = async (): Promise<ReminderBalance[]> => {
    const ctx = `${module_.ctx}/${current.account}/${company}`
    const data = await GetListData<ReminderBalance>(ctx, token, formEnum.REMINDER_BALANCE)
    setReminderBalance(data)
    return data
  }

  const submitQuery = async (
    ctx: string,
    partnerCtx: string,
    partnerModelid: number
  ) => {
    setIsFetching(true)
    try {
      const snap = iwsStore.getRawMap()
      const jobs: Promise<unknown>[] = []
      const tryFetch = <X,>(mId: number, url: string) => {
        const inner = snap.get(mId)
        if (!inner || inner.size === 0) {
          jobs.push(Get(url, token, mId, (() => {}) as React.Dispatch<React.SetStateAction<X[]>>) as unknown as Promise<void>)
        }
      }

      tryFetch<IArticle>(art_modelid, art_ctx)
      tryFetch<IStore>(store_modelid, store_ctx)
      tryFetch<IVat>(vat_modelid, vat_ctx)
      if (partnerModelid > 0) tryFetch(partnerModelid, partnerCtx)

      jobs.push(Get3(ctx, token, modelid, current_, setRowData, setCurrent) as unknown as Promise<void>)

      await Promise.all(jobs)
    } catch (error) {
      console.error('Error fetching data', error)
    } finally {
      setIsFetching(false)
    }
  }

  const processImport = (data2Import: ITransaction[]) => {
    if (import.meta.env.DEV) console.log('data2Import', data2Import)
  }

  const handleModuleChange = async (selectedValue: any) => {
    const id = selectedValue?.value !== undefined ? String(selectedValue.value) : String(selectedValue)
    const numericId = parseInt(id, 10)
    setModel(numericId)

    const mx: IFmodule =
      fmodule.find((m: IFmodule) => parseInt(`${m?.id}`, 10) === numericId) ?? initfModule

    const moduleName = mx?.name ?? titleText
    setTitle(`${company}/${moduleName}`)

    const copyFromIds = mx?.copyFrom
      ? mx.copyFrom.split(',').map((mid: string) => parseInt(mid, 10))
      : []

    setPartnerId(parseInt(mx?.account, 10))
    setAccFilter(mx?.accFilter?.replace(/\s/g, '').split(',') ?? [])
    setOAccFilter(mx?.oaccFilter?.replace(/\s/g, '').split(',') ?? [])

    const ctx = `${module_.ctx}/${mx.id}/${company}`
    const ctx_copyFrom = `${module_.ctx}/${copyFromIds.join(',')}/${company}`

    const partnerType = parseInt(mx?.account, 10)
    const _partnerCtx =
      partnerType === formEnum.CUSTOMER ? MASTERFILE.cust :
        partnerType === formEnum.SUPPLIER ? MASTERFILE.sup :
          partnerType === formEnum.ACCOUNT ? MASTERFILE.acc :
            partnerType === formEnum.STORE ? MASTERFILE.store :
              ''
    const partnerCtx = `${_partnerCtx}/${partnerType}/${company}`

    if (copyFromIds.length > 0) {
      await Gets(ctx_copyFrom, token, copyFromIds, setCopyFromTransaction)
    } else if (import.meta.env.DEV) {
      console.log('No transaction to copy from available', copyFromIds)
    }

    if (_partnerCtx.length > 0) {
      await submitQuery(ctx, partnerCtx, partnerType)
    }
  }

  const fmoduleData = (fmodule ?? []).filter((m) => m.parent === TRANSACTION.id)

  const accDatax: ICustomer[] | ISupplier[] | IAccount[] =
    model === formEnum.ACCOUNT ? accData : accData1
  const stData = storeData?.filter((m) => !m.id.toString().includes('*'))

  if (isLogin) return <Login />

  return isFetching ? (
    <CSpinner color="primary" />
  ) : (
    <>
      <FinancialsFormHead
        title={title}
        saveProps={saveProps}
        collapse={state.collapseForm}
        initAdd={initAdd}
        submitCancel={submitCancel}
        submitEdit={submitEdit}
        onNewLine={onNewLine}
        onDeleteLine={onDeleteLine}
        submitPost={submitPost}
        getData={getData}
        getData2={company === '5700' ? getData2 : getData}
        fmodule={fmodule}
        submitPrintPreview={generateDocx}
        template1EnumId={TEMPLATE_ENUM.FIRST}
        template2EnumId={TEMPLATE_ENUM.SECOND}
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
        zIndex={zIndex ?? 99999}
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
          height: 380,
          display: !state.collapseForm ? 'none' : '',
        }}
      >
        <TransactionMainForm
          collapse={state.collapseForm}
          current={current ?? current_}
          setCurrent={setCurrent}
          t={t}
          accData={accDatax}
          storeData={stData}
          modules={fmoduleData}
          copyFromTransaction={copyFromTransaction}
          handleModuleChange={handleModuleChange}
          submitCopy={copyCall}
          height={height}
          zIndex={zIndex - 2}
          locale={locale ?? localex}
          currency={currency ?? currencyx}
        />

        <div
          style={{
            backgroundColor: 'transparent',
            padding: 1,
            display: !state.collapseForm ? 'none' : '',
            width: '100%',
          }}
        >
          <TransactionDetailsTabs
            collapseTable={state.collapseTable}
            transaction={current}
            setTransaction={setCurrent}
            currentLineTransaction={currentLine}
            setCurrentLineTransaction={setCurrentLine}
            accountFilter={accFilter}
            oaccountFilter={oaccFilter}
            articleData={articleData ?? []}
            vatData={vatData ?? []}
            t={t}
            onGridReady={onGridReady}
            zIndex={2}
            locale={locale ?? localex}
            currency={currency ?? currencyx}
          />
        </div>
      </div>

      <div
        style={{
          ...styles.outer,
          height: state.collapseForm ? minHeight : maxHeight,
          width: '100%',
          zIndex: 1,
          display: state.collapseTable ? '' : 'none',
        }}
      >
        <TransactionGrid
          // @ts-expect-error -- legacy, see TODO
          gridOptions={gridOptions(
            (t: any) => transactionColumnDefs(t, locale ?? 'fr-GN', currency ?? 'GNF'),
            locale ?? 'fr-GN',
            currency ?? 'GNF',
            (t: any) => lineTransactionColumnDefs(t, locale ?? 'fr-GN', currency ?? 'GNF'),
            t
          )}
          onRowSelected={onRowSelected}
          rowData={rowData}
        />
      </div>
    </>
  )
}

export default TransactionForm

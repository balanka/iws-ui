import {useEffect, useState} from 'react'
import {
  AllCommunityModule,
  ClientSideRowModelModule, //ColDef,
  //GridOptions,
  GridReadyEvent,
 // IDetailCellRendererParams,
  ModuleRegistry,
} from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import {styles} from './BasicTreeTableProps.tsx'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {FinancialsFormHead} from './FinancialsFormHead.tsx'
import {TransactionMainForm} from './TransactionMainForm.tsx'
import {initCust, initfModule, initLineTransaction, initLtr, MASTERFILE, TRANSACTION} from './Menu.tsx'
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
  IVat, ReminderBalance,
} from '../Models.ts'
import {TransactionGrid} from '../IWSGrid.tsx'
import {lineTransactionColumnDefs, transactionColumnDefs} from '../ColumnsDefs.ts'
import {isLoaded, logout} from '../utils/FormUtils.tsx'
import Login from './Login.tsx'
import {CSpinner} from "@coreui/react-pro";
import {TransactionDetailsTabs} from './TransactionDetailsTabs.tsx'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {capitalizeFirst, generateDocx} from './../utils/XlsUtils.ts'
import useTransactionForm from './UseTransactionForm.ts'
import useForm from './UseForm.ts'
import {formEnum} from '../utils/FormEnum.tsx'
import {Get, Get3, GetListData, Gets} from './CrudController.ts'
//import {TFunction} from "i18next";
import {toCardinal} from "n2words/fr-FR";


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

  const TransactionForm = () => {
  const [{profile, selected, t, toggle, toggleTable, state, visible, module_, modelid }] = useForm()
  const { token, currency, locale, company } = profile
  const localex = locale??'fr-FR'
  const currencyx = currency??'EUR'
  const dispatch = useDispatch()
  let navigate = useNavigate()
  if (module_ === '11111' || module_ === 11111) return <Login/>
  let title_ = `${company}/${t(module_.title)}`
  const initialState:ITransaction = initLtr
  const initialLine:ILineTransaction = {...initLineTransaction, currency:currency??localex}
  const current_:ITransaction = initialState
  const [currentLine, setCurrentLine] = useState<ILineTransaction>(initialLine)
  const [rowData, setRowData] = useState<ITransaction[]>([])
  const [model, setModel] = useState<number>(-1)
  const  [{  language,  fmodule, current, setCurrent, initAdd, reload, submitEdit, copyFromTransaction
    , setCopyFromTransaction, onRowSelected, onNewLine, handleLanguageChange
     , onDeleteLine, submitCancel, submitPost, copyCall, setGridApi, templateName, zIndex, saveProps, isFetching
    , setIsFetching, gridOptions }] =
     useTransactionForm(current_??initLtr, initialLine, currentLine, setCurrentLine, rowData, setRowData, model)

   const fmoduleData= (fmodule ??[]).filter((m: IFmodule) => m.parent === TRANSACTION.id)
   //const acc_modelid = formEnum.ACCOUNT
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
   const [accData, setAccData] = useState<IAccount[]>([])
   const [storeData, setStoreData] = useState<IStore[]>([])
   const [articleData, setArticleData] = useState<IArticle[]>([])
   const [vatData, setVatData] = useState<IVat[]>([])
   const [, setCustomerData] = useState<ICustomer[]>([])
   const [, setSupplier] = useState<ISupplier[]>([])
   const [, setPartnerData] = useState<ICustomer[]|ISupplier[]>([initCust])
   const [partnerId, setPartnerId] = useState<number>(-1)
   const [accFilter, setAccFilter] = useState<string[]>([])
   const [oaccFilter, setOAccFilter] = useState<string[]>([])
   const [title, setTitle] = useState(title_)
    //const [forceUpdate, setForceUpdate] = useState(false)
   const [reminderBalance, setReminderBalance] = useState<ReminderBalance[]>([])
   console.log('current', current)
   useEffect(() => {
     Promise.all([
       !isLoaded(art_modelid)&&Get(art_ctx, token, art_modelid, setArticleData),
       !isLoaded(store_modelid)&& Get(store_ctx, token, store_modelid, setStoreData),
       !isLoaded(vat_modelid)&&Get(vat_ctx, token, vat_modelid, setVatData),
       !isLoaded(cust_modelid)&&Get(cust_ctx, token, cust_modelid, setCustomerData),
       !isLoaded(sup_modelid)&&Get(sup_ctx, token, sup_modelid, setSupplier),
       !isLoaded(acc_modelid)&&Get(acc_ctx, token, acc_modelid, setAccData)
     ]).then(() => {
       console.log('All data fetched successfully');
       // additional logic after all requests complete
     }).catch(error => {
       console.error('Error fetching data', error);
     });
   },[selected])
   //},[selected, forceUpdate])


     const onGridReady = (params: GridReadyEvent) => setGridApi(params.api)
     const minHeight=220
     const maxHeight = 800
     const height = 35
     const formatLines = (line:ILineTransaction|ILineFinancials):ILineTransaction|ILineFinancials =>  {
     // @ts-ignore
     return {
       ...line
       // @ts-ignore
       , quantity: line.quantity.toLocaleString(locale)
       // @ts-ignore
       , price: line.price.toLocaleString(locale,  { style: "currency", currency: currency })
       // @ts-ignore
       , vat: line.vat.toLocaleString(locale,  { style: "currency", currency: currency })
       // @ts-ignore
       , net: (line.quantity * line.price + line.vat).toLocaleString(locale,  { style: "currency", currency: currency })
     }
   }
   const buildTotal = (current: ITransaction|IFinancials) =>{
     //@ts-ignore
     const trans:ITransaction  = current
     return  trans?.lines?.reduce((acc: number, line: ILineTransaction) => acc + line.quantity * line.price + line.vat, 0.0)
   }
   const getData: ()=>any = ()=>  {
    const total = buildTotal(current)
     return {
       id:current.id
       , date: new Date().toLocaleDateString(locale, {day:"numeric", month: "long", year: "numeric"})
       , transdate: current.transdate.toLocaleDateString(locale, {day:"numeric", month: "long", year: "numeric"})
       , total:   total.toLocaleString(locale,  { style: "currency", currency: currency })
       , totalText:toCardinal(total).split(" ").map(capitalizeFirst).join(" ")
       , lines: current.lines.map(formatLines)
       , text:current.text
       , footText:current.footText
     }
   }
    const getData2 =  async (): Promise<ReminderBalance[]>=> {
      const ctx = `${module_.ctx}/${current.account}/${company}`;
      const data  =  await GetListData<ReminderBalance>(ctx, token, formEnum.REMINDER_BALANCE);
      setReminderBalance(data);
      console.log('reminderBalance', reminderBalance)
      console.log('fresh reminderBalance', data)
      return data;
    };

    const submitQuery = async (ctx:string, partnerCtx:string, partnerModelid:number) => {
      setIsFetching(true)
      try {
        await Promise.all([
          !isLoaded(art_modelid) && Get(art_ctx, token, art_modelid, setArticleData),
          !isLoaded(store_modelid) && Get(store_ctx, token, store_modelid, setStoreData),
          !isLoaded(vat_modelid) && Get(vat_ctx, token, vat_modelid, setVatData),
          partnerModelid&&!isLoaded(partnerModelid) && Get(partnerCtx, token, partnerModelid, setPartnerData),
          Get3(ctx, token, modelid, current_, setRowData, setCurrent),
        ]);
        console.log('All data fetched successfully');
        // Now rowData has been updated (assuming Get3 calls setRowData)
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setIsFetching(false);
      }
    };

    const handleModuleChange = async (selected: any) => {
      // 1. Extract the ID from the selected option (object or primitive)
      const id = selected?.value !== undefined ? String(selected.value) : String(selected);
      const numericId = parseInt(id, 10);
      // 2. Update the model state with the numeric ID
      setModel(numericId);

      // 3. Find the module using the numeric ID
      const mx: IFmodule = fmodule.find((m: IFmodule) => parseInt(`${m?.id}`, 10) === numericId) ?? initfModule;

      // 4. Update title
      title_ = mx?.name ? mx.name : title_;

      // 5. CopyFrom IDs – safely handle undefined
      const copyFromIds = mx?.copyFrom
        ? mx.copyFrom.split(',').map((modelid: string) => parseInt(modelid, 10))
        : [];

      // 6. Update UI state
      const titlex = `${company}/${title_}`;
      setTitle(titlex);
      setPartnerId(parseInt(mx?.account, 10));
      console.log('mx', mx);

      // 7. Filter arrays – guard against undefined
      setAccFilter(mx?.accFilter?.replace(/\s/g, '').split(',') ?? []);
      setOAccFilter(mx?.oaccFilter?.replace(/\s/g, '').split(',') ?? []);

      // 8. Build contexts
      const ctx = `${module_.ctx}/${mx.id}/${company}`;
      const ctx_copyFrom = `${module_.ctx}/${copyFromIds.join(',')}/${company}`; // join with commas

      const partnerType = parseInt(mx?.account, 10);
      const _partnerCtx =
        partnerType === formEnum.CUSTOMER ? MASTERFILE.cust :
          partnerType === formEnum.SUPPLIER ? MASTERFILE.sup :
            partnerType === formEnum.ACCOUNT ? MASTERFILE.acc :
              partnerType === formEnum.STORE ? MASTERFILE.store :
                '';
      console.log('_partnerCtx', _partnerCtx);

      const partnerCtx = `${_partnerCtx}/${partnerType}/${company}`;

      // 9. Fetch copyFrom transactions if any
      if (copyFromIds.length === 0) {
        console.log('No transaction to copy from available!!!', copyFromIds);
      } else {
        await Gets(ctx_copyFrom, token, copyFromIds, setCopyFromTransaction);
      }

      // 10. Submit main query if partner context exists
      if (_partnerCtx.length > 0) {
        submitQuery(ctx, partnerCtx, partnerType);
      }
    };

    const accData1:ICustomer[]|ISupplier[] = iwsStore.getByModelId(partnerId) as ICustomer[] | ISupplier[] ?? [initCust]//.filter(m=>!m.id.toString().includes('*'))
    const accDatax:ICustomer[]|ISupplier[]|IAccount[]= (model ===formEnum.ACCOUNT)? accData:accData1
    const stData = storeData?.filter(m=>!m.id.toString().includes('*'))
    // console.log('model', model)
    // console.log('partnerId', partnerId)
    // console.log('accData', accData)
    // console.log('accData1', accData1)
    // console.log('accDatax', accDatax)
   // console.log('storeData', storeData)
    //console.log('stData>>>>', stData)
    return isFetching?<CSpinner color="primary" />:<>
            <FinancialsFormHead
                title={title}
                saveProps={saveProps}
                collapse={state.collapse}
                initAdd={initAdd}
                submitCancel={submitCancel}
                submitEdit={submitEdit}
                onNewLine={onNewLine}
                onDeleteLine={onDeleteLine}
                submitPost={submitPost}
                templateName={templateName}
                getData={getData}
                getData2={getData2}
                submitPrintPreview={generateDocx}
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
                zIndex={zIndex??99999}
        />
       <div
       //@ts-ignore
         style={{ ...styles.outer,   width:'100%', height: 380,  display: !state.collapse ? 'none' : ''}}>
          <TransactionMainForm collapse={state.collapse} current={current??current_} setCurrent={setCurrent}
                               t={t} accData={accDatax}
                               storeData={stData} modules={fmoduleData}
                               copyFromTransaction={copyFromTransaction}
                               handleModuleChange={handleModuleChange}
                               submitCopy={copyCall}
                               height={height} zIndex={zIndex-2} locale = {locale} currency ={currency}/>
          <div
            // @ts-ignore
            style={{ backgroundColor: 'transparent',  padding:1, display: !state.collapse?'none':'', width: '100%', height: 40}}>
              <TransactionDetailsTabs   transaction={current}  setTransaction={setCurrent}
                                        currentLineTransaction ={currentLine}
                                        setCurrentLineTransaction={setCurrentLine}
                                        accountFilter={accFilter} oaccountFilter={oaccFilter}
                                        articleData={articleData??[]} vatData={vatData??[]}  t={t}
                                        onGridReady={onGridReady}  zIndex={2} locale={locale??localex} currency={currency??currencyx}/>
          </div>
       </div>
       <div
           // @ts-ignore
            style={{...styles.outer,  height:state.collapse?minHeight:maxHeight, width: '100%'
                  , zIndex:1, display:visible?'':'none'}}>
         <TransactionGrid
           //@ts-ignore
           gridOptions ={gridOptions (transactionColumnDefs, locale, currency, lineTransactionColumnDefs, t)}  columnDefs={transactionColumnDefs(t,locale, currency)}
                             onRowSelected={onRowSelected} rowData={rowData}/>
       </div>
    </>
}
export default TransactionForm

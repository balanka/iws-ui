import React, {useEffect, useState} from 'react'
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  GridOptions,
  GridReadyEvent,
  IDetailCellRendererParams,
  ModuleRegistry,
} from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
import {styles as stylesx} from './BasicTreeTableProps.tsx'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {FinancialsFormHead, TransactionMainForm} from './FormsProps.tsx'
import {initCust, initfModule, initLineTransaction, initLtr, MASTERFILE, TRANSACTION} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'

import {
  IArticle,
  ICustomer,
  IFinancials, IFmodule,
  ILineFinancials,
  ILineTransaction, IStore, ISupplier,
  ITransaction, IVat,
} from '../Models.ts'
import {TransactionGrid} from '../IWSGrid.tsx'
import {lineTransactionColumnDefs, transactionColumnDefs} from '../ColumnsDefs.ts'
import {logout} from '../utils/FormUtils.tsx'
import Login from './Login.tsx'
import {CSpinner} from "@coreui/react";
import {TransactionDetailsTabs} from './TransactionDetailsTabs.tsx'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {generateDocx} from './../utils/XlsUtils.ts'
import useTransactionForm from './UseTransactionForm.ts'
import useForm from './UseForm.ts'
import {formEnum} from '../utils/FormEnum.tsx'
import {Get, Get3} from './CrudController.ts'


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const STYLES = {
  inner: {
    borderRadius: 5,
    boxShadow: '0 20px 50px #BBF',
    padding: 1,
    paddingLeft: 3,
    paddingRight: 2,
    //height: 350,
    //paddingTop: 30,
  }
}
 const TransactionForm = () => {
   const [{profile, selected, t, toggle, toggleTable, state, visible, module_, modelid }] = useForm()
   const { token, currency, company } = profile
   const dispatch = useDispatch()
  let navigate = useNavigate()
  if (module_ === '11111' || module_ === 11111) return <Login/>
   let title_ = `${company}/${t(module_.title)}`
  const initialState:ITransaction = initLtr [0]
  const initialLine:ILineTransaction = {...initLineTransaction, currency:currency??''}
  const current_:ITransaction = initialState
   const [currentLine, setCurrentLine] = useState<ILineTransaction>(initialLine)
   const [rowData, setRowData] = useState<ITransaction[]>([])
   const  [{  language,  fmodule, current, setCurrent, initAdd, reload, submitEdit, copyFromTransaction
     , setCopyFromTransaction, onRowSelected, onNewLine, handleLanguageChange, setAccData, setFmodule, setModel
     , onDeleteLine, submitCancel, submitPost, copyCall, setGridApi, templateName, zIndex, saveProps, isFetching, setIsFetching }] =
     useTransactionForm(current_??initLtr [0], initialLine, currentLine, setCurrentLine, rowData, setRowData)

  const [iwsState, setIwsState] = useState(iwsStore.initialState)
   const fmoduleData= (fmodule ??[]).filter((m: IFmodule) => m.parent === TRANSACTION.id)
   const acc_modelid = formEnum.ACCOUNT
   const art_modelid = formEnum.ARTICLE
   const vat_modelid = formEnum.VAT
   const store_modelid = formEnum.STORE
   const sup_modelid = formEnum.SUPPLIER
   const cust_modelid = formEnum.CUSTOMER
   const fmodule_modelid = formEnum.FMODULE
   const art_ctx = `${MASTERFILE.article}/${art_modelid}/${company}`
   const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
   const vat_ctx = `${MASTERFILE.vat}/${vat_modelid}/${company}`
   const store_ctx = `${MASTERFILE.store}/${store_modelid}/${company}`
   const sup_ctx = `${MASTERFILE.sup}/${sup_modelid}/${company}`
   const cust_ctx = `${MASTERFILE.cust}/${cust_modelid}/${company}`
   const fmodule_ctx = `${MASTERFILE.fmodule}/${fmodule_modelid}/${company}`
   const [storeData, setStoreData] = useState<IStore[]>([])
   const [articleData, setArticleData] = useState<IArticle[]>([])
   const [vatData, setVatData] = useState<IVat[]>([])
   const [, setCustomerData] = useState<ICustomer[]>([])
   const [, setSupplier] = useState<ISupplier[]>([])
   const [, setPartnerData] = useState<ICustomer[]|ISupplier[]>(initCust)
   //const [, setCopyFRom] = useState<number[]>([])
   const [partnerId, setPartnerId] = useState<number>(-1)
   const [accFilter, setAccFilter] = useState<string[]>([])
   const [oaccFilter, setOAccFilter] = useState<string[]>([])
   const [title, setTitle] = useState(title_)


   useEffect(() => {
     iwsStore.subscribe(setIwsState)
     Get(art_ctx, token, art_modelid, setArticleData)
     Get(store_ctx, token, store_modelid, setStoreData)
     Get(vat_ctx, token, vat_modelid, setVatData)
     Get(cust_ctx, token, cust_modelid, setCustomerData)
     Get(sup_ctx, token, sup_modelid, setSupplier)
     setCurrent(current_)
     setRowData([])
   }, [selected])

     const gridOptions: GridOptions<ITransaction|IFinancials> = {
         rowStyle: { background: 'lightBlue' },
         // @ts-ignore
         getRowStyle: (params: { node: { rowIndex: number} }):{background:string } => {
             if (params.node.rowIndex % 2 === 0) {
                 return { background: '#fff9e6' }
             }
         },
             defaultColDef: {
                 resizable: true,
                 editable: false, //!current.posted,
                 flex: 1,
                 filter:true,
                 //floatingFilter: true,
                 //filter: "agTextColumnFilter",
             },
         rowHeight: 20,
         copySelectedRows:true,
         rowSelection: {
             mode: "multiRow",
             checkboxes: true,
         },
         onRowSelected:onRowSelected,
         paginationPageSizeSelector: [5, 10, 20, 50],
         pagination: true,
         paginationPageSize: 10,
         //masterDetail: true,
         detailRowAutoHeight: true,
         autoSizeStrategy: {
             type: "fitGridWidth",
         },
         // @ts-ignore
         columnDefs: transactionColumnDefs(t),
         // @ts-ignore
         detailCellRendererParams: {
             detailGridOptions: {
                 getRowStyle: (params: { node: { rowIndex: number} }) => {
                     if (params.node.rowIndex % 2 === 0) {
                         return { background: '#fff9e6' }
                     }
                 },
                 columnDefs:lineTransactionColumnDefs(t),
                 defaultColDef: {
                     flex: 1,
                 },
             },
             getDetailRowData: (params:any) => {
                 params.successCallback(params.data.lines);
             },
         } as IDetailCellRendererParams<ITransaction, ILineTransaction>,

         // detailCellRendererParams: {
         //     detailGridOptions: {
         //         columnDefs:lineTransactionColumnDefs(t),
         //         defaultColDef: {
         //             flex: 1,
         //         },
         //     },
         //     getDetailRowData: (params:any) => params.successCallback(params.data.lines)
         // } as IDetailCellRendererParams<ITransaction, ILineTransaction>,
         //onFirstDataRendered: onFirstDataRendered,
     }

     const onGridReady = (params: GridReadyEvent) =>   {
      console.log('onGridReady', params)
      setGridApi(params.api)
     }

  const minHeight=300
  const maxHeight = 800
  const minPadding=20
  const maxPadding =35


   const formatLines = (line:ILineTransaction|ILineFinancials):ILineTransaction|ILineFinancials =>  {
     // @ts-ignore
     return {
       ...line
       // @ts-ignore
       , quantity: Number(line.quantity).toFixed(2)
       // @ts-ignore
       , price: Number(line.price).toFixed(2)
       // @ts-ignore
       , vat: Number(line.vat).toFixed(2)
       // @ts-ignore
       , net: Number((line.quantity * line.price) + line.vat).toFixed(2)
     }
   }
   const buildTotal = (current: ITransaction|IFinancials) =>{
     //@ts-ignore
     const trans:ITransaction  = current
     return  trans?.lines?.reduce((acc: number, line: ILineTransaction) => acc + line.quantity * line.price + line.vat, 0.0)
   }
   const getData: ()=>any = ()=>  {
     return {
       id:current.id
       , transdate: current.transdate
       , total: Number(buildTotal(current)).toFixed(2)
       , lines: current.lines.map(formatLines)
       , text:current.text
       , footText:current.footText
     }
   }
   const submitQuery = (ctx:string, partnerCtx:string, partnerModelid:number) => {
     setIsFetching(true)
     !iwsState.get(fmodule_modelid)&&Get(fmodule_ctx, token, fmodule_modelid, setFmodule)
     !iwsState.get(acc_modelid)&&Get(acc_ctx, token, acc_modelid, setAccData)
     !iwsState.get(art_modelid)&&Get(art_ctx, token, art_modelid, setArticleData)
     !iwsState.get(store_modelid)&&Get(store_ctx, token, store_modelid, setStoreData)
     !iwsState.get(vat_modelid)&&Get(vat_ctx, token, vat_modelid, setVatData)
     !iwsState.get(partnerModelid)&&Get(partnerCtx, token, partnerModelid, setPartnerData)
     !iwsState.get(partnerModelid)&&Get(partnerCtx, token, partnerModelid, setPartnerData)
     Get3(ctx, token, modelid, current_, setRowData, setCurrent)
     setIsFetching(false)
   }

   const handleModuleChange = (value:any) => {
     setModel(value)
     const mx:IFmodule = fmodule.find((m:IFmodule) => m?.id === value) ?? initfModule[0]
     let templateFileName = mx.description
     console.log('mx>>>>', mx)
     console.log('value', value)
     console.log('templateFileName >>>>', templateFileName)
      title_ = mx?.name ? mx?.name : title_
     const copyFromIds = mx? mx.copyFrom:-1
     const titlex = `${company}/${title_}`
     //console.log('titlex>>>>', titlex)
     setTitle(titlex)
     //setCopyFRom([copyFromIds])
     setPartnerId(parseInt(mx?.account))
     setCurrent(current_)
     setAccFilter(mx.accFilter?.replace(/\s/g,'').split(','))
     setOAccFilter(mx.oaccFilter?.replace(/\s/g,'').split(','))
     const ctx = `${module_.ctx}/${mx.id}/${company}`
     const ctx_copyFrom = `${module_.ctx}/${copyFromIds}/${company}`
     const _partnerCtx:string = parseInt(mx?.account)===formEnum.CUSTOMER?MASTERFILE.cust:
       (parseInt(mx?.account)==formEnum.SUPPLIER)?MASTERFILE.sup:''
     const partnerCtx = `${_partnerCtx}/${parseInt(mx.account)}/${company}`
     Get(ctx_copyFrom, token, copyFromIds, setCopyFromTransaction)
     submitQuery( ctx, partnerCtx, parseInt(mx?.account))
     const rowDatax = rowData.filter(m=>m.modelid===current_.modelid)
     const currentx = rowDatax.length>0?rowData[0]:current_
     setCurrent(currentx)
   }

  const ccData:ICustomer[]|ISupplier[] = iwsState.get(partnerId)??[initCust]
   const accData:ICustomer[]|ISupplier[] = ccData//.filter(m=>!m.id.toString().includes('*'))
   const stData = storeData.filter(m=>!m.id.toString().includes('*'))
    return isFetching?<CSpinner color="primary" />:(<>
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
        />
        <Grid container style={{...STYLES.inner}} maximize direction="row" zeroMinWidth>
          <TransactionMainForm collapse={state.collapse} current={current??current_} setCurrent={setCurrent}
                               t={t} accData={accData}
                               storeData={stData} modules={fmoduleData}
                               copyFromTransaction={copyFromTransaction}
                               handleModuleChange={handleModuleChange}
                               submitCopy={copyCall}
                               height={20} zIndex={zIndex-2}/>
          <Grid container
              // @ts-ignore
                style={{...stylesx.outer, display: !state.collapse?'none':'', width: '100%', height: 160
                    , paddingTop: 5, zIndex: 4}} maximize
                direction="column" zeroMinWidth>
              <TransactionDetailsTabs   transaction={current}  setTransaction={setCurrent}
                                        currentLineTransaction ={currentLine}
                                        setCurrentLineTransaction={setCurrentLine}
                                        accountFilter={accFilter} oaccountFilter={oaccFilter}
                                        articleData={articleData??[]} vatData={vatData??[]}  t={t}
                                        onGridReady={onGridReady}  zIndex={2}/>
          </Grid>
          <Grid container
              // @ts-ignore
                style={{...stylesx.outer,  height:state.collapse?minHeight:maxHeight
                    , paddingLeft: 10, paddingRight:5, paddingTop:state.collapse?minPadding:maxPadding, width: '100%'
                    , zIndex:1, display:visible?'':'none'}} maximize
                direction="column">
            <TransactionGrid gridOptions ={gridOptions}  columnDefs={transactionColumnDefs(t)}
                             onRowSelected={onRowSelected} rowData={rowData}/>
          </Grid>
        </Grid>
    </>)
}
export default TransactionForm

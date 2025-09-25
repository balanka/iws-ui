import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
    AllCommunityModule,
    ClientSideRowModelModule,
    GridApi,
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
import {Add, Edit, EditRow, Get, Get2} from './CrudController.ts'
import {initCust, initfModule, initLtr, MASTERFILE, TRANSACTION, useStore} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import {useTranslation} from 'react-i18next'
import {formEnum} from '../utils/FormEnum.tsx'
import {
    IAccount,
    IArticle,
    ICustomer,
    IFinancials,
    IFmodule,
    ILineTransaction,
    IModule,
    IStore,
    ISupplier,
    ITransaction,
    IVat,
} from '../Models.ts'
import {TransactionGrid} from '../IWSGrid.tsx'
import {lineTransactionColumnDefs, transactionColumnDefs} from '../ColumnsDefs.ts'
import {logout} from './TransactionLib.ts'
import Login from "./Login.tsx";
import {CSpinner} from "@coreui/react";
import {TransactionDetailsTabs} from "./TransactionDetailsTabs.tsx";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {SaveProps} from '../Props.ts'


ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  //MasterDetailModule,
  //RichSelectModule,
  // ExcelExportModule,
  // SetFilterModule,
  // MultiFilterModule,
  // MasterDetailModule,
])

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
  const {profile, menu, selected} = useStore()
  const {t, i18n} = useTranslation()
     const dispatch = useDispatch()
  const {token, company, currency} = profile
  console.log('menu', menu)
  console.log('profile', profile)
  console.log('selected', selected)
  console.log('i18n', i18n)
  //i18n.changeLanguage('de-DE');
  //let navigate = useNavigate()
  let navigate = useNavigate()
  const [language, setLanguage] = useState('en-US')
  const [state, setState] = useState({collapse: true, fadeIn: true, timeout: 300})
  const [, setDisable] = useState(true)
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
     console.log('module_>>>>', module_)
  if (module_ === '11111' || module_ === 11111) return <Login/>
  let title_ = company??''.concat(' / ').concat(t(module_.title))
  const initialState:ITransaction = initLtr [0]//module_.state
  const initialLine:ILineTransaction = initLtr [0].lines[0]
  const current_:ITransaction = initialState
     console.log('current_>>>>', current_)
  const [current, setCurrent] = useState<ITransaction>(current_)
  const [currentLineTransaction, setCurrentLineTransaction] = useState<ILineTransaction>(initialLine)
  const [iwsState, setIwsState] = useState(iwsStore.initialState)
  const [title, setTitle] = useState(title_)
  const toggle = () => setState({...state, collapse: !state.collapse})
     const handleLanguageChange = (event:any) => {
         event.preventDefault()
         const value = event.target.value
         setLanguage(value)
         i18n.changeLanguage(value)
     }

     console.log('current>>>>', current)
  const modelid = module_ ? module_.modelid : 1111
  const acc_modelid = formEnum.ACCOUNT
  const art_modelid = formEnum.ARTICLE
  const vat_modelid = formEnum.VAT
  const store_modelid = formEnum.STORE
  const sup_modelid = formEnum.SUPPLIER
  const cust_modelid = formEnum.CUSTOMER
  const module_modelid = formEnum.MODULE
  const fmodule_modelid = formEnum.FMODULE
  const modifyUrl = selected
  let ctx = `${module_.ctx}/${modelid}/${company}`
  console.log('ctxctxctx>>>>', ctx)
  const art_ctx = `${MASTERFILE.article}/${art_modelid}/${company}`
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const vat_ctx = `${MASTERFILE.vat}/${vat_modelid}/${company}`
  const store_ctx = `${MASTERFILE.store}/${store_modelid}/${company}`
  const sup_ctx = `${MASTERFILE.sup}/${sup_modelid}/${company}`
  const cust_ctx = `${MASTERFILE.cust}/${cust_modelid}/${company}`
  const module_ctx = `${MASTERFILE.module}/${module_modelid}/${company}`
  const fmodule_ctx = `${MASTERFILE.fmodule}/${fmodule_modelid}/${company}`
  const [rows, ] = useState<bigint[]>([])
  const [rowData, setRowData] = useState<ITransaction[]>([])
  const [storeData, setStoreData] = useState<IStore[]>([])
   const [, setAccData] = useState<IAccount[]>([])
  const [articleData, setArticleData] = useState<IArticle[]>([])
  const [vatData, setVatData] = useState<IVat[]>([])
  const [, setCustData] = useState<ICustomer[]>([])
  const [, setSupData] = useState<ISupplier[]>([])
  const [partnerData, setPartnerData] = useState<ICustomer[]|ISupplier[]>(initCust)
  const [, setModule] = useState<IModule[]>([])
  const [copyFrom, setCopyFRom] = useState<String[]>([])
  const [copyFromTransaction, setCopyFromTransaction] = useState<ITransaction[]>([])
  const [fmodule, setFmodule] = useState<IFmodule[]>([])
  const [model, setModel] = useState<number>(-1)
  const [partnerId, setPartnerId] = useState<number>(-1)
  const [isFetching, setIsFetching] = useState(false)
  const [gridApi,   setGridApi] = useState<GridApi>()
  //const gridRef: React.RefObject<AgGridReact|null> = useRef<AgGridReact>(null)
  const zIndex:number = 99999
  //const [partnerCtx, setPartnerCtx] = useState<string>('')
console.log('rowData', rowData)
  const handleKeyPress = useCallback((event:any) => {
    if (event.ctrlKey && (event.key === 's' || event.key === 'S')) {
      submitEdit(event, )
    } else if (event.ctrlKey && (event.key === 'l' || event.key === 'L')) {
      onNewLine()
    }
  }, [])

  let init = useRef(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!init.current) {
        iwsStore.subscribe(setIwsState)
        init.current = true
        Get(art_ctx, token, art_modelid, setArticleData)
        Get(fmodule_ctx, token, fmodule_modelid, setFmodule)
        Get(acc_ctx, token, acc_modelid, setAccData)
        Get(store_ctx, token, store_modelid, setStoreData)
        Get(vat_ctx, token, vat_modelid, setVatData)
        Get(cust_ctx, token, cust_modelid, setCustData)
        Get(sup_ctx, token, sup_modelid, setSupData)
        Get(module_ctx, token, fmodule_modelid, setModule)
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress)
    }
    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [partnerId, copyFrom, current])


  const handleModuleChange = (value:any) => {
    //event?.preventDefault()
      console.log('handleModuleChange', value)
    setModel(value)
    const mx:IFmodule = fmodule.find((m:IFmodule) => m.id === value) ?? initfModule[0]
    title_ = mx?.name ? mx.name : title_
      const copyFromIds = mx? mx.copyFrom:''
    setTitle(company??''.concat(' / ').concat(title_))
    setCopyFRom([copyFromIds])
    setPartnerId(parseInt(mx.account))
    setCurrent(current_)
    ctx = `${module_.ctx}/${mx.id}/${company}`
    const ctx_copyFrom = `${module_.ctx}/${copyFromIds}/${company}`
      console.log('ctx_copyFrom', ctx_copyFrom)
    const _partnerCtx:string = parseInt(mx.account)===formEnum.CUSTOMER?MASTERFILE.cust:
                              (parseInt(mx.account)==formEnum.SUPPLIER)?MASTERFILE.sup:''
    const partnerCtx = `${_partnerCtx}/${parseInt(mx.account)}/${company}`
    Get(ctx_copyFrom, token, parseInt(copyFromIds), setCopyFromTransaction)
    submitQuery( ctx, partnerCtx, parseInt(mx.account))
    //setCurrent(current_)
  }

  // const callEdit = (editedRow: ITransaction, setCurrent:(arg:ITransaction)=>void) => {
  //   const isArray = Array.isArray(editedRow) && editedRow.length > 0
  //   const row = isArray ? editedRow[0] : editedRow
  //   if (row) {
  //     const data = iwsState.get(row.modelid)
  //     const record = data.find((obj:ITransaction) => obj.id === row.id)
  //     setCurrent({...record, editing: true})
  //   }
  // }
     function buildPostCall(rows: BigInt[], current: ITransaction, modifyUrl: string, token: string, setCurrent: (arg: ITransaction) => void) {
         const ids = rows.length > 0 ? rows : [current.id]
         const url_ = `${modifyUrl}/post/${ids.join(',')}/${current.modelid}/${current.company}`
         console.log('current', current)
         console.log('Posting to the URL', url_)
         Get2(url_, token, setCurrent)
     }

  const callSubmitPost = (event:any, modifyUrl:string, token:string, current:ITransaction
      , setCurrent:(arg:ITransaction )=>void,  rows:BigInt[]):void => {
    event.preventDefault()
      buildPostCall(rows, current, modifyUrl, token, setCurrent)
  }
  //const edit = (editedRow: ITransaction) => callEdit(editedRow, setCurrent)
  const submitPost = (event:any) => callSubmitPost(event, module_.ctx, token, current, setCurrent, rows)
  //const submitCopy = (event:any) => callSubmitCopy(event, ctx, token, rows)
 //const submitPostAll = (event:any) => callSubmitCopy(event, ctx, token, rows)
 //  const submitPostAll = ( event:any, ids:BigInt[]) => {
 //      event.preventDefault()
 //      buildPostCall(ids, current, modifyUrl, token, setCurrent)
 //  }
  const submitAdd = (event:any) => {
    event.preventDefault()
    const row: ITransaction = { ...current, modelid: model, company: company}
      console.log('row', row)
    Add(modifyUrl, token, row, rowData, setCurrent)
  }
     const addLine = useCallback(
         ( line:ILineTransaction, setCurrent:(arg:ITransaction) =>void) => {
             const dx: ITransaction = {...current}
             const newLine = {...line, id: BigInt(-1), transid: current.id1}
             dx.lines.push(newLine)
             gridApi!.applyTransaction({add: [newLine]})
             setCurrent(dx)
         },
         [current],
     )

     const onRemoveSelectedLine = useCallback(
         ( event:any, current:ITransaction, setCurrent:(arg:ITransaction) =>void) => {
             event.preventDefault()
             const dx: ITransaction = {...current}
            if(!dx.hasOwnProperty('lines')) dx['lines']=[]
             const idx = dx.lines.findIndex((obj: ILineTransaction) => obj.id === currentLineTransaction.id)
             if (idx >= 0) dx.lines[idx] = {...currentLineTransaction, transid: BigInt(-2)}
             gridApi!.applyTransaction({remove: [currentLineTransaction]})
             setCurrent(dx)
     }, [currentLineTransaction]);

  const callSubmitEdit = (event:any, modifyUrl:string, token:string, current:ITransaction
      , setCurrent:(arg:ITransaction)=>void, data:ITransaction[], submitAdd: (arg:any)=>void) => {
      console.log('event...', event);
      event.preventDefault();
      (BigInt(current.id) > 0) ? Edit(modifyUrl, token, current, data, setCurrent) : submitAdd(event)
  }
  const submitCancel = (event:any) =>  callSubmitCancel(event, ctx, token, current, setCurrent, rowData )
  const callSubmitCancel = (event:any, _ctx:string, token:string, current:ITransaction
      , setCurrent:(arg:ITransaction)=>void, data:ITransaction[],) => {
    event.preventDefault()
    const url_ = _ctx.replace('ltr', 'cancelnLtr')
    BigInt(current.id )> 0 ? Edit(url_, token, current, data, setCurrent) : current
  }
  const onNewLine = () => addLine (initialState.lines[0],  setCurrent)
  const onDeleteLine = (event:any) => {
      onRemoveSelectedLine (event, current,  setCurrent);
      console.log('current>>>>', current);
      (BigInt(current.id) > 0) ? Edit(modifyUrl, token, current, rowData, setCurrent) : void(0) //submitAdd(current)
  }
  const submitEdit = (event:any) =>
      callSubmitEdit(event, modifyUrl, token, current, setCurrent, rowData, submitAdd)
  //const submitCancel = (event) => {}
      //callSubmitCancel(event, ctx, token, current, setCurrent, data)

  const cancelEdit = () => initAdd()
  const initAdd = () => {
    setDisable(false)
    const newRow = {...initialState, company: company, currency: currency, editing: false}
    EditRow(newRow, true, setCurrent)
  }
     const copyCall = (id:BigInt) => {
         setDisable(false)
         const idx = copyFromTransaction.findIndex((obj: ITransaction) => obj.id === id)
         console.log('idx', idx)
         if (idx >= 0) {
             const tr = copyFromTransaction.find((obj: ITransaction) => obj.id === id) ?? current_
             const linesx = tr.lines.map((line) => {
                 return {...line, id: BigInt(-1), transid: current_.id1}
             })
             const newRow = {
                 ...tr, id: current_.id, id1: current_.id1, modelid: model, company: company
                 , currency: currency, posted: false, editing: false, lines: linesx
             }
             Add(modifyUrl, token, newRow, rowData, setCurrent)
         }
     }
  const reload = () => {
    iwsStore.deleteKey(current.modelid)
    Get(ctx, token, current.modelid, setRowData)
    setCurrent(current_)
  }

  const submitQuery = (ctx:string, partnerCtx:string, partnerModelid:number) => {
    //event?.preventDefault()
      console.log('submitQuery', ctx)
    console.log('partnerCtx', partnerCtx)
    console.log('partnerModelid', partnerModelid)
    setIsFetching(true)
    !iwsState.get(fmodule_modelid)&&Get(fmodule_ctx, token, fmodule_modelid, setFmodule)
    !iwsState.get(acc_modelid)&&Get(acc_ctx, token, acc_modelid, setAccData)
    !iwsState.get(art_modelid)&&Get(art_ctx, token, art_modelid, setArticleData)
    !iwsState.get(store_modelid)&&Get(store_ctx, token, store_modelid, setStoreData)
    !iwsState.get(vat_modelid)&&Get(vat_ctx, token, vat_modelid, setVatData)
    !iwsState.get(partnerModelid)&&Get(partnerCtx, token, partnerModelid, setPartnerData)
    Get(ctx, token, modelid, setRowData)
    setIsFetching(false)
    console.log('PartnerData', partnerData)
    console.log('PartnerData', iwsState.get(partnerModelid))
  }

     const onRowSelected = (event: RowSelectedEvent) => {
      console.log('onRowSelected', event.data)
         setCurrent(event.data)
     }

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
  const maxHeight =700
  const minPadding=20
  const maxPadding =35
  const saveProps:SaveProps = { 'fileName':"~/Download/MYSavedData.xlsx", 'sheetName':"Sheet1", 'data':current.lines }
  const fmoduleData= (fmodule ??[]).filter((m: IFmodule) => m.parent === TRANSACTION.id)
  //const getPartnerData =(partnerModelid:number) => iwsState.get(partnerModelid)
   console.log('PartnerData', partnerData)
   console.log('PartnerData', iwsState.get(partnerId))
    return isFetching?<CSpinner color="primary" />:(<>
            <FinancialsFormHead
                title={title}
                saveProps={saveProps}
                collapse={state.collapse}
                initAdd={initAdd}
                cancelEdit={cancelEdit}
                submitEdit={submitEdit}
                submitCancel={submitCancel}
                onNewLine={onNewLine}
                onDeleteLine={onDeleteLine}
                submitPost={submitPost}
                //submitPostAll={submitPostAll}
                reload={reload}
                logout={logout}
                navigate={navigate}
                language={language}
                handleLanguageChange={handleLanguageChange}
                dispatch={dispatch}
                toggle={toggle}
                current={current}
        />
        <Grid container style={{...STYLES.inner}} maximize direction="row" zeroMinWidth>
          <TransactionMainForm collapse={state.collapse} current={current??current_} setCurrent={setCurrent}
                               t={t} accData={iwsState.get(partnerId)??[initCust]}
                               storeData={storeData} modules={fmoduleData}
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
                                        currentLineTransaction ={currentLineTransaction}
                                        setCurrentLineTransaction={setCurrentLineTransaction}
                                        articleData={articleData} vatData={vatData}  t={t}
                                        onGridReady={onGridReady}  zIndex={2}/>
          </Grid>
          <Grid container
              // @ts-ignore
                style={{...stylesx.outer,  height:state.collapse?minHeight:maxHeight
                    , paddingLeft: 10, paddingRight:5, paddingTop:state.collapse?minPadding:maxPadding, width: '100%'
                    , zIndex:1}} maximize
                direction="column">
            <TransactionGrid
                // @ts-ignore
                gridOptions ={gridOptions}  columnDefs={transactionColumnDefs(t)} onRowSelected={onRowSelected} rowData={rowData}/>
          </Grid>
        </Grid>
     {/*</Grid>*/}
    </>)
}
export default TransactionForm

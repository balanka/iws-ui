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
import {initCust, initLtr, TRANSACTION} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'

import {
  ICustomer,
  IFinancials, IFmodule,
  ILineFinancials,
  ILineTransaction, ISupplier,
  ITransaction,
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
   const [{selected, t, toggle, state, module_ }] = useForm()
   const dispatch = useDispatch()
  let navigate = useNavigate()
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const initialState:ITransaction = initLtr [0]
  const initialLine:ILineTransaction = initLtr [0].lines[0]
  const current_:ITransaction = initialState
   const [currentLine, setCurrentLine] = useState<ILineTransaction>(initialLine)
   const  [{  language, isFetching, storeData, articleData, fmodule, rowData
    , setRowData, vatData,  current, setCurrent, initAdd, reload, submitEdit, copyFromTransaction
    , handleModuleChange, onRowSelected, onNewLine, handleLanguageChange
     , onDeleteLine, submitCancel, submitPost, copyCall, setGridApi, templateName, zIndex, saveProps, partnerId, title}] =
     useTransactionForm(current_, initialLine, currentLine)

  const [iwsState, setIwsState] = useState(iwsStore.initialState)
   const fmoduleData= (fmodule ??[]).filter((m: IFmodule) => m.parent === TRANSACTION.id)


   useEffect(() => {
     iwsStore.subscribe(setIwsState)
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
  const ccData:ICustomer[]|ISupplier[] = iwsState.get(partnerId)??[initCust]
   const accData:ICustomer[]|ISupplier[] = ccData//.filter(m=>!m.id.toString().includes('*'))
   const stData = storeData.filter(m=>!m.id.toString().includes('*'))
   console.log('stData>>>', stData)
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
                current={current}
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
                                        articleData={articleData??[]} vatData={vatData??[]}  t={t}
                                        onGridReady={onGridReady}  zIndex={2}/>
          </Grid>
          <Grid container
              // @ts-ignore
                style={{...stylesx.outer,  height:state.collapse?minHeight:maxHeight
                    , paddingLeft: 10, paddingRight:5, paddingTop:state.collapse?minPadding:maxPadding, width: '100%'
                    , zIndex:1}} maximize
                direction="column">
            <TransactionGrid gridOptions ={gridOptions}  columnDefs={transactionColumnDefs(t)}
                             onRowSelected={onRowSelected} rowData={rowData}/>
          </Grid>
        </Grid>
    </>)
}
export default TransactionForm

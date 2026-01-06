import React, {useEffect, useState} from 'react'
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  SelectEditorModule,
} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
import {styles as stylesx} from './BasicTreeTableProps.tsx'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {FinancialsFormHead, FinancialsMainForm} from './FormsProps.tsx'
import {FINANCIALS, initAcc, initfModule, initFtr, MASTERFILE} from './Menu.tsx'
import {formEnum} from '../utils/FormEnum.tsx'
import {IAccount, IFinancials, IFmodule, ILineFinancials, IMasterfile, ITransaction,} from '../Models.ts'
import {TransactionGrid} from '../IWSGrid.tsx'
import {financialsColumnDefs} from '../ColumnsDefs.ts'
import {logout} from '../utils/FormUtils.tsx'
import Login from './Login'
import {CSpinner} from '@coreui/react'
import {FinancialsDetailsTabs} from './FinancialsDetailsTabs.tsx'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {generateDocx} from "../utils/XlsUtils.ts";
import useTransactionForm from "./UseTransactionForm.ts";
  import useForm from "./UseForm.ts";
import iwsStore from "../utils/Store.tsx";
import {Get, Get3} from "./CrudController.ts";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, SelectEditorModule,])

const STYLES = {
    inner: {
        borderRadius: 5,
        boxShadow: '0 20px 50px #BBF',
        padding: 1,
        //paddingLeft: 5,
        //paddingRight: 5,
        //height: 350,
        //paddingTop:10,
    }
}

const FinancialsForm = () => {
  const [{ profile, menu, selected, t }] = useForm()
    const { token, company} = profile
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const [state, setState] = useState({collapse: true, fadeIn: true, timeout: 300})
    let module_:any = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
    module_ =  module_ ?? formEnum.LOGIN
    if (module_ === '11111' || module_ === 11111) return <Login/>
    let title_ = `${company} /${t(module_.title)}`
    console.log('current_?>>>>>', initFtr)
    const current_: IFinancials = initFtr [0]
  const initialLine:ILineFinancials = initFtr [0].lines[0]
  const [currentLine, setCurrentLine] = useState<ILineFinancials>(initialLine)
  const  [{  language, isFetching, fmodule, rowData
    , setRowData,  current, setCurrent, initAdd, reload, submitEdit, copyFromTransaction, setCopyFromTransaction
    , handleLanguageChange, onRowSelected, onNewLine
    , onDeleteLine, submitCancel, submitPost, copyCall, setGridApi, templateName, zIndex, saveProps, modelid}] =
    useTransactionForm(current_, initialLine, currentLine)
    console.log('current_?>>>>>', current_)
    const [_, setIwsState] = useState(iwsStore.initialState)
    const [title, setTitle] = useState(title_)
    //const [selectedIds, setSelectedIds] = useState<Number[]>([])
    const toggle = () => setState({...state, collapse: !state.collapse})
    const acc_modelid = formEnum.ACCOUNT
    const cc_modelid = formEnum.COSTCENTER
    let ctx = `${module_.ctx}/${modelid}/${company}`
    const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
    const cc_ctx = `${MASTERFILE.masterfile}/${cc_modelid}/${company}`
    const [accData, setAccData] = useState<IAccount[]>(initAcc)
    const [ccData, setCcData] = useState<IMasterfile[]>([])
    //const [copyFrom, setCopyFrom] = useState<number[]>([])
    //const [isFetching, setIsFetching] = useState(false)

    const handleModuleChange = (value:any) => {
        //setModel(value)
        const mx:IFmodule = fmodule.find((m:IFmodule) => m.id === value) ?? initfModule[0]
        title_ = mx?.name ? mx.name : title_
        console.log('title_', title_)
        title_ = `${company}/${title_}`
        const copyFromIds = mx? mx.copyFrom:-1
        setTitle(title_)
        //setCopyFrom([copyFromIds])
        setCurrent(current_)
        console.log('mx', mx)
        ctx = `${module_.ctx}/${mx.id}/${company}`
        console.log('ctx', ctx)
        const ctx_copyFrom = `${module_.ctx}/${copyFromIds}/${company}`
        Get(ctx_copyFrom, token, copyFromIds, setCopyFromTransaction)
        submitQuery(ctx)
    }

       useEffect(() => {
         iwsStore.subscribe(setIwsState)
          Get(acc_ctx, token, acc_modelid, setAccData)
          Get(cc_ctx, token, cc_modelid, setCcData)
         setCurrent(current_)
         setRowData([])
       }, [selected])

    const submitQuery = (ctx:string, event?:any) => {
        event?.preventDefault()
        //setIsFetching(true)
        !accData&&Get(acc_ctx,  token, acc_modelid, setAccData)
        !ccData&&Get(cc_ctx, token, cc_modelid, setCcData)
        Get3(ctx, token, modelid, setRowData, setCurrent)
        //setIsFetching(false)
    }

    const fmoduleData = (fmodule ?? []).filter((m: IFmodule) => m.parent === FINANCIALS.id)
    const gridOptions: GridOptions<IFinancials> = {
        rowStyle: { background: 'lightBlue' },
        // @ts-ignore
        getRowStyle: (params: { node: { rowIndex: number} }) => {
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
        //pivotMode: true,
        //sideBar: true,
        rowHeight: 20,
        rowSelection: {
            mode: "multiRow",
        },
        enableClickSelection: true,
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
        //columnDefs: financialsColumnDefs(t),
        // @ts-ignore
        // detailCellRendererParams: {
        //     detailGridOptions: {
        //         getRowStyle: (params: { node: { rowIndex: number} }) => {
        //             if (params.node.rowIndex % 2 === 0) {
        //                 return { background: '#fff9e6' }
        //             }
        //         },
        //         columnDefs:LinesFinancialsColumns(t),
        //         defaultColDef: {
        //             flex: 1,
        //         },
        //     },
        //     getDetailRowData: (params:any) => {
        //         params.successCallback(params.data.lines);
        //     },
        // } as IDetailCellRendererParams<IFinancials, ILineFinancials>,
        //onFirstDataRendered: onFirstDataRendered,
    }
    const minHeight=300
    const maxHeight =650
    const minPadding=0
    const maxPadding=40
    const onGridReady = (params: GridReadyEvent) => setGridApi(params.api)
    const buildTotal =(current:ITransaction|IFinancials) => {
      //@ts-ignore
      const trans:IFinancials  = current
       return trans?.lines?.reduce((acc: number, line: ILineFinancials) => acc + line.amount, 0.0)
     }
    const formatLines = (line:ILineFinancials):ILineFinancials =>  {
        return  { ...line
          // @ts-ignore
        , amount:Number(line.amount).toFixed(2)}
        }

    const getData:()=>any = ()=>  {
       return {
           ...current
          , transdate: current.transdate
          , total: Number(buildTotal(current)).toFixed(2)
          , lines: current.lines.map(formatLines)
       }
     }
    return isFetching?<CSpinner color="primary" />:(<>
        <FinancialsFormHead
            title={title}
            saveProps={saveProps}
            collapse={state.collapse}
            initAdd={initAdd}
            submitEdit={submitEdit}
            templateName={templateName}
            getData={getData}
            submitPrintPreview={generateDocx}
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
            current={current}
            //zIndex={zIndex-1}
        />
        <Grid container style={{...STYLES.inner}} maximize direction="row" zeroMinWidth>
            <FinancialsMainForm collapse ={state.collapse}
                                 current={current}
                                 setCurrent={setCurrent}
                                 accData={accData}
                                 storeData={ccData}
                                 modules={fmoduleData}
                                 copyFromTransaction={copyFromTransaction}
                                 handleModuleChange={handleModuleChange}
                                 submitCopy={copyCall}
                                 t={t} height ={20}
                                 zIndex={zIndex-2}/>
            <Grid container
                // @ts-ignore
                  style={{...stylesx.outer, display: !state.collapse?'none':'', width: '100%', height: 165
                      , padding: 0, paddingTop: 3, zIndex:4}} maximize direction="column" zeroMinWidth>
                <FinancialsDetailsTabs  transaction={current}  setTransaction={setCurrent}
                                        currentLineFinancials ={currentLine}
                                        setCurrentLineFinancials={setCurrentLine}
                                        accData={accData??[]}  t={t}  onGridReady={onGridReady} zIndex={2}/>
            </Grid>
            <Grid container
                // @ts-ignore
                  style={{...stylesx.outer, height:state.collapse?minHeight:maxHeight
                      , paddingTop:state.collapse?minPadding:maxPadding, width: '100%'
                      , zIndex: 1}} maximize direction="column">
                <TransactionGrid
                    // @ts-ignore
                    gridOptions ={gridOptions} columnDefs={financialsColumnDefs(t)}
                                 onRowSelected={onRowSelected} rowData={rowData}/>
            </Grid>
        </Grid>
    </>)
}
export default FinancialsForm

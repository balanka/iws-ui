import React, {useState, useCallback, useEffect, useRef} from 'react'
import { AllCommunityModule
    , ClientSideRowModelModule
    ,  GridApi
    , GridReadyEvent
    , ModuleRegistry
    , SelectEditorModule
    , GridOptions,
} from 'ag-grid-community'
// import {AllCommunityModule //, MasterDetailModule
//     , GridApi
//     //, GridReadyEvent
//     , IDetailCellRendererParams,
//     //ModuleRegistry,
//     SelectEditorModule,
//    // GridOptions
// } from 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
import {styles as stylesx} from './BasicTreeTableProps.tsx'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {FinancialsFormHead, FinancialsMainForm} from './FormsProps.tsx'
import {Add, Edit, EditRow, Get, Get2} from './CrudController.ts'
import {FINANCIALS, initAcc, initfModule, initFtr, initLineFinancials,  MASTERFILE, useStore} from './Menu.tsx'
import iwsStore from '../utils/Store.tsx'
import { useTranslation } from 'react-i18next'
import { formEnum } from '../utils/FormEnum.tsx'
import {
    IAccount,
    IEditing,
    IFinancials,
    IFmodule,
    ILineFinancials,
    IMasterfile,
    IModule,
} from '../Models.ts'
import {TransactionGrid} from '../IWSGrid.tsx'
import { financialsColumnDefs} from '../ColumnsDefs.ts'
import {callSubmitEdit, toggleEdit, logout} from './TransactionLib.ts'
import Login from './Login'
import {CSpinner} from '@coreui/react'
import {FinancialsDetailsTabs} from './FinancialsDetailsTabs.tsx'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {SaveProps} from "../Props.ts";
ModuleRegistry.registerModules([
    AllCommunityModule,
    ClientSideRowModelModule,
    SelectEditorModule,
    //RichSelectModule,
    //MasterDetailModule,
])

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
    const {profile, menu, selected} = useStore()
    const {t, i18n} = useTranslation()
    const {token, company, currency} = profile
    let navigate = useNavigate()
    //i18n.changeLanguage('de-DE');
    const dispatch = useDispatch()
    const [language, setLanguage] = useState('en-US')
    const [state, setState] = useState({collapse: true, fadeIn: true, timeout: 300})
    const [, setDisable] = useState(true)
    let module_:any = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
    //module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
    module_ =  module_ ?? formEnum.LOGIN
    if (module_ === '11111' || module_ === 11111) return <Login/>
    let title_ = company??''.concat(' / ').concat(t(module_.title))
    const modifyUrl = selected
    console.log('current_?>>>>>', initFtr)
    const current_: IFinancials = initFtr [0]
    const initialLine: ILineFinancials = initLineFinancials
    console.log('current_?>>>>>', current_)
    const [current, setCurrent] = useState<IFinancials>(current_)
    const [currentLineFinancials, setCurrentLineFinancials] = useState<ILineFinancials>(initialLine)
    const [iwsState, setIwsState] = useState(iwsStore.initialState)
    const [title, setTitle] = useState(title_)
    const toggle = () => setState({...state, collapse: !state.collapse})
    const handleLanguageChange = (event:any) => {
        event.preventDefault()
        const value = event.target.value
        setLanguage(value)
        i18n.changeLanguage(value)
    }
    const modelid = module_ ? module_.modelid : 1111
    const acc_modelid = formEnum.ACCOUNT
    const cc_modelid = formEnum.COSTCENTER
    const module_modelid = formEnum.MODULE
    const fmodule_modelid = formEnum.FMODULE
    const zIndex:number = 99999
    let ctx = `${module_.ctx}/${modelid}/${company}`
    const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
    const cc_ctx = `${MASTERFILE.masterfile}/${cc_modelid}/${company}`
    const module_ctx = `${MASTERFILE.module}/${module_modelid}/${company}`
    const fmodule_ctx = `${MASTERFILE.fmodule}/${fmodule_modelid}/${company}`
    //const [rows,] = useState<bigint[]>([])
    const [rowData, setRowData] = useState<IFinancials[]>([])
    const [accData, setAccData] = useState<IAccount[]>(initAcc)
    const [ccData, setCcData] = useState<IMasterfile[]>([])
    const [, setModule] = useState<IModule[]>([])
    const [fmodule, setFmodule] = useState<IFmodule[]>([])
    const [model, setModel] = useState<number>(-1)
    const [copyFrom, setCopyFRom] = useState<String[]>([])
    const [copyFromTransaction, setCopyFromTransaction] = useState<IFinancials[]>([])
    const [isFetching, setIsFetching] = useState(false)
    const [gridApi, setGridApi] = useState<GridApi>()

  //const  getTransdate = ()  => {
    //console.log('getTransdate called')
    const input = document.getElementById("transdateid");
    console.log('input', input)
    input?.addEventListener("keyup", logKey)
    var x: string[] = []
    let transdate = new Date()
    function logKey(e: any) {
      console.log('e.key', e.key)
      if (e.key === 'Enter') {
        const v= x.join("")
         x=[]
        console.log('valueX', v)
        transdate = new Date(v)
        console.log('transdate', transdate)
      } else {
        x.push(e.key)
      }
    }
  //  return transdate
  //}

  // const  getTransdate = ()  => {
  //   console.log('getTransdate called')
  //   const input = document.getElementById("transdateid");
  //   console.log('input', input)
  //   input?.addEventListener("keyup", logKey)
  //   var x: string[] = []
  //   let transdate:string = new Date().toISOString()
  //   function logKey(e: any) {
  //     if (e.key === 'Enter') {
  //       const v= x.join("")
  //       console.log('valueX', v)
  //       transdate = v
  //     } else {
  //       x.push(e.key)
  //     }
  //   }
  //   return transdate
  // }

    const handleKeyPress = useCallback((event: any) => {
        if (event.ctrlKey && (event.key === 's' || event.key === 'S')) {
            submitEdit(event)
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
            setIsFetching(true)
            Get(fmodule_ctx, token, fmodule_modelid, setFmodule)
            Get(acc_ctx, token, acc_modelid, setAccData)
            Get(cc_ctx, token, cc_modelid, setCcData)
            Get(module_ctx, token, fmodule_modelid, setModule)
            setIsFetching(false)
            document.addEventListener('keydown', handleKeyPress)
        }
        // remove the event listener
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [isFetching, copyFrom, setIsFetching])

    const handleModuleChange = (value:any) => {
        //event?.preventDefault()
        console.log('handleModuleChange', value)
        setModel(value)
        const mx:IFmodule = fmodule.find((m:IFmodule) => m.id === value) ?? initfModule[0]
        title_ = mx?.name ? mx.name : title_
        const copyFromIds = mx? mx.copyFrom:''
        setTitle(company??''.concat(' / ').concat(title_))
        setCopyFRom([copyFromIds])
        setCurrent(current_)
        console.log('mx', mx)
        ctx = `${module_.ctx}/${mx.id}/${company}`
        console.log('ctx', ctx)
        const ctx_copyFrom = `${module_.ctx}/${copyFromIds}/${company}`
        Get(ctx_copyFrom, token, parseInt(copyFromIds), setCopyFromTransaction)
        submitQuery(ctx)
    }



    // const callEdit = (editedRow:IFinancials, setCurrent:(set:IFinancials)=>void) => {
    //   const isArray = Array.isArray(editedRow) && editedRow.length > 0
    //   const row = isArray ? editedRow[0] : editedRow
    //   if (row) {
    //     const data = iwsState.get(row.modelid)
    //     const record = data.find((obj:IFinancials) => obj.id === row.id)
    //     setCurrent({ ...record, editing: true })
    //   }
    // }
    //    const addLine = useCallback(
    //        ( line:ILineTransaction, setCurrent:(arg:ITransaction) =>void) => {
    //            const dx: ITransaction = {...current}
    //            const newLine = {...line, id: BigInt(-1), transid: current.id1}
    //            dx.lines.push(newLine)
    //            gridApi!.applyTransaction({add: [newLine]})
    //            setCurrent(dx)
    //        },
    //        [current],
    //    )
    console.log('current>>>>>', current)
    const addLine = useCallback(
        ( line:ILineFinancials, setCurrent:(arg:IFinancials) =>void) => {
            const dx: IFinancials = {...current}
            const dxLines: ILineFinancials[] =dx.lines??[]
            console.log('dx.lines', dx.lines)
            console.log('dx.lines', dxLines)
            const newLine = {...line, id: BigInt(-1), transid: current.id1}
            dx.lines=[...dxLines]
            dx.lines.push(newLine)
            console.log('dx', dx)
            gridApi!.applyTransaction({add: [newLine]})
            setCurrent(dx)
        },
        [current],
    )

    const onRemoveSelectedLine = useCallback(
        ( event:any, current:IFinancials, setCurrent:(arg:IFinancials) =>void) => {
            event.preventDefault()
            const dx: IFinancials = {...current}
            if(!dx.hasOwnProperty('lines')) dx['lines']=[]
            const idx = dx?.lines.findIndex((obj: ILineFinancials) => obj.id === currentLineFinancials.id)
            if (idx >= 0) dx.lines[idx] = {...currentLineFinancials, transid: BigInt(-2)}
            gridApi!.applyTransaction({remove: [currentLineFinancials]})!;
            setCurrent(dx)
        }, [currentLineFinancials]);
    const onNewLine = () => addLine (initialLine,  setCurrent)
    const onDeleteLine = (event:any) => {
        onRemoveSelectedLine (event, current,  setCurrent);
        console.log('current>>>>', current);
        (BigInt(current.id) > 0) ? Edit(modifyUrl, token, current, rowData, setCurrent) : void(0) //submitAdd(current)
    }
    const callSubmitCancel = (event:any, modifyUrl:string, token:string
        , current:IFinancials, setCurrent:(set:IFinancials)=>void, data:IFinancials[]) => {
        event.preventDefault()
        toggleEdit(current)
        const url_ = modifyUrl.replace('ltr', 'cancelnLtr')
        // eslint-disable-next-line no-unused-expressions
        BigInt(current.id) > 0 ? Edit(url_, token, current, data, setCurrent) : current
    }
    const callSubmitPost = (event:any, url:string, token:string
        , setCurrent:(arg:IFinancials)=>void):void => {
        event.preventDefault()
        Get2(url, token, setCurrent)
    }
    //const edit = (editedRow:IFinancials) => callEdit(editedRow, setCurrent)

    const submitPost = (event:any) => {
        //const ids = rows.length > 0 ? rows.map((c) => c.id) : [current.id]
        const ids = [current.id]
        const url = `${module_.ctx}/post/${ids}/${current.modelid}/${current.company}`
        callSubmitPost(event, url, token, setCurrent)
    }

    const copyCall = (id:BigInt) => {
        setDisable(false)
        const idx = copyFromTransaction.findIndex((obj: IFinancials) => obj.id === id)
        console.log('idx', idx)
        if (idx >= 0) {
            const tr = copyFromTransaction.find((obj: IFinancials) => obj.id === id)?? current_
            const linesx = tr.lines.map((line) =>  {
                return {...line, id:BigInt(-1), transid: current_.id1}})
            const newRow = {...tr,  id: current_.id, id1:current_.id1, modelid:model, company: company
                , currency: currency, posted:false, editing: false, lines:linesx}
            console.log('newRow', newRow)
            Add(modifyUrl, token, newRow, rowData, setCurrent)
        }
    }
   // const submitCopy = (event:any) => callSubmitCopy(event, ctx, token, rows)
    const submitAdd = (event:any) => {
        event.preventDefault()
        const row:IFinancials = {...current, modelid: model, company: company}
        Add(module_.ctx, token, row, rowData, setCurrent)
    }
    const submitEdit = (event:any) =>
        // @ts-ignore
        callSubmitEdit(event, modifyUrl, token, current, setCurrent, rowData, submitAdd)
    //callSubmitEdit(event, ctx, token, current, setCurrent, data, submitAdd)
    const submitCancel = (event:any) =>
        callSubmitCancel(event, ctx, token, current, setCurrent, rowData)

    const cancelEdit = () => initAdd()
    const initAdd = () => {
        setDisable(false)
        const newRow:IFinancials&IEditing = { ...initFtr[0], company: company, editing: false }
        EditRow(newRow, true, setCurrent)
    }

    const reload = () => {
        iwsStore.deleteKey(current.modelid)
        Get(ctx, token, current.modelid, setRowData)
        setCurrent(current_)
    }
    const submitQuery = (ctx:string, event?:any) => {
        event?.preventDefault()
        setIsFetching(true)
        !iwsState.get(fmodule_modelid)&&Get(fmodule_ctx, token, fmodule_modelid, setFmodule)
        !iwsState.get(acc_modelid)&&Get(acc_ctx,  token, acc_modelid, setAccData)
        !iwsState.get(cc_modelid)&&Get(cc_ctx, token, cc_modelid, setCcData)
        Get(ctx, token, modelid, setRowData)
        setIsFetching(false)
    }

    const onRowSelected = (event: RowSelectedEvent) => setCurrent(event.data)

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

    const saveProps:SaveProps= { 'fileName':"~/Download/FinancialsData.xlsx", 'sheetName':"Sheet1", 'data':current.lines }
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
                                 //getTransdate ={getTransdate}
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
                                        currentLineFinancials ={currentLineFinancials}
                                        setCurrentLineFinancials={setCurrentLineFinancials}
                                        accData={accData}  t={t}  onGridReady={onGridReady} zIndex={2}/>
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

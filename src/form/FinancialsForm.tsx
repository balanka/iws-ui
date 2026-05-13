import { useEffect, useState} from 'react'
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
import {styles as stylesx} from './BasicTreeTableProps.tsx'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { FinancialsMainForm } from './FinancialsMainForm'
import {FinancialsFormHead} from './FinancialsFormHead.tsx'
import {FINANCIALS, initAcc, initfModule, initFtr, initLineFinancials, MASTERFILE} from './Menu.tsx'
import {formEnum} from '../utils/FormEnum.tsx'
import {IAccount, IFinancials, IFmodule, ILineFinancials, IMasterfile, ITransaction,} from '../Models.ts'
import {LineTFinancialsGrid, TransactionGrid} from '../IWSGrid.tsx'
import {financialsColumnDefs, LinesFinancialsColumns} from '../ColumnsDefs.ts'
import {logout} from '../utils/FormUtils.tsx'
import Login from './Login'
import {CSpinner} from '@coreui/react'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {generateDocx} from '../utils/XlsUtils.ts'
import useTransactionForm from './UseTransactionForm.ts'
import useForm from './UseForm.ts'
import iwsStore from '../utils/Store.tsx'
import { Get, Get3} from './CrudController.ts'
import {isArrayAndNotEmpty} from "../utils/Utils.ts";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, SelectEditorModule,])

const FinancialsForm = () => {
  const [{ profile, selected, t, toggle, toggleTable, state, visible, module_ }] = useForm()
  const { token, currency, company, locale} = profile
  console.log('profile', profile)
  let navigate = useNavigate()
  const dispatch = useDispatch()
  if (module_ === '11111' || module_ === 11111) return <Login/>
  let title_ = `${company} /${t(module_.title)}`
  const current_: IFinancials = {...initFtr [0], company:company}
  const initialLine:ILineFinancials = {...initLineFinancials, currency:currency??'', company:`-${company}`}
  const [currentLine, setCurrentLine] = useState<ILineFinancials>(initialLine)
  const [rowData, setRowData] = useState<IFinancials[]>([])
  const  [{  language, fmodule, current, setCurrent, initAdd, reload, submitEdit, onRowSelected, onNewLine, copyFromTransaction
    , setCopyFromTransaction, onDeleteLine, submitCancel, submitPost, copyCall, setGridApi, templateName, zIndex
    , handleLanguageChange, setModel, saveProps, modelid, isFetching, setIsFetching }] =
    useTransactionForm(current_, initialLine, currentLine, setCurrentLine, rowData, setRowData)

  const [_, setIwsState] = useState(iwsStore.initialState)
  const [title, setTitle] = useState(title_)
  const acc_modelid = formEnum.ACCOUNT
  const cc_modelid = formEnum.COSTCENTER
  let ctx = `${module_.ctx}/${modelid}/${company}`
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const cc_ctx = `${MASTERFILE.masterfile}/${cc_modelid}/${company}`
  const [accData, setAccData] = useState<IAccount[]>(initAcc)
  const [ccData, setCcData] = useState<IMasterfile[]>([])
  const [accFilter, setAccFilter] = useState<string[]>([])
  const [oaccFilter, setOAccFilter] = useState<string[]>([])

  const handleModuleChange = (value:any) => {
    setModel(value)
    const mx:IFmodule = fmodule.find((m:IFmodule) => m.id === value) ?? initfModule[0]
    title_ = mx?.name ? mx.name : title_
    title_ = `${company}/${title_}`
    const copyFromIds = (mx? mx.copyFrom:'-1').split(',')
    console.log('copyFromIds', copyFromIds)
    setTitle(title_)
    setCurrent(current_)
    setAccFilter(mx.accFilter?.replace(/\s/g,'').split(','))
    setOAccFilter(mx.oaccFilter?.replace(/\s/g,'').split(','))
    const modelidx = parseInt(mx.id.toString()??0)
    setModel(modelidx)
    ctx = `${module_.ctx}/${modelidx}/${company}`
    const ctx_copyFrom = `${module_.ctx}/n/${company}/${copyFromIds}`
    const idx= copyFromIds.map((i)=>
      parseInt(i)).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    Get(ctx_copyFrom, token, idx, setCopyFromTransaction)
    submitQuery(ctx)
    const currentx = rowData.filter(m=>m.modelid===current_.modelid).length>0?rowData[0]:current_
    setCurrent( {...currentx, modelid:modelidx})

  }

  useEffect(() => {
    iwsStore.subscribe(setIwsState)
    Get(acc_ctx, token, acc_modelid, setAccData)
    Get(cc_ctx, token, cc_modelid, setCcData)
    //setCurrent(current_)
    setRowData([])
  }, [selected])


  console.log('AccData>>>>>>', accData)
  const submitQuery = (ctx:string, event?:any) => {
    event?.preventDefault()
    setIsFetching(true)
    !accData&&Get(acc_ctx,  token, acc_modelid, setAccData)
    !ccData&&Get(cc_ctx, token, cc_modelid, setCcData)
    Get3(ctx, token, modelid, current_, setRowData, setCurrent)
    setIsFetching(false)
  }
  const onRowSelectedL = (event: RowSelectedEvent) => {
     console.log('event.data', event)
    let line:ILineFinancials= isArrayAndNotEmpty(event.data) ?event.data[0]:event.data
    const  linex:ILineFinancials=line??initialLine
    //!current.hasOwnProperty('lines')?[{...currentLine, transid:current?.id}]:current.lines
    setCurrentLine(linex)


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
  }
  const minHeight=300
  const maxHeight =650
  const minPadding=0
  const maxPadding=40
  const height = 30
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
  console.log('current #E9EFEC #e9ecef #cfdce5 #cfdce5  #F3F0F3 #E3DAF6 #FDF8FD #BDBABD  #D5D3D5 #F1ECFA', current)
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
      toggleTable={toggleTable}
      current={current}
      t={t}
      zIndex={zIndex-1}
    />

    <div  style={{...stylesx.outer, height:650, boxShadow: '0 20px 50px #BBF', padding: 1, paddingBottom:2, backgroundColor: '#E3F1C5'}} >
      <FinancialsMainForm collapse ={state.collapse}
                          current={current??current_}
                          setCurrent={setCurrent}
                          accData={accData}
                          storeData={ccData}
                          modules={fmoduleData}
                          copyFromTransaction={copyFromTransaction}
                          handleModuleChange={handleModuleChange}
                          submitCopy={copyCall}
                          accountFilter={accFilter}
                          oaccountFilter={oaccFilter}
                          currentLineFinancials ={currentLine??initialLine}
                          setCurrentLineFinancials={setCurrentLine}
                          t={t} height ={height}
                          zIndex={zIndex-2}
                          locale={locale??'fr-GN'}
                          currency={currency??'GNF'}
      />
      <div
        // @ts-ignore
            style={{...stylesx.outer, display: !state.collapse?'none':'', width: '100%', height: 160
              , padding: 2, paddingTop: 3, zIndex:4}}>
        <LineTFinancialsGrid
          // @ts-ignore
          theme="legacy" columnDefs={LinesFinancialsColumns(t)} onRowSelected={onRowSelectedL}
          onGridReady={onGridReady}  rowData={!current.hasOwnProperty('lines')?[{...currentLine
          , transid:current?.id}]:current.lines} pagination={false} />
      </div>
      <div
        // @ts-ignore
            style={{...stylesx.outer, height:state.collapse?minHeight:maxHeight, padding: 2
              , paddingTop:state.collapse?minPadding:maxPadding, width: '100%', zIndex: 1, display:visible?'':'none'}}
            maximize direction="column">
        <TransactionGrid
          // @ts-ignore
          gridOptions ={gridOptions} columnDefs={financialsColumnDefs(t)}
          onRowSelected={onRowSelected} rowData={rowData}/>
      </div>
    </div>
  </>)
}
export default FinancialsForm

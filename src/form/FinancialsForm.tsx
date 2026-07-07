import { useEffect, useState} from 'react'
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  GridReadyEvent,
  ModuleRegistry,
  SelectEditorModule,
} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import {styles, styles as stylesx} from './BasicTreeTableProps.tsx'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { FinancialsMainForm } from './FinancialsMainForm'
import {FinancialsFormHead} from './FinancialsFormHead.tsx'
import {
  FINANCIALS,
  initAcc, initContact,
  initfModule,
  initFtr,
  initLineFinancials,
  initReminderBalance,
  MASTERFILE
} from './Menu.tsx'
import {formEnum} from '../utils/FormEnum.tsx'
import {
  IAccount, IContact,
  IFinancials,
  IFmodule,
  ILineFinancials,
  IMasterfile,
  ITransaction,
  ReminderBalance,
} from '../Models.ts'
import {LineTFinancialsGrid, TransactionGrid} from '../IWSGrid.tsx'
import {financialsColumnDefs, LinesFinancialsColumns} from '../ColumnsDefs.ts'
import {isLoaded, logout} from '../utils/FormUtils.tsx'
import Login from './Login'
import {CSpinner} from '@coreui/react-pro'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { capitalizeFirst, generateDocx} from '../utils/XlsUtils.ts'
import useTransactionForm from './UseTransactionForm.ts'
import useForm from './UseForm.ts'
import {Get, Get3, GetListData} from './CrudController.ts'
import {isArrayAndNotEmpty} from "../utils/Utils.ts";
import {toCardinal} from "n2words/fr-FR";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, SelectEditorModule,])

const FinancialsForm = () => {
  const [{ profile, selected, t, toggle, toggleTable, state, visible, module_ }] = useForm()
  const { token, currency, company, locale} = profile
  let navigate = useNavigate()
  const dispatch = useDispatch()
  if (module_ === '11111' || module_ === 11111) return <Login/>
  let title_ = `${company} /${t(module_.title)}`
  const current_: IFinancials = {...initFtr, company:company}
  const initialLine:ILineFinancials = {...initLineFinancials, currency:currency??'', company:`-${company}`}
  const [currentLine, setCurrentLine] = useState<ILineFinancials>(initialLine)
  const [rowData, setRowData] = useState<IFinancials[]>([])
  const [model, setModel] = useState<number>(-1)
  const  [{  language, fmodule, current, setCurrent, initAdd, reload, submitEdit, onRowSelected, onNewLine, copyFromTransaction
    , setCopyFromTransaction, onDeleteLine, submitCancel, submitPost, copyCall, setGridApi, templateName, zIndex
    , handleLanguageChange, saveProps, modelid, isFetching, setIsFetching, gridOptions }] =
    useTransactionForm(current_, initialLine, currentLine, setCurrentLine, rowData, setRowData, model)
  const [title, setTitle] = useState(title_)
  const acc_modelid = formEnum.ACCOUNT
  const cc_modelid = formEnum.COSTCENTER
  const contact_modelid = formEnum.CONTACT
  let ctx = `${module_.ctx}/${modelid}/${company}`
  const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
  const cc_ctx = `${MASTERFILE.masterfile}/${cc_modelid}/${company}`
  const contact_ctx = `${MASTERFILE.contact}/${contact_modelid}/${company}`
  const [accData, setAccData] = useState<IAccount[]>([initAcc])
  const [ccData, setCcData] = useState<IMasterfile[]>([])
  const [contactData, setContactData] = useState<IContact[]>([])
  const [accFilter, setAccFilter] = useState<string[]>([])
  const [oaccFilter, setOAccFilter] = useState<string[]>([])
  const [reminderBalance, setReminderBalance] = useState<ReminderBalance[]>([initReminderBalance])

  const handleModuleChange = (value:any) => {
    setModel(value)
    const mx:IFmodule = fmodule.find((m:IFmodule) => m.id === value) ?? initfModule
    title_ = mx?.name ? mx.name : title_
    title_ = `${company}/${title_}`
    const copyFromIds = (mx? mx.copyFrom:'-1').replace(/\s/g,'').split(',')
    console.log('copyFromIds', copyFromIds)
    setTitle(title_)
    setCurrent(current_)
    setAccFilter(mx.accFilter?.replace(/\s/g,'').split(','))
    setOAccFilter(mx.oaccFilter?.replace(/\s/g,'').split(','))
    const modelidx = parseInt(value) //parseInt(mx.id.toString()??0)
    //setModel(modelidx)
    ctx = `${module_.ctx}/${modelidx}/${company}`
    const ctx_copyFrom = `${module_.ctx}/n/${company}/${copyFromIds}`
    const idx= copyFromIds.map((i)=>
      parseInt(i)).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    console.log('idx>>>>', idx)
    Get(ctx_copyFrom, token, idx, setCopyFromTransaction)
    submitQuery(ctx)
    const currentx = rowData?.filter(m=>m.modelid===current_.modelid).length>0?rowData[0]:current_
    setCurrent( {...currentx, modelid:modelidx})
  }
  useEffect(() => {
    Promise.all([
      !isLoaded(acc_modelid)&&Get(acc_ctx, token, acc_modelid, setAccData),
      !isLoaded(cc_modelid)&& Get(cc_ctx, token, cc_modelid, setCcData),
      !isLoaded(contact_modelid)&& Get(contact_ctx, token, contact_modelid, setContactData)
    ]).then(() => {
      console.log('All data fetched successfully');
      // additional logic after all requests complete
    }).catch(error => {
        console.error('Error fetching data', error);
      });
  },[selected])

  const submitQuery = (ctx:string, event?:any) => {
    event?.preventDefault()
    setIsFetching(true)
    Promise.all([
      !isLoaded(acc_modelid)&&Get(acc_ctx, token, acc_modelid, setAccData),
      !isLoaded(cc_modelid)&& Get(cc_ctx, token, cc_modelid, setCcData),
      !isLoaded(modelid)&& Get3(ctx, token, modelid, current_, setRowData, setCurrent)
    ]).then(() => {
      console.log('All data fetched successfully');
      // additional logic after all requests complete
    }).catch(error => {
        console.error('Error fetching data', error);
      });

    setIsFetching(false)
  }
  const onRowSelectedL = (event: RowSelectedEvent) => {
     console.log('event.data', event)
    let line:ILineFinancials= isArrayAndNotEmpty(event.data) ?event.data[0]:event.data
    const  linex:ILineFinancials=line??initialLine
    setCurrentLine({...linex})
  }

  const fmoduleData = (fmodule ?? []).filter((m: IFmodule) => m.parent === FINANCIALS.id)
  const minHeight=300
  const maxHeight =650
  //const minPadding=0
  //const maxPadding=2
  const height = 30
  const onGridReady = (params: GridReadyEvent) => setGridApi(params.api)
  const buildTotal =(current:ITransaction|IFinancials) => {
    //@ts-ignore
    const trans:IFinancials  = current
    return trans?.lines?.reduce((acc: number, line: ILineFinancials) => acc + line.amount, 0.0)
  }
  const formatLines = (line:ILineFinancials) =>  {
    return  { ...line, amount:line.amount.toLocaleString(locale,  { style: "currency", currency: currency })
    }
  }

  const getData:()=>any = ()=>  {
    return {
      ...current
      , date: new Date().toLocaleDateString(locale, {day:"numeric", month: "long", year: "numeric"})
      , transdate: current.transdate
      , total: buildTotal(current).toLocaleString(locale,  { style: "currency", currency: currency })
      , lines: current.lines.map(formatLines)
    }
  }
   const getMonth =(d:ReminderBalance) => {
     const month = new Date(Number(d.period.toString().substring(0, 4))
       , Number(d.period.toString().substring(4, 6))-1
       , 5, 0, 0, 0, 0).toLocaleDateString(locale, {month: 'long'})
     return capitalizeFirst (month)
   }

    const getData2 =  async (): Promise<{"id": string, "lines":any[]}>=> {
      const ctx = `${module_.ctx}/balance/${current.account}/${company}`;
      const data  =  await GetListData<any>(ctx, token, formEnum.REMINDER_BALANCE);
      const contact = contactData.find(m=>m.id===current.contact)??initContact
      const total =Number(data.reduce((acc: number, line: ReminderBalance) => acc + line.balance, 0.0))
      setReminderBalance(data);
      const result = {
        id: data[data.length - 1].id,
        name:contact.name,
        date: new Date().toLocaleDateString(locale, {day:"numeric", month: "long", year: "numeric"}),
        month: getMonth(data[data.length - 1]),
        year: Number(`${data[data.length - 1].period}`.substring(0, 4)),
        total:total.toLocaleString(locale,  { style: "currency", currency: currency }),
        totalText:toCardinal(total).split(" ").map(capitalizeFirst).join(" "),
        lines: data.map((d: ReminderBalance) => ({
          id: d.id,
          month: getMonth(d),
          year: Number(`${d.period}`.substring(0, 4)),
          balance: Number(d.balance).toLocaleString(locale,  { style: "currency", currency: currency })
        }))
      }
      console.log('reminderBalance', reminderBalance)
      console.log('fresh reminderBalance', result)
      return result
    };

  //console.log('current #E9EFEC #e9ecef #cfdce5 #cfdce5  #F3F0F3 #E3DAF6 #FDF8FD #BDBABD  #D5D3D5 #F1ECFA', current)
  return isFetching?<CSpinner color="primary" />:(<>
    <FinancialsFormHead
      title={title}
      saveProps={saveProps}
      collapse={state.collapse}
      initAdd={initAdd}
      submitEdit={submitEdit}
      templateName={templateName}
      getData={getData}
      getData2={getData2}
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
    {/*<div  style={{...stylesx.outer, height:650, boxShadow: '0 20px 50px #BBF', padding: 1, paddingBottom:2, backgroundColor: '#E3F1C5'}} >*/}
    <div
      //@ts-ignore
      style={{ ...styles.outer,   width:'100%', height: 365,  display: !state.collapse ? 'none' : ''}}>
      <FinancialsMainForm collapse ={state.collapse}
                          current={current??current_}
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
                          currentLineFinancials ={currentLine??initialLine}
                          setCurrentLineFinancials={setCurrentLine}
                          t={t} height ={height}
                          zIndex={zIndex-2}
                          locale={locale??'fr-GN'}
                          currency={currency??'GNF'}/>
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
    </div>
    <div
        // @ts-ignore
            style={{...stylesx.outer, height:state.collapse?minHeight:maxHeight, padding: 2
              //, paddingTop:state.collapse?minPadding:maxPadding
              , width: '100%', zIndex: 1, display:visible?'':'none'}}
            maximize direction="column">
        <TransactionGrid
          // @ts-ignore
          gridOptions ={gridOptions (financialsColumnDefs, LinesFinancialsColumns, t)}
          onRowSelected={onRowSelected} rowData={rowData}/>
    </div>
  </>)
}
export default FinancialsForm

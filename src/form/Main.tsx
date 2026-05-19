import  {useMemo, useEffect, useState } from 'react'
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  themeQuartz,
  //CsvExportModule,
} from 'ag-grid-community'
import { TreeDataModule } from "ag-grid-enterprise"
import {MASTERFILE, PACB_JOURNAL_QUERY_PARM } from './Menu.tsx'
import Login from './Login'
import {logout} from '../utils/FormUtils.tsx'
import {AgGridReact} from 'ag-grid-react'
import {JournalProps} from '../Props.ts'
import { IAccount, IAccount2 } from '../Models'
import { JournalMainForm } from './JournalMainForm'
import { BalanceSheetHead } from './BalanceSheetHead'
import useForm from './UseForm.ts'
import { formEnum } from "../utils/FormEnum.tsx"
import { Get } from "./CrudController.ts"
import { useDispatch } from "react-redux"
import {BalanceSheetColDef} from '../ColumnsDefs.ts'
import {TFunction} from "i18next";


ModuleRegistry.registerModules([ClientSideRowModelModule, TreeDataModule]);

const gridOptions = (t:TFunction<'transalation', undefined>)  => useMemo(()=> ({

  rowStyle: {background: 'lightBlue'},
  getRowStyle: (params:any)=> (params.node.rowIndex % 2 === 0)? {
      //color:'black',
      padding: 0.5,
      height: 3,
      fontsize: 10,
      backgroundColor: '#fff9e6', //'#EEEE'
    }
    : {
      color: 'black',
      //color:'#eee',
      padding: 0.5,
      height: 3,
      fontsize: 10,
      //backgroundColor:'#fff9e6'
    },
  columnDefs: BalanceSheetColDef(t),

  defaultColDef: {
    flex: 1,
  },
  autoGroupColumnDef: {
    headerName: "Name",
    field: "name",
    flex: 2,
    cellRendererParams: {
      suppressCount: true,
    },
  },
  //rowData: accData,
  getRowId: (params:any) => params.data.id, // This is required

  treeDataParentIdField: "account",
  groupDefaultExpanded: -1, // expand all groups by default
  paginationPageSizeSelector: [50, 100],
  pagination: true,
  paginationPageSize: 50,
}), [t])
const myTheme = themeQuartz.withParams({
  /* Low spacing = very compact */
  spacing: 2,
  /* Changes the color of the grid text */
  foregroundColor: 'rgb(126, 46, 132)',// '#8CBACC80', // 'rgb(14, 68, 145)',
  /* Changes the color of the grid background */
  backgroundColor: 'rgb(249, 245, 227)', //'rgb(241, 247, 255)',

  oddRowBackgroundColor: 'rgba(120, 255, 0, 0.5)',
  //oddRowBackgroundColor: '#fff9e6', //'rgb(0, 0, 0, 0.03)',

  selectedRowBackgroundColor: 'rgba(0, 255, 0, 0.1)',
  /* Changes the header color of the top row */
  headerBackgroundColor: 'rgb(228, 237, 250)',


  /* Changes the hover color of the row*/
  rowHoverColor: 'rgb(216, 226, 255)',
  dataFontSize: 12,
  //fontSize: 10,
})

const STYLES = {
  outer: {
    //backgroundColor: blue[100],
    borderRadius:1,
    boxShadow: '0 10px 30px #BBB',
    padding: 2,
    //paddingTop: 15,
  },
  inner: {
    borderRadius: 5,
    boxShadow: '0 20px 50px #BBF',
    padding: 10,
    paddingTop:5,
    // paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 3,
  },
  inner2: {
    borderRadius: 5,
    boxShadow: '0 20px 50px #BBF',
    paddingTop: 5,
    paddingLeft: 1,
    paddingRight: 2,
  },
}
export const Main = () => {
  const [{profile, selected, t, module_}] = useForm()
  const {token, currency, company} = profile
  //const init = useRef(false)

  if (module_ === '11111' || module_ === 11111) return <Login />
    const height = 25
    const modelid :number = module_? module_.modelid:1111
    const current_ = {...PACB_JOURNAL_QUERY_PARM, modelid:modelid, currency:currency??''}
    const [current, setCurrent] = useState<JournalProps>(current_)
    const [accData, setAccData] = useState <IAccount[]>([])
    const [rowData, setRowData] = useState <IAccount[]>([])
    const dispatch = useDispatch()
    const acc_modelid = formEnum.ACCOUNT
    const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
    const title = company?.concat(' / ').concat(t(module_.title))

    const buildUrl0 = () => `${module_.ctx}/${company}/${current.account}/${current.toPeriod}`
    const load = (event:any) => {
      event.preventDefault()
      Get(buildUrl0(), token, modelid, setRowData)
    }
    useEffect(() => {
      acc_ctx && Get(acc_ctx, token, acc_modelid, setAccData)
      setCurrent(current_)
    }, [selected])


    const formatIt= (d:IAccount2) => {
      const balance= Number((d.isDebit?(d.idebit+d.debit-d.icredit-d.credit):
      (d.icredit+d.credit-d.idebit-d.debit)).toFixed(2))
      console.log('balance', balance)
      return {...d,  idebit:Number(d.idebit.toFixed(2))
      , icredit:Number(d.icredit.toFixed(2))
      , debit:Number(d.debit.toFixed(2))
      , credit:Number(d.credit.toFixed(2))
      , bdebit:Number((d.idebit+d.debit).toFixed(2))
      , bcredit:Number((d.icredit+d.credit).toFixed(2))
      , balance:balance
    }
    }
    const v:IAccount2[] = rowData.map((d:IAccount)=> {
      const {subAccounts: _, ...newObj} = d
      return  formatIt( {...newObj})
    })

    //console.log('rowDatav', v)
    //const getDataPath = useCallback((data: any) => data.account, [])
    return (
    <div style={{...STYLES.inner}}>
      <BalanceSheetHead style={{...STYLES.inner2}}
                        title={title} submitQuery={load} dispatch={dispatch}
                        logout={logout} t={t}
        //@ts-ignore
                        templateFileName={""}/>
      <JournalMainForm current={current} setCurrent={setCurrent} t={t} accData={accData} height={height-5}
        //@ts-ignore
                       stylesx={{height: 950, paddingBottom: 5, width: '100%'}} ids={['3310', "1100"]}/>
      <div style={{paddingLeft: 1, paddingRight: 1, paddingTop: 20, height: 600, width: '100%'}}>
      {/*<div*/}
      {/*  //@ts-ignore*/}
      {/*  style={{...STYLES.outer, height: 600, width: "100%", paddingTop: 20}}>*/}
        <AgGridReact theme={myTheme}
                     treeData={true}
                      //@ts-ignore
                     gridOptions={gridOptions(t)} rowData={v}/>
      </div>
    </div>
    )
    }

    export default Main


import  {useCallback, useEffect, useRef, useState } from 'react'
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
import {styles as stylesx} from './BasicTreeTableProps.tsx'
import {AgGridReact} from 'ag-grid-react'
import {JournalProps} from '../Props.ts'
import { IAccount, IAccount2 } from '../Models'
import { JournalMainForm } from './JournalMainForm'
import { BalanceSheetHead } from './BalanceSheetHead'
import useForm from './UseForm.ts'
import { formEnum } from "../utils/FormEnum.tsx"
import { Get } from "./CrudController.ts"
import iwsStore from "../utils/Store.tsx"
import { useDispatch } from "react-redux"

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    TreeDataModule,
    //CsvExportModule,
]);

const  myTheme = themeQuartz.withParams({
    /* Low spacing = very compact */
    spacing: 2,
    /* Changes the color of the grid text */
    foregroundColor:'rgb(126, 46, 132)',// '#8CBACC80', // 'rgb(14, 68, 145)',
    /* Changes the color of the grid background */
    backgroundColor: 'rgb(249, 245, 227)', //'rgb(241, 247, 255)',

    oddRowBackgroundColor: 'rgba(120, 255, 0, 0.5)',
    //oddRowBackgroundColor: '#fff9e6', //'rgb(0, 0, 0, 0.03)',

    selectedRowBackgroundColor: 'rgba(0, 255, 0, 0.1)',
    /* Changes the header color of the top row */
    headerBackgroundColor: 'rgb(228, 237, 250)',


    /* Changes the hover color of the row*/
    rowHoverColor: 'rgb(216, 226, 255)',
    dataFontSize:12,
    //fontSize: 10,
});

const STYLES = {
    inner: {
        borderRadius: 5,
        boxShadow: '0 20px 50px #BBF',
        padding: 10,
        paddingTop: 30,
        // paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 3,
    },
    inner2: {
        borderRadius: 5,
        boxShadow: '0 20px 50px #BBF',
        paddingTop:5,
        paddingLeft: 1,
        paddingRight: 2,
    },
}
export const Main  = () => {
  const [{profile, selected, t,  module_ }] = useForm()
  const {token, currency, company} = profile
  const init = useRef(false)

    if (module_ === '11111' || module_ === 11111) return <Login / >
        const height = 20
        const modelid :number = module_? module_.modelid:1111
        const current_ = {...PACB_JOURNAL_QUERY_PARM, modelid:modelid, currency:currency??''}
        const [current, setCurrent] = useState<JournalProps>(current_)
        const [, setIwsState] = useState(iwsStore.initialState)
        const [accData, setAccData] = useState <IAccount []>([])
        const [rowData, setRowData] = useState <IAccount []>([])
        const dispatch = useDispatch()
        const acc_modelid = formEnum.ACCOUNT
        const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
        const title = company?.concat(' / ').concat(t(module_.title))

        const gridOptions = ()=>  {
        return {
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
         //columnDefs: BalanceSheetColDef(t),

          columnDefs: [
          {
              field: 'init Balance',
              headerName: t('common.report'),
              cellStyle: {textAlign: 'center'},
                children: [
                  {
                    headerName: t('common.idebit'),
                    //aggFunc: "sum",
                    field: "idebit",
                    flex: 1,
                    cellStyle: {textAlign: 'right'},
                    cellRenderer: (params:any) => params.data.idebit.toFixed(2)
                  },
                  {
                    headerName: t('common.icredit'),
                    //aggFunc: "sum",
                    field: "icredit",
                    flex: 1,
                    cellStyle: {textAlign: 'right'},
                    cellRenderer: (params:any) => params.data.icredit.toFixed(2)
                  },
                ],
          },
          {
            field: 'Transaction',
            headerName: t('common.transactions'),
            cellStyle: {textAlign: 'center'},
            children: [
              {
                headerName: t('common.debit'),
                //aggFunc: "sum",
                field: "debit",
                flex: 1,
                cellStyle: {textAlign: 'right'},
                cellRenderer: (params:any) =>params.data.debit.toFixed(2)
              },
              {
                headerName: t('common.credit'),
                //aggFunc: "sum",
                field: "credit",
                flex: 1,
                cellStyle: {textAlign: 'right'},
                cellRenderer: (params:any) => params.data.credit.toFixed(2)
              },
            ],
          },
          {
            field: 'balance',
            headerName: t('common.balance'),
            cellStyle: {textAlign: 'center'},
              children: [
                {
                  headerName: t('common.debit'),
                  //aggFunc: "sum",
                  field: "bdebit",
                  flex: 1,
                  cellStyle: {textAlign: 'right'},
                  cellRenderer: (params:any) => params.data.bdebit.toFixed(2)
                },
                {
                  headerName: t('common.credit'),
                  //aggFunc: "sum",
                  field: "bcredit",
                  flex: 1,
                  cellStyle: {textAlign: 'right'},
                  cellRenderer: (params:any) =>params.data.bcredit.toFixed(2)
                },
                {
                  headerName: t('common.balance'),
                  //aggFunc: "sum",
                  field: "balance",
                  flex: 1,
                  cellStyle: {textAlign: 'right'},
                  //valueFormatter: currencyFormatter,
                  //valueParser: currencyParser,
                  cellRenderer: (params:any) => params.data.balance.toFixed(2)
                },
              ],
          },
        ],
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
        treeData: true, // enable Tree Data mode
        treeDataParentIdField: "account",
        groupDefaultExpanded: -1, // expand all groups by default
        paginationPageSizeSelector: [50, 100],
        pagination: true,
        paginationPageSize: 50,
      }
      }
      const buildUrl0 = () => `${module_.ctx}/${company}/${current.account}/${current.toPeriod}`
      //const buildUrl = () => `${module_.ctx}/${company}/${current.account}/${current.fromPeriod}/${current.toPeriod}`
      const load = (event:any) => {
        event.preventDefault()
         Get(buildUrl0(), token, modelid, setRowData)
      }

      useEffect(() => {
        if (!init.current) {
          iwsStore.subscribe(setIwsState)
          init.current = true
        }
        // load account data as they are needed
        acc_ctx && Get(acc_ctx, token, acc_modelid, setAccData)
        setCurrent(current_)
      }, [selected])

      {/*const onGridReady = (params: GridReadyEvent) =>   {*/}
      {/*  console.log('onGridReady', params)*/}
      {/*  setGridApi(params.api)*/}
      {/*}*/}
      {/*const onBtExport = ()=> gridApi!.exportDataAsExcel()*/}

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
         const { subAccounts: _, ...newObj } = d
         return  formatIt( {...newObj})
      })

      console.log('rowDatav', v)
      const getDataPath = useCallback((data: any) => data.account, [])
    return (
        <div  style={{...STYLES.inner}}>
            <BalanceSheetHead style={{...STYLES.inner2}} title={title} submitQuery={load} dispatch={dispatch}
                logout={logout}  t={t}
                    //@ts-ignore
                    templateFileName={""}/>
            <JournalMainForm current={current} setCurrent={setCurrent} t={t} accData={accData} height={height}
                   //@ts-ignore
                      stylesx={{height: 950, paddingBottom: 5}} ids={['3310', "1100"]}/>
            <div
                  //@ts-ignore
                  style={{...stylesx.outer, height:600, width:"100%", paddingTop: 10}}>
               <AgGridReact theme = {myTheme}
                            treeData: true
                            getDataPath={getDataPath}
                          //@ts-ignore
                            gridOptions = {gridOptions()} rowData ={v}/>
            </div>
       </div>
   )
}

export  default Main



// import React, {
//     useCallback,
//     useMemo,
//     useRef,
//     useState,
//     StrictMode,
// } from 'react'
import React, {useState, useEffect} from 'react'
import {
    ClientSideRowModelModule,
    GridOptions,
    ModuleRegistry,
     themeQuartz,
} from "ag-grid-community";
import { TreeDataModule } from "ag-grid-enterprise";
import { getData } from "./data";
import {MASTERFILE, PACB_QUERY_PARM, useStore} from "./Menu.tsx";
import {formEnum} from "../utils/FormEnum.tsx";
import Login from "./Login.tsx";
import {logout} from "./TransactionLib.ts";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {JournalFormHead, JournalMainForm} from "./FormsProps.tsx";
import {styles as stylesx} from "./BasicTreeTableProps.tsx";
import Grid from "react-fast-grid";
import {AgGridReact} from "ag-grid-react";
import {Get} from "./CrudController.ts";
import iwsStore from "../utils/Store.tsx";
import {IAccount, IPACBQueryParam, IPeriodicAccountBalance} from "../Models.ts";
import { BalanceSheetColDef } from "../ColumnsDefs.ts";

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    TreeDataModule,
   // ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
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
const Main  = () => {
    const {profile, menu, selected} = useStore()
    const {t,} = useTranslation()
    const {token, company} = profile
    let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
    module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
    if (module_ === '11111' || module_ === 11111) return <Login / >
        const height = 20
        const modelid :number = module_? module_.modelid:1111
        const current_ = {...PACB_QUERY_PARM, modelid:modelid}
        const [current, setCurrent] = useState<IPACBQueryParam>(current_)
        const [, setIwsState] = useState(iwsStore.initialState)
        const [accData, setAccData] = useState<IAccount[]>([])
        const [rowData, setRowData] = useState<IPeriodicAccountBalance[]>([])
        const dispatch = useDispatch()
        const acc_modelid = formEnum.ACCOUNT
        const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
        const title = company?.concat(' / ').concat(t(module_.title))
        //const title = "Balancesheet"
        const gridOptions = {
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
         columnDefs:BalanceSheetColDef(t),
        //     columnDefs: [
        //       {
        //         field: 'init Balance',
        //         headerName: t('common.report'),
        //         cellStyle: {textAlign: 'center'},
        //         children: [
        //             {
        //                 headerName: t('common.idebit'),
        //                 aggFunc: "sum",
        //                 field: "idebit",
        //                 flex: 1,
        //                 cellStyle: {textAlign: 'right'},
        //             },
        //             {
        //                 headerName: t('common.icredit'),
        //                 aggFunc: "sum",
        //                 field: "icredit",
        //                 flex: 1,
        //                 cellStyle: {textAlign: 'right'},
        //             },
        //         ],
        //      },
        //    {
        //      field: 'Transaction',
        //      headerName: t('common.transactions'),
        //      cellStyle: {textAlign: 'center'},
        //       children: [
        //         {
        //         headerName: t('common.debit'),
        //         aggFunc: "sum",
        //         field: "debit",
        //         flex: 1,
        //         cellStyle: {textAlign: 'right'},
        //      },
        //      {
        //         headerName: t('common.credit'),
        //         aggFunc: "sum",
        //         field: "credit",
        //         flex: 1,
        //         cellStyle: {textAlign: 'right'},
        //     },
        //     ]
        //   },
        // ],
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
            rowData: getData(),
            getRowId: (params:any) => {console.log('dataZZZ', accData)
             return params.data.id
            }, // This is required
            treeData: true, // enable Tree Data mode
            treeDataParentIdField: "account",
            groupDefaultExpanded: -1, // expand all groups by default
        }
        const buildUrl = () => `${module_.ctx}/${company}/${current.account}/${current.fromPeriod}/${current.toPeriod}`
        const submitQuery_ = (event:any) => {
            //event.preventDefault()
            accData?.length < 2?
                Get(acc_ctx, token,  acc_modelid, setAccData)
            :   Get(buildUrl(), token,  modelid, setRowData)
       }
        useEffect(() => {
            iwsStore.subscribe(setIwsState)
            Get(acc_ctx, token, acc_modelid, setAccData)
            setCurrent(current_)
        }, [selected])
        console.log('data', accData)
    return (
        <Grid container style={{...STYLES.inner}} maximize direction="row" zeroMinWidth>
            <JournalFormHead style={{...STYLES.inner2}} title={title} submitQuery={submitQuery_} dispatch={dispatch}
                logout={logout}  balancesheet={true} t={t}
                    templateFileName={""} current={accData}/>
            <JournalMainForm current={current} setCurrent={setCurrent} t={t} accData={accData} height={height}
                             stylesx={{height: 950, paddingBottom: 5}} ids={['3310', "1100"]}/>
            <Grid container style={{...stylesx.outer, height:600, width:"100%", paddingTop: 10}} maximize direction="column">
               <AgGridReact gridOptions = {gridOptions} rowData ={accData}/>
            </Grid>
       </Grid>
   )
}
export  default Main



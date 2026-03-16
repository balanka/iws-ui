import {
    AllCommunityModule, CellValueChangedEvent,
    ClientSideRowModelModule, ColDef, GetRowIdParams, GridReadyEvent,
    ModuleRegistry, RowApiModule, themeQuartz,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {RowSelectedEvent, GridOptions} from "ag-grid-community";
// import {
//     //GridOptions,
//     // MasterDetailModule,
//     // ExcelExportModule,
//     // MultiFilterModule,
//     // SetFilterModule,
// } from 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import React, { FC } from 'react'
import {
  IAccount, IArticle, IAsset,
  IBankAccount, IBankStatement,
  ICustomer, IEmployee,
  IFinancials, IJournal,
  ILineFinancials, ILineTransaction,
  IMasterfile, InventoryJournal, IPeriodicAccountBalance2, IRole,
  IStock, IStore, ISupplier,
  ITransaction, IUser, IUserRight,
  IVat
} from './Models.ts'

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
    RowApiModule,
  // ExcelExportModule,
  // SetFilterModule,
  // MultiFilterModule,
  // MasterDetailModule,
]);

//const myTheme = themeQuartz.withParams({
//   backgroundColor: "rgb(249, 245, 227)",
//   foregroundColor: "rgb(126, 46, 132)",
//   headerTextColor: "rgb(204, 245, 172)",
//   headerBackgroundColor: "rgb(209, 64, 129)",
//   oddRowBackgroundColor: "rgb(0, 0, 0, 0.03)",
//   headerColumnResizeHandleColor: "rgb(126, 46, 132)",
// });
export const pacTheme = themeQuartz.withParams({
    /* Low spacing = very compact */
    spacing: 2,
    /* Changes the color of the grid text */
    foregroundColor:'rgb(126, 46, 132)',// '#8CBACC80', // 'rgb(14, 68, 145)',
    /* Changes the color of the grid background */
    backgroundColor: 'rgb(249, 245, 227)', //'rgb(241, 247, 255)',
    oddRowBackgroundColor: 'rgb(0, 0, 0, 0.03)',
    /* Changes the header color of the top row */
    headerBackgroundColor: 'rgb(228, 237, 250)',
    /* Changes the hover color of the row*/
    rowHoverColor: 'rgb(216, 226, 255)',
    dataFontSize:10,
    //fontSize: 10,
});

const  myTheme = themeQuartz.withParams({
    /* Low spacing = very compact */
    spacing: 2,
    /* Changes the color of the grid text */
    foregroundColor:'rgb(126, 46, 132)',// '#8CBACC80', // 'rgb(14, 68, 145)',
    /* Changes the color of the grid background */
    backgroundColor: 'rgb(249, 245, 227)', //'rgb(241, 247, 255)',

    //oddRowBackgroundColor: 'rgba(0, 255, 0, 0.1)',
    oddRowBackgroundColor: 'rgb(0, 0, 0, 0.03)',

    selectedRowBackgroundColor: 'rgba(0, 255, 0, 0.1)',
    /* Changes the header color of the top row */
    headerBackgroundColor: 'rgb(228, 237, 250)',


    /* Changes the hover color of the row*/
    rowHoverColor: 'rgb(216, 226, 255)',
    dataFontSize:12,
    //fontSize: 10,
});
const getGridOptionsL= ( columnDefs:ColDef[], defaultColDef:DefaultColDefType, onRowSelected:(event:RowSelectedEvent) =>void
                         , data?:any, pagination?:boolean ) =>
    ({
        rowStyle: { background: 'lightBlue' },
        getRowStyle: (params: { node: { rowIndex: number; }; }) => {
            if (params.node.rowIndex % 2 === 0) {
                return { background: '#fff9e6' };
            }
        },
        //theme: "legacy",
        theme : myTheme,
        columnDefs,
        rowData:data,
        defaultColDef,
        rowHeight: 20,
        rowSelection: {
            mode: "multiRow",
        },
        onRowSelected:onRowSelected,
        getRowId: (params: GetRowIdParams) => String(params.data.id),
        paginationPageSizeSelector: [5, 10, 20, 50],
        pagination: pagination??true,
        paginationPageSize: 10,
        masterDetail: true,
        detailRowAutoHeight: true,
        editType:'fullRow',
        autoSizeStrategy: {
            type: "fitGridWidth",
        },
        // detailCellRendererParams: {
        //     //refreshStrategy: "everything",
        //     refreshStrategy:'rows'
        // }
    })
export const getGridOptionsBalance= ( columnDefs:ColDef[]
                                      , onRowSelected:(event:RowSelectedEvent) =>void
                                      , rowData:any
                                      //, summaryRow:IPeriodicAccountBalance2[]
                                      ) => {
 //console.log('summaryRow', summaryRow)
  return   ({
        rowStyle: {background: 'lightBlue'},
        getRowStyle: (params: { node: { rowIndex: number } }) => {
           if (params.node.rowIndex % 2 === 0) {
                //  @ts-ignore
                if (params.data.period <= 0) return { background: '#fff9e6', fontWeight:'bold', innerHeight:40}
                return {background: '#fff9e6'};
            }
        },
        //theme: "legacy",
        theme: myTheme,
        columnDefs,
        rowData:rowData,
      defaultColDef: {
          resizable: true,
          editable: false, //!current.posted,
          flex: 1,
          //filter:true,
          //floatingFilter: true,
          //filter: "agTextColumnFilter",
      },
        //defaultColDef,
        rowHeight: 20,
        rowSelection: {
            mode: "multiRow",
        },
        onRowSelected: onRowSelected,
        paginationPageSizeSelector: [5, 10, 20, 40, 60],
        pagination: true,
        paginationPageSize: 20,
        //masterDetail: true,
        // detailRowAutoHeight: true,
        autoSizeStrategy: {
            type: "fitGridWidth",
        },
        //grandTotalRow: "bottom",
        //sideBar: true,
        enableRowPinning: true,
        //detailCellRendererParams,
    })
}
const getGridOptions= ( columnDefs:ColDef[], defaultColDef:DefaultColDefType, onRowSelected:(event:RowSelectedEvent) =>void ) =>
    ({
        rowStyle: { background: 'lightBlue' },
        getRowStyle: (params: { node: { rowIndex: number; }; }) => {
            //console.log('params', params)
            if (params.node.rowIndex % 2 === 0) {
                return { background: '#fff9e6' };
            }//else if(params.data.toPeriod===-1) {}
          // @ts-ignore
          if (params?.data?.period  === 0) {
            return {
              //background: 'black',
              fontSize:12,
              fontWeight:'bold'
            };
          }
        },
        //theme: "legacy",
        theme : myTheme,
        columnDefs,
        //rowData,
        defaultColDef,
        rowHeight: 20,
        rowSelection: {
            mode: "multiRow",
        },
        onRowSelected:onRowSelected,
        paginationPageSizeSelector: [15, 20, 40, 80],
        pagination: true,
        paginationPageSize: 10,
        //masterDetail: true,
        //detailRowAutoHeight: true,
        autoSizeStrategy: {
            type: "fitGridWidth",
        },
        //detailCellRendererParams,
    })

type DefaultColDefType = {
    resizable: boolean
    editable: boolean,
    floatingFilter: boolean,
    filter: boolean,
}
export const defaultColDefX:DefaultColDefType = {
    resizable: true,
    editable: false,
    floatingFilter: false,
    filter:false,
    //sideBar: true,
    //filter: "agTextColumnFilter",
}
interface Props <A>  {
    columnDefs: ColDef[],
    defaultColDef?:ColDef //= {
    //     ...defaultColDefXL,
    //     resizable: true,
    //     editable: true,
    //     floatingFilter: false,
    //     filter:false,
    //     //filter: "agTextColumnFilter",
    // }
    onRowSelected: (event: RowSelectedEvent<A, any>) => void,
    onCellValueChanged?: (event: CellValueChangedEvent<A, any>) => void,
    gridOptions?: GridOptions<A>,
    onGridReady?:(params: GridReadyEvent)=>void,
    rowData: A[],
    gridRef?:React.RefObject<AgGridReact>,
    pagination?:boolean
    autoGroupColumnDef?:any,
    getRowId?: (params:GetRowIdParams<any, any>)=>string|null
    onClick?:(e:any)=>void
}
// const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
export const AccountGrid: FC<Props<IAccount>> = ({ columnDefs, defaultColDef, onRowSelected, rowData, onClick }:Props<IAccount>)=>
    <AgGridReact
        theme = {myTheme} //{theme ?? "legacy"}
        onRowSelected = {onRowSelected}
        // @ts-ignore
        gridOptions ={{...getGridOptions(columnDefs, defaultColDef?? defaultColDefX, onRowSelected), paginationPageSizeSelector: [20, 50, 80,120, 200]}}
        rowData ={rowData}
        resetRowDataOnUpdate ={true}
        onClick={onClick}
    />
export const BankAccountGrid: FC<Props<IBankAccount>> = ({ columnDefs, defaultColDef, onRowSelected, gridOptions, rowData
                                                         , gridRef, onGridReady}:Props<IBankAccount>)=>{
    console.log('rowData', rowData)
   return  <AgGridReact
        ref={gridRef}
        theme = {myTheme} //{theme ?? "legacy"}
        onRowSelected = {onRowSelected}
        // @ts-ignore
        gridOptions ={gridOptions?? getGridOptions(columnDefs, defaultColDef?? defaultColDefX, onRowSelected)}
        rowData ={rowData}
        onGridReady={onGridReady}
        resetRowDataOnUpdate ={true}
    />
}
export const StockGrid: FC<Props<IStock>> = ({ columnDefs, defaultColDef, onRowSelected, gridOptions, rowData }:Props<IStock>)=>
    <AgGridReact
        theme = {myTheme} //{theme ?? "legacy"}
        onRowSelected = {onRowSelected}
        // @ts-ignore
        gridOptions ={gridOptions?? getGridOptions(columnDefs, defaultColDef?? defaultColDefX, onRowSelected) }
        rowData ={rowData}
        resetRowDataOnUpdate ={true}
        style={{'width': '100%'}}
    />
export const ArticleGrid: FC<Props<IArticle>> = ({ columnDefs, defaultColDef, onRowSelected, gridOptions, rowData }:Props<IArticle>)=>
    <AgGridReact
        theme = {pacTheme} //{theme ?? "legacy"}
        onRowSelected = {onRowSelected}
        // @ts-ignore
        gridOptions ={gridOptions?? getGridOptions(columnDefs, defaultColDef?? defaultColDefX, onRowSelected) }
        rowData ={rowData}
        resetRowDataOnUpdate ={true}
    />
export const CustomerGrid: FC<Props<ICustomer|ISupplier|IEmployee>> = ({ columnDefs, defaultColDef, onRowSelected, gridOptions, rowData, onGridReady }:Props<ICustomer|ISupplier|IEmployee>)=>
    <AgGridReact
        theme = {pacTheme} //{theme ?? "legacy"}
        onRowSelected = {onRowSelected}
        // @ts-ignore
        gridOptions ={gridOptions?? getGridOptions(columnDefs, defaultColDef?? defaultColDefX, onRowSelected) }
        rowData ={rowData}
        onGridReady={onGridReady}
        resetRowDataOnUpdate ={true}
    />
export const AssetGrid: FC<Props<IAsset>> = ({ columnDefs, defaultColDef, onRowSelected, gridOptions, rowData }:Props<IAsset>)=>
    <AgGridReact
        theme = {myTheme} //{theme ?? "legacy"}
        onRowSelected = {onRowSelected}
        // @ts-ignore
        gridOptions ={gridOptions?? getGridOptions(columnDefs, defaultColDef?? defaultColDefX, onRowSelected) }
        rowData ={rowData}
        resetRowDataOnUpdate ={true}
    />
export const MasterfileGrid: FC<Props<IMasterfile>> = ({ columnDefs, defaultColDef, onRowSelected, gridOptions, rowData }:Props<IMasterfile>)=>
    <AgGridReact
        theme = {myTheme} //{theme ?? "legacy"}
        onRowSelected = {onRowSelected}
        // @ts-ignore
        gridOptions ={gridOptions?? getGridOptions(columnDefs, defaultColDef?? defaultColDefX, onRowSelected) }
        rowData ={rowData}
        resetRowDataOnUpdate ={true}
        animateRows={false}
    />
export const RoleGrid: FC<Props<IRole>> = ({ columnDefs, defaultColDef, onRowSelected, gridOptions, rowData }:Props<IRole>)=>
    <AgGridReact
        theme = {myTheme} //{theme ?? "legacy"}
        onRowSelected = {onRowSelected}
        // @ts-ignore
        gridOptions ={gridOptions?? getGridOptions(columnDefs, defaultColDef?? defaultColDefX, onRowSelected) }
        rowData ={rowData}
        resetRowDataOnUpdate ={true}
        animateRows={false}
    />
export const RightGrid: FC<Props<IUserRight>> = ({ columnDefs, defaultColDef, onRowSelected, gridOptions, rowData }:Props<IUserRight>)=>
    <AgGridReact
        theme = {myTheme}
        onRowSelected = {onRowSelected}
        // @ts-ignore
        gridOptions ={gridOptions?? getGridOptions(columnDefs, defaultColDef?? defaultColDefX, onRowSelected) }
        rowData ={rowData}
        resetRowDataOnUpdate ={true}
        animateRows={false}
    />
 export const PeriodicAccountBalanceGrid: FC<Props<IPeriodicAccountBalance2>> = ({ columnDefs, defaultColDef
                         , onRowSelected, gridOptions, rowData }:Props<IPeriodicAccountBalance2>) => {
   // @ts-ignore
   const gridOptions_ = {...(gridOptions ?? getGridOptions(columnDefs, defaultColDef ?? defaultColDefX, onRowSelected))
     , paginationPageSize: 20, paginationPageSizeSelector: [20, 50, 80]}
   return (< AgGridReact
   theme = {pacTheme}
   onRowSelected = {onRowSelected}
   // @ts-ignore
   gridOptions = {gridOptions_}
   rowData = {rowData}
   resetRowDataOnUpdate = {true}
   />)
 }
export const JournalGrid: FC<Props<IJournal>> = ({ columnDefs, defaultColDef, onRowSelected, gridOptions, rowData }:Props<IJournal>)=> {
  // @ts-ignore
  const gridOptions_ = {...(gridOptions ?? getGridOptions(columnDefs, defaultColDef ?? defaultColDefX, onRowSelected))
    , paginationPageSize: 20, paginationPageSizeSelector: [30, 50, 80]}
  return (<AgGridReact
    theme={pacTheme}
    onRowSelected={onRowSelected}
    // @ts-ignore
    gridOptions={gridOptions_}
    rowData={rowData}
    //onGridReady={onGridReady}
    resetRowDataOnUpdate={true}
  />)
}
export const InventoryJournalGrid: FC<Props<InventoryJournal>> = ({ columnDefs, defaultColDef, onRowSelected, gridOptions, rowData }:Props<InventoryJournal>)=> {
  // @ts-ignore
  const gridOptions_ = {...(gridOptions ?? getGridOptions(columnDefs, defaultColDef ?? defaultColDefX, onRowSelected))
    , paginationPageSize: 20, paginationPageSizeSelector: [30, 50, 80]}
  return (<AgGridReact
    theme={pacTheme}
    onRowSelected={onRowSelected}
    // @ts-ignore
    gridOptions={gridOptions_}
    rowData={rowData}
    //onGridReady={onGridReady}
    resetRowDataOnUpdate={true}
  />)
}
export const StoreGrid: FC<Props<IStore>> = ({ columnDefs, defaultColDef, onRowSelected, gridOptions, rowData }:Props<IStore>)=>
    <AgGridReact
        theme = {myTheme} //{theme ?? "legacy"}
        onRowSelected = {onRowSelected}
        // @ts-ignore
        gridOptions ={gridOptions?? getGridOptions(columnDefs, defaultColDef?? defaultColDefX, onRowSelected) }
        rowData ={rowData}
        resetRowDataOnUpdate ={true}
    />
export const UserGrid: FC<Props<IUser>> = ({ columnDefs, defaultColDef, onRowSelected, gridOptions, rowData }:Props<IUser>)=>
    <AgGridReact
        theme = {myTheme}
        onRowSelected = {onRowSelected}
        // @ts-ignore
        gridOptions ={gridOptions?? getGridOptions(columnDefs, defaultColDef?? defaultColDefX, onRowSelected) }
        rowData ={rowData}
        resetRowDataOnUpdate ={true}
        animateRows={false}
    />
export const BankStatementGrid: FC<Props<IBankStatement>> = ({ columnDefs, defaultColDef, onRowSelected, gridOptions, rowData }:Props<IBankStatement>)=>
    <AgGridReact
        theme = {myTheme} //{theme ?? "legacy"}
        onRowSelected = {onRowSelected}
        // @ts-ignore
        gridOptions ={gridOptions?? getGridOptions(columnDefs, defaultColDef?? defaultColDefX, onRowSelected) }
        rowData ={rowData}
        resetRowDataOnUpdate ={true}
    />

export const TransactionGrid: FC<Props<ITransaction|IFinancials>> = ({ columnDefs, defaultColDef, onRowSelected, gridOptions, rowData }:Props<ITransaction|IFinancials>)=>
    <AgGridReact
        theme = {myTheme} //{theme ?? "legacy"}
        onRowSelected = {onRowSelected}
        // @ts-ignore
        gridOptions ={gridOptions?? getGridOptions(columnDefs, defaultColDef?? defaultColDefX, onRowSelected) }
        rowData ={rowData}
        columnDefs={columnDefs}
        resetRowDataOnUpdate ={true}
        //rowSelection="multiple"
    />
export const LineTFinancialsGrid: FC<Props<ILineFinancials>> = ({ columnDefs, defaultColDef, onRowSelected, onCellValueChanged, gridOptions
                                                             , rowData, onGridReady, pagination}:Props<ILineFinancials>)=>{

    return (<AgGridReact
        theme = {myTheme} //{theme ?? "legacy"}
        onRowSelected = {onRowSelected}
        onCellValueChanged={onCellValueChanged}
        // @ts-ignore
        gridOptions ={gridOptions?? getGridOptionsL(columnDefs, defaultColDef?? defaultColDefX, onRowSelected, rowData, pagination) }
        rowData ={rowData}
        onGridReady={onGridReady}
        resetRowDataOnUpdate ={true}
    />)
}
export const LineTransactionGrid: FC<Props<ILineTransaction>> = ({ columnDefs, defaultColDef, onRowSelected
                                   , onCellValueChanged , gridOptions, rowData, onGridReady, pagination}:Props<ILineTransaction>)=>{
    //console.log('transaction rowData>>>>>', rowData)
   // let gridApi: GridApi
//onGridReady={onGridReady}
  return (<AgGridReact
        theme = {myTheme} //{theme ?? "legacy"}
        onRowSelected = {onRowSelected}
        onCellValueChanged={onCellValueChanged}
        // @ts-ignore
        gridOptions ={gridOptions?? getGridOptionsL(columnDefs, defaultColDef?? defaultColDefX, onRowSelected, rowData, pagination) }
        rowData ={rowData}
        onGridReady={onGridReady}
        resetRowDataOnUpdate ={true}
    />)
}
export const VatGrid: FC<Props<IVat>> = ({ columnDefs, defaultColDef, onRowSelected, gridOptions, rowData }:Props<IVat>)=>
      <AgGridReact
         theme = {myTheme} //{theme ?? "legacy"}
         onRowSelected = {onRowSelected}
          // @ts-ignore
         gridOptions ={gridOptions?? getGridOptions(columnDefs, defaultColDef?? defaultColDefX, onRowSelected) }
         rowData ={rowData}
         resetRowDataOnUpdate ={true}
      />


// export const BalanceSheetGrid: FC<Props<TreeDataType>> = ({ columnDefs, defaultColDef, rowData
//                                                         , autoGroupColumnDef, getRowId, onRowSelected}:Props<TreeDataType>)=>
// <AgGridReact
//     theme = {myTheme}
//     rowData={rowData}
//     columnDefs={columnDefs}
//     defaultColDef={defaultColDef}
//     autoGroupColumnDef={autoGroupColumnDef}
//     onRowSelected = {onRowSelected}
//     // @ts-ignore
//     getRowId={getRowId}
//     treeData={true}
//     treeDataParentIdField={"parentId"}
//     groupDefaultExpanded={-1}
// />

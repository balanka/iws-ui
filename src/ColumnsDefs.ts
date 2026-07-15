import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  IAccount,
  IArticle,
  IAsset,
  IBankStatement,
  IFinancials, IJournal, ILineFinancials,
  ILineTransaction, InventoryJournal, IPeriodicAccountBalance, IStock,
  IStore,
  ITransaction,
  IUser
} from "./Models.ts";
import {TFunction} from "i18next";
import {AgGridCheckbox, amountFormatter} from "./utils/FormUtils.tsx";
import {dateRenderer, getDateFromString} from './utils/Utils'
import {ColDef, ValueFormatterParams} from "ag-grid-community";
import {initLineFinancials, initLineTransaction} from "./form/Menu.tsx";

export const accountColumnDefs=  (t: (arg0: string) => any):ColDef<IAccount>[] => [
  {
    field: "id",
    headerName: t('common.id'),
    minWidth: 50,
    width: 80,
    filter: "agTextColumnFilter",
  },
  {
    field: "name",
    headerName: t('common.name'),
    minWidth: 180,
    filter: "agTextColumnFilter",
  },
  {
    field: "description",
    headerName: t('common.description'),
    minWidth: 200,
    filter: "agTextColumnFilter",
  },
  {
    field: "account",
    headerName: t('common.account'),
    minWidth: 30,
    filter: "agTextColumnFilter",
  },
  {
    field: "isDebit",
    headerName: t('account.debit_credit'),
    minWidth: 3,
  },
  {
    field: "balancesheet",
    headerName: t('account.balancesheet'),
    minWidth: 3,
  },
  // {
  //   field: "idebit",
  //   headerName: "In. debit",
  //   //cellClass: "number",
  //   //valueFormatter: numberCellFormatter,
  //   valueFormatter: params => params.data.idebit.toFixed(2),
  //   minWidth: 30,
  // },
  // {
  //   field: "debit",
  //   headerName: "Debit",
  //   valueFormatter: params => params.data.debit.toFixed(2),
  //   minWidth: 30,
  // },
  // {
  //   field: "icredit",
  //   headerName: "In. credit",
  //   valueFormatter: params => params.data.icredit.toFixed(2),
  //   minWidth: 30,
  // },
  // {
  //   field: "credit",
  //   headerName: "Credit",
  //   valueFormatter: params => params.data.credit.toFixed(2),
  //   minWidth: 30,
  // },
  {
    field: "enterdate",
    headerName: t('common.enterdate'),
    minWidth: 10,
    cellRenderer: dateRenderer
  },
  {
    field: "changedate",
    headerName: t('common.changedate'),
    minWidth: 10,
    cellRenderer: dateRenderer
  },
  {
    field: "postingdate",
    headerName: t('common.postingdate'),
    minWidth: 10,
    cellRenderer: dateRenderer
  },
  // {
  //   field: "modelid",
  //   headerName: t('common.modelid'),
  //   minWidth: 3,
  // },
  // {
  //   field: "company",
  //   headerName: t('common.company'),
  //   minWidth: 5,
  // }
]

export const masterfileColumnDefs=  (t: (arg0: string) => any): ColDef[]=>[
  {
    field: "id",
    headerName: t('common.id'),
    minWidth: 15,
    filter: "agTextColumnFilter",
    cellStyle: {textAlign: 'right'},
  },
  {
    field: "name",
    headerName: t('common.name'),
    minWidth: 150,
    filter: "agTextColumnFilter",
  },
  {
    field: "description",
    headerName: t('common.description'),
    minWidth: 200,
    filter: "agTextColumnFilter",
  },
  {
    field: "parent",
    headerName: t('common.parent'),
    minWidth: 60,
    filter: "agTextColumnFilter",
  },
  // {
  //   field: "modelid",
  //   headerName: t('common.modelid'),
  //   cellStyle: {textAlign: 'right'},
  //   minWidth: 3,
  //   filter: "agNumberColumnFilter"
  // },
]

export const PartnerColumnDefs=  (t: (arg0: string) => any):ColDef[] =>[
  {
    field: "id",
    headerName: t('common.id'),
    minWidth: 15,
    filter: "agTextColumnFilter",
    cellStyle: {textAlign: 'right'},
  },
  {
    field: "name",
    headerName: t('common.name'),
    minWidth: 150,
    filter: "agTextColumnFilter",
  },
  {
    field: "description",
    headerName: t('common.prenom'),
    minWidth: 100,
    filter: "agTextColumnFilter",
  },
  {
    field: "modelid",
    headerName: t('common.modelid'),
    cellStyle: {textAlign: 'right'},
    minWidth: 3,
    filter: "agNumberColumnFilter"
  },
]
export const permissionColumnDefs=  (t: (arg0: string) => any) => {
  return  [
    ...masterfileColumnDefs(t),
    {
      field: "short",
      headerName: t('common.permission'),
      minWidth: 5,
      cellStyle: {textAlign: 'left'},
    },
  ]
}
export const fmoduleColumnDefs=  (t: (arg0: string) => any) => {
  return  [
    ...masterfileColumnDefs(t),
    {
      field: "account",
      headerName: t('common.account'),
      minWidth: 5,
      cellStyle: {textAlign: 'left'},
    },
    {
      field: "isDebit",
      headerName: t('account.debit_credit'),
      minWidth: 5,
      cellStyle: {textAlign: 'left'},
    },
    {
      field: "copyFrom",
      headerName: t('common.copyFrom'),
      minWidth: 5,
      cellStyle: {textAlign: 'left'},
    },
    {
      field: "accFilter",
      headerName: t('fmodule.accountFilter'),
      minWidth: 5,
      cellStyle: {textAlign: 'left'},
    },
    {
      field: "oaccFilter",
      headerName: t('fmodule.oaccountFilter'),
      minWidth: 5,
      cellStyle: {textAlign: 'left'},
    },
  ]
}
export const pacColumnsDefs = (t: (arg0: string) => any, locale:string, currency:string) =>  [
  {
    field: 'account',
    headerName: t('account.account'),
    align: 'center',
    children: [
      {
        field: 'account',
        headerName: t('common.id'),
        align: 'left',
        minWidth: 15,
      },
      { field: 'name', headerName: t('account.name'), minWidth: 20 },
      ],
      },
      {
        field: 'period',
        headerName: t('pac.period'),
        minWidth: 5,
        align: 'right',
      },
  {
    field: 'init Balance',
    headerName: t('common.report'),
    align: 'center',
    children: [
      {
        field: 'idebit', //aggFunc: "sum",
        headerName: t('common.debit'),
        cellStyle: {textAlign: 'right'},
        minWidth: 10,
        valueFormatter: (params:ValueFormatterParams<IPeriodicAccountBalance, number>) =>
          (!params.data)?'':amountFormatter((p:IPeriodicAccountBalance)=>p.idebit, params.data, locale, currency),
      },
      {
        field: 'icredit', //aggFunc: "sum",
        headerName: t('common.credit'),
        minWidth: 10,
        cellStyle: {textAlign: 'right'},
        valueFormatter: (params:ValueFormatterParams<IPeriodicAccountBalance, number>) =>
          (!params.data)?'':amountFormatter((p:IPeriodicAccountBalance)=>p.icredit, params.data, locale, currency),
      },
    ]
  },
  {
    field: 'Transaction',
    headerName: t('common.transactions'),
    align: 'center',
    //cellStyle: {textAlign: 'center'},
    children: [
      {
        field: 'debit', //aggFunc: "sum",
        headerName: t('common.debit'),
        cellStyle: {textAlign: 'right'},
        minWidth: 10,
        valueFormatter: (params:ValueFormatterParams<IPeriodicAccountBalance, number>) =>
          (!params.data)?'':amountFormatter((p:IPeriodicAccountBalance)=>p.debit, params.data, locale, currency),
      },
      {
        field: 'credit', //aggFunc: "sum",
        headerName: t('common.credit'),
        minWidth: 10,
        cellStyle: {textAlign: 'right'},
        valueFormatter: (params:ValueFormatterParams<IPeriodicAccountBalance, number>) =>
          (!params.data)?'':amountFormatter((p:IPeriodicAccountBalance)=>p.credit, params.data, locale, currency),
      },
    ],
  },
  {
    field: 'balance',
    headerName: t('common.balance'),
    align: 'center',
    //cellStyle: {textAlign: 'center'},
    children: [
      {
        field: 'bdebit', //aggFunc: "sum",
        headerName: t('common.debit'),
        cellStyle: {textAlign: 'right'},
        minWidth: 10,
        valueFormatter: (params:ValueFormatterParams<IPeriodicAccountBalance, number>) =>
          (!params.data)?'':amountFormatter((p:IPeriodicAccountBalance)=>p.bdebit, params.data, locale, currency),
      },
      {
        field: 'bcredit',
        headerName: t('common.credit'),
        minWidth: 10,
        cellStyle: {textAlign: 'right'},
        valueFormatter: (params:ValueFormatterParams<IPeriodicAccountBalance, number>) =>
          (!params.data)?'':amountFormatter((p:IPeriodicAccountBalance)=>p.bcredit, params.data, locale, currency),
      },
    ],
  },
  { field: 'currency', headerName: t('common.currency'), minWidth: 5},
  //{ field: 'company', headerName: t('common.company'), minWidth: 5 },
]
export const customerColumnDefs=(t: (arg0: string) => any)=> [
  {
    field: "id",
    headerName: t('common.id'),
    minWidth: 15,
    filter: "agTextColumnFilter",
  },
  {
    field: "name",
    headerName: t('common.name'),
    minWidth: 60,
    filter: "agTextColumnFilter",
  },
  {
    field: "description",
    headerName: t('common.description'),
    minWidth: 80,
    filter: "agTextColumnFilter",
  },
  {
    field: "street",
    headerName: t('common.street'),
    minWidth: 30,
    filter: "agTextColumnFilter",
  },  {
    field: "zip",
    headerName: t('common.zip'),
    minWidth: 5,
    filter: "agTextColumnFilter",
  },  {
    field: "city",
    headerName: t('common.city'),
    minWidth: 30,
    filter: "agTextColumnFilter",
  },  {
    field: "state",
    headerName: t('common.state'),
    minWidth: 10,
    filter: "agTextColumnFilter",
  },
  {
    field: "country",
    headerName: t('common.country'),
    minWidth: 10,
    filter: "agTextColumnFilter",
  },
  {
    field: "phone",
    headerName: t('common.phone'),
    minWidth: 20,
    filter: "agTextColumnFilter",
  },
  {
    field: "email",
    headerName: t('common.email'),
    minWidth: 20,
    filter: "agTextColumnFilter",
  },
  {
    field: "account",
    headerName: t('common.account'),
    minWidth: 6,
    filter: "agTextColumnFilter",
  },
  {
    field: "oaccount",
    headerName: t('common.oaccount'),
    minWidth: 6,
    filter: "agTextColumnFilter",
  },
  {
    field: "vatCode",
    headerName: t('common.vatCode'),
    minWidth: 10,
    filter: "agTextColumnFilter",
  },
  {
    field: "enterdate",
    headerName: t('common.enterdate'),
    minWidth: 6,
    cellRenderer: dateRenderer
  },
  {
    field: "changedate",
    headerName: t('common.changedate'),
    minWidth: 6,
    cellRenderer: dateRenderer
  },
  {
    field: "postingdate",
    headerName: t('common.postingdate'),
    minWidth: 6,
    cellRenderer: dateRenderer
  },
  {
    field: "modelid",
    headerName: t('common.modelid'),
    minWidth: 3,
  },
  {
    field: "company",
    headerName: t('common.company'),
    minWidth: 5,
  }
]
export const bankAccountColumnDefs = (t: (arg0: string) => any) => [
  {
    field: "id",
    headerName: t('common.iban'),
    minWidth: 130,
    width: 180,
    filter: "agTextColumnFilter",
  },
  {
    field: "bic",
    headerName: t('common.bic'),
    minWidth: 100,
    width: 120,
    filter: "agTextColumnFilter",
  },
  {
    field: "owner",
    headerName: "Owner",
    minWidth: 60,
    width: 100,
    filter: "agTextColumnFilter",
  },
  {
    field: "modelid",
    headerName: t('common.modelid'),
    minWidth: 10,
    width: 20,
  },
  {
    field: "company",
    headerName: t('common.company'),
    minWidth: 10,
    width: 20,
  }
]
export const articleColumnDefs = (t: (arg0: string) => any, locale:string, currency:string):ColDef<IArticle>[] => [
  {
    field: 'id',
    headerName: t('common.id'),
    minWidth: 60,
    width: 80,
    filter: "agTextColumnFilter",
  },
  {
    field: 'name',
    headerName: t('common.name'),
    type: 'string',
    filter: "agTextColumnFilter",
    minWidth: 150,
  },
  {
    field: 'parent',
    headerName: t('article.group'),
    minWidth: 50,
    width: 50,
    filter: "agTextColumnFilter",
  },
  {
    field: 'description',
    headerName: t('common.description'),
    minWidth: 300,
    filter: "agTextColumnFilter",
  },
  {
    field: 'quantityUnit',
    headerName: t('article.quantityUnit'),
    minWidth: 30,
    filter: "agTextColumnFilter",
  },
  {
    field: 'packUnit',
    headerName: t('article.packUnit'),
    minWidth: 30,
    filter: "agTextColumnFilter",
  },
  {
    field: 'account',
    headerName: t('article.stock.account'),
    minWidth: 30,
    filter: "agTextColumnFilter",
  },
  {
    field: 'oaccount',
    headerName: t('article.expense.account'),
    minWidth: 30,
    filter: "agTextColumnFilter",
  },
  {
    field: 'vatCode',
    headerName: t('article.vat'),
    minWidth: 30,
    filter: "agTextColumnFilter",
  },
  {
    field: 'stocked',
    headerName: t('article.stocked'),
    minWidth: 30,
    filter: "agBooleanColumnFilter",
  },
  {
    field: 'pprice',
    headerName: t('article.pprice'),
    valueFormatter: (params:ValueFormatterParams<IArticle, number>) =>
      (!params.data)?'':amountFormatter((p:IArticle)=>p.pprice, params.data, locale, currency),
    minWidth: 40,
    filter: "agNumberColumnFilter",
  },
  {
    field: 'avgPrice',
    headerName: t('article.avgPrice'),
    valueFormatter: (params:ValueFormatterParams<IArticle, number>) =>
      (!params.data)?'':amountFormatter((p:IArticle)=>p.avgPrice, params.data, locale, currency),
    minWidth: 40,
    filter: "agNumberColumnFilter",
  },
  {
    field: 'sprice',
    headerName: t('article.sprice'),
    valueFormatter: (params:ValueFormatterParams<IArticle, number>) =>
      (!params.data)?'':amountFormatter((p:IArticle)=>p.sprice, params.data, locale, currency),
    minWidth: 40,
    filter: "agNumberColumnFilter",
  },
  {
    field: "enterdate",
    headerName: "Enterdate",
    minWidth: 5,
    cellRenderer: dateRenderer
  },
  {
    field: "changedate",
    headerName: "Changedate",
    minWidth: 5,
    cellRenderer: dateRenderer
  },
  {
    field: "postingdate",
    headerName: "Postingdate",
    minWidth: 5,
    cellRenderer: dateRenderer
  },
]
export const assetColumnDefs = (t: (arg0: string) => any, locale:string, currency:string) :ColDef<IAsset>[] => [
  {
    field: 'id',
    headerName: t('common.id'),
    minWidth: 40,
    filter: "agTextColumnFilter",
  },
  {
    field: 'name',
    headerName: t('common.name'),
    type: 'string',
    minWidth: 100,
    filter: "agTextColumnFilter",
  },
  {
    field: 'account',
    headerName: t('common.account'),
    minWidth: 30,
    filter: "agTextColumnFilter",
  },
  {
    field: 'oaccount',
    headerName: t('common.oaccount'),
    minWidth: 30,
    filter: "agTextColumnFilter",
  },
  {
    field: 'amount',
    headerName: t('asset.amount'),
    valueFormatter: (params:ValueFormatterParams<IAsset, number>) =>
      (!params.data)?'':amountFormatter((p:IAsset)=>p.amount, params.data, locale, currency),
    minWidth: 40,
    filter: "agNumberColumnFilter",
  },
  {
    field: 'scrapValue',
    headerName: t('asset.scrapValue'),
    valueFormatter: (params:ValueFormatterParams<IAsset, number>) =>
      (!params.data)?'':amountFormatter((p:IAsset)=>p.scrapValue, params.data, locale, currency),
    minWidth: 40,
    filter: "agNumberColumnFilter",
  },
  //    valueFormatter: (params:ValueFormatterParams<IArticle, number>)  => {
  //       const sprice = params.data?.sprice??0.0
  //     return  sprice.toFixed(2)
  {
    field: 'lifeSpan',
    headerName: t('asset.lifeSpan'),
    valueFormatter: (params: ValueFormatterParams<IAsset, number>) => (params.data?.lifeSpan??0.0).toFixed(2),

    minWidth: 40,
    filter: "agNumberColumnFilter",

  },
  {
    field: 'frequency',
    headerName: t('asset.frequency'),
    valueFormatter: (params: ValueFormatterParams<IAsset, number>) => (params.data?.frequency??0.0).toFixed(2),
    minWidth: 30,
    filter: "agNumberColumnFilter",
  },
  {
    field: 'rate',
    headerName: t('asset.rate'),
    valueFormatter: (params: ValueFormatterParams<IAsset, number>) => (params.data?.rate??0.0).toFixed(2),
    minWidth: 40,
    filter: "agNumberColumnFilter",
  },
  {
    field: 'depMethod',
    headerName: t('asset.depreciation'),
    valueFormatter: (params: ValueFormatterParams<IAsset, number>) => (params.data?.depMethod??0.0).toFixed(2),
    minWidth: 40,
    filter: "agNumberColumnFilter",
  },
  {
    field: 'description',
    headerName: t('common.description'),
    minWidth: 300,
    filter: "agTextColumnFilter",
  },
  {
    field: "enterdate",
    headerName: "Enterdate",
    minWidth: 5,
    cellRenderer: dateRenderer
  },
  {
    field: "changedate",
    headerName: "Changedate",
    minWidth: 5,
    cellRenderer: dateRenderer
  },
  {
    field: "postingdate",
    headerName: "Postingdate",
    minWidth: 5,
    cellRenderer: dateRenderer
  },
]
export const LinesFinancialsColumns = ( t: (arg0: string) => any, locale:string, currency:string) => {

  return  [
    {
      field: 'account',
      headerName: t('financials.line.account'),
      minWidth: 30,
      filter: "agTextColumnFilter",
    },
    {
      field: 'accountName',
      headerName: t('financials.line.accountName'),
      minWidth: 50,
      filter: "agTextColumnFilter",
    },
    {
      field: 'side',
      headerName: t('financials.line.side'),
      minWidth: 5,
      cellEditor: "agCheckboxCellEditor",
      filter: "agBooleanColumnFilter",
    },
    {
      field: 'oaccount',
      headerName: t('financials.line.oaccount'),
      minWidth: 30,
      align: 'right',
      filter: "agTextColumnFilter",
    },
    {
      field: 'oaccountName',
      headerName: t('financials.line.oaccountName'),
      minWidth: 50,
      filter: "agTextColumnFilter",
    },
    {
      field: 'duedate',
      headerName: t('financials.line.duedate'),
      minWidth: 20,
      cellStyle: {textAlign: 'right'},
      filter: 'agDateColumnFilter',
     cellRenderer: dateRenderer
    },
    {
      field: 'amount',
      headerName: t('financials.line.amount'),
      valueFormatter: (params:ValueFormatterParams<ILineFinancials, number>) => {
        const calculateTotal = (line:ILineFinancials) => line.amount
        return  amountFormatter(calculateTotal, params?.data??initLineFinancials, locale, currency)
      },
      minWidth: 30,
      cellStyle: {textAlign: 'right'},
      filter: "agNumberColumnFilter",
    },
    // {
    //   field: 'currency',
    //   headerName: t('common.currency'),
    //   minWidth: 10,
    //   filter: "agTextColumnFilter",
    // },
    {
      field: 'text',
      headerName: t('financials.line.text'),
      minWidth: 70,
      filter: "agTextColumnFilter",
    },
  ]}

export const bankStatementColumnDefs = (t: (arg0: string) => any, locale:string, currency:string) =>
   [
    {
      field: 'id',
      headerName: t('common.id'),
      minWidth: 10,
      filter: "agNumberColumnFilter",
    },
    {
      field: 'depositor',
      headerName: t('bankstatement.depositor'),
      minWidth: 20,
      filter: "agTextColumnFilter",
    },
    {
      field: 'purpose',
      headerName: t('bankstatement.purpose'),
      minWidth: 80,
      filter: "agTextColumnFilter",
    },
    {
      field: 'beneficiary',
      headerName: t('bankstatement.beneficiary'),
      minWidth: 20,
      filter: "agTextColumnFilter",
    },
    {
      field: 'accountno',
      headerName: t('bankstatement.accountno'),
      minWidth: 20,
      filter: "agTextColumnFilter",
    },
    // {
    //   field: 'postingdate',
    //   headerName: t('bankstatement.postingdate'),
    //   minWidth: 10,
    // },
    {
      field: 'valuedate',
      headerName: t('bankstatement.valuedate'),
      minWidth: 10,
    },
    {
      field: 'postingtext',
      headerName: t('bankstatement.postingtext'),
      minWidth: 100,
      filter: "agTextColumnFilter",
    },
    {
      field: 'bankCode',
      headerName: t('bankstatement.bankCode'),
      minWidth: 20,
      filter: "agTextColumnFilter",
    },
    {
      field: 'amount',
      headerName: t('common.amount'),
      minWidth: 20,
      cellStyle: {textAlign: 'right'},
      filter: "agNumberColumnFilter",
      valueFormatter: (params:{ data:IBankStatement}) =>
       !params?.data?'':amountFormatter((p: IBankStatement) => p.amount, params.data, locale, currency)
    },
    {
      field: 'currency',
      headerName: t('common.currency'),
      minWidth: 5,
      filter: "agTextColumnFilter",
    },
    // {
    //   field: 'info',
    //   headerName: t('bankstatement.info'),
    //   minWidth: 100,
    //   filter: "agTextColumnFilter",
    // },
    // {
    //   field: 'companyIban',
    //   headerName: t('bankstatement.companyIban'),
    //   minWidth: 50,
    //   filter: "agTextColumnFilter",
    // },
    {
      field: 'period',
      headerName: t('bankstatement.period'),
      minWidth: 10,
      cellStyle: {textAlign: 'right'},
      filter: "agNumberColumnFilter",
    },
    {
      field: 'posted',
      headerName: t('bankstatement.posted'),
      minWidth: 5,
      filter: "agBooleanColumnFilter",
    },
    {
      field: 'modelid',
      headerName: t('common.modelid'),
      cellStyle: {textAlign: 'right'},
      minWidth: 5,
    },
    {
      field: 'company',
      headerName: t('common.company'),
      cellStyle: {textAlign: 'right'},
      minWidth: 5,
    },
  ]

export const financialsColumnDefs = (t: (arg0: string) => any, locale:string, currency:string)=> {
  return [
    {
      field: 'id',
      headerName: t('financials.id'),
      cellStyle: {textAlign: 'right'},
      minWidth: 6,
      //cellRenderer: "agGroupCellRenderer",
      //filter: "agNumberColumnFilter",
    },
    {
      field: 'oid',
      headerName: t('financials.oid'),
      cellStyle: {textAlign: 'right'},
      // filter: "agTextColumnFilter",
      minWidth: 6,

    },
    {
      field: 'account',
      headerName: t('financials.account'),
      cellStyle: {textAlign: 'right'},
      //filter: "agTextColumnFilter",
      minWidth: 6,
    },
    {
      field: 'costcenter',
      headerName: t('financials.costcenter'),
      //filter: "agTextColumnFilter",
      //editComponent: (tableData) => Autocomplete(data, tableData),
      cellStyle: {textAlign: 'right'},
      minWidth: 6,
    },
    {
      field: 'total',
      headerName: t('common.total'),
      valueFormatter: (params:{data:IFinancials}) => {
        if (!params.data) return '';
        const calculateTotal = (t:IFinancials) =>
                      t.lines?.reduce((acc:number, line:ILineFinancials) => acc + line.amount, 0.0)??0.0
        return  amountFormatter(calculateTotal, params.data, locale, currency)
      },
      minWidth: 25,
      filter: "agNumberColumnFilter",
      cellStyle: {textAlign: 'right'},
    },
    // {
    //   field: 'enterdate',
    //   headerName: t('financials.enterdate'),
    //   minWidth: 10,
    //   cellStyle: {textAlign: 'right'},
    //   //filter: 'agDateColumnFilter',
    //   cellRenderer: dateRenderer
    // },
    // {
    //   field: 'postingdate',
    //   headerName: t('financials.postingdate'),
    //   minWidth: 10,
    //   cellStyle: {textAlign: 'right'},
    //   //filter: 'agDateColumnFilter',
    //   cellRenderer: dateRenderer
    // },
    {
      field: 'transdate',
      headerName: t('financials.transdate'),
      minWidth: 10,
      cellStyle: {textAlign: 'right'},
      //filter: 'agDateColumnFilter',
      cellRenderer: dateRenderer
    },
    {
      field: 'period',
      headerName: t('financials.period'),
      cellStyle: {textAlign: 'right'},
      //filter: 'agNumberColumnFilter',
      minWidth: 10,
      pivot: true
    },
    {
      field: 'contact',
      headerName: t('common.contact'),
      cellStyle: {textAlign: 'right'},
      //filter: "agTextColumnFilter",
      minWidth: 6,

    },
    {
      field: 'posted',
      headerName: t('financials.posted'),
      cellRendererFramework: AgGridCheckbox,
      //filter: 'agBooleanColumnFilter',
      minWidth: 10,
      DataType: 'Boolean',
    },
    {
      field: 'text',
      headerName: t('financials.text'),
      minWidth: 100,
    },

    {
      field: 'modelid',
      headerName: t('common.modelid'),
      cellStyle: {textAlign: 'right'},
      minWidth: 10,
    },
    {
      field: 'company',
      headerName: t('common.company'),
      cellStyle: {textAlign: 'right'},
      minWidth: 10,
      hide: true,
    },
  ]
}

export const transactionColumnDefs = ( t: TFunction<"translation", undefined>, locale:string, currency:string) => {

  return [
    {
      field: 'id',
      headerName: t('transaction.id'),
      minWidth: 10,
      //cellRenderer: "agGroupCellRenderer",
      filter: "agNumberColumnFilter"
    },
    {
      field: 'oid',
      headerName: t('transaction.oid'),
      filter: "agTextColumnFilter",
      minWidth: 10,
    },
    {
      field: 'store',
      headerName: t('transaction.store'),
      filter: "agTextColumnFilter",
      minWidth: 10,
    },
    {
      field: 'account',
      headerName: t('transaction.account'),
      filter: "agTextColumnFilter",
      minWidth: 10,
    },
    // {
    //   field: 'enterdate',
    //   headerName: t('transaction.enterdate'),
    //   filter: 'agDateColumnFilter',
    //   minWidth: 20,
    // },
    // {
    //   field: 'postingdate',
    //   headerName: t('transaction.postingdate'),
    //   filter: 'agDateColumnFilter',
    //   minWidth: 20,
    // },
    {
      field: 'transdate',
      headerName: t('transaction.transdate'),
      filter: 'agDateColumnFilter',
      minWidth: 20,
    },
    {
      field: 'period',
      headerName: t('transaction.period'),
      minWidth: 5,
      filter: "agNumberColumnFilter"
    },

    {
      field: 'total',
      headerName: t('common.total'),
      valueFormatter: (params:{data:ITransaction}) => {
        const calculateTotal = (t:ITransaction) =>t.lines?.reduce((acc:number, line:ILineTransaction) =>
          acc + line.quantity * line.price +line.vat, 0.0)??0.0
       return  amountFormatter(calculateTotal, params.data, locale, currency)
      },
      // valueFormatter: (params:{data:ITransaction}) => {
      //
      //   const formattedNumber =  new Intl.NumberFormat(locale, {
      //     minimumFractionDigits: 0,
      //     maximumFractionDigits: 0,
      //     useGrouping: true,
      //   }).format(amount).replace(/\s/g, '.')
      //    return `${formattedNumber} ${currency}`;
     // },
       //}).format(amount).replace(/,/g, '.')},
      minWidth: 25,
      //filter: "agNumberColumnFilter",
      cellStyle: {textAlign: 'right'},
    },
    {
      field: 'text',
      headerName: t('transaction.text'),
      filter: "agTextColumnFilter",
      minWidth: 50,
    },
    {
      field: 'posted',
      headerName: t('transaction.posted'),
      //cellRendererFramework: AgGridCheckbox,
      width: 8,
      minWidth: 7,
      cellStyle: {textAlign: 'left'},
    },
    {
      field: 'modelid',
      headerName: t('common.modelid'),
      initialWidth: 5,
    },
    {
      field: 'company',
      headerName: t('common.company'),
      initialWidth: 5,
      hide: true,
    },
  ]
}
export const lineTransactionColumnDefs =  (t: (arg0: string) => any,  locale:string
                                           , currency:string):ColDef<ILineTransaction>[]  =>  [
  {
    field: 'article',
    headerName: t('transaction.line.article'),
    cellStyle: {textAlign: 'left'},
    minWidth: 45,
  },
  {
    field: 'articleName',
    headerName: t('transaction.line.articleName'),
    minWidth: 70,
  },
  {
    field: 'quantity',
    headerName: t('transaction.line.quantity'),
    cellStyle: { textAlign: 'right'},
    valueFormatter: (params:ValueFormatterParams<ILineTransaction, number>)  => Number(params.data?.quantity).toFixed(2),
    minWidth: 70,
  },
  {
    field: 'unit',
    headerName: t('transaction.line.unit'),
    minWidth: 30,
  },
  {
    field: 'price',
    headerName: t('transaction.line.price'),
    cellStyle: {textAlign: 'right'},
    valueFormatter: (params:ValueFormatterParams<ILineTransaction, number>)  => Number(params.data?.price).toFixed(2),
    minWidth: 50,
  },
  {
    field: 'vat',
    headerName: t('common.vat'),
    cellStyle: {textAlign: 'right'},
    valueFormatter: (params:ValueFormatterParams<ILineTransaction, number>)  => Number(params.data?.vat).toFixed(2),
    //valueFormatter: (params: { data: { vat: number} }) => Number(params.data?.vat).toFixed(2),
    minWidth: 50,
  },
  {
    field: 'total',
    headerName: t('common.total'),
    cellStyle: {textAlign: 'right'},
    valueFormatter: (params:ValueFormatterParams<ILineTransaction, number>) => {
      const calculateTotal = (line:ILineTransaction) => {
        const quantity = line?.quantity ?? 0.0
        const price = line?.price ?? 0.0
        const vat = line?.vat ?? 0.0
        return Number(quantity * price + vat)
      }
      return  amountFormatter(calculateTotal, params?.data??initLineTransaction, locale, currency)
    },
    minWidth: 70,
  },
  // {
  //   field: 'currency',
  //   headerName: t('common.currency'),
  //   minWidth: 20,
  // },
  {
    field: 'vatCode',
    headerName: t('common.vatCode'),
    initialWidth: 40,
    width: 80,
  },
  {
    field: 'duedate',
    headerName: t('transaction.line.duedate'),
    valueFormatter: (params: ValueFormatterParams<any, Date>) => {
      if (!params?.value) {
        return ""
      }
      // console.log('date>>>', params)
      // const unixTimeZero:Date = new Date(params.value.toString())
      // console.log('date unixTimeZero>>>', unixTimeZero)
      // const month = unixTimeZero.getMonth() + 1
      // const day = unixTimeZero.getDate()
      // const year =unixTimeZero.getFullYear()
      // const date =`${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${year}`
      // //const date =`${params.value.getFullYear()}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`
      // console.log('date>>>', date)
      return getDateFromString(params.value.toString())
    },
    //cellRenderer: dateRenderer,
    initialWidth: 50,
  },
  {
    field: 'text',
    headerName: t('transaction.line.text'),
    minWidth: 50,
  },
]
export const journalColumnsDefs = (t: (arg0: string) => any, locale:string, currency:string) => [
  {
    field: 'id',
    headerName: t('common.id'),
    minWidth: 6,
  },
  {
    field: 'transid',
    headerName: t('journal.transid'),
    //width: 30,
    minWidth: 5,
    type: 'numeric',
  },
  {
    field: 'oid',
    headerName: t('journal.oid'),
    //width: 30,
    minWidth: 5,
    //maxWidth: 40,
  },
  {
    field: 'account',
    headerName: t('journal.account'),
    minWidth: 8,
    cellStyle: {textAlign: 'right'},
  },
  {
    field: 'oaccount',
    headerName: t('journal.oaccount'),
    minWidth: 8,
    cellStyle: {textAlign: 'right'},
  },
  {
    field: 'transdate',
    headerName: t('journal.transdate'),
    minWidth: 10,
  },
  {
    field: 'period',
    headerName: t('journal.period'),
    minWidth: 5,
  },
  {
    field: 'amount',
    headerName: t('common.amount'),
    cellStyle: { textAlign: 'right'},
    valueFormatter: (params:{data:IJournal}) =>
      (!params.data)?'':amountFormatter((p:IJournal)=>p.amount, params.data, locale, currency),
    minWidth: 10,
  },
  {
    field: 'idebit',
    headerName: t('common.idebit'),
    cellStyle: {textAlign: 'right'},
    valueFormatter: (params:{data:IJournal}) =>
      (!params.data)?'':amountFormatter((p:IJournal)=>p.idebit, params.data, locale, currency),
    minWidth: 8,
  },
  {
    field: 'debit',
    headerName: t('common.debit'),
    cellStyle: {textAlign: 'right'},
    valueFormatter: (params:{data:IJournal}) =>
      (!params.data)?'':amountFormatter((p:IJournal)=>p.debit, params.data, locale, currency),
    minWidth: 8,
  },
  {
    field: 'icredit',
    headerName: t('common.icredit'),
    cellStyle: {textAlign: 'right'},
    valueFormatter: (params:{data:IJournal}) =>
      (!params.data)?'':amountFormatter((p:IJournal)=>p.icredit, params.data, locale, currency),
    minWidth: 8,
  },
  {
    field: 'credit',
    headerName: t('common.credit'),
    cellStyle: {textAlign: 'right'},
    valueFormatter: (params:{data:IJournal}) =>
      (!params.data)?'':amountFormatter((p:IJournal)=>p.credit, params.data, locale, currency),
    minWidth: 8,
  },
  {
    field: 'side',
    headerName: t('journal.side'),
    cellRenderer: AgGridCheckbox,
    minWidth:2,
  },
  {
    field: 'text',
    headerName: t('journal.text'),
    minWidth: 100,
  },
  {
    field: 'month',
    headerName: t('journal.month'),
    minWidth: 10,
    width: 15,
    cellStyle: {textAlign: 'right'},
  },
  {
    field: 'year',
    headerName: t('journal.year'),
    minWidth: 10,
    width: 15,
    cellStyle: {textAlign: 'right'},
  },
  // {
  //   field: 'company',
  //   headerName: t('common.company'),
  //   minWidth: 4,
  // },
  {
    field: 'modelid',
    headerName: t('common.modelid'),
    minWidth: 1,
  },
]
export const inventoryJournalColumnsDefs = (t: (arg0: string) => any, locale:string, currency:string) => [
  {
    field: 'id',
    headerName: t('common.id'),
    minWidth: 6,
  },
  {
    field: 'transid',
    headerName: t('journal.transid'),
    minWidth: 5,
    type: 'numeric',
  },
  {
    field: 'oid',
    headerName: t('transaction.oid'),
    minWidth: 5,
  },
  {
    field: 'article',
    headerName: t('transaction.line.article'),
    minWidth: 8,
    cellStyle: {textAlign: 'right'},
  },
  {
    field: 'quantity',
    headerName: t('transaction.line.quantity'),
    cellStyle: { textAlign: 'right'},
    valueFormatter: (params:{data:InventoryJournal}) => {
      return (params.data?.quantity??0.0).toFixed(2)
    },
    minWidth: 8,
  },
  {
    field: 'stock',
    headerName: t('stock.title'),
    cellStyle: {textAlign: 'right'},
    minWidth: 8,
  },
  {
    field: 'wholeStock',
    headerName: t('article.wholeStock'),
    cellStyle: {textAlign: 'right'},
    minWidth: 8,
  },
  {
    field: 'unit',
    headerName: t('transaction.line.unit'),
    minWidth: 5,
  },
  {
    field: 'price',
    headerName: t('article.price'),
    cellStyle: {textAlign: 'right'},
    valueFormatter: (params:{data:InventoryJournal}) =>
      (!params.data)?'':amountFormatter((p:InventoryJournal)=>p.price, params.data, locale, currency),
    minWidth: 8,
  },
  {
    field: 'avgPrice',
    headerName: t('article.avgPrice'),
    cellStyle: {textAlign: 'right'},
    valueFormatter: (params:{data:InventoryJournal}) =>
      (!params.data)?'':amountFormatter((p:InventoryJournal)=>p.avgPrice, params.data, locale, currency),
    minWidth: 8,
  },
  {
    field: 'currency',
    headerName: t('common.currency'),
    minWidth: 5,
  },
  {
    field: 'store',
    headerName: t('transaction.store'),
    minWidth: 8,
  },
  {
    field: 'account',
    headerName: t('transaction.account'),
    minWidth: 5,
  },
  {
    field: 'transdate',
    headerName: t('transaction.transdate'),
    minWidth: 10,
  },

  {
    field: 'period',
    headerName: t('common.period'),
    minWidth: 5,
  },

  {
    field: 'text',
    headerName: t('transaction.text'),
    minWidth: 100,
  },
  {
    field: 'month',
    headerName: t('common.month'),
    minWidth: 10,
    width: 15,
    cellStyle: {textAlign: 'right'},
  },
  {
    field: 'year',
    headerName: t('common.year'),
    minWidth: 10,
    width: 15,
    cellStyle: {textAlign: 'right'},
  },
  {
    field: 'modelid',
    headerName: t('common.modelid'),
    minWidth: 1,
  },
]
//(t:TFunction<'transalation', undefined>)
export const storeColumnDefs = (t:TFunction<'transalation', undefined>):ColDef<IStore>[]=>[
//(t: (arg0: string) => any):ColDef<IStore>[] =>  [
  {
    field: 'id',
    headerName: t('common.id'),
    minWidth: 40,
    filter: "agTextColumnFilter",
  },
  {
    field: 'name',
    headerName: t('common.name'),
    type: 'string',
    minWidth: 100,
    filter: "agTextColumnFilter",
  },
  {
    field: 'description',
    headerName: t('common.description'),
    minWidth: 180,
    filter: "agTextColumnFilter",
  },
  {
    field: 'costcenter',
    headerName: t('common.costcenter'),
    minWidth: 10,
    filter: "agTextColumnFilter",
  },
  {
    field: 'account',
    headerName: t('article.stock.account'),
    minWidth: 10,
    filter: "agTextColumnFilter",
  },
  {
    field: 'oaccount',
    headerName: t('article.expense.account'),
    minWidth: 10,
    filter: "agTextColumnFilter",
  },
  {
    field: "enterdate",
    headerName: t('common.enterdate'),
    minWidth: 5,
    cellRenderer: dateRenderer
  },
  {
    field: "changedate",
    headerName: t('common.changedate'),
    minWidth: 5,
    cellRenderer: dateRenderer
  },
  {
    field: "postingdate",
    headerName: t('common.postingdate'),
    minWidth: 5,
    cellRenderer: dateRenderer
  },
  {
    field: "modelid",
    headerName: t('common.modelid'),
    minWidth: 10,
  },
  {
    field: "company",
    headerName:t('common.company'),
    minWidth: 10,
  }
]
export const stockColumnDefs =  ( t: (arg0: string) => any, locale:string, currency:string) => {
  return  [
    {
      field: 'article',
      headerName: t('article.title'),
      minWidth: 10,
    },
    {
      field: 'store',
      headerName: t('store.title'),
      minWidth: 10,
    },
    {
      field: 'quantity',
      headerName: t('common.quantity'),
      cellStyle: {textAlign: 'right'},
      valueFormatter: (params: { data: { quantity: number; }; }) => params.data?.quantity?.toFixed(2),
      minWidth: 10,
    },
    {
      field: 'price',
      headerName: t('article.avgPrice'),
      cellStyle: {textAlign: 'right'},
      valueFormatter: (params:{data:IStock}) =>
        (!params.data)?'':amountFormatter((p:IStock)=>p.price, params.data, locale, currency),
      minWidth: 10,
    },
    {
      field: 'charge',
      headerName: t('common.charge'),
      minWidth: 10,
    },
  ]

}
export const userColumnDefs=  (t: (arg0: string) => any):ColDef<IUser>[] => [
  {
    field: "id",
    headerName: t('common.id'),
    minWidth: 25,
    cellStyle: { textAlign: 'right'},
    filter: "agTextColumnFilter",
    //cellRenderer: "agGroupCellRenderer",
  },
  {
    field: "userName",
    headerName: t('user.userName'),
    minWidth: 30,
    filter: "agTextColumnFilter",
  },
  {
    field: "lastName",
    headerName: t('user.firstName'),
    minWidth: 70,
    filter: "agTextColumnFilter",
  },
  {
    field: "lastName",
    headerName: t('user.lastName'),
    minWidth: 70,
    filter: "agTextColumnFilter",
  },
  {
    field: "email",
    headerName: t('user.email'),
    minWidth: 50,
    filter: "agTextColumnFilter",
  },
  {
    field: "phone",
    headerName: t('common.phone'),
    minWidth: 50,
    filter: "agTextColumnFilter",
  },
  {
    field: "modelid",
    headerName: t('common.modelid'),
    cellStyle: {textAlign: 'right'},
    minWidth: 3,
    filter: "agNumberColumnFilter"
  },
  {
    field: "company",
    headerName: t('common.company'),
    cellStyle: {textAlign: 'right'},
    minWidth: 5,
  }
]
export const UserRoleColumnDefs=  (t: (arg0: string) => any) =>[
  {
    field: "id",
    headerName: t('common.id'),
    minWidth: 5,
    //cellRenderer: "agGroupCellRenderer",
    cellStyle: {textAlign: 'right'},
  },
  {
    field: "name",
    headerName: t('common.name'),
    minWidth: 10,
  },
  {
    field: "description",
    headerName: t('common.description'),
    minWidth: 150,
  },
  {
    field: "company",
    headerName: t('common.company'),
    cellStyle: {textAlign: 'right'},
    minWidth: 5,
  }
]
export const UserRightsColumns = (t: (arg0: string) => any) => {
  return [
    {
      field: 'roleid',
      headerName: t('role.id'),
      type: 'numeric',
      minWidth: 10,
      align: 'left',
      // hide: true,
    },
    {
      field: 'moduleid',
      headerName: t('module.id'),
      align: 'left',
      minWidth: 10,
    },
    {
      field: 'short',
      headerName: t('userRight.short'),
      width: 20,
      minWidth: 20,
      align: 'left',
    },
  ]
}
export const vatColumnDefs = ( t: (arg0: string) => any) => [
  {
    field: 'id',
    headerName: t('common.id'),
    minWidth: 30,
    filter: "agTextColumnFilter",
  },
  {
    field: 'name',
    headerName: t('common.name'),
    minWidth: 60,
    filter: "agTextColumnFilter",
  },
  {
    field: 'description',
    headerName: t('common.description'),
    minWidth: 100,
    filter: "agTextColumnFilter",
  },
  {
    field: 'percent',
    headerName: t('vat.percent'),
    minWidth: 20,
    cellStyle: {textAlign: 'right'},
    filter: "agNumerictColumnFilter",
  },
  {
    field: 'inputVatAccount',
    headerName: t('vat.input.account'),
    minWidth: 20,
    filter: "agTextColumnFilter",
  },
  {
    field: 'outputVatAccount',
    headerName: t('vat.output.account'),
    minWidth: 20,
    filter: "agTextColumnFilter",
  },
  // {
  //   field: 'enterdate',
  //   headerName: t('common.enterdate'),
  //   align: 'right',
  //   minWidth: 6,
  //
  // },
  // {
  //   field: 'changedate',
  //   headerName: t('common.changedate'),
  //   align: 'right',
  //   minWidth: 6,
  // },
  // {
  //   field: 'postingdate',
  //   headerName: t('common.postingdate'),
  //   align: 'right',
  //   minWidth: 6,
  // },
  {
    field: 'company',
    headerName: t('common.company'),
    minWidth: 6,
  },
]


export  const BalanceSheetColDef = (t:TFunction<'transalation', undefined>, locale:string, currency:string):any=>[
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
        valueFormatter: (params:{data:IPeriodicAccountBalance}) =>
          (!params.data)?'':amountFormatter((p:IPeriodicAccountBalance)=>p.idebit, params.data, locale, currency),
      },
      {
        headerName: t('common.icredit'),
        //aggFunc: "sum",
        field: "icredit",
        flex: 1,
        cellStyle: {textAlign: 'right'},
        valueFormatter: (params:{data:IPeriodicAccountBalance}) =>
          (!params.data)?'':amountFormatter((p:IPeriodicAccountBalance)=>p.icredit, params.data, locale, currency),
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
        valueFormatter: (params:{data:IPeriodicAccountBalance}) =>
          (!params.data)?'':amountFormatter((p:IPeriodicAccountBalance)=>p.debit, params.data, locale, currency),
      },
      {
        headerName: t('common.credit'),
        //aggFunc: "sum",
        field: "credit",
        flex: 1,
        cellStyle: {textAlign: 'right'},
        valueFormatter: (params:{data:IPeriodicAccountBalance}) =>
          (!params.data)?'':amountFormatter((p:IPeriodicAccountBalance)=>p.credit, params.data, locale, currency),
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
        valueFormatter: (params:{data:IPeriodicAccountBalance}) =>
          (!params.data)?'':amountFormatter((p:IPeriodicAccountBalance)=>p.bdebit, params.data, locale, currency),
      },
      {
        headerName: t('common.credit'),
        //aggFunc: "sum",
        field: "bcredit",
        flex: 1,
        cellStyle: {textAlign: 'right'},
        valueFormatter: (params:{data:IPeriodicAccountBalance}) =>
          (!params.data)?'':amountFormatter((p:IPeriodicAccountBalance)=>p.bcredit, params.data, locale, currency),
      },
      {
        headerName: t('common.balance'),
        //aggFunc: "sum",
        field: "balance",
        flex: 1,
        cellStyle: {textAlign: 'right'},
        valueFormatter: (params:{data:IPeriodicAccountBalance}) =>
          (!params.data)?'':amountFormatter((p:IPeriodicAccountBalance)=>p.balance, params.data, locale, currency),
      },
    ],
  },
]



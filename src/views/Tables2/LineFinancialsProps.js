import React from 'react'
import {rowStyle, theme} from "../base/Tree/BasicTreeTableProps";
import {Autocomplete} from "../base/Components/Autocomplete";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {formEnum} from "../../utils/FORMS";
import {dateFormat} from "../../utils/utils";

const mapping = (acc) =>
  <MenuItem key={acc.id} value={acc.id}>
      {acc.id.concat( " ").concat(acc.name)}
  </MenuItem>

export  const ACCOUNT=(data, value, onRowDataChange, rowData, fieldName) => {
    console.log('rowData>>>>>', {...rowData, [`${fieldName}`]: value});
    return (<Select value={value} onChange={(event) =>
      onRowDataChange({...rowData, [`${fieldName}`]: event.target.value})}>
        {data.map(mapping)} id={"cb".concat(fieldName)}
    </Select>)
}

export  const OACCOUNT=(data, value, onRowDataChange, rowData, fieldName) => {
    console.log('rowData>>>>>', {...rowData, [`${fieldName}`]: value});
    return (<Select value={value} onChange={(event) =>
      onRowDataChange({...rowData, oaccount: event.target.value})}>
        {data.map(mapping)} id={"cb".concat(fieldName)}
    </Select>)
}

export const ColumnsLOGIN = () => [
     {field:'id', title:'id', type:'numeric', align:"right", export:true}
    , {field:'name', title:'name', type:"string", export:true}
]
export const columnsPACB = (t, locale, currency) => [
      {field:'id', title:t('common.id'),   minWidth:10, export:true }
    , {field:'name', title:t('common.name'),   minWidth:40, export:true }
    , {field:'period', title:t('pac.period'),  type:"numeric", export:true }
    , {field:'idebit', title:t('common.idebit'), type:"currency", currencySetting: { locale:locale
            , currencyCode:currency, minimumFractionDigits: 2, maximumFractionDigits: 2}, export:true}
    , {field:'debit', title:t('common.debit'), type:"currency", currencySetting: { locale:locale
            , currencyCode: currency, minimumFractionDigits: 2, maximumFractionDigits: 2}, export:true}
    , {field:'icredit', title:t('common.icredit'), type:"currency", currencySetting: { locale:locale
            , currencyCode: currency, minimumFractionDigits: 2, maximumFractionDigits: 2}, export:true}
    , {field:'credit', title:t('common.credit'), type:"currency", currencySetting: { locale:locale
            , currencyCode: currency, minimumFractionDigits: 2, maximumFractionDigits: 2}, export:true}
    , {field:'balance', title:t('common.balance'), type:"currency", currencySetting: { locale:locale
            , currencyCode: currency, minimumFractionDigits: 2, maximumFractionDigits: 2}, export:true}
    , {field:'currency', title:t('common.currency'),   export:true }
    , { field:'company', title:t('common.company'), export:true }
]

export const columnsF =(data, line, current, t, locale, currency) => [
     {field:'id', title:t('financials.id'), initialEditValue:line.id, align:"right", width:40, minWidth:20,  maxWidth:50,export:true}
    , {field:'oid', title:t('financials.oid'),initialEditValue:current?current.oid:-1, align:"right", width:40, minWidth:20,  maxWidth:50,export:true}
    , {field:'account', title:t('financials.account'), hidden:false, editComponent:tableData =>
          Autocomplete ( data, tableData ),  initialEditValue:'', width:20, minWidth:30,  maxWidth:80, align:"right", export:true}
    , {field:'costcenter', title:t('financials.costcenter'), hidden:false, editComponent:tableData=>
          Autocomplete ( data, tableData ),  initialEditValue:'', width:30, minWidth:30,  maxWidth:80, align:"right", export:true}
    , {field:'enterdate', title:t('financials.enterdate'), type:"date", align:"right", minWidth:20, width:40, maxWidth:80,
        initialEditValue:line.enterdate, dateSetting: { locale:locale } , export:true}
    , {field:'postingdate', title:t('financials.postingdate'), type:"date", align:"right", minWidth:20, width:40, maxWidth:80,
        initialEditValue:line.postingdate, dateSetting: { locale:locale } , export:true}
    , {field:'transdate', title:t('financials.transdate'), type:"date", align:"right", minWidth:20, width:40, maxWidth:80,
        initialEditValue:line.transdate, dateSetting: { locale:locale } , export:true}
    , {field:'period', title:t('financials.period'), type:"numeric", align:"right", minWidth:20, width:30, maxWidth:40, export:true}
    , {field:'posted', title:t('financials.posted'), type:"boolean", width:10, minWidth:10, maxWidth:20, export:true}
    , {field:'total', title:t('common.total'), type:"currency",currencySetting: { locale:locale
       , currencyCode:currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }, minWidth:80, maxWidth:150, export:true}
    , {field:'text', title:t('financials.text'), type:"string", minWidth:100, width:300, maxWidth:3000, export:true}
    , {field:'typeJournal', title:t('financials.type'), type:"numeric", export:true}
    , {field:'file_content', title:t('financials.file_content'), type:"numeric", export:true}
    , {field:'modelid', title:t('common.modelid'), type:"numeric", minWidth:30, maxWidth:50, export:true}
    , {field:'company', title:t('common.company'), type:"numeric", minWidth:30, maxWidth:60, export:true}
]
export const RightsColumns =(data, line, current,  t) =>  {
    return [
        {field:'roleid', title:t('role.id'), type:'numeric', minWidth:30, maxWidth:30, initialEditValue:current?current.id:-1
            , align:"left", hidden:true, editable:'never'}
        , {field:'moduleid', title:t('module.id'), type:'numeric'
        , editComponent: tableData => Autocomplete ( data, tableData),  initialEditValue:line?line.moduleid:-1
            ,   align:"left",  minWidth:100,  maxWidth:200}
        , {field:'short', title:t('userRight.short'), type:"string", initialEditValue:'',  width:10, minWidth:10,  maxWidth:20}
        , {field:'modelid', title:t('common.modelid'), type:"numeric", minWidth:30, maxWidth:50, hidden:true, export:true}
    ]}
export const Linescolumns =(data, line, current, models,  model, t, locale, currency) =>  {
    const model_ = models.find(obj => obj.id === model);
    let  debitedAccount = '';
    let  creditedAccount = '';
    if(model_?.isDebit){
        debitedAccount =  model_?.account;
    }else{
        creditedAccount =  model_?.account;
    }

    return [
    //  {field:'id', title:t('financials.line.id'), type:'numeric', minWidth:30, maxWidth:30, initialEditValue:line.id, align:"left", editable:'never'}
     {field:'transid', title:t('financials.id'), type:'numeric', hidden:true, initialEditValue:current?current.id:0,  editable:'never'}
    , {field:'account', title:t('financials.line.account'), type:'string', editComponent: tableData => Autocomplete ( data, tableData, true)
    , initialEditValue:debitedAccount, align:"left", width:30, minWidth:30,  maxWidth:450}
    , {field:'accountName', title:t('financials.line.accountName'), initialEditValue:'', hidden:false,  width:40, minWidth:30,  maxWidth:50}
    , {field:'side', title:t('financials.line.side'), type:"boolean", initialEditValue:true,  width:5, minWidth:5,  maxWidth:10,}
    , {field:'oaccount', title:t('financials.line.oaccount'), type:'string', editComponent:tableData => Autocomplete ( data, tableData, true),
        initialEditValue:creditedAccount,  width:30, minWidth:30,  maxWidth:450, align:"right"}
    , {field:'oaccountName', title:t('financials.line.oaccountName'), initialEditValue:'', hidden:false,  width:40, minWidth:40,  maxWidth:50}
    , {field:'duedate', title:t('financials.line.duedate'), type:"date", align:"right",
      initialEditValue:line.duedate, dateSetting: { locale:locale },  width:40, minWidth:50,  maxWidth:80 }
    , {field:'amount', title:t('financials.line.amount'), type:"currency", initialEditValue:0,
       currencySetting: { locale:locale, currencyCode:currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }, width:50, minWidth:30,  maxWidth:100}
    , {field:'currency', title:t('common.currency'), hidden:false,  initialEditValue:line.currency, width:10, minWidth:10,  maxWidth:50, editable:'never'}
    , {field:'text', title:t('financials.line.text'), initialEditValue:'', hidden:false,  width:300, minWidth:50,  maxWidth:3500}
  ]}
export const Options = ({
    toolbar:false,
    draggable:false,
    header:true,
    grouping:false,
    sorting:true,
    columnsButton:true,
    addRowPosition: "first",
    paging:false,
    showFirstLastPageButtons:false,
    showTitle:false,
    padding:"dense",
    filtering: false,
    search: false,
    selection: false,
    cellStyle: {padding: '0.3em', fontSize: 10,},
    headerStyle: {'padding': '0.3em',  fontSize: 10,  position: 'sticky',
        backgroundColor: theme.palette.common.black, //theme.palette.background.default, //theme.palette.background.paper,
        color: '#eee' //theme.palette.common.black//'#fff9e6'
         },
    root: {
        '&:nth-child(odd)': {
            backgroundColor: theme.palette.background.default //'#fff9e6'//theme.palette.background.default,
        },
        color: '#eee',
        padding: 0.5,
        height: 3,
        hover: true
    },

    rowStyle: rowStyle
})

export const OptionsM = ({
    toolbar:true,
    draggable:true,
   // header:true,
    grouping:false,
    sorting:true,
    columnsButton:true,
    addRowPosition: "first",
    paging:true,
    showFirstLastPageButtons:false,
    showTitle:false,
    padding:"dense",
    filtering: false,
    search: true,
    selection: true,
    columnResizable: true,
    doubleHorizontalScroll:true,
    cellStyle: {padding: '0.3em', fontSize: 10,},

    headerStyle: {padding: '0.3em', fontSize: 10,  position: 'sticky',
        //backgroundColor: theme.palette.common.black,
          backgroundColor: "#cce6ff",
        //backgroundColor: "#66ccff",
        //color:'#eee'
        color:'#000000'},
    root: {
        '&:nth-child(odd)': {
            backgroundColor: theme.palette.background.default //'#fff9e6'//theme.palette.background.default,
        },
        color: '#eee',
        padding: 0.5,
        height: 3,
        hover: true
    },

    rowStyle: rowStyle,
    exportAllData: true,
    exportButton: true,
    exportDelimiter: ',',
    //exportFileName:'Masterfile.csv'
})
export const ColumnsModule =(t) => [
    {field:'id', title:t('common.id'), export:true}
    , {field:'name', title:t("common.name"),  type:"text", export:true}
    , {field:'description', title:t('common.description'), type:"string", export:true}
    , {field:'path', title:t('module.path'), type:"string", export:true}
    , {field:'parent', title:t('module.parent'), type:"string", export:true}
    , {field:'enterdate', title:t('common.enterdate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'changedate', title:t('common.changedate'), type:"date", align:"right",dateSetting: { locale:"de" } , export:true}
    , {field:'postingdate', title:t('common.postingdate'), type:"date", align:"right",dateSetting: { locale:"de" } , export:true}
    , {field:'company', title:t('common.company'), type:"string",  export:true}
]
export const ColumnsAsset =(data, t, locale, currency) => [
    {field:'id', title:t('common.id'), export:true}
    , {field:'name', title:t("common.name"),  type:"text", export:true}
    , {field:'description', title:t('common.description'), type:"string", export:true}
    , {field:'account', title:t('common.account')
        ,  editComponent:({ value, onRowDataChange, rowData }) => ACCOUNT ( data, value, onRowDataChange, rowData, "account" )
        , width: 20, export:true}
    , {field:'oaccount', title:t('common.oaccount')
        ,  editComponent:({ value, onRowDataChange, rowData }) => OACCOUNT ( data, value, onRowDataChange, rowData, "oaccount" )
        , width: 20, export:true}
    , {field:'scrapValue', title:t('asset.scrapValue'), type:"currency", initialEditValue:0,
        currencySetting: { locale:locale, currencyCode: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    , {field:'lifeSpan', title:t('asset.lifeSpan'), type:"number",  export:true}
    , {field:'depMethod', title:t('asset.depreciation'), type:"number",  export:true}
    , {field:'rate', title:t('asset.rate'), type:"number",  export:true}
    , {field:'frequency', title:t('asset.frequency'), type:"number",  export:true}
    , {field:'enterdate', title:t('common.enterdate'), type:"date", align:"right", dateSetting: { locale:locale } , export:true}
    , {field:'changedate', title:t('common.changedate'), type:"date", align:"right",dateSetting: { locale:locale } , export:true}
    , {field:'postingdate', title:t('common.postingdate'), type:"date", align:"right",dateSetting: { locale:locale } , export:true}
    , {field:'currency', title:t("common.currency"),  type:"text", export:true}
    , {field:'company', title:t('common.company'), type:"string",  export:true}
]
export const ColumnsM =(data, t) => [
      {field:'id', title:t('common.id'), export:true}
    , {field:'name', title:t("common.name"),  type:"text", export:true}
    , {field:'description', title:t('common.description'), type:"string", export:true}
    , {field:'account', title:t('common.account')
    ,  editComponent:({ value, onRowDataChange, rowData }) => ACCOUNT ( data, value, onRowDataChange, rowData, "account" )
        , width: 20, export:true}
    , {field:'enterdate', title:t('common.enterdate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'changedate', title:t('common.changedate'), type:"date", align:"right",dateSetting: { locale:"de" } , export:true}
    , {field:'postingdate', title:t('common.postingdate'), type:"date", align:"right",dateSetting: { locale:"de" } , export:true}
    , {field:'company', title:t('common.company'), type:"string",  export:true}
]
export const ColumnsComp =(data, t) => [
     {field:'id', title:t('common.id'), export:true}
    , {field:'name', title:t("common.name"),  type:"text", export:true}
    , {field:'description', title:t('common.description'), type:"string", export:true}
    , {field:'street', title:t('common.street'), type:"string", export:true}
    , {field:'zip', title:t('common.zip'), type:"string", export:true}
    , {field:'city', title:t('common.city'), type:"string", export:true}
    , {field:'state', title:t('common.state'), type:"string", export:true}
    , {field:'bankAcc', title:t('common.bankAcc')
        ,  editComponent:({ value, onRowDataChange, rowData }) => ACCOUNT ( data, value, onRowDataChange, rowData, "account" )
        , width: 20, export:true}
    , {field:'incomeStmtAcc', title:t('common.incomeStmtAcc')
        ,  editComponent:({ value, onRowDataChange, rowData }) => ACCOUNT ( data, value, onRowDataChange, rowData, "account" )
        , width: 20, export:true}
    , {field:'cashAcc', title:t('common.cashAcc')
        ,  editComponent:({ value, onRowDataChange, rowData }) => ACCOUNT ( data, value, onRowDataChange, rowData, "account" )
        , width: 20, export:true}
    , {field:'purchasingClearingAcc', title:t('common.purchasingClearingAcc')
        ,  editComponent:({ value, onRowDataChange, rowData }) => ACCOUNT ( data, value, onRowDataChange, rowData, "account" )
        , width: 20, export:true}
    , {field:'salesClearingAcc', title:t('common.salesClearingAcc')
        ,  editComponent:({ value, onRowDataChange, rowData }) => ACCOUNT ( data, value, onRowDataChange, rowData, "account" )
        , width: 20, export:true}
    , {field:'paymentClearingAcc', title:t('common.paymentClearingAcc')
        ,  editComponent:({ value, onRowDataChange, rowData }) => ACCOUNT ( data, value, onRowDataChange, rowData, "account" )
        , width: 20, export:true}
    , {field:'settlementClearingAcc', title:t('common.settlementClearingAcc')
        ,  editComponent:({ value, onRowDataChange, rowData }) => ACCOUNT ( data, value, onRowDataChange, rowData, "account" )
        , width: 20, export:true}
    , {field:'vatCode', title:t('common.vatCode')
        ,  editComponent:({ value, onRowDataChange, rowData }) => ACCOUNT ( data, value, onRowDataChange, rowData, "account" )
        , width: 20, export:true}
    , {field:'currency', title:t("common.currency"),  type:"text", export:true}
    , {field:'tel', title:t('common.phone'), type:"text",  export:true}
    , {field:'fax', title:t('common.fax'), type:"text",  export:true}
    , {field:'email', title:t('common.email'), type:"text",  export:true}
    , {field:'locale', title:t('company.locale'), type:"text",  export:true}
    , {field:'enterdate', title:t('common.enterdate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'changedate', title:t('common.changedate'), type:"date", align:"right",dateSetting: { locale:"de" } , export:true}
    , {field:'postingdate', title:t('common.postingdate'), type:"date", align:"right",dateSetting: { locale:"de" } , export:true}
    , {field:'modelid', title:t('common.modelid'), type:"number",  export:true}
    , {field:'pageHeaderText', title:t('company.pageHeaderText'), type:"text",  export:true}
    , {field:'pageFooterText', title:t('company.pageFooterText'), type:"text",  export:true}
    , {field:'headerText', title:t('company.headerText'), type:"text",  export:true}
    , {field:'footerText', title:t('company.footerText'), type:"text",  export:true}
    , {field:'logoName', title:t('company.logoName'), type:"text",  export:true}
 ]

export const ColumnsACC =(data, t) => [
      {field:'id', title:t('common.id'), export:true}
    , {field:'name', title:t("common.name"),  type:"string", export:true}
    , {field:'description', title:t('common.description'), type:"string",  export:true}
    , {field:'isDebit', title:t('account.debit_credit'), type:"boolean", export:true}
    , {field:'balancesheet', title:t('account.balancesheet'), type:"boolean", export:true}
    , {field:'account', title:t('account.account'), type:"string"
        //editComponent:({ value, onRowDataChange, rowData }) => ACCOUNT ( data, value, onRowDataChange, rowData, "account" )
        , width: 20, export:true}
    , {field:'idebit', title:t('account.idebit'), type:"currency", initialEditValue:0,
        currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    , {field:'debit', title:t('account.debit'), type:"currency", initialEditValue:0,
        currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    , {field:'icredit', title:t('account.icredit'), type:"currency", initialEditValue:0,
        currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    , {field:'credit', title:t('account.credit'), type:"currency", initialEditValue:0,
        currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    , {field:'enterdate', title:t('common.enterdate'), type:"date", align:"right",dateSetting: { locale:"de" } , export:true}
    , {field:'changedate', title:t('common.changedate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'postingdate', title:t('common.postingdate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'company', title:t('common.company'), type:"string",  export:true}
]
export const ColumnsVAT = (data, t) => [
     {field:'id', title:t('common.id'), export:true}
    , {field:'name', title:t("common.name"),  type:"string", export:true}
    , {field:'description', title:t('common.description'), type:"string",  export:true}
    , {field:'percent', title:t('vat.percent'), type:"numeric", initialEditValue:0, minimumFractionDigits: 2
        , maximumFractionDigits: 2, export:true}
    , {field:'inputVatAccount', title:t('vat.input_account')
    ,    editComponent:({ value, onRowDataChange, rowData }) =>ACCOUNT ( data, value, onRowDataChange, rowData,"inputVatAccount" )
    , width: 20, export:true}
    , {field:'outputVatAccount', title:t('vat.output_account')
    , editComponent:({ value, onRowDataChange, rowData }) =>ACCOUNT ( data, value, onRowDataChange, rowData, "outputVatAccount" )
        , width: 20, export:true}
    , {field:'enterdate', title:t('common.enterdate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'changedate', title:t('common.changedate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'postingdate', title:t('common.postingdate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'company', title:t('common.company'), type:"string", export:true}
]

export const ColumnsBS =(t, locale, currency) => [
      {field:'id', title:t('common.id'), type:'numeric', align:"right", minWidth:10, export:true}
    , {field:'posted', title:t('bankstatement.posted'), type:"boolean", minWidth:5, export:true}
    , {field:'depositor', title:t("bankstatement.depositor"), type:"string", minWidth:10, export:true}
    , {field:'valuedate', title:t('bankstatement.valuedate'), type:"date",  align:"right", minWidth:10, export:true}
    , {field:'postingdate', title:t('common.postingdate'), type:"date",  align:"right", minWidth:10, export:true}
    , {field:'period', title:t('bankstatement.period'), type:"numeric",  align:"right", minWidth:10, export:true}
    , {field:'amount', title:t("bankstatement.amount"), type: "currency", minWidth:20, export:true
        , currencySetting: { locale:locale, currencyCode: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    , {field:'currency', title:t("common.currency"), type:"string", hidden:true, export:true}
    , {field:'postingtext', title:t("bankstatement.postingtext"), type:"string", minWidth:50, export:true}
    , {field:'purpose', title:t("bankstatement.purpose"), type:"string", minWidth:60, export:true}
    , {field:'beneficiary', title:t("bankstatement.beneficiary"), type:"string", minWidth:20,export:true}
    , {field:'accountno', title:t("bankstatement.accountno"), type:"string", minWidth:20, export:true}
    , {field:'bankCode', title:t("bankstatement.bankCode"), type:"string", minWidth:10, export:true}
    , {field:'info', title:t("bankstatement.info"), type:"string",  minWidth:40, export:true}
    , {field:'company', title:t("common.company"), type:"string", hidden:true, minWidth:5, export:true}
    , {field:'companyIban', title:t("bankstatement.companyIban"), type:"string",  minWidth:20,export:true}
]

export const ColumnsCUST =(data, t) => [
  {field:'id', title:t('common.id'), type:'numeric', align:"right", export:true}
, {field:'name', title:t('common.name'), type:"string", export:true}
, {field:'description', title:t('common.description'), type:"string", export:true}
, {field:'street', title:t('common.street'), type:"string", export:true}
, {field:'zip', title:t('common.zip'), type:"string", export:true}
, {field:'country', title:t('common.country'), type:"string", export:true}
, {field:'phone', title:t('common.phone'), type:"string", export:true}
, {field:'email', title:t('common.email'), type:"string", export:true}
, {field:'account', title:t('common.account'), type:"string", export:true}
, {field:'oaccount', title:t('common.oaccount'), type:"string", export:true}
//, {field:'iban', title:t('common.iban'), type:"string", export:true}
, {field:'vatcode', title:t('common.vatCode'), type:"string", export:true}
, {field:'enterdate', title:t('common.enterdate'), type: "date", export:true}
, {field:'postingdate', title:t('common.postingdate'), type: "date", export:true}
, {field:'changedate', title:t('common.changedate'), type: "date", export:true}
, {field:'modelid', title:t('common.modelid'), type:'numeric', align:"right", export:true}
, {field:'company', title:t('common.company'), export:true}
]
export const ColumnsUSER =(t) => [
      {field:'id', title:t('common.id'), type:'numeric', align:"right", export:true}
    , {field:'userName', title:t('user.userName'), type:"string", export:true}
    , {field:'firstName', title:t('user.firstName'), type:"string", export:true}
    , {field:'lastName', title:t('user.lastName'), type:"string", export:true}
    , {field:'hash', title:t('user.hash'), type:"string", hidden:true, export:true}
    , {field:'phone', title:t('common.phone'), type:"string", export:true}
    , {field:'email', title:t('common.email'), type:"string", export:true}
    , {field:'role', title:t('user.role'), type:"string", export:true}
    , {field:'menu', title:t('user.menu'), type:"string", export:true}
    , {field:'modelid', title:t('common.modelid'), type:'numeric', align:"right", export:true}
    , {field:'company', title:t('common.company'), export:true}
]
export const ColumnJournal=(t, locale, currency) =>[ {field:"id", title:t('common.id'), width:30, minWidth:6,  maxWidth:40, type:"numeric", export:true }
    , {field:"transid", title:t('journal.transid'), width:30, minWidth:6,  maxWidth:40, type:"numeric", export:true }
    , { field: "oid", title: t('journal.oid'), width:30, minWidth:30,  maxWidth:40,export:true }
    , {field: "account", title: t('journal.account'), minWidth:40, maxWidth:50, export:true}
    , {field: "oaccount", title:t('journal.oaccount'), minWidth:50, maxWidth:50,  export:true}
    , {field: "transdate", title:t('journal.transdate'), minWidth:50, maxWidth:60, type:"date"
        , format:(value) =>  dateFormat(value, "dd mm yy"), numeric:true}
    , {field: "postingdate", title:t('common.postingdate'), minWidth:50, maxWidth:60, type:"date"
        , format:(value) =>  dateFormat(value, "dd mm yy"), export:true}
    , {field: "enterdate", title:t('common.enterdate'), minWidth:50, maxWidth:60, type:"date"
        , format:(value) =>  dateFormat(value, "dd mm yy"), export:true}
    , {field: 'period', title:t('journal.period'), minWidth:30, maxWidth:30,  type:"numeric", export:true}
    , { field: 'amount', title: t('common.amount'), minWidth:40, maxWidth:70, type:"currency", export:true
        , currencySetting: { locale:locale, currencyCode:currency, minimumFractionDigits: 2, maximumFractionDigits: 2}}
    , { field: 'idebit', title:t('common.idebit'), minWidth:40, maxWidth:70,  type:"currency", export:true
        , currencySetting: { locale:locale, currencyCode:currency, minimumFractionDigits: 2, maximumFractionDigits: 2}}
    , { field: 'debit', title: t('common.debit'), minWidth:40, maxWidth:70,   type:"currency", export:true
    , currencySetting: { locale:locale, currencyCode: currency, minimumFractionDigits: 2, maximumFractionDigits: 2}}
    , { field: 'icredit', title:t('common.icredit'), minWidth:40, maxWidth:70,  type:"currency", export:true
    , currencySetting: { locale:locale, currencyCode: currency, minimumFractionDigits: 2, maximumFractionDigits: 2}}
    , { field: 'credit', title:t('common.credit'), minWidth:40, maxWidth:70,  type:"currency", export:true
    , currencySetting: { locale:locale, currencyCode:currency, minimumFractionDigits: 2, maximumFractionDigits: 2}}
    , { field: 'side', title:t('journal.side'), type:"boolean", format:(value) => String(value), minWidth:1}
    , { field: 'text', title:t('journal.text'), minWidth:15, export:true}
    , { id:'month', label:t('journal.month'), minWidth:20, maxWidth:20, export:true}
    , { field: 'year', title:t('journal.year'), minWidth:40, maxWidth:40, export:true}
    , { id:'company', label:t('common.company'), minWidth:20, maxWidth:20, export:true }
    , { field: 'typeJournal', title:t('journal.type'), minWidth:1, export:true}
    , { id: 'file_content', label:t('journal.file'), minWidth:1, export:true}
    , { field: 'modelid', title:t('common.modelid'), minWidth:1, export:true}]

export const ColumnsBalancesheet=(t, locale, currency) =>[{ title:t('common.id'), field: 'id', type: 'text', export:true }
    ,  { title:t('common.name'), field: 'name',type: 'text', export:true}
    ,  { title:t('account.account'), field: 'account',type: 'text',  export:true}
    ,  { title:t('common.idebit'), field: 'idebit', type: 'currency', minWidth:3, export:true
    , currencySetting: { locale:locale, currencyCode: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    ,  { title:t('common.debit'), field: 'debit' , type: 'currency', minWidth:3, export:true
    , currencySetting: { locale:locale, currencyCode: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    ,  { title:t('common.icredit'), field: 'icredit', type: 'currency', minWidth:3, export:true 
    , currencySetting: { locale:locale, currencyCode: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    ,  { title:t('common.credit'), field: 'credit' , type: 'currency', minWidth:3, export:true
    , currencySetting: { locale:locale, currencyCode: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    , { title: t('common.balance'), field: 'balance', type: 'currency', minWidth:3, export:true
    , currencySetting: { locale:locale, currencyCode:currency, minimumFractionDigits: 2, maximumFractionDigits: 2}
    , render: rowData =>rowData.isDebit?
        Number(rowData.idebit+rowData.debit-rowData.icredit-rowData.credit)
        .toLocaleString(locale, {maximumFractionDigits:2, minimumFractionDigits: 2,  style: 'currency', currency: currency }):
        Number(rowData.icredit+rowData.credit-rowData.idebit-rowData.debit)
        .toLocaleString(locale, {maximumFractionDigits:2, minimumFractionDigits: 2,  style: 'currency', currency: currency })}
   ]

export const ColumnFactory =(formid, data, t, locale, currency)=> {
    switch(formid) {
        case formEnum.ACCOUNT:
            return ColumnsACC(data, t, locale, currency);
        case formEnum.ASSET:
            return ColumnsAsset(data, t, locale, currency);
        case formEnum.BANKSTATEMENT:
            return ColumnsBS(t, locale, currency);
        case formEnum.COSTCENTER:
        case formEnum.BANK:
        case formEnum.FMODULE:
        case formEnum.ROLE:
        case formEnum.PERMISSION:
            return  ColumnsM(data, t, locale, currency);
        case formEnum.COMPANY:
            return ColumnsComp (data, t, locale, currency);
        case formEnum.PACB:
            return columnsPACB (t, locale, currency)
        case formEnum.JOURNAL:
            return ColumnJournal (t, locale, currency)
        case formEnum.CUSTOMER:
        case formEnum.SUPPLIER:
            return ColumnsCUST(data, t, locale, currency);
        case formEnum.MODULE:
            return ColumnsModule(t, locale, currency);
        case formEnum.USER:
            return ColumnsUSER(t, locale, currency);
        case formEnum.VAT:
            return ColumnsVAT(data,t, locale, currency);
        default:
            return <>NODATA</>
    }
}



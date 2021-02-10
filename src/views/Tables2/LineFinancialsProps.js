import React from 'react'
import {rowStyle, theme} from "../base/Tree/BasicTreeTableProps";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {formEnum} from "../../utils/FORMS";
import {dateFormat, formatterDE} from "../../utils/utils";


const mapping = (acc) =>
    <MenuItem key={acc.id} value={acc.id}>
        {acc.id.concat( " ").concat(acc.name)}
    </MenuItem>


export  const ACCOUNT=(data, value, onRowDataChange, rowData, fieldName) => {
    return (<Select value={value} onChange={(event) =>
        onRowDataChange({...rowData, account: event.target.value})}>
        {data.map(mapping)} id={"cb".concat(fieldName)}
    </Select>)
}

export  const ACCOUNT2=(data, value, onRowDataChange, rowData, fieldName) => {
    return (<Select value={value} onChange={(event) =>
        onRowDataChange({...rowData, oaccount: event.target.value})}>
        {data.map(mapping)} id={"cb".concat(fieldName)}
    </Select>)
}

export const  editable = (data, setData, current ) => ({
    onRowAdd: newData =>{
            const datax = JSON.parse(JSON.stringify(data));
              const index=datax.length
              datax[index] = newData;
              setData([...datax]);
              const currentx = {...current};
              const index1 = currentx.lines.length;
              currentx.lines[index1] = newData;
        },

    onRowUpdate: (newData, oldData) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                const datax = JSON.parse(JSON.stringify(data));
                const index = datax.findIndex(obj => obj.lid === newData.lid);
                datax[index] = newData;
                setData(datax);
                const currentx = {...current};
                const index1 = currentx.lines.findIndex(obj => obj.lid === newData.lid);
                currentx.lines[index1] = newData;

            }, 600);
        }),
        onRowDelete : oldData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            const dataDelete = JSON.parse(JSON.stringify(data));
            const currentx = {...current};
            const index = currentx.lines.findIndex(obj => obj.lid === oldData.lid);
            dataDelete.splice(index, 1);
            setData([...dataDelete]);
            const deleted = currentx.lines[index];
            currentx.lines[index] = {...deleted, transid:-2 };

            resolve()
          }, 1000)
        })
})
export const columnsPACB = (t) => [
      {field:'period', title:t('pac.period'),  type:"numeric", export:true }
    , {field:'idebit', title:t('common.idebit'), type:"currency", currencySetting: { locale:"de"
            , currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2}, export:true}
    , {field:'debit', title:t('common.debit'), type:"currency", currencySetting: { locale:"de"
            , currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2}, export:true}
    , {field:'icredit', title:t('common.icredit'), type:"currency", currencySetting: { locale:"de"
            , currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2}, export:true}
    , {field:'credit', title:t('common.credit'), type:"currency", currencySetting: { locale:"de"
            , currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2}, export:true}
    , {field:'balance', title:t('common.balance'), type:"currency", currencySetting: { locale:"de"
            , currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2}, export:true}
    , {field:'currency', title:t('common.currency'),   export:true }
    , { field:'company', title:t('common.company'), export:true }
]
export const columnsJ =(t) => [{field:"id", title:t('common.id'),  type:"numeric", export:true }
, {field:'transid', title:t('journal.transid'),   export:true }
, { field: 'oid', title: t('journal.oid'),  export:true }
, {field: 'account', title: t('common.account'), export:true}
, {field: 'oaccount', title:t('journal.oaccount'), export:true}
, {field: 'transdate', title:t('common.transdate'),  type:"date", align:"right",
        dateSetting: { locale:"de" }, export:true}
, {field: 'postingdate', title:t('common.postingdate'), type:"date", align:"right",
         dateSetting: { locale:"de" }, export:true}
, {field: 'enterdate', title:t('common.enterdate'), type:"date", align:"right",
         dateSetting: { locale:"de" }, export:true}
, {field: 'period', title:t('journal.period'), minWidth:1,  type:"numeric", export:true},
, { field: 'amount', title: t('journal.amount'), currencySetting: { locale:"de"
            , currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2}, export:true}
, { field: 'idebit', title:t('common.idebit'), currencySetting: { locale:"de"
    , currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2}, export:true}
, { field: 'debit', title: t('common.debit'), currencySetting: { locale:"de"
            , currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2}, export:true}
, { field: 'icredit', title:t('common.icredit'), currencySetting: { locale:"de"
            , currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2}, export:true}
, { field: 'credit', title:t('common.credit'), currencySetting: { locale:"de"
            , currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2}, export:true}
, { field: 'side', title:t('journal.side'), type:"boolean", export:true}
, { field: 'text', title:t('journal.text'), export:true}
, { field:'month', title:t('journal.month'), minWidth:1}
, { field: 'year', title:t('journal.year'), minWidth:1}
, { field:'company', title:t('common.company'), export:true }
, { field: 'typeJournal', title:t('journal.type'), export:true}
, { field: 'file_content', title:t('journal.file'), export:true}
, { field: 'modelid', title:t('common.modelid'), export:true}
]
export const columnsF =(data, line, current, t) => [
     {field:'tid', title:t('financials.id'), initialEditValue:line.id, align:"right", export:true}
    , {field:'oid', title:t('financials.oid'),initialEditValue:current.oid, align:"right", export:true}
    , {field:'account', title:t('financials.account'), hidden:false, editComponent:({ value, onRowDataChange, rowData }) =>
            ACCOUNT ( data, value, onRowDataChange, rowData, "account" ),  initialEditValue:'', width: 20
      , align:"right", export:true}
    , {field:'costcenter', title:t('financials.costcenter'), hidden:false, editComponent:({ value, onRowDataChange, rowData }) =>
            ACCOUNT ( data, value, onRowDataChange, rowData,"costcenter" ),  initialEditValue:'', width: 20
      , align:"right", export:true}
    , {field:'enterdate', title:t('financials.enterdate'), type:"date", align:"right",
        initialEditValue:line.enterdate, dateSetting: { locale:"de" } , export:true}
    , {field:'postingdate', title:t('financials.postingdate'), type:"date", align:"right",
        initialEditValue:line.postingdate, dateSetting: { locale:"de" } , export:true}
    , {field:'transdate', title:t('financials.transdate'), type:"date", align:"right",
        initialEditValue:line.transdate, dateSetting: { locale:"de" } , export:true}
    , {field:'period', title:t('financials.period'), type:"numeric", align:"right", export:true}
    , {field:'posted', title:t('financials.posted'), type:"boolean", width:10, export:true}
    , {field:'total', title:t('common.total'), type:"currency",currencySetting: { locale:"de"
       , currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }, export:true}
    , {field:'text', title:t('financials.text'), type:"string", export:true}
    , {field:'typeJournal', title:t('financials.type'), type:"numeric", export:true}
    , {field:'modelid', title:t('common.modelid'), type:"numeric", export:true}
    , {field:'company', title:t('common.company'), type:"numeric", export:true}
]
export const Linescolumns =(data, line, current, t) => [
      {field:'lid', title:t('financials.line.id'), type:'numeric', hidden:true,  initialEditValue:line.lid, editable:'never'
      ,  cellStyle: {maxWidth:5}, headerStyle: {maxWidth:5}}
    , {field:'transid', title:t('financials.id'), type:'numeric', hidden:true, initialEditValue:current.tid,  editable:'never'
    ,  cellStyle: {maxWidth:5}, headerStyle: {maxWidth:5}}
    , {field:'account', title:t('financials.line.account'), type:'string', hidden:false, editComponent:({ value, onRowDataChange, rowData }) =>
            ACCOUNT ( data, value, onRowDataChange, rowData,"account" ),  initialEditValue:'', align:"right"
      , cellStyle: {maxWidth: 40}, headerStyle: {maxWidth: 40}}
    , {field:'side', title:t('financials.line.side'), type:"boolean", initialEditValue:true,  cellStyle: {maxWidth:2}, headerStyle: {maxWidth:2}}
    , {field:'oaccount', title:t('financials.line.oaccount'), type:'string', hidden:false, editComponent:({ value, onRowDataChange, rowData }) =>
          ACCOUNT2 ( data, value, onRowDataChange, rowData, "oaccount"), initialEditValue:'',  cellStyle: {
            maxWidth: 20}, headerStyle: {maxWidth: 20} , align:"right"}
    , {field:'duedate', title:t('financials.line.duedate'), type:"date", align:"right",
      initialEditValue:line.duedate, dateSetting: { locale:"de" }, cellStyle: {maxWidth: 20}, headerStyle: {maxWidth: 20} }
    , {field:'amount', title:t('financials.line.amount'), type:"currency", initialEditValue:0,
       currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 } , width: 20}
    , {field:'text', title:t('financials.line.text'), initialEditValue:'', hidden:false, width: 300}
    , {field:'currency', title:t('common.currency'), hidden:true,  initialEditValue:line.currency, width:5, editable:'never'}
    , {field:'company', title:t('common.company'), hidden:true,  initialEditValue:line.company, width: 10, editable:'never'}
  ]
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
    header:true,
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
    , {field:'account', title:t('account.account'),
        editComponent:({ value, onRowDataChange, rowData }) => ACCOUNT ( data, value, onRowDataChange, rowData, "account" )
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

export const ColumnsBS =( data, t) => [
      {field:'bid', title:t('common.id'), type:'numeric', align:"right", export:true}
    , {field:'posted', title:t('bankstatement.posted'), type:"boolean", export:true}
    , {field:'depositor', title:t("bankstatement.depositor"), type:"string", export:true}
    , {field:'valuedate', title:t('bankstatement.valuedate'), type:"date",  align:"right", export:true}
    , {field:'postingdate', title:t('common.postingdate'), type:"date",  align:"right", export:true}
    , {field:'amount', title:t("bankstatement.amount"), type: "currency", export:true
        , currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    , {field:'currency', title:t("common.currency"), type:"string", hidden:true, export:true}
    , {field:'postingtext', title:t("bankstatement.postingtext"), type:"string", export:true}
    , {field:'purpose', title:t("bankstatement.purpose"), type:"string", export:true}
    , {field:'beneficiary', title:t("bankstatement.beneficiary"), type:"string", export:true}
    , {field:'accountno', title:t("bankstatement.accountno"), type:"string", export:true}
    , {field:'bankCode', title:t("bankstatement.bankCode"), type:"string", hidden:true, export:true}
    , {field:'info', title:t("bankstatement.info"), type:"string", hidden:true, export:true}
    , {field:'company', title:t("common.company"), type:"string", hidden:true, export:true}
    , {field:'companyIban', title:t("bankstatement.companyIban"), type:"string", hidden:true, export:true}
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
, {field:'iban', title:t('common.iban'), type:"string", export:true}
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
export const ColumnJournal=(t) =>[ {field:"id", title:t('common.id'), minWidth:2, type:"numeric", export:true }
    , {field:"transid", title:t('journal.transid'), minWidth:1, type:"numeric", export:true }
    , { field: "oid", title: t('journal.oid'), minWidth:1, type:"numeric", export:true }
    , {field: "account", title: t('journal.account'), minWidth:1, export:true}
    , {field: "oaccount", title:t('journal.oaccount'), minWidth:2, export:true}
    , {field: "transdate", title:t('journal.transdate'), minWidth:5, type:"date"
        , format:(value) =>  dateFormat(value, "dd mm yy"), numeric:true}
    , {field: "postingdate", title:t('common.postingdate'), minWidth:5, type:"date"
        , format:(value) =>  dateFormat(value, "dd mm yy"), export:true}
    , {field: "enterdate", title:t('common.enterdate'), minWidth:5, type:"date"
        , format:(value) =>  dateFormat(value, "dd mm yy"), export:true}
    , {field: 'period', title:t('journal.period'), minWidth:1, type:"numeric", export:true}
    , { field: 'amount', title: t('common.amount'), minWidth:2, type:"currency", export:true
        , currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2}}
    , { field: 'idebit', title:t('common.idebit'), minWidth:2, type:"currency", export:true
        , currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2}}
    , { field: 'debit', title: t('common.debit'), minWidth:2,  type:"currency", export:true
    , currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2}}
    , { field: 'icredit', title:t('common.icredit'), minWidth:2, type:"currency", export:true
    , currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2}}
    , { field: 'credit', title:t('common.credit'), minWidth:2, type:"currency", export:true
    , currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2}}
    , { field: 'side', title:t('journal.side'), type:"boolean", format:(value) => String(value), minWidth:1}
    , { field: 'text', title:t('journal.text'), minWidth:15, export:true}
    , { id:'month', label:t('journal.month'), minWidth:1, export:true}
    , { field: 'year', title:t('journal.year'), minWidth:1, export:true}
    , { id:'company', label:t('common.company'), minWidth:1, export:true }
    , { field: 'typeJournal', title:t('journal.type'), minWidth:1, export:true}
    , { id: 'file_content', label:t('journal.file'), minWidth:1, export:true}
    , { field: 'modelid', title:t('common.modelid'), minWidth:1, export:true}]

export const ColumnsBalancesheet=(t) =>[{ title:t('common.id'), field: 'id', type: 'text', export:true }
    ,  { title:t('common.name'), field: 'name',type: 'text', export:true}
    ,  { title:t('account.account'), field: 'account',type: 'text',  export:true}
    ,  { title:t('common.idebit'), field: 'idebit', type: 'currency', minWidth:3, export:true
    , currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    ,  { title:t('common.debit'), field: 'debit' , type: 'currency', minWidth:3, export:true
    , currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    ,  { title:t('common.icredit'), field: 'icredit', type: 'currency', minWidth:3, export:true 
    , currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    ,  { title:t('common.credit'), field: 'credit' , type: 'currency', minWidth:3, export:true
    , currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    , { title: t('common.balance'), field: 'balance', type: 'currency', minWidth:3, export:true
    , currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2}
    , render: rowData =>rowData.isDebit?
     formatterDE.format(Number(rowData.idebit+rowData.debit-rowData.icredit-rowData.credit)):
     formatterDE.format(Number(rowData.icredit+rowData.credit-rowData.idebit-rowData.debit))}
   ]

export const ColumnFactory =(formid, data, t)=> {
    switch(formid) {
        case formEnum.ACCOUNT:
            return ColumnsACC(data, t);
        case formEnum.BANKSTATEMENT:
            return ColumnsBS(data, t);
        case formEnum.COSTCENTER:
        case formEnum.BANK:
            return  ColumnsM(data, t);
        case formEnum.COMPANY:
            return ColumnsComp (data, t);
        case formEnum.PACB:
            return columnsPACB (t)
        case formEnum.JOURNAL:
            return ColumnJournal (t)
        case formEnum.CUSTOMER:
        case formEnum.SUPPLIER:
            return ColumnsCUST(data, t);
        //case formEnum.FINANCIALS:
        //    return <FormWrapper {...props} form = {FinancialsMainForm}/>;
       //     break;
        case formEnum.USER:
            return ColumnsUSER(t);
        case formEnum.VAT:
            return ColumnsVAT(data,t);
        default:
            return <>NODATA</>
    }
}



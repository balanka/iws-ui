import React from 'react'

import "react-datepicker/dist/react-datepicker.css";
import {rowStyle, theme} from "../base/Tree/BasicTreeTableProps";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
export const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 10px 30px #BBB",
    padding: 10
  },
  spacer: {
    flex: '1 1 10%',
  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  }
};

const mapping = (acc) =>
    <MenuItem key={acc.id} value={acc.id}>
        {acc.id.concat( " ").concat(acc.name)}
    </MenuItem>


export  const accountD=(data, value, onRowDataChange, rowData) => (
      <Select
          value={value}
          onChange={(event) => {
              const acc=event.target.value
              console.log("rowData" +JSON.stringify(rowData));
              console.log("ZZZZXXXX" +acc);
              console.log("ZZZZXXXXvalue" +value);
            onRowDataChange({
              ...rowData,
              account: acc,
            });
          }}
      >
        {data.map(mapping)}
      </Select>
  )
export const accountC =(data, value, onRowDataChange, rowData) => (
      <Select
          value={value}
          onChange={(event) => {
              const acc=event.target.value
              console.log('rowDataC', JSON.stringify(rowData));
              console.log('ZZZZXXXXC', acc);
              console.log('ZZZZXXXXvalueC', value);
            onRowDataChange({
              ...rowData,
              oaccount: acc,
            });
          }}
      >
        {data.map(mapping)}
      </Select>
  )

const removeTableData = (datax) => {
    const clonex = JSON.parse(JSON.stringify(datax));
    for (const element of clonex) {
        //console.log("element", element);
        delete element.tableData;
    }
    return clonex;
};

const addLine = (data, setData, current , newData) =>{
    const datax = JSON.parse(JSON.stringify(data));
    const index=datax.length
    datax[index] = newData;
    setData([...datax]);
    const currentx = {...current};
    const index1 = currentx.lines.length;
    currentx.lines[index1] = newData;
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
    /*
    onBulkUpdate: (changes) =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                const updatedData = [...this.state.data];
                Object.keys(changes).map(
                    (rowId) => (updatedData[rowId] = changes[rowId].newData)
                );
                this.setState({
                    data: updatedData
                });
                resolve();
            }, 1000);
        }),

     */
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

export const columnsF =(data, line, current, t) => [
     {field:'tid', title:t('financials.id'), hidden:false,  initialEditValue:line.id}
    , {field:'oid', title:t('financials.oiid'), hidden:false, initialEditValue:current.oid}
    , {field:'account', title:t('financials.account'), hidden:false, editComponent:({ value, onRowDataChange, rowData }) =>
            accountD ( data, value, onRowDataChange, rowData ),  initialEditValue:'', width: 20}
    , {field:'costcenter', title:t('financials.costcenter'), hidden:false, editComponent:({ value, onRowDataChange, rowData }) =>
            accountD ( data, value, onRowDataChange, rowData ),  initialEditValue:'', width: 20}
    , {field:'enterdate', title:t('financials.enterdate'), type:"date", align:"right",
        initialEditValue:line.enterdate, dateSetting: { locale:"de" } }
    , {field:'postingdate', title:t('financials.postingdate'), type:"date", align:"right",
        initialEditValue:line.postingdate, dateSetting: { locale:"de" } }
    , {field:'transdate', title:t('financials.transdate'), type:"date", align:"right",
        initialEditValue:line.transdate, dateSetting: { locale:"de" } }
    , {field:'period', title:t('financials.period'), type:"numeric", export:true}
    , {field:'posted', title:t('financials.posted'), type:"boolean", width:10}
    , {field:'text', title:t('financials.text'), type:"text", export:true}
    , {field:'typeJournal', title:t('financials.type'), type:"numeric", export:true}
    , {field:'model', title:t('common.modelid'), type:"numeric", export:true}
    , {field:'company', title:t('common.company'), type:"numeric", export:true}
    //, {field:'amount', title:t('financials.line.amount'), type:"currency", initialEditValue:0,
    //    currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    //, {field:'currency', title:t('common.currency'), hidden:false,  initialEditValue:line.currency}
]
export const Linescolumns =(data, line, current, t) => [
      {field:'lid', title:t('financials.line.id'), hidden:false,  initialEditValue:line.lid}
    , {field:'transid', title:"transid", hidden:false, initialEditValue:current.tid}
    , {field:'account', title:t('financials.line.account'), hidden:false, editComponent:({ value, onRowDataChange, rowData }) =>
          accountD ( data, value, onRowDataChange, rowData ),  initialEditValue:'', width: 20}
    , {field:'side', title:t('financials.line.side'), type:"boolean", initialEditValue:true, width:10}
    , {field:'oaccount', title:t('financials.line.oaccount'), hidden:false, editComponent:({ value, onRowDataChange, rowData }) =>
          accountC ( data, value, onRowDataChange, rowData ), initialEditValue:'', width: 20}
    , {field:'duedate', title:t('financials.line.duedate'), type:"date", align:"right",
      initialEditValue:line.duedate,
      dateSetting: { locale:"de" } }
    , {field:'amount', title:t('financials.line.amount'), type:"currency", initialEditValue:0,
       currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    , {field:'text', title:t('financials.line.text'), initialEditValue:'', hidden:false, width: 300}
    , {field:'currency', title:t('common.currency'), hidden:false,  initialEditValue:line.currency}
    , {field:'company', title:t('common.company'), hidden:false,  initialEditValue:line.company}
  ]
export const Options = ({
    toolbar:true,
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
    headerStyle: {padding: '0.3em', fontSize: 10,  position: 'sticky'},
    root: {
        '&:nth-child(odd)': {
            backgroundColor: '#fff9e6'//theme.palette.background.default,
        },
        color: '#eee',
        padding: 0.5,
        height: 3,
        hover: true
    },

    rowStyle: rowStyle
})

export const ColumnsM =(data, line, current, t) => [
      {field:'id', title:t('costcenter.id'), export:true}
    , {field:'name', title:t("costcenter.name"), initialEditValue:line.name, type: "text", export:true}
    , {field:'description', title:t('costcenter.description'), type:"text", initialEditValue:line.description, export:true}
    , {field:'account', title:t('costcenter.account'), editComponent:({ value, onRowDataChange, rowData }) =>
            accountD ( data, value, onRowDataChange, rowData ), width: 20, export:true}
    , {field:'enterdate', title:t('costcenter.enterdate'), type:"date", align:"right",
        initialEditValue:line.enterdate,
        dateSetting: { locale:"de" } , export:true}
    , {field:'changedate', title:t('costcenter.changedate'), type:"date", align:"right",
        initialEditValue:line.changedate,
        dateSetting: { locale:"de" } , export:true}
    , {field:'postingdate', title:t('costcenter.postingdate'), type:"date", align:"right",
        initialEditValue:line.postingdate,
        dateSetting: { locale:"de" } , export:true}

    , {field:'company', title:t('common.company'), type:"text", initialEditValue:line.company, export:true}

]
export const ColumnsACC =(data, line, current, t) => [
      {field:'id', title:t('account.id'), export:true}
    , {field:'name', title:t("account.name"), initialEditValue:line.name, type: "text", export:true}
    , {field:'description', title:t('account.description'), type:"text", initialEditValue:line.description, export:true}
    , {field:'isDebit', title:t('account.debit_credit'), type:"boolean", export:true}
    , {field:'balancesheet', title:t('account.balancesheet'), type:"boolean", export:true}
    , {field:'account', title:t('account.account'), editComponent:({ value, onRowDataChange, rowData }) =>
            accountD ( data, value, onRowDataChange, rowData ), width: 20, export:true}
    , {field:'idebit', title:t('account.idebit'), type:"currency", initialEditValue:0,
        currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    , {field:'debit', title:t('account.debit'), type:"currency", initialEditValue:0,
        currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    , {field:'icredit', title:t('account.icredit'), type:"currency", initialEditValue:0,
        currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    , {field:'credit', title:t('account.credit'), type:"currency", initialEditValue:0,
        currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}

    , {field:'enterdate', title:t('account.enterdate'), type:"date", align:"right",
        initialEditValue:line.enterdate,
        dateSetting: { locale:"de" } , export:true}
    , {field:'changedate', title:t('account.changedate'), type:"date", align:"right",
        initialEditValue:line.changedate,
        dateSetting: { locale:"de" } , export:true}
    , {field:'postingdate', title:t('account.postingdate'), type:"date", align:"right",
        initialEditValue:line.postingdate,
        dateSetting: { locale:"de" } , export:true}

    , {field:'company', title:t('common.company'), type:"text", initialEditValue:line.company, export:true}
]
export const ColumnsV =(data, line, current, t) => [
    {field:'id', title:t('vat.id'), export:true}
    , {field:'name', title:t("vat.name"), initialEditValue:line.name, type: "text", export:true}
    , {field:'description', title:t('vat.description'), type:"text", initialEditValue:line.description, export:true}
    , {field:'percent', title:t('vat.percent'), type:"numeric", initialEditValue:0, minimumFractionDigits: 2
        , maximumFractionDigits: 2, export:true}
    , {field:'inputVatAccount', title:t('vat.input_account'), editComponent:({ value, onRowDataChange, rowData }) =>
            accountD ( data, value, onRowDataChange, rowData ), width: 20, export:true}
    , {field:'outputVatAccount', title:t('vat.output_account'), editComponent:({ value, onRowDataChange, rowData }) =>
            accountD ( data, value, onRowDataChange, rowData ), width: 20, export:true}
    , {field:'enterdate', title:t('vat.enterdate'), type:"date", align:"right",
        initialEditValue:line.enterdate,
        dateSetting: { locale:"de" } , export:true}
    , {field:'changedate', title:t('vat.changedate'), type:"date", align:"right",
        initialEditValue:line.changedate,
        dateSetting: { locale:"de" } , export:true}
    , {field:'postingdate', title:t('vat.postingdate'), type:"date", align:"right",
        initialEditValue:line.postingdate,
        dateSetting: { locale:"de" } , export:true}

    , {field:'company', title:t('common.company'), type:"text", initialEditValue:line.company, export:true}
]

export const ColumnsBS =(data, line, current, t) => [
      {field:'bid', title:t('bankstatement.id'), type:'numeric', align:"right", export:true}
    , {field:'depositor', title:t("bankstatement.depositor"), type: "text", export:true}
    , {field:'valuedate', title:t('bankstatement.valuedate'), type:"date",  align:"right", export:true}
    , {field:'postingdate', title:t('bankstatement.postingdate'), type:"date",  align:"right", export:true}
    , {field:'postingtext', title:t("bankstatement.postingtext"), type: "text", export:true}
    , {field:'purpose', title:t("bankstatement.purpose"), type: "text", export:true}
    , {field:'beneficiary', title:t("bankstatement.beneficiary"), type: "text", export:true}
    , {field:'accountno', title:t("bankstatement.accountno"), type: "text", export:true}
    , {field:'bankCode', title:t("bankstatement.bankCode"), type: "text", export:true}
    , {field:'amount', title:t("bankstatement.amount"), type: "currency", export:true}
    , {field:'currency', title:t("common.currency"), type: "text", export:true}
    , {field:'info', title:t("bankstatement.info"), type: "text", export:true}
    , {field:'company', title:t("common.company"), type: "text", export:true}
    , {field:'companyIban', title:t("bankstatement.companyIban"), type: "text", export:true}
    , {field:'posted', title:t('bankstatement.posted'), type:"boolean", export:true}
]

export const ColumnsCUST =(data, line, current, t) => [
  {field:'id', title:t('customer.id'), type:'numeric', align:"right", export:true}
, {field:'name', title:t('customer.name'), type: "text", export:true}
, {field:'description', title:t('customer.description'), type: "text", export:true}
, {field:'street', title:t('customer.street'), type: "text", export:true}
, {field:'zip', title:t('customer.zip'), type: "text", export:true}
, {field:'country', title:t('customer.country'), type: "text", export:true}
, {field:'phone', title:t('customer.phone'), type: "text", export:true}
, {field:'email', title:t('customer.email'), type: "text", export:true}
, {field:'account', title:t('customer.account'), type: "text", export:true}
, {field:'oaccount', title:t('customer.oaccount'), type: "text", export:true}
, {field:'iban', title:t('customer.iban'), type: "text", export:true}
, {field:'vatcode', title:t('customer.vat'), type: "text", export:true}
, {field:'enterdate', title:t('customer.enterdate'), type: "date", export:true}
, {field:'postingdate', title:t('customer.postingdate'), type: "date", export:true}
, {field:'changedate', title:t('customer.changedate'), type: "date", export:true}
, {field:'modelid', title:t('common.modelid'), type:'numeric', align:"right", export:true}
, {field:'company', title:t('common.company'), export:true}
]
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
        cellStyle: {padding: '0.3em', fontSize: 10,},
        headerStyle: {padding: '0.3em', fontSize: 10,  position: 'sticky'},
        root: {
         '&:nth-child(odd)': {
            backgroundColor: '#fff9e6'//theme.palette.background.default,
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
    exportFileName:'Masterfile.csv'
})



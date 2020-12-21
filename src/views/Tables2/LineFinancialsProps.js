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

export const  editable = (data, setData, current ) => ({
    onRowAdd: newData =>
        new Promise((resolve, reject) => {
            const datax = JSON.parse(JSON.stringify(data));
          setTimeout(() => {
              const index=datax.length
              datax[index] = newData;
              setData(datax);
              const currentx = {...current};
              const index1 = currentx.lines.length;
              currentx.lines[index1] = newData;
            resolve();
          }, 600)
        }),

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
    toolbar:false,
    draggable:true,
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

    , {field:'company', title:t('costcenter.company'), type:"text", initialEditValue:line.company, export:true}

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
    , {field:'icredit', title:t('account.icrebit'), type:"currency", initialEditValue:0,
        currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    , {field:'credit', title:t('account.crebit'), type:"currency", initialEditValue:0,
        currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}

    , {field:'enterdate', title:t('vat.enterdate'), type:"date", align:"right",
        initialEditValue:line.enterdate,
        dateSetting: { locale:"de" } , export:true}
    , {field:'changedate', title:t('vat.changedate'), type:"date", align:"right",
        initialEditValue:line.changedate,
        dateSetting: { locale:"de" } , export:true}
    , {field:'postingdate', title:t('vat.postingdate'), type:"date", align:"right",
        initialEditValue:line.postingdate,
        dateSetting: { locale:"de" } , export:true}

    , {field:'company', title:t('vat.company'), type:"text", initialEditValue:line.company, export:true}

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

    , {field:'company', title:t('vat.company'), type:"text", initialEditValue:line.company, export:true}

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



import React from 'react'

import "react-datepicker/dist/react-datepicker.css";
import {rowStyle, theme} from "../base/Tree/BasicTreeTableProps";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {string} from "prop-types";
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


export const  editable = (current, setCurrent, setData ) => ({
    onRowAdd: newData =>
        new Promise((resolve, reject) => {
            console.log('newData', JSON.stringify(newData))
            console.log('currentN', current);
          setTimeout(() => {
              const currentx = {...current};
              const index=currentx.lines.length
              currentx.lines[index] = newData;
              setCurrent({...currentx});
              console.log('currentX', currentx);
            resolve();
          }, 1000)
        }),

        onRowUpdate: (newData, oldData) =>{
        new Promise((resolve, reject) => {
          console.log('newData', JSON.stringify(newData))
          console.log('oldData', JSON.stringify(oldData))
          setTimeout(() => {
            const currentx = {...current};
            const index = currentx.lines.findIndex(obj => obj.lid === newData.lid);
            currentx.lines[index] = newData;
            console.log('currentxX', currentx)
            setCurrent({...currentx});
            //console.log('currentxXX', current)
            resolve()
          }, 1000)
        })},
        onRowDelete : oldData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            const dataDelete = [...current.lines];
            const index = oldData.tableData.id;
            dataDelete.splice(index, 1);
            setData([...dataDelete]);
            resolve()
          }, 1000)
        })
})

export const Linescolumns =(data, line, current, t) => [
      {field:'lid', title:t('financials.line.id'), hidden:false,  initialEditValue:-1}
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



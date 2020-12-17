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
            onRowDataChange({
              ...rowData,
              account: (event.target.value)
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
            onRowDataChange({
              ...rowData,
              oaccount: (event.target.value)
            });
          }}
      >
        {data.map(mapping)}
      </Select>
  )


export const  editable = (current, setCurrent, setData ) => ({
   /* onRowAdd: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
           // setData([...current, newData]);

            resolve();
          }, 1000)
        }),

    */
        onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          console.log('newData', newData)
          console.log('oldData', oldData)
          setTimeout(() => {
            const currentx = {...current};
            const index = currentx.lines.findIndex(obj => obj.lid === newData.lid);
            currentx.lines[index] = newData;
            console.log('currentxX', currentx)
            setCurrent({...currentx});
            //console.log('currentxXX', current)
            resolve()
          }, 1000)
        }),
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
      {field:'lid', title:t('financials.line.id'), hidden:true}
    , {field:'transid', title:"transid", hidden:true, initialEditValue:current.tid}
    , {field:'account', title:t('financials.line.account'), editComponent:({ value, onRowDataChange, rowData }) =>
          accountD ( data, value, onRowDataChange, rowData ), width: 20}
    , {field:'side', title:t('financials.line.side'), type:"boolean", initialEditValue:true, width:10}
    , {field:'oaccount', title:t('financials.line.oaccount'), editComponent:({ value, onRowDataChange, rowData }) =>
          accountC ( data, value, onRowDataChange, rowData ), width: 20}
    , {field:'duedate', title:t('financials.line.duedate'), type:"date", align:"right",
      initialEditValue:line.duedate,
      dateSetting: { locale:"de" } }
    , {field:'amount', title:t('financials.line.amount'), type:"currency",
       currencySetting: { locale:"de", currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    , {field:'text', title:t('financials.line.text'), width: 300}
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



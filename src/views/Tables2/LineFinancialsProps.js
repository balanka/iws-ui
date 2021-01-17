import React from 'react'
import {styles, rowStyle, theme} from "../base/Tree/BasicTreeTableProps";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "react-fast-grid";
import {IoMdMenu} from "react-icons/io/index";
import {CBadge, CButton, CCol, CCollapse, CFormGroup, CInput, CLabel, CSelect, CTextarea} from "@coreui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {formEnum} from "../../utils/FORMS";
import {currencyAmountFormatDE, currencyFormatDE} from '../../utils/utils'
import {
    faAngleDoubleDown,
    faAngleDoubleUp, faPlusCircle,
    faPlusSquare,
    faSave,
    faSpinner,
    faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import {dateFormat} from "../../utils/utils";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { blue, green } from "@material-ui/core/colors";
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';


const svgIcons= {
     plus:"M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm-4 20h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z"
    , delete:"M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z"
    , delete4ever:"M12 38c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V14H12v24zm4.93-14.24l2.83-2.83L24 25.17l4.24-4.24 2.83 2.83L26.83 28l4.24 4.24-2.83 2.83L24 30.83l-4.24 4.24-2.83-2.83L21.17 28l-4.24-4.24zM31 8l-2-2H19l-2 2h-7v4h28V8z"
    , copyRight:"M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm-3.84-18.27c.11-.65.31-1.23.6-1.74s.69-.92 1.18-1.23c.47-.29 1.06-.45 1.79-.46.48.01.92.09 1.3.26.41.18.75.42 1.04.72s.51.66.67 1.06.25.83.27 1.28h3.58c-.03-.94-.22-1.8-.55-2.58s-.81-1.45-1.41-2.02-1.32-1-2.16-1.31-1.77-.47-2.79-.47c-1.3 0-2.43.22-3.39.67s-1.76 1.06-2.4 1.84-1.12 1.68-1.43 2.71-.46 2.12-.46 3.27v.55c0 1.16.16 2.25.47 3.28s.79 1.93 1.43 2.7 1.44 1.38 2.41 1.83 2.1.67 3.4.67c.94 0 1.82-.15 2.64-.46s1.54-.73 2.16-1.27 1.12-1.16 1.48-1.88.57-1.48.6-2.3h-3.58c-.02.42-.12.8-.3 1.16s-.42.66-.72.91-.65.45-1.05.59c-.38.13-.78.2-1.21.2-.72-.02-1.31-.17-1.79-.47-.5-.32-.9-.73-1.19-1.24s-.49-1.09-.6-1.75-.15-1.3-.15-1.97v-.55c0-.68.05-1.35.16-2z"
    , copyContent:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
    , clearAll:"M10 26h28v-4H10v4zm-4 8h28v-4H6v4zm8-20v4h28v-4H14z"
    , libraryAdd:"M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"
    , checkCircle:"M24 4C12.95 4 4 12.95 4 24c0 11.04 8.95 20 20 20 11.04 0 20-8.96 20-20 0-11.05-8.96-20-20-20zm-4 30L10 24l2.83-2.83L20 28.34l15.17-15.17L38 16 20 34z"
    , highlightRemove:"M29.17 16L24 21.17 18.83 16 16 18.83 21.17 24 16 29.17 18.83 32 24 26.83 29.17 32 32 29.17 26.83 24 32 18.83 29.17 16zM24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z"
    , highlightOff:"M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
    , doneAll:"M36 14l-2.83-2.83-12.68 12.69 2.83 2.83L36 14zm8.49-2.83L23.31 32.34 14.97 24l-2.83 2.83L23.31 38l24-24-2.82-2.83zM.83 26.83L12 38l2.83-2.83L3.66 24 .83 26.83z"
    , done:"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
    , swapVertCircle:"M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"
    , addCircleOutline:"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
    , addBox:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
    , save:"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"
}

function IwsIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d={props.d} />
        </SvgIcon>
    );
}


    const mappingMenu = (acc) =>
    <MenuItem key={acc.id} value={acc.id}>
        {acc.id.concat( " ").concat(acc.name)}
    </MenuItem>
const mappingMenuName = (acc) =>
    <MenuItem key={acc.id} value={acc.id}>
        {acc.name.concat( " ").concat(acc.id)}
    </MenuItem>
const mapping = (acc) =>
    <MenuItem key={acc.id} value={acc.id}>
        {acc.id.concat( " ").concat(acc.name)}
    </MenuItem>

  const mappingSelect = (item) => <option key={item.id} value={item.id}>
    {item.id+ " ".concat (item.name)}</option>;

const mappingSelectName = (item) => <option key={item.id} value={item.id}>
    {item.name+ " ".concat (item.id)}</option>;
export const  filter = (rows, cols, txt,) => rows.filter(col =>
    cols.map(name => `col.${name}`.includes(txt)).reduce((a, b = false) => a || b)
);

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
/*
<Select
    labelId="demo-customized-select-label"
    id="demo-customized-select"
    value={age}
    onChange={handleChange}
    input={<BootstrapInput />}
>
    <MenuItem value="">
        <em>None</em>
    </MenuItem>
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
</Select>

 */
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
export const columnsJ =(t) => [{field:"id", title:t('journal.id'),  type:"numeric", export:true }
, {field:'transid', title:t('journal.transid'),   export:true }
, { field: 'oid', title: t('journal.oid'),  export:true }
, {field: 'account', title: t('journal.account'), export:true}
, {field: 'oaccount', title:t('journal.oaccount'), export:true}
, {field: 'transdate', title:t('journal.transdate'),  type:"date", align:"right",
        dateSetting: { locale:"de" }, export:true}
, {field: 'postingdate', title:t('journal.postingdate'), type:"date", align:"right",
         dateSetting: { locale:"de" }, export:true}
, {field: 'enterdate', title:t('journal.enterdate'), type:"date", align:"right",
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
      {field:'id', title:t('costcenter.id'), export:true}
    , {field:'name', title:t("costcenter.name"),  type:"text", export:true}
    , {field:'description', title:t('costcenter.description'), type:"string", export:true}
    , {field:'account', title:t('costcenter.account')
    ,  editComponent:({ value, onRowDataChange, rowData }) => ACCOUNT ( data, value, onRowDataChange, rowData, "account" )
        , width: 20, export:true}
    , {field:'enterdate', title:t('costcenter.enterdate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'changedate', title:t('costcenter.changedate'), type:"date", align:"right",dateSetting: { locale:"de" } , export:true}
    , {field:'postingdate', title:t('costcenter.postingdate'), type:"date", align:"right",dateSetting: { locale:"de" } , export:true}
    , {field:'company', title:t('common.company'), type:"string",  export:true}

]
export const ColumnsComp =(data, t) => [
     {field:'id', title:t('company.id'), export:true}
    , {field:'name', title:t("company.name"),  type:"text", export:true}
    , {field:'description', title:t('company.description'), type:"string", export:true}
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
      {field:'id', title:t('account.id'), export:true}
    , {field:'name', title:t("account.name"),  type:"string", export:true}
    , {field:'description', title:t('account.description'), type:"string",  export:true}
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
    , {field:'enterdate', title:t('account.enterdate'), type:"date", align:"right",dateSetting: { locale:"de" } , export:true}
    , {field:'changedate', title:t('account.changedate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'postingdate', title:t('account.postingdate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'company', title:t('common.company'), type:"string",  export:true}
]
export const ColumnsVAT = (data, t) => [
    {field:'id', title:t('vat.id'), export:true}
    , {field:'name', title:t("vat.name"),  type:"string", export:true}
    , {field:'description', title:t('vat.description'), type:"string",  export:true}
    , {field:'percent', title:t('vat.percent'), type:"numeric", initialEditValue:0, minimumFractionDigits: 2
        , maximumFractionDigits: 2, export:true}
    , {field:'inputVatAccount', title:t('vat.input_account')
    ,    editComponent:({ value, onRowDataChange, rowData }) =>ACCOUNT ( data, value, onRowDataChange, rowData,"inputVatAccount" )
    , width: 20, export:true}
    , {field:'outputVatAccount', title:t('vat.output_account')
    , editComponent:({ value, onRowDataChange, rowData }) =>ACCOUNT ( data, value, onRowDataChange, rowData, "outputVatAccount" )
        , width: 20, export:true}
    , {field:'enterdate', title:t('vat.enterdate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'changedate', title:t('vat.changedate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'postingdate', title:t('vat.postingdate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'company', title:t('common.company'), type:"string", export:true}
]

export const ColumnsBS =( data, t) => [
      {field:'bid', title:t('bankstatement.id'), type:'numeric', align:"right", export:true}
    , {field:'posted', title:t('bankstatement.posted'), type:"boolean", export:true}
    , {field:'depositor', title:t("bankstatement.depositor"), type:"string", export:true}
    , {field:'valuedate', title:t('bankstatement.valuedate'), type:"date",  align:"right", export:true}
    , {field:'postingdate', title:t('bankstatement.postingdate'), type:"date",  align:"right", export:true}
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
  {field:'id', title:t('customer.id'), type:'numeric', align:"right", export:true}
, {field:'name', title:t('customer.name'), type:"string", export:true}
, {field:'description', title:t('customer.description'), type:"string", export:true}
, {field:'street', title:t('customer.street'), type:"string", export:true}
, {field:'zip', title:t('customer.zip'), type:"string", export:true}
, {field:'country', title:t('customer.country'), type:"string", export:true}
, {field:'phone', title:t('customer.phone'), type:"string", export:true}
, {field:'email', title:t('customer.email'), type:"string", export:true}
, {field:'account', title:t('customer.account'), type:"string", export:true}
, {field:'oaccount', title:t('customer.oaccount'), type:"string", export:true}
, {field:'iban', title:t('customer.iban'), type:"string", export:true}
, {field:'vatcode', title:t('customer.vat'), type:"string", export:true}
, {field:'enterdate', title:t('customer.enterdate'), type: "date", export:true}
, {field:'postingdate', title:t('customer.postingdate'), type: "date", export:true}
, {field:'changedate', title:t('customer.changedate'), type: "date", export:true}
, {field:'modelid', title:t('common.modelid'), type:'numeric', align:"right", export:true}
, {field:'company', title:t('common.company'), export:true}
]
export const pacHeaders = (t) =>[ {id:'period', label:t('pac.period'), minWidth:1, numeric:true }
, { id: 'idebit', label:t('pac.idebit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
, { id: 'debit', label:t('pac.debit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
, { id: 'icredit', label:t('pac.icredit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
, { id: 'credit', label:t('pac.credit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
, { id: 'balance', label:t('pac.balance'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
, { id: 'currency', label:t('common.currency'), minWidth:1}
]
export const JournalHeaders=(t) =>[ {id:"id", label:t('journal.id'), minWidth:2, numeric:true }
    , {id:"transid", label:t('journal.transid'), minWidth:1, numeric:true }
    , { id: "oid", label: t('journal.oid'), minWidth:1, numeric:true }
    , {id: "account", label: t('journal.account'), minWidth:1}
    , {id: "oaccount", label:t('journal.oaccount'), minWidth:2}
    , {id: "transdate", label:t('journal.transdate'), minWidth:5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
    , {id: "postingdate", label:t('journal.postingdate'), minWidth:5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
    , {id: "enterdate", label:t('journal.enterdate'), minWidth:5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
    , {id: 'period', label:t('journal.period'), minWidth:1, numeric:true},
    , { id: 'amount', label: t('journal.amount'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
    , { id: 'idebit', label:t('journal.idebit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
    , { id: 'debit', label: t('journal.debit'), minWidth:2,  numeric:true, format: (value) => currencyFormatDE(Number(value))}
    , { id: 'icredit', label:t('journal.icredit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
    , { id: 'credit', label:t('journal.credit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
    , { id: 'side', label:t('journal.side'), numeric:true, format:(value) => String(value), minWidth:1}
    , { id: 'text', label:t('journal.text'), minWidth:15}, { id:'month', label:t('journal.month'), minWidth:1}
    , { id: 'year', label:t('journal.year'), minWidth:1}, { id:'company', label:t('common.company'), minWidth:1 }
    , { id: 'typeJournal', label:t('journal.type'), minWidth:1}, { id: 'file_content', label:t('journal.file'), minWidth:1}
    , { id: 'modelid', label:t('common.modelid'), minWidth:1}]

export const balanceHeaders=(t) =>[ {id:'id', label:t('balancesheet.id'), minWidth:1}
    , {id:'name', label:t('balancesheet.name'), minWidth:8}
    , {id:'account', label:t('balancesheet.account')}
    , { id: 'idebit', label: t('balancesheet.idebit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
    , { id: 'debit', label: t('balancesheet.debit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
    , { id: 'icredit', label: t('balancesheet.icedit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
    , { id: 'credit', label:t('balancesheet.credit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
    ]
export const treeHeaders=(t) =>[{ title:t('account.id'), field: 'id' }
    ,  { title:t('account.name'), field: 'name' }
    ,  { title:t('account.account'), field: 'account' }
    ,  { title:t('balancesheet.idebit'), field: 'idebit', type: 'numeric', minWidth:3 }
    ,  { title:t('balancesheet.debit'), field: 'debit' , type: 'numeric', minWidth:3}
    ,  { title:t('balancesheet.icredit'), field: 'icredit', type: 'numeric', minWidth:3 }
    ,  { title:t('balancesheet.credit'), field: 'credit' , type: 'numeric', minWidth:3}
   ]
export const CommonFormHead = (props) => {
    const {styles, title, collapse,  initAdd, cancelEdit, submitEdit, submitQuery, submitPost, toggle, toggleToolbar} = props
    return (
        <Grid container spacing={2} justify="space-between" style={{...styles.inner}} direction="column" >
            <Grid container justify="space-between">
                <Grid container xs spacing={1} justify="flex-start" >
                    <Grid item justify="center" alignItems="center">
                        <IoMdMenu />
                    </Grid>
                    <Grid item><h5><CBadge color="primary">{title}</CBadge></h5></Grid>
                    <Grid  container xs spacing={1} justify="flex-end" alignItems="right">
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => cancelEdit(e)}>
                                <FontAwesomeIcon icon={faWindowClose} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className = "card-header-action btn-minimize" onClick={initAdd}>
                                <FontAwesomeIcon icon={faPlusSquare} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => submitEdit(e)}>
                                <FontAwesomeIcon icon={faSave} />
                            </CButton>
                        </div>
                        <div>
                            <CButton block color="link" type="submit"  className="card-header-action btn-minimize" onClick={event => {
                                event.preventDefault();submitQuery(event)}}>
                                <FontAwesomeIcon icon={faSpinner} rotation={90}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                                <FontAwesomeIcon icon={collapse?faAngleDoubleUp:faAngleDoubleDown} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={toggleToolbar}>
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </CButton>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>);
}
export const BSFormHead = (props) => {
    const {styles, title, collapse,  initAdd, cancelEdit, submitEdit, submitQuery, submitPost, toggle, toggleToolbar} = props
    return (
        <Grid container spacing={2} justify="space-between" style={{...styles.inner}} direction="column" >
            <Grid container justify="space-between">
                <Grid container xs spacing={1} justify="flex-start" >
                    <Grid item justify="center" alignItems="center">
                        <IoMdMenu />
                    </Grid>
                    <Grid item><h5><CBadge color="primary">{title}</CBadge></h5></Grid>
                    <Grid  container xs spacing={1} justify="flex-end" alignItems="right">
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => submitPost(e)}>
                                <FontAwesomeIcon icon={faWindowClose} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className = "card-header-action btn-minimize" onClick={initAdd}>
                                <FontAwesomeIcon icon={faPlusSquare} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => submitEdit(e)}>
                                <FontAwesomeIcon icon={faSave} />
                            </CButton>
                        </div>
                        <div>
                            <CButton block color="link" type="submit"  className="card-header-action btn-minimize" onClick={event => {
                                event.preventDefault();submitQuery(event)}}>
                                <FontAwesomeIcon icon={faSpinner} rotation={90}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                                <FontAwesomeIcon icon={collapse?faAngleDoubleUp:faAngleDoubleDown} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={toggleToolbar}>
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </CButton>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>);
}
export const FinancialsFormHead = (props) => {
    const {styles, title, collapse, module, modules, initAdd, onNewLine, cancelEdit, submitEdit, submitQuery, toggle
        , submitCopy, submitPost, handleModuleChange, toggleToolbar} = props
    return (
        <Grid container spacing={2} justify="space-between" style={{...styles.inner}} direction="column" >
            <Grid container justify="space-between">
                <Grid container xs spacing={1} justify="flex-start">
                    <Grid item justify="center" alignItems="center">
                        <IoMdMenu />
                    </Grid>
                    <Grid item><h5><CBadge color="primary">{title}</CBadge></h5></Grid>
                    <Grid  container xs spacing={1} justify="flex-end" alignItems="right">
                        <div className="card-header-actions" style={{  align: 'right' }}>
                           <CSelect className ="input-sm" type="select" name="module" id="module-id"
                                 value={module}  onChange ={handleModuleChange} style={{ height:30}}>
                               <option value={module} selected >{module}</option>
                                {modules.map(item => mappingSelect(item))};
                           </CSelect>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={toggleToolbar}>
                                <IwsIcon  style ={{...styles.imageIcon}} d={svgIcons.swapVertCircle} style={{ color: green[500] }}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton  className="card-header-action btn-minimize" onClick={submitCopy}>
                                <IwsIcon  style ={{...styles.imageIcon}} d={svgIcons.copyContent} style={{ color: green[500] }}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton  className="card-header-action btn-minimize" onClick={onNewLine}>
                                <IwsIcon  style ={{...styles.imageIcon}} d={svgIcons.libraryAdd} style={{ color: green[500] }}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => cancelEdit(e)}>
                                <IwsIcon  style ={{...styles.imageIcon}} d={svgIcons.highlightOff} style={{ color: green[500] }}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={initAdd}>
                                <IwsIcon  style ={{...styles.imageIcon}} d={svgIcons.addCircleOutline} style={{ color: green[500] }}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => submitEdit(e)}>
                                <IwsIcon  style ={{...styles.imageIcon}} d={svgIcons.save} style={{ color: green[500] }}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                                <FontAwesomeIcon icon={collapse?faAngleDoubleUp:faAngleDoubleDown} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton  className="card-header-action btn-minimize" onClick={submitPost}>
                                <IwsIcon  style ={{...styles.imageIcon}} d={svgIcons.done} style={{ color: green[500] }}/>
                            </CButton>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>);
}
export const JournalFormHead = (props) => {
    const {styles, title, collapse,  load, cancelEdit, submitEdit, submitQuery, toggle, toggleToolbar} = props
    return (
        <Grid container spacing={2} justify="space-between" style={{...styles.inner}} direction="column" >
            <Grid container justify="space-between">
                <Grid container xs spacing={1} justify="flex-start">
                    <Grid item justify="center" alignItems="center">
                        <IoMdMenu />
                    </Grid>
                    <Grid item><h5><CBadge color="primary">{title}</CBadge></h5></Grid>
                    <Grid  container xs spacing={1} justify="flex-end" alignItems="right">
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton block color="link"  className="card-header-action btn-minimize"
                                     onClick={event => {event.preventDefault(); load(event)}}>
                                <FontAwesomeIcon icon={faSpinner} rotation={90}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                                <FontAwesomeIcon icon={collapse?faAngleDoubleUp:faAngleDoubleDown} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={toggleToolbar}>
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </CButton>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>);
}
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

        case formEnum.CUSTOMER:
        case formEnum.SUPPLIER:
            return ColumnsCUST(data, t);
        //case formEnum.FINANCIALS:
        //    return <FormWrapper {...props} form = {FinancialsMainForm}/>;
       //     break;

        case formEnum.JOURNAL:
            return JournalHeaders(t);
        case formEnum.PACB:
            return pacHeaders(t);
        case formEnum.VAT:
            return ColumnsVAT(data,t);
        default:
        // code block
    }
}
export const FormFactory =(props)=> {
const {formid} = props
    switch(formid) {
        case formEnum.ACCOUNT:
            return <FormWrapper {...props} form = {AccountMainForm}/>;
        case formEnum.BANKSTATEMENT:
            return <FormWrapper {...props} form = {BankStatementMainForm}/>;
        case formEnum.COMPANY:
            return <FormWrapper {...props} form = {CompanyMainForm}/>;
        case formEnum.COSTCENTER:
        case formEnum.BANK:
            return <FormWrapper {...props} form = {MasterfilesMainForm}/>;
        case formEnum.CUSTOMER:
        case formEnum.SUPPLIER:
            return <FormWrapper {...props} form = {CustomerMainForm}/>;
        case formEnum.FINANCIALS:
            return <FormWrapper {...props} form = {FinancialsMainForm}/>;
        case formEnum.JOURNAL:
        case formEnum.PACB:
            return <FormWrapper {...props} form = {JournalMainForm}/>;
        case formEnum.VAT:
            return <FormWrapper {...props} form = {VatMainForm}/>;
        default:
        // code block
    }
}
export const FormWrapper=(props) => {
    const {form, table, collapse, styles} = props
    return (
        <Grid container spacing={2} style={{...styles.middle, 'background-color':blue }} direction="column" >
            <CCollapse show={collapse} id="JScollapse" >
                {
                    form(props)
                }
                {
                    table&&table(props)
                }
            </CCollapse>
     </Grid>
    )
}

export const AccountMainForm =(props) => {
    const {current, setCurrent, t, accData } = props
    return (
        <>
     <CFormGroup row style={{  height:15 }}>
         <CCol sm="2">
            <CLabel size="sm" htmlFor="input-small">{t('account.id')}</CLabel>
        </CCol>
    <CCol sm="4">
        <CInput bsSize="sm" type="text" id="account-id" name="id" className="input-sm"
                placeholder="Id" value= {current.id} onChange={(event)  => setCurrent({ ...current, id: event.target.value})} />
    </CCol>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('account.enterdate')}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput  bsSize="sm" type="text"  id="enterdate-id" name="enterdate"
                 className="input-sm" placeholder="date"
                 value={dateFormat(current.enterdate, "dd.mm.yyyy")}
                 style={{'text-align':'right', padding:2 }} readonly />
    </CCol>
</CFormGroup>
     <CFormGroup row style={{  height:15 }}>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('account.name')}</CLabel>
    </CCol>
    <CCol sm="4">
        <CInput bsSize="sm" type="text" id="name-input" name="name" className="input-sm" placeholder="Name"
                value={current.name} onChange={(event)  => setCurrent({ ...current, name: event.target.value})} />
    </CCol>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('account.changedate')}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput  bsSize="sm"  type="text"  id="changedate-id" name="changedate"
                 className="input-sm" placeholder="date" value={dateFormat(current.changedate,
            "dd.mm.yyyy")} style={{'text-align':'right', padding:2 }} readonly />
    </CCol>
</CFormGroup>
     <CFormGroup row style={{  height:15 }}>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('account.account')}</CLabel>
    </CCol>
    <CCol sm="4">
        <CSelect className ="flex-row" type="select" name="account" id="account-id"
                 value={current.account} onChange={(event)  => setCurrent({ ...current, account: event.target.value})} >
            {accData.hits.map(item => mappingSelect(item))};

        </CSelect>

    </CCol>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('account.postingdate')}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput  bsSize="sm" type="text" id="input-small" name="postingdate"
                 className="input-sm" placeholder="date"
                 value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                 style={{'text-align':'right', padding:2 }} readonly/>
    </CCol>
</CFormGroup>
     <CFormGroup row style={{  height:15 }}>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
    </CCol>
    <CCol sm="4">
        <CInput bsSize="sm" type="text" id="company-id" name="company" className="input-sm"
                placeholder="company" value={current.company} onChange={(event)  =>
            setCurrent({ ...current, company: event.target.value})} />
    </CCol>
    <CCol sm="2">
        <FormControlLabel id="isDebit" name="isDebit"
                          control={<Switch checked={current.isDebit} onChange={(event)  =>
                              setCurrent({ ...current, isDebit: event.target.checked})} style={{ 'padding-left':2 }}/>}
                          label={t('account.debit_credit')}
        />
    </CCol>
    <CCol sm="1">
        <FormControlLabel id="balancesheet" name="balancesheet"
                          control={<Switch checked={current.balancesheet} onChange={(event)  =>
                              setCurrent({ ...current, balancesheet: event.target.checked})} style={{ 'padding-left':2 }}/>}
                          label={t('account.balancesheet')}
        />
    </CCol>
</CFormGroup>
     <CFormGroup row style={{  height:15 }}>
    <CCol md="2">
        <CLabel htmlFor="textarea-input">{t('account.description')}</CLabel>
    </CCol>
    <CCol xs="12"   md="9">
        <CTextarea type="textarea" name="description" id="description-id" rows="1"
                   placeholder="Content..." value={current.description} onChange={(event)  =>
            setCurrent({ ...current, description: event.target.value})} />
    </CCol>
</CFormGroup>
</>
)}
export const BankStatementMainForm =(props) => {
    const {current, setCurrent, t, accData } = props
    return (
        <>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.id')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput  bsSize="sm" type="text" id="account-id" name="id" className="input-sm"
                             placeholder="Id" value= {current.bid}  />
                </CCol>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.postingdate')}</CLabel>
                </CCol>
                <CCol sm="1.5">
                    <CInput  bsSize="sm" type="text"  id="postingdate-id" name="postingdate" className="input-sm"
                             placeholder="date" value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                             style={{'text-align':'right', padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.depositor')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput  bsSize="sm" type="text" id="depositor-input" name="depositor"
                             className="input-sm" placeholder="depositor" value={current.depositor}  />
                </CCol>
                <CCol sm="1.5">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.valuedate')}</CLabel>
                </CCol>
                <CCol sm="1.5">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd.MM.yyyy"
                            margin="normal"
                            //label ={t('bankstatement.valuedate')}
                            id="date-picker-valuedate"
                            value={new Date(current.valuedate)}
                            onChange={(newValue) => setCurrent({ ...current, valuedate: newValue} )}
                            InputLabelProps={{ shrink: true }}
                            InputAdornmentProps={{position: 'end','align-text':'right'}}
                        />
                    </MuiPickersUtilsProvider>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{ height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.beneficiary')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput  readonly type="text" id="beneficiary-input" name="beneficiary"
                             className="input-sm" placeholder="beneficiary" value={current.beneficiary}/>
                </CCol>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.postingtext')}</CLabel>
                </CCol>
                <CCol sm="1.5">
                    <CInput  bsSize="sm"  type="text"  id="postingtext-id" name="postingtext"
                             className="input-sm" placeholder="postingtext" value={current.postingtext} />
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{ height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.info')}</CLabel>
                </CCol>
                <CCol xs="4">
                    <CInput  bsSize="sm" type="text" id="info-input" name="info" className="input-sm"
                             placeholder="info" value={current.info}  />
                </CCol>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.amount')}</CLabel>
                </CCol>
                <CCol sm="1.5">
                    <CInput  bsSize="sm" type="text" id="amount-input" name="amount" className="input-sm"
                             placeholder="amount" value={currencyAmountFormatDE(Number(current.amount),current.currency)}
                             style={{ 'text-align':'right' }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.companyIban')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput  bsSize="sm" type="text" id="companyIban-id" name="companyIban"
                            className="input-sm" placeholder="companyIban" value={current.companyIban}
                            onChange={(event)  => setCurrent({ ...current, accountno: event.target.value})}/>
                </CCol>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
                </CCol>
                <CCol sm="1.5">
                    <CInput  bsSize="sm" type="text" id="company-input" name="company" className="input-sm"
                             placeholder="company" value={current.company} style={{ 'text-align':'right' }}/>
                </CCol>

            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.accountno')} </CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput  bsSize="sm" type="text" id="accountno-input" name="accountno"
                            className="input-sm" placeholder="accountno" value={current.accountno}
                            onChange={(event)  => setCurrent({ ...current, accountno: event.target.value})} />
                </CCol>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.bankCode')} </CLabel>
                </CCol>
                <CCol sm="1.5">
                    <CInput disabled ={current.posted} bsSize="sm" type="text" id="bankCode-input" name="bankCode"
                            className="input-sm" placeholder="bankCode" value={current.bankCode}
                            onChange={(event)  => setCurrent({ ...current, bankCode: event.target.value})}
                            style={{ 'padding-left':0 }}/>
                </CCol>
                <CCol sm="1">
                    <FormControlLabel id="posted" name="posted" bsSize="sm"
                                      control={<Switch checked={current.posted} />}
                                      label={t('bankstatement.posted')}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.purpose')}</CLabel>
                </CCol>
                <CCol xs="12"   md="10">
                    <CTextarea disabled ={current.posted} bsSize="sm" type="textarea" id="purpose-input" name="purpose" className="input-sm"
                               placeholder="purpose" value={current.purpose}
                               onChange={(event)  => setCurrent({ ...current, purpose: event.target.value})} rows="2"/>
                </CCol>
            </CFormGroup>
        </>
    )}
export const MasterfilesMainForm =(props) => {
    const {current, setCurrent, t, accData , state, styles} = props
    return (<>
    <CFormGroup row style={{  height:15 }}>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('costcenter.id')}</CLabel>
    </CCol>
    <CCol sm="4">
        <CInput bsSize="sm" type="text" id="account-id" name="id" className="input-sm" placeholder="Id"
                value={current.id} onChange= {(event)  => setCurrent({ ...current, id: event.target.value})}
        />
    </CCol>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('costcenter.enterdate')}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput  readOnly bsSize="sm" type="text" id="enterdate-id" name="enterdate" className="input-sm"
                 placeholder="date" value={dateFormat(current.enterdate, "dd.mm.yyyy")}
                 style={{'text-align':'right', padding:2 }}/>
    </CCol>
</CFormGroup>
         <CFormGroup row style={{  height:15 }}>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t("costcenter.name")}</CLabel>
    </CCol>
    <CCol sm="4">
        <CInput bsSize="sm" type="text" id="name-input" name="name" className="input-sm" placeholder="Name"
                value={current.name} onChange={(event)  => setCurrent({ ...current, name: event.target.value})}/>
    </CCol>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('costcenter.changedate')}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput bsSize="sm" type="text" id="changedate-id" name="changedate" className="input-sm"
                placeholder="date" value={dateFormat(current.changedate, "dd.mm.yyyy")}
                style={{'text-align':'right', padding:2 }} readonly/>
    </CCol>
</CFormGroup>
         <CFormGroup row style={{  height:15 }}>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('costcenter.account')}</CLabel>
    </CCol>
    <CCol sm="4">
        <CSelect className="flex-row" type="select" name="account" id="account-id"
            value={current.account} onChange={(event)  => setCurrent({ ...current, account: event.target.value})}>
            { accData.hits.map(item => mappingSelect(item))};
        </CSelect>
    </CCol>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t("costcenter.postingdate")}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput bsSize="sm" type="text" id="input-small" name="postingdate" className="input-sm"
                placeholder="date" value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                style={{'text-align':'right', padding:2 }} readonly />
    </CCol>
</CFormGroup>
        <CFormGroup row style={{  height:15 }}>
    <CCol sm="6"/>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput  bsSize="sm" type="text" id="company-id" name="company" className="input-sm"
                 placeholder="company" value={current.company}
                 style={{'text-align':'right', padding:2 }} readonly/>
    </CCol>
</CFormGroup>
        <CFormGroup row style={{  height:15 }}>
    <CCol md="2">
        <CLabel htmlFor="textarea-input">{t('costcenter.description')}</CLabel>
    </CCol>
    <CCol xs="12" md="9">
        <CTextarea type="texarea" name="description" id="description-id" rows="1"
                   placeholder="Content..." value={current.description}
                   onChange={(event)  => setCurrent({ ...current, description: event.target.value})}/>
    </CCol>
    </CFormGroup>
</>
)}
export const CustomerMainForm =(props) => {
    const {current, setCurrent, t, accData, vatData,  state, styles} = props

    return (
                <>
                <CFormGroup row style={{  height:15 }}>
                    <CCol sm="2">
                        <CLabel size="sm" htmlFor="input-small">{t('customer.id')}</CLabel>
                    </CCol>
                    <CCol sm="4">
                        <CInput bsSize="sm" type="text" id="account-id" name="id" className="input-sm" placeholder="Id"
                                value= {current.id} onChange={(event)  =>
                            setCurrent({ ...current, id: event.target.value})} />
                    </CCol>
                    <CCol sm="2">
                        <CLabel size="sm" htmlFor="input-small">{t('customer.enterdate')}</CLabel>
                    </CCol>
                    <CCol sm="2">
                        <CInput  bsSize="sm" type="text"  id="enterdate-id" name="enterdate" className="input-sm"
                                 placeholder="date" value={dateFormat(current.enterdate, "dd.mm.yyyy")}
                                 style={{'text-align':'right', padding:2 }}/>
                    </CCol>
                </CFormGroup>
                <CFormGroup row style={{  height:15 }}>
                    <CCol sm="2">
                        <CLabel size="sm" htmlFor="input-small">{t('customer.name')}</CLabel>
                    </CCol>
                    <CCol sm="4">
                        <CInput bsSize="sm" type="text" id="name-input" name="name" className="input-sm" placeholder="Name"
                                value={current.name} onChange={(event)  =>
                            setCurrent({ ...current, name: event.target.value})} />
                    </CCol>
                    <CCol sm="2">
                        <CLabel size="sm" htmlFor="input-small">{t('customer.changedate')}</CLabel>
                    </CCol>
                    <CCol sm="2">
                        <CInput  bsSize="sm"  type="text"  id="changedate-id" name="changedate" className="input-sm"
                                 placeholder="date" value={dateFormat(current.changedate, "dd.mm.yyyy")}
                                 style={{'text-align':'right', padding:2 }}/>
                    </CCol>
                </CFormGroup>
                <CFormGroup row style={{  height:15 }}>
                    <CCol sm="2">
                        <CLabel size="sm" htmlFor="input-small">{t('customer.account')}</CLabel>
                    </CCol>
                    <CCol sm="4">
                        <CSelect className ="flex-row" type="select" name="account" id="account-id"
                                 value={current.account} onChange={(event)  =>
                            setCurrent({ ...current, account: event.target.value})} >
                            {accData.hits.map(item => mappingSelect(item))};

                        </CSelect>

                    </CCol>
                    <CCol sm="2">
                        <CLabel size="sm" htmlFor="input-small">{t('customer.postingdate')}</CLabel>
                    </CCol>
                    <CCol sm="2">
                        <CInput  bsSize="sm" type="text" id="input-small" name="postingdate" className="input-sm"
                                 placeholder="date" value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                                 style={{'text-align':'right', padding:2 }}/>
                    </CCol>
                </CFormGroup>
                <CFormGroup row style={{  height:15 }}>
                    <CCol sm="2">
                        <CLabel size="sm" htmlFor="input-small">{t('customer.oaccount')}</CLabel>
                    </CCol>
                    <CCol sm="4">
                        <CSelect className ="flex-row" type="select" name="oaccount" id="oaccount-id"
                                 value={current.oaccount} onChange={(event)  =>
                            setCurrent({ ...current, oaccount: event.target.value})} >
                            {accData.hits.map(item => mappingSelect(item))};
                        </CSelect>
                    </CCol>
                    <CCol sm="2">
                        <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
                    </CCol>
                    <CCol sm="2">
                        <CInput  bsSize="sm" type="text" id="company-id" name="company" className="input-sm"
                                 placeholder="company" value={current.company} onChange={(event)  =>
                            setCurrent({ ...current, company: event.target.value})}
                                 style={{'text-align':'right', padding:2 }}/>
                    </CCol>
                </CFormGroup>
                <CFormGroup row style={{  height:15 }}>
                    <CCol sm="2">
                        <CLabel size="sm" htmlFor="input-small">{t('customer.street')}</CLabel>
                    </CCol>
                    <CCol sm="4">
                        <CInput  bsSize="sm" type="text" id="street-id" name="company" className="input-sm"
                                 placeholder="Street" value={current.street} onChange={(event)  =>
                            setCurrent({ ...current, street: event.target.value})}
                                 style={{'text-align':'left', padding:2 }}/>
                    </CCol>
                    <CCol sm="2">
                        <CLabel size="sm" htmlFor="input-small">{t('customer.city')}</CLabel>
                    </CCol>
                    <CCol sm="2">
                        <CLabel size="sm" htmlFor="input-small">{t('customer.zip')}</CLabel>
                    </CCol>
                    <CCol sm="2">
                        <CInput  bsSize="sm" type="text" id="zip-id" name="zip" className="input-sm"
                                 placeholder="zip" value={current.zip} onChange={(event)  =>
                            setCurrent({ ...current, zip: event.target.value})}
                                 style={{'text-align':'right', padding:2 }}/>
                    </CCol>
                    <CCol sm="2">
                        <CInput  bsSize="sm" type="text" id="city-id" name="city" className="input-sm"
                                 placeholder="city" value={current.city} onChange={(event)  =>
                            setCurrent({ ...current, city: event.target.value})}
                                 style={{'text-align':'right', padding:2 }}/>
                    </CCol>
                </CFormGroup>
                <CFormGroup row style={{  height:15 }}>
                    <CCol sm="2">
                        <CLabel size="sm" htmlFor="input-small">{t('customer.country')}</CLabel>
                    </CCol>
                    <CCol sm="4">
                        <CInput  bsSize="sm" type="text" id="country-id" name="country" className="input-sm"
                                 placeholder="country" value={current.country} onChange={(event)  =>
                            setCurrent({ ...current, country: event.target.value})}
                                 style={{'text-align':'right', padding:2 }}/>
                    </CCol>
                    <CCol sm="2">
                        <CLabel size="sm" htmlFor="input-small">{t('customer.phone')}</CLabel>
                    </CCol>
                    <CCol sm="2">
                        <CInput  bsSize="sm" type="text" id="phone-id" name="phone" className="input-sm"
                                 placeholder="phone" value={current.phone} onChange={(event)  =>
                            setCurrent({ ...current, phone: event.target.value})}
                                 style={{'text-align':'right', padding:2 }}/>
                    </CCol>
                </CFormGroup>
                <CFormGroup row style={{  height:15 }}>
                    <CCol sm="2">
                        <CLabel size="sm" htmlFor="input-small">{t('customer.vat')}</CLabel>
                    </CCol>
                    <CCol sm="4">
                        <CSelect className ="flex-row" type="select" name="vatcode" id="vatcode-id"
                                 value={current.vatcode} onChange={(event)  =>
                            setCurrent({ ...current, vatcode: event.target.value})} >
                            {vatData.hits.map(item => mappingSelect(item))};
                        </CSelect>
                    </CCol>
                    <CCol sm="2">
                        <CLabel size="sm" htmlFor="input-small">{t('customer.iban')}</CLabel>
                    </CCol>

                </CFormGroup>
                <CFormGroup row style={{  height:15 }}>
                    <CCol md="2">
                        <CLabel htmlFor="textarea-input">{t('customer.description')}</CLabel>
                    </CCol>
                    <CCol xs="12"   md="9">
                        <CTextarea type="texarea" name="description" id="description-id" rows="1"
                                   placeholder="Content..." value={current.description}
                                   onChange={(event)  =>
                                       setCurrent({ ...current, description: event.target.value})} />
                    </CCol>
                </CFormGroup>
       </>
    )}
export const CompanyMainForm =(props) => {
    const {current, setCurrent, t, accData, vatData,  state, styles} = props

    return (
        <>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('customer.id')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput bsSize="sm" type="text" id="account-id" name="id" className="input-sm" placeholder="Id"
                            value= {current.id} onChange={(event)  =>
                        setCurrent({ ...current, id: event.target.value})} />
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.enterdate')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput  bsSize="sm" type="text"  id="enterdate-id" name="enterdate" className="input-sm"
                             placeholder="date" value={dateFormat(current.enterdate, "dd.mm.yyyy")}
                             style={{'text-align':'right', padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('company.name')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput bsSize="sm" type="text" id="name-input" name="name" className="input-sm" placeholder="Name"
                            value={current.name} onChange={(event)  =>
                        setCurrent({ ...current, name: event.target.value})} />
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.changedate')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput  bsSize="sm"  type="text"  id="changedate-id" name="changedate" className="input-sm"
                             placeholder="date" value={dateFormat(current.changedate, "dd.mm.yyyy")}
                             style={{'text-align':'right', padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('company.bankAccount')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CSelect className ="flex-row" type="select" name="bankAcc" id="bankAcc-id"
                             value={current.bankAcc} onChange={(event)  =>
                        setCurrent({ ...current, bankAcc: event.target.value})} >
                        {accData.hits.map(item => mappingSelect(item))};

                    </CSelect>

                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.postingdate')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput  bsSize="sm" type="text" id="input-small" name="postingdate" className="input-sm"
                             placeholder="date" value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                             style={{'text-align':'right', padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('company.cashAccount')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CSelect className ="flex-row" type="select" name="cashAcc" id="cashAcc-id"
                             value={current.cashAcc} onChange={(event)  =>
                        setCurrent({ ...current, cashAcc: event.target.value})} >
                        {accData.hits.map(item => mappingSelect(item))};
                    </CSelect>
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput  bsSize="sm" type="text" id="company-id" name="company" className="input-sm"
                             placeholder="company" value={current.company} onChange={(event)  =>
                        setCurrent({ ...current, company: event.target.value})}
                             style={{'text-align':'right', padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('customer.street')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput  bsSize="sm" type="text" id="street-id" name="company" className="input-sm"
                             placeholder="Street" value={current.street} onChange={(event)  =>
                        setCurrent({ ...current, street: event.target.value})}
                             style={{'text-align':'left', padding:2 }}/>
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('customer.city')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('customer.zip')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput  bsSize="sm" type="text" id="zip-id" name="zip" className="input-sm"
                             placeholder="zip" value={current.zip} onChange={(event)  =>
                        setCurrent({ ...current, zip: event.target.value})}
                             style={{'text-align':'right', padding:2 }}/>
                </CCol>
                <CCol sm="2">
                    <CInput  bsSize="sm" type="text" id="city-id" name="city" className="input-sm"
                             placeholder="city" value={current.city} onChange={(event)  =>
                        setCurrent({ ...current, city: event.target.value})}
                             style={{'text-align':'right', padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('customer.country')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput  bsSize="sm" type="text" id="country-id" name="country" className="input-sm"
                             placeholder="country" value={current.country} onChange={(event)  =>
                        setCurrent({ ...current, country: event.target.value})}
                             style={{'text-align':'right', padding:2 }}/>
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('customer.phone')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput  bsSize="sm" type="text" id="phone-id" name="phone" className="input-sm"
                             placeholder="phone" value={current.phone} onChange={(event)  =>
                        setCurrent({ ...current, phone: event.target.value})}
                             style={{'text-align':'right', padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('customer.vat')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CSelect className ="flex-row" type="select" name="vatcode" id="vatcode-id"
                             value={current.vatcode} onChange={(event)  =>
                        setCurrent({ ...current, vatcode: event.target.value})} >
                        {vatData.hits.map(item => mappingSelect(item))};
                    </CSelect>
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('customer.iban')}</CLabel>
                </CCol>

            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol md="2">
                    <CLabel htmlFor="textarea-input">{t('customer.description')}</CLabel>
                </CCol>
                <CCol xs="12"   md="9">
                    <CTextarea type="texarea" name="description" id="description-id" rows="1"
                               placeholder="Content..." value={current.description}
                               onChange={(event)  =>
                                   setCurrent({ ...current, description: event.target.value})} />
                </CCol>
            </CFormGroup>
        </>
    )}
export const FinancialsMainForm =(props) => {
    const {current, setCurrent, t, accData, ccData } = props
    return (
        <>
            <CFormGroup row style={{  height:15}}>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('financials.id')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput  bsSize="sm" type="text" id="id" name="id" className="input-sm" placeholder={t('financials.id')}
                             value= {current.tid}  />
                </CCol>
                <CCol sm="4"/>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small" style={{padding:2}}>{t('financials.postingdate')}</CLabel>
                </CCol>
                <CCol sm="1">
                    <CInput  bsSize="sm"  type="text"  id="postingdate-id" name="postingdate" className="input-sm"
                             placeholder={t('financials.postingdate')} value={dateFormat(current.postingdate, "dd mm yy")}
                             style={{'text-align':'right', 'padding-left':400,'padding-right':0, padding:2 }}/>
                </CCol>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small" style={{  'padding-right':1 }}>{t('financials.period')}</CLabel>
                </CCol>
                <CCol sm="1">
                    <CInput  bsSize="sm" className="input-sm" type="text" id="period" name="period" value={current.period}
                             style={{'text-align':'right',padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('financials.oid')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput disabled={current.posted} bsSize="sm" type="text" id="oid-input" name="oid" className="input-sm"
                            placeholder="o" value={current.oid} onChange={(event)  =>
                        setCurrent({ ...current, oid: event.target.value})} />
                </CCol>
                <CCol sm="4"/>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small" style={{ padding:2 }}>{t('financials.enterdate')}</CLabel>
                </CCol>
                <CCol sm="1">
                    <CInput  bsSize="sm"  type="text"  id="enterdate-id" name="enterdate" className="input-sm"
                             placeholder="enterdate" value={dateFormat(current.enterdate, "dd.mm.yy")}
                             style={{'text-align':'right', padding:2 }}/>
                </CCol>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small" style={{  padding:2 }}>{t('common.company')}</CLabel>
                </CCol>
                <CCol sm="1">
                    <CInput  bsSize="sm" type="text" id="company-input" name="company" className="input-sm"
                             placeholder={t('common.company')} value={current.company}  style={{'text-align':'right',  padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('financials.account')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CSelect  disabled={current.posted} className ="input-sm" type="select" name="account" id="account-id"
                              value={current.account} onChange={(event)  =>
                        setCurrent({ ...current, account: event.target.value})} style={{ height:30}}>
                        {accData.hits.map(item => mappingSelect(item))};
                    </CSelect>
                </CCol>
                <CCol sm="3">
                    <CSelect disabled={current.posted} className ="input-sm" type="select" name="account2" id="account2-id"
                             value={current.account} onChange={(event)  =>
                        setCurrent({ ...current, account: event.target.value})} style={{ height:30}}>
                        {accData.hits.map(item => mappingSelectName(item))};
                    </CSelect>
                </CCol>

                <CCol sm="2" style={{'text-align':'right', 'padding-left':10, 'padding-bottom':15 }}>
                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
                   <KeyboardDatePicker disabled={current.posted}
                     disableToolbar
                     variant="inline"
                     format="dd.MM.yyyy"
                     margin="normal"
                     label ={t('financials.transdate')}
                     id="date-picker-financials"
                     value={new Date(current.transdate)}
                     onChange={(newValue) => setCurrent({ ...current, transdate: newValue} )}
                     InputLabelProps={{ shrink: true }}
                     InputAdornmentProps={{position: 'end','align-text':'right'}}
                    />
                </MuiPickersUtilsProvider>
                </CCol>
                <CCol sm="1">
                    <FormControlLabel id="posted" name="posted" control={<Switch checked={current.posted} />} label={t('financials.posted')}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{ 'padding-bottom':30, height:15 }}>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('financials.costcenter')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CSelect disabled={current.posted} className ="input-sm" type="select" name="costcenter" id="costcenter-id"
                             value={current.costcenter}  onChange={(event)  =>
                        setCurrent({ ...current, costcenter: event.target.value})} style={{ height:30}}>
                        {ccData.hits.map(item => mappingSelect(item))};

                    </CSelect>
                </CCol>
                <CCol sm="3">
                    <CSelect disabled={current.posted}  className ="input-sm" type="select" name="costcenter2" id="costcenter2-id"
                             value={current.costcenter} onChange={(event)  =>
                        setCurrent({ ...current, costcenter: event.target.value})} style={{ height:30}}>
                        {ccData.hits.map(item => mappingSelectName(item))};

                    </CSelect>
                </CCol>

            </CFormGroup>
        </>
    )}

export const JournalMainForm =(props) => {
    const {current, setCurrent, t, accData, submitQuery } = props
    return (
        <>
          <CFormGroup row style={{  height:15 }} >
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('common.account')}</CLabel>
                </CCol>
                <CCol sm="3">
                    <CSelect className ="flex-row" type="select" name="account" id="account-id"
                             value={current.account} onChange={(event)  =>
                        setCurrent({ ...current, account: event.target.value})} style={{ height: 30, padding:2 }}>
                        {accData.hits.map(item => mappingSelect(item))};

                    </CSelect>
                </CCol>
                <CCol sm="4">
                    <CSelect className ="flex-row" type="select" name="account2" id="account2-id"
                             value={current.account} onChange={(event)  =>
                        setCurrent({ ...current, account: event.target.value})} style={{ height: 30, padding:2 }}>
                        {accData.hits.map(item => mappingSelectName(item))};

                    </CSelect>
                </CCol>
                <CCol sm="0.5" style={{ align: 'right' , padding:2}}>
                    <CLabel size="sm" htmlFor="input-small">{t('common.from')}</CLabel>
                </CCol>
                <CCol sm="1">
                    <CInput  bsSize="sm" type="text"  id="fromPeriod-id" name="fromPeriod" className="input-sm"
                             placeholder="fromPeriod" value={current.fromPeriod} onChange={(event)  =>
                        setCurrent({ ...current, fromPeriod: event.target.value})} style={{ height: 30, padding:1 }}/>
                </CCol>
                <CCol sm="0.5" style={{ align: 'right' , padding:2}}>
                    <CLabel size="sm" htmlFor="input-small">{t('common.to')}</CLabel>
                </CCol>
                <CCol sm="1">
                    <CInput  bsSize="sm" type="text"  id="toPeriod-id" name="toPeriod" className="input-sm"
                             placeholder="toPeriod" value={current.toPeriod} onChange={(event)  =>
                        setCurrent({ ...current, toPeriod: event.target.value})}
                             style={{ height: 30, padding:1, align: 'right'}}/>
                </CCol>
                <CCol sm="1" style={{ align: 'right' }}>
                    <CButton type="submit" size="sm" color="primary" style={{ align: 'right' }} onClick={submitQuery}>
                        <i className="fa fa-dot-circle-o"></i>
                    </CButton>
                </CCol>
            </CFormGroup>
        </>
    )}
export const VatMainForm =(props) => {
    const {current, setCurrent, t, accData } = props
 return (
     <>
    <CFormGroup row style={{height:15 }}>
        <CCol sm="2">
            <CLabel size="sm" htmlFor="input-small">{t('vat.id')}</CLabel>
        </CCol>
        <CCol sm="4">
            <CInput bsSize="sm" type="text" id="account-id" name="id" className="input-sm"
                    placeholder="Id" value= {current.id}
                    onChange={(event)  => setCurrent({ ...current, id: event.target.value})} />
        </CCol>
        <CCol sm="2">
            <CLabel size="sm" htmlFor="input-small">{t('vat.enterdate')}</CLabel>
        </CCol>
        <CCol sm="2">
            <CInput  bsSize="sm" type="text"  id="enterdate-id" name="enterdate"
                     className="input-sm" placeholder="date"
                     value={dateFormat(current.enterdate, "dd.mm.yyyy")}
                     style={{'text-align':'right', padding:2 }}/>
        </CCol>
    </CFormGroup>
    <CFormGroup row style={{  height:15 }}>
     <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('vat.name')}</CLabel>
    </CCol>
    <CCol sm="4">
        <CInput bsSize="sm" type="text" id="name-input" name="name" className="input-sm"
                placeholder="Name" value={current.name}
                onChange={(event)  => setCurrent({ ...current, name: event.target.value})} />
    </CCol>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('vat.changedate')}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput  bsSize="sm"  type="text"  id="changedate-id" name="changedate"
                 className="input-sm" placeholder="date"
                 value={dateFormat(current.changedate, "dd.mm.yyyy")}
                 style={{'text-align':'right', padding:2 }}/>
    </CCol>
  </CFormGroup>
    <CFormGroup row style={{  height:15 }}>
      <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('vat.input_account')}</CLabel>
      </CCol>
    <CCol sm="4">
        <CSelect className ="flex-row" type="select" name="inputaccount" id="inputaccount-id"
                 value={current.inputVatAccount}
                 onChange={(event)  => setCurrent({ ...current, inputVatAccount: event.target.value})} >
            {accData.hits.map(item => mappingSelect(item))};

        </CSelect>

    </CCol>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('vat.postingdate')}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput  bsSize="sm" type="text" id="input-small" name="postingdate" className="input-sm" placeholder="date"
                 value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                 style={{'text-align':'right', padding:2 }}/>
    </CCol>
</CFormGroup>
    <CFormGroup row style={{  height:15 }}>
      <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('vat.output_account')}</CLabel>
     </CCol>
    <CCol sm="4">
        <CSelect className ="flex-row" type="select" name="outputaccount" id="outputaccount-id"
                 value={current.outputVatAccount}
                 onChange={(event)  => setCurrent({ ...current, outputVatAccount: event.target.value})} >
            {accData.hits.map(item => mappingSelect(item))};
        </CSelect>
    </CCol>
    <CCol md="1">
        <CLabel size="sm" htmlFor="input-small">{t('vat.percent')}</CLabel>
    </CCol>
    <CCol sm="1">
        <CInput  bsSize="sm" type="text" id="percent-id" name="percent"  className="input-sm"
                 placeholder="percent" value={current.percent}
                 onChange={(event)  => setCurrent({ ...current, percent: event.target.value})} />
    </CCol>
    <CCol sm="1">
        <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
    </CCol>
    <CCol sm="1">
        <CInput  bsSize="sm" type="text" id="company-id" name="company" className="input-sm"
                 placeholder="company" value={current.company} />
    </CCol>

 </CFormGroup>
    <CFormGroup row style={{  height:15 }}>
      <CCol md="2">
        <CLabel htmlFor="textarea-input">{t('vat.description')}</CLabel>
    </CCol>
      <CCol xs="12"   md="9">
        <CTextarea type="textarea" name="description" id="description-id" rows="1"
                   placeholder="Content..." value={current.description}
                   onChange={(event)  => setCurrent({ ...current, description: event.target.value})} />
     </CCol>
  </CFormGroup>
</>
)}

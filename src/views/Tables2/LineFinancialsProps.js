import React from 'react'

import "react-datepicker/dist/react-datepicker.css";
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
import blue from "@material-ui/core/colors/blue";
import FinancialsForm from "../base/Components/FinancialsForm";
import {CrudAccount} from "../base/Components/CrudAccount";
export const styles1 = {
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

  const mappingSelect = (item) => <option key={item.id} value={item.id}>
    {item.id+ " ".concat (item.name)}</option>;

const mappingSelectName = (item) => <option key={item.id} value={item.id}>
    {item.name+ " ".concat (item.id)}</option>;
export const  filter = (rows, cols, txt,) => rows.filter(col =>
    cols.map(name => `col.${name}`.includes(txt)).reduce((a, b = false) => a || b)
);

export  const accountD=(data, value, onRowDataChange, rowData) => (
      <Select
          value={value}
          onChange ={(event) =>
            onRowDataChange({...rowData, account: event.target.value})
          }
      >
        {data.map(mapping)}
      </Select>
  )
export const accountC =(data, value, onRowDataChange, rowData) => (
      <Select
          value={value}
          onChange={(event) =>
            onRowDataChange({...rowData, oaccount: event.target.value})
          }
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
export const columnsJ =(t) => [
  {field:'id', title:t('journal.id'),  type:"numeric", export:true }
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
     {field:'tid', title:t('financials.id'), initialEditValue:line.id, export:true}
    , {field:'oid', title:t('financials.oid'),initialEditValue:current.oid, export:true}
    , {field:'account', title:t('financials.account'), hidden:false, editComponent:({ value, onRowDataChange, rowData }) =>
            accountD ( data, value, onRowDataChange, rowData ),  initialEditValue:'', width: 20, export:true}
    , {field:'costcenter', title:t('financials.costcenter'), hidden:false, editComponent:({ value, onRowDataChange, rowData }) =>
            accountD ( data, value, onRowDataChange, rowData ),  initialEditValue:'', width: 20, export:true}
    , {field:'enterdate', title:t('financials.enterdate'), type:"date", align:"right",
        initialEditValue:line.enterdate, dateSetting: { locale:"de" } , export:true}
    , {field:'postingdate', title:t('financials.postingdate'), type:"date", align:"right",
        initialEditValue:line.postingdate, dateSetting: { locale:"de" } , export:true}
    , {field:'transdate', title:t('financials.transdate'), type:"date", align:"right",
        initialEditValue:line.transdate, dateSetting: { locale:"de" } , export:true}
    , {field:'period', title:t('financials.period'), type:"numeric", export:true}
    , {field:'posted', title:t('financials.posted'), type:"boolean", width:10, export:true}
    , {field:'total', title:t('common.total'), type:"currency",currencySetting: { locale:"de"
       , currencyCode: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }, export:true}
    , {field:'text', title:t('financials.text'), type:"string", export:true}
    , {field:'typeJournal', title:t('financials.type'), type:"numeric", export:true}
    , {field:'modelid', title:t('common.modelid'), type:"numeric", export:true}
    , {field:'company', title:t('common.company'), type:"numeric", export:true}
]
export const Linescolumns =(data, line, current, t) => [
      {field:'lid', title:t('financials.line.id'), hidden:false,  initialEditValue:line.lid}
    , {field:'transid', title:t('financials.id'), hidden:false, initialEditValue:current.tid}
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
    headerStyle: {'padding': '0.50em',  fontSize: 10,  position: 'sticky',
        backgroundColor: theme.palette.background.default, //theme.palette.background.paper theme.palette.common.black,
        color: theme.palette.common.black//'#fff9e6' //'#eee'
         },
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

export const ColumnsM =(data, t) => [
      {field:'id', title:t('costcenter.id'), export:true}
    , {field:'name', title:t("costcenter.name"),  type:"text", export:true}
    , {field:'description', title:t('costcenter.description'), type:"string", export:true}
    , {field:'account', title:t('costcenter.account') ,editComponent:({ value, onRowDataChange, rowData }) => accountD ( data, value, onRowDataChange, rowData )
        , width: 20, export:true}
    , {field:'enterdate', title:t('costcenter.enterdate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'changedate', title:t('costcenter.changedate'), type:"date", align:"right",dateSetting: { locale:"de" } , export:true}
    , {field:'postingdate', title:t('costcenter.postingdate'), type:"date", align:"right",dateSetting: { locale:"de" } , export:true}
    , {field:'company', title:t('common.company'), type:"string",  export:true}

]
export const ColumnsACC =(data, t) => [
      {field:'id', title:t('account.id'), export:true}
    , {field:'name', title:t("account.name"),  type:"string", export:true}
    , {field:'description', title:t('account.description'), type:"string",  export:true}
    , {field:'isDebit', title:t('account.debit_credit'), type:"boolean", export:true}
    , {field:'balancesheet', title:t('account.balancesheet'), type:"boolean", export:true}
    , {field:'account', title:t('account.account'),
        editComponent:({ value, onRowDataChange, rowData }) => accountD ( data, value, onRowDataChange, rowData )
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
export const ColumnsV = (data, t) => [
    {field:'id', title:t('vat.id'), export:true}
    , {field:'name', title:t("vat.name"),  type:"string", export:true}
    , {field:'description', title:t('vat.description'), type:"string",  export:true}
    , {field:'percent', title:t('vat.percent'), type:"numeric", initialEditValue:0, minimumFractionDigits: 2
        , maximumFractionDigits: 2, export:true}
    , {field:'inputVatAccount', title:t('vat.input_account'),
        editComponent:({ value, onRowDataChange, rowData }) =>accountD ( data, value, onRowDataChange, rowData )
            , width: 20, export:true}
    , {field:'outputVatAccount', title:t('vat.output_account') //,editComponent:({ value, onRowDataChange, rowData }) =>accountD ( data, value, onRowDataChange, rowData )
        , width: 20, export:true}
    , {field:'enterdate', title:t('vat.enterdate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'changedate', title:t('vat.changedate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'postingdate', title:t('vat.postingdate'), type:"date", align:"right", dateSetting: { locale:"de" } , export:true}
    , {field:'company', title:t('common.company'), type:"string", export:true}
]

export const ColumnsBS =(data, line, current, t) => [
      {field:'bid', title:t('bankstatement.id'), type:'numeric', align:"right", export:true}
    , {field:'depositor', title:t("bankstatement.depositor"), type:"string", export:true}
    , {field:'valuedate', title:t('bankstatement.valuedate'), type:"date",  align:"right", export:true}
    , {field:'postingdate', title:t('bankstatement.postingdate'), type:"date",  align:"right", export:true}
    , {field:'postingtext', title:t("bankstatement.postingtext"), type:"string", export:true}
    , {field:'purpose', title:t("bankstatement.purpose"), type:"string", export:true}
    , {field:'beneficiary', title:t("bankstatement.beneficiary"), type:"string", export:true}
    , {field:'accountno', title:t("bankstatement.accountno"), type:"string", export:true}
    , {field:'bankCode', title:t("bankstatement.bankCode"), type:"string", export:true}
    , {field:'amount', title:t("bankstatement.amount"), type: "currency", export:true}
    , {field:'currency', title:t("common.currency"), type:"string", export:true}
    , {field:'info', title:t("bankstatement.info"), type:"string", export:true}
    , {field:'company', title:t("common.company"), type:"string", export:true}
    , {field:'companyIban', title:t("bankstatement.companyIban"), type:"string", export:true}
    , {field:'posted', title:t('bankstatement.posted'), type:"boolean", export:true}
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
            backgroundColor: theme.palette.common.black,
            color:'#eee'},
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
    exportFileName:'Masterfile.csv'
})
export const CommonFormHead = (props) => {
    const {styles, title, collapse,  initAdd, cancelEdit, submitEdit, submitQuery, toggle, toggleToolbar} = props
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
                            <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => cancelEdit(e)}>
                                <FontAwesomeIcon icon={faWindowClose} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={initAdd}>
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
        , handleModuleChange, toggleToolbar} = props
      console.log('propsZZ', props);
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
                            <CButton color="link" className="card-header-action btn-minimize" onClick={onNewLine}>
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => cancelEdit(e)}>
                                <FontAwesomeIcon icon={faWindowClose} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={initAdd}>
                                <FontAwesomeIcon icon={faPlusSquare} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => submitEdit(e)}>
                                <FontAwesomeIcon icon={faSave} />
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
export const FormHead = (props) => {
    const {styles, title, state, url, accUrl, initialState, initAcc, initAdd, setData, setAccData, cancelEdit
        , submitEdit, submitQuery, toggle, toggleToolbar} = props

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
                            <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => cancelEdit(e)}>
                                <FontAwesomeIcon icon={faWindowClose} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={initAdd}>
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
                                event.preventDefault(); submitQuery(event, accUrl, setAccData, initAcc);
                                submitQuery(event, url, setData, initialState);}}>
                                <FontAwesomeIcon icon={faSpinner} rotation={90}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                                <FontAwesomeIcon icon={state.collapse ?faAngleDoubleUp:faAngleDoubleDown} />
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
        </Grid>)
}

export const FormFactory =(props)=> {
const {formid} = props
    switch(formid) {
        case formEnum.ACCOUNT:
            return <FormWrapper {...props} form = {AccountMainForm}/>;
            break;
        case formEnum.BANKSTATEMENT:
            return <FormWrapper {...props} form = {BankStatementMainForm}/>;
            break;
        case formEnum.COSTCENTER:
        case formEnum.BANK:
            return <FormWrapper {...props} form = {MasterfilesMainForm}/>;
            break;

        case formEnum.CUSTOMER:
        case formEnum.SUPPLIER:
            return <FormWrapper {...props} form = {CustomerMainForm}/>;
            break;
        case formEnum.FINANCIALS:
            return <FormWrapper {...props} form = {FinancialsMainForm}/>;
            break;

        case formEnum.JOURNAL:
        case formEnum.PACB:
            return <FormWrapper {...props} form = {JournalMainForm}/>;
            break;
        case formEnum.VAT:
            return <FormWrapper {...props} form = {VatMainForm}/>;
            break;
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
                <CCol sm="1">
                </CCol>
                <CCol sm="1.5">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disabled ={current.posted}
                            disableToolbar
                            fullWidth
                            variant="inline"
                            format="dd.MM.yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label={t('bankstatement.valuedate')}
                            value={current.valuedate}
                            onChange={(event) => { setCurrent({ ...current, valuedate: event.target.value})}}
                            KeyboardButtonProps = {{
                                'aria-label': t('bankstatement.valuedate'),
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.beneficiary')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput  bsSize="sm" type="text" id="beneficiary-input" name="beneficiary"
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
            <CFormGroup row style={{  height:15 }}>
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
                    <CInput disabled ={current.posted} bsSize="sm" type="text" id="companyIban-id" name="companyIban"
                            className="input-sm" placeholder="companyIban" value={current.companyIban}
                            onChange={(event)  => setCurrent({ ...current, accountno: event.target.value})} />
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
                    <CInput disabled ={current.posted} bsSize="sm" type="text" id="accountno-input" name="accountno"
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
export const FinancialsMainForm =(props) => {
    const {current, setCurrent, t, accData,ccData } = props
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

                <CCol sm="2" style={{'text-align':'right', 'padding-left':10, padding:1 }}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disabled ={current.posted}
                            disableToolbar
                            fullWidth
                            variant="inline"
                            format="dd.MM.yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label={t('financials.transdate')}
                            value={current.transdate}
                            onChange={(event) => { console.log('datedate',event.target.value)}}
                            KeyboardButtonProps = {{
                                'aria-label': t('financials.transdate'),
                            }}
                        />
                    </MuiPickersUtilsProvider>
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
                <CCol sm="1">
                    <FormControlLabel id="posted" name="posted" control={<Switch checked={current.posted} />} label={t('financials.posted')}/>
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

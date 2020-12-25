import React, {useEffect, useState, useContext, createRef} from 'react'
import {CBadge, CCollapse, CCol, CForm, CLabel, CFormGroup, CInput, CSelect, CButton} from '@coreui/react'
import { IoMdMenu} from "react-icons/io";
import {dateFormat} from '../../../utils/utils';
import {accountContext} from './AccountContext';
import useFetch from "../../../utils/useFetch";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import "react-datepicker/dist/react-datepicker.css";
import Grid from "react-fast-grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faPlusCircle,
  faPlusSquare,
  faSave
} from "@fortawesome/free-solid-svg-icons";
import EditableTable from "../../Tables2/EditableTable";
import {rowStyle, theme} from "../Tree/BasicTreeTableProps";
import {Options, OptionsM, columnsF, Linescolumns, styles, filter} from '../../Tables2/LineFinancialsProps'
const FinancialsForm = () => {
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [fmodule, setFmodule] = useState('');
  const value = useContext(accountContext);
  const t = value.t
  const [url,] = useState('');
  const tableRef = createRef();
  const res  = useFetch(url, {});
  const [{ res2}] = useFetch(value.accUrl, {});
  const [{ res3}] = useFetch(value.ccUrl, {});
  const init = ()=> {return value.initialState}
  const data_ = res && res.response?res.response:[value.initialState];
  const accData_=  res2?res2:value.accData;
  const ccData_=  res3?res3:value.ccData;
  const current_= value.user;
  const initLine=value.initialState.hits[0].lines[0];
  const [toolbar, setToolbar] = useState(true);
  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [ccData, setCcData] = useState(ccData_);
  const [current,setCurrent] = useState(current_);
  const columnsX = Linescolumns(accData.hits, initLine, current, t);
  const columns= columnsF(ccData.hits, initLine, current, t);
  const getColumnName = ()=>columns.map(col =>col.field);
  useEffect(() => {setCurrent(current_)}, [ current_]);

  const toggle= ()=> {
    setState({...state, collapse: !state.collapse });
  }

  const toggleToolbar= ()=> {
    setToolbar(!toolbar );
  }

  const modules=[{ id:'112', name:'Supplier invoice'}
                ,{ id:'114', name:'Payment'}
                ,{ id:'122', name:'Receivables'}
                ,{ id:'124', name:'Settlement'}
                ,{ id:'134', name:'General ledger'}]


  const initAdd =()=> {
    const row = {...value.initialState, editing:false};
    value.editRow(row, false);
    setCurrent(row);
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    initAdd();
    //setSelected([]);
  };


  const submitQuery = (event,modelid) => {
    accData?.hits?.length<2? value.submitQuery(event, value.accUrl, setAccData, accData_):void(0)
    ccData?.hits?.length<2? value.submitQuery(event, value.ccUrl, setCcData, ccData_):void(0)
    const url_=value.url.concat('/ftrmd/').concat(modelid);
    value.submitQuery(event, url_, setData, value.initialState);
  };
  const handleModuleChange = event => {
    event.preventDefault();
    const value = event.target.value
    setFmodule(value);
    submitQuery(event, value);
  };

  const addAmount =(row)=> {
    return {...row, total: row.lines.reduce((acc, line) => acc + line.amount, 0)}
  }

  const dx=(data?.hits?data?.hits:init().hits).map( row =>addAmount(row));
  function handleFilter(text) {
    const rows_=text?filter(dx, getColumnName(), text ):dx
    setFilteredRows(rows_);
  }
  const getFilteredRows=()=>{
    return filteredRows?filteredRows:dx
  }
  const edit = editedRow =>{
    const record = filteredRows.find(obj => obj.tid === editedRow.tid);
    setCurrent({...record, editing:true});
  }


  const [filteredRows, setFilteredRows] = useState(dx);
  useEffect(() => {handleFilter('')}, [data]);

  const mapping2 = item => <option key={item.name} value={item.name}>
    {item.name+" ".concat(item.id)}</option>;

  const mapping = item => <option key={item.id} value={item.id}>
                        {item.id+ " ".concat (item.name)}</option>;


  const getCurrentRow =
    {tid:current_.id, oid:current_.oid, costcenter:current_.costcenter, account:current_.account
      , transdate:new Date(current_.transdate), enterdate:current_.enterdate, postingdate:current_.postingdate
      , period:current_.period, posted:current_.posted, modelid:current_.modelid, company:current_.company, text:current_.text
      , typeJournal:current_.typeJournal, file_content:current_.file_content, lines:current_.lines};

  const submitPost = event => {
    event.preventDefault();
    const row =getCurrentRow
    console.log("submitPost current", row);
    setCurrent(row);
    value.submitPost([row]);
    console.log("submitEdit current", current);
  };

  const getCurrentMonth = (date)=>{
    const p=date.getUTCMonth()+1;
    return p<=10?"0".concat(p.toString()):p.toString();
  }
  const getCurrentDate = ()=>{return new Date()}
  const getPeriod = (date ) => {return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))};

  const submitEdit = event => {
    event.preventDefault();
    if(current.editing) {
      const row = {...current}
      setCurrent(row);
      value.submitEdit(row, data);
    } else submitAdd(event)
  };

  const submitAdd = event => {
    event.preventDefault();

    const row = {tid:current_.id, oid:current_.oid, costcenter:current_.costcenter, account:current_.account
      , transdate:new Date(current_.transdate).toISOString(), enterdate:new Date().toISOString()
      , postingdate:new Date().toISOString(), period:getPeriod(getCurrentDate()), posted:current_.posted
      , modelid:current_.modelid, company:current_.company, text:current_.text, typeJournal:current_.typeJournal
      , file_content:current_.file_content, lines:[] };

    console.log('submitAdd row', row);
    value.submitAdd(row, data);
    setCurrent(row);
   // console.log('submitAdd current', current);
  };

  const onNewLine =() => {
    const ref = tableRef.current
    ref.dataManager.changeRowEditing();
    ref.setState({ ...ref.dataManager.getRenderState(),
      showAddRow: !ref.state.showAddRow,
    });
  }

const addRow = (newData) =>{
    if(newData ) {
      const dx = {...current};
      dx.lines[dx.lines.length] = newData;
    }
  }
  const updateRow = (newData, oldData) =>{
    if (oldData) {
      const dx = {...current};
      const index = dx.lines.findIndex(obj => obj.lid === newData.lid);
      dx.lines[index] = newData;
    }
  }
  const deleteRow = (oldData) =>{
    if (oldData) {
      const dx = {...current};
      const index =dx.lines.findIndex(obj => obj.lid === oldData.lid);
      const deleted = dx.lines[index];
      dx.lines[index] = {...deleted, transid:-2 };
    }
  }
 const  editable = () => ({
   onRowAdd: async (newData) => addRow(newData),
   onRowUpdate: async (newData, oldData) => updateRow(newData, oldData),
   onRowDelete: async (oldData) => deleteRow(oldData)
 })

  function buildForm( current){
    const lines_=()=>current.lines&&current.lines.length >0 ? current.lines:[value.initialState.hits[0].lines[0]];
    return <>
      <Grid container spacing={2}  direction="column" style={{...styles.outer}}>
         <CForm  className="form-horizontal"  style={{padding:0}}  onSubmit={ current.editing?submitEdit:submitAdd}>
             <Grid container justify="space-between">
               <Grid container xs spacing={1} justify="flex-start">
                 <Grid item justify="center" alignItems="center">
                   <IoMdMenu />
                 </Grid>
                 <Grid item><h5><CBadge color="primary">{value.title}</CBadge></h5></Grid>
               </Grid>
               <Grid item justify="flex-end" alignItems="center">
                 <CSelect className ="input-sm" type="select" name="module" id="module-id"
                        value={fmodule}  onChange ={handleModuleChange} style={{ height: 30, padding:1, align: 'right' }}>
                   <option value={fmodule} selected >{fmodule}</option>
                   {modules.map(item => mapping(item))};
                 </CSelect>
                 <div className="card-header-actions" style={{  align: 'right' }}>
                   <CButton color="link" className="card-header-action btn-minimize" onClick={toggleToolbar}>
                     <FontAwesomeIcon icon={faPlusCircle} />
                   </CButton>
                 </div>
                 <div className="card-header-actions" style={{  align: 'right' }}>
                   <CButton color="link" className="card-header-action btn-minimize" onClick={onNewLine}>
                     <FontAwesomeIcon icon={faPlusCircle} />
                   </CButton>
                 </div>
                 <div className="card-header-actions" style={{  align: 'right' }}>
                   <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                     <FontAwesomeIcon icon={faPlusSquare} />
                   </CButton>
                 </div>
                 <div className="card-header-actions" style={{  align: 'right' }}>
                   <CButton color="link" className="card-header-action btn-minimize" onClick={(event) => submitEdit(event)}>
                     <FontAwesomeIcon icon={faSave} />
                   </CButton>
                 </div>
                 <div className="card-header-actions" style={{  align: 'right' }}>
                   <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                     <FontAwesomeIcon icon={state.collapse ?faAngleDoubleUp:faAngleDoubleDown} />
                   </CButton>
                 </div>
               </Grid>
             </Grid>

            <CCollapse show={state.collapse} id="FScollapse" style={{'min-height':200}}>
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
                  {accData.hits.map(item => mapping(item))};
                </CSelect>
                </CCol>
                <CCol sm="3">
                  <CSelect disabled={current.posted} className ="input-sm" type="select" name="account2" id="account2-id"
                         value={current.account} onChange={(event)  =>
                      setCurrent({ ...current, account: event.target.value})} style={{ height:30}}>
                    {accData.hits.map(item => mapping2(item))};
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
                    {ccData.hits.map(item => mapping(item))};

                  </CSelect>
                </CCol>
                <CCol sm="3">
                  <CSelect disabled={current.posted}  className ="input-sm" type="select" name="costcenter2" id="costcenter2-id"
                         value={current.costcenter} onChange={(event)  =>
                      setCurrent({ ...current, costcenter: event.target.value})} style={{ height:30}}>
                    {ccData.hits.map(item => mapping2(item))};

                  </CSelect>
                </CCol>
                <CCol sm="1">
                  <FormControlLabel id="posted" name="posted" control={<Switch checked={current.posted} />} label={t('financials.posted')}/>
                </CCol>
              </CFormGroup>
              <EditableTable id="LineTable" Options ={{...Options, paging:lines_().length>5}} flag={current.posted} data={lines_()} columns={columnsX} editable={editable()}
                                rowStyle={rowStyle} selected ={[-1]} theme={theme} t={t}  tableRef={tableRef} edit ={null}
                             />
               <CInput disabled={current.posted} bsSize="sm" type="textarea" id="text-input" name="text" className="input-sm"
                           placeholder="text" value={current.text} onChange={(event)  =>
                   setCurrent({ ...current, text: event.target.value})} />


          </CCollapse>
        </CForm>
        <EditableTable id="MTable" Options ={{...OptionsM, toolbar:toolbar}} flag={current.posted} data={getFilteredRows()} columns={columns}
                         rowStyle={rowStyle} selected ={[-1]} theme={theme} t={t}   edit ={edit} style={{'padding-top':20, height: 50}}/>
      </Grid>

   </>
  }

  return buildForm( current);

};
export default FinancialsForm;
//<EditableTable id="MTable" Options ={OptionsM} flag={current.posted} data={getFilteredRows()} columns={columns}
//               rowStyle={rowStyle} selected ={[-1]} theme={theme} t={t} tableRef={tableRef} edit ={edit}/>
// <EnhancedTable props={props} style={{padding:0, 'padding-top':2, height: 50}}/>
//<EditableTableK id="LineTable" Options ={Options} flag={current.posted} data={lines_()} columns={columnsX} editable={editableX}
//                rowStyle={rowStyle} selected ={[-1]} theme={theme} t={t}  tableRef={tableRef} edit ={editLine}
///>




import React, {useEffect, useState, useContext, createRef} from 'react'
import {CBadge, CCollapse, CCol, CForm, CLabel, CFormGroup, CInput, CSelect, CButton} from '@coreui/react'
import {  IoMdMenu} from "react-icons/io";
import {dateFormat, capitalize} from '../../../utils/utils';
import EnhancedTable from '../../Tables2/EnhancedTable';
import {accountContext} from './AccountContext';
import useFetch from "../../../utils/useFetch";
import DatePicker from "react-datepicker";
import { de } from "date-fns/locale";
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

import  {Linescolumns, editable, styles} from '../../Tables2/LineFinancialsProps'
const FinancialsForm = () => {
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [selected, setSelected] = useState([]);
  const value = useContext(accountContext);
  const t = value.t
  const [url,] = useState('');
  const tableRef = createRef();
  const headers = value.headers.filter(function(e) { return e.id !== 'lines' });
  const res  = useFetch(url, {});
  const [{ res2}] = useFetch(value.accUrl, {});
  const [{ res3}] = useFetch(value.ccUrl, {});
  const init = ()=> {return value.initialState}
  const data_ = res && res.response?res.response:[value.initialState];
  const accData_=  res2?res2:value.accData;
  const ccData_=  res3?res3:value.ccData;

  const current_= value.user;
  const id_ = value.user.tid;
  const oid_ = value.user.oid;
  const costcenter_ = value.user.costcenter;
  const account_= value.user.account;
  const transdate_=Date.parse(value.user.transdate);
  const enterdate_=value.user.enterdate;
  const postingdate_=value.user.postingdate;
  const period_=value.user.period;
  const posted_=value.user.posted;
  const company_= value.user.company;
  const text_= value.user.text;
  const typeJournal_= value.user.typeJournal;
  const file_content_= value.user.file_content;
  const editing_ = value.editing;
  const initLine=value.initialState.hits[0].lines[0];

  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [ccData, setCcData] = useState(ccData_);
  const [current,setCurrent] = useState(current_);
  const [id,setId] = useState(id_);
  const [oid,setOid] = useState(oid_);
  const [costcenter, setCostcenter] = useState(costcenter_);
  const [account,setAccount] = useState(account_);
  const [transdate, setTransdate] = useState(transdate_);
  const [enterdate, setEnterdate] = useState(enterdate_);
  const [postingdate, setPostingdate] = useState(postingdate_);
  const [period, setPeriod] = useState(period_);
  const [posted, setPosted] = useState(posted_);
  const [company, setCompany] = useState(company_);
  const [text, setText] = useState(text_);
  const [typeJournal, setTypeJournal] = useState(typeJournal_);
  const [file_content, setFile_content] = useState(file_content_);
  const [editing, setEditing] = useState(editing_);
  const [fmodule, setFmodule] = useState('');


  useEffect(() => {}, [current, setCurrent, setEditing ]);
  useEffect(() => {setCurrent(current_)}, [ current_, id, oid, costcenter, account
        , transdate, enterdate, postingdate, period, posted, company, text, typeJournal, file_content ]);
  useEffect(() => { setId(id_)}, [id_, current.tid ]);
  useEffect(() => { setOid(oid_)}, [oid_, current.oid ]);
  useEffect(() => { setCostcenter(costcenter_)}, [costcenter_, current.costcenter ]);
  useEffect(() => { setAccount(account_)}, [account_, current.account ]);
  useEffect(() => { setTransdate(transdate_)}, [transdate_, current.transdate ]);
  useEffect(() => { setEnterdate(enterdate_)}, [enterdate_, current.enterdate ]);
  useEffect(() => { setPostingdate(postingdate_)}, [postingdate_, current.postingdate ]);
  useEffect(() => { setPeriod(period_)}, [period_, current.period ]);
  useEffect(() => { setPosted(posted_)}, [posted_, current.posted ]);
  useEffect(() => { setOid(oid_)}, [oid_, current.oid ]);
  useEffect(() => { setCompany(company_)}, [company_, current.company ]);
  useEffect(() => { setText(text_)}, [text_, current.text ]);
  useEffect(() => { setTypeJournal(typeJournal_)}, [typeJournal_, current.typeJournal ]);
  useEffect(() => { setFile_content(file_content_)}, [file_content_, current.file_content ]);
  useEffect(() => { setEditing(editing_)}, [editing_ ]);



  const toggle= ()=> {
    setState({...state, collapse: !state.collapse });
  }

  const modules=[{ id:'112', name:'Supplier invoice'}
                ,{ id:'114', name:'Payment'}
                ,{ id:'122', name:'Receivables'}
                ,{ id:'124', name:'Settlement'}
                ,{ id:'134', name:'General ledger'}]


  const initAdd =()=> {
    const row = {...value.initialState, editing:false};
     setEditing(false);
    value.editRow(row, false);
    setCurrent(row);
  };

  const cancelEdit = (e) => {
   // e.preventDefault();
    initAdd();
    setSelected([]);
  };


  const submitQuery = (event,modelid) => {

    console.log("initAcc?.hits", value.accData);
    console.log("initCc?.hits", value.ccData);
    console.log("accData?.hits", accData);
    console.log("accData?.hits", ccData);
    console.log("value.ccUrl", value.ccUrl);
    accData?.hits?.length<2? value.submitQuery(event, value.accUrl, setAccData, accData_):void(0)
    ccData?.hits?.length<2? value.submitQuery(event, value.ccUrl, setCcData, ccData_):void(0)
    const url_=value.url.concat('/ftrmd/').concat(modelid);
    //console.log("url_", url_);
    value.submitQuery(event, url_, setData, value.initialState);
    //console.log("dataZ", data);
  };
  const handleModuleChange = event => {
    event.preventDefault();
    const value = event.target.value
    setFmodule(value);
    submitQuery(event, value);
    //console.log('getFilteredRows', getFilteredRows());
  };
  const  lineReducer = (accumulator, line) => {
    //console.log('accumulator', accumulator);
    //console.log('lineX', line);
    const x=accumulator + line.amount
    //console.log('XXX', x);
    return x;
  };

  const addAmount =(tr)=> {
    //console.log('lineReducerX', tr)
    //console.log('lineReducer', tr.lines.reduce(lineReducer, 0))
    return {...tr, total: tr.lines.reduce(lineReducer, 0)}
  }
 // console.log('initX', init())
  const dx=(data?.hits?data?.hits:init().hits).map( tr =>addAmount(tr));
  //console.log('lineReducerXdx', dx)
  function handleFilter(text) {
    const filtered = dx.filter(function(rc) {
      //console.log('rc.tid', rc)
      return (rc.tid.toString().indexOf(text)>-1
        ||rc.oid.toString().indexOf(text)>-1
        ||rc.costcenter.indexOf(text)>-1
        ||rc.account.indexOf(text)>-1
        ||rc.transdate.indexOf(text)>-1
        ||rc.enterdate.indexOf(text)>-1
        ||rc.postingdate.indexOf(text)>-1
        ||rc.modelid.toString().indexOf(text)>-1
        ||rc.period.toString().indexOf(text)>-1
        ||rc.company.indexOf(text)>-1
        ||rc.text.indexOf(text)>-1
        ||rc.typeJournal.toString().indexOf(text)>-1
        ||rc.file_content.toString().indexOf(text)>-1
        ||rc.posted.toString().indexOf(text)>-1
      )});
    const rows_=text?filtered:dx
    //console.log('filteredRows+', rows_);
    setFilteredRows(rows_);
  }
  const getFilteredRows=()=>{
    return filteredRows?filteredRows:dx
  }
  const edit = id =>{
    const record = dx.find(obj => obj.tid === id);
    //console.log('record', record);
    value.editRow(record);
  }



  console.log('currentzdx', dx);
  const [filteredRows, setFilteredRows] = useState(dx);
  useEffect(() => {handleFilter('')}, [data]);

  const handleInputChange = event => {
   // event.preventDefault();
    const { name, value } = event.target;
    const namex=name
    const method="set"+capitalize(name)
    const row = Object.assign(current, {name:value});
     eval(method)(value);
    console.log('currentz', row);
    console.log('currentz', current);
    setCurrent(row);
  };
  const mapping2 = item => <option key={item.name} value={item.name}>
    {item.name+" ".concat(item.id)}</option>;

  const mapping = item => <option key={item.id} value={item.id}>
                        {item.id+ " ".concat (item.name)}</option>;


  const getCurrentRow=
    {tid:id, oid:oid, costcenter:costcenter, account:account, transdate:new Date(transdate)
      , enterdate:enterdate, postingdate:postingdate, period:period, posted:posted, modelid:current.modelid
      , company:company, text:text, typeJournal:typeJournal, file_content:file_content, lines:current.lines};

  const submitEdit = event => {
    event.preventDefault();
    console.log("submitEdit1 current", current);
    const row =getCurrentRow
    console.log("submitEdit1 current", row);
    setCurrent(row);
    value.submitEdit(row, data);
    console.log("submitEdit current", current);
  };

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
  const submitAdd = event => {
    event.preventDefault();
    //console.log("submitAdd1 current", current);
    //console.log("submitAdd1Parse"+transdate, new Date(transdate));

    const row = {tid:id, oid:oid, costcenter:costcenter, account:account, transdate:new Date(transdate).toISOString()
      , enterdate:new Date().toISOString(), postingdate:new Date().toISOString(), period:getPeriod(getCurrentDate()), posted:posted
      , modelid:current.modelid, company:company, text:text, typeJournal:typeJournal, file_content:file_content
      , lines:[] };
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

  const  editableX = editable(current, setCurrent, setData);
  const columnsX = Linescolumns(accData.hits, initLine, current, t);

  function buildForm(){
    const addOrEdit = (typeof current.editing==='undefined')?editing:current.editing;
    const submit = addOrEdit ? submitEdit : submitAdd
    const props = { title: value.title, columns:headers, rows:getFilteredRows()
      , edit: edit, editable:!posted, submit: submit, selected:selected, setSelected: setSelected
      , post:submitPost, cancel: cancelEdit, handleFilter: handleFilter
      , rowsPerPageOptions: [5, 15, 25, 100]
    }

    return <>
      <Grid container spacing={2}  direction="column" style={{...styles.outer}}>
         <CForm  className="form-horizontal" id ="financialsMasterform" onSubmit={ addOrEdit?submitEdit:submitAdd}>
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
                   <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
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
                         value= {id}  />
                </CCol>
                <CCol sm="4"/>
                <CCol sm="1">
                  <CLabel size="sm" htmlFor="input-small" style={{padding:2}}>{t('financials.postingdate')}</CLabel>
                </CCol>
                <CCol sm="1">
                  <CInput  bsSize="sm"  type="text"  id="postingdate-id" name="postingdate" className="input-sm"
                         placeholder={t('financials.postingdate')} value={dateFormat(postingdate, "dd mm yy")}
                         style={{'text-align':'right', 'padding-left':400,'padding-right':0, padding:2 }}/>
                </CCol>
                  <CCol sm="1">
                  <CLabel size="sm" htmlFor="input-small" style={{  'padding-right':1 }}>{t('financials.period')}</CLabel>
                </CCol>
                <CCol sm="1">
                  <CInput  bsSize="sm" className="input-sm" type="text" id="period" name="period" value={period}
                         style={{'text-align':'right',padding:2 }}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row style={{  height:15 }}>
                <CCol sm="1">
                  <CLabel size="sm" htmlFor="input-small">{t('financials.oid')}</CLabel>
                </CCol>
                <CCol sm="2">
                  <CInput disabled={posted} bsSize="sm" type="text" id="oid-input" name="oid" className="input-sm"
                         placeholder="o" value={t('financials.oid')} onChange={handleInputChange} />
                </CCol>
                <CCol sm="4"/>
                <CCol sm="1">
                  <CLabel size="sm" htmlFor="input-small" style={{ padding:2 }}>{t('financials.enterdate')}</CLabel>
                </CCol>
                <CCol sm="1">
                  <CInput  bsSize="sm"  type="text"  id="enterdate-id" name="enterdate" className="input-sm"
                         placeholder="enterdate" value={dateFormat(enterdate, "dd.mm.yy")}
                         style={{'text-align':'right', padding:2 }}/>
                </CCol>
                <CCol sm="1">
                  <CLabel size="sm" htmlFor="input-small" style={{  padding:2 }}>{t('common.company')}</CLabel>
                </CCol>
                <CCol sm="1">
                  <CInput  bsSize="sm" type="text" id="company-input" name="company" className="input-sm"
                         placeholder={t('common.company')} value={company}  style={{'text-align':'right',  padding:2 }}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row style={{  height:15 }}>
                <CCol sm="1">
                  <CLabel size="sm" htmlFor="input-small">{t('financials.account')}</CLabel>
                </CCol>
                <CCol sm="2">
                <CSelect  disabled={posted} className ="input-sm" type="select" name="account" id="account-id"
                       value={account} onChange={handleInputChange} style={{ height:30}}>
                  {accData.hits.map(item => mapping(item))};
                </CSelect>
                </CCol>
                <CCol sm="3">
                  <CSelect disabled={posted} className ="input-sm" type="select" name="account2" id="account2-id"
                         value={account} onChange={handleInputChange} style={{ height:30}}>
                    {console.log('accData', accData)};
                    {accData.hits.map(item => mapping2(item))};

                  </CSelect>
                </CCol>
                <CCol sm="0.5"/>
                <CCol sm="1">
                  <CLabel size="sm" htmlFor="input-small" style={{'padding-left':'80px', 'padding-right':1, padding:1 }}>
                    {t('financials.transdate')}</CLabel>
                </CCol>
                <CCol sm="1" style={{'text-align':'right', 'padding-left':2, padding:1 }}>
                  <DatePicker  id='transdate-id'  selected={transdate} onChange={date => setTransdate(date)}
                               disabled ={posted} locale={de} dateFormat='dd.MM.yyyy' className="form-control dateInput" />
                </CCol>

              </CFormGroup>
              <CFormGroup row style={{  height:15 }}>
                <CCol sm="1">
                  <CLabel size="sm" htmlFor="input-small">{t('financials.costcenter')}</CLabel>
                </CCol>
                <CCol sm="2">
                  <CSelect disabled={posted} className ="input-sm" type="select" name="costcenter" id="costcenter-id"
                         value={costcenter}  onChange={handleInputChange} style={{ height:30}}>
                    {ccData.hits.map(item => mapping(item))};

                  </CSelect>
                </CCol>
                <CCol sm="3">
                  <CSelect disabled={posted}  className ="input-sm" type="select" name="costcenter2" id="costcenter2-id"
                         value={costcenter} onChange={handleInputChange} style={{ height:30}}>
                    {ccData.hits.map(item => mapping2(item))};

                  </CSelect>
                </CCol>
                <CCol sm="1">
                  <CLabel className="form-check-label" check htmlFor="inline-posted" style={{'padding-left':80,
                    'padding-right':10, padding:1 }}>{t('financials.posted')}</CLabel>
                </CCol>
                <CCol sm="1">
                  <FormControlLabel id="posted" name="posted"
                                    control={<Switch checked={current.posted} onChange={handleInputChange}/>}
                                    label="Posted?"
                  />
                </CCol>
              </CFormGroup>
              <EditableTable data={(current.lines&&current.lines.length) >0 ? current.lines:[value.initialState.hits[0].lines[0]]}
                             columns={columnsX}  rowStyle={rowStyle}  theme={theme} t={t} tableRef={tableRef} editable={editableX}
              />
               <CInput disabled={posted} bsSize="sm" type="textarea" id="text-input" name="text" className="input-sm"
                           placeholder="text" value={text} onChange={handleInputChange} />


          </CCollapse>
        </CForm>
      </Grid>
      <EnhancedTable props={props} style={{padding:0, 'padding-top':2, height: 50}}/>
   </>
  }

  return buildForm();

};
export default FinancialsForm;



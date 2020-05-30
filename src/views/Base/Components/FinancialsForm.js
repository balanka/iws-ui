import React, {useEffect, useState, useContext} from 'react'
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, Form, FormGroup, Input, Label} from "reactstrap";
import { IoIosCheckmarkCircleOutline, IoMdMenu , IoIosExpand} from "react-icons/io";
import {dateFormat, capitalize, currencyFormatDE} from '../../../utils/utils';
import EnhancedTable from '../Tables2/EnhancedTable';
import DetailsFormFinancials from "./DetailsFormFinancials";
import {accountContext} from './AccountContext';
import useFetch from "../../../utils/useFetch";
import DatePicker from "react-datepicker";
import { de } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import Grid from "react-fast-grid";
import blue from "@material-ui/core/colors/blue";


const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 10px 30px #BBB",
    padding: 10
  }
};
const FinancialsForm = () => {
  const [state, setState]= useState({collapse: false, fadeIn: true, timeout: 300});
  const [selected, setSelected] = useState([]);
  const UP="fa fa-angle-double-up";
  //const DOWN="icon-arrow-down";
  const DOWN="fa fa-angle-double-down";
  const ADD ="fa fa-plus-square-o";
  //const REMOVE="fa fa-minus-square-o";
  const REMOVE="fa fa-eraser";
  const SAVE  ="fa fa-save";
  const EDIT="fa fa-edit";

  const value = useContext(accountContext);
  const url_=value.url;
  const get_=value.get;
  const [url,setUrl] = useState('');
  console.log('value.headers', value.headers);
  const HeadersWithLines=value.headers.filter(function(e) { return e.id === 'lines' });
  const lineHeaders=HeadersWithLines[0].title;
  console.log('HeadersWithLines', HeadersWithLines);
  console.log('lineHeaders', lineHeaders);
  var index = value.headers.indexOf('lines');
  console.log('index_', index);
  const headers = value.headers.filter(function(e) { return e.id !== 'lines' });
  console.log('headers', headers);
  const res  = useFetch(url, {});
  const data_ = res && res.response?res.response:{hits:[]};

  console.log('data_', data_);
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
  const initLine=value.initialState.lines[0];

  const [data, setData] = useState(data_);
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
    setState({ collapse: !state.collapse });
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
  const handleModuleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    const newUrl=url_.concat(get_.substr(0, get_.indexOf('/')+1).concat(value));
    setFmodule(value);
    setUrl(newUrl);
    console.log('getFilteredRows', getFilteredRows());
  };

  function handleFilter(text) {
    const filteredRows_ = !text?dx:dx.filter(function(rc) {
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
    console.log('filteredRows+', filteredRows_);
    setFilteredRows(filteredRows_);
  }
  const getFilteredRows=()=>{
    return filteredRows?filteredRows:dx
  }
  const edit = id =>{
    const record = dx.find(obj => obj.tid === id);
    console.log('record', record);
    value.editRow(record);
  }
  const dx=data_?.hits?data_?.hits:[value.initialState];
  const [filteredRows, setFilteredRows] = useState(dx);
  useEffect(() => {}, [data_]);

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
    console.log("submitPostvalue", value);
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
    console.log("submitAdd1 current", current);
    console.log("submitAdd1Parse"+transdate, new Date(transdate));

    const row = {tid:id, oid:oid, costcenter:costcenter, account:account, transdate:new Date(transdate).toISOString()
      , enterdate:new Date().toISOString(), postingdate:new Date().toISOString(), period:getPeriod(getCurrentDate()), posted:posted
      , modelid:current.modelid, company:company, text:text, typeJournal:typeJournal, file_content:file_content
      , lines:[] };
    console.log('submitAdd row', row);
    value.submitAdd(row, data);
    setCurrent(row);
    console.log('submitAdd current', current);
  };

  function buildForm(){
    console.log('current1', current);
    console.log('filteredRows', filteredRows);
    console.log('dx_', dx);
    const addOrEdit = (typeof current.editing==='undefined')?editing:current.editing;
    const submit = addOrEdit ? submitEdit : submitAdd
    const props = { title: value.title, columns:headers, rows:getFilteredRows()
      , edit: edit, editable:!posted, submit: submit, selected:selected, setSelected: setSelected
      , post:submitPost, cancel: cancelEdit, handleFilter: handleFilter
      , rowsPerPageOptions: [5, 15, 25, 100]
    }
    const detailsProps={current:current, initialState:initLine, lineHeaders:lineHeaders, data:data
      , setCurrent:setCurrent, getCurrentRow}
    return <div style={styles.outer}>
      <Grid container spacing={2} style={{ padding: 20, 'background-color':blue }} direction="column" >
         <Form  className="form-horizontal" id ="financialsMasterform" onSubmit={ addOrEdit?submitEdit:submitAdd}>

             <Grid container justify="space-between">
               <Grid container xs spacing={1} justify="flex-start">
                 <Grid item justify="center" alignItems="center">
                   <IoMdMenu />
                 </Grid>
                 <Grid item>Financials</Grid>
               </Grid>
               <Grid item justify="flex-end" alignItems="center">
                 <Input className ="input-sm" type="select" name="module" id="module-id"
                        value={fmodule}  onChange ={handleModuleChange} style={{ height: 30, padding:1, align: 'right' }}>
                   <option value="" selected disabled hidden>Choose here</option>
                   {modules.map(item => mapping(item))};
                 </Input>
                 <div className="card-header-actions" style={{  align: 'right' }}>
                   {/*eslint-disable-next-line*/}
                   <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={toggle}>
                     <i className={state.collapse?UP:DOWN}></i></a>
                 </div>
               </Grid>
             </Grid>

            <Collapse isOpen={state.collapse} id="FScollapse" style={{'min-height':200,padding:1}}>
              <CardBody>
              <FormGroup row style={{  height:15 }}>
                <Col sm="1">
                  <Label size="sm" htmlFor="input-small">Id</Label>
                </Col>
                <Col sm="1.5">
                  <Input disabled bsSize="sm" type="text" id="id" name="id" className="input-sm" placeholder="Id" value= {id}  />
                </Col>
                <Col sm="4"/>
                <Col sm="1">
                  <Label size="sm" htmlFor="input-small" style={{  padding:2 }}>Postingdate</Label>
                </Col>
                <Col sm="1">
                  <Input disabled bsSize="sm"  type="text"  id="postingdate-id" name="postingdate" className="input-sm"
                         placeholder="postingdate" value={dateFormat(postingdate, "dd mm yy")}
                         style={{'text-align':'right', 'padding-left':400,'padding-right':0, padding:2 }}/>
                </Col>
                  <Col sm="1">
                  <Label size="sm" htmlFor="input-small" style={{  'padding-right':1 }}>Period</Label>
                </Col>
                <Col sm="1">
                  <Input disabled bsSize="sm" className="input-sm" type="text" id="period" name="period" value={period}
                         style={{'text-align':'right',padding:2 }}/>
                </Col>
              </FormGroup>
              <FormGroup row style={{  height:15 }}>
                <Col sm="1">
                  <Label size="sm" htmlFor="input-small">oid</Label>
                </Col>
                <Col sm="1.5">
                  <Input disabled bsSize="sm" type="text" id="oid-input" name="oid" className="input-sm"
                         placeholder="depositor" value={oid} onChange={handleInputChange} />
                </Col>
                <Col sm="4"/>
                <Col sm="1">
                  <Label size="sm" htmlFor="input-small" style={{ padding:2 }}>Enterdate</Label>
                </Col>
                <Col sm="1">
                  <Input disabled bsSize="sm"  type="text"  id="enterdate-id" name="enterdate" className="input-sm"
                         placeholder="enterdate" value={dateFormat(enterdate, "dd mm yy")} style={{'text-align':'right', padding:2 }}/>
                </Col>
                <Col sm="1">
                  <Label size="sm" htmlFor="input-small" style={{  padding:2 }}>Company</Label>
                </Col>
                <Col sm="1">
                  <Input disabled bsSize="sm" type="text" id="company-input" name="company" className="input-sm"
                         placeholder="company" value={company}  style={{'text-align':'right',  padding:2 }}/>
                </Col>
              </FormGroup>
              <FormGroup row style={{  height:15 }}>
                <Col sm="1">
                  <Label size="sm" htmlFor="input-small">Account</Label>
                </Col>
                <Col sm="2">
                <Input  disabled={posted} className ="input-sm" type="select" name="account" id="account-id"
                       value={account} onChange={handleInputChange} style={{ height:30}}>
                  {value.accData.hits.map(item => mapping(item))};
                </Input>
                </Col>
                <Col sm="3">
                  <Input disabled={posted} className ="input-sm" type="select" name="account2" id="account2-id"
                         value={account} onChange={handleInputChange} style={{ height:30}}>
                    {value.accData.hits.map(item => mapping2(item))};

                  </Input>
                </Col>
                <Col sm="0.5"/>
                <Col sm="1">
                  <Label size="sm" htmlFor="input-small" style={{'padding-left':'80px', 'padding-right':1, padding:1 }}>Transdate</Label>
                </Col>
                <Col sm="1" style={{'text-align':'right', 'padding-left':2, padding:1 }}>
                  <DatePicker  id='transdate-id'  selected={transdate} onChange={date => setTransdate(date)}
                               disabled ={posted} locale={de} dateFormat='dd.MM.yyyy' className="form-control dateInput" />
                </Col>


              </FormGroup>
              <FormGroup row style={{  height:15 }}>
                <Col sm="1">
                  <Label size="sm" htmlFor="input-small">Cost center</Label>
                </Col>
                <Col sm="2">
                  <Input disabled={posted} className ="input-sm" type="select" name="costcenter" id="costcenter-id"
                         value={costcenter}  onChange={handleInputChange} style={{ height:30}}>
                    {value.ccData.hits.map(item => mapping(item))};

                  </Input>
                </Col>
                <Col sm="3">
                  <Input disabled={posted}  className ="input-sm" type="select" name="costcenter2" id="costcenter2-id"
                         value={costcenter} onChange={handleInputChange} style={{ height:30}}>
                    {value.ccData.hits.map(item => mapping2(item))};

                  </Input>
                </Col>
                <Col sm="1">
                  <Label className="form-check-label" check htmlFor="inline-posted" style={{'padding-left':80, 'padding-right':10, padding:1 }}>Posted?</Label>
                </Col>
                <Col sm="1">
                  <Input disabled className="form-check-input" type="checkbox" id="posted" name="posted" value={current.posted}
                         checked={posted} />

                </Col>
              </FormGroup>
                <FormGroup>
                  <Col sm="12" md="12">
                    <Input disabled={posted} bsSize="sm" type="textarea" id="text-input" name="text" className="input-sm"
                           placeholder="text" value={text} onChange={handleInputChange} />
                  </Col>
                </FormGroup>
                <DetailsFormFinancials detailsProps={detailsProps}/>
            </CardBody>
          </Collapse>
        </Form>
      </Grid>
      <EnhancedTable props={props} style={{padding:0, 'padding-top':2, height: 50}}/>
       </div>
  }

  return buildForm();

};
export default FinancialsForm;


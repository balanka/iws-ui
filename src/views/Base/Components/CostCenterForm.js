import React, {useEffect, useState, useContext} from 'react'
import { Card, CardBody,CardHeader, Col, Collapse,Form, FormGroup, Input, Label} from "reactstrap";
import { dateFormat, capitalize } from '../../../utils/utils';
import EnhancedTable from '../Tables2/EnhancedTable';
import {accountContext} from './AccountContext';
import Grid from "react-fast-grid";
import blue from "@material-ui/core/colors/blue";
import {IoMdMenu} from "react-icons/io";

const CostCenterForm = () => {
  const [state, setState]= useState({collapse: false, fadeIn: true, timeout: 300});
  const [selected, setSelected] = useState([]);
  const UP="icon-arrow-up";
  const DOWN="icon-arrow-down";
  const value = useContext(accountContext);
  const data_= value.data;
  const current_= value.user;
  const id_ = value.user.id;
  const name_ = value.user.name;
  const description_ = value.user.description;
  const account_= value.user.account;
  const company_= value.user.company;
  const postingdate_=value.user.postingdate;
  const changedate_=value.user.changedate;
  const enterdate_=value.user.enterdate;
  const editing_ = value.editing;
  const [data, setData] = useState(data_);
  const [current,setCurrent] = useState(current_);
  const [id,setId] = useState(id_);
  const [name,setName] = useState(name_);
  const [description, setDescription] = useState(description_);
  const [account,setAccount] = useState(account_);
  const [company,setCompany] = useState(company_);
  const [postingdate, setPostingdate] = useState(postingdate_);
  const [changedate, setChangedate] = useState(changedate_);
  const [enterdate, setEnterdate] = useState(enterdate_);
  const [editing, setEditing] = useState(editing_);
  useEffect(() => {}, [current, setCurrent, data, setEditing ]);
  useEffect(() => {setCurrent(current_)}, [ current_,  id, name, description,
        account, company, enterdate, changedate, postingdate]);
  useEffect(() => { setId(id_)}, [id_, current.id ]);
  useEffect(() => { setName(name_)}, [name_, current.name ]);
  useEffect(() => { setDescription(description_)}, [description_, current.description ]);
  useEffect(() => { setAccount(account_)}, [account_, current.account, data ]);
  useEffect(() => { setCompany(company_)}, [company_, current.company ]);
  useEffect(() => { setPostingdate(postingdate_)}, [postingdate_, current.postingdate ]);
  useEffect(() => { setChangedate(changedate_)}, [changedate_, current.changedate ]);
  useEffect(() => { setEnterdate(enterdate_)}, [enterdate_, current.enterdate ]);
  useEffect(() => { setEditing(editing_)}, [editing_ ]);
  useEffect(() => { setData(data_)}, [data_, value.data]);

  const toggle= ()=> {
    setState({ collapse:!state.collapse });
  }
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
  const dx=data?.hits?data?.hits:[value.initialState]
  const [filteredRows, setFilteredRows] = useState(dx);
  useEffect(() => {handleFilter('')}, [dx]);
  function handleFilter(text) {

    const filteredRows = !text?dx:dx.filter(function(rc) {
      return (rc.id.indexOf(text)>-1
        ||rc.name.indexOf(text)>-1
        ||rc.description.indexOf(text)>-1)});
    console.log('filteredRows+', filteredRows);
    setFilteredRows(filteredRows);
  }

  const edit = id =>{
    const record = dx.find(obj => obj.id === id);
    value.editRow(record);
  }
  const handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    const namex=name
    const method="set"+capitalize(name)
    console.log("method", method);
    console.log("namea", name);
    console.log("valuea", value);
    const row = Object.assign(current, {$namex:value});
     eval(method)(value);
    console.log('currentz', row);
    console.log('currentz', current);
    setCurrent(row);
  };
  const mapping = item => <option key={item.id} value={item.id}>
    {item.id+ " ".concat (item.name)}</option>;

  const submitEdit = event => {
    event.preventDefault();
    console.log("submitEdit1 current", current);
    const row = {id:id, name:name, description:description, enterdate:enterdate
      ,   postingdate:postingdate, changedate:changedate, modelid:current.modelid
      ,  account:account, company:company};
    console.log("submitEdit1 current", row);
    setCurrent(row);
    value.submitEdit(row, data);
    console.log("submitEdit current", current);
  };

  const submitAdd = event => {
    event.preventDefault();
    console.log("submitAdd1 current", current);
    const row = {id:id, name:name, description:description, enterdate:current_.enterdate
      , postingdate:current_.postingdate, changedate:current_.changedate,  modelid:current.modelid
      , account:account, company:company};

    console.log('submitAdd row', row);
    value.submitAdd(row, data);
    setCurrent(row);
    console.log('submitAdd current', current);
  };

  function buildForm(current1) {
    console.log("editing", editing);
    console.log("user1xx", current1);
    const addOrEdit = (typeof current1.editing === 'undefined') ? editing : current1.editing;
    const submit = addOrEdit ? submitEdit : submitAdd
    const props = {
      title: value.title, columns: value.headers, rows: filteredRows, edit: edit, submit: submit, selected: selected
      , editable:true, setSelected: setSelected, cancel: cancelEdit, handleFilter: handleFilter, rowsPerPageOptions: [5, 15, 25, 100]
    }
    return <>
      <Grid container spacing={2} style={{ padding: 20, 'background-color':blue }} direction="column" >
        <Form  className="form-horizontal" onSubmit={ addOrEdit?submitEdit:submitAdd} style={{padding:0}}>
          <Grid container justify="space-between">
            <Grid container xs spacing={1} justify="flex-start">
              <Grid item justify="center" alignItems="center">
                <IoMdMenu />
              </Grid>
              <Grid item>{value.title}</Grid>
            </Grid>
            <Grid item justify="flex-end" alignItems="center">
              <div className="card-header-actions" style={{  align: 'right' }}>
                {/*eslint-disable-next-line*/}
                <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={toggle}>
                  <i className={state.collapse?UP:DOWN}></i></a>
              </div>
            </Grid>
          </Grid>
          <Collapse isOpen={state.collapse} id="JScollapse" style={{padding: 2}}>
            <CardBody>
              <FormGroup row style={{  height:15 }}>
                <Col sm="2">
                  <Label size="sm" htmlFor="input-small">Id</Label>
                </Col>
                <Col sm="4">
                  <Input bsSize="sm" type="text" id="account-id" name="id" className="input-sm" placeholder="Id"
                         value={id} onChange={handleInputChange}/>
                </Col>
                <Col sm="2">
                  <Label size="sm" htmlFor="input-small">Enterdate</Label>
                </Col>
                <Col sm="4">
                  <Input disabled bsSize="sm" type="text" id="enterdate-id" name="enterdate" className="input-sm"
                         placeholder="date" value={dateFormat(current.enterdate, "dd.mmyyyyy")}
                         style={{'text-align':'right', padding:2 }}/>
                </Col>
              </FormGroup>
              <FormGroup row style={{  height:15 }}>
                <Col sm="2">
                  <Label size="sm" htmlFor="input-small">Name</Label>
                </Col>
                <Col sm="4">
                  <Input bsSize="sm" type="text" id="name-input" name="name" className="input-sm" placeholder="Name"
                         value={name} onChange={handleInputChange}/>
                </Col>
                <Col sm="2">
                  <Label size="sm" htmlFor="input-small">Modified</Label>
                </Col>
                <Col sm="4">
                  <Input disabled bsSize="sm" type="text" id="changedate-id" name="changedate" className="input-sm"
                         placeholder="date" value={dateFormat(current.changedate, "dd.mm.yyyy")}
                         style={{'text-align':'right', padding:2 }}/>
                </Col>
              </FormGroup>
              <FormGroup row style={{  height:15 }}>
                <Col sm="2">
                  <Label size="sm" htmlFor="input-small">Account</Label>
                </Col>
                <Col sm="4">
                  <Input className="flex-row" type="select" name="account" id="account-id"
                         value={account} onChange={handleInputChange}>
                    {value.data.hits.map(item => mapping(item))};

                  </Input>

                </Col>
                <Col sm="2">
                  <Label size="sm" htmlFor="input-small">Posted on</Label>
                </Col>
                <Col sm="4">
                  <Input disabled bsSize="sm" type="text" id="input-small" name="postingdate" className="input-sm"
                         placeholder="date" value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                         style={{'text-align':'right', padding:2 }}/>
                </Col>
              </FormGroup>
              <FormGroup row style={{  height:15 }}>
                <Col sm="6"/>
                <Col sm="2">
                  <Label size="sm" htmlFor="input-small">Company</Label>
                </Col>
                <Col sm="4">
                  <Input disabled bsSize="sm" type="text" id="company-id" name="company" className="input-sm"
                         placeholder="company" value={company} onChange={handleInputChange}
                         style={{'text-align':'right', padding:2 }}/>
                </Col>
              </FormGroup>
              <FormGroup row style={{  height:15 }}>
                <Col md="2">
                  <Label htmlFor="textarea-input">Description</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="texarea" name="description" id="description-id" rows="4"
                         placeholder="Content..." value={description} onChange={handleInputChange}/>
                </Col>
              </FormGroup>
            </CardBody>
          </Collapse>
      </Form>
    </Grid>
      <EnhancedTable props={props} style={{padding: 0, height: 50}}/>
    </>
  }
  return buildForm(current);

};
export default CostCenterForm;

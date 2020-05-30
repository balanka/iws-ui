import React, {useEffect, useState, useContext} from 'react'
import {Badge, Col, Collapse, Form, FormGroup, Input, Label} from "reactstrap";
import {accountContext} from './AccountContext';
import EnhancedTable from '../Tables2/EnhancedTable';
import blue from "@material-ui/core/colors/blue";
import Grid from "react-fast-grid";
import {IoMdMenu} from "react-icons/io";

const GenericMasterfileForm = () => {
  const [state, setState]= useState({collapse: false, fadeIn: true, timeout: 300});
  const [selected, setSelected] = useState([]);

  const UP="icon-arrow-up";
  const DOWN="icon-arrow-down";
  const value = useContext(accountContext);
  const data_= value.data;
  const user_id = value.user.id;
  const user_name = value.user.name;
  const user_description = value.user.description;
  const user_parent = value.user.parent;
  const editing_ = value.editing;
  const [data, setData] = useState(data_);
  const [current,setCurrent] = useState(value.user);
  const [id,setId] = useState(user_id);
  const [name,setName] = useState(user_name);
  const [description, setDescription] = useState(user_description);
  const [parent, setParent] = useState(user_parent);
  const [editing, setEditing] = useState(editing_);
  useEffect(() => {}, [current, setCurrent, data, setEditing ]);
  useEffect(() => {setCurrent(value.user)}, [ value.user, id, name, description, parent]);
  useEffect(() => { setId(user_id)}, [user_id, current.id ]);
  useEffect(() => { setName(user_name)}, [user_name, current.name ]);
  useEffect(() => { setDescription(user_description)}, [user_description, current.description]);
  useEffect(() => { setParent(user_parent)}, [user_parent, current.parent, data]);
  useEffect(() => { setEditing(editing_)}, [editing_ ]);
  useEffect(() => { setData(data_)}, [data_, value.data]);

  console.log("parent", parent);
  console.log("data.hits", data.hits);

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
    //e.preventDefault();
    console.log("editing", editing);
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
    if(name==='id') setId(value);
    if(name==='name') setName(value);
    if(name==='description') setDescription(value);
    if(name==='parent') setParent(value);
    console.log('user', current);
  };

  const mapping = item => <option key={item.id} value={item.id}>
                         {item.id+ " ".concat (item.name)}</option>;

  const submitEdit = event => {
    event.preventDefault();
    const row = {id:id, name:name, description:description,
      modelid:current.modelid, parent:parent};
    setCurrent(row);
    value.submitEdit(row, data);
    console.log("submitEdit user", current);
  };

  const submitAdd = event => {
    event.preventDefault();
    const row = {id:id, name:name, description:description,
      modelid:current.modelid, parent:parent};
    setCurrent(row);
    value.submitAdd(row, data);

  };


  function buildForm(user1){
    console.log("user1.editing", user1.editing);
    console.log("editing", editing);
    console.log("user1", user1);
    console.log("data.hits", data.hits);
    const addOrEdit = (typeof user1.editing==='undefined')?editing:user1.editing;
    const submit= addOrEdit?submitEdit:submitAdd
    const props={title:value.title, columns:value.headers, rows:filteredRows, edit:edit, submit:submit, selected:selected
      , editable:true, setSelected:setSelected, cancel:cancelEdit, handleFilter:handleFilter,rowsPerPageOptions:[5, 25, 100]}
    return(
           <>
             <Grid container spacing={2} style={{ padding: 20, 'background-color':blue }} direction="column" >
                <Form  className="form-horizontal" onSubmit={ addOrEdit?submitEdit:submitAdd} style={{padding:0}}>
                  <Grid container justify="space-between">
                    <Grid container xs spacing={1} justify="flex-start">
                      <Grid item justify="center" alignItems="center">
                        <IoMdMenu />
                      </Grid>
                      <Grid item><h5><Badge color="primary">{value.title}</Badge></h5></Grid>
                    </Grid>
                    <Grid item justify="flex-end" alignItems="center">
                      <div className="card-header-actions" style={{  align: 'right' }}>
                        {/*eslint-disable-next-line*/}
                        <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={toggle}>
                          <i className={state.collapse?UP:DOWN}></i></a>
                      </div>
                    </Grid>
                  </Grid>
                    <Collapse isOpen={state.collapse} id="JScollapse" style={{padding:2}}>
                        <FormGroup row style={{  height:15 }}>
                          <Col sm="2">
                            <Label size="sm" htmlFor="input-small">Id</Label>
                          </Col>
                          <Col sm="4">
                            <Input bsSize="sm" type="text" id="input-id" name="id" className="input-sm" placeholder="Id" value= {id} onChange={handleInputChange} />
                          </Col>
                          <Col sm="1.5">
                            <Label size="sm" htmlFor="input-small">Enterdate</Label>
                          </Col>
                          <Col sm="4">
                            <Input disabled bsSize="sm" type="date"  id="input-small" name="enterdate" className="input-sm" placeholder="31.12.2019" />
                          </Col>
                        </FormGroup>
                        <FormGroup row style={{  height:15 }}>
                          <Col sm="2">
                            <Label size="sm" htmlFor="input-small">Name</Label>
                          </Col>
                          <Col sm="4">
                            <Input bsSize="sm" type="text" id="input-small" name="name" className="input-sm" placeholder="Name" value={name} onChange={handleInputChange} />
                          </Col>
                          <Col sm="1.5">
                            <Label size="sm" htmlFor="input-small">Transdate</Label>
                          </Col>
                          <Col sm="4">
                            <Input bsSize="sm"  type="date"  id="input-small" name="input-small" className="input-sm" placeholder="date" />
                          </Col>
                        </FormGroup>
                        <FormGroup row style={{  height:15 }}>
                          <Col sm="2">
                            <Label size="sm" htmlFor="input-small">Gruppe</Label>
                          </Col>
                          <Col sm="4">
                            <Input className ="flex-row" type="select" name="parent" id="parent-id"
                                   value={parent} onChange={handleInputChange} >
                                 {value.data.hits.map(item => mapping(item))};

                            </Input>

                          </Col>
                          <Col sm="1.5">
                            <Label size="sm" htmlFor="input-small">Updated</Label>
                          </Col>
                          <Col sm="5">
                            <Input disabled bsSize="sm" type="text" id="input-small" name="input-small" className="input-sm" placeholder="31.12.2019" />
                          </Col>
                        </FormGroup>
                        <FormGroup row style={{  height:15 }}>
                          <Col sm="2">
                            <Label size="sm" htmlFor="input-small">Description</Label>
                          </Col>
                          <Col sm="10">
                            <Input type="texarea" name="description" id="description" rows="4"
                                    placeholder="Content..." value={description} onChange={handleInputChange} />
                          </Col>
                        </FormGroup>
                    </Collapse>
                </Form>
             </Grid>
             <EnhancedTable props={props} style={{padding:0, height:50}}/>
      </>)
  }

  return buildForm(current);

};
export default GenericMasterfileForm;


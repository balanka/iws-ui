import React, {useEffect, useState, useContext} from 'react'
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row} from "reactstrap";
import {AccountContext} from './AccountContext';
import InputSelect2 from "./InputSelect2";

const GenericMasterfileForm = () => {

  const value = useContext(AccountContext);
  const user_id = value.user.id.value;
  const user_name = value.user.name;
  const user_description = value.user.description;
  const editing_ = value.editing;
  const [data, setData] = useState(value.data);
  const [user,setUser] = useState(value.user);
  const [id,setId] = useState(user_id);
  const [name,setName] = useState(user_name);
  const [description, setDescription] = useState(user_description);
  const [editing, setEditing] = useState(editing_);
  useEffect(() => {}, [user, setUser, data, setData, setEditing ]);
  useEffect(() => {setUser(value.user)}, [ value, setUser, id, name, description]);
  useEffect(() => { setId(user_id)}, [user_id, user.id ]);
  useEffect(() => { setName(user_name)}, [user_name, user.name ]);
  useEffect(() => { setDescription(user_description)}, [user_description, user.description ]);
  useEffect(() => { setEditing(editing_)}, [editing_ ]);
  console.log('editing', editing);
  console.log('editing_', editing_);
  console.log('value', value);
  console.log('id', id);
  console.log('name', name);
  console.log('description', description);
  console.log('value.id', value.user.id.value);
  console.log('value.name', value.user.name);
  console.log('value.description', value.user.description);

  const initAdd =()=> {
    const current_ = value.initialState;
    const row = {
      id: current_.id, name: current_.name, description: current_.description,
      modelId: current_.modelId, parent: current_.parent, editing: false
    };
    setEditing(false);
    value.editRow(row);
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    console.log("editing", editing);
    initAdd();
  };
  const handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log("name", name);
    console.log("value", value);
    //setUser({ ...user, [name]: value });
    if(name==='id') setId(value);
    if(name==='name') setName(value);
    if(name==='description') setDescription(value);
    console.log('user', user);
  };

  const setEditingx = (_editing_) => {
     setEditing(_editing_);
  };
  const mappingx = (item) => (
    {label: item.id.value+ " ".concat (item.name), value: item.id.value}
  );

  const submitEdit = event => {
    event.preventDefault();
    const row = {id:{value:id}, name:name, description:description,
      modelId:user.modelId, parent:user.parent};
    setUser(row);
    value.submitEdit(row);
    console.log("submitEdit user", user);
  };

  const submitAdd = event => {
    event.preventDefault();
    const row = {id:{value:id}, name:name, description:description,
      modelId:user.modelId, parent:user.parent};
    setUser(row);
    value.submitAdd(row);
    //initAdd();
    console.log('submitAdd user', user);
  };

  function buildForm(user1){
    console.log("editing", editing);
    console.log("user1", user1);
    const addOrEdit = (typeof user1.editing==='undefined')?editing:user1.editing;
    return <Row>
      <Col xs="12" md="12">
        <Form className="sign-up-form" onSubmit={ addOrEdit?submitEdit:submitAdd}>
          <Card>
            <CardHeader>
              <strong>{addOrEdit?value.updateLabel:value.addLabel}</strong>
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Col sm="2">
                  <Label size="sm" htmlFor="input-small">Id</Label>
                </Col>
                <Col sm="10">
                  <input type="text" name="id" value= {id} onChange={handleInputChange}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="2">
                  <Label size="sm" htmlFor="input-small">Name</Label>
                </Col>
                <Col sm="10">
                  <input type="text" name="name" value={name} onChange={handleInputChange}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="2">
                  <Label size="sm" htmlFor="input-small">Description</Label>
                </Col>
                <Col sm="10">
                  <input type="text" name="description" value={description} onChange={handleInputChange}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="2">
                  <Label size="sm" htmlFor="input-small">Group</Label>
                </Col>
                <Col xs="4">
                  <InputSelect2  name ="parent_edit" id ="parent_edit"
                                 data      = {value.data.hits.map(xx => mappingx(xx))
                                   .sort(function(a,
                                                  b)
                                   {return a.id - b.id}) }
                                 current   = {user1}
                                 editRow   = {value.editRow}
                                 editing   = {editing}
                                 setEditing   = {setEditingx}
                                 setParent =  {value.setCurrent}  />

                </Col>
              </FormGroup>
            </CardBody>
          </Card>
          <CardFooter>
            <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o">
            </i> {addOrEdit?value.updateLabel:value.addLabel}</Button>
            <Button onClick={cancelEdit}  type="reset" size="sm" color="danger">
              <i className="fa fa-ban"></i> Cancel</Button>
          </CardFooter>
        </Form>
      </Col>
    </Row>;
  }

  return buildForm(user);

};
export default GenericMasterfileForm

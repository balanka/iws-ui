import React, {useEffect, useState} from 'react'
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row} from "reactstrap";
import Select2New from "./Select2New";
import GenericMasterfileForm from "./GenericMasterfileForm";


const EditGenericForm_New = props => {
        const [ user, setUser ] = useState(props.currentUser);
        const [record, setRecord] = useState(null);
        const [changed, setChanged] = useState(false);
        console.log("user+++++++++++++++++++++========",user)
        useEffect(
          () => {
            setUser(props.currentUser)
          },
          [ props, user, setUser ]);
        useEffect(
           () => {
            console.log("record", record);
           },
           [setRecord, setChanged]);

     const handleInputChange = event => {
       const { name, value } = event.target
       setUser({ ...user, [name]: value })
     };

  const submit = event => {
    event.preventDefault();
    console.log("record", record);
     const newRecord=changed?{id:user.id,
                    name:user.name,
                    description:user.description,
                    modelId:user.modelId,
                    parent:record.parent}:user;
     props.submit(newRecord)
  };

  const cancelEdit = () => props.setEditing(false);

  function buildForm(cdata) {
    return <Row>
      <Col xs="12" md="12">
        <Form className="sign-up-form" onSubmit={submit}>
          <Card>
            <CardHeader>
              <strong>Generic</strong>
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Col sm="2">
                  <Label size="sm" htmlFor="input-small">Id</Label>
                </Col>
                <Col sm="10">
                  <input type="text" name="id" value={
                    typeof cdata === "undefined" ? cdata.id : cdata.id.value}
                         onChange={handleInputChange}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="2">
                  <Label size="sm" htmlFor="input-small">Name</Label>
                </Col>
                <Col sm="10">
                  <input type="text" name="name" value={cdata.name} onChange={handleInputChange}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="2">
                  <Label size="sm" htmlFor="input-small">Description</Label>
                </Col>
                <Col sm="10">
                  <input type="text" name="description" value={cdata.description} onChange={handleInputChange}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="2">
                  <Label size="sm" htmlFor="input-small">Group</Label>
                </Col>
                <Col sm="4">
                  <Select2New name="parent_edit2" id="parent_edit2"
                           data={props.data}
                           current={user}
                           refresh={props.setRefresh}
                           editRow={props.editRow}
                           editing={props.editing}
                  />
                </Col>
              </FormGroup>
            </CardBody>
          </Card>
          <CardFooter>
            <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o">
            </i> Update User</Button>
            <Button onClick={cancelEdit} type="reset" size="sm" color="danger">
              <i className="fa fa-ban"></i> Cancel</Button>
          </CardFooter>
        </Form>
      </Col>
    </Row>;
  }

  return <GenericMasterfileForm user={user}
                                name="parent_edit2"
                                id="parent_edit2"
                                data={props.data}
                                rowData = {props.rowData}
                                refresh={props.setRefresh}
                                editRow={props.editRow}
                                editing={props.editing}
                                edit_submit={submit}
                                change={handleInputChange}
                                cancelEdit ={cancelEdit}
                                deleteUser={props.deleteUser}
                                headers={props.headers}
                                />;




// return buildForm(user);
};
 export default EditGenericForm_New;

import React, {useEffect, useState} from 'react'
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row} from "reactstrap";
import Select2 from "./Select2";
import axios from "axios";

const EditGenericForm = props => {
        const [ user, setUser ] = useState(props.currentUser);
        const [record, setRecord] = useState(null);
        const [changed, setChanged] = useState(false);
        const setParent = (parent) => setRecord(parent);
        console.log("user+++++++++++++++++++++========",user)
        useEffect(
          () => {
            setUser(props.currentUser)
          },
          [ props, setUser ])
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
     var newRecord=changed?{id:user.id, name:user.name, description:user.description,
                     modelId:user.modelId, parent:record.parent}:user;
    axios.patch( props.url, newRecord)
      .then(response => {
        console.log(' response.data.', response.data);
        const index = props.rowData.findIndex(obj => obj.id.value == newRecord.id.value);
        props.rowData[index]=newRecord;
        setUser(newRecord);
        setParent(newRecord);
        props.setRefresh(true);
        props.editRow(newRecord);

      })
  };
        return (
            <Row>
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
                                    typeof user.id.value ==="undefined"?user.id:user.id.value}
                                         onChange={handleInputChange} />
                                </Col>
                              </FormGroup>
                                <FormGroup row>
                                    <Col sm="2">
                                        <Label size="sm" htmlFor="input-small">Name</Label>
                                    </Col>
                                    <Col sm="10">
                                        <input type="text" name="name" value={user.name} onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm="2">
                                        <Label size="sm" htmlFor="input-small">Description</Label>
                                    </Col>
                                    <Col sm="10">
                                        <input type="text" name="description" value={user.description} onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                              <FormGroup row>
                                <Col sm="2">
                                  <Label size="sm" htmlFor="input-small">Group</Label>
                                </Col>
                                <Col sm="4">
                                  <Select2 url = {props.url} name ="parent_edit2" id ="parent_edit2"
                                                data = {props.data}
                                                current={user}
                                                refresh={props.setRefresh}
                                                setParent={setParent}
                                                editRow={props.editRow}
                                                />

                                </Col>
                              </FormGroup>
              </CardBody>
                    </Card>
                    <CardFooter>
                        <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Update User</Button>
                        <Button onClick={() => props.setEditing(false)} type="reset" size="sm"  color="danger"><i className="fa fa-ban"></i> Cancel</Button>
                    </CardFooter>
                </Form>
            </Col>
            </Row>
        )
    }
    export default EditGenericForm

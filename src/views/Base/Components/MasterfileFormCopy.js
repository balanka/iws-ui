import React, {useEffect, useState} from 'react'
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row} from "reactstrap";
import InputSelect2 from "./InputSelect2";
import axios from "axios";

const MasterfileForm = props => {
  //const [ current, setCurrent ] = useState(props.current);
  const [ current1, setCurrent1 ] = useState(props.current);
  const [ data, setData ] = useState(props.data);
  const [ record, setRecord ] = useState(null);
  const initData = { id: { value:'-1'}, name: '', description: '' , modelId:'0', parent:'0' };
  //console.log("data", data);
  //console.log("current", current);
  // console.log("props.current", props.current);

  useEffect(
      () => {
        console.log("record", record);
      },
        [data,record, setRecord]);

  /*useEffect(
    () => {
      setData(props.data);
    },
    [ props.data]);

   */



  const setParent = (parent) => setRecord(parent);
   const handleInputChange = event => {
     const { name, value } = event.target;
            console.log(value);
            console.log(name);
            setCurrent1({ ...current1, [name]: value });
            console.log(current1)
   };


  const submit = event => {
    event.preventDefault();
    console.log("record", record);
    console.log("current1", current1);
    console.log("props.url", props.url);
    axios.patch( props.url, record)
      .then(response => {
          console.log(' response.data.', response.data);
          props.setCurrent(record)
           //props.setSearch("setSearch")
      })
  };
        return (

            <Row>
                <Col xs="12" md="12">
                    <Form className="sign-up-form" onSubmit={submit}>
                        <Card>
                            <CardHeader>
                                <strong>{props.formName}</strong>
                            </CardHeader>
                            <CardBody>
                              <FormGroup row>
                                <Col sm="2">
                                  <Label size="sm" htmlFor="input-small">Id</Label>
                                </Col>
                                <Col sm="10">
                                  <input type="text" name="id" value={

                                     typeof current1.id.value ==="undefined"?current1.id:current1.id.value}
                                         onChange={handleInputChange} />
                                </Col>
                              </FormGroup>
                                <FormGroup row>
                                    <Col sm="2">
                                        <Label size="sm" htmlFor="input-small">Name</Label>
                                    </Col>
                                    <Col sm="10">
                                        <input type="text" name="name" value={current1.name} onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm="2">
                                        <Label size="sm" htmlFor="input-small">Description</Label>
                                    </Col>
                                    <Col sm="10">
                                        <input type="text" name="description" value={current1.description} onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                              <FormGroup row>
                                <Col sm="2">
                                  <Label size="sm" htmlFor="input-small">Group</Label>
                                </Col>
                                <Col sm="4">
                                  <InputSelect2 url = {props.url} name ="parent_edit" id ="parent_edit"
                                               value={current1.parent} onChange={handleInputChange} data={data} current={current1}  setParent={setParent}  />

                                </Col>
                              </FormGroup>
              </CardBody>
                    </Card>
                    <CardFooter>
                        <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> {props.submitButtonLabel}</Button>
                        <Button onClick={() => {props.setEditing(false); setCurrent1(initData)}} type="reset" size="sm"  color="danger"><i className="fa fa-ban"></i> Cancel</Button>
                    </CardFooter>
                </Form>
            </Col>
            </Row>
        )
    }
    export default MasterfileForm

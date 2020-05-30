import React, {useEffect, useState} from 'react'
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row} from "reactstrap";
import InputSelect from "./InputSelect";
import axios from "axios";

const MasterfileForm3 = props => {

  const [ data, setQuery] = [props.data, props.setQuery];

  const initialState = { id:{value:''}, name: '', description: '', modelId:0, parent:'0' }
       /* const [ data, setData ] = useState(props.current)
        useEffect(
            () => { setData(props.current)},
                  [ props]
               )
        */

        const handleInputChange = event => {
            const { name, value } = event.target
            console.log(value)
          console.log(name)
            setData({ ...data, [name]: value })
          console.log(data)
        }

  const submit = event => {
    event.preventDefault()
    console.log(data)
    var id = new Object();
    id.value=data.id;
    const obj = new Object();
    obj.id = new Object()
    obj.id.value=data.id
    obj.name = data.name
    obj.description=data.description
    obj.modelId=data.modelId
    obj.parent=data.parent
    console.log({obj})
    console.log(obj)
    if (!data.name || !data.description) return
    console.log({data})
    setQuery(data);
    //const result =  axios.patch( props.url, data);
   // console.log({result})
    //setData(initialState)

  }
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
                                     typeof data.id.value ==="undefined"?data.id:data.id.value}
                                         onChange={handleInputChange} />
                                </Col>
                              </FormGroup>
                                <FormGroup row>
                                    <Col sm="2">
                                        <Label size="sm" htmlFor="input-small">Name</Label>
                                    </Col>
                                    <Col sm="10">
                                        <input type="text" name="name" value={data.name} onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm="2">
                                        <Label size="sm" htmlFor="input-small">Description</Label>
                                    </Col>
                                    <Col sm="10">
                                        <input type="text" name="description" value={data.description} onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                              <FormGroup row>
                                <Col sm="2">
                                  <Label size="sm" htmlFor="input-small">Group</Label>
                                </Col>
                                <Col sm="4">
                                  <InputSelect url = {props.url}  current={props.current} name ="parent_edit" id ="parent_edit"
                                               value={data.parent} onChange={handleInputChange} setData={setData}/>

                                </Col>
                              </FormGroup>
              </CardBody>
                    </Card>
                    <CardFooter>
                        <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> {props.submitButtonLabel}</Button>
                        <Button onClick={() => props.setEditing(false)} type="reset" size="sm"  color="danger"><i className="fa fa-ban"></i> Cancel</Button>
                    </CardFooter>
                </Form>
            </Col>
            </Row>
        )
    }
    export default MasterfileForm3

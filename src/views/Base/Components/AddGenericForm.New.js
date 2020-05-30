
import React, { useState } from 'react'
import {Card, Button, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,} from 'reactstrap';
import Select from "./Select";
import axios from "axios";

 export default function AddGenericForm_New (props ) {

   const initialState = props.initialState;
   console.log("initialState"+initialState);
   console.log("props.initialState"+props.initialState);
   const [ current, setCurrent ] = useState(initialState);
   console.log("current<<<<<<<<"+current);
   console.log("current = undefined<<<<<<<<"+typeof current==="undefined");
   const current1=props.current;
   console.log("current1.id >>>>>"+current1.id + '====='+current1.name);

   const setParent = (parent) => setCurrent(parent);
   const editRow = (user )=>props.editRow(user, true);

   const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrent({ ...current, [name]: value })
    }

   const build=(data)=>{
     var id = new Object();
     id.value=data.id;
     const obj = new Object();
     obj.id = new Object();
     obj.id.value=data.id;
     obj.name = data.name;
     obj.description=data.description;
     obj.modelId=data.modelId;
     obj.parent=data.parent;
     return obj;
   };


   const submit = event => {
     event.preventDefault();
     const data=build(current1)
     console.log("data",data);
     console.log("record",current);
     console.log("current1",current1);
     console.log("props.url",props.url);
     axios.post( props.url, data)
       .then(response => {
         console.log(' response.data.', response.data);
         //props.setCurrent(data);
         var i = props.rowData.findIndex(obj => obj.id.value == data.id.value);
         var index = i == -1? props.rowData.length+1:i;
         console.log(' index', index);
         props.rowData[index]=data;
         //props.setData(props.rowData);
         setParent(data);
         props.setRefresh(true);
         props.editRow(data);
       });
   };
     return (
         <Row>
             <Col xs="12" md="12">
                 <Form className="sign-up-form" onSubmit={submit} >
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
                               <input type="text" name="id" value = {
                                 typeof current ==="undefined"?"":current.id.value}
                                 onChange={handleInputChange}   />
                             </Col>
                           </FormGroup>
                             <FormGroup row>
                                 <Col sm="2">
                                     <Label size="sm" htmlFor="input-small">Name</Label>
                                 </Col>
                                 <Col sm="10">
                                     <input type="text" name="name" value={current.name} onChange={handleInputChange} />
                                  </Col>
                             </FormGroup>
                             <FormGroup row>
                                 <Col sm="2">
                                     <Label size="sm" htmlFor="input-small">Description</Label>
                                 </Col>
                                 <Col sm="10">
                                     <input type="text" name="description" value={current.description} onChange={handleInputChange} />
                                 </Col>
                             </FormGroup>
                           <FormGroup row>
                             <Col sm="2">
                               <Label size="sm" htmlFor="input-small">Group</Label>
                             </Col>
                             <Col sm="4">
                               <Select url = {props.url} name ="parent_edit" id ="parent_edit"
                                        data = {props.data}
                                        current={current}
                                        refresh={props.setRefresh}
                                        setParent={setParent}
                                        editRow = {editRow}
                               />

                             </Col>
                           </FormGroup>
                         </CardBody>
                     </Card>
                     <CardFooter>
                         <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Add new User</Button>
                         <Button onClick={() => {setCurrent(initialState); props.cancel()}} type="reset" size="sm"  color="danger"><i className="fa fa-ban"></i> Cancel</Button>
                     </CardFooter>
                 </Form>
             </Col>
         </Row>

     )
}


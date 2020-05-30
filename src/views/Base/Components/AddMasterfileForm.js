import React, {useEffect, useState} from 'react'
import {Card, Button, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,} from 'reactstrap';
import InputSelect from "./InputSelect";
import axios from "axios";
import InputSelect2 from "./InputSelect2";

 export default function AddMasterfileForm (props ) {
   const initData = { id:{ value:'-1'}, name: '', description: '' , modelId:'0', parent:'0' };
   const [ current, setCurrent ] = useState(initData);
   const [ record, setRecord ] = useState(null);
   const setParent = (parent) => setRecord(parent);
   const handleInputChange = event => {
        const { name, value } = event.target;
         setCurrent({ ...current, [name]: value });
         console.log(current)
    };
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
         const data=build(current)
         console.log("current1data",data)
         console.log("record",record)
         axios.post( props.url, data)
           .then(response => {
                console.log(' response.data.', response.data);
                props.setCurrent(data);
               setCurrent(initData);
            });
     };
     return (
         <Row>
             <Col xs="12" md="12">
                 <Form className="sign-up-form" onSubmit={submit} >
                     <Card>
                         <CardHeader>
                             <strong>Add Masterfiles</strong>
                         </CardHeader>
                         <CardBody>
                             <FormGroup row>
                                 <Col sm="2">
                                     <Label size="sm" htmlFor="input-small">Id</Label>
                                 </Col>
                                 <Col sm="10">
                                     <input type="text" name="id" value = {
                                       typeof current.id.value ==="undefined"?current.id:current.id.value}
                                            onChange={handleInputChange}/>
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
                             <Col sm="6">
                                 <InputSelect2 url = {props.url} name ="parent_edit" id ="parent_edit"
                                             value={current.parent} onChange={handleInputChange} data={props.data} current={current}  setParent={setParent}  />

                             </Col>
                           </FormGroup>
                         </CardBody>
                     </Card>
                     <CardFooter>
                         <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Add new Masterfile</Button>
                         <Button onClick={() =>  props.cancel()} type="reset" size="sm"  color="danger"><i className="fa fa-ban"></i> Cancel</Button>
                     </CardFooter>
                 </Form>
             </Col>
         </Row>

     )
}


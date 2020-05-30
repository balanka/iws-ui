import React, {useEffect, useState} from 'react'
import {Card, Button, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,} from 'reactstrap';
import InputSelect from "./InputSelect";
import axios from "axios";
import InputSelect2 from "./InputSelect2";

 export default function AddMasterfileForm (props ) {
   const initData = { id:{ value:'-1'}, name: '', description: '' , modelId:'0', parent:'0' };
   const [ current, setCurrent ] = useState(initData);
   const [ current1, setCurrent1 ] = useState(initData);
    //const [ data, setData ] = useState(initialState);
   const [ data, setData ] = useState(props.data);
   const [ record, setRecord ] = useState(null);
   console.log("current",current);
/*
   useEffect(
     () => {
       console.log("current", current);
     },
     [current, setCurrent]);

   useEffect(
     () => {
       setData(props.data);
     },
     [ props.data]);


 */
   const setParent = (parent) => setRecord(parent);
    const handleInputChange = event => {
        const { name, value } = event.target;
         console.log(name)
         console.log(value)
         //setData({ ...data, [name]: value });
         setCurrent1({ ...current1, [name]: value });
         console.log(current)
         console.log(current1)
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
         const data=build(current1)
       console.log("current1data",data)
       console.log("record",record)
       axios.post( props.url, data)
         .then(response => {
           console.log(' response.data.', response.data);
           props.setCurrent(data);
           setCurrent1(initData);
         });
         /*
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

       const result =  axios.post( props.url, obj);
       console.log({result})
         setData(initialState)
      */
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
                                       typeof current1.id.value ==="undefined"?current1.id:current1.id.value}
                                            onChange={handleInputChange}/>
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
                             <Col sm="6">
                                 <InputSelect2 url = {props.url} name ="parent_edit" id ="parent_edit"
                                             value={current1.parent} onChange={handleInputChange} data={data} current={current1}  setParent={setParent}  />

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


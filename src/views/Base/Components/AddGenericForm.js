
import React, { useState } from 'react'
import {Card, Button, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,} from 'reactstrap';
import Select2 from "./Select2";
import axios from "axios";
import GenericTable from "../Tables2/GenericTable";

 export default function AddGenericForm (props ) {

    const initialState = props.initialState;
    const [ current, setCurrent ] = useState(initialState);
   const setParent = (parent) => setCurrent(parent);
   const editRow = (user )=>props.editRow(user, true)
   const current1=props.current;
   const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrent({ ...current, [name]: value })
    };

   const submit = event => {
     event.preventDefault();
     const data={id:{value:current1.id}, name:current1.name,
       description:current1.description, modelId:current1.modelId, parent:current1.parent};
     console.log("data",data);
     console.log("record",current);
     console.log("current1",current1);
     console.log("props.url",props.url);
     axios.post( props.url, data)
       .then(response => {
         const i = props.rowData.findIndex(obj =>
           (typeof obj==="undefined")?data.id.value="":obj.id.value===data.id.value );
         const index = i === -1? props.rowData.length+1:i;
         console.log(' index', index);
         props.rowData[index]=data;
         setParent(data);
         props.setRefresh(true);
         props.editRow(data);
       });
   };
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
                   <input type="text" name="id" value={cdata.id} onChange={handleInputChange}/>
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
                   <Select2 name="parent_edit" id="parent_edit"
                            data={props.data}
                            current={cdata}
                            refresh={props.setRefresh}
                            editRow={editRow}
                            editing={props.editing}
                   />

                 </Col>
               </FormGroup>
             </CardBody>
           </Card>
           <CardFooter>
             <GenericTable data={props.rowData} editRow={props.editRow}  headers={props.headers}/>

             <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Add new
               User</Button>
             <Button onClick={() => {
               setCurrent(initialState);
               props.cancel()
             }} type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Cancel</Button>
           </CardFooter>
         </Form>
       </Col>
     </Row>;
   }

   return buildForm(current);

}



import React, { useState } from 'react'
import {Card, Button, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,} from 'reactstrap';
import InputSelect from "./InputSelect";

 export default function AddUserForm2 (props ) {

    const initialState =props.initialState // { id: null, name: '', username: '', parent:'0' }
    const [ user, setUser ] = useState(initialState)

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    }

     const submit = event => {
         event.preventDefault()
         if (!user.name || !user.username) return
         props.addUser(user)
         setUser(initialState)
     }
     return (
         <Row>
             <Col xs="12" md="12">
                 <Form className="sign-up-form" onSubmit={submit} >
                     <Card>
                         <CardHeader>
                             <strong>Masterfiles</strong>
                         </CardHeader>
                         <CardBody>
                           <FormGroup row>
                             <Col sm="2">
                               <Label size="sm" htmlFor="input-small">Id</Label>
                             </Col>
                             <Col sm="10">
                               <input type="text" name="id" value={user.id}  />
                             </Col>
                           </FormGroup>
                             <FormGroup row>
                                 <Col sm="2">
                                     <Label size="sm" htmlFor="input-small">Login</Label>
                                 </Col>
                                 <Col sm="10">
                                     <input type="text" name="name" value={user.name} onChange={handleInputChange} />
                                  </Col>
                             </FormGroup>
                             <FormGroup row>
                                 <Col sm="2">
                                     <Label size="sm" htmlFor="input-small">Password</Label>
                                 </Col>
                                 <Col sm="10">
                                     <input type="text" name="username" value={user.username} onChange={handleInputChange} />
                                 </Col>
                             </FormGroup>
                           <FormGroup row>
                             <Col sm="2">
                               <Label size="sm" htmlFor="input-small">Group</Label>
                             </Col>
                             <Col sm="4">
                               <InputSelect url = {props.url} name ="parent_edit" id ="parent_edit"
                                             value = {user.parent} onChange = {handleInputChange}
                                             data = {props.data.sort(function(a, b){return a.id - b.id}) }
                                            current={user}
                                            setParent={props.setParent}  />

                             </Col>
                           </FormGroup>
                         </CardBody>
                     </Card>
                     <CardFooter>
                         <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Add new User</Button>
                         <Button onClick={() => {setUser(initialState); props.cancel()}} type="reset" size="sm"  color="danger"><i className="fa fa-ban"></i> Cancel</Button>
                     </CardFooter>
                 </Form>
             </Col>
         </Row>

     )
}


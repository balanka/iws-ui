
import React, { useState } from 'react'
import {Card, Button, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,} from 'reactstrap';

 export default function AddUserForm (props ) {

    const initialFormState = { id: null, name: '', username: '' }
    const [ user, setUser ] = useState(initialFormState)

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    }

     const submit = event => {
         event.preventDefault()
         if (!user.name || !user.username) return
         props.addUser(user)
         setUser(initialFormState)
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

                         </CardBody>
                     </Card>
                     <CardFooter>
                         <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Add new User</Button>
                         <Button onClick={() => {setUser(initialFormState); props.cancel()}} type="reset" size="sm"  color="danger"><i className="fa fa-ban"></i> Cancel</Button>
                     </CardFooter>
                 </Form>
             </Col>
         </Row>

     )
}


import React, {useEffect, useState} from 'react'
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row} from "reactstrap";

const EditUserForm = props => {
        const [ user, setUser ] = useState(props.currentUser)

        useEffect(
            () => {
                setUser(props.currentUser)
            },
            [ props ]
        )
        // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

        const handleInputChange = event => {
            const { name, value } = event.target

            setUser({ ...user, [name]: value })
        }

        return (
            <Row>
                <Col xs="12" md="12">
                    <Form className="sign-up-form" onSubmit={event => {
                        event.preventDefault()
                        props.updateUser(user.id, user)
                       }} >
                        <Card>
                            <CardHeader>
                                <strong>Masterfiles</strong>
                            </CardHeader>
                            <CardBody>
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
                                        <Label size="sm" htmlFor="input-small">Username</Label>
                                    </Col>
                                    <Col sm="10">
                                        <input type="text" name="username" value={user.username} onChange={handleInputChange} />
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
    export default EditUserForm

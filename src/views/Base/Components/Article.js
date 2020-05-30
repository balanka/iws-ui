import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
export default function Article() {
    return (
    <Accordion defaultActiveKey="0">
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
                Article !
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
                <Card.Body>Hello! I'm the Article body</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
                Article2!
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
                <Card.Body>Hello! I'm Article2 body</Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>
    )
}

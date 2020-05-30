import React from 'react';
import {Card,Button, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label} from "reactstrap";
import MySelect from './MySelect';

export default function MasterfileForm2() {
    return (

      <Card>
        <CardHeader>
          <strong>Masterfiles</strong>
        </CardHeader>
        <CardBody>

          <Form action="" method="post" className="form-horizontal">
            <FormGroup row>
              <Col sm="2">
                <Label size="sm" htmlFor="input-small">Id</Label>
              </Col>
              <Col sm="4">
                <Input bsSize="sm" type="text" id="input-id" name="id" className="input-sm" placeholder="Id" />
              </Col>
              <Col sm="1.5">
                <Label size="sm" htmlFor="input-small">Enterdate</Label>
              </Col>
              <Col sm="4">
                <Input disabled bsSize="sm" type="text"  id="input-small" name="enterdate" className="input-sm" placeholder="31.12.2019" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm="2">
                <Label size="sm" htmlFor="input-small">Name</Label>
              </Col>
              <Col sm="4">
                <Input bsSize="sm" type="text" id="input-small" name="name" className="input-sm" placeholder="Name" />
              </Col>
              <Col sm="1.5">
                <Label size="sm" htmlFor="input-small">Transdate</Label>
              </Col>
              <Col sm="4">
                <Input bsSize="sm"  type="date"  id="input-small" name="input-small" className="input-sm" placeholder="date" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm="2">
                <Label size="sm" htmlFor="input-small">Gruppe</Label>
              </Col>
              <Col sm="4">
                <MySelect url ="http://localhost:8080/pets/acc"/>
              </Col>
              <Col sm="1.5">
                <Label size="sm" htmlFor="input-small">Updated</Label>
              </Col>
              <Col sm="5">
                <Input disabled bsSize="sm" type="text" id="input-small" name="input-small" className="input-sm" placeholder="31.12.2019" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm="2">
                <Label size="sm" htmlFor="input-small">Description</Label>
              </Col>
              <Col sm="10">
                <Input type="textarea" name="textarea-input" id="textarea-input" rows="4"
                       placeholder="Content..." />
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
        <CardFooter>
          <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
          <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
          <Card>
            <CardHeader>
              <strong>Masterfiles</strong>
            </CardHeader>
            <CardBody>

              <Form action="" method="post" className="form-horizontal">
                <FormGroup row>
                  <Col sm="2">
                    <Label size="sm" htmlFor="input-small">Id</Label>
                  </Col>
                  <Col sm="4">
                    <Input bsSize="sm" type="text" id="input-id" name="id" className="input-sm" placeholder="Id" />
                  </Col>
                  <Col sm="1.5">
                    <Label size="sm" htmlFor="input-small">Enterdate</Label>
                  </Col>
                  <Col sm="4">
                    <Input disabled bsSize="sm" type="text"  id="input-small" name="enterdate" className="input-sm" placeholder="31.12.2019" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm="2">
                    <Label size="sm" htmlFor="input-small">Name</Label>
                  </Col>
                  <Col sm="4">
                    <Input bsSize="sm" type="text" id="input-small" name="name" className="input-sm" placeholder="Name" />
                  </Col>
                  <Col sm="1.5">
                    <Label size="sm" htmlFor="input-small">Transdate</Label>
                  </Col>
                  <Col sm="4">
                    <Input bsSize="sm"  type="date"  id="input-small" name="input-small" className="input-sm" placeholder="date" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm="2">
                    <Label size="sm" htmlFor="input-small">Gruppe</Label>
                  </Col>
                  <Col sm="4">
                    <MySelect url ="http://localhost:8080/pets/acc"/>
                  </Col>
                  <Col sm="1.5">
                    <Label size="sm" htmlFor="input-small">Updated</Label>
                  </Col>
                  <Col sm="5">
                    <Input disabled bsSize="sm" type="text" id="input-small" name="input-small" className="input-sm" placeholder="31.12.2019" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm="2">
                    <Label size="sm" htmlFor="input-small">Description</Label>
                  </Col>
                  <Col sm="10">
                    <Input type="textarea" name="textarea-input" id="textarea-input" rows="4"
                           placeholder="Content..." />
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
              <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
            </CardFooter>
          </Card>
          )
        </CardFooter>
      </Card>
    )
}

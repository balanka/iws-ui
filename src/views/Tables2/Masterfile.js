import React, { useState, useEffect} from 'react';
import {  Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from 'axios';
export default function FetchMasterfileUsingHooks() {
  const [data, setData] = useState({ hits:[]});
  useEffect(async () => {
    const fetchM = async () => {
      const result = await axios(
        'http://localhost:8080/pets/mf',
      );
      setData(result.data);
    };
    fetchM();
  }, []);

//class Tables2 extends Component {
 // render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Combined All Table
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                  </thead>
                  <tbody>
                  {data.hits.map(item => (
                    <tr key={item.id.value}>
                      <td>{item.id.value}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))}

                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
}

export default Tables2;

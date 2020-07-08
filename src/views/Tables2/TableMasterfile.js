import React, { useState, useEffect} from 'react';
import {  Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from 'axios';
export default function TableMasterfile(props) {

  const [data, renderTableBody, headers] = [props.data, props.renderTableBody, props.headers];
  console.log("headers"+headers)
 /* const [data, setData] = useState( props.data);
  useEffect( () => {

    async function fetchM ( )  {
      const result = await axios( props.url);
      console.log("result:data")
      console.log(result.data)
      console.log(props.dataList)
      setData(result.data);
    };
    fetchM();
  }, []);
 */

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>ModelId</th>
                    <th>Group</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {data.hits.length > 0 ? data.hits.map(data => renderTableBody(data)) :
                    <tr>
                      <td colSpan={3}>No data</td>
                    </tr>
                  }
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


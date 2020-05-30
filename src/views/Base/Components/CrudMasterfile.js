import React, {useState, Fragment, useEffect} from 'react'

import AddMasterfileForm from './AddMasterfileForm'
import MasterfileForm from './MasterfileFormCopy1'
import TableMasterfile from '../Tables2/TableMasterfile'
import axios from "axios";
import useAsyncMasterfileHook from "./UseAsyncMasterfileHook";
import {Card, CardBody, Col, Pagination, PaginationItem, PaginationLink, Row, Table} from "reactstrap";

export default function CrudMasterfile( props) {


    const [query, setQuery] = useState("md/0");
    const [search, setSearch] = useState(props.get);
    const [refresh, setRefresh] = useState(true);
    const [headers, setHeaders] = useState(["Id","Name", "Description","ModelId", "Group", "Actions"]);
    const [ url] = [ props.url];
    //const [data, setData] = useAsyncMasterfileHook(query,url, search);
    const [data, setData] = useState({ hits:[]});
    //const [ current, setCurrent ] = useState({ id:{ value:'-1'}, name: '', description: '' , modelId:'0', parent:'0' });
    const [ current, setCurrent ] = useState({ id:{value:''}, name: '', description: '' , modelId:'0', parent:'0' });
    const [ editing, setEditing ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    //console.log("data", data);
   // var headers=["Id","Name", "Description","ModelId", "Group", "Actions"];
  useEffect(
    () => {
      console.log("refresh", refresh);
     // setSearch("")
    },
    [refresh, setRefresh]);
    useEffect(
     () => {
      console.log("editing", editing);
       setSearch("")
     },
    [editing, setEditing ]);

    useEffect(
    () => {
      console.log("current", current);
      //setSearch("")
    },
    [current, setCurrent]);

    useEffect(() => {
        setLoading(true);
        console.log('mounted or updated', loading);
        const url_ = url.concat(query);
        console.log("url_", url_);
        axios
          .get(url_)
          .then(response => {
              if (loading) {
                console.log(' response.data', response.data);
                setData(response.data);
                console.log('data.hits.length', data.hits.length);
              }
            }
          );
        return () => {
          console.log('will unmount');
          setLoading(false);
        }
  }, [loading, setData]);

  const mappingx = (item) => (
    {label: item.id.value.concat ( " ").concat (item.name), value: item.id.value}
  );
  const delete_ = id => {
    setEditing(false);
    console.log(data);
    setCurrent(data.hits.filter(user => user.id.value !== id));
  }

    const editRow = (data) => {
        setEditing(true);
        console.log("editing", editing);
        console.log("data", data);
        console.log("current", current);
        //setCurrent(data);
        setCurrent({ id: data.id, name: data.name, description: data.description , modelId:data.modelId,parent:data.parent});
        console.log("current after", current);
    }

    const cancel = () => {
        setEditing(false)
        setCurrent({ id:{ value:'-1'}, name: '', description: '' , modelId:'0', parent:'0' });
        //console.log(initialState)
    };

  const renderTableBody = data_ =>(
    <tr key={data_.id.value}>
      <td>{data_.id.value}</td>
      <td>{data_.name}</td>
      <td>{data_.description}</td>
      <td>{data_.modelId}</td>
      <td>{data_.parent}</td>
      <td>
        <button
          onClick={() => {
            editRow(data_)
          }}
          className="button muted-button"
        >
          Edit
        </button>
        <button
          onClick={() => delete_(data_.id)}
          className="button muted-button"
        >
          Delete
        </button>
      </td>
    </tr>
  );
    const renderTable  = (data_, headers)=>{
      {console.log("daten", data_.hits)}
    return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Table hover bordered striped responsive size="sm">
                    <thead>
                    <tr>
                      {headers.map( head =><th> {head}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    { data_.hits.map(row => renderTableBody(row)) }

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
      )
  };
    return (
      <div className="container">
        <div className="flex-row">
          <div className="flex-large">
                <Fragment>
                  <MasterfileForm
                    url ={props.url}
                    editing={editing}
                    setEditing={setEditing}
                    current = {current}
                    setCurrent={setCurrent}
                    formName="Edit Masterfile"
                    submitButtonLabel="Update Masterfile"
                    setRefresh={setRefresh}
                    setQuery={setQuery}
                    data={data.hits.map(xx => mappingx(xx))}
                    setData={setData}
                    rowData={data}
                  />
                </Fragment>

          </div>
          {
            renderTable(data, headers)
           }
        </div>
      </div>

    )
}

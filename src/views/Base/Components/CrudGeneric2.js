import React, {useState, Fragment, useEffect} from 'react'

import AddGenericForm from './AddGenericForm'
import EditGenericForm from './EditGenericFormNew'
import GenericTable from '../Tables2/GenericTable'
import  {CrudGenericContext} from './CrudGenericContext'

import axios from "axios";
import GenericMasterfileForm from "./GenericMasterfileForm";

export default function CrudGeneric(props) {

    const initialState = props.initialState;
    const headers = props.headers;
     console.log(' initialState', initialState );


    const [query, setQuery] = useState(props.get);
    const [ data, setData] = useState({ hits:[]});
    const [ current, setCurrent ] = useState(initialState);
    const [ user, setUser ] = useState(initialState);
    const [ editing, setEditing ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ refresh, setRefresh ] = useState(true);
    const  url = props.url;
    const  get = props.get;
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
  }, [setUser, url, query, loading, setData]);

  const submitEdit = newRecord => {
     console.log("newRecord", newRecord);
     axios.patch( props.url, newRecord)
      .then(response => {
        console.log(' response.data.', response.data);
        const index = data.hits.findIndex(obj => obj.id.value === newRecord.id.value);
        data.hits[index]= newRecord;
        setParent(newRecord);
        setRefresh(true);
        //editRow(newRecord);
      })
  };
  const submitAdd = event => {
    event.preventDefault();
    const data1={id: {value:current.id}, name:current.name, description: current.description,
      modelId:current.modelId, parent:current.parent};
      console.log("data",data1);
      console.log("record",current);
      console.log("props.url",props.url);
    axios.post( props.url, data1)
      .then(response => {
        console.log(' response.data.', response.data);
        var i = data.hits.findIndex(obj => obj.id.value === data1.id.value);
        var index = i === -1? data.hits.length+1:i;
        console.log(' index', index);
        data.hits[index]=data1;;
        setParent(data1);
        setRefresh(true);
        editRow(data1, true);
      });
  };


    // CRUD operations
    const addUser = user => {
        user.id = data.length + 1
        //setUsers([ ...users, user ])
        setData([ ...data, user ])
        console.log("data.length")
        console.log(data.length)
        console.log("data",data)
        data.forEach(function(entry) {
            console.log(entry);
        });
        console.log("data.length",data.length)
    }

    const deleteUser = id => setEditing(false);
    const cancelEdit = () => setEditing(false);
    const cancelAdd = (initState) => {setCurrent(initState); cancel()};

  const setParent = (user) => {console.log("user>>>>>", user);
                   typeof user==='undefined'? console.log("user is undefined !!!!",user):setCurrent(user)}//;

    const updateUser = (id, updated) => {
        setEditing(false);
        setData(data.hits.map(datax => (datax.id === id ? updated : datax)))
    }

    const editRow = (user, isNew)  => {
        console.log("user", user);
        console.log("editing", editing);
        console.log("isNew", isNew);
        submitEdit(user);
        setCurrent(user);
       setUser(user);

       console.log("current", current);
       console.log("user", user);
        setEditing(typeof isNew=='undefined');

    }

  const mappingx = (item) => (
    {label: item.id.value+ " ".concat (item.name), value: item.id.value}
  );
    const cancel = () => {
        setEditing(false)
        setCurrent(initialState)
        console.log("initialState")
        console.log(initialState)
    }
    return (
        <div className="container">
          <CrudGenericContext url={props.url} get={props.get} user={user} setUser={setUser}
                               editing={editing} setEditing={setEditing} submitEdit={submitEdit}
                               setCurrent={setCurrent} setRefresh={setRefresh} editRow={editRow}>
            <h1>CRUD App with Hooks</h1>
            <div className="flex-row">
                <div className="flex-large">
                    {editing ? (
                        <Fragment>
                            <h2>Edit user</h2>
                           <GenericMasterfileForm/>

                        </Fragment>
                    ) :
                        <Fragment>
                            <h2>Add user</h2>
                            <AddGenericForm url={props.url}
                                          addUser={addUser} cancel={cancel}
                                          data={data.hits.map(xx => mappingx(xx))}
                                          rowData={data.hits}
                                          setData={setData}
                                          setParent={setParent}
                                          setRefresh={setRefresh}
                                          initialState ={initialState}
                                          current={current}
                                          editRow={editRow}
                                          editing={editing}
                                          headers={headers}

                            />
                        </Fragment>
                    }
                </div>

                <GenericTable data={data.hits} editRow={editRow} deleteUser={deleteUser} headers={headers}/>

            </div>
         </CrudGenericContext>
        </div>
    )
}

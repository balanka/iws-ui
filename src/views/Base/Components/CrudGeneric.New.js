import React, {useState, Fragment, useEffect} from 'react'

import AddGenericForm from './AddGenericForm'
import EditGenericForm from './EditGenericForm'
import GenericTable from '../Tables2/GenericTable'
import axios from "axios";

export default function CrudGeneric_New(props) {

    const initialState = props.initialState;
    const [query, setQuery] = useState("md/0");
    const [ data, setData] = useState({ hits:[]});
    const [ current, setCurrent ] = useState(initialState);
    const [ editing, setEditing ] = useState(true);
    const [ loading, setLoading ] = useState(false);
    const [ refresh, setRefresh ] = useState(true);
    const [ url] = [ props.url];
    const headers=["Id","Name", "Description","ModelId", "Group", "Actions"];

  useEffect(
    () => {
      console.log("current", current);
      //setSearch("")
    },
    [current, data, setCurrent]);


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

  const submitEdit = newRecord => {
     console.log("newRecord", newRecord);
     axios.patch( props.url, newRecord)
      .then(response => {
        console.log(' response.data.', response.data);
        const index = data.hits.findIndex(obj => obj.id.value == newRecord.id.value);
        data.hits[index]= newRecord;
        setParent(newRecord);
        setRefresh(true);
        editRow(newRecord);
      })
  };
  const submitAdd = event => {
    event.preventDefault();
    const data1=build(current)
    console.log("data",data1);
    console.log("record",current);
    console.log("props.url",props.url);
    axios.post( props.url, data1)
      .then(response => {
        console.log(' response.data.', response.data);
        //props.setCurrent(data);
        var i = data.hits.findIndex(obj => obj.id.value == data1.id.value);
        var index = i == -1? data.hits.length+1:i;
        console.log(' index', index);
        data.hits[index]=data1;
        //props.setData(props.rowData);
        setParent(data1);
        setRefresh(true);
        editRow(data1, true);
      });
  };
  const build=(data)=>{
    var id = new Object();
    id.value=data.id;
    const obj = new Object();
    obj.id = new Object();
    obj.id.value=data.id;
    obj.name = data.name;
    obj.description=data.description;
    obj.modelId=data.modelId;
    obj.parent=data.parent;
    return obj;
  };
    // CRUD operations
    const addUser = user => {
        user.id = data.length + 1;
        //setUsers([ ...users, user ])
        setData([ ...data, user ]);
        console.log("data.length");
        console.log(data.length);
        console.log("data",data);
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
        setCurrent(user)
        setEditing(typeof isNew==='undefined');

    }

  const mappingx = (item) => (
    {label: item.id.value+ " ".concat (item.name), value: item.id.value}
  )
    const cancel = () => {
        setEditing(false);
        setCurrent(initialState);
        console.log("initialState");
        console.log(initialState);
    }
    return (
        <div className="container">
            <h1>CRUD App with Hooks</h1>
            <div className="flex-row">
                <div className="flex-large">
                    {editing ? (
                        <Fragment>
                            <h2>Edit user</h2>
                            <EditGenericForm
                                url         = {props.url}
                                cancel  = {cancelEdit}
                                currentUser = {current}
                                updateUser  = {updateUser}
                                setRefresh  = {setRefresh}
                                data        = {data.hits.map(xx => mappingx(xx))}
                                rowData     =  {data.hits}
                                setParent   = {setParent}
                                setCurrent  = {setCurrent}
                                editRow     = {editRow}
                                submit      = {submitEdit}

                            />
                        </Fragment>
                    ) :
                        <Fragment>
                            <h2>Add user</h2>
                            <AddGenericForm url={props.url}
                                          addUser={addUser}
                                          cancel={cancelAdd}
                                          currentUser={initialState}
                                          setRefresh={setRefresh}
                                          data={data.hits.map(xx => mappingx(xx))}
                                          rowData={data.hits}
                                          setData={setData}
                                          setParent={setParent}

                                          initialState ={props.initialState}
                                          current={current}
                                          editRow={editRow}
                                          submit={submitAdd}
                            />
                        </Fragment>
                    }
                </div>
                <GenericTable data={data.hits} editRow={editRow} deleteUser={deleteUser} headers={headers}/>

            </div>
        </div>
    )
}

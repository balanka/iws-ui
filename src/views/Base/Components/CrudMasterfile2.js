import React, {useState, Fragment, useEffect} from 'react'

import AddMasterfileForm from './AddMasterfileForm'
import MasterfileForm from './MasterfileForm'
import TableMasterfile from '../Tables2/TableMasterfile'
import axios from "axios";

export default function CrudMasterfile2( props) {

    const initialState = { id:{value:'-1'}, name: '', description: '' , modelId:'0', parent:'0' };
    const headers=["Id","Name", "Description","ModelId", "Group", "Actions"];
    const [data, setData] = useState({ hits:[]});
    const [ url, setUrl ] = useState(props.url);
    async function fetchM (url)  {
        const result =  await axios( url);
        return result.data
     };
    function log(d) {
      console.log("url"+url)
      console.log("result.data")
      console.log(d)
      console.log(data)
      setData(d);
      console.log(data)
    }
       useEffect( () => {
         fetchM(props.url).then(log);
          //const dt =  fetchM(props.url);
        }, []);
    const [ current, setCurrent ] = useState(initialState)
    const [ editing, setEditing ] = useState(false)
    const [ header, setHeader ] = useState(headers)

    const mapData = item => (
       <tr key={item.id.value}>
       <td>{item.id.value}</td>
       <td>{item.name}</td>
       <td>{item.description}</td>
       <td>{item.modelId}</td>
       <td>{item.parent}</td>
     </tr>
    )
 const refreshChild =(url )=>{
      //setUrl(props.url.concat(props.get))
   //setHeader(["Id1","Name", "Description","ModelId", "Group", "Actions"])
   fetchM(url.concat(props.get)).then(log)
   //fetchM(props.url.concat(props.get))
}
    const delete_ = id => {
        setEditing(false)
      console.log(data)
      setData(data.hits.filter(user => user.id.value !== id))
    }

    const updateData = (id, dta) => {
        setEditing(false)
        console.log(dta)
        console.log(data)
        setData(data.hits.map(elem => (elem.id.value === id ? dta : elem)))
        console.log(data)
    }

    const editRow = data => {
        setEditing(true)
        setCurrent({ id: data.id, name: data.name, description: data.description , modelId:data.modelId,parent:data.parent})
    }

    const cancel = () => {
        setEditing(false)
        setCurrent(initialState)
        //console.log(initialState)
    }

  const renderTableBody = data =>(
    <tr key={data.id.value}>
      <td>{data.id.value}</td>
      <td>{data.name}</td>
      <td>{data.description}</td>
      <td>{data.modelId}</td>
      <td>{data.parent}</td>
      <td>
        <button
          onClick={() => {
            props.editRow(data)
          }}
          className="button muted-button"
        >
          Edit
        </button>
        <button
          onClick={() => props.deleteUser(data.id)}
          className="button muted-button"
        >
          Delete
        </button>
      </td>
    </tr>
  )
    const renderTable  = ( daten)=>{
    return (
      <TableMasterfile url={url}
                       fetch={fetchM}
                       data={daten}
                       renderTableBody={renderTableBody}
                       headers={header}
                       mapData={mapData}/>
    )
  }
    return (
        <div className="container">
            <div className="flex-row">
                <div className="flex-large">
                    {editing ? (
                        <Fragment>
                            <MasterfileForm
                                url ={props.url}
                                editing={editing}
                                setEditing={setEditing}
                                current={current}
                                updateData={updateData}
                                formName="Edit Masterfile"
                                submitButtonLabel="Update Masterfile"
                                refreshChild={refreshChild}
                            />
                        </Fragment>
                    ) :
                        <Fragment>
                            <AddMasterfileForm url ={props.url} cancel={cancel} />
                        </Fragment>
                    }
                </div>
              { renderTable(data)}
            </div>
        </div>
    )
}

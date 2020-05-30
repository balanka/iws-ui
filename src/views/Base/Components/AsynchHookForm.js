import React, { useState } from "react";
import  AsyncHook from "./AsyncHook"
import TableMasterfile2 from '../Tables/TableMasterfile2'
export default function AsynchHookForm(props) {
    const [ url] = [ props.url];
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const [result, loading] = AsyncHook({query,url});
    const headers=["Title", "Actions"];
    const title = "Masterfiles";

  const renderTableBody = data =>(
    <tr key={data}>
      <td>{data}</td>
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
          onClick={() => props.deleteUser(data)}
          className="button muted-button"
        >
          Delete
        </button>
      </td>
    </tr>
  )

    return (
        <div className="App">
            <h1>Search for Books on any Topic</h1>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    setQuery(search);
                    console.log("url_", {url})
                }}
            >
                <label>Search : </label>
                <input type="text" onChange={e =>
                {
                  e.preventDefault();
                  setSearch(e.target.value)
                }
                } />
                <input type="submit" value="search" />
            </form>

            {loading === "false" ? (
                <h1>Search for Books</h1>
            ) : loading === "null" ? (
                <h1>No Book Found</h1>
            ) : (
              <TableMasterfile2 title ={title}
                data={result}
                renderTableBody={renderTableBody}
                 headers={headers}
                 />
            )}
        </div>
    );
}

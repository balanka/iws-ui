import React from 'react'
import { Table} from "reactstrap";

export default function  UserTable (props) {
    const renderTable = user =>(
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
          <td>{user.parent}</td>
            <td>
                <button
                    onClick={() => {
                        props.editRow(user)
                    }}
                    className="button muted-button"
                >
                    Edit
                </button>
                <button
                    onClick={() => props.deleteUser(user.id)}
                    className="button muted-button"
                >
                    Delete
                </button>
            </td>
        </tr>
    )

 return (
     <Table hover bordered striped responsive size="sm">
        <thead>
        <tr>
            {props.headers.map(header => <th>{header}</th>)}
        </tr>
        </thead>
        <tbody>{
           props.users.length > 0 ? props.users.map(user => renderTable(user)) :
            <tr>
                <td colSpan={3}>No users</td>
            </tr>
        }
        </tbody>
    </Table>
)

}

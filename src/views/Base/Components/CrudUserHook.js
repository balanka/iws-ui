import React, { useState, Fragment } from 'react'

import AddUserForm from './AddUserForm'
import EditUserForm from './EditUserForm'
import UserTable from '../Tables2/UserTable'

export default function CrudUserHook() {

    const usersData = [
        { id: 1, name: 'Tania', username: 'floppydiskette' },
        { id: 2, name: 'Craig', username: 'siliconeidolon' },
        { id: 3, name: 'Ben', username: 'benisphere' },
    ]

    const initialFormState = { id: -11, name: '', username: '' }

    // Setting state
    const [ users, setUsers ] = useState(usersData)
    const [ currentUser, setCurrentUser ] = useState(initialFormState)
    const [ editing, setEditing ] = useState(false)
    const headers=["Name", "Username", "Actions"]

    // CRUD operations
    const addUser = user => {
        user.id = users.length + 1
        setUsers([ ...users, user ])
        console.log("users.length")
        console.log(users.length)
        console.log("user")
        console.log(user)
        users.forEach(function(entry) {
            console.log(entry);
        });
        console.log(users.length)
    }

    const deleteUser = id => {
        setEditing(false)

        setUsers(users.filter(user => user.id !== id))
    }

    const updateUser = (id, updatedUser) => {
        setEditing(false)

        setUsers(users.map(user => (user.id === id ? updatedUser : user)))
    }

    const editRow = user => {
        setEditing(true)
        setCurrentUser({ id: user.id, name: user.name, username: user.username })
    }

    const cancel = () => {
        setEditing(false)
        setCurrentUser(initialFormState)
        console.log("initialFormState")
        console.log(initialFormState)
    }
    return (
        <div className="container">
            <h1>CRUD App with Hooks</h1>
            <div className="flex-row">
                <div className="flex-large">
                    {editing ? (
                        <Fragment>
                            <h2>Edit user</h2>
                            <EditUserForm
                                editing={editing}
                                setEditing={setEditing}
                                currentUser={currentUser}
                                updateUser={updateUser}
                            />
                        </Fragment>
                    ) :
                        <Fragment>
                            <h2>Add user</h2>
                            <AddUserForm addUser={addUser} cancel={cancel}/>
                        </Fragment>
                    }
                </div>
                <UserTable users={users} editRow={editRow} deleteUser={deleteUser} headers={headers}/>

            </div>
        </div>
    )
}

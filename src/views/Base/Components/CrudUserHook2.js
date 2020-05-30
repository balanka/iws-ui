import React, { useState, Fragment } from 'react'

import AddUserForm2 from './AddUserForm2'
import EditUserForm2 from './EditUserForm2'
import UserTable from '../Tables2/UserTable'

export default function CrudUserHook2(props) {

    const usersData = [
        { id: 1, name: 'Tania', username: 'floppydiskette', parent:'0' },
        { id: 2, name: 'Craig', username: 'siliconeidolon', parent:'0'},
        { id: 3, name: 'Ben', username: 'benisphere', parent:'0'},
    ]

    const initialState = props.initialState;

    // Setting state
    const [ users, setUsers ] = useState(usersData)
    const [ currentUser, setCurrentUser ] = useState(initialState)
    const [ editing, setEditing ] = useState(false)
    const [refresh, setRefresh] = useState(true);
    const headers=["Id", "Name", "Username", "Group", "Actions"]

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

  const setParent = (user) => {console.log("user>>>>>", user);
                   typeof user==='undefined'? console.log("user is undefined !!!!",user):setCurrentUser(user)}//;

    const updateUser = (id, updatedUser) => {
        setEditing(false)

        setUsers(users.map(user => (user.id === id ? updatedUser : user)))
    }

    const editRow = user => {
        setEditing(true)
        setCurrentUser(user)
    }

  const mappingx = (item) => (
    {label: item.id+ " ".concat (item.username), value: item.id}
  )
    const cancel = () => {
        setEditing(false)
        setCurrentUser(initialState)
        console.log("initialState")
        console.log(initialState)
    }
    return (
        <div className="container">
            <h1>CRUD App with Hooks</h1>
            <div className="flex-row">
                <div className="flex-large">
                    {editing ? (
                        <Fragment>
                            <h2>Edit user</h2>
                            <EditUserForm2
                                editing={editing}
                                setEditing={setEditing}
                                currentUser={currentUser}
                                updateUser={updateUser}
                                setRefresh={setRefresh}
                                data={usersData.map(xx => mappingx(xx))}
                                setParent={setParent}

                            />
                        </Fragment>
                    ) :
                        <Fragment>
                            <h2>Add user</h2>
                            <AddUserForm2 addUser={addUser} cancel={cancel}
                                          data={usersData.map(xx => mappingx(xx))}
                                          setParent={setParent}
                                          setRefresh={setRefresh}
                                          initialState ={initialState}
                            />
                        </Fragment>
                    }
                </div>
                <UserTable users={users} editRow={editRow} deleteUser={deleteUser} headers={headers}/>

            </div>
        </div>
    )
}

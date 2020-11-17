import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function CRUDUsers(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/all`)
        .then(({data}) => {
            setUsers(data)
            console.log(data)
            })
    }, [])

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>email</th>
                        <th>name</th>
                        <th>rol</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => 
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.rol.name}</td>
                        </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}
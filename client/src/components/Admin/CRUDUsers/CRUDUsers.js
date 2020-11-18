import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function CRUDUsers(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/admin`)
        .then(({data}) => {
            setUsers(data)
        })
    }, [])

    const onPromote = (id) => {
        axios.put(`${process.env.REACT_APP_API_URL}/user/admin/promote`, {id})
        .then(({data}) => setUsers(data))
    }

    const onDemote = (id) => {
        axios.put(`${process.env.REACT_APP_API_URL}/user/admin/demote`, {id})
        .then(({data}) => setUsers(data))
    }

    return(
        <div style={{color: "white"}}>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Rol</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => 
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email ? user.email : "User not registred"}</td>
                            <td>{user.name ? user.name : "User not registred"}</td>
                            <td>{user.rol && user.rol.name ? user.rol.name : "User not have rol"}</td>
                            <td>{user.rol && (
                                user.email === "maicoloncomilla@gmail.com" || 
                                user.email === "javierbalonga@gmail.com" || 
                                user.email === "ces.esteban@gmail.com" || 
                                user.email === "vinasleonardo@yahoo.com" || 
                                user.email === "nahuelsan96@gmail.com" || 
                                user.email === "ignaciogimenez70@gmail.com") ? "Im a Creator of this page" : user.rol && user.rol.name === "admin" ? (
                                    <button onClick={() => onDemote(user.id)}>
                                        Set Guest
                                    </button>) : (
                                        user.rol && user.rol.name !== "admin" ? (
                                            <button onClick={() => onPromote(user.id)}>
                                                Set Admin
                                            </button>
                                        ) : "Im not registred"
                                    )}</td>
                        </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}
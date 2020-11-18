import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../redux/action-creators'

export default function CRUDUsers(){
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    
    useEffect(() => {
        dispatch(api.getUsers())
    }, [dispatch])

    const onPromote = (id) => {
        dispatch(api.promoteUser(id))
    }

    const onDemote = (id) => {
        dispatch(api.demoteUser(id))
    }

    const onBan = (id) => {
        console.log("La llave (rolId)=(3) no está presente en la tabla «rols»")
        /* dispatch(api.banUser(id)) */
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
                            <td><button onClick={() => onBan(user.id)}>Ban</button></td>
                        </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../redux/action-creators'
import s from './CRUDUsers.module.css'

export default function CRUDUsers({history}){
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
        dispatch(api.banUser(id))
    }

    return(
        <>
        <div>
            <table className={s.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th className={s.email}>Email</th>
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
                            <td className={s.email}>{user.email ? user.email : "User not registred"}</td>
                            <td>{user.name ? user.name : "User not registred"}</td>
                            <td>{user.rol && user.rol.name ? user.rol.name : "User not have rol"}</td>
                            <td>{user.rol && user.rol.name === "owner" ? "Im a Creator of this page" : user.rol && user.rol.name === "admin" ? (
                                    <button onClick={() => onDemote(user.id)} className={s.btn}>
                                        Set Guest
                                    </button>) : (
                                        user.rol && user.rol.name !== "admin" ? (
                                            <button onClick={() => onPromote(user.id)} className={s.btn}>
                                                Set Admin
                                            </button>
                                        ) : "Im not registred"
                                    )}</td>
                            <td>{user.rol && user.rol.name !== "banned" ? 
                                <button onClick={() => onBan(user.id)} className={s.btn}>Ban</button> : 
                                "this user is banned"
                            }</td>
                        </tr>
                        )}
                </tbody>
            </table>
        </div>
        </>
    )
}
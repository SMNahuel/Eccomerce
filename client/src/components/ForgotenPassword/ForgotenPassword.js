import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import s from './ForgotenPassword.module.css';
import axios from '../../utils/axios';

export default function ForgotenPassword({passKey}) {
    const [password, setPassword] = useState({ newPassword: '', newPassword2: '' });
    const [redirect, setRedirect] = useState(false);
    const onChange = e => setPassword({...password, [e.target.name]: e.target.value});
    const sendPassword = e => {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}/auth/forgottenPassword`, {key: passKey, newPassword: password.newPassword})
        .then(() => setRedirect(true))
        .catch(err => {
            if (err.response) {
                alert(`Error! \n Status: ${err.response.status}\n${err.response.data}`);
            } else {
                alert(`Error! ${err}`);
            }
        })
    };
    const error = e => alert('¿Vos sos o te haces?');
    return (
        redirect ? <Redirect to="/login"/>:
        <form onSubmit={sendPassword} className={s.formPassword}>
            <input onChange={onChange} name="newPassword" type="password" required pattern="[A-Za-z0-9 ]{5,100}" maxLength="100" autoComplete="off" placeholder="Escriba su nueva contraseña"/>
            <input onChange={onChange} name="newPassword2" type="password" required pattern="[A-Za-z0-9 ]{5,100}" maxLength="100" autoComplete="off" placeholder="Vuelve a escribir la Contraseña"/>
            {password.newPassword === password.newPassword2 ? 
                <button variant="contained" color="primary" type="submit">Aceptar</button>:
                <button variant="contained" color="primary" onClick={error}>Aceptar</button>
            }
            <div className={password.activate}>
                {password.newPassword !== password.newPassword2 && 
                    <label className={s.on}>No coinciden las nuevas contraseñas</label>
                }
            </div>
        </form>
    );
};
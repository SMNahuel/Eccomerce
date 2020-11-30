import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import s from './ForgotenPassword.module.css';
import axios from '../../utils/axios';
import Logo from '../header/header left/Logo/Logo'

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

    return (
        redirect ? <Redirect to="/login" /> :
            <div className={s.container}>
                <form onSubmit={sendPassword}>
                    <Logo />
                    <div className={s.container_inputs_label}>
                        <input
                            placeholder="Escriba su nueva contraseña"
                            onChange={onChange}
                            name="newPassword"
                            type="password"
                            required
                            pattern="[A-Za-z0-9 ]{5,100}"
                            maxLength="100"
                            autoComplete="off"
                            required />
                        <label>Escriba su nueva contraseña</label>
                    </div>
                    <div className={s.container_inputs_label}>
                        <input
                            placeholder="Vuelve a escribir la contraseña"
                            onChange={onChange}
                            name="newPassword2"
                            type="password"
                            required
                            pattern="[A-Za-z0-9 ]{5,100}"
                            maxLength="100"
                            autoComplete="off"
                            required />
                        <label>Vuelve a escribir la contraseña</label>
                    </div>
                    {password.newPassword === password.newPassword2 ?
                        <button type="submit">Aceptar</button>
                        : <button type="submit" disabled>Aceptar</button>
                    }
                    <div className={s.activate}>
                        {password.newPassword !== password.newPassword2 &&
                            <label className={s.on}>No coinciden las nuevas contraseñas</label>
                        }
                    </div>
                </form>
            </div>
    );
};
import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import s from './passwordChange.module.css';
import api from '../../redux/action-creators';

function ChangePassword({showFormPassword}){
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
    }) 
    const dispatch = useDispatch()

    const onChange = function(e){
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }
    const sendPassword = e =>{
        e.preventDefault();
        if(password.newPassword !== password.newPassword2){
            alert("Las password son distintas")
            return;
        }
        const {oldPassword, newPassword} = password;
        dispatch(api.passwordChange(oldPassword, newPassword))
        showFormPassword()
    }
    return (
        <div className={s.container}>
            <form onSubmit={sendPassword}>
                <div className={s.container_inputs_label}>
                    <input
                        placeholder="Ingrese su contraseña anterior"
                        type="password"
                        name="oldPassword"
                        onChange={onChange}
                        pattern="[A-Za-z0-9 ]{5,100}"
                        maxLength="100"
                        autoComplete="off"
                        required
                    >
                    </input>
                    <label>Ingrese su contraseña anterior</label>
                </div>
                <div className={s.container_inputs_label}>
                    <input
                        placeholder="Escriba su nueva contraseña"
                        type="password"
                        name="newPassword"
                        onChange={onChange}
                        pattern="[A-Za-z0-9 ]{5,100}"
                        maxLength="100"
                        autoComplete="off"
                        required
                    >
                    </input>
                    <label>Escriba su nueva contraseña</label>
                </div>
                <div className={s.container_inputs_label}>
                    <input
                        placeholder="Vuelve a escribir su nueva contraseña"
                        type="password"
                        name="newPassword2"
                        onChange={onChange}
                        pattern="[A-Za-z0-9 ]{5,100}"
                        maxLength="100"
                        autoComplete="off"
                        required
                    >
                    </input>
                    <label>Vuelve a escribir su nueva contraseña</label>
                </div>
                <div className={s.container_button}>
                    <button className={s.button_accept} type="submit">Aceptar</button>
                    <button className={s.button_cancel} onClick={showFormPassword} >Cancelar</button>
                </div>
                {/* <div className={password.activate}>
                    {(password.newPassword !== password.newPassword2) === true &&
                        <label className={s.on}>No coinciden las nuevas contraseñas</label>}
                </div> */}
            </form>
        </div>
    );
}

export default ChangePassword;
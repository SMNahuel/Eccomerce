import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
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
    const sendPassword = function(){
        const {oldPassword, newPassword} = password;
        dispatch(api.passwordChange(oldPassword, newPassword))
        showFormPassword()
    }
    const error = function(){
        alert('¿Vos sos o te haces?')
    }
    return (
        <div>
                <form onSubmit={sendPassword} className={s.formPassword}>
                    <div>
                        <input 
                        placeholder="Ingrese su anterior contraseña"
                        type="password"
                        name="oldPassword"
                        onChange={onChange}
                        pattern="[A-Za-z0-9 ]{5,100}"
                        maxLength="100"
                        autoComplete="off"
                        required
                        >
                        </input>
                    </div>
                    <div>
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
                    </div>
                    <div>
                        <input 
                        placeholder="Vuelve a escribir la Contraseña"
                        type="password"
                        name="newPassword2"
                        onChange={onChange}
                        pattern="[A-Za-z0-9 ]{5,100}"
                        maxLength="100"
                        autoComplete="off"
                        required
                        >
                        </input>
                    </div>
                    {
                        (password.newPassword !== password.newPassword2) === true && 
                            <Button variant="contained" color="primary" onClick={error}>Aceptar</Button>
                    }
                    {
                    (password.newPassword !== password.newPassword2) === false &&
                    <Button variant="contained" color="primary" type="submit">Aceptar</Button>
                    }
                    <Button variant="contained" color="secondary" onClick={showFormPassword} >Cancelar</Button>
                    <div className={password.activate}>
                        {(password.newPassword !== password.newPassword2) === true && 
                        <label className={s.on}>No coinciden las nuevas contraseñas</label>}
                    </div>
                </form>
        </div>
    );
}

export default ChangePassword;
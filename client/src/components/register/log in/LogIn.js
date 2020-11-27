import React, { useState } from 'react';
import s from './LogIn.module.css';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../redux/action-creators';
import { Redirect, Link } from 'react-router-dom';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import Google from '../../../img/Google.svg';
import axios from '../../../utils/axios';


function LogIn() {
    const [input, setInput] = useState({
        email: "",
        password: "",
    })
    
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const login = e => {
        e.preventDefault();
        dispatch(api.login(input));
    }
    const loginProvider = (provider, width=500, height=500) => {
        var left = (window.screen.width / 2) - (width / 2);
        var top = (window.screen.height / 2) - (height / 2);
        return window.open(
            `${process.env.REACT_APP_API_URL}/auth/${provider}`,
            `Autenticate con ${provider}`,
            `width=${width},height=${height},top=${top},left=${left},toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no`
        );
    }
    const onForgottenPassword = e => {
        if (input.email) {
            axios.post(`${process.env.REACT_APP_API_URL}/auth/forgottenPassword`, {email: input.email})
            .catch(err => {
                if (err.response) {
                    alert(`Error! \n Status: ${err.response.status}\n${err.response.data}`);
                } else {
                    alert(`Error! ${err}`);
                }
            })
        } else {
            alert('Ingresa un email\nPor favor')
        }
    }

    return (
        <div className={s.container}>
            <div className={s.container_signIn}>
                { user.name && <Redirect to="/"/>}
                <div className={s.container_absolute_login}>
                    <div className={s.container_h2}>
                        <h4>Log In with</h4>
                    </div>
                    <div className={s.container_icons}>
                        <FacebookIcon className={s.icons} onClick={()=>loginProvider('facebook')}/>
                        <GitHubIcon className={s.icons} onClick={()=>loginProvider('github')}/>
                        <img src={Google} alt="Google Logo" onClick={()=>loginProvider('google')}/>
                    </div>
                </div>
                <form onSubmit={login}>
                    <div className={s.container_inputs_login}>
                        <div className={s.container_inputs}>
                            <input 
                            type="Email"
                            placeholder="Email"
                            required
                            id="email"
                            maxLength="60"
                            pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                            onChange={e => setInput({...input, email: e.target.value})}
                            />
                            <MailOutlineRoundedIcon/>
                            <label>Email</label>
                        </div>
                        <div className={s.container_inputs}>
                            <input 
                            type="password"
                            id="passwordd"
                            placeholder="Password"
                            required
                            maxLength="30"
                            title="min 7 characters | maximum 20 characters"
                            pattern="[a-zA-Z0-9_]{7,30}"
                            onChange={e => setInput({...input, password: e.target.value})}
                            />
                            <LockOutlinedIcon />
                            <label>Password</label>
                        </div>
                        <button className={s.butonChangePass} onClick={onForgottenPassword}>Have you forgotten the password?</button>
                        <div className={s.container_button}>
                            <button type="submit">Log In</button>
                        </div>
                    </div>
                </form>
                <div className={s.container_have_account}>
                    <Link to="/register" className={s.container_link}><p>Create a new account</p></Link>
                </div>
            </div>
        </div>
    )
}
export default LogIn;
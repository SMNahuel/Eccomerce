import React, { useState } from 'react';
import s from './LogIn.module.css';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../redux/action-creators'
import { Redirect, Link } from 'react-router-dom';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';


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

    return (
        <div className={s.container_signIn}>
            { user.name && <Redirect to="/"/>}
            <div className={s.container_absolute_login}>
                <div className={s.container_h2}>
                    <h4>Log In with</h4>
                </div>
                <div className={s.container_icons}>
                    <FacebookIcon className={s.icons}/>
                    <GitHubIcon className={s.icons}/>
                    <YouTubeIcon className={s.icons}/>
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
                    <div className={s.container_button}>
                        <button type="submit">Log In</button>
                    </div>
                </div>
            </form>
            <div className={s.container_have_account}>
                <Link to="/register" className={s.container_link}><p>Create a new account</p></Link>
            </div>
        </div>
    )
}
export default LogIn;
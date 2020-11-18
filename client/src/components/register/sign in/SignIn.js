import React, { useState } from 'react';
import s from './SignIn.module.css';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../redux/action-creators'
import { Link, Redirect } from 'react-router-dom';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';

function SignIn(){
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
    })
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const register = e => {
        e.preventDefault();
        dispatch(api.register(input));
    }
    
    return (
        <div className={s.container_signIn}>
            { user.name && <Redirect to="/"/>}
            <div className={s.container_absolute_sign_in}>
                <div className={s.container_h2}>
                    <h4>Sign Up with</h4>
                </div>
                <div className={s.container_icons}>
                    <FacebookIcon className={s.icons} />
                    <GitHubIcon className={s.icons} />
                    <YouTubeIcon className={s.icons} />
                </div>
            </div>
            <form onSubmit={register}>
                <div className={s.container_inputs_signIn}>
                    <div className={s.container_inputs}>
                        <input 
                        type="text"
                        placeholder="Username"
                        required 
                        pattern="[a-zA-Z0-9 ]{6,50}"
                        id="name"
                        maxLength="20"
                        title="Only letters | min 6 characters | maximum 50 characters"
                        onChange={e => setInput({...input, name: e.target.value})}
                        />
                        <FaceRoundedIcon/>
                        <label>Username</label>
                    </div>
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
                        <LockOutlinedIcon/>
                        <label>Password</label>
                    </div>
                    <div className={s.container_button}>
                        <button type="submit">Sign Up</button>
                    </div>
                </div>
            </form>
            <div className={s.container_have_account}>
                <Link to="/login" className={s.container_link}><p>Do you have an account?</p></Link>
            </div>
        </div>
    )
}
export default SignIn;
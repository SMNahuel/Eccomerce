import React, { useState } from 'react';
import s from './SignIn.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import USER from '../../../redux/action-creators'
import { Link, Redirect } from 'react-router-dom';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';

function SignIn(){
   
    const dispatch = useDispatch()
    const [ registerTrue, setRegisterTrue ] = useState(false)
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
    })
    const register = event =>{
        
        event.preventDefault();
        if(input.email !== "" && input.name !== "" && input.password !== ""){
            axios.get('http://localhost:3001/user')
                .then(({data}) => {
                    if(data.find(e => e.email === input.email)){
                        alert("This email is already in use")
                        setInput("")
                    }
                    axios.post('http://localhost:3001/user', input)
                        .then(({data}) => {
                            dispatch({
                                type: USER,
                                payload: {data}
                            })
                            setRegisterTrue(true)
                        })
                })
        }else{
            return alert("Los campos no pueden estar vacios")
        }
    }
    return (
        <div className={s.container_signIn}>
            { registerTrue && <Redirect to="/"/>}
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
            <form>
                <div className={s.container_inputs_signIn}>
                    <div className={s.container_inputs}>
                        <input 
                        type="text"
                        placeholder="Username"
                        required
                        pattern="[a-zA-Z_]{6,50}"
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
                        <button onClick={register} type="submit">Sign Up</button>
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
import React, { useState} from 'react';
import s from './SignIn.module.css';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../redux/action-creators'
import { Link, Redirect } from 'react-router-dom';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import Google from '../../../img/Google.svg'
import axios from '../../../utils/axios';
function SignIn(){
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        verify: null

    })   

    const loginProvider = (provider, width=500, height=500) => {
        var left = (window.screen.width / 2) - (width / 2);
        var top = (window.screen.height / 2) - (height / 2);
        return window.open(
            `${process.env.REACT_APP_API_URL}/auth/${provider}`,
            `Autenticate con ${provider}`,
            `width=${width},height=${height},top=${top},left=${left},toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no`
        );
    }
    async function checked(){
        const verify = await axios.post(`${process.env.REACT_APP_API_URL}/user/email`, input)
        console.log(verify)
        return verify;
    }

    const user = useSelector(state => state.user)

    const dispatch = useDispatch() 

    async function register (e){
        e.preventDefault()
        var result = await checked()
        console.log(result)
        if(result.data !==""){
            setInput({
                ...input,
                verify: true
            })
        }
        if(result.data === ""){ 
            setInput({
                ...input,
                verify: false
            })
        }
        if(!input.name || !input.email || !input.password){
            return alert('Rellene todos los campos')
        } 
        if(input.verify === false){ 
            setInput({
                ...input,
                verify: null
            })
            return dispatch(api.register(input)); 
        }
        if(input.verify === true){
            alert('Correo ya registrado')
            window.location.reload()
        }
        
    }  
    
    return (
        <div className={s.container}>
            <div className={s.container_signIn}>
                { user.name && <Redirect to="/"/>}
                <div className={s.container_absolute_sign_in}>
                    <div className={s.container_h2}>
                        <h4>Sign Up with</h4>
                    </div>
                    <div className={s.container_icons}>
                        <FacebookIcon className={s.icons} onClick={()=>loginProvider('facebook')}/>
                        <GitHubIcon className={s.icons} onClick={()=>loginProvider('github')}/>
                        <img src={Google} alt="Google Logo" onClick={()=>loginProvider('google')}/>
                    </div>
                </div>
                <form >
                    <div className={s.container_inputs_signIn}>
                        <form onSubmit={register}>
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
                        </form> 

                    </div>
                </div>
                <div className={s.container_have_account}>
                    <Link to="/login" className={s.container_link}><p>Do you have an account?</p></Link>
                </div>
            </div>
        </div>
    )
}
export default SignIn;
import React, { useState } from 'react';
import s from './SignIn.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import USER from '../../../redux/action-creators'
import { Redirect } from 'react-router-dom';

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
            <div className={s.container_title}>
                <h2>Sign In</h2>
            </div>
            <form>
                <div className={s.container_inputs_signIn}>
                    <div className={s.container_inputs}>
                        <input 
                        required
                        placeholder="Username..." 
                        type="text"
                        pattern="[a-zA-Z_]{6,50}"
                        id="name"
                        title="Only letters | min 6 characters | maximum 50 characters"
                        onChange={e => setInput({...input, name: e.target.value})}
                        />
                    </div>
                    <div className={s.container_inputs}>
                        <input 
                        placeholder="Email..." 
                        type="Email"
                        id="email"
                        pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                        onChange={e => setInput({...input, email: e.target.value})}
                        />
                    </div>
                    <div className={s.container_inputs}>
                        <input 
                        placeholder="Password..." 
                        type="password"
                        id="passwordd"
                        title="min 7 characters | maximum 20 characters"
                        pattern="[a-zA-Z0-9_]{7,30}"
                        onChange={e => setInput({...input, password: e.target.value})}
                        />
                    </div>
                    <div className={s.container_button}>
                        <button onClick={register} type="submit">Sign In</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default SignIn;
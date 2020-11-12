import React, { useState } from 'react';
import s from './LogIn.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import USER from '../../../redux/action-creators'

function LogIn() {

    const dispatch = useDispatch()
    const [input, setInput] = useState({
        email: "",
        password: "",
    })
    
    const login = event => {
        event.preventDefault();
        axios.get('http://localhost:3001/user')
            .then(({ data }) => {
                if (data.find(e => e.email === input.email) && data.find(p => p.password === input.password)) {
                    console.log(data)
                    axios.post('http://localhost:3001/login', input)
                        .then(() => {
                            dispatch({
                                type: USER,
                                input
                            })
                            window.location = "/"
                        })
                        setInput("");
                } else {
                    alert("Email or Password incorrect!!!")
                }
            })
            .catch(err => alert("Error!!" + err))
    }
    return (
        <div className={s.container_signIn}>
            <div className={s.container_title}>
                <h2>Log In</h2>
            </div>
            <form>
                <div className={s.container_inputs_signIn}>
                    <div className={s.container_inputs}>
                        <input
                            placeholder="Email..."
                            type="Email"
                            id="email"
                            pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                            onChange={e => setInput({ ...input, email: e.target.value })}
                        />
                    </div>
                    <div className={s.container_inputs}>
                        <input
                            placeholder="Password..."
                            type="password"
                            id="passwordd"
                            title="min 7 characters | maximum 20 characters"
                            pattern="[a-zA-Z0-9_]{7,20}"
                            onChange={e => setInput({ ...input, password: e.target.value })}
                        />
                    </div>
                    <div className={s.container_button}>
                        <button onClick={login} type="submit" >Log In</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default LogIn;
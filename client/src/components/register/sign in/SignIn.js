import React, { useState } from 'react';
import s from './SignIn.module.css';

function SignIn(){
    const [ input, setInput ] = useState({
        username: "",
        email: "",
        password: "",
    })
    return (
        <div className={s.container_signIn}>
            <div className={s.container_title}>
                <h2>Sign In</h2>
            </div>
            <form>
                <div className={s.container_inputs_signIn}>
                    <div className={s.container_inputs}>
                        <input 
                        placeholder="Username..." 
                        type="text"
                        pattern="[a-zA-Z_]{6,50}"
                        id="name"
                        title="Only letters | min 6 characters | maximum 50 characters"
                        onChange={e => setInput({...input, username: e.target.value})}
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
                        pattern="[a-zA-Z0-9_]{7,20}"
                        onChange={e => setInput({...input, password: e.target.value})}
                        />
                    </div>
                    <div className={s.container_button}>
                        <button type="submit">Sign In</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default SignIn;
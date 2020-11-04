import React from 'react';
import s from './SignIn.module.css'

function SignIn(){
    return (
        <div className={s.container_signIn}>
            <div className={s.container_title}>
                <h2>Sign In</h2>
            </div>
            <div className={s.container_inputs_signIn}>
                <div className={s.container_inputs}>
                    <input placeholder="Name..." type="text"/>
                </div>
                <div className={s.container_inputs}>
                    <input placeholder="Email..." type="Email"/>
                </div>
                <div className={s.container_inputs}>
                    <input placeholder="Password..." type="password"/>
                </div>
                <div className={s.container_button}>
                        <button>Sign In</button>
                </div>
            </div>
        </div>
    )
}
export default SignIn;
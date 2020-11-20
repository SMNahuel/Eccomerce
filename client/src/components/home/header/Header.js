import React from 'react';
import s from './Header.module.css'
import Logo from './Logo/Logo'

export default function Header(){
    return (
        <div className={s.container_main}>
            {/* <Sidebar/> */}
            <Logo/>
            {/* <Cart/> */}
        </div>
    )
}
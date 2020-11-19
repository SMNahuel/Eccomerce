import React from 'react';
import s from './Header.module.css'
import Logo from '../../../img/Logo.png'

export default function Header(){
    return (
        <div className={s.container_main}>
            {/* <Sidebar/> */}
            <img className={s.title} src={Logo} alt="logo"/>
            {/* <Cart/> */}
        </div>
    )
}
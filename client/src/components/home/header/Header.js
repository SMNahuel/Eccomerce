import React from 'react';
import HeaderLeft from './header left/HeaderLeft';
import HeaderRight from './header right/HeaderRight';
import s from './Header.module.css'

export default function Header( { handleSearch }){
    return (
        <div className={s.container_main}>
            <HeaderLeft handleSearch={handleSearch}/>
            <HeaderRight/>
        </div>
    )
}
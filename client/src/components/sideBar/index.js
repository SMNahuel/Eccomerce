import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import S from './sideBar.module.css'

export default function SideBar(){
    const [menu, setMenu] = useState(false)
    const toogleState = function(){
        menu ? setMenu(false) : setMenu(true)
    }
    return (
        <div>
            <div className={S.SideBar}>
                {/* si el estado es false renderiza solamente el icono */}
                {!menu && <div className={S.icon} onClick={toogleState}>
                    M
                </div>} 
                {/* si el estado es true renderiza todo el menu */}
                {menu && <div className={S.menu}>
                    <button onClick={toogleState} className={S.button}>X</button>
                    <div className={S.line}>Home</div>
                    <div className={S.line}>Perfil</div>
                    <div className={S.line}>Opciones</div>
                    <hr className={S.line}/>
                    <Link to="/">
                        <div className={S.line}>Crear categoria</div>
                    </Link>
                    <Link to="/">
                        <div className={S.line}>Crear/modificar producto</div>
                    </Link>
                </div>} 
            </div>
        </div>
    )
}
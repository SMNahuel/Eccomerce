import React from 'react';
import s from './Footer.module.css';
import Card from './cards/Card';
import { logoHenry } from '../../../utils/logo'

export default function Footer(){
    const users = [{
        image: `${process.env.REACT_APP_API_URL}/image/1.jpg`,
        name: "Maico Loncomilla",
        email: "maicoloncomilla@gmail.com",
        git: "https://github.com/MaicoLoncomilla",
        linkedin: "https://www.linkedin.com/in/maicoloncomilla/"
    },{
        image: `${process.env.REACT_APP_API_URL}/image/2.jpg`,
        name: "Javier Balonga",
        email: "javierbalonga@gmail.com",
        git: "https://github.com/JavierBalonga",
        linkedin: "https://www.linkedin.com/in/javier-balonga-39518a1b1/"
    },{
        image: `${process.env.REACT_APP_API_URL}/image/3.jpg`,
        name: "Esteban Céspedes",
        email: "ces.esteban@gmail.com",
        git: "https://github.com/cesesteban",
        linkedin: "https://www.linkedin.com/in/esteban-cespedes-/"
    },{
        image: `${process.env.REACT_APP_API_URL}/image/4.jpg`,
        name: "Nahuel Sanchez",
        email: "nahuelsan96@gmail.com",
        git: "https://github.com/Nahuelsan",
        linkedin: "https://www.linkedin.com/in/nahuel-sanchez-327139167/"
    },{
        image: `${process.env.REACT_APP_API_URL}/image/5.jpg`,
        name: "Ignacio Gimenez",
        email: "ignaciogimenez70@gmail.com",
        git: "https://github.com/Nacho077",
        linkedin: "https://www.linkedin.com/in/ignacio-gimenez-305799184/"
    },{
        image: `${process.env.REACT_APP_API_URL}/image/6.jpg`,
        name: "Leonardo Vinas",
        email: "vinasleonardo@yahoo.com",
        git: "https://github.com/Leonardo-vinas",
        linkedin: "https://www.linkedin.com/in/vinasleonardo/"
    }]

    return (
        <div className={s.container_main}>
            <div>
                <a href="https://www.soyhenry.com/" rel="noopener noreferrer" target="_BLANK">
                    <div className={s.container_logo}>
                        <img src={logoHenry} alt="Logo-Henry"/>
                    </div>
                </a>
                <div className={s.container_creadores}>
                    {users.map((user,i) => <Card key={i} user={user}/>)}
                </div>
            </div>
            <div className={s.container_derechos}>
                <p>© 2020 Copyright: All rights reserved</p>
            </div>
        </div>
    )
}
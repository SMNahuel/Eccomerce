import React from 'react';
import s from './Footer.module.css';
import Card from './cards/Card';
import maico from '../../../img/maico.jpg';
import javi from '../../../img/javi.jpg';
import esteban from '../../../img/esteban.jpg';
import nahu from '../../../img/nahu.jpg';
import nacho from '../../../img/nacho.jpg';
import leo from '../../../img/leo.jpg';
import { logoHenry } from '../../../utils/logo'

export default function Footer(){
    return (
        <div className={s.container_main}>
            <div>
                <a href="https://www.soyhenry.com/" target="_BLANK">
                    <div className={s.container_logo}>
                        <img src={logoHenry}/>
                    </div>
                </a>
                <div className={s.container_creadores}>
                    <Card
                    image={maico}
                    name={"Maico Loncomilla"}
                    email={"maicoloncomilla@gmail.com"}
                    gitHref={"https://github.com/MaicoLoncomilla"}
                    linkedinHref={"https://www.linkedin.com/in/maicoloncomilla/"}
                    />
                    <Card
                    image={javi}
                    name={"Javier Balonga"}
                    email={"javierbalonga@gmail.com"}
                    gitHref={"https://github.com/JavierBalonga"}
                    linkedinHref={"https://www.linkedin.com/in/javier-balonga-39518a1b1/"}
                    />
                    <Card
                    image={esteban}
                    name={"Esteban"}
                    email={"ces.esteban@gmail.com"}
                    gitHref={"https://github.com/cesesteban"}
                    linkedinHref={"https://www.linkedin.com/in/esteban-cespedes-/"}
                    />
                    <Card
                    image={nahu}
                    name={"Nahuel Sanchez"}
                    email={"nahuelsan96@gmail.com"}
                    gitHref={"https://github.com/Nahuelsan"}
                    linkedinHref={"https://www.linkedin.com/in/nahuel-sanchez-327139167/"}
                    />
                    <Card
                    image={nacho}
                    name={"Ignacio Gimenez"}
                    email={"ignaciogimenez70@gmail.com"}
                    gitHref={"https://github.com/Nacho077"}
                    linkedinHref={"https://www.linkedin.com/in/ignacio-gimenez-305799184/"}
                    />
                    <Card
                    image={leo}
                    name={"Leonardo Vinas"}
                    email={"vinasleonardo@yahoo.com"}
                    gitHref={"https://github.com/Leonardo-vinas"}
                    linkedinHref={"https://www.linkedin.com/in/vinasleonardo/"}
                    />
        
                </div>
            </div>
            <div className={s.container_derechos}>
                <p>© 2020 Copyright: All rights reserved</p>
            </div>
        </div>
    )
}
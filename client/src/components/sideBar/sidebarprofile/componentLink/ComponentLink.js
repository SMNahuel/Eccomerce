import React from 'react';
import { Link } from 'react-router-dom';
import s from './ComponentLink.module.css';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';


export default function ComponentLink({ to, funcion, SetIcon, p }){
    return (
        <>
        <Link to={to} className={s.link}>
            <button onClick={funcion} className={s.button}>
                <div className={s.container_icons_title}>
                    <div className={s.container_icons}>
                        <div className={s.icon}>{SetIcon}</div>
                        <p>{p}</p>
                    </div>
                    <div>
                        <ArrowRightIcon className={s.ArrowRightIcon}/>
                    </div>
                </div>
            </button>
        </Link>
        </>
    )
}
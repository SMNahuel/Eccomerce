import React, { useState } from 'react';
import s from './ReviewList.module.css'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';

export default function ReviewList({ stars, message, user }){

    const [ valueup, setValueUp ] = useState(0);
    const [ valuedown, setValueDown ] = useState(0);

    const onValueUp = e => {
        e.preventDefault();
        setValueUp(valueup + 1)
    }
    const onValueDown = e => {
        e.preventDefault();
        setValueDown(valuedown + 1)
    }

    return (
        <div className={s.container_main}>
            <div>
                <p className={s.p_reviews}>{stars}</p>
            </div>
            <h2 className={s.h2_title}>{user}</h2>
            <p className={s.p_description}>{message}</p>
            <div className={s.container_hands_up_down}>
                <div className={s.container_up_down}>
                    <button onClick={onValueUp}>
                        <ThumbUpAltOutlinedIcon fontSize="small"/>
                    </button>
                    <label>{valueup}</label>
                </div>
                <div className={s.container_up_down_2}>
                    <button onClick={onValueDown}>
                        <ThumbDownAltOutlinedIcon fontSize="small"/>
                    </button>
                    <label>{valuedown}</label>
                </div>
            </div>
        </div>
    )
}
import React, { useState } from 'react';
import s from './ReviewList.module.css'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';

export default function ReviewList({ stars }){

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
            <h2 className={s.h2_title}>Lorem Impsun Dolor</h2>
            <p className={s.p_description}>Lorem ipsum dolor sit amet consectetur adipiscing elit conubia ornare mi faucibus, hac gravida quisque dignissim ridiculus proin himenaeos diam et. Nullam risus gravida praesent eu nulla platea per lacinia netus, volutpat facilisis ut ultricies turpi</p>
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
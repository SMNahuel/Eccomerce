import React from 'react';
import s from './ImgComponent.module.css'

export default function ImgComponent({ src, toggle }) {
    return (
        <div className={s.container_img_button}>
            <img src={src} alt="slideimg" />
            <button onClick={toggle}>Go</button>
        </div>
    )

}
import React from 'react';
import s from './ImgComponent.module.css'

export default function ImgComponent({ src }) {
    return (
        <div className={s.container_img_button}>
            <img src={src} alt="slideimg" />
            <button>Go</button>
        </div>
    )

}
import React from 'react';
import s from './ImgComponent.module.css'

export default function ImgComponent({ src, name, description, price, stock }) {
    return (
        <div className={s.container_img_button}>
            <img src={src} alt="slideimg" />
            <div className={s.container_products_data}>
                <h1>{name}</h1>
                <p><b>Price: </b>${price}</p>
                <p><b>Stock: </b>{stock}</p>
                <p><b>Descripcion: </b>{description}</p>
            </div>
        </div>
    )

}
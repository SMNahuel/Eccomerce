import React from 'react';
import s from './ImgComponent.module.css'
import imgNotFound from '../../../../../img/img404.jpg';
import toStars from '../../../../../utils/toStars';

export default function ImgComponent({ product, onDetail }) {
    const image = product.images[0] ?
    `${process.env.REACT_APP_API_URL}${product.images[0].url}`:
    imgNotFound
    // console.log(product);
    return (
        <div className={s.container} style={{backgroundImage: `url(${image})`}}>
            <button onClick={onDetail}>GO!</button>
            <h1>{product.name}</h1>
            <h2>{toStars(product.qualification_avg)}</h2>
            <p><b>Price: </b>${product.price}</p>
            <p><b>Descripcion: </b>{product.description}</p>
        </div>
    )

}
import React from 'react';
import s from './ProductCard.module.css';
import imgNotFound from '../../../../../img/img404.jpg';

export default ({product, onDetail}) => {
    const image = product.images[0] ?
    `${process.env.REACT_APP_API_URL}${product.images[0].url}`:
    imgNotFound

    return (
        <div id={product.id} onClick={() => onDetail(product)} className={s.container_main} style={{backgroundImage:`url(${image})`}}>
            <span className={s.info} >
                <h1 className={s.name} >{product.name}</h1>
                <h1 className={s.ranking}>★★★★☆</h1>
            </span>
        </div>
    )
}

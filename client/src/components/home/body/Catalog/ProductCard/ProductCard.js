import React, { useState } from 'react';
import s from './ProductCard.module.css';
import imgNotFound from '../../../../../img/img404.jpg';
import { useDispatch } from 'react-redux';
import api from '../../../../../redux/action-creators'
import toStars from '../../../../../utils/toStars';

export default ({product, onDetail}) => {
    const image = product.images[0] ?
    `${process.env.REACT_APP_API_URL}${product.images[0].url}`:
    imgNotFound
    const dispatch = useDispatch()
    const [quantity] = useState(1)
    const onAddToCart = e => {
        dispatch(api.addProduct(product.id, quantity))
    }
    return (
        <div className={s.container}>
            <div id={product.id} className={s.container_main} style={{ backgroundImage: `url(${image})` }}>
                <span className={s.info} >
                    <h1 className={s.name}>{product.name}</h1>
                    <h2 className={s.ranking}>{toStars(product.qualification)}</h2>   
                </span>
                <div className={s.container_absolute} onClick={() => onDetail(product)}>
                    <h1>{product.name}</h1>
                    <p><b>Price: </b> ${product.price}</p>
                    <p><b>Stock: </b> {product.stock}</p>
                    <p><b>Description: </b> {product.description}</p>
                </div>
                <div className={s.container_addToCart}>
                    <button onClick={onAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

import React from 'react'
import s from './productCart.module.css'

export default function ProductCart({product}){
    return(
        <>
            <div className={s.container}>
                <p>{product.name}</p>
                <p>${product.order.price * product.order.quantity}</p>
            </div>
            <hr/>
        </>
    )
}
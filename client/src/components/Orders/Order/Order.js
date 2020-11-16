import React from 'react';
/* import s from './Order.module.css'; */

export default function Order({order, onDetail}) {
    const orderMount = () => {
        if (!order.products) return 0
        return order.products.reduce((acc, product) => 
            acc + Number(product.order.price) * Number(product.order.quantity)
        , 0)
    }
    return(
        <tr key= {order.id}>
            <td>{order.state}</td>
            <td>{orderMount()}</td>
            <td><button onClick={onDetail}>Detalle</button></td>
        </tr>
    )
}
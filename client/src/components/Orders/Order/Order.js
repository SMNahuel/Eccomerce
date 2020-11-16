import React from 'react';
import { Tr, Td } from 'react-super-responsive-table';
/* import s from './Order.module.css'; */

export default function Order({order, onDetail}) {
    const orderMount = () => {
        if (!order.products) return 0
        return order.products.reduce((acc, product) => 
            acc + Number(product.order.price) * Number(product.order.quantity)
        , 0)
    }
    return(
        <Tr key= {order.id}>
            <Td>{order.state}</Td>
            <Td>{orderMount()}</Td>
            <Td><button onClick={onDetail}>Detalle</button></Td>
        </Tr>
    )
}
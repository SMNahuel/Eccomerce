import React from 'react';
import s from './OrderDetail.module.css';
import { useDispatch } from 'react-redux';
import api from '../../../redux/action-creators';

export default function OrderDetail({order, onBack}) {
    const dispatch = useDispatch()
    const onCancel = e => {
        dispatch(api.cancelCart(order))
        onBack()
    }

    const totalPrice = () => {
        if (!order.products) return 0
        return order.products.reduce((acc, product) => 
            acc + Number(product.order.price) * Number(product.order.quantity)
        , 0)
    }
    const totalQuantity = () => {
        if (!order.products) return 0
        return order.products.reduce((acc, product) => 
            acc + Number(product.order.quantity)
        , 0)
    }

    return (
        <div className={s.container}>
            <div className={s.container_table_button}>
                <div className={s.container_input_button}>
                    <input type="button" onClick={onBack} value="Back"/>
                </div>
                <table className={s.container_table}>
                    <thead className={s.container_thead}>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody className={s.container_tbody}>
                        {order.products && order.products.map(product =>
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.order.quantity}</td>
                                <td>${product.order.price}</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot className={s.container_tfoot}>
                        <tr>
                            <td>Total:</td>
                            <td>{totalQuantity()}</td>
                            <td>${totalPrice()}</td>
                        </tr>
                    </tfoot>
                </table>
                <div className={s.container_input_button_input}>
                    <input type="button" onClick={onCancel} value="Cancelar Carrito"/>
                </div>
            </div>
        </div>
    );
}
import React, { useState } from 'react';
import s from './OrderDetail.module.css';
import { useDispatch } from 'react-redux';
import api from '../../../redux/action-creators';
import ProductReview from '../ProductReview/ProductReview';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function OrderDetail({order, onBack}) {
    const dispatch = useDispatch()
    const [ reviewActive, setReviewActive ] = useState(false);
    const onCancel = e => {
        dispatch(api.cancelCart(order))
        onBack()
        // Esto es un fail para que actualice la tabla 
        // pero no deberia estar resuelto asi X_X
        setTimeout(()=>{
            dispatch(api.getOrders())
        },1000)
    }
    const toggle = e =>{
        setReviewActive(!reviewActive);
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
        <>
        {reviewActive === false ? 
        <div className={s.container}>
            <div className={s.container_table_button}>
                <div className={s.container_input_button}>
                    <ArrowBackIcon onClick={onBack} fontSize="default"/>
                </div>
                <table className={s.container_table}>
                    <thead className={s.container_thead}>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Review</th>
                        </tr>
                    </thead>
                    <tbody className={s.container_tbody}>
                        {order.products && order.products.map(product =>
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.order.quantity}</td>
                                <td>${product.order.price}</td>
                                {order.state === "created" ?
                                    <td className={s.boton_review}><button onClick={toggle}>Review</button></td>
                                    : <td></td>
                                }
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
                    <input type="button" onClick={onCancel} value="Cancelar Carrito" />
                </div>
            </div>
        </div>
        :<ProductReview toggle={toggle} order={order}/>}
        </>
    );
}
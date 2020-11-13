import React from 'react';
import s from './Cart.module.css'; 
import {useSelector} from 'react-redux'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function Cart({products}) {

    const totalPrice = products.reduce((acc, curr) => acc + curr.price, 0)

    return (
        <div className={s.cartFlex}>
            <div className={s.cartIdent}>
                <ShoppingCartIcon/>
                <br/>
                <span>Items in cart : {products.length}</span>
                <br/>
                <span>Total price : {totalPrice}</span>
                {products && products.map(product => (
                    <div>
                        <span>Product: {product.name} Price: {product.price}</span>
                        <br/>
                    </div>
                )) }
            </div>
        </div>
    );
}

export default Cart;
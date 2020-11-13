import React from 'react';
import s from './Cart.module.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector } from 'react-redux';

function Cart({products}) {
    const cart = useSelector(state => state.cart[0] && state.cart[0].products)

    return (
        <div className={s.cartFlex}>
            <div className={s.cartIdent}>
                <ShoppingCartIcon/>
                <br/>
                <span>Items in cart : {cart && cart.length}</span>
                <br/>
                {cart && 
                    cart.map(product => (
                        <div key={product.id}>
                            <span>{product.name}: Cantidad: {product.order.quantity} Precio: {product.order.price}</span>
                        </div>
                    )) 
                }
                <span>Total price : 
                    {
                        cart && cart.reduce((acc, curr) => acc + curr.order.price, 0)
                    }
                </span>
            </div>
        </div>
    );
}

export default Cart;
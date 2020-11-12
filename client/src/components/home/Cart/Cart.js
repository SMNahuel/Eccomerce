import React from 'react';
import {useSelector} from 'react-redux'

function Cart(products) {

    //const cartProducts = useSelector(state => state.cartProducts)//traigo el action.payload, despues de hacer un get desde el action creator.
    console.log(products)

    return (
        <div>
            
            <span>Items in cart : 0</span>
            <br/>
            <span>Total price : 0</span>
        </div>
    );
}

export default Cart;
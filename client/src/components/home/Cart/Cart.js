import React from 'react';

function Cart() {

    const cartProducts = useSelector(state => state.cartProducts)//traigo el action.payload, despues de hacer un get desde el action creator.

    return (
        <div>
            
        </div>
    );
}

export default Cart;
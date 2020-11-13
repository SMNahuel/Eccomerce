import React, {useState} from 'react';
import s from './Cart.module.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../../redux/action-creators';

function Cart(props) {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const [active, setActive] = useState(false)
    const onClick = e => {
        if (active && Object.keys(quantities).length) {
            for(let key in quantities) {
                let id = Number(key)
                cart.products.find(p => p.id === id)
                .order.quantity = quantities[id]
            }
            dispatch(api.updateCart(cart.id, cart))
            setQuantities({})
        }
        setActive(!active)
    }

    const [quantities, setQuantities] = useState({})
    const chengeQuantity = (id, cant) => {
        setQuantities({
            ...quantities,
            [id]: cant
        })
    }

    const totalPrice = () => {
        if (!cart.products) return 0
        return cart.products.reduce((acc, product) => 
            acc + Number(product.order.price) * Number(quantities[product.id] || product.order.quantity)
        , 0)
    }
    const totalQuantity = () => {
        if (!cart.products) return 0
        return cart.products.reduce((acc, product) => 
            acc + Number(quantities[product.id] || product.order.quantity)
        , 0)
    }

    return (
        <div className={s[active ? 'active' : 'inactive']}>
            <button onClick={onClick}><ShoppingCartIcon/></button>
            {active &&
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.products && cart.products.map(product => 
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>
                                    <input
                                        value={quantities[product.id] || product.order.quantity}
                                        type='number'
                                        onChange={e => chengeQuantity(product.id, e.target.value)}
                                    />
                                </td>
                                <td>{product.order.price}</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Totales:</td>
                            <td>{totalQuantity()}</td>
                            <td>{totalPrice()}</td>
                        </tr>
                    </tfoot>
                </table>
            }
        </div>
    );
}

export default Cart;
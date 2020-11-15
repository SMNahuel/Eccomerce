import React, {useState} from 'react';
import s from './Cart.module.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../../redux/action-creators';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { selectorValue } from '../../../utils/selector'

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
    const onDelete = (id) => {
        setQuantities({
            ...quantities,
            [id]: 0
        })
        totalQuantity()
        totalPrice()
    }

    return (
        <div className={s[active ? 'active' : 'inactive']}>
            <button onClick={onClick}><ShoppingCartIcon /></button>
            {active &&
                <div className={s.container_table_button}>
                    <table className={s.container_table}>
                        <thead className={s.container_thead}>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className={s.container_tbody}>
                            {cart.products && cart.products.map(product =>
                                (quantities[product.id] !== 0) &&
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>
                                        <select
                                            onChange={e => chengeQuantity(product.id, e.target.value)}
                                            value={quantities[product.id] || product.order.quantity}>
                                            {
                                                selectorValue && selectorValue.map(value =>
                                                    <option key={value}>{value}</option>
                                                )
                                            }
                                        </select>
                                    </td>
                                    <td>${`${product.order.price * quantities[product.id] || product.order.price}`}</td>
                                    <td onClick={() => onDelete(product.id)}><DeleteForeverIcon className={s.DeleteForeverIcon} /></td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot className={s.container_tfoot}>
                            <tr>
                                <td>Total:</td>
                                <td>{totalQuantity()}</td>
                                <td>${totalPrice()}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className={s.container_input_button}>
                        <input type="button" onClick={() => alert("Deberia comprar")} value="Buy" />
                    </div>
                </div>
            }

        </div>
    );
}

export default Cart;
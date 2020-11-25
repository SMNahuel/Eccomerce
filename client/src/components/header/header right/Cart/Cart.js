import React, {useRef, useState} from 'react';
import s from './Cart.module.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../../../redux/action-creators';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { selectorValue } from '../../../../utils/selector'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import cartEmpty from '../../../../img/empty-cart.png'
import { Redirect } from 'react-router-dom';
import FormCheckout from './formCheckout/formCheckout'

function Cart() {
    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [active, setActive] = useState(false)
    const onToggleActive = e => {
        if(!!Object.keys(user).length) dispatch(api.getCart())
        if (active && Object.keys(quantities).length) {
            for(let key in quantities) {
                let id = Number(key)
                cart.products.find(p => p.id === id)
                .order.quantity = quantities[id]
            }
            dispatch(api.updateCart(cart))
            setQuantities({})
        }
        setActive(!active)
    }

    const [form, setForm] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const onForm = e => {
        /* if (user.name) {
            dispatch(api.confirmCart(cart))
            setActive(!active)
        } else {
            setRedirect(true)
        } */
        setForm(active)
    }

    const onBack = () => {
        setForm(false)
        setActive(!active)
    }

    const onCancel = e => {
        if (user.name) {
            dispatch(api.cancelCart(cart))
            setActive(!active)
        } else {
            setRedirect(true)
        }
    }

    const onDelete = (id) => {
        setQuantities({
            ...quantities,
            [id]: 0
        })
        totalQuantity()
        totalPrice()
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
    
    const ref = useRef(null)
    const onUnmount = () => {
        ref.current.style.animation = s.containerUnmount + ' 450ms linear'
        setTimeout(onToggleActive, 400);
    };

    return (
        <>
            {redirect && <Redirect to="/login"/>}
            <div className={s.container_button_toggle}>
                <button onClick={onToggleActive}><ShoppingCartIcon fontSize="small"/></button>
            </div>
            {active && cart.products ?
                <div className={s.container_absolute_main} ref={ref}>
                    <div className={s.container_main_table_button}>
                        <div className={s.container_button_onUnMount_table}>
                            <button onClick={onUnmount}><HighlightOffIcon fontSize="large"/></button>
                        </div>
                        <div className={s.container_table}>
                            <table>
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
                                <input type="button" onClick={onForm} value="Comprar!" />
                                <input type="button" onClick={onCancel} value="Cancelar Carrito" />
                            </div>
                        </div>
                    </div>
                </div>
                : null
            }
            {form &&
                <div className={s.container_absolute_main} ref={ref}>
                    <div className={s.container_main_table_button}>
                        <div className={s.container_table}>
                            <FormCheckout items={cart} price={totalPrice()} user={user} onBack={onBack}/>
                        </div>
                    </div>
                </div>
            }
            {active && !cart.products ?
                <div className={s.container_absolute_main} ref={ref}>
                    <div className={s.container_main_table_button}>
                        <div className={s.container_button_onUnMount_table}>
                            <button onClick={onUnmount}><HighlightOffIcon fontSize="large" /></button>
                        </div>
                        <div className={s.cartEmpty}>
                            <img src={cartEmpty} alt="Cart is empty"/>
                        </div>
                    </div>
                </div>
                : null
            }
        </>
    );
}
export default Cart;

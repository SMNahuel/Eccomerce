import React from 'react';
import s from './ChangeState.module.css';
import { useState} from 'react'
function ChangeState({order, onProcess, changeState}) {
    let products = order.products;
    const [check, setCheck] = useState({
        selected: order.state
    })
    const onCheck = (name, val) => {
        setCheck({
            selected: val
        })

    }
    const handleSumbit = function(){
        onProcess(order, check.selected)
    }
    return (
        <div>
            <h1>Order {order.id}</h1>
            <h2>User: {order.user.name}</h2>
            <table className={s.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody className={s.filas}>
                    {products && products.map(product =>
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>${product.order.price}</td>
                            <td>{product.order.quantity}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className={s.contenedor}>
                <p>Status: {check.selected}</p>
                <label>
                    <input
                        checked={check.selected === 'processing'}
                        id='processing'
                        type="checkbox"
                        name='processing'
                        value='processing'
                        onChange={(e) => onCheck('processing', e.target.value)}
                    />
                    <label htmlFor='processing'>
                        Processing
                            </label>
                </label>
                <label>
                    <input
                        checked={check.selected === 'completed'}
                        id='completed'
                        type="checkbox"
                        name='completed'
                        value='completed'
                        onChange={(e) => onCheck('completed', e.target.value)}
                    />
                    <label htmlFor='completed'>
                        Completed
                            </label>
                </label>
                <label>
                    <input
                        checked={check.selected === 'canceled'}
                        id='canceled'
                        type="checkbox"
                        name='canceled'
                        value='canceled'
                        onChange={(e) => onCheck('canceled', e.target.value)}
                    />
                    <label htmlFor="canceled">
                        Canceled
                            </label>
                </label>
            </div>
            <button className={s.button_accept} onClick={handleSumbit}>Accept</button>
            <button className={s.button_cancel} onClick={changeState}>Cancel</button>
        </div>
    )
}

export default ChangeState;
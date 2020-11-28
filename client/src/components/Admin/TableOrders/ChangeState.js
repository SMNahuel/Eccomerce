import React from 'react';
import style from './ChangeState.module.css';
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
                <h1>Orden numero {order.id}</h1>
                <h2>Usuario: {order.user.name}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody className={style.filas}>                    
                    {products && products.map(product => 
                        <tr key ={product.id}>
                            <td>{product.name}</td>
                            <td>${product.order.price}</td>
                            <td>{product.order.quantity}</td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <div  className={style.contenedor}>
                        <label 
                        >
                            El estado actual es {check.selected} <br />
                            <input
                                checked={check.selected === 'processing'}
                                id='processing'
                                type='radio'
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
                                type='radio'
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
                                type='radio'
                                name='canceled'
                                value='canceled'
                                onChange={(e) => onCheck('canceled', e.target.value)}
                            />
                            <label htmlFor="canceled">
                                Canceled
                            </label>
                        </label>
                </div>
            <button onClick={handleSumbit}>ACEPTAR</button>
            <button onClick={changeState}>CANCELAR</button>
        </div> 
    )
}

export default ChangeState;
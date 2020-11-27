import React from 'react';
import style from './ChangeState.module.css';

function ChangeState({order, onProcess}) {
    let products = order.products;
    let state = ['Processing','Completed', 'Canceled']
    const onCheck = () => {
        console.log('buena rey')        
    }
    const handleSumbit = function(){
        onProcess(order)
    }
    return(
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
                    <tbody>
                    {products && products.map(product => 
                        <tr key ={product.id}>
                            <td>{product.name}</td>
                            <td>${product.order.price}</td>
                            <td>{product.order.quantity}</td>
                        </tr>
                    )}
                    

                    </tbody>
                </table>
                <div className={style.formulario} >
                {
                    state.map(s => 
                        <label 
                        className={style.checkbox}
                        key={s}>
                            <input

                                type='checkbox'
                                name={s}
                                id={s}
                            />
                            <label htmlFor={s}>
                                {s}
                            </label>
                        </label>    
                    )
                }
                <button onClick={handleSumbit}>ACEPTAR</button>
                </div>
        </div> 
    )
}

export default ChangeState;
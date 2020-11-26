import axios from '../../../utils/axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect} from 'react'
import s from './TableOrders.module.css'

function TableOrders() {

    const [orders , setOrders] = useState([])

    const user = useSelector(state => state.user)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/orders/admin`)
        .then(({data})=>setOrders(data))
    }, []);

    const orderMount = order => {
        if (!order.products) return 0
        return order.products.reduce((acc, product) => 
            acc + Number(product.order.price) * Number(product.order.quantity)
        , 0)
    }

    const onProcess = order => {
        axios.put(`${process.env.REACT_APP_API_URL}/orders/process`, order)
        .then(({data})=>setOrders(data))
    }

    return (
        <>
        <div className={s.styleTableOrders}>
            <table className={s.container_table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Estado</th>
                        <th>Monto Total</th>
                        <th>Ultima Operacion</th>
                        <th>Creacion</th>
                        <th>Procesar</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map(order => 
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.state}</td>
                            <td>${orderMount(order)}</td>
                            <td>{order.updatedAt}</td>
                            <td>{order.createdAt}</td>
                            <td className={s.button_details}>
                                { order.state === 'created' ? 
                                    <button onClick={()=>onProcess(order)}>Procesar</button>:
                                    order.state
                                }
                            </td>
                        </tr> 
                    )}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default TableOrders;
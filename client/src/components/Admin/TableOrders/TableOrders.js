import axios from 'axios';
import React from 'react';
import { useState, useEffect} from 'react'
import s from './TableOrders.module.css'

function TableOrders() {

    const [orders , setOrders] = useState([])

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

    const onProcess = order => alert('procesando orden :' + order.id + ' pensando a futuros cercanos T-T')

    return (
        <div className={s.styleTableOrders}>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Estado</th>
                        <th>Monto Total</th>
                        <th>Ultima Opreacion</th>
                        <th>Creacion</th>
                        <th>Procesar</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map(order => 
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.state}</td>
                            <td>{orderMount(order)}</td>
                            <td>{order.updatedAt}</td>
                            <td>{order.createdAt}</td>
                            <td><button onClick={()=>onProcess(order)}>Procesar</button></td>
                        </tr> 
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TableOrders;
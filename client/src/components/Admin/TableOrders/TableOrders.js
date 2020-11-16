import axios from 'axios';
import React from 'react';
import { useState, useEffect} from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
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

    const onProcess = order => {
        axios.put(`${process.env.REACT_APP_API_URL}/orders/process`,
        order,
        {withCredentials: true})
        .then(({data})=>setOrders(data))
    }

    return (
        <div className={s.styleTableOrders}>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Estado</Th>
                        <Th>Monto Total</Th>
                        <Th>Ultima Opreacion</Th>
                        <Th>Creacion</Th>
                        <Th>Procesar</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {orders && orders.map(order => 
                        <Tr key={order.id}>
                            <Td>{order.id}</Td>
                            <Td>{order.state}</Td>
                            <Td>{orderMount(order)}</Td>
                            <Td>{order.updatedAt}</Td>
                            <Td>{order.createdAt}</Td>
                            <Td>
                                { order.state === 'created' ? 
                                    <button onClick={()=>onProcess(order)}>Procesar</button>:
                                    'Procesado'
                                }
                            </Td>
                        </Tr> 
                    )}
                </Tbody>
            </Table>
        </div>
    );
}

export default TableOrders;
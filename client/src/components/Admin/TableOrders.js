import axios from 'axios';
import React from 'react';
import { useState, useEffect} from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import s from './TableOrders.module.css'

function TableOrders() {

    const [orders , setOrders] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/orders')
        .then(({data})=>setOrders(data))
    }, []);
    

    return (
        <div className={s.styleTableOrders}>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Id Order</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                        {orders && orders.map(orden => (
                            <Tr key={orden.id} >
                                <Td>{orden.id} </Td>
                                <Td>{orden.state} </Td>
                            </Tr> 
                        ))}
                </Tbody>
            </Table>
        </div>
    );
}

export default TableOrders;
import axios from 'axios';
import React from 'react';
import { useState, useEffect} from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import s from './Orders.module.css'

function Orden() {

    const [products , setProducts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/orders')
        .then(({data})=>setProducts(data[0].products))
    }, []);

    const totalPrice = () => {
        if (!products) return 0
        return products.reduce((acc, product) => 
            acc + Number(product.order.price) * Number(product.order.quantity)
        , 0)
    }

    return (
        <div className={s.styleTableOrders}>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Product</Th>
                        <Th>Price</Th>
                        <Th>Quantity</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {products && products.map(product => (
                        <Tr key= {product.id}>
                            <Td>{product.name} </Td>
                            <Td>{product.order.price} </Td>
                            <Td>{product.order.quantity} </Td>
                        </Tr>
                    ))}                    
                </Tbody>
            </Table>

                <h3>
                    Total: ${totalPrice()}
                </h3>
        </div>
    );
}

export default Orden;
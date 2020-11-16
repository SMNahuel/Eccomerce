import React,{ useState, useEffect} from 'react';
import s from './Orders.module.css'
import { useDispatch, useSelector } from 'react-redux';
import api from '../../redux/action-creators';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Order from './Order/Order';
import OrderDetail from './OrderDetail/OrderDetail';

export default function Orders() {
    const dispatch = useDispatch()
    const orders = useSelector(state=> state.orders)
    useEffect(() => dispatch(api.getOrders()), []);

    const [orderDetail, setOrderDetail] = useState(null)
    const handleDetail = order => setOrderDetail(order)
    const onBack = e => setOrderDetail(null)

    return (
        <>
            <div className={s.styleTableOrders}>
                {orderDetail ? 
                    <OrderDetail order={orderDetail} onBack={onBack}/>
                    :
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Estado</Th>
                                <Th>Monto Total</Th>
                                <Th>Detalle</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {orders.map && orders.map(order => <Order order={order} onDetail={()=>handleDetail(order)}/>)}
                        </Tbody>
                    </Table>
                }
            </div>
        </>
    );
};
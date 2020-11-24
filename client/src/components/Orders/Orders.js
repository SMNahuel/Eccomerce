import React,{ useState, useEffect} from 'react';
import s from './Orders.module.css'
import { useDispatch, useSelector } from 'react-redux';
import api from '../../redux/action-creators';
import Order from './Order/Order';
import OrderDetail from './OrderDetail/OrderDetail';

export default function Orders({history}) {
    const dispatch = useDispatch()
    const orders = useSelector(state=> state.orders)
    useEffect(() => dispatch(api.getOrders()), [dispatch]);

    const [orderDetail, setOrderDetail] = useState(null)
    const handleDetail = order => setOrderDetail(order)
    const onBack = e => setOrderDetail(null)
    
    return (
        <>
            <div className={s.styleTableOrders}>
                {orderDetail ? 
                    <OrderDetail order={orderDetail} onBack={onBack}/>
                    :
                    <table className={s.container_table}>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Total Price</th>
                                <th>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map && orders.map(order => <Order key={order} order={order} onDetail={()=>handleDetail(order)}/>)}
                        </tbody>
                    </table>
                }
            </div>
        </>
    );
};
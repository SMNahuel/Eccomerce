import axios from '../../../utils/axios';
import React from 'react';
import { useState, useEffect} from 'react'
import s from './TableOrders.module.css'
import ChangeState from './ChangeState';

function TableOrders() {

    const [orders , setOrders] = useState([])
    const [filterOrders, setFilterOrders] = useState({
        filter: "all",
        createdAt: "",
        updatedAt: "",
        carts: []
    })

    
    const [activate, setActivate] = useState({
        action: false
    })
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/orders/admin`)
        .then(({data}) => {
            setOrders(data)
            setFilterOrders({
                ...filterOrders,
                carts: data
            })
        })
    }, []);

    const orderMount = order => {
        if (!order.products) return 0
        return order.products.reduce((acc, product) => 
            acc + Number(product.order.price) * Number(product.order.quantity)
        , 0)
    }
    const changeState = function(){
        if(activate.action === false){
            setActivate({
                action: true,
                order: arguments[0]
            })
        }else{
            setActivate({
                action: false,
                order: ''
            })
        }
    }
    const onProcess = (order, state) => {
        const price = orderMount(order)
        const priceOrder = {
            price: price,
            order: order
        }
        setActivate({
            action: false,
            order: ''
        })

    
        axios.put(`${process.env.REACT_APP_API_URL}/orders/change`, { order, state })
            .then(({ data }) => setOrders(data))

        if (state === 'completed') {
            axios.post(`${process.env.REACT_APP_API_URL}/orders/process`, priceOrder)
        }
    }
    
    
    const change = value => {
        value === "all" ? setFilterOrders({
                filter: value,
                carts: orders
            }) :
            setFilterOrders({
                filter: value,
                carts: orders.filter(order => order.state === value)
            })
    }

    const onOrder = (value, modified) => {
        if(value === "disorder") setFilterOrders({...filterOrders, [modified]: value})
        value === "antiguos" ? setFilterOrders({
            ...filterOrders,
            [modified]: value,
            carts: filterOrders.carts.sort((a, b) => new Date(a[modified]) - new Date(b[modified]))
        }) : 
        setFilterOrders({
            ...filterOrders,
            [modified]: value,
            carts: filterOrders.carts.sort((a, b) => new Date(b[modified]) - new Date(a[modified]))
        })
    }


    return (
        <>
        <div className={s.styleTableOrders}>
        { activate.action === false &&
        <div>
            <div className={s.filters}>
                <h3>Filters: </h3>
                
                <div className={s.container_filters}>
                    <div className={s.filter}>
                        <h4>Estado:</h4>
                        <select name="filter" value={filterOrders.filter} onChange={(e) => change(e.target.value)}>
                                    <option value='all'>all</option>
                                    <option value='cart'>cart</option>
                                    <option value='created'>created</option>
                                    <option value='processing'>processing</option>
                                    <option value='canceled'>canceled</option>
                                    <option value='completed'>completed</option>
                        </select>
                    </div>
                    <div className={s.filter}>
                        <h4>Antiguedad:</h4>
                        <select name="createdAt" value={filterOrders.createdAt} onChange={(e) => onOrder(e.target.value, e.target.name)}>
                                    <option value='disorder'>disorder</option>
                                    <option value='antiguos'>antiguos</option>
                                    <option value='recientes'>recientes</option>
                        </select>
                    </div>
                    <div className={s.filter}>
                        <h4>Modificacion:</h4>
                        <select name="updatedAt" value={filterOrders.updatedAt} onChange={(e) => onOrder(e.target.value, e.target.name)}>
                                    <option value='disorder'>disorder</option>
                                    <option value='antiguos'>antiguos</option>
                                    <option value='recientes'>recientes</option>
                        </select>
                    </div>
                </div>
                
            </div>
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
                {filterOrders.carts && filterOrders.carts.map(order => 
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.state}</td>
                            <td>${orderMount(order)}</td>
                            <td>{order.updatedAt}</td>
                            <td>{order.createdAt}</td>
                            <td className={s.button_details}>
                            <button onClick={() => changeState(order)}>Modificar Orden</button>
                            </td>
                        </tr> 
                )}
                </tbody>
             
            </table>
        </div>
        }
            {
                activate.action === true && <ChangeState order={activate.order} onProcess={onProcess} changeState={changeState}/>  
            }
            
        </div>
        </>
    );
}

export default TableOrders;

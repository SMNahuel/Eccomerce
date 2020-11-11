import React, { useEffect, useState } from 'react';
import s from './FormProduct.module.css';
import TableProduct from './TableProduct/TableProduct';
import CreateProduct from './CreateProduct/CreateProduct';
import UpdateProduct from './UpdateProduct/UpdateProduct';
import DeleteProduct from './DeleteProduct/DeleteProduct'
import { useDispatch, useSelector } from 'react-redux';
import api from '../../redux/action-creators';

export default function CRUDProducts(){
    const [state, setState] = useState({
        action: null,
        product: {}
    })

    const dispatch = useDispatch()
    const products = useSelector(state => state.products)

    useEffect(() => {
        if (!products.length){
            dispatch(api.getProducts())
        }
    }, [dispatch, products])

    const onCreate = () => {
        setState({...state, action: 'create'})
    }
    const handleCreate = (product) =>{
        dispatch(api.createProduct(product))
        setState({...state, action: null})
    }

    const onUpdate = (id) => {
        setState({
            ...state, 
            action: 'update', 
            product: products.find(product => product.id === id)
        })
    }
    const handleUpdate = (id, product) => {
        dispatch(api.updateProducts(id, product))
        setState({...state, action: null})
    }

    const onDelete = (id) => {
        setState({
            ...state, 
            action: 'delete', 
            product: products.find(product => product.id === id)
        })
    }
    const handleDelete = (id) => {
        dispatch(api.deleteProducts(id))
        setState({...state, action: null})
    }
    const onNotSure = () => {
        setState({...state, action: null})
    }

    return(
        <div className={s.form}>
            <div>
                {
                    state.action === null &&
                    <button  onClick={onCreate} className={s.botones} >Crear Producto</button>
                }
                {
                    state.action === 'create' &&
                    <CreateProduct className={s.controls} handleCreate={handleCreate} s={s}/>
                }
                {
                    state.action === 'update' &&
                    <UpdateProduct className={s.controls} handleUpdate={handleUpdate} product={state.product}  s={s}/>
                }
                {
                    state.action === 'delete' &&
                    <DeleteProduct className={s.controls} product={state.product} handleDelete={handleDelete} onNotSure={onNotSure} s={s}/>
                }
            </div>
            <div>
                <TableProduct products={products} onUpdate={onUpdate} onDelete={onDelete} s={s}/>
            </div>
        </div>
    );
};
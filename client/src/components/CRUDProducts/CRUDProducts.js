import React, { useEffect, useState } from 'react';
import s from './FormProduct.module.css';
import FilterBar from './FilterBar/FilterBar';
import TableProduct from './TableProduct/TableProduct';
import CreateProduct from './CreateProduct/CreateProduct';
import UpdateProduct from './UpdateProduct/UpdateProduct';
import DeleteProduct from './DeleteProduct/DeleteProduct'
import { useDispatch, useSelector } from 'react-redux';
import api from '../../redux/action-creators';

export default function CRUDProducts(){
    const [state, setState] = useState({
        action: null,
        product: {},
        products: null
    })

    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const categories = useSelector(state => state.categories)

    useEffect(() => {
        if (!categories.length){
            dispatch(api.getCategories())
        }
        if (!products.length){
            dispatch(api.getProducts())
        }
    }, [dispatch, products, categories])

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
    const handleSearch = (key) => {
        key = key.toLowerCase()
        setState({
            ...state, 
            products: products.filter(({name, description}) => 
                name.toLowerCase().includes(key) ||
                description.toLowerCase().includes(key)
            )
        })

    }
    const handleSelect = (categoryId) => {
        categoryId = Number(categoryId)
        setState({
            ...state, 
            products: products.filter(({categories}) => 
                categories.some(({id}) => id === categoryId)
            )
        })
    }
    const handleClearFilters = () => {
        setState({...state, products: null})
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
                    <CreateProduct className={s.controls} handleCreate={handleCreate} categories={categories} s={s}/>
                }
                {
                    state.action === 'update' &&
                    <UpdateProduct className={s.controls} product={state.product} categories={categories} handleUpdate={handleUpdate} s={s}/>
                }
                {
                    state.action === 'delete' &&
                    <DeleteProduct className={s.controls} product={state.product} handleDelete={handleDelete} onNotSure={onNotSure} s={s}/>
                }
            </div>
            <FilterBar categories={categories} handleSearch={handleSearch} handleSelect={handleSelect} handleClearFilters={handleClearFilters} />
            <div>
                <TableProduct products={state.products || products} onUpdate={onUpdate} onDelete={onDelete} s={s}/>
            </div>
        </div>
    );
};
import React, { useEffect, useState } from 'react';
import s from './FormProduct.module.css';
import FilterBar from './FilterBar/FilterBar';
import TableProduct from './TableProduct/TableProduct';
import CreateProduct from './CreateProduct/CreateProduct';
import UpdateProduct from './UpdateProduct/UpdateProduct';
import DeleteProduct from './DeleteProduct/DeleteProduct';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../redux/action-creators';
import dataURLtoFile from '../../../utils/dataURLtoFile';
import axios from '../../../utils/axios';

export default function CRUDProducts({history}){
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
    
    const onUpdate = (id) => {
        window.scroll(0,0)
        setState({
            ...state, 
            action: 'update', 
            product: products.find(product => product.id === id)
        })
    }
    const handleUpdate = (id, product) => {
        dispatch(api.updateProducts(id, {
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            categories: product.categories
        }))
        if(product.images.length > 0){
            var formData = new FormData();
            product.images.forEach(img => 
                formData.append("image", dataURLtoFile(img.src), img.name)
            )
            axios.post(
                `${process.env.REACT_APP_API_URL}/products/images/${id}`,
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}}
            )
        }
        setState({...state, action: null})
    }

    const onDelete = (id) => {
        window.scroll(0,0)
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
        <>
            <div className={s.form}>
                <div>
                    {
                        state.action === null &&
                        <CreateProduct categories={categories} />
                    }
                    {
                        state.action === 'update' &&
                        <UpdateProduct className={s.controls} product={state.product} categories={categories} handleUpdate={handleUpdate} />
                    }
                    {
                        state.action === 'delete' &&
                        <DeleteProduct className={s.controls} product={state.product} handleDelete={handleDelete} onNotSure={onNotSure} />
                    }
                </div>
                <FilterBar categories={categories} handleSearch={handleSearch} handleSelect={handleSelect} handleClearFilters={handleClearFilters} />
                <div>
                    <TableProduct products={state.products || products} onUpdate={onUpdate} onDelete={onDelete} s={s} />
                </div>
            </div>
        </>
    );
};
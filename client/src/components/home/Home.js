import React, { useState, useEffect } from 'react';
import s from './Home.module.css'; 
import axios from 'axios';
import SearchBar from './search bar/SearchBar';
import Categories from './categories/Categories';
import Catalog from './Catalog/Catalog';
import Product from './Product/Product';

export default function Home() {
    const [ state, setState ] = useState({
        categories: [],
        selectedCategory: null,
        catalog: [],
        detailedProduct: null
    })

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/category`)
        .then(({data}) => setState(state => ({
            ...state, 
            categories: data
        })))
        .catch(err => alert("Error!! " + err))
    }, [])

    useEffect(() => {
        if (state.selectedCategory) {
            axios.get(`${process.env.REACT_APP_API_URL}/products/category/${state.selectedCategory}`)
            .then(({data}) => setState(state => ({
                ...state, 
                catalog: data.products
            })))
            .catch(err => alert("Error!! " + err))
        } else {
            axios.get(`${process.env.REACT_APP_API_URL}/products`)
            .then(({data}) => setState(state => ({
                ...state, 
                catalog: data
            })))
            .catch(err => alert("Error!! " + err))
        }
    }, [state.selectedCategory])

    const onSelect = (e) => {
        setState({
            ...state, 
            selectedCategory: Number(e.target.value)
        })
    }

    const onClear = (e) => {
        setState({
            ...state, 
            selectedCategory: null
        })
    }

    const handleSearch = (key)=>{
        axios.get(`${process.env.REACT_APP_API_URL}/products/search?key=${key}`)
        .then(({data}) =>  setState({
            ...state, 
            catalog: data
        }))
        .catch(err => alert("Error!! " + err))
    }

    const handleDetail = (product)=>{
        setState({
            ...state, 
            detailedProduct: product
        })
    }

    const handleBack = ()=>{
        setState({
            ...state, 
            detailedProduct: null
        })
    }

    return(
        <>
            <div className={s.container}>
                <h1 className={s.title}>Pagina</h1>
            </div>
            {state.detailedProduct && <Product product={state.detailedProduct} onBack={handleBack} />}
            <SearchBar handleSearch={handleSearch} />
            <Categories categories={state.categories} onSelect={onSelect} onClear={onClear} selectedCategory={state.selectedCategory} />
            <Catalog catalog={state.catalog} handleDetail={handleDetail} />
        </>
    )
}
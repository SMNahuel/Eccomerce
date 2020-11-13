import React, { useState, useEffect } from 'react';
import s from './Home.module.css'; 
import { useDispatch, useSelector } from 'react-redux';
import api from '../../redux/action-creators';
import axios from 'axios';
import SearchBar from './SearchBar/SearchBar';
import Categories from './Categories/Categories';
import Catalog from './Catalog/Catalog';
import Product from './Product/Product';
import Cart from './Cart/Cart'

export default function Home() {

    const [ state, setState ] = useState({
        selectedCategory: null,
        products: null,
        detailedProduct: null,
        cartProduct: []
    })

    const dispatch = useDispatch()
    const categories = useSelector(state=> state.categories)
    const products = useSelector(state => state.products)
    
    useEffect(() => {
        if (!categories.length){
            dispatch(api.getCategories())
        }
        if (!products.length){
            dispatch(api.getProducts())
        }
    }, [dispatch, products, categories])

    const onSelect = (e) => {
        let categoryId = Number(e.target.value)
        setState({
            ...state,
            selectedCategory: categoryId,
            products: products.filter(({categories}) => categories.some(({id}) => id === categoryId))
        })
    }

    const onClear = (e) => {
        setState({
            ...state, 
            selectedCategory: null,
            products: null
        })
    }

    const handleSearch = (key) => {
        axios.get(`${process.env.REACT_APP_API_URL}/products/search?key=${key}`)
        .then(({data}) =>  setState({
            ...state, 
            products: data
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

    const addToCart = (product) => {
        const products = {name: product.name, price: product.price}
        console.log(products)
        setState({
            ...state,
            cartProduct: state.cartProduct.concat(products)
        })
    }

    return(
        <div className={s.container}>
            {state.detailedProduct && <Product product={state.detailedProduct} addToCart={addToCart} onBack={handleBack} />}
            <div className={s.navBar}>
                <h1 className={s.title}>Pagina</h1>
                <SearchBar handleSearch={handleSearch} />
            </div>
            <Categories categories={categories} onSelect={onSelect} onClear={onClear} selectedCategory={state.selectedCategory} />
            <div className={s.home}>
                <Catalog products={state.products || products} handleDetail={handleDetail}/>
                <Cart/>
            </div>
        </div>
    )

}
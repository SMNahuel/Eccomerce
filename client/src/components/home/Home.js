import React, { useState, useEffect } from 'react';
import s from './Home.module.css'; 
import { useDispatch, useSelector } from 'react-redux';
import api from '../../redux/action-creators';
import axios from 'axios';
import SearchBar from './SearchBar/SearchBar';
import Categories from './Categories/Categories';
import Catalog from './Catalog/Catalog';
import Product from './Product/Product';

export default function Home() {
    const [ state, setState ] = useState({
        selectedCategory: null,
        products: null,
        detailedProduct: null
    })

    const dispatch = useDispatch()
    const categories = useSelector(state=> state.categories)
    const products = useSelector(state => state.products)
    const user = useSelector(state => state.user)
    console.log(user)
    useEffect(() => {
        if (!categories.length){
            console.log('categories');
            dispatch(api.getCategories())
        }
        if (!products.length){
            console.log('products');
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

    return(
        <>
            <div className={s.container_home_sticky}>
                <div className={s.container_home}>
                    <div className={s.container}>
                        {/* <SideBar/> */}
                        <h1 className={s.title}>Pagina</h1>
                    </div>
                    {state.detailedProduct && <Product product={state.detailedProduct} onBack={handleBack} />}
                    <SearchBar handleSearch={handleSearch} />
                    <Categories categories={categories} onSelect={onSelect} onClear={onClear} selectedCategory={state.selectedCategory} />
                </div>
                    <Catalog products={state.products || products} handleDetail={handleDetail}/>
            </div>
        </>
    )

}
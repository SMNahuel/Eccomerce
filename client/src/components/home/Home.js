import React, { useState, useEffect } from 'react';
import s from './Home.module.css'; 
import { useDispatch, useSelector } from 'react-redux';
import api from '../../redux/action-creators';
import axios from '../../utils/axios';
import Header from '../header/Header';
import Footer from './footer/Footer';
import Body from './body/Body';
import Product from './body/Catalog/Product/Product'

export default function Home({history}) {

    const [ state, setState ] = useState({
        selectedCategory: null,
        products: null,
        detailedProduct: null,
        cartProduct: []
    })
    const [ currentPage ] = useState(1)
    const [ postsPerPage, setPostPerPage ] = useState(10);

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
        dispatch(api.getPurchased())
    }, [dispatch, products, categories])

    const indexOfLastProduct = currentPage * postsPerPage;
    const indexFirstProduct = indexOfLastProduct - postsPerPage;
    const currentProduct = products.slice(indexFirstProduct, indexOfLastProduct)

    const paginate = (pageNumber) => {
        setPostPerPage(postsPerPage + pageNumber)
    }
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
            {
                state.detailedProduct &&
                <div className={s.container_absolute}>
                    <Product product={state.detailedProduct} onBack={handleBack} />
                </div>
            }
            <div className={s.container_home} style={state.detailedProduct ? {height: "100.1vh"} : null}>
                <div className={s.container_header}>
                    <Header history={history} handleSearch={handleSearch}/>
                </div>
                <div>
                    <Body 
                    categories={categories} onSelect={onSelect} onClear={onClear} selectedCategory={state.selectedCategory}
                    products={state.products || currentProduct || products} handleDetail={handleDetail}
                    paginate={paginate} postsPerPage={postsPerPage}/>
                    <Footer/>
                </div>
            </div>
        </>
    )

}
import React, { useState, useEffect } from 'react';
import s from './Home.module.css'; 
import { useDispatch, useSelector } from 'react-redux';
import api from '../../redux/action-creators';
import axios from 'axios';
import Catalog from './Catalog/Catalog';
import Product from './Product/Product';
import FormRespond from './Product/questionAndAnswer/question/formRespond/FormRespond';
import CarouselB from './carousel/CarouselB';
import Header from './header/Header';
import Categories from './Categories/Categories';

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
    const formRespond = useSelector(state => state.formRespond)
    
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
        axios.get(`${process.env.REACT_APP_API_URL}/products/search?key=${key}`,
        {withCredentials: true})
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
            <div className={s.container}>
                <div className={s.navBar}>
                    <Header handleSearch={handleSearch}/>
                    {/* <SearchBar handleSearch={handleSearch} /> */}
                    <Categories categories={categories} onSelect={onSelect} onClear={onClear} selectedCategory={state.selectedCategory} />
                </div>
            </div>
            <div className={s.home}>
                <CarouselB categories={categories}/>
                <Catalog products={state.products || products} handleDetail={handleDetail} />
                {/* <Cart/> */}
            </div>
            
            {
                formRespond &&
                <FormRespond/>
            }
        </>
    )

}
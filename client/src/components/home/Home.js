import React, { useState, useEffect } from 'react';
import s from './Home.module.css';
import axios from 'axios';
import SearchBar from './search bar/SearchBar';
import Categories from './categories/Categories';
import Catalog from './catalog/Catalog';
import SideBar from '../sideBar/SideBar';

export default function Home() {
    const [ state, setState ] = useState({
        categories: [],
        selectedCategory: null,
        catalog: []
    })

    useEffect(() => {
        axios.get(`http://localhost:3001/category`)
        .then(({data}) => setState({
            ...state, 
            categories: data,
            selectedCategory: data[0].id
        }))
        .catch(err => alert("Error!! " + err))
    }, [])

    useEffect(() => {
        if (state.selectedCategory) {
            axios.get(`http://localhost:3001/products/category/${state.selectedCategory}`)
            .then(({data}) => setState({
                ...state, 
                catalog: data.products
            }))
            .catch(err => alert("Error!! " + err))
        }
    }, [state.selectedCategory])

    const onSelect = (e) => {
        setState({
            ...state, 
            selectedCategory: e.target.value
        })
    }

    const handleSearch = (key)=>{
        axios.get(`http://localhost:3001/products/search?key=${key}`)
        .then(({data}) =>  setState({
            ...state, 
            catalog: data
        }))
        .catch(err => alert("Error!! " + err))
    }

    return(
        <div className={s.container_path_home}>
            <SideBar />
            <SearchBar handleSearch={handleSearch} />
            <Categories categories={state.categories} onSelect={onSelect} />
            <Catalog catalog={state.catalog} />
        </div>
    )
}
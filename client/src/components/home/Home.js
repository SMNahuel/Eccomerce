import React, { useState, useEffect } from 'react';
import s from './Home.module.css'
import SearchBar from '../search bar/SearchBar';
import Categories from './categories/Categories';
import Catalog from './catalog/Catalog';
import SideBar from '../sideBar/SideBar'

export default function Home() {
    const [ state, setState ] = useState({
        categories: [],
        selectedCategory: '',
        catalog: []
    })

    useEffect(() => {
        fetch(`http://localhost:3001/category`)
        .then(r => r.json())
        .then(result => setState({
            ...state, 
            categories: result, 
            selectedCategory: result[0].id
        }))
        .catch(err => alert("Error!! " + err))
    }, [])

    useEffect(() => {
        if (state.selectedCategory) {
            fetch(`http://localhost:3001/products/category/${state.selectedCategory}`)
            .then(r => r.json())
            .then(result => setState({
                ...state, 
                catalog: result.products
            }))
            .catch(err => alert("Error!! " + err))
        }
    }, [state.selectedCategory])

    const onSelect = (e)=>{
        setState({
            ...state, 
            selectedCategory: e.target.value
        })
    }

    return(
        <div className={s.container_path_home}>
            <SideBar />
            <SearchBar />
            <Categories categories={state.categories} onSelect={onSelect} />
            <Catalog catalog={state.catalog} />
        </div>
    )
}
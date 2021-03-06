import React from 'react';
import Carousel from './carousel/Carousel';
import Categories from './Categories/Categories'
import Catalog from './Catalog/Catalog'
import Pagination from './Catalog/pagination/Pagination'

export default function Body({categories, onSelect, onClear, selectedCategory, handleDetail, products, paginate, postsPerPage}){
    return (
        <div>
            <Carousel onDetail={handleDetail}/>
            <Categories categories={categories} onSelect={onSelect} onClear={onClear} selectedCategory={selectedCategory}/>
            <Catalog handleDetail={handleDetail} products={products}/>
            <Pagination paginate={paginate} postsPerPage={postsPerPage}/>
        </div>
    )
}
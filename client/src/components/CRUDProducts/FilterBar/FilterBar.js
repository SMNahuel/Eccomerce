import React, { useState } from 'react';
import s from './FilterBar.module.css';
import SearchIcon from '@material-ui/icons/Search';

export default function FilterBar({ categories, handleSearch, handleSelect, handleClearFilters }){
    const [key, setKey] = useState("");
    const onSearch = (e)=>{
        handleSearch(key);
        setKey('')
    }
    const onChange = (e)=>{
        setKey(e.target.value);
    }
    const onKeyEnter = e => {
        if(e.keyCode === 13){
            onSearch()
        }
    }   
    const onSelect = ({target}) => {
        handleSelect(target.value);
    }
    return(
        <div className={s.container}>
            <select name="category" onChange={onSelect}>
                {categories.length &&
                    categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)
                }
            </select>
            <div className={s.search}>
                <input type="text" onKeyDown={onKeyEnter} onChange={onChange} value={key} placeholder="Seach..."/>
                <button onClick={onSearch}><SearchIcon/></button>
            </div>
            <button onClick={handleClearFilters}>Mostar Todo</button>
        </div>
    );
}
import React, { useState } from 'react';
import s from './FilterBar.module.css';
import SearchIcon from '@material-ui/icons/Search';

export default function FilterBar({ categories, handleSearch, handleSelect, handleClearFilters }){
    const [key, setKey] = useState("");
    const onSearch = (e)=>{
        if(key.length <= 2){
            return;
        }
        handleSearch(key);
        setKey('')
    }
    const onChange = (e)=>{
        setKey(e.target.value);
    }
    const onKeyEnter = e => {
        if(key.length <= 2){
            return;
        }
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
            <form onSubmit={onSearch}>
                <div className={s.search}>
                    <input type="text" 
                    onKeyDown={onKeyEnter} 
                    onChange={onChange} 
                    value={key} 
                    placeholder="Seach..."
                    required 
                    pattern="[a-zA-Z0-9 ]{3,50}"
                    title="Min 3 character"
                    />
                    <button type="submit"><SearchIcon/></button>
                </div>
            </form>
            <div className={s.container_button}>
                <button onClick={handleClearFilters}>Mostar Todo</button>
            </div>
        </div>
    );
}
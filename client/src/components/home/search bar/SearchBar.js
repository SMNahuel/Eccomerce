import React, {useState} from 'react';
import s from './SearchBar.module.css'

export default function SearchBar({handleSearch}){
    const [key, setKey] = useState("");
    const onChange = (e)=>{
        setKey(e.target.value);
    }
    const onSearch = (e)=>{
        handleSearch(key);
        setKey('')
    }
    return(
        <div className={s.searchBar}>
            <input type="text" value={key} onChange ={onChange} placeholder="Seach..." className={s.search}/>
            <button className={s.button} onClick={onSearch}>.</button>
        </div>
    )
}
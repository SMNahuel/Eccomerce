import React, {useState} from 'react';
import s from './SearchBar.module.css'
import SearchIcon from '@material-ui/icons/Search';

export default function SearchBar({handleSearch}){
    const [key, setKey] = useState("");
    const onChange = (e)=>{
        setKey(e.target.value);
    }
    const onSearch = (e)=>{
        handleSearch(key);
        setKey('')
    }
    const onKeyEnter = e => {
        if(e.keyCode === 13){
            onSearch()
        }
    }    
    return(
        <div className={s.container_searchBar}>
            <div className={s.container_input_buttons}>
                <input type="text" value={key} onKeyDown={onKeyEnter} onChange ={onChange} placeholder="Seach..."/>
                <button className={s.button} onClick={onSearch}><SearchIcon/></button>
            </div>
        </div>
    )
}
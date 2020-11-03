import React, {useState} from 'react';
import Styles from './searchBar.module.css'

export default function SearchBar(){
    const [search, setSearch] = useState("")
    
    
    return(
        <div>
            <input type="text"/>
            <button></button>
        </div>
    )
}
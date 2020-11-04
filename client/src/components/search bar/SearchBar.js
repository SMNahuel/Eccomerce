import React, {useState} from 'react';
import S from './SearchBar.module.css'

export default function SearchBar(){
    const [search, setSearch] = useState("")
    const changeInput = function(e){
        setSearch(e.target.value)
    }
    const seachInDB = function (){
        //busca con el estado actual
        //search
    }
    return(
        <div className={S.searchBar}>
            <input type="text" value={search} onChange ={changeInput} placeholder="Seach..." className={S.search}/>
            <button className={S.button} onClick={seachInDB}>.</button>
        </div>
    )
}
import React, { useState } from 'react';
import Styles from './formCategories.module.css'

export default function FormCategories(){
    const[input, setInput] = useState({
        name: "",
        description: ""
    })
    const createCategory = function(){
        //send state to backend to create new category
        console.log(input)
    }
    const changeState = function (e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    return(
        <div>
            <h1 className={Styles.title}>Categories</h1>
            <form className={Styles.form}>
                <div className={Styles.section}>
                    <label className={Styles.label}>Name:</label><br/>
                    <input className={Styles.input} name="name" value={input.name} onChange={changeState}></input>
                </div>
                <div className={Styles.section}>
                    <label className={Styles.label}>Description:</label>
                    <textarea className={Styles.input, Styles.area}  name="description" value={input.description} onChange={changeState}></textarea>
                </div>
                <button className={Styles.btn} onClick={createCategory}>Create new categorie</button>
            </form>
        </div>
    )
}
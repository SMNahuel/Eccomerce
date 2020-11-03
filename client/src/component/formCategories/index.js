import React from 'react';
import Styles from './formCategories.module.css'

export default function FormCategories(){
    return(
        <div>
            <h1 className={Styles.title}>Categories</h1>
            <form className={Styles.form}>
                <div className={Styles.section}>
                    <label className={Styles.label}>Nombre:</label>
                    <input className={Styles.input}></input>
                </div>
                <div className={Styles.section}>
                    <label className={Styles.label}>Descripcion:</label>
                    <textarea className={Styles.input, Styles.area}></textarea>
                </div>
                <button className={Styles.btn}>Create new categorie</button>
            </form>
        </div>
    )
}
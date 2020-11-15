import React, { useEffect, useState } from 'react';
import s from './CreateCategory.module.css';


function CreateCategory({ handleCreate }){
    const[input, setInput] = useState({
        name: "",
        description: ""
    })
    const onChange = function (e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        handleCreate(input)
    }
    return(
        <div className={s.container_create_category}>
           
            <form  onSubmit={onSubmit} >
                <h4>Crear una categoria</h4>
                <div className={s.container_input_textarea}>
                    <input 
                    name="name" 
                    value={input.name} 
                    onChange={onChange} 
                    placeholder="Nombre" 
                    required 
                    maxLength="50"
                    pattern ="[A-Za-z0-9]{3, 50}"
                    autoComplete="off"
                    />
                    <label>Nombre</label>
                </div>
                <div className={s.container_input_textarea}>
                    <textarea 
                        name="description" 
                        value={input.description} 
                        onChange={onChange} 
                        placeholder="Descripcion"
                        maxLength="50"
                        autoComplete="off"
                        pattern ="[A-Za-z0-9]{5, 50}"
                        required
                    />
                    <label>Descripcion</label>
                </div>
                <div className={s.container_button_create}>
                    <input type="submit" value={'Create new Category'} />
                </div>
            </form>
        </div>
    )
}
export default CreateCategory;
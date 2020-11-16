import React, { useState } from 'react';
import s from './UpdateCategory.module.css';

export default function UpdateCategory({handleUpdate, category}){
    const [ input, setInput ] = useState({
        name: category.name,
        description: category.description
    })
    const onChange = ({target}) => {
        let newInput = {...input}
        newInput[target.name] = target.value
        setInput(newInput)
    }
    
    const onClick = () => {
        handleUpdate(category.id ,input)
        // dispatch(api.updateCategory(id, input))
    }

    return (    
        <div className={s.container_main}>
            <h4>Editar categoria</h4>
            <form onSubmit={onClick}>
                <div className={s.container_input_textarea}>
                    <input 
                        type="text" 
                        placeholder="Name"
                        name="name"
                        autoComplete="off"
                        value={input.name}
                        onChange={onChange}
                        maxLength="50"
                        pattern="[a-zA-Z0-9]{3,50}"
                        title="Min 3 characters"
                        required 
                    />
                    <label>Name</label>
                </div>
                <div className={s.container_input_textarea}>
                    <textarea 
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={input.description}
                        onChange={onChange}
                        maxLength="50"
                        autoComplete="off"
                        pattern="[A-Za-z0-9]{5,50}"
                        required
                    />
                    <label>Description</label>
                </div>
                <div className={s.container_button_modify}>
                    <button type="submit">Modificar</button>
                </div> 
            </form>
        </div>
    )
}
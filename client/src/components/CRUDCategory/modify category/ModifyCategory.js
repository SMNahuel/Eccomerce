import React, { useState } from 'react';
import s from './ModifyCategory.module.css';

function ModifyCategory({handleUpdate, category}){
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
    }

    return (    
        <div className={s.container_main}>
            <h4>Editar categoria</h4>
            <div className={s.container_input_textarea}>
                <input 
                    type="text" 
                    name="name"
                    value={input.name}
                    onChange={onChange}
                />
            </div>
            <div className={s.container_input_textarea}>
                <textarea 
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={onChange}
                />
            </div>
            <div className={s.container_button_modify}>
                <button onClick={onClick}>Modificar</button>
            </div> 
        </div>
    )
}
export default ModifyCategory;
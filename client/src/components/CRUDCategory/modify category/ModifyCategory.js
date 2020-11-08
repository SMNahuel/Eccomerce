import React, { useState } from 'react';
import s from '../CRUDCategory.module.css';

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
        <div>
            <h4>Editar categoria</h4>
            <div>
                <input 
                    className={s.controls}
                    type="text" 
                    name="name"
                    value={input.name}
                    onChange={onChange}
                />
            </div>
            <div>
                <textarea 
                    className={s.controls}
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={onChange}
                />
            </div>
            <div>
                <button className={s.botones} onClick={onClick}>Modificar</button>
            </div> 
        </div>
    )
}
export default ModifyCategory;
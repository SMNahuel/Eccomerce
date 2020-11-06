import React, { useState } from 'react';
/* import s from './ModifyCategory.module.css'; */

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
            <div>
                <input 
                    type="text" 
                    name="name"
                    value={input.name}
                    onChange={onChange}
                />
            </div>
            <div>
                <textarea 
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={onChange}
                />
            </div>
            <div>
                <button onClick={onClick}>Modificar</button>
            </div> 
        </div>
    )
}
export default ModifyCategory;
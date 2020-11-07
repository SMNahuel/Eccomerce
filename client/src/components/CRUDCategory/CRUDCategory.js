import React, { useState, useEffect } from 'react';
/* import s from './CRUDCategory.module.css'; */
import axios from 'axios';
import TableCategory from './table category/TableCategory'
import CreateCategory from './create category/CreateCategory';
import ModifyCategory from './modify category/ModifyCategory'
import DeleteCategory from './delete category/DeleteCategory';


function CrudCategory(){
    const [state, setState] = useState({
        categories: [],
        action: null,
        category: {}
    })
    
    useEffect(() => {
        axios.get(`http://${window.location.hostname}:3001/category`)
        .then(({data}) => 
            setState(state => ({
                ...state, 
                categories: data
            }))
        )
    }, [])

    const onCreate = () => {
        setState({...state, action: 'create'})
    }
    const handleCreate = (category) => {
        axios.post(`http://${window.location.hostname}:3001/category`, category)
        .then(({data}) => {
            setState({
                ...state,
                categories: data,
                action: null
            })
        })
    }

    const onUpdate = (id) => {
        setState({
            ...state, 
            action: 'edit', 
            category: state.categories.find(category => category.id === id)
        })
    }
    const handleUpdate = (id, category) => {
        axios.put(`http://${window.location.hostname}:3001/category/${id}`, category)
        .then(({data}) => setState({
            ...state,
            categories: data,
            action: null,
        }))
    }

    const onDelete = (id) => {
        setState({
            ...state, 
            action: 'delete', 
            category: state.categories.find(category => category.id === id)
        })
    }
    const handleDelete = (id) => {
        axios.delete(`http://${window.location.hostname}:3001/category/${id}`)
        .then(({data}) => {
            setState({
                ...state,
                categories: data,
                action: null
            })
        })
    }
    const onNotSure = e => {
        setState({...state, action: null})
    }

    return (
        <div>
            {
                state.action === null &&
                <button onClick={onCreate}>Crear Categoria</button>
            }
            {
                state.action === 'create' &&
                <CreateCategory handleCreate={handleCreate} />
            }
            {
                state.action === 'edit' &&
                <ModifyCategory handleUpdate={handleUpdate} category={state.category} />
            }
            {
                state.action === 'delete' &&
                <DeleteCategory handleDelete={handleDelete} category={state.category} onNotSure={onNotSure}/>
            }
            <TableCategory
                categories={state.categories}
                onEdit={onUpdate}
                onDelete={onDelete}
            />
        </div>
    )
}
export default CrudCategory;
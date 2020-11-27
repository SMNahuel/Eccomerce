import React, { useState, useEffect } from 'react';
import s from './CRUDCategory.module.css';
import TableCategory from './TableCategory/TableCategory'
import CreateCategory from './CreateCategory/CreateCategory';
import UpdateCategory from './UpdateCategory/UpdateCategory'
import DeleteCategory from './DeleteCategory/DeleteCategory';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../redux/action-creators';

function CrudCategory({history}){
    const [state, setState] = useState({
        action: null,
        category: {}
    })


    const dispatch = useDispatch()
    const categories = useSelector(state=> state.categories)
    useEffect(() => {
        if(!categories.length){
            dispatch(api.getCategories())
        }
    }, [dispatch, categories])

    const onUpdate = (id) => {
        window.scroll(0,0)
        setState({
            ...state, 
            action: 'update', 
            category: categories.find(category => category.id === id)
        })
    }
    const handleUpdate = (id, category) => {
        dispatch(api.updateCategory(id, category))
        setState({...state, action: null})
    }

    const onDelete = (id) => {
        window.scroll(0,0)
        setState({
            ...state, 
            action: 'delete', 
            category: categories.find(category => category.id === id)
        })
    }
    const handleDelete = (id) => {
        dispatch(api.deleteCategory(id))
        setState({...state, action: null})
    }


    const onNotSure = e => {
        setState({...state, action: null})
    }
    return (
        <>
            <div className={s.form}>
                <h4>Categorias</h4>
                {
                    state.action === null &&
                    <CreateCategory />
                }
                {
                    state.action === 'update' &&
                    <UpdateCategory handleUpdate={handleUpdate} category={state.category} />
                }
                {
                    state.action === 'delete' &&
                    <DeleteCategory handleDelete={handleDelete} category={state.category} onNotSure={onNotSure} />
                }
                <TableCategory
                    categories={categories}
                    onEdit={onUpdate}
                    onDelete={onDelete}
                />
            </div>
        </>
    )
}
export default CrudCategory;
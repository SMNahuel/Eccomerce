import React, { useState, useEffect } from 'react';
import s from './CRUDCategory.module.css';
import TableCategory from './table category/TableCategory'
import CreateCategory from './create category/CreateCategory';
import ModifyCategory from './modify category/ModifyCategory'
import DeleteCategory from './delete category/DeleteCategory';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../redux/action-creators';

function CrudCategory(){
    const [state, setState] = useState({
        action: null,
        category: {}
    })

    const dispatch = useDispatch()
    const categories = useSelector(state=> state.categories)

    useEffect(() => {
        dispatch(api.getCategories())
    }, [dispatch])

    const onCreate = () => {
        setState({...state, action: 'create'})
    }
    const handleCreate = (category) => {
        dispatch(api.createCategory(category))
    }

    const onUpdate = (id) => {
        setState({
            ...state, 
            action: 'update', 
            category: categories.find(category => category.id === id)
        })
    }
    const handleUpdate = (id, category) => {
        dispatch(api.updateCategory(id, category))
    }


    const onDelete = (id) => {
        setState({
            ...state, 
            action: 'delete', 
            category: categories.find(category => category.id === id)
        })
    }
    const handleDelete = (id) => {
        dispatch(api.deleteCategory(id))
    }


    const onNotSure = e => {
        setState({...state, action: null})
    }

    return (
        <div className={s.form}>
            <h4>Categorias</h4>
            {
                state.action === null &&
                <div className={s.container_button_create_category}>
                    <button onClick={onCreate} className={s.button_create_category}>Crear Categoria</button>
                </div>
            }
            {
                state.action === 'create' &&
                <CreateCategory className={s.controls} handleCreate={handleCreate} />
            }
            {
                state.action === 'update' &&
                <ModifyCategory className={s.controls} handleUpdate={handleUpdate} category={state.category} />
            }
            {
                state.action === 'delete' &&
                <DeleteCategory handleDelete={handleDelete} category={state.category} onNotSure={onNotSure}/>
            }
            <TableCategory
                categories={categories}
                onEdit={onUpdate}
                onDelete={onDelete}
            />
        </div>
    )
}
export default CrudCategory;
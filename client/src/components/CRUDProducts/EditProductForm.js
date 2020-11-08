import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import style from './FormProduct.module.css';

//Instalamos Hook para hacer uso de la funciones de register errors y handleSubmit

const EditProductForm = (props) =>{
    const {errors, handleSubmit, setValue} = useForm({
        defaultValues: props.currentProduct
    });
    const [state, setState] = useState({
        name: props.currentProduct.name,
        description: props.currentProduct.description,
        price: props.currentProduct.price,
        stock: props.currentProduct.stock,
        categories: props.currentProduct.categories.map(c => c.id)
    });
    const onChange = ({target}) => {
        var newState = {...state};
        newState[target.name] = target.value
        setState(newState)
    }

    //Usamos setValue para setear en el input los valores del producto a modificar
    setValue('name', props.currentProduct.name);
    setValue('description', props.currentProduct.description);
    setValue('price', props.currentProduct.price);
    setValue('stock', props.currentProduct.stock);
    const [categories, setCategory] = useState([])

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_API_URL}/category`)
        .then(({data}) => 
            //Seteamos las categorias a nuestro estado
            setCategory(data)
        )
    }, [])

    const onSubmit = (data, e) =>{
    props.updateProduct(props.currentProduct.id, state)
    
    //Limpiar campos
    e.target.reset();
    }

    const onCheck = (e) => {
        if(e.target.checked){
            setState({
                ...state,
                categories: state.categories.concat(Number(e.target.name))
            })
        }else{
            setState({
                ...state,
                categories: state.categories.filter( id => id !== Number(e.target.name))
            })
        }
    }
    const verificarCheck = (id) =>{
        for(var i= 0;state.categories.length >i; i++){
            if(state.categories[i] === id){
                return true
            }
        }
        return false;
    }
    return (
        <div name="arriba">
        
        <h4>Editar producto</h4>
        <form  
        className = {style.formulario}
        onSubmit={handleSubmit(onSubmit)}>
        <input className={style.controls} type="text" name="name" value={state.name}
            onChange={onChange}
        />
        <div>
            {errors?.name?.message}
        </div>
        <div>
            {errors?.name?.message}
        </div>
        <input className={style.controls} type="text" name="price" value={state.price}
            onChange={onChange}
        />
        <div>
            {errors?.name?.message}
        </div>        
        <input className={style.controls} type="text" name="stock" value={state.stock}
            onChange={onChange}
        />
        <textarea className={style.controls} type="text" name="description" value={state.description}
            onChange={onChange}
        />
        {/*@Nahuel  */}
        {categories.map(e =>
                <label 
                className={style.checkbox} 
                key={e.id}>
                    <input
                        type="checkbox"
                        name={e.id}
                        id={e.name}
                        checked={verificarCheck(e.id)}
                        onChange={onCheck}
                    />
                    <label for={e.name}> {e.name} </label> 
                </label>
        )}
        <div>
            {errors?.name?.message}
        </div>        
        <button className={style.botones}>Edit product</button>
      </form>
      </div>
    );
}

export default EditProductForm;
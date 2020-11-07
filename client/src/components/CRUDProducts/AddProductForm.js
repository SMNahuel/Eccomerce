import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import style from './FormProduct.module.css';
//Instalamos Hook para hacer uso de la funciones de register errors y handleSubmit
const AddProductForm = ({handleCreate}) =>{

    const {register, errors} = useForm();
    const [state, setState] = useState({
       name: '',
       description: '',
       price: '',
       stock: '',
       categories: []
    });

    const [categories, setCategory] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3001/category`)
        .then(({data}) => 
            //Seteamos las categorias a nuestro estado
            setCategory(data)
        )
    }, [])

    const sendProduct = (e) =>{
        handleCreate(state)
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
                categories: state.categories.filter( id => id !== e.target.name)
            })
        }
        
    }   

    return (
        <div>
        <form 
        className = {style.formulario}
        onSubmit={sendProduct}>
            <h4>Agregar producto</h4>
            <input 
            className={style.controls} 
            type="text" name="name" 
            placeholder= "Ingrese el nombre"
            ref={
                register({
                    required: {value: true, message: 'Campo requerido'}
                })
            }
            onChange={(e)=>{
                setState({
                    ...state,
                    [e.target.name]: e.target.value
                })
            }}
            />
                <div>
                    {errors?.name?.message}
                </div>
            <input 
            className={style.controls} 
            type="text" name="description" 
            placeholder= "Ingrese descripcion" 
            ref={
                register({
                    required: {value: true, message: 'Campo requerido'}
                })
            }
            onChange={(e)=>{
                setState({
                        ...state,
                        [e.target.name]: e.target.value
                })
            }}
            />
                <div>
                    {errors?.name?.message}
                </div>
            <input 
            className={style.controls} 
            type="text"  
            name="price" 
            placeholder= "Ingrese el precio"
            ref={
                register({
                    required: {value: true, message: 'Campo requerido'}
                })
            }
            onChange={(e)=>{
                setState({
                    ...state,
                    [e.target.name]: e.target.value
                })
            }}
            />
                <div>
                    {errors?.name?.message}
                </div>
            <input 
            className={style.controls} 
            type="text" 
            name="stock" 
            placeholder= "Ingrese el stock"
            ref={
                register({
                    required: {value: true, message: 'Campo requerido'}
                })
            }
            onChange={(e)=>{
                setState({                  
                    ...state,
                    [e.target.name]: e.target.value
                })
            }}
            />
            <div >
            {/* @Nahuel */}
            {categories.map(c =>
                    <label 
                    className={style.checkbox} 
                    key={c.id}>
                        <input
                        type="checkbox"
                        name={c.id}
                        id={c.name}
                        onChange={onCheck}
                        /> 

                        <label for={c.name}>
                            {c.name}
                        </label>
                    </label>
            )}
            </div>
                <div>
                    {errors?.name?.message}
                </div>
            <button className={style.botones} >Add new product</button>
      </form>
      </div>
    );
}

export default AddProductForm;
import React from 'react';
import {useForm} from 'react-hook-form';
import style from './FormProduct.module.css';
//Instalamos Hook para hacer uso de la funciones de register errors y handleSubmit
const AddProductForm = (props) =>{

    const {register, errors, handleSubmit} = useForm();

    const onSubmit = (data, e) =>{

        console.log(data);

        //Mandamos el producto al state
        props.addProduct(data);
        
        //Limpiar campos
        e.target.reset();
    }

    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)} >
            <h4>Agregar producto</h4>
            <input className={style.controls} type="text" name="name" placeholder= "Ingrese el nombre"ref={
                register({
                    required: {value: true, message: 'Campo requerido'}
                })
            }/>
                <div>
                    {errors?.name?.message}
                </div>
            <input className={style.controls} type="text" name="description" placeholder= "Ingrese descripcion" ref={
                register({
                    required: {value: true, message: 'Campo requerido'}
                })
            }/>
                <div>
                    {errors?.name?.message}
                </div>
            <input className={style.controls} type="text" name="price" placeholder= "Ingrese el precio"ref={
                register({
                    required: {value: true, message: 'Campo requerido'}
                })
            }/>
                <div>
                    {errors?.name?.message}
                </div>
            <input className={style.controls} type="text" name="stock" placeholder= "Ingrese el stock"ref={
                register({
                    required: {value: true, message: 'Campo requerido'}
                })
            }/>
                <div>
                    {errors?.name?.message}
                </div>
            <button className={style.botones} variant="primary" type="submit">Add new product</button>
      </form>
      </div>
    );
}

export default AddProductForm;
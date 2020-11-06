import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import style from './FormProduct.module.css';

//Instalamos Hook para hacer uso de la funciones de register errors y handleSubmit

const EditProductForm = (props) =>{
    const {register, errors, handleSubmit, setValue} = useForm({
        defaultValues: props.currentProduct
    });
    const [state, setState] = useState({
        product: []
    })
    setValue('name', props.currentProduct.name);
    setValue('description', props.currentProduct.description);
    setValue('price', props.currentProduct.price);
    setValue('stock', props.currentProduct.stock);
    

    const onSubmit = (data, e) =>{
    //console.log(data)
    props.updateProduct(props.currentProduct.id, data)
    
    //Limpiar campos
    e.target.reset();
    }
    //linea 46
    //<form onSubmit={handleSubmit(onSubmit)}></form>
    return (
        <div>
        <h4>Editar producto</h4>
        <form  onSubmit={handleSubmit(onSubmit)}>
        <input className={style.controls} type="text" name="name" ref={
            register({
                required: {value: true, message: 'Campo requerido'}
            })
        }/>
        <div>
            {errors?.name?.message}
        </div>
        <input className={style.controls} type="text" name="description" ref={
            register({
                required: {value: true, message: 'Campo requerido'}
            })
        }/>
        <div>
            {errors?.name?.message}
        </div>
        <input className={style.controls} type="text" name="price"ref={
            register({
                required: {value: true, message: 'Campo requerido'}
            })
        }/>
        <div>
            {errors?.name?.message}
        </div>        
        <input className={style.controls} type="text" name="stock"ref={
            register({
                required: {value: true, message: 'Campo requerido'}
            })
        }/>
        <div>
            {errors?.name?.message}
        </div>        
        <button className={style.botones}>Edit product</button>
      </form>
      </div>
    );
}

export default EditProductForm;
import React, { useEffect, useState } from 'react';
import s from './FormProduct.module.css';
import axios from 'axios';
import EditProductForm from './EditProductForm';
import AddProductForm from './AddProductForm';
import ProductTable from './ProductTable';
//import {v4 as uuidv4} from 'uuid';
export default function CRUDProducts(){
    //Creamos un estado unificado 

    
    const [state, setState] = useState({
        products: [],
        product: {}
    })
    //Pedimos los productos a la base de datos 
    //Y mostramos
    useEffect(() => {
        let res = axios.get(`http://localhost:3001/products`)
        .then(({data}) => 
            //Seteamos los productos a nuestro estado
            setState({
                ...state,
                products: data
            })
        )
    }, [])

    //Funcionando
    const handleCreate = (product) =>{
        axios.post('http://localhost:3001/products', product)
        .then(({data}) => {
            setState({
                ...state,
                products: data
            })
        })
    }

    //Funcion deleted a la base de datos
    function deletedProduct(id){
        const arrayFiltrado = state.products.filter(product => product.id !== id)
        console.log(id);
        axios.delete(`http://localhost:3001/products/${id}`)
        .then(({data}) =>{
            console.log(data);
            setState({
                ...state,
                products: arrayFiltrado
            })
        })
    }

    //Funcion agregar un nuevo productos directamente en el componente AddProductForm
    
    //Funcion editar
    const [editing, setEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        id : null , name: '', description: '', price: '', stock: ''
    })
    function editRow(product){
        setEditing(true);
        setCurrentProduct({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock
        })
    }
    const updateProduct = (id, data) =>{
        setEditing(false);
        console.log(id);
        console.log(data);
        // fetch(`http://localhost:3001/products/`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        //   })
        //     .then(res => res.json())
        //     // .then(item => props.updateItem(item))
        //     .catch(err => console.error(err))
        axios.put(`http://localhost:3001/products/${id}`, data)
        .then(({data}) => setState({
            ...state,
            products: data
        }))
    }

    return(
        <div className={s.form}>
           <div>
            {
                editing ? (
                <div>
                <EditProductForm 
                className={s.controls} 
                currentProduct={currentProduct}
                updateProduct= {updateProduct}
                    />
                </div>
                ) : (
                <div>
                <AddProductForm 
                    className={s.controls}
                    handleCreate = {handleCreate}
                    />
                </div>
                )
            }
            </div>
            <div>
            <ProductTable 
            product={state.products}
            deletedProduct={deletedProduct}
            editRow={editRow}
            />
            </div>
        </div>
    );
};
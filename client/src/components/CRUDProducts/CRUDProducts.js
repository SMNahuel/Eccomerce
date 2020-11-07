import React, { useEffect, useState } from 'react';
import s from './FormProduct.module.css';
import axios from 'axios';
import EditProductForm from './EditProductForm';
import AddProductForm from './AddProductForm';
import ProductTable from './ProductTable';
//import {v4 as uuidv4} from 'uuid';
export default function CRUDProducts(){
    
    //Creamos estado vacio 
    const [state, setState] = useState({
        products: []
    })

    //Pedimos los productos a la base de datos 
    useEffect(() => {
        axios.get(`http://localhost:3001/products`)
        .then(({data}) => 
            //Seteamos los productos a nuestro estado
            setState(state =>({
                ...state,
                products: data
            }))
        )
    }, [])

    //Funcionando
    const handleCreate = (product) =>{
        //Hacemos la peticion post con nuesto product que recibimos como parametro 
        axios.post('http://localhost:3001/products', product)
        .then(({data}) => {
            setState({
                //Lo seteamos con lo que devuelve ya que vuelve todos los post
                //incluido con el que agregamos
                ...state,
                products: data
            })
        })
    }

    //Funcion deleted a la base de datos
    function deletedProduct(id){
        //Hacemos request de deleted al server
        axios.delete(`http://localhost:3001/products/${id}`)
        .then(({data}) =>{
            //Seteamos el estado con lo que devuelve el axios ya que devuelve todos los datos 
            //sin el que borramos
            setState({
                ...state,
                products: data
            })
        })
    }
    
    //Agregamos un estado para controlar el componente a mostrar
    const [editing, setEditing] = useState(false);
    
    //Usamos un estado auxiliar para enviar al server y hacer la petición PUT
    const [currentProduct, setCurrentProduct] = useState({
        id : null , name: '', description: '', price: '', stock: ''
    })
    function editRow(product){
        //Cambiamos el estado para volver al componente Add
        setEditing(true);
        //Seteamos el estado de nuestro producto Auxiliar
        //con lo que recibimos como parametro
        setCurrentProduct({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock
        })
    }

    const updateProduct = (id, product) =>{
        //Si se hace el llamado a la función desde el componente EditProduct
        //Mostramos el componente formulario de edicion
        setEditing(false);
        //Hacemos el pedido put al server pasando como segundo parametro el producto que recibimos
        //y Su id
        axios.put(`http://localhost:3001/products/${id}`, product)
        .then(({data}) => setState({
            //El servidor nos devuelve todos los productos y el producto modificaod
            //Y lo seteamos a nuestro estado
            ...state,
            products: data
        }))
    }

    return(
        <div className={s.form}>
            <div>
                {
                    /* Usamos editing para mostrar un componente u otro dependiendo de su estado */
                    editing ? (
                    <div>
                        {/* En el caso que sea true mostramos EditProduct */}
                    <EditProductForm 
                    className={s.controls} 
                    currentProduct={currentProduct}
                    updateProduct= {updateProduct}
                        />
                    </div>
                    ) : (
                    <div>
                        {/* Si no mostramos AddProduct */}
                    <AddProductForm 
                        className={s.controls}
                        handleCreate = {handleCreate}
                        />
                    </div>
                    )
                }
                </div>
                <div>
                {/* Mostraremos siempre la tabla product pasamos como parametros */}
                {/* Los productos */}
                {/* Y las funciones Deleted y Editar para incrustar a los botones */}
                <ProductTable 
                product={state.products}
                deletedProduct={deletedProduct}
                editRow={editRow}
                />
            </div>
        </div>
    );
};
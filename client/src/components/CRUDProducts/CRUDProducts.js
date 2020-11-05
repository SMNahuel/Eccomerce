import React, { useEffect, useState } from 'react';
import s from './FormProduct.module.css';
import EditProductForm from './EditProductForm';
import AddProductForm from './AddProductForm';
import ProductTable from './ProductTable';
//import {v4 as uuidv4} from 'uuid';
export default function CRUDProducts(){
    //Creamos un estado unificado 

    
    const [state, setState] = useState({
        products: []
    })
    //Pedimos los productos a la base de datos 
    //Y mostramos
    useEffect(() => {
        fetch(`http://localhost:3001/products`)
        .then(r => r.json())
        .then(result => (
            //Seteamos los productos a nuestro estado
            setState({
                ...state,
                products: result
            })
        ))
        .catch(err => alert("Error!! " + err))
    }, [])

    //Funcion deleted a la base de datos
    function deletedProduct(name){
        fetch(`http://localhost:3001/products/${name}`, {
            method: 'DELETE'
        })
         .catch(err => console.error(err))
         .then(() => {
            const arrayFiltrado = state.products.filter(product => product.name !== name)
            setState({
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
    const updateProduct = (id) =>{
        setEditing(false);
        console.log(id);

        fetch(`http://localhost:3001/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateProduct)
          })
            .catch(err => console.error(err))
            .then(res => res.json())
            .then(item => this.props.updateItem(item))

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
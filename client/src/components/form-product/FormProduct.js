import React, { useState } from 'react';
import ProductTable from './ProductTable';
import EditProductForm from './EditProductForm';
import AddProductForm from './AddProductForm';
import style from './FormProduct.module.css';
//Instalamos con npm install uuid
import {v4 as uuidv4} from 'uuid';
//Falta añadir algunos comentarios para explicar su funcionamiento y css para mejorar la vista 
function FormProduct(){
  const productData = [
    //Utilizamos esta funcion para tener valores de id unicos 
    {id: uuidv4(), name: 'JavaScript', description: 'lorem ipsum dolor ads cuant bat fly on the flasdasdsadsadsaoor', price: 200, stock: 4},
    {id: uuidv4(), name: 'NodeJS', description: 'lorem ipsum dolor ads cuant ', price: 200, stock: 4},
    {id: uuidv4(), name: 'VUE', description: 'lorem ipsum dolor ads cuant ', price: 200, stock: 4},
    {id: uuidv4(), name: 'JAVA', description: 'lorem ipsum dolor ads cuant ', price: 200, stock: 4}
  ]


  //State
  const [products, setProduct] = useState(productData);
  
  //Created
  const addProduct = (product) =>{
    product.id = uuidv4()
    setProduct([
      ...products,
      product

    ])
  }

  //Remove
  
  const deletedProduct = (id) =>{
    const arrayFiltrado = products.filter(product => product.id !== id)
    setProduct(arrayFiltrado);
  }

  //Update
  const [editing, setEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id : null , name: '', description: '', price: '', stock: ''
  })
  const editRow = (product) =>{
    setEditing(true);
    setCurrentProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock
    })
  }
  const updateProduct = (id, updateProduct) =>{
    setEditing(false);
    setProduct(products.map(product=> (product.id === id ? updateProduct: product))) 
  }
  return (
  <div className={style.form}>
    <div>
      {
        editing ? (
        <div>
            <EditProductForm className={style.controls}
              currentProduct={currentProduct}
              updateProduct= {updateProduct}
            />
        </div>
        ) : (
        <div>
          <AddProductForm 
            className={style.controls} 
            addProduct={addProduct}/>
        </div>
        )
      }
    </div>
    <div>
      <h2>View Product</h2>
      <ProductTable
        product={products} 
        deletedProduct={deletedProduct} 
        editRow={editRow}
      />
    </div>
  </div>
  )
}

export default FormProduct;
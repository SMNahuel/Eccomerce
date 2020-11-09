import React, { useEffect, useState } from 'react';
import ProductTable from './ProductTable';
import EditProductForm from './EditProductForm';
import AddProductForm from './AddProductForm';
import s from './FormProduct.module.css';
//Instalamos con npm install uuid
import {v4 as uuidv4} from 'uuid';
//Falta añadir algunos comentarios para explicar su funcionamiento y css para mejorar la vista 
function FormProduct(){
  const productData = [
    //Utilizamos esta funcion para tener valores de id unicos 
    {id: 'soy una prueba', name: 'soy una prueba', description: 'soy una prueba', price: 1 , stock: 1}
  ]
    //State
    const [products, setProduct] = useState(productData);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
    .then(r => r.json())
    .then(result => (
        setProduct(result)
    ))
    .catch(err => alert("Error!! " + err))
  }, [])


  
  //Created


  //Remove
  


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
  <div className={s.form}>
    <div>
      {
        editing ? (
        <div>
            <EditProductForm className={s.controls}
              currentProduct={currentProduct}
              updateProduct= {updateProduct}
            />
        </div>
        ) : (
        <div>
          <AddProductForm 
            className={s.controls} 
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
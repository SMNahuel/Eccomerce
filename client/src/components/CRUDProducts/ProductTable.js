import React from 'react';
import style from './FormProduct.module.css';
//Declaramos componente Product como función con ES6
const ProductTable = (props) => {
    
    return(
        <table className={style.product}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th className={style.description}>Descricion</th>
            <th>Precio</th>
            <th>Cantidades</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {props.product.length > 0 ? (
            props.product.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button 
                    className={style.botones}
                    onClick = {()=>{ props.editRow(product) }}>
                    Edit
                  </button>
                  <button 
                    className={style.botonesDeleted}
                    onClick={() => {props.deletedProduct(product.name)}}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) 
            ) : (
              <tr>
                <td colSpan={3}>No users</td>
              </tr>
            )}
    
        </tbody>
      </table>)
}
export default ProductTable;
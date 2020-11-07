import React from 'react';
import s from './FormProduct.module.css';
//Declaramos componente Product como función con ES6
const ProductTable = (props) => {
    
  return (
    <table name="arribas" className={s.product}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th className={s.description}>Descricion</th>
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
                  href="#arriba"
                  className={s.botones}
                  onClick={() => { props.editRow(product) }}>
                  Edit
                  </button>
                <button
                  className={s.botonesDeleted}
                  onClick={() => { props.deletedProduct(product.id) }}
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
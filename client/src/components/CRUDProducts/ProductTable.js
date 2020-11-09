import React from 'react';
import s from './FormProduct.module.css';
import Edit from '@material-ui/icons/Build';
import Deleted from '@material-ui/icons/DeleteForever';
const ProductTable = (props) => {
    
  return (
    <table name="arribas" className={s.product}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th className={s.description_td}>Descricion</th>
          <th>Precio</th>
          <th>Cantidades</th>
          <th>Modificar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {props.product.length > 0 ? (
          props.product.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td className={s.description_td}>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td className={s.acciones_td}>
                <button
                  href="#arriba"
                  className={s.boton_modificar}
                  onClick={() => { props.editRow(product) }}>
                    
                  <div className={s.container_edit}>
                    <Edit fontSize="small" />
                  </div>
                </button>
              </td>
              <td className={s.acciones_td}>
                <button
                  className={s.botonesDeleted}
                  onClick={() => { props.deletedProduct(product.id) }}
                >
                  <div className={s.container_delete}>
                    <Deleted fontSize="small" />
                  </div>
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
    </table>
    
    )
}

export default ProductTable;
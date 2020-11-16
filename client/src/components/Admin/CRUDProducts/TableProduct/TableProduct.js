import React from 'react';
/* import s from './FormProduct.module.css'; */
import RowProduct from './RowProduct/RowProduct';
/* import Edit from '@material-ui/icons/Build'; */
/* import Deleted from '@material-ui/icons/DeleteForever'; */
export default function TableProduct({products, onUpdate, onDelete, s}) {
    
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
        {products.length &&
          products.map((product) => <RowProduct key={product.id} product={product} onUpdate={onUpdate} onDelete={onDelete} s={s}/>)
        }
      </tbody>
    </table>
    
    )
}
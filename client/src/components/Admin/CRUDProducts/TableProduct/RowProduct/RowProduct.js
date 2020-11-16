import React from 'react';
import Deleted from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Build';
/* import s from './RowCategory.module.css'; */

export default function RowProduct({product, onUpdate, onDelete, s}) {
    return (
        <tr>
            <td>{product.name}</td>
            <td className={s.description_td}>{product.description}</td>
            <td>${product.price}</td>
            <td>{product.stock}</td>
            <td className={s.acciones_td}>
                <button href="#arriba" className={s.boton_modificar} onClick={() => onUpdate(product.id)}>
                    <div className={s.container_edit}>
                        <Edit fontSize="small" />
                    </div>
                </button>
            </td>
            <td className={s.acciones_td}>
                <button className={s.botonesDeleted} onClick={() => onDelete(product.id)}>
                    <div className={s.container_delete}>
                        <Deleted fontSize="small" />
                    </div>
                </button>
            </td>
        </tr>
    );
}
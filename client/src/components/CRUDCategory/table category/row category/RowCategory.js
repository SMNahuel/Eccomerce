import React from 'react';
/* import s from './RowCategory.module.css'; */
import Deleted from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Build';
import s from '../../CRUDCategory.module.css';


export default ({category, onEdit, onDelete}) => (
    <tr>
        <th>{category.id}</th>
        <th>{category.name}</th>
        <th>{category.description}</th>
        <th className={s.botonesEditar} onClick={() => onEdit(category.id)}><Edit fontSize="small"/></th>
        <th className={s.botonesDeleted} onClick={() => onDelete(category.id) }><Deleted/></th>
    </tr>
)
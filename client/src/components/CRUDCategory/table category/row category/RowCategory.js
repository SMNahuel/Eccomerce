import React from 'react';
import Deleted from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Build';
import s from './RowCategory.module.css';


export default ({category, onEdit, onDelete}) => (
    <tr>
        <th>{category.id}</th>
        <th>{category.name}</th>
        <th>{category.description}</th>
        <th className={s.botonesEditar} onClick={() => onEdit(category.id)}>
            <div className={s.container_edit}>
                <Edit fontSize="inherit"/>
            </div>
        </th>
        <th className={s.botonesDeleted} onClick={() => onDelete(category.id) }>
            <div className={s.container_delete}>
                <Deleted fontSize="small"/>
            </div>
        </th>
    </tr>
)
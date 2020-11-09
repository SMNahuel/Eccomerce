import React from 'react';
import Deleted from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Build';
import s from './RowCategory.module.css';


export default ({category, onEdit, onDelete}) => (
    <tr>
        <th>{category.id}</th>
        <th>{category.name}</th>
        <th className={s.description}>{category.description}</th>
        <th>
            <button className={s.button_edit} onClick={() => onEdit(category.id)}>
                <div className={s.container_edit}>
                    <Edit fontSize="small"/>
                </div>
            </button>
        </th>
        <th>
            <button className={s.button_delete} onClick={() => onDelete(category.id)}>
                <div className={s.container_delete}>
                    <Deleted fontSize="small"/>
                </div>
            </button>
        </th>
    </tr>
)
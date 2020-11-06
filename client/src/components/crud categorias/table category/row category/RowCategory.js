import React from 'react';
/* import s from './RowCategory.module.css'; */
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

export default ({category, onEdit, onDelete}) => (
    <tr>
        <th>{category.id}</th>
        <th>{category.name}</th>
        <th>{category.description}</th>
        <th onClick={() => onEdit(category.id)}><AddIcon/></th>
        <th onClick={() => onDelete(category.id)}><CloseIcon/></th>
    </tr>
)
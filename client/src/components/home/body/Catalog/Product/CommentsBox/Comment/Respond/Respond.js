import React, {useState} from 'react';
import s from './Respond.module.css';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';


export default function Respond({respond, user, HTTP, toggleNew}){
    const canUpdate = user && (respond.user.id === user.id)
    const canDelete = canUpdate || user.rolId > 3
    const [state, setState] = useState({
        update: false,
        message: respond.message
    });
    const toggleUpdate = e => setState({...state, update: !state.update});
    const onChange = e => setState({...state, message: e.target.value});
    const onUpdate = e => {
        e.preventDefault();
        HTTP('put', `${process.env.REACT_APP_API_URL}/respond`, {id: respond.id, message: state.message})
        setState({...state, update: false});
    }
    const onDelete = e => {
        e.preventDefault();
        HTTP('delete', `${process.env.REACT_APP_API_URL}/respond/${respond.id}`)
        setState({...state, update: false});
    }
    return(
        <div className={s.container_answer}>
            {canUpdate && <button onClick={toggleUpdate}>{state.update ? <ArrowBackIcon/> : <EditIcon/>}</button>}
            {canDelete && <button onClick={onDelete}><DeleteIcon/></button>}
            <KeyboardReturnIcon fontSize="small" className={s.KeyboardReturnIcon} />
            <p className={s.p_answers}>{respond.user.name}</p>
            {state.update ? 
                <div>
                    <input className={s.p_answers} onChange={onChange} value={state.message}/>
                    <button onClick={onUpdate}><SendIcon/></button>
                </div>:
                <p className={s.p_answers}>{state.message}</p>
            }
            <button onClick={toggleNew}>RESPONDER</button>
        </div>
    );
}
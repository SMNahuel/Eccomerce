import React, { useState } from 'react';
import s from './Comment.module.css';
import Respond from './Respond/Respond';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Comment({comment, user, api}){
    const canUpdate = user && (comment.user.id === user.id)
    const canDelete = canUpdate || user.rolId > 3
    const [state, setState] = useState({
        update: false,
        updateMessage: comment.message,
        new: false,
        newMessage: ''
    });
    const toggleUpdate = e => setState({...state, update: !state.update});
    const toggleNew = e => setState({...state, new: !state.new});
    const onChangeUpdateMessage = e => setState({...state, updateMessage: e.target.value});
    const onChangenewMessage = e => setState({...state, newMessage: e.target.value});
    const onUpdate = e => {
        e.preventDefault();
        api('put', `${process.env.REACT_APP_API_URL}/comment`, {message: state.updateMessage, id: comment.id})
        setState({...state, update: false});
    }
    const onDelete = e => {
        e.preventDefault();
        api('delete', `${process.env.REACT_APP_API_URL}/comment/${comment.id}`)
        setState({...state, update: false});
    }
    const onNewRespond = e => {
        e.preventDefault();
        api('post', `${process.env.REACT_APP_API_URL}/respond/${comment.id}`, {message: state.newMessage})
        setState({...state, new: false, newMessage: ''});
    }
    return (
        <div className={s.container_p}>
            <p className={s.p_question}>{comment.user.name}</p>
            {canUpdate && <button onClick={toggleUpdate}>{state.update ? <ArrowBackIcon/> : <EditIcon/>}</button>}
            {canDelete && <button onClick={onDelete}><DeleteIcon/></button>}
            {state.update ? 
                <div>
                    <input className={s.p_question} onChange={onChangeUpdateMessage} value={state.updateMessage}/>
                    <button onClick={onUpdate}><SendIcon/></button>
                </div>:
                <p className={s.p_question}>{state.updateMessage}</p>
            }
            <button onClick={toggleNew}>RESPONDER</button>
            {comment.responds.map(respond => <Respond key={respond.id}  respond={respond} user={user} api={api} toggleNew={toggleNew}/>)}
            {state.new && 
                <div>
                    <input className={s.p_question} onChange={onChangenewMessage} value={state.newMessage}/>
                    <button onClick={onNewRespond}><SendIcon/></button>
                </div>
            }
        </div>
    )
}

import React, { useState } from 'react';
import s from './Comment.module.css';
import Respond from './Respond/Respond';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Comment({comment, user, HTTP}){
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
        HTTP('put', `${process.env.REACT_APP_API_URL}/comment`, {message: state.updateMessage, id: comment.id})
        setState({...state, update: false});
    }
    const onDelete = e => {
        e.preventDefault();
        HTTP('delete', `${process.env.REACT_APP_API_URL}/comment/${comment.id}`)
        setState({...state, update: false});
    }
    const onNewRespond = e => {
        e.preventDefault();
        HTTP('post', `${process.env.REACT_APP_API_URL}/respond/${comment.id}`, {message: state.newMessage})
        setState({...state, new: false, newMessage: ''});
    }
    return (
        <div className={s.container_p}>
            <p className={s.p_user_name}>{comment.user.name}</p>
            <div className={s.container_edit_p_question}>
                {canDelete && <button className={s.button_delete} onClick={onDelete}><DeleteIcon fontSize="small"/></button>}
                {canUpdate && <button className={s.button_edit_arrow} onClick={toggleUpdate}>{state.update ? <ArrowBackIcon fontSize="large"/> : <EditIcon fontSize="small"/>}</button>}
                {state.update ? 
                    <div className={s.container_input_button_form}>
                        <textarea className={s.p_question} onChange={onChangeUpdateMessage} value={state.updateMessage} autoFocus="true"/>
                        <button onClick={onUpdate}><SendIcon fontSize="small"/></button>
                    </div>:
                    <p className={s.p_question_text}>{state.updateMessage}</p>
                }
                
            </div>
            {
                user.name &&
                <button className={s.button_respond} onClick={toggleNew}>Respond</button>
            }
            <button onClick={toggleNew}>RESPONDER</button>
            {comment.responds.map(respond => <Respond key={respond.id}  respond={respond} user={user} HTTP={HTTP} toggleNew={toggleNew}/>)}

            {state.new && 
                <div className={s.container_input_button_form}>
                    <textarea className={s.p_question} onChange={onChangenewMessage} value={state.newMessage} autoFocus="true"/>
                    <button onClick={onNewRespond}><SendIcon fontSize="small"/></button>
                </div>
            }
        </div>
    )
}

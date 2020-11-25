import React, { useState ,useEffect } from 'react';
import { useSelector } from 'react-redux';
import s from './CommentsBox.module.css';
import axios from 'axios';
import SendIcon from '@material-ui/icons/Send';
import Comment from './Comment/Comment';

export default function CommentsBox({productId}){
    const user = useSelector(state => state.user)
    const [comments, setComments] = useState([])
    const api = (method, url, body) => {
        let p
        if (method === 'get' || method === 'delete') {
            p = axios[method](url, {withCredentials: true})
        } else {
            p = axios[method](url, body, {withCredentials: true})
        }
        p.then(({data}) => setComments(data))
        .catch(err => {
            if (err.response) {
                alert(`Error! \n Status: ${err.response.status}\n${err.response.data}`);
            } else {
                alert(`Error! ${err}`);
            }
        })
    }
    useEffect(() => {
        api('get', `${process.env.REACT_APP_API_URL}/comment/${productId}`)
    }, [productId])

    const [inputMessage, setInputMessage] = useState('');
    const onChange = e => setInputMessage(e.target.value);
    const onSendComment = e => {
        e.preventDefault()
        api('post', `${process.env.REACT_APP_API_URL}/comment/${productId}`, {message: inputMessage})
        setInputMessage('')
    }

    return(
        <>
            <div className={s.container_question_answers}>
                <div className={s.container_question}>
                    <h3>Comentarios</h3>
                    <form onSubmit={onSendComment} className={s.container_form}>
                        <div className={s.container_ask}>
                            <p>Pregunta sobre el producto!</p>
                        </div>
                        <div className={s.container_textarea_button}>
                            <input onChange={onChange} value={inputMessage} placeholder="Pregunta sobre el producto!" required maxLength="250" minLength="1" />
                            <button type="submit"><SendIcon/></button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={s.container_question_answers}>
                {comments.map(comment => <Comment key={comment.id} comment={comment} user={user} api={api}/>)}
            </div>
        </>
    );
}
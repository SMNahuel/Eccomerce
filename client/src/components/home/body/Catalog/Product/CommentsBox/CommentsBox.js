import React, { useState ,useEffect } from 'react';
import { useSelector } from 'react-redux';
import s from './CommentsBox.module.css';
import axios from '../../../../../../utils/axios';
import SendIcon from '@material-ui/icons/Send';
import Comment from './Comment/Comment';

export default function CommentsBox({productId}){
    const user = useSelector(state => state.user)
    const [comments, setComments] = useState([])
    const HTTP = (method, url, body) => {
        axios[method](url, body)
        .then(({data}) => setComments(data))
        .catch(err => {
            if (err.response) {
                alert(`Error! \n Status: ${err.response.status}\n${err.response.data}`);
            } else {
                alert(`Error! ${err}`);
            }
        })
    }
    useEffect(() => {
        HTTP('get', `${process.env.REACT_APP_API_URL}/comment/${productId}`)
    }, [productId])

    const [inputMessage, setInputMessage] = useState('');
    const onChange = e => setInputMessage(e.target.value);
    const onSendComment = e => {
        e.preventDefault()
        HTTP('post', `${process.env.REACT_APP_API_URL}/comment/${productId}`, {message: inputMessage})
        setInputMessage('')
    }

    return(
        <>
            <div className={s.container_question_answers}>
                <div className={s.container_question}>
                    <h3>Questions and answers</h3>
                    <form onSubmit={onSendComment} className={s.container_form}>
                        <div className={s.container_ask}>
                            <p>Ask the seller</p>
                        </div>
                        <div className={s.container_textarea_button}>
                            <input onChange={onChange} value={inputMessage} placeholder="I wrote your question ..." required maxLength="250" minLength="1" />
                            <button type="submit"><SendIcon/></button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={s.container_question_answers}>
                {comments.map(comment => <Comment key={comment.id} comment={comment} user={user} HTTP={HTTP}/>)}
            </div>
        </>
    );
}
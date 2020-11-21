import React, { useRef } from 'react';
import s from './FormRespond.module.css'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useDispatch } from 'react-redux';
import api from '../../../../../../../../redux/action-creators'

export default function FormRespond(){
    const { FORMRESPOND } = api
    const dispatch = useDispatch();
    const toggle = e =>{
        dispatch({
            type: FORMRESPOND,
            payload: false
        })
    }
    const ref = useRef(null)
    const onUnmount = () => {
        ref.current.style.animation = s.containerUnmount + ' 450ms linear'
        setTimeout(toggle, 400);
    };

    return(
        // Me tengo q traer el comentario del usuario en concentro.
        <div className={s.container_absolute_main} ref={ref}>
            <div className={s.container_main}>
                <div className={s.container_buttom}>
                    <button onClick={onUnmount}><HighlightOffIcon fontSize="large"/></button>
                </div>
                <div className={s.container_title}>
                    <p>Answer to: * USUARIO *</p>
                </div>
                <div className={s.container_label_textarea}>
                    <label>Description</label>
                    <textarea
                    maxLength="200"
                    minLength="1"></textarea>
                </div>
                <div className={s.container_label_textarea}>
                    <label>Your answer</label>
                    <textarea 
                    placeholder="Your answer" 
                    maxLength="200" 
                    minLength="1"></textarea>
                </div>
                <div className={s.container_button_sendRespond}>
                    <button>Send Respond</button>
                </div>
            </div>
        </div>
    )
}
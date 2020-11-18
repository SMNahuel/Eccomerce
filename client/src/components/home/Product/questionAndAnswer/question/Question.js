import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Question.module.css'
import api from '../../../../../redux/action-creators'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

export default function Question(){
    const question = ["Lorem impum dolor", "Lorem impum dolor", "Lorem impum dolor", "Lorem impum dolor", "Lorem impum dolor","Lorem impum dolor" ,"Lorem impum dolor", "Lorem impum dolor", "Lorem impum dolor", "Lorem impum dolor"]
    const answers = ["This is a answers"]
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { FORMRESPOND } = api

    useEffect(() => {
        dispatch(api.getMe())
    }, [dispatch])
    const toggle = e =>{
        e.preventDefault()
        dispatch({
            type: FORMRESPOND,
            payload: true
        })
    }
    return (
        // Hacer un map de todas las preguntas q vienen del servidor. 
        <>
            { question && question.map(r =>
                <div className={s.container_p}>
                    <p className={s.p_question}>{r}</p>
                    {answers && answers.map(a => (
                        <div className={s.container_answer}>
                            <KeyboardReturnIcon fontSize="small" className={s.KeyboardReturnIcon} />
                            <p className={s.p_answers}>{a}</p>
                        </div>))}

                    {
                        user.rol === "owner" &&
                        <button onClick={toggle} className={s.button_respond}>Respond</button>
                    }
                </div>
            )}

        </>
    )
}

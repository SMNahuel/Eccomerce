import React from 'react';
import s from './QuestionsAndAnswers.module.css'

export default function QuestionsAndAnswers() {

    const onKeyEnter = e => {
        if(e.keyCode === 13){
            alert("hola")
        }
        alert("asdasd")
    }    

    return (
        <div className={s.container_question}>
            <h3>Questions and answers</h3>
            <form onSubmit={onKeyEnter} className={s.container_form}>
                <div className={s.container_ask}>
                    <p>Ask the seller</p>
                </div>
                <div className={s.container_textarea_button}>
                    <input
                        placeholder="I wrote your question"
                        required
                        pattern="[a-zA-Z0-9 ]{1,200}"
                        maxLength="200"
                        minLength="1"
                    />

                    <button type="submit">Ask</button>
                </div>
            </form>
        </div>
    )
}
import React from 'react';
import s from './Card.module.css';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Avatar } from '@material-ui/core';

export default function Card({user}){
    return (
        <div className={s.container}>
            <Avatar src={user.image ? user.image : ""}/>
            <div className={s.data}>
                <p>{user.name}</p>
                <p className={s.email}>{user.email}</p>
                <div className={s.links}>
                    <a href={user.linkedin} target="_BLANK" rel="noopener noreferrer">
                        <LinkedInIcon className={s.icon} />
                        <p>Linkedin</p>
                    </a>
                    <a href={user.git} target="_BLANK" rel="noopener noreferrer">
                        <GitHubIcon className={s.icon} />
                        <p>Git Hub</p>
                    </a>
                </div>
            </div>
        </div>
    )
}
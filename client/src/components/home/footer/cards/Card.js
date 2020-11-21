import React from 'react';
import s from './Card.module.css';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Avatar } from '@material-ui/core';

export default function Card({ image, name, email, gitHref, linkedinHref }){
    return (
        <div className={s.container_flex}>
            <div className={s.container_avatar_name}>
                <div>
                    <Avatar src={image ? image : ""}/>
                </div>
                <div className={s.container_name}>
                    <p>{name}</p>
                    <p>{email}</p>
                </div>
            </div>
            <div className={s.container_datos}>
                <a href={gitHref} target="_BLANK">
                    <div className={s.container_icons}>
                        <GitHubIcon className={s.icon} />
                        <p>Git Hub</p>
                    </div>
                </a>
                <a href={linkedinHref} target="_BLANK">
                    <div className={s.container_icons}>
                        <LinkedInIcon className={s.icon} />
                        <p>Linkedin</p>
                    </div>
                </a>
            </div>
        </div>
    )
}
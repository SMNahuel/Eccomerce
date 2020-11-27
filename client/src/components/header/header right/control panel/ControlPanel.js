import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './ControlPanel.module.css'
import api from '../../../../redux/action-creators'
import { Avatar } from '@material-ui/core';
import SideBarProfile from './sidebarprofile/SideBarProfile';

export default function ControlPanel({ toggle }){
    const user = useSelector(state => state.user)
    const image = user.image && `${process.env.REACT_APP_API_URL}${user.image}`
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(api.getMe())
    }, [dispatch]);
    // {({image})?(<Avatar src={image}/>):(<Avatar src="http://cdn.iconscout.com/icon/free/png-512/react-1-282599.png" />)}

    const ref = useRef(null)
    const onUnmount = () => {
        ref.current.style.animation = s.containerUnmount + ' 450ms linear'
        setTimeout(toggle, 400);
    };

    return (
        <div className={s.container_main} ref={ref}>
            <div className={s.container_user}>
                <div>
                    <Avatar src={image ? image : ""}/>
                </div>
                <div className={s.container_h3_span}>
                    <h3>{user.name}</h3>
                    <span>{user.email}</span>
                </div>
            </div>
            <div className={s.container_empty}></div>
            <SideBarProfile toggle={onUnmount}/>
        </div>
    )
}
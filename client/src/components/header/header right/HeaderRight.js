import React, { useEffect, useState } from 'react';
import s from './HeaderRight.module.css';
import { Avatar } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../redux/action-creators'
import ControlPanel from './control panel/ControlPanel';
import Cart from './Cart/Cart'
import { Redirect } from 'react-router-dom';

export default function HeaderRight(){
    const user = useSelector(state => state.user)
    const image = user.image && `${process.env.REACT_APP_API_URL}${user.image}`
    const [ controlPanelOn, setControlPanelOn ] = useState(false);
    const [ userProfile, setUserProfile ] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {dispatch(api.getMe())}, [dispatch]);
    const toggle = () => setControlPanelOn(!controlPanelOn)
    const redirect = () => setUserProfile(!userProfile)
    return (
        <>
        {userProfile && <Redirect to="/userprofile"/>}
        <div className={s.container_main} >
            <div className={s.container_flex} >
                <div className={s.container_avatar_name_button} onClick={redirect}>
                    <div className={s.Avatar}>
                        <Avatar src={image ? image : ""}/>
                    </div>
                    <h3 className={s.h3_name}>{user.name}</h3>
                </div>
                <Cart/>
                <div className={s.container_arrow} onClick={toggle}>
                    <ArrowDropDownIcon />
                </div>
            </div>
            {controlPanelOn &&
                <div className={s.container_absolute} >
                    <ControlPanel toggle={toggle}/>
                </div>
            }
        </div>
        </>
    )
}
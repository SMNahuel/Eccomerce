import React, { useEffect, useRef, useState } from 'react';
import s from './HeaderRight.module.css';
import { Avatar } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../redux/action-creators'
import ControlPanel from './control panel/ControlPanel';
import Cart from './Cart/Cart'

export default function HeaderRight(){

    const user = useSelector(state => state.user)
    const [ controlPanelOn, setControlPanelOn ] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(api.getMe())
    }, [dispatch]);
    
    const toggle = () =>{
        setControlPanelOn(!controlPanelOn)
    }
    // const ref = useRef(null)
    // const onUnmount = () => {
    //     ref.current.style.animation = s.containerUnmount + ' 450ms linear'
    //     setTimeout(toggle, 400);
    // };
     // const image = user.image && `${process.env.REACT_APP_API_URL}${user.image}`
    // {({image})?(<Avatar src={image}/>):(<Avatar src="http://cdn.iconscout.com/icon/free/png-512/react-1-282599.png" />)}

    return (
        <div className={s.container_main}>
            <div className={s.container_flex}>
                <Avatar src="" className={s.Avatar}/>
                <h3 className={s.h3_name}>{user.name}</h3>
                <div className={s.container_cart}>
                    <Cart/>
                </div>
                <div className={s.container_arrow} onClick={toggle}>
                    <ArrowDropDownIcon />
                </div>
            </div>
            {

                controlPanelOn &&
                <div className={s.container_absolute}>
                    <ControlPanel toggle={toggle}/>
                </div>
            }
        </div>
    )
}
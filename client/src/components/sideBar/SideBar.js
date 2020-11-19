import React, { useState } from 'react';
import s from './sideBar.module.css'
import DehazeIcon from '@material-ui/icons/Dehaze';
import SideBarProfile from './sidebarprofile/SideBarProfile';


export default function SideBar() {
    const [active, setActive] = useState(false);
    const toogleState = () => setActive(!active);
    return (
        <div className={s.container}>
            <div className={s.icon} onClick={toogleState}>
                <DehazeIcon/>
            </div>
            <div className={s.sideBar} style={active ? {left: '0'} : {left: '-450px'}}>
                <SideBarProfile toogleState={toogleState} />
            </div>
        </div>
    )
}
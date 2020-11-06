import React, { useState } from 'react';
import s from './sideBar.module.css'
import DehazeIcon from '@material-ui/icons/Dehaze';
import SideBarProfile from './sidebarprofile/SideBarProfile';


export default function SideBar() {
    const [menu, setMenu] = useState(false)
    const toogleState = function () {
        setMenu(!menu)
    }
    return (
        <>
            <div className={s.container.dehaseIcon}>
                <div className={s.icon} onClick={toogleState}>
                    <DehazeIcon className={s.icon_DehazeIcon}/>
                </div>
            </div>

            <div className={`${s.container_sideBarProfile} ${menu ? s.prueba : null}`}>
                <SideBarProfile toogleState={toogleState} />
            </div>
        </>
    )
}
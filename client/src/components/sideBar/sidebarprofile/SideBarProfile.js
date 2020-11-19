import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './SideBarProfile.module.css';
import api from '../../../redux/action-creators'
import { Avatar } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CategoryIcon from '@material-ui/icons/Category';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ComponentLink from './componentLink/ComponentLink';

function SideBarProfile({ toogleState }) {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(api.getMe())
    }, [dispatch]);

    const onLogOut = () => {
        dispatch(api.logout())
    }
    
    return (
        <div className={s.container}>
            <div className={s.x}>
                <button onClick={toogleState}>X</button>
            </div>
            <div className={s.profile}>
                <Avatar src="http://cdn.iconscout.com/icon/free/png-512/react-1-282599.png" />
                <div className={s.user}>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                </div>
            </div>
            <div className={s.container_empty}></div>
            <div className={s.container_flex}>
                <div className={s.container_links}>
                    <ComponentLink
                        to={"/"}
                        funcion={toogleState}
                        SetIcon={<HomeIcon />}
                        p={"Home"} />
                    {(user.name) && (
                        <>
                            <ComponentLink
                                to={"/userprofile"}
                                funcion={toogleState}
                                SetIcon={<PersonIcon />}
                                p={"User Profile"}
                            />
                            <ComponentLink
                                to={"/orders"}
                                funcion={toogleState}
                                SetIcon={<AssignmentTurnedInIcon />}
                                p={"Orders"}
                            />
                        </>
                    )}
                </div>
                <div className={s.container_empty}></div>
                {(user.rolId > 3) && (
                    <>
                        <h4 className={s.title_h4}>Admin</h4>
                        <ComponentLink
                            to={"/admin/categories"}
                            funcion={toogleState}
                            SetIcon={<CategoryIcon />}
                            p={"Create | Modifiy categories"}
                        />
                        <ComponentLink
                            to={"/admin/products"}
                            funcion={toogleState}
                            SetIcon={<ListAltIcon />}
                            p={"Create | Modifiy products"}
                        />
                        <ComponentLink
                            to={"/admin/orders"}
                            funcion={toogleState}
                            SetIcon={<AssignmentIcon />}
                            p={"Manage orders"}
                        />
                        <ComponentLink
                            to={"/admin/users"}
                            funcion={toogleState}
                            SetIcon={<PersonAddIcon />}
                            p={"Manage Users"}
                        />
                    </>
                )}
                {(user.name) ? (
                    <ComponentLink
                        to={"/login"}
                        funcion={onLogOut}
                        SetIcon={<ExitToAppIcon />}
                        p={"Log Out"}
                    />
                ) : (
                        <ComponentLink
                            to={"/login"}
                            funcion={toogleState}
                            SetIcon={<VpnKeyIcon />}
                            p={"Log In"}
                        />
                    )}
            </div>
        </div>
    )
}
export default SideBarProfile;
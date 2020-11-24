import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './SideBarProfile.module.css';
import api from '../../../../../redux/action-creators'
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CategoryIcon from '@material-ui/icons/Category';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ComponentLink from '../componentLink/ComponentLink';

function SideBarProfile({ toggle }) {

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
            <div className={s.container_flex}>
                <div className={s.container_links}>
                    <ComponentLink
                        to={"/"}
                        funcion={toggle}
                        SetIcon={<HomeIcon />}
                        p={"Home"} />
                    {(user.name) && (
                        <>
                            <ComponentLink
                                to={"/userprofile"}
                                funcion={toggle}
                                SetIcon={<PersonIcon />}
                                p={"User Profile"}
                            />
                            <ComponentLink
                                to={"/orders"}
                                funcion={toggle}
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
                            funcion={toggle}
                            SetIcon={<CategoryIcon />}
                            p={"Create | Modifiy categories"}
                        />
                        <ComponentLink
                            to={"/admin/products"}
                            funcion={toggle}
                            SetIcon={<ListAltIcon />}
                            p={"Create | Modifiy products"}
                        />
                        <ComponentLink
                            to={"/admin/orders"}
                            funcion={toggle}
                            SetIcon={<AssignmentIcon />}
                            p={"Manage orders"}
                        />
                        <ComponentLink
                            to={"/admin/users"}
                            funcion={toggle}
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
                            funcion={toggle}
                            SetIcon={<VpnKeyIcon />}
                            p={"Log In"}
                        />
                    )}
            </div>
        </div>
    )
}
export default SideBarProfile;
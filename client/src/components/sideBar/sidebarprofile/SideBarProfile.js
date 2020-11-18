import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import s from './SideBarProfile.module.css';
import api from '../../../redux/action-creators'
import { Avatar } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import HomeIcon from '@material-ui/icons/Home';
/* import PersonIcon from '@material-ui/icons/Person'; */
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListAltIcon from '@material-ui/icons/ListAlt';
/* import ViewListIcon from '@material-ui/icons/ViewList'; */
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AddIcon from '@material-ui/icons/Add';

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
                        <Link to="/" className={s.link}>
                            <button onClick={toogleState} className={s.button}>
                                <div className={s.container_icons_title}>
                                    <div className={s.container_icons}>
                                        <HomeIcon className={s.icon} />
                                        <p>Home</p>
                                    </div>
                                    <div>
                                        <ArrowRightIcon />
                                    </div>
                                </div>
                            </button>
                        </Link>
                        <Link to="/userprofile" className={s.link}>
                            <button onClick={toogleState} className={s.button}>
                                <div className={s.container_icons_title}>
                                    <div className={s.container_icons}>
                                        <HomeIcon className={s.icon} />
                                        <p>Perfil Usuario</p>
                                    </div>
                                    <div>
                                        <ArrowRightIcon />
                                    </div>
                                </div>
                            </button>
                        </Link>
                        <Link to="/orders" className={s.link}>
                            <button onClick={toogleState} className={s.button}>
                                <div className={s.container_icons_title}>
                                    <div className={s.container_icons}>
                                        <ShoppingCartIcon className={s.icon} />
                                        <p>Ordenes </p>
                                    </div>
                                    <div>
                                        <ArrowRightIcon />
                                    </div>
                                </div>
                            </button>
                        </Link>
                    </div>
                    <div className={s.container_empty}></div>
                    {(user.rol === 'admin') && (
                        <>
                            <h4 className={s.title_h4}>Admin</h4>
                            <Link to="/admin/categories" className={s.link}>
                                <button onClick={toogleState} className={s.button}>
                                    <div className={s.container_icons_title}>
                                        <div className={s.container_icons}>
                                            <AddIcon className={s.icon} />
                                            <p>Administrar Categorias</p>
                                        </div>
                                        <div>
                                            <ArrowRightIcon />
                                        </div>
                                    </div>
                                </button>
                            </Link>
                            <Link to="/admin/products" className={s.link}>
                                <button onClick={toogleState} className={s.button}>
                                    <div className={s.container_icons_title}>
                                        <div className={s.container_icons}>
                                            <ListAltIcon className={s.icon} />
                                            <p>Administrar Productos</p>
                                        </div>
                                        <div>
                                            <ArrowRightIcon />
                                        </div>
                                    </div>
                                </button>
                            </Link>
                            <Link to="/admin/orders" className={s.link}>
                                <button onClick={toogleState} className={s.button}>
                                    <div className={s.container_icons_title}>
                                        <div className={s.container_icons}>
                                            <AddIcon className={s.icon} />
                                            <p>Administrar Ordenes</p>
                                        </div>
                                        <div>
                                            <ArrowRightIcon />
                                        </div>
                                    </div>
                                </button>
                            </Link>
                        </>
                    )}
                    {(user.name) ? (
                        <Link to="/login" className={s.link}>
                            <button onClick={onLogOut} className={s.button}>
                                <div className={s.container_icons_title}>
                                    <div className={s.container_icons}>
                                        <MeetingRoomIcon className={s.icon} />
                                        <p>Log Out</p>
                                    </div>
                                    <div>
                                        <ArrowRightIcon />
                                    </div>
                                </div>
                            </button>
                        </Link>
                    ) : (
                        <Link to="/login" className={s.link}>
                            <button onClick={toogleState} className={s.button}>
                                <div className={s.container_icons_title}>
                                    <div className={s.container_icons}>
                                        <MeetingRoomIcon className={s.icon} />
                                        <p>Log In</p>
                                    </div>
                                    <div>
                                        <ArrowRightIcon />
                                    </div>
                                </div>
                            </button>
                        </Link>
                    )}
            </div>
        </div>    
    )}
export default SideBarProfile;
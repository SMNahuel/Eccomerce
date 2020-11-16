import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import s from './SideBarProfile.module.css';
import {Avatar} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import HomeIcon from '@material-ui/icons/Home';
/* import PersonIcon from '@material-ui/icons/Person'; */
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListAltIcon from '@material-ui/icons/ListAlt';
/* import ViewListIcon from '@material-ui/icons/ViewList'; */
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AddIcon from '@material-ui/icons/Add';

function SideBarProfile({ toogleState }){

    const user = useSelector(state => state.user)

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
                    {/* <Link to="/profile" className={s.link}>
                        <button onClick={toogleState} className={s.button}>
                            <div className={s.container_icons_title}>
                                <div className={s.container_icons}>
                                    <PersonIcon className={s.icon} />
                                    <p>Profile</p>
                                </div>
                                <div>
                                    <ArrowRightIcon />
                                </div>
                            </div>
                        </button>
                    </Link> */}
                    <Link to="/orders" className={s.link}>
                        <button onClick={toogleState} className={s.button}>
                            <div className={s.container_icons_title}>
                                <div className={s.container_icons}>
                                    <ShoppingCartIcon className={s.icon} />
                                    <p>Cart</p>
                                </div>
                                <div>
                                    <ArrowRightIcon />
                                </div>
                            </div>
                        </button>
                    </Link>
                    {/* <Link to="/product" className={s.link}>
                        <button onClick={toogleState} className={s.button}>
                            <div className={s.container_icons_title}>
                                <div className={s.container_icons}>
                                    <ListAltIcon className={s.icon} />
                                    <p>Product</p>
                                </div>
                                <div>
                                    <ArrowRightIcon />
                                </div>
                            </div>
                        </button>
                    </Link> */}
                    {/* <Link to="/catalog" className={s.link}>
                        <button onClick={toogleState} className={s.button}>
                            <div className={s.container_icons_title}>
                                <div className={s.container_icons}>
                                    <ViewListIcon className={s.icon} />
                                    <p>Catalog</p>
                                </div>
                                <div>
                                    <ArrowRightIcon />
                                </div>
                            </div>
                        </button>
                    </Link> */}
                </div>
                <div className={s.container_empty}></div>
                <div>
                    {/* Esta parte dependera del estado del usuario, si esta logeado, no logeado o si es un admin */}
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
                    
                </div>
            </div>

            
        </div>
    )
}
export default SideBarProfile;
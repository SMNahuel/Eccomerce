import React from 'react';
import { Link } from 'react-router-dom';
import s from './SideBarProfile.module.css';
import {Avatar} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ViewListIcon from '@material-ui/icons/ViewList';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AddIcon from '@material-ui/icons/Add';

function SideBarProfile({ toogleState }){
    return (
        <div className={s.container_menu}>
            <div className={s.container_button}>
                <button onClick={toogleState}>X</button>
            </div>
            <div className={s.container_profile}>
                <Avatar src="https://cdn.iconscout.com/icon/free/png-512/react-1-282599.png" />
                <div className={s.container_user}>
                    <h3>Nombre usuario</h3>
                    <p>emailDeEjemplo@gmail.com</p>
                </div>
            </div>
            <div className={s.container_empty}></div>
            <div className={s.container_flex}>
                <div className={s.container_links}>
                    <Link to="/" className={s.link}>
                        <div className={s.container_icons_title}>
                            <div className={s.container_icons}>
                                <HomeIcon className={s.icon} />
                                <p>Home</p>
                            </div>
                            <div>
                                <ArrowRightIcon />
                            </div>
                        </div>
                    </Link>
                    <Link to="/profile" className={s.link}>
                        <div className={s.container_icons_title}>
                            <div className={s.container_icons}>
                                <PersonIcon className={s.icon} />
                                <p>Profile</p>
                            </div>
                            <div>
                                <ArrowRightIcon />
                            </div>
                        </div>
                    </Link>
                    <Link to="/cart" className={s.link}>
                        <div className={s.container_icons_title}>
                            <div className={s.container_icons}>
                                <ShoppingCartIcon className={s.icon} />
                                <p>Cart</p>
                            </div>
                            <div>
                                <ArrowRightIcon />
                            </div>
                        </div>
                    </Link>
                    <Link to="/product" className={s.link}>
                        <div className={s.container_icons_title}>
                            <div className={s.container_icons}>
                                <ListAltIcon className={s.icon} />
                                <p>Product</p>
                            </div>
                            <div>
                                <ArrowRightIcon />
                            </div>
                        </div>
                    </Link>
                    <Link to="/catalog" className={s.link}>
                        <div className={s.container_icons_title}>
                            <div className={s.container_icons}>
                                <ViewListIcon className={s.icon} />
                                <p>Catalog</p>
                            </div>
                            <div>
                                <ArrowRightIcon />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className={s.container_empty}></div>
                <div>
                    {/* Esta parte dependera del estado del usuario, si esta logeado, no logeado o si es un admin */}
                    <h4 className={s.title_h4}>Admin</h4>
                    <Link to="/categories" className={s.link}>
                        <div className={s.container_icons_title}>
                            <div className={s.container_icons}>
                                <AddIcon className={s.icon}/>
                                <p>Create category</p>
                            </div>
                            <div>
                                <ArrowRightIcon />
                            </div>
                        </div>
                    </Link>
                    <Link to="/products" className={s.link}>
                        <div className={s.container_icons_title}>
                            <div className={s.container_icons}>
                                <AddIcon className={s.icon}/>
                                <p>Create | Modify product</p>
                            </div>
                            <div>
                                <ArrowRightIcon />
                            </div>
                        </div>
                    </Link>
                    <Link to="/login" className={s.link}>
                        <div className={s.container_icons_title}>
                            <div className={s.container_icons}>
                                <MeetingRoomIcon className={s.icon} />
                                <p>Log Out</p>
                            </div>
                            <div>
                                <ArrowRightIcon />
                            </div>
                        </div>
                    </Link>
                    
                </div>
            </div>

            
        </div>
    )
}
export default SideBarProfile;
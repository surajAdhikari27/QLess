import React from 'react';
import {useNavigate, NavLink} from 'react-router-dom';
import styles from './Navbar.module.css'
import {useSelector, useDispatch} from 'react-redux';
import {logout} from "../../../store/AuthSlice";
import AppwriteAuthService from '../../../AppwriteServices/AppwriteAuth'
import QlessLogo from "../../assets/QlessLogo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff,faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons'


function Navbar(){
    const {userData}= useSelector((state)=>state.auth);
    const dispatch= useDispatch();
    const navigate= useNavigate();

    const handleLogout=async()=>{
        if(window.confirm("Do you really want to logout?")){
            await AppwriteAuthService.logout();
            dispatch(logout())
            navigate("/login");
        }
    }

    return(
        <>
        <nav>
            <div className={`${styles.navbarContainer}`}>
                <div className={styles.logo}>
                    <img src={QlessLogo} alt="QLessLogo"/>
                </div>

                <div className={styles.navigations}>
                    <NavLink to="/" className={({isActive}) => isActive ? styles.activeLink : styles.link}>
                        Home
                    </NavLink>

                    <NavLink to="/token" className={({isActive}) => isActive ? styles.activeLink : styles.link}>
                        Token
                    </NavLink>

                    <NavLink to="/dashboard" className={({isActive}) => isActive ? styles.activeLink : styles.link}>
                        Dashboard
                    </NavLink>

                    <NavLink to="/admin" className={({isActive}) => isActive ? styles.activeLink : styles.link}>
                        Admin
                    </NavLink>

                    {userData ? (
                        <button className={styles.logoutBtn} onClick={handleLogout}>
                            <FontAwesomeIcon icon={faPowerOff}/>
                        </button>
                    ) : (
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? styles.activeLink : styles.link
                            }
                        >
                            <FontAwesomeIcon icon={faArrowRightToBracket} />
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar;
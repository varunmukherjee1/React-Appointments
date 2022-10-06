import React from 'react'
import { useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {useSelector , useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'

import classes from "./Layout.module.css"

function Layout(props) {

    const navigate = useNavigate();

    const [sidebarActive , setSidebarActive] = useState(false);

    const location = useLocation();
    const user = useSelector(state => state.user.user);

    const userMenu = [
        {
            name: "Home",
            path: "/",
            icon: "fa-solid fa-house"
        },
        {
            name: "Appointments",
            path: "/appointments",
            icon: "fa-solid fa-calendar-check"
        },
        {
            name: "Apply Doctor",
            path: "/apply-doctor",
            icon: "fa-solid fa-stethoscope"
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "fa-solid fa-user"
        }
    ]

    const adminMenu = [
        {
            name: "Home",
            path: "/",
            icon: "fa-solid fa-house"
        },
        {
            name: "Users",
            path: "/admin/users-list",
            icon: "fa-solid fa-users"
        },
        {
            name: "Doctors",
            path: "/admin/doctors-list",
            icon: "fa-solid fa-user-doctor"
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "fa-solid fa-user"
        }
    ]

    const renderMenu = user?.isAdmin? adminMenu: userMenu;

    return (
        <div className={classes.layout}>

            {/* Sidebar */}
            <div className={`${classes.sidebar} ${classes.card} ${sidebarActive? classes["sidebar-active"]: ""}`}>
                <div className = {classes["sidebar-header"]}>
                    {sidebarActive && <h1>R App</h1>}
                </div>

                <div className = {classes["sidebar-menus"]}>
                    {
                        renderMenu.map((item,idx) => {

                            const isActive = location.pathname === item.path;

                            return (
                                <div className = {`${classes["menu-item"]} ${isActive && classes['active-menu-item']}`}
                                key = {idx}>
                                    <Link to = {item.path}> <i className = {item.icon}></i> {sidebarActive && item.name}</Link>
                                </div>
                            )
                        })
                        
                    }
                    <div className = {`${classes["menu-item"]}`} >
                        <Link to = "/login" 
                            onClick={() => {
                                localStorage.clear();
                                navigate("/login")
                            }
                        }> 
                            <i className = "fa-solid fa-right-from-bracket"></i> {sidebarActive && "Logout"}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main */}
            <div className = {classes.main}>
                
                {/* Header */}
                <div className = {`${classes.header} ${classes.card}`}>
                    {sidebarActive? <i className={`fa-solid fa-xmark side ${classes["sidebar-switch"]}`} onClick = {() => setSidebarActive(false)}></i> : <i className={`fa-solid fa-bars-staggered side ${classes["sidebar-switch"]}`} onClick = {() => setSidebarActive(true)}></i>}
                    
                    <div className= {classes.info}>
                        <div 
                            className = {classes.notifications} 
                            style = {{cursor:"pointer"}}
                            onClick = {() => {
                                navigate("/notifications")
                            }}
                        >
                            {user?.unseenNotifications.length > 0 && <div className = {classes["notif-count"]}>{user?.unseenNotifications.length}</div>}
                            <i className="fa-solid fa-bell"></i>
                        </div>
                        <Link to = "/profile">{user?.name}</Link>
                    </div>
                </div>
                
                {/* Body */}
                <div className = {`${classes.body} ${classes.card}`}>
                    {props.children}
                </div>
            </div>
        </div>     
  )
}

export default Layout
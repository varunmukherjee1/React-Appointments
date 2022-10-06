import React,{useState } from 'react'
import { useSelector , useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Layout from '../../components/Layout/Layout'
import { loadingActions } from '../../store/loadingSlice';
import { userActions } from '../../store/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast'

import classes from "./Notificaton.module.css"

function Notifications() {

    const [visibleTab,setVisibleTab] = useState("Unseen");

    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const tabSwitchHandler = (e) => {
        setVisibleTab(`${e.target.innerText}`);
    }

    // Mark All Seen handler

    const markAllSeenHandler = async () => {

        try {
            
            dispatch(loadingActions.showLoading());

            const res = await axios.post("/api/user/mark-all-notifications-seen",{},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            dispatch(loadingActions.hideLoading());

            if(res.data.success){
                toast.success(res.data.message);
                dispatch(userActions.setUser(res.data.data))
            }
            else{
                toast.error(res.data.message)
            }

        } catch (error) {
            
            dispatch(loadingActions.hideLoading());
            toast.error("Something went wrong");
        }
    }

    const deleteSeenHandler = async () => {

        try {

            dispatch(loadingActions.showLoading())

            const res = await axios.post("/api/user/delete-all-notifications" , {},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            dispatch(loadingActions.hideLoading())

            if(res.data.success){
                toast.success(res.data.message);
                dispatch(userActions.setUser(res.data.data))
            }
            else{
                toast.error(res.data.message)
            }
            
        } catch (error) {
            
            dispatch(loadingActions.hideLoading());
            toast.error("Something went wrong")
        }
    }

    return (
    <Layout>
        <p className = {classes.mainHeading}>Notifications</p>

        <div className = {classes.tabs}>
            <div className= {classes.header}>
                <ul>
                    <li onClick = {tabSwitchHandler} className = {(visibleTab === "Unseen")? `${classes.active}`: ""}>Unseen</li>
                    <li onClick = {tabSwitchHandler} className = {(visibleTab === "Seen")? `${classes.active}`: ""}>Seen</li>
                    <div className= {classes.marker}></div>
                </ul>
            </div>

            <div className= {classes.body}>
                {(visibleTab === "Unseen")? 

                    // Unseen
                    <div className= {classes.tabs}>
                        <div className = {classes["notif-action"]}>
                            <p onClick = {() => {markAllSeenHandler()}}>Mark all seen</p>
                        </div>

                        {
                            user?.unseenNotifications.map((notif,id) => {
                                return (
                                    <div key = {id} className = {classes["notif-message"]} 
                                        onClick = {() => {
                                            navigate(`${notif.onClickPath}`)
                                        }}
                                    >
                                        {notif.message}
                                    </div>
                                )
                            })

                        }
                    </div>:
                    // Seen
                    <div className= {classes.tabs}>
                        <div className = {classes["notif-action"]}>
                            <p onClick = {() => {deleteSeenHandler()}}>Delete all notifications</p>
                        </div>

                        {
                            user?.seenNotifications.map((notif,id) => {
                                return (
                                    <div key = {id} className = {classes["notif-message"]} 
                                        onClick = {() => {
                                            navigate(`${notif.onClickPath}`)
                                        }}
                                    >
                                        {notif.message}
                                    </div>
                                )
                            })

                        }
                    </div>
                }
            </div>
        </div>
    </Layout>
    )
}

export default Notifications
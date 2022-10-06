import React, { useEffect } from 'react'
import {Navigate,useNavigate} from "react-router-dom"
import axios from 'axios'
import {useDispatch} from "react-redux"
import {userActions} from "../../store/userSlice"
import {loadingActions} from "../../store/loadingSlice"

function ProtectedRoute(props) {

    // const user = useSelector(state => state.user.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUser = async () => {

        try {

            dispatch(loadingActions.showLoading())

            const res = await axios.post("/api/user/get-user-info-by-id",{}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            dispatch(loadingActions.hideLoading())

            if(res.data.success){
                dispatch(userActions.setUser(res.data.data))
            }
            else{
                await localStorage.clear();
                navigate("/login");
            }
            
        } catch (error) {
            dispatch(loadingActions.hideLoading())
            console.log(error);
            await localStorage.clear();
            navigate("/login");
        }
    }

    useEffect(() => {
        getUser();
    },[]);

    if(localStorage.getItem("token")){
        return (
            props.children
        );
    }
    else {
        return (
            <Navigate to="/login"/>
        );
    }
  
}

export default ProtectedRoute
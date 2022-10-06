import React , {useRef} from 'react'
import {Link , useNavigate} from "react-router-dom";
import axios from 'axios';
import {useDispatch} from "react-redux";
import {loadingActions} from "../store/loadingSlice";

import classes from "./auth.module.css"
import toast from 'react-hot-toast';

function Login() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const emailRef = useRef();
  const passRef = useRef();

  const submitHandler = async (e) => {

    try {
      e.preventDefault();

      dispatch(loadingActions.showLoading());

      const email = emailRef.current.value
      const password = passRef.current.value

      const res = await axios.post("api/user/login",{email,password})

      dispatch(loadingActions.hideLoading());

      emailRef.current.value = "";
      passRef.current.value = "";

      if(res.data.success){
        toast.success(res.data.message);
        toast("Redirecting to homepage")
        localStorage.setItem("token",res.data.token);
        navigate("/");
      }
      else{
        toast.error(res.data.message);
      }

    } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
        dispatch(loadingActions.hideLoading());
    }
  }

  return (
    <div className={classes.section}>
        <div className= {classes.card}>
          <p className={classes["card-title"]}>Welcome Back</p>

          <form className={classes.form} onSubmit = {submitHandler}>
              <label htmlFor="email">Email</label>
              <input ref = {emailRef} type="email" name = "email" id = "email" placeholder='Email'/>
              <label htmlFor="password">Password</label>
              <input ref = {passRef} type="password" name = "password" id = "password" placeholder='Password'/>
              <button>Login</button>
          </form>

          <Link to = "/register">New Here? Register</Link>
        </div>
    </div>
  )
}

export default Login
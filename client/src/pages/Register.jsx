import React,{useRef} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import axios from "axios"
import { useDispatch } from 'react-redux'

import classes from "./auth.module.css"
import toast from 'react-hot-toast';
import { loadingActions } from '../store/loadingSlice'

function Register() {

  const dispatch = useDispatch();

  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const navigate = useNavigate();

  const submitHandler = async (e) => {

    try {
      
      e.preventDefault();

      dispatch(loadingActions.showLoading());

      const name = nameRef.current.value
      const email = emailRef.current.value
      const password = passRef.current.value

      const res = await axios.post("api/user/register",{name,email,password});

      dispatch(loadingActions.hideLoading());

      nameRef.current.value = "";
      emailRef.current.value = "";
      passRef.current.value = "";

      if(res.data.success){
        toast.success(res.data.message);
        toast("navigating to login page")
        navigate("/login");
      }
      else{
        toast.error(res.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong !");
      dispatch(loadingActions.hideLoading());
    }
    
  }

  return (
    <div className={classes.section}>
      <div className= {classes.card}>
          <p className={classes["card-title"]}>Nice To Meet U</p>

          <form className={classes.form} onSubmit = {submitHandler}>
              <label htmlFor="name">Name</label>
              <input ref = {nameRef} type="text" name = "name" id = "name" placeholder='Name' required/>
              <label htmlFor="email">Email</label>
              <input ref = {emailRef} type="email" name = "email" id = "email" placeholder='Email' required/>
              <label htmlFor="password">Password</label>
              <input ref = {passRef} type="password" name = "password" id = "password" placeholder='Password' required/>
              <button>Register</button>
          </form>

          <Link to = "/login">Already have an Account? Login</Link>
      </div>
    </div>
  )
}

export default Register
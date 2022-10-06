import React , {useRef} from 'react'
import Layout from '../../components/Layout/Layout';

import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { loadingActions } from '../../store/loadingSlice';
import { useNavigate } from 'react-router-dom';
import { toast} from "react-hot-toast";

import classes from "./applyDoctor.module.css"


function ApplyDoctor() {

    const nameRef = useRef();
    const phRef = useRef();
    const portfolioRef = useRef();
    const addressRef = useRef();
    const specRef = useRef();
    const expRef = useRef();
    const feeRef = useRef();
    const fromTimeRef = useRef();
    const toTimeRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async (e) => {

        try {            
            e.preventDefault();
        
            const name = nameRef.current.value;
            const phoneNumber = phRef.current.value;
            const portfolio = portfolioRef.current.value;
            const address = addressRef.current.value;
            const specialization = specRef.current.value;
            const experience = expRef.current.value;
            const feePerConsultation = feeRef.current.value;
            const fromTime = fromTimeRef.current.value;
            const toTime = toTimeRef.current.value;

            dispatch(loadingActions.showLoading())
            const res = await axios.post("/api/user/apply-doctor-account" , {
                name,
                phoneNumber,
                portfolio,
                address,
                specialization,
                experience,
                feePerConsultation,
                token: localStorage.getItem("token"),
                timings: [fromTime,toTime]
            })

            dispatch(loadingActions.hideLoading())

            nameRef.current.value = "";
            phRef.current.value = "";
            portfolioRef.current.value = "";
            addressRef.current.value = "";
            specRef.current.value = "";
            expRef.current.value = "";
            feeRef.current.value = "";
            fromTimeRef.current.value = "";
            toTimeRef.current.value = "";

            if(res.data.success){
                toast.success(res.data.message);
                navigate("/");
            }
            else{
                toast.error(res.data.message);
                toast.error("Something went wrong");
            }

        } catch (error) {
            dispatch(loadingActions.hideLoading());
            console.log(error);
        }

        
    }

    return (
    <Layout>
        
        <form className = {classes.form} onSubmit = {submitHandler}>
            <h1 className = {classes.sectionTitle}>Apply Doctor</h1>
            <hr />
            <h2 className = {classes.subHeading}>Personal Information</h2>

            <div className = {classes.flexSec}>
                <div className = {classes["input-field"]}>
                    <label htmlFor="name">Name</label>
                    <input ref={nameRef} type="text" name="name" id="name" />
                </div>
                <div className = {classes["input-field"]}>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input ref = {phRef} type="text" name="phoneNumber" id="phoneNumber" />
                </div>
                <div className = {classes["input-field"]}>
                    <label htmlFor="portfolio">Portfolio</label>
                    <input ref = {portfolioRef} type="text" name="portfolio" id="portfolio" />
                </div>
                <div className = {classes["input-field"]}>
                    <label htmlFor="address">Address</label>
                    <input ref = {addressRef} type="text" name="address" id="address" />
                </div>
            </div>

            <hr />

            <h2 className = {classes.subHeading}>Professional Information</h2>

            <div className = {classes.flexSec}>
                <div className = {classes["input-field"]}>
                    <label htmlFor="specialization">Specialization</label>
                    <input ref = {specRef} type="text" name="specialization" id="specialization" />
                </div>
                <div className = {classes["input-field"]}>
                    <label htmlFor="experience">Experience</label>
                    <input ref = {expRef} type="text" name="experience" id="experience" />
                </div>
                <div className = {classes["input-field"]}>
                    <label htmlFor="feePer">Fee Per Consultation</label>
                    <input ref = {feeRef} type="text" name="feePer" id="feePer" />
                </div>

                <div className = {classes["time-fields"]}>

                    <div className =  {classes.fieldHeading}>Timings</div>

                    <div className = {classes.getFlex}>
                        <div className = {classes["input-field"]}>
                            {/* <label htmlFor="feePer">From</label> */}
                            <input ref = {fromTimeRef} type="time" name="fromTime" id="fromTime" />
                        </div>

                        <i className ="fa-solid fa-arrows-left-right"></i>

                        <div className = {classes["input-field"]}>
                            {/* <label htmlFor="feePer">To</label> */}
                            <input ref = {toTimeRef} type="time" name="toTime" id="toTime" />
                        </div>
                    </div>
                    
                </div>
            </div>

            <button type="submit" className = {classes.submit}>Submit</button>

        </form>
    </Layout>
    )
}

export default ApplyDoctor;
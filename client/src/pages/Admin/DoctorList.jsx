import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import axios from "axios"

import Layout from '../../components/Layout/Layout'
import { loadingActions } from '../../store/loadingSlice';
import Table from '../../components/Table/Table';
import {doctorColumns} from "../../components/TableColumns"

function DoctorList() {
  const [doctors , setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getDoctors = async () => {
    try {

      dispatch(loadingActions.showLoading())

      const res = await axios.get("/api/admin/get-all-doctors",{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      dispatch(loadingActions.hideLoading())

      // console.log(typeof res.data.data)
      // console.log([...res.data.data])
      // console.log(res.data.data)

      setDoctors(res.data.data);
      
    } catch (error) {
      dispatch(loadingActions.hideLoading())
    }
  }

  useEffect(() => {
    getDoctors();
  },[])

  return (
    <Layout>
        <h1>Doctors List</h1>
        <Table data = {doctors} columns = {doctorColumns}/>
    </Layout>
  )
}

export default DoctorList
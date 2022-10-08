import React , {useEffect,useState} from 'react'
import { useDispatch } from 'react-redux';
import axios from "axios"

import {loadingActions} from "../../store/loadingSlice"
import Table from '../../components/Table/Table';
import { userColumns } from '../../components/TableColumns';

import Layout from '../../components/Layout/Layout'

function UserList() {

  const [users , setUsers] = useState([]);
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {

      dispatch(loadingActions.showLoading())

      const res = await axios.get("/api/admin/get-all-users",{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      dispatch(loadingActions.hideLoading())

      // console.log(typeof res.data.data)
      // console.log([...res.data.data])
      // console.log(res.data.data)

      setUsers(res.data.data);
      
    } catch (error) {
      dispatch(loadingActions.hideLoading())
    }
  }

  useEffect(() => {
    getUsers();
  },[])

  return (
    <Layout>
        <h1>Users List</h1>
        <Table data = {users} columns = {userColumns}/>
    </Layout>
  )
}

export default UserList
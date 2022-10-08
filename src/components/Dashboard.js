import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import env from '../enviroinment'
import Button from 'react-bootstrap/Button';


function Dashboard() {
  let [data,setData] = useState([])
  let navigate = useNavigate()

  let loadData = async()=>{
    let token = sessionStorage.getItem('token')
    if(token)
    {
      let res = await axios.get(`${env.apiurl}/users`,{
        headers:{"Authorization":`Bearer ${token}`}
      })
      if(res.data.statusCode===200)
      {
        setData(res.data.data)
      }
      else
      {
        alert(res.data.message)
        navigate('/login')
      }
    }
    else
    {
      navigate('/login')
    }
  }
  
  useEffect(()=>{
    loadData()
  },[])
  return<>
    <div className="login-wrapper">
      <h1>Welcome to Dashboard</h1>
      <p>All your contents here</p>
    </div>
    <div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((e,i)=>{
            return <tr key={i}>
              <td>{i+1}</td>
              <td>{e.firstName}</td>
              <td>{e.lastName}</td>
              <td>{e.email}</td>
              <td>{e.role}</td>
              <td>{e.createdAt}</td>
            </tr>
          })
        }
      </tbody>
    </Table>
    <Button variant="primary" onClick={()=>loadData()}>Refresh</Button>
    </div>
  </>
}

export default Dashboard
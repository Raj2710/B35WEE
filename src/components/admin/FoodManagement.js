import React,{useState,useEffect}from 'react'
import AdminNav from './AdminNav'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Table from 'react-bootstrap/Table';
import axios from 'axios'
import env from '../../enviroinment'
import {useNavigate} from 'react-router-dom'

function FoodManagement() {let [name,setName] = useState("")
let [price,setPrice] = useState("")
let [description,setDescription] = useState("")
let [imageUrl,setImageUrl] = useState("")
let navigate = useNavigate()

let [data,setData] = useState([])


let handleDelete = async (id)=>{
  let token = sessionStorage.getItem('token')
  let res = await axios.delete(`${env.apiurl}/delete-food/${id}`,
  {
    headers:{"Authorization":`Bearer ${token}`}
  }
  )
  if(res.data.statusCode===200)
  {
    loadData()
  }
}

let loadData = async()=>{
  let token = sessionStorage.getItem('token')
  let res = await axios.get(`${env.apiurl}/all-food`,
  {
    headers:{"Authorization":`Bearer ${token}`}
  })
  if(res.data.statusCode===200)
  {
    setData(res.data.food)
  }
}

let handleSubmit = async ()=>{
  let token = sessionStorage.getItem('token')
  let res = await axios.post(`${env.apiurl}/add-food`,
  {
    name,
    price,
    description,
    imageUrl
  },
  {
    headers:{"Authorization":`Bearer ${token}`}
  })

  if(res.data.statusCode===200)
  {
    setName("")
    setPrice("")
    setDescription("")
    setImageUrl("")
    loadData()
  }
  else if(res.data.statusCode===401)
  {
    sessionStorage.clear()
    navigate('/login')
  }
}

useEffect(()=>{
  loadData()
},[])
return  <>
<AdminNav/>
<div> 
    <div className='add-food-wrapper col-4'>
      <h3 >Add your Food here!</h3>
    <Form>
    <Form.Group className="mb-3" >
      <Form.Control type="text" value={name} placeholder="Food Name" onChange={(e)=>{setName(e.target.value)}}/>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Control type="text" value={price} placeholder="Price" onChange={(e)=>{setPrice(Number(e.target.value))}}/>
    </Form.Group>
    
    <Form.Group className="mb-3">
      <Form.Control type="text" value={description} placeholder="Description" onChange={(e)=>{setDescription(e.target.value)}}/>
    </Form.Group>
    
    <Form.Group className="mb-3">
      <Form.Control type="text" value={imageUrl} placeholder="Image Url" onChange={(e)=>{setImageUrl(e.target.value)}}/>
    </Form.Group>

    <Button variant="primary" onClick={()=>handleSubmit()}>
      Submit
    </Button>
  </Form>

    </div>
    <div className='list-food-wrapper'>
        <h2>All your Added Foods are here!</h2>
        {
          data.map((e,i)=>{
            return <div className='card-wrapper' key={i}>
              <div>{e.name}</div>
              <div>{e.price}</div>
              <div>{e.description}</div>
              <div><img src={e.image} alt=""></img></div>
              <div><Button onClick={()=>handleDelete(e._id)} variant='danger'>Delete</Button></div>
            </div>
          })
        }
    </div>
</div>
</>
}

export default FoodManagement
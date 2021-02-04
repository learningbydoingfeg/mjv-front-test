import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const AdminHome = () => {

  const userId = localStorage.getItem('user');
  const history = useHistory();

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')


  const getUserValidation = async () => {

    let result = await axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: `/users/${userId}`
    })

    if (!result.data.admin) {
      history.push('/')
    }
  }


  const sendData = async (payload) => {
    await axios({
      method: 'POST',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/products',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: payload,
    })
    history.push('/')
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      "price": price,
      "description": description,
      "name": name,
      "image":"data:image/png;base64,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"
    }
    sendData(payload)
  }




  useEffect(() => {

    getUserValidation()
  }, [])
  return (
    <div className="admin-panel">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="formbox">
          <input onChange={(e) => setName(e.target.value)} placeholder="name" />
          <input onChange={(e) => setPrice(e.target.value)} placeholder="price" />
          <input onChange={(e) => setDescription(e.target.value)} placeholder="description" />
          <div className="full-center"><button>Crear producto</button></div>
        </form>
      </div>
    </div>
  )
}

export default AdminHome

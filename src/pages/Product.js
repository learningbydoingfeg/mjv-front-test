import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from "react-router-dom";

const Product = () => {

  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  let { id } = useParams();

  const getData = async () => {
    console.log(id)
    let result = await axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER_URL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      url: `/products/${id}`
    })
    console.log(result.data)
    setName(result.data.name)
    setDescription(result.data.description)
    setPrice(result.data.price)
    setImage(result.data.image)
  }


  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="ProductDetail">
      <Link to={'/'} ><div className="back-btn header-button">Volver</div></Link>
      <div className="Product-detail">
        <div><img src={image} alt="product" /></div>
        <span className="product-name">{name}</span>
        <span className="product-description">{description}</span>
        <span className="price">${price}</span>
      </div>
    </div>
  )
}

export default Product

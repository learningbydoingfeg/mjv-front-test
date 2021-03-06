import React from 'react'
import { Link } from 'react-router-dom'

const Product = (props) => {

  const { product } = props
  return (
    <div key={product._id} className="product">
      <div style={{width:'100%'}}><img src={product.image} className="product-image" alt="product-painting" /></div>
      <span className="product-name">{product.name}</span>
      <span className="price">${product.price}</span>
      <span>{product.description}</span>
      <Link to={`/product/${product._id}`}><button className="product-button">Ver más</button></Link>
    </div>
  )
}

export default Product

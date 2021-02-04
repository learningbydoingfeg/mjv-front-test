import React from 'react'
import { Link } from 'react-router-dom'

const Product = (props) => {

  const { product } = props
  return (
    <div key={product._id} className="product">
      <div><img src={product.image} alt="product-painting" /></div>
      <span>{product.name}</span>
      <span>${product.price}</span>
      <span>{product.description}</span>
      <Link to={`/product/${product._id}`}><button>Ver más</button></Link>
    </div>
  )
}

export default Product

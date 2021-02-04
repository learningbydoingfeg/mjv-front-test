import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import Product from '../components/Product'
import Loading from '../components/Loading'

const Home = () => {

  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false)


  useEffect(() => {
    getUserId();
    loadProducts();

    setLoading(false);

  }, [])

  const getUserId = async () => {
    let userId = await localStorage.getItem('user');
    loadUserData(userId);
  }

  const loadUserData = async (userId) => {

    let result = await axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: `/users/${userId}`,
    })

    if (result.data.admin) {
      setIsAdmin(true)
    }

    setUser(result.data)
  }

  const loadProducts = async () => {

    let result = await axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/products',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    setProducts(result.data)
  }

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.push('/signin')
  }


  return (loading ? <Loading /> :
    <>
      <div className="header">
        Current User: {user.email}
        <button onClick={handleLogOut}>Cerrar Sesión</button>
        {isAdmin && <Link to='/admin'><button>Crear productos</button></Link>}
      </div>
      <div className="content">
        <div className="products-container">
          {products.map((product) => {
            return (
              <Product key={product._id} product={product} />
            )
          })}
        </div>
      </div> 
    </>
  )
}

export default Home

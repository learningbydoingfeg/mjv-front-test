import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';


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
      { isAdmin && <Link to='/admin'><button>Crear productos</button></Link>}
    </div>
    <div className="content">
      <div className="products-container">
        {products.map((product) => {
          return (
            <div key={product.id} className="product">
              <div><img src={product.image} alt="product-image" /></div>
              <span>{product.name}</span>
              <span>${product.price}</span>
              <span>{product.description}</span>
              <Link to={`/product/${product._id}`}><button>Ver más</button></Link>
              
            </div>
          )
        })}
      </div>
    </div>
    <div className="footer">
      MJV - Job - Test - Felipe Estrada - 2021
      </div>
  </>
)
}

export default Home
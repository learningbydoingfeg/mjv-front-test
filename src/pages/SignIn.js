import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'

const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const sendData = async (payload) => {
    let result = await axios({
      method: 'POST',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/users/signin',
      data: payload
    })
      .then(({ data }) => {
        // console.log(data.user._id)
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', data.user._id)
      })
      .catch(function (err) {
        console.log(err)
      })

    history.push('/')
  }


  const formSubmit = (e) => {
    e.preventDefault();

    const payload = {
      "email": email,
      "password": password,
    }

    sendData(payload)
  }

  return (
    <div className="logapp">
      <div className="form-container">
        iniciar sesión
      <form onSubmit={formSubmit} className="formbox">
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" autoComplete="on" />
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
          <div className="full-center"><button>iniciar sesión</button></div>
        </form>
      regístrate <Link to='/signup'>aquí</Link>

      </div>
    </div>
  )
}

export default SignIn

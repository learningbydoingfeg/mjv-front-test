import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'

const SignUp = () => {
  const history = useHistory();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')


  const sendData = async (payload) => {
    
      let result = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users/signup',
        data: payload
      })
        .then(({ data }) => {
  
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
        registro de usuario
    <form onSubmit={formSubmit} className="formbox">
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" autoComplete="on" />
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
          <input onChange={(e) => setPasswordConfirmation(e.target.value)} type="password" placeholder="password confirmation" />
          <div className="full-center"><button>registrarse</button></div>

        </form>
      ya estás registrado ?<br /><br />inicia sesión <Link to='/signin'>aquí</Link>
      </div>
    </div>
  )
}

export default SignUp
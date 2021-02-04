import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Footer from './components/Footer'

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AdminHome from './pages/AdminHome';
import Product from './pages/Product';
import './App.css';



function PrivateRoute(props) {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/signin')
    }

  },[history]);

  return (
    <Route {...props} />
  ) 
}



function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path='/admin' component={AdminHome} />
          <PrivateRoute exact path='/product/:id' component={Product} />
          <PrivateRoute exact path='/' component={Home} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/signin' component={SignIn} />
          <Redirect from='*' to='/' />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

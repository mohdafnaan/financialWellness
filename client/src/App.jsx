import React from 'react'
import { Route,Routes } from 'react-router'
import Register from './pages/Register';
import Login from './pages/Login';
import Emailotp from './pages/Emailotp';
import Home from './pages/Home';
const App = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/email-otp' element={<Emailotp/>}></Route>

    </Routes>
  ) 
}

export default App

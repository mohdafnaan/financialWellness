import React from 'react'
import { Route,Routes } from 'react-router'
import Register from './pages/Register';
import Login from './pages/Login';
import Emailotp from './pages/Emailotp';
import Home from './pages/Home';
import Active from './pages/Active';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/email-otp' element={<Emailotp/>}></Route>
      <Route path='/active' element={<Active/>}></Route>
      

    </Routes>
  ) 
}

export default App

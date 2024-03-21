import React from 'react'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Dshboard from './Pages/dshboard'

const App = () => {
  return <>
    <Toaster 
     position="top-right "
     
      />
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/protected' element={<Dshboard />} />

    </Routes> 

  </>
}

export default App

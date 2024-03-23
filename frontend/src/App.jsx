import React from 'react'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Dshboard from './Pages/dshboard'
import NotFound from './Components/NotFound/NotFound'
import Chat from './Pages/Chat'

const App = () => {
  return <>
    <Toaster
      position="top-right "
    />
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/protected' element={<Chat/>} />
      <Route path='/user/chat' element={<Chat />} />
    </Routes>

  </>
}

export default App

import React from 'react'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Dshboard from './Pages/dshboard'
import NotFound from './Components/NotFound/NotFound'
import Chat from './Pages/Chat'
import Dashboard from './Components/Admin/Dashboard'
import Admin from './Pages/Admin'
import Profile from './Components/Admin/Profile'

const App = () => {
  return <>
    <Toaster
      position="top-right "
    />
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/protected' element={<Dshboard />} />
      <Route path='/user/chat' element={<Chat />} />
      <Route path='/admin' element={<Admin />}>
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/profile' element={<Profile />} />
        <Route path='/admin/users' element={<Profile />} />
        <Route path='/admin/groups' element={<Profile />} />
        <Route path='/admin/messages' element={<Profile />} />
      </Route>

    </Routes>

  </>
}

export default App

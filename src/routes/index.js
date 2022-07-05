import React from 'react'
import { Routes , Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import ForgotPassword from '../pages/ForgotPassword'
import UpdateProfile from '../pages/UpdateProfile'
import NotFound from '../pages/NotFound'

const Routing = () => {
  const { authUser } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="dashboard" element={authUser ? <Dashboard/> : <Navigate to="/signin" replace />}/>
      <Route path="update-profile" element={authUser ? <UpdateProfile/> : <Navigate to="/signin" replace />}/>     
      <Route path="signup" element={<Signup/>}/>
      <Route path="signin" element={!authUser ? <Signin/> : <Navigate to='/dashboard'  replace />}/>
      <Route path="forgot-password" element={<ForgotPassword/>}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>
  )
}

export default Routing

import { useState } from 'react'
import  {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './Home'
import PropTypes from 'prop-types';
import Login from './Login';
import Signup from './Signup';
import Navbar from './components/Navbar'
import './App.css'
import { AuthContextProvider } from './context/authContext'
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const {user} = useAuthContext()

  return (
    <div className='pages w-screen h-screen'>
      <BrowserRouter>
        <Navbar></Navbar>
        <div className='w-full h-[92%]  flex justify-center '>
          <Routes>
            <Route
              path="/" 
              element={user ? <Home/> : <Navigate to='/login'/>}>
            </Route>
            <Route
              path="/login" 
              element={!user? <Login/> : <Navigate to ="/"/>}>
            </Route>
            <Route
              path="/signup" 
              element={!user? <Signup/> : <Navigate to ='/'/>}>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

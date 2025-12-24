import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from "./pages/Login"
import Register from './pages/Register'
import Verify from './pages/Verify'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import CreateItem from './pages/CreateItem'
import ClaimDetail from './pages/ClaimDetail'

function App() {
  return (
   <BrowserRouter>
   <Navbar/>
   <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />}/>
      <Route path="/verify" element={<Verify/>} />
      <Route path="/create-item" element={<CreateItem/>} />
      <Route path="/claims/:id" element={<ClaimDetail />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App

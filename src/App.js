import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Home from './container/Home'

const App = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/*" element={<Home/>} />
    </Routes>
  )
}

export default App;

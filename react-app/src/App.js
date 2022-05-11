import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Home from './container/Home'

function App() {
  const navigate = useNavigate();

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload. Test. Tailwind.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Routes>
      <Route path="/*" element={<Home/>} />
    </Routes>
  );
}

export default App;

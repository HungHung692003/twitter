// src/App.tsx
import React, { useState } from 'react';
import './App.css';

import 'react-toastify/dist/ReactToastify.css';
import Register from './client/register/register';
import Login from './client/login/Login';
import Footer from './client/footer';
import LoginComponent from './client/login/Login';


const App: React.FC = () => {
  
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="App">
     <LoginComponent />
     
    </div>
  );
};

export default App;


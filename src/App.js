import React from 'react';
import { Create } from './components';
import './App.css';
import Login from './components/Login/Login.jsx'
import {AuthProvider} from './context/AuthContext'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
const App = () => {
  return (
    <div>
       <AuthProvider>
        <Router>
          
        {/* <Login/> */}
        </Router>
       </AuthProvider>
               
        
        
      
    </div>
  );
}

export default App;

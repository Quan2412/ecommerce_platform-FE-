import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginRegisterPage from './LoginRegisterPage';
import Dashboard from './Dashboard';

function App() {
  const isAuthenticated = localStorage.getItem('token') !== null;

  console.log('App rendered, auth status:', isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginRegisterPage />} 
        />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
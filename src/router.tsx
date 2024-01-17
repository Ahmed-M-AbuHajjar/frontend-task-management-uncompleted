import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import LoginPage from './components/pages/LoginPage';
import NotFound from './components/pages/NotFound';
import RegisterPage from './components/pages/RegisterPage';
import { Dashboard } from './components/templates/Dashboard';
import { Profile } from './components/templates/Profile';
import { getUserIdFromToken } from './utils/authUtils';





const Router: React.FC = () => {
  const hasAuthToken = !!localStorage.getItem('authToken');
  const userId = getUserIdFromToken();
  
    return (
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/login" element={<LoginPage />}/>
        {!userId ? (
           <Route path="/register" element={<RegisterPage />}/>
        ):(<>
      <Route
            path="/register"
            element={<Navigate to="/dashboard" />}
          />
        </>)}
       
        {hasAuthToken ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path={`/profile/${userId}`} element={<Profile />} />
          </>
        ) : (
          <>
          <Route
            path="/dashboard"
            element={<Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={<Navigate to="/login" />}
          />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    );
  };
  
  export default Router;

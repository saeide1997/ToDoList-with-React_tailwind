import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from './assets/pages/HomePage';
import NewTask from './assets/pages/newTask';
import Footer from "./assets/components/Footer.jsx";
import Header from "./assets/components/Header.jsx";
import Login from './assets/pages/Login.jsx';
import PrivateRoute from './assets/components/PrivateRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Register from './assets/pages/Register.jsx';

function AppLayout() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/register"; // مسیرهایی که header/footer ندارن

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />
        <Route path="/new" element={<PrivateRoute><NewTask /></PrivateRoute>} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;

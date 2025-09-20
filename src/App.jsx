import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './assets/pages/HomePage'
import NewTask from './assets/pages/newTask'
import Footer from "./assets/components/Footer.jsx";
import Header from "./assets/components/Header.jsx";

function App() {

  return (
     <Router>
<Header/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/new" element={<NewTask />} />
            </Routes>
         <Footer />
        </Router>
  )
}

export default App

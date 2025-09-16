import React from 'react'
import './App.css'
import TodoForm from './assets/components/TodoForm'
import TodoItem from './assets/components/TodoItem'
import TodoList from './assets/components/TodoList'
import Header from './assets/components/Header'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './assets/pages/HomePage'
import NewTask from './assets/pages/newTask'

function App() {

  return (
     <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/new" element={<NewTask />} />
            </Routes>
        </Router>
  )
}

export default App

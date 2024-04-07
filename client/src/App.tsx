import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './styles.css'
import Lists from './pages/lists'
import Boards from './pages/boards'
import MyNavbar from './components/myNavbar'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/lists/:yourArg" element={<Lists />} />

        <Route path="/" element={<Boards />} />
      </Routes>
    </Router>
  )
}

export default App

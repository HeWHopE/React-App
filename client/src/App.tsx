import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './styles.css'
import Lists from './pages/lists'
import Boards from './pages/boards'
import MyNavbar from './components/myNavbar'
import BoardsModal from './components/boardsModal'

const App = () => {
  const [isBoardsModalOpen, setBoardsModalOpen] = useState(false)

  const handleCloseBoardsModal = () => {
    setBoardsModalOpen(false)
  }

  return (
    <Router>
      <MyNavbar />

       
      <BoardsModal
        onClose={handleCloseBoardsModal}
        onOpenChange={setBoardsModalOpen}
      />

      <Routes>
        {/* Pass the state to the Lists component */}
        <Route
          path="/lists/:yourArg"
          element={<Lists isBoardsModalOpen={isBoardsModalOpen} />}
        />
        <Route path="/" element={<Boards />} />
      </Routes>
    </Router>
  )
}

export default App

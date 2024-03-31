import React, {useState } from 'react'
import './styles/App.css'

import HistoryButton from './components/historyButton'
import ListContainer from './components/listContainer'
import CreateListButton from './components/createListButton'
import HistoryModal from './components/historyModal'
import { useFetchActivityQuery } from './services/ActivityService'

function App() {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
  const { data: activities, refetch } = useFetchActivityQuery()

  const handleRefresh = () => {
    refetch()
  }

  const handleOpenHistoryModal = () => {
    setIsHistoryModalOpen(true)
  }

  const handleCloseHistoryModal = () => {
    setIsHistoryModalOpen(false)
  }

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-title">My Task Board</div>
          <div className="navbar-buttons">
            <CreateListButton />
            <HistoryButton
              onClick={() => {
                handleOpenHistoryModal()
                handleRefresh()
              }}
            />
          </div>
        </div>
      </nav>
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={handleCloseHistoryModal}
        activities={activities}
      />
      {isHistoryModalOpen && (
        <div className="overlay" onClick={handleCloseHistoryModal}></div>
      )}
      <ListContainer />
    </div>
  )
}

export default App

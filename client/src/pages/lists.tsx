import React, { useState } from 'react'
import '../styles/App.css'
import '../styles.css'
import HistoryButton from '../components/historyButton'
import ListContainer from '../components/listContainer'
import CreateListButton from '../components/createListButton'
import HistoryModal from '../components/historyModal'
import { useFetchActivityQuery } from '../services/ActivityService'
import { useParams } from 'react-router-dom'

const Lists: React.FC = () => {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)

  const { yourArg } = useParams<{ yourArg?: string }>()
  const boardId = yourArg ? parseInt(yourArg, 10) : undefined

  console.log(typeof boardId, 'boardId')

  if (boardId === undefined || isNaN(boardId)) {
    throw new Error('Invalid boardId')
  }

  const { data: activities, refetch } = useFetchActivityQuery({ boardId })

  const handleOpenHistoryModal = () => {
    refetch()
    setIsHistoryModalOpen(true)
  }

  const handleCloseHistoryModal = () => {
    setIsHistoryModalOpen(false)
  }

  return (
    <div className="App">
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

export default Lists

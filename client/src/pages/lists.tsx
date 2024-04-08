import React, { useEffect, useState } from 'react'
import '../styles/App.css'
import '../styles.css'
import ListContainer from '../components/listContainer'
import CreateListButton from '../components/createListButton'
import HistoryModal from '../components/historyModal'
import { useFetchActivityQuery } from '../services/ActivityService'
import { useParams } from 'react-router-dom'
import MyNavbar from '../components/myNavbar'
import { BsArrowLeftShort } from 'react-icons/bs'

//write interface

interface ListsProps {
  isBoardsModalOpen: boolean
}

const Lists: React.FC<ListsProps> = ({ isBoardsModalOpen }) => {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)

  const { yourArg } = useParams<{ yourArg?: string }>()
  const boardId = yourArg ? parseInt(yourArg, 10) : undefined

  if (boardId === undefined || isNaN(boardId)) {
    throw new Error('Invalid boardId')
  }
  console.log(isBoardsModalOpen)

  const { data: activities, refetch } = useFetchActivityQuery({ boardId })

  useEffect(() => {
    refetch()
  }, [isHistoryModalOpen])

  const handleCloseHistoryModal = () => {
    setIsHistoryModalOpen(false)
  }

  return (
    <div>
      <ListContainer
        isHistoryModalOpen={isHistoryModalOpen}
        isBoardsModalOpen={isBoardsModalOpen}
      />
      <HistoryModal
        onClose={handleCloseHistoryModal}
        activities={activities}
        onOpenChange={setIsHistoryModalOpen} // Passing callback to handle modal open/close state
      />
    </div>
  )
}

export default Lists

import React, { useState } from 'react'
import HistoryModal from './historyModal'
import { useFetchActivityQuery } from '../services/ActivityService'
import { useParams } from 'react-router-dom'

//write interface

interface HeaderOfListsProps {
  isHistoryModalOpen: boolean
  isBoardsModalOpen: boolean
}

const HeaderOfLists: React.FC<HeaderOfListsProps> = ({
  isHistoryModalOpen,
  isBoardsModalOpen,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { yourArg } = useParams<{ yourArg?: string }>()
  const boardId = yourArg ? parseInt(yourArg, 10) : undefined

  if (boardId === undefined) {
    throw new Error('boardId is undefined')
  }

  return (
    <header
      className={` z-0 mr-0 ${isHistoryModalOpen ? 'mr-72' : ''} ${isBoardsModalOpen ? 'ml-72' : ''}  duration-300 h-20 flex items-center justify-between`}
    ></header>
  )
}

export default HeaderOfLists

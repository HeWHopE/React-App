import React, { useState } from 'react'
import '../styles.css'
import { useFetchBoardsQuery } from '../services/BoardService'
import CloseXButton from '../components/closeXButton'
import CreateBB from '../components/createBB'
import BoardsComponent from '../components/myBoards' // Assuming correct path to the Boards component
import MyNavbar from '../components/myNavbar'
import BoardsModal from '../components/boardsModal'

const BoardsPage: React.FC = () => {
  const { data: boards } = useFetchBoardsQuery()

  return (
    <div>
      <BoardsComponent boards={boards} />
    </div>
  )
}

export default BoardsPage

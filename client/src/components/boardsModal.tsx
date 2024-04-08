import React, { useState, useEffect } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useFetchBoardsQuery } from '../services/BoardService'

interface BoardsModalProps {
  onClose: () => void
  onOpenChange: (isOpen: boolean) => void // Callback function to notify parent about open/close state
}

const BoardsModal: React.FC<BoardsModalProps> = ({ onClose, onOpenChange }) => {
  const [open, setOpen] = useState(false)
  const [activeBoardIndex, setActiveBoardIndex] = useState<number | null>(null) // Додана змінна для визначення активної дошки

  const { data: boards } = useFetchBoardsQuery()

  useEffect(() => {
    onOpenChange(open)
  }, [open, onOpenChange])

  return (
    <div>
      <div
        id="history-modal"
        className={` min-h-[871px] border-l-2 bg-slate-600 border-gray-200 top-12 ${open ? 'w-72' : 'w-4  '} duration-300 absolute overflow-hidden`}
      >
        <nav
          className={` h-20 history-navbar justify-center w-full text-white px-4 duration-300 py-2 flex items-center border-b-2 border-gray-200`}
        >
          <h2
            className={`text-lg flex duration-300 ${open ? '' : 'invisible'} duration-300`}
          >
            Your workspace
          </h2>
        </nav>

        <div className="p-4">
          <h2 className="text-white font-bold mb-4">Boards</h2>
          <ul className="flex flex-col ">
            {/* Map through the boards array */}
            {boards &&
              boards.map((board, index) => (
                <div key={index}>
                  <Link to={`/lists/${board.id}`} className="flex items-center">
                    {' '}
                    {/* Add Link component with appropriate path */}
                    <li
                      className={`text-white w-full p-2 rounded-md ${
                        activeBoardIndex === index ? 'bg-gray-400' : ''
                      }`}
                      onClick={() => setActiveBoardIndex(index)} // Оновлення активної дошки при кліці
                      style={{ textAlign: 'left' }} // Align text to the left side
                    >
                      {board.name}
                    </li>
                  </Link>
                </div>
              ))}
          </ul>
        </div>
      </div>

      <BsArrowLeftShort
        className={`bg-slate-600  text-white rotate-180 hover:bg-slate-400 z-1 top-14 duration-300 ${
          open ? 'left-64 rotate-0' : 'left-1 '
        } text-dark-purple text-3xl rounded-full absolute  cursor-pointer transition-all duration-300`}
        onClick={() => setOpen(!open)}
      />
    </div>
  )
}

export default BoardsModal

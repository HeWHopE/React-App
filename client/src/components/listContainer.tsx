import {
  useFetchListsQuery,
  useDeleteListMutation,
} from '../services/ListService'
import React, { createRef, useState, MouseEvent, useRef } from 'react'
import ListItem from './ListItem'
import TaskList from './taskList'
import { IList } from '../models/IList'
import { useParams } from 'react-router-dom'
import MyNavbar from './myNavbar'
import { BsPlus } from 'react-icons/bs'
import TextAreaComponent from './TextAreaComponent'
import { AiOutlineCloseCircle } from 'react-icons/ai'


import { usePostListMutation } from '../services/ListService'

import { useEffect } from 'react'
import HeaderOfLists from './HeaderOfLists'

//write interface

interface ListContainerProps {
  isHistoryModalOpen: boolean
  isBoardsModalOpen: boolean
}

const ListContainer: React.FC<ListContainerProps> = ({
  isHistoryModalOpen,
  isBoardsModalOpen,
}) => {
  const { yourArg } = useParams<{ yourArg?: string }>()
  const boardId = yourArg ? parseInt(yourArg, 10) : undefined

  if (boardId === undefined) {
    throw new Error('boardId is undefined')
  }

  const { data: lists } = useFetchListsQuery({ boardId })
  const [deleteList] = useDeleteListMutation()
  const olRef = createRef<HTMLOListElement>()
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState<number | null>(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [showTextarea, setShowTextarea] = useState<{ [key: number]: boolean }>(
    {},
  )

  const [isAddingList, setIsAddingList] = useState(false);
  const [newListName, setNewListName] = useState('');


  const [postList] = usePostListMutation()

  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (isHistoryModalOpen && olRef.current) {
        olRef.current.scrollLeft = 0
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleMouseMove = (e: MouseEvent<HTMLOListElement>) => {
    if (!isDragging || !olRef.current || startX === null) return
    const x = e.pageX - olRef.current.offsetLeft
    const walk = (x - startX) * 3 // Adjust the sensitivity
    olRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseDown = (e: MouseEvent<HTMLOListElement>) => {
    setIsDragging(true)
    if (olRef.current) {
      setStartX(e.pageX - olRef.current.offsetLeft)
      setScrollLeft(olRef.current.scrollLeft)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleRemove = (list: IList) => {
    deleteList(list)
  }

  
const handleAddList = () => {

  if (!newListName) {
    setNewListName('');
    setIsAddingList(false);
    return;
  }

  postList({ name: newListName, boardId })

  setNewListName('');
  setIsAddingList(false);
};


  if (!lists) {
    return <div>Create your 1st list dear!!!</div>
  }

  const sortedLists = lists.slice().sort((a: IList, b: IList) => {
    const idA = Number(a.id) || 0
    const idB = Number(b.id) || 0
    return idA - idB
  })
  return (
    <>
      <HeaderOfLists
        isHistoryModalOpen={isHistoryModalOpen}
        isBoardsModalOpen={isBoardsModalOpen}
      />

<ol
  className={`select-none ${isHistoryModalOpen ? 'mr-72' : 'mr-4'} ${isBoardsModalOpen ? 'ml-72' : 'ml-4'} min-h-[790px] duration-300 flex-grow flex flex-row overflow-y-hidden z-2`}
  ref={olRef}
  onMouseMove={handleMouseMove}
  onMouseDown={handleMouseDown}
  onMouseUp={handleMouseUp}
>


  {sortedLists.map((list: IList) => (
    <li key={list.id} className="m-4 max-h-[900px]">
      <div className="rounded-3xl bg-slate-200 w-80">
        <ListItem remove={handleRemove} list={list} />

        <ol className="max-h-[700px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <TaskList listId={Number(list.id)} />
          <TextAreaComponent
            list={list}
            showTextarea={showTextarea}
            setShowTextarea={setShowTextarea}
          />
        </ol>
      </div>
    </li>
  ))}

<li className="m-4">
    {isAddingList ? (
      <div>
        <textarea
              className="flex-grow bg-white rounded-lg shadow border-none p-2 resize-none mb-2 w-80" // Adjusted class
          placeholder="Enter list name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <div className="flex justify-between items-center mt-2">
  <button
    className="flex-shrink-0 bg-blue-500 text-white px-4 h-8 rounded hover:bg-blue-600 mr-2 w-3/4" // Adjusted button width
    onClick={handleAddList}
  >
    Add list
  </button>
  <button
    className="flex-shrink-0 color-black text-black rounded-full duration-300 hover:bg-slate-300 p-1"
    onClick={() => setIsAddingList(false)}
  >
    <AiOutlineCloseCircle className="w-8 h-8 text-gray-500" />
  </button>
</div>

      </div>
    ) : (
      <button
        className="flex items-center justify-center hover:bg-slate-300 duration-300 m-1 rounded-lg bg-slate-100 w-80 py-2"
        onClick={() => setIsAddingList(true)}
      >
        <BsPlus className="text-slate-600 h-6 w-6" />
        <span className="text-md text-slate-600">Add List</span>
      </button>
    )}
  </li>
  
</ol>

    </>
  )
}

export default ListContainer

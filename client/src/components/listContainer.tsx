import {
  useFetchListsQuery,
  useDeleteListMutation,
} from '../services/ListService'
import React, { createRef, useState, MouseEvent } from 'react'
import CircleItem from './CircleItem'
import ListItem from './ListItem'
import TaskList from './taskList'
import { IList } from '../models/IList'
import { useParams } from 'react-router-dom'
import MyNavbar from './myNavbar'
import { BsPlus } from 'react-icons/bs'

import { AiOutlineCloseCircle } from "react-icons/ai";

const ListContainer = () => {
  const { yourArg } = useParams<{ yourArg?: string }>()
  const boardId = yourArg ? parseInt(yourArg, 10) : undefined

  if (boardId === undefined) {
    throw new Error('boardId is undefined')
  }

  const {
    data: lists,
    error: listError,
    isLoading: listIsLoading,
  } = useFetchListsQuery({ boardId })
  const [deleteList] = useDeleteListMutation()
  const olRef = createRef<HTMLOListElement>()
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState<number | null>(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [showTextarea, setShowTextarea] = useState<{ [key: number]: boolean }>(
    {},
  )

  const [text, setText] = useState('');
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const [textAreas, setTextAreas] = useState<{ [key: number]: { text: string; height: string } }>({});

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, listId: number) => {
    const newTextAreas = { ...textAreas };
    newTextAreas[listId] = { text: e.target.value, height: `${e.target.scrollHeight}px` };
    setTextAreas(newTextAreas);
  };
  
  const handleBlur = (listId: number) => {
    setShowTextarea((prevState) => ({
      ...prevState,
      [listId]: false,
    }));
    setTextAreas((prevTextAreas) => ({
      ...prevTextAreas,
      [listId]: { text: '', height: 'auto' }, // Reset text and height for the corresponding list
    }));
  };
  


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

  if (!lists) {
    return <div>Create your 1st list dear!!!</div>
  }

  const sortedLists = lists.slice().sort((a: IList, b: IList) => {
    const idA = Number(a.id) || 0
    const idB = Number(b.id) || 0
    return idA - idB
  })

  return (
    <ol
      className="select-none h-screen flex-grow flex flex-row overflow-y-scroll"
      ref={olRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {sortedLists.map((list: IList) => (
        <li key={list.id} className="m-4">
          <div className="rounded-lg bg-slate-200">
            <ListItem remove={handleRemove} list={list} />
            <TaskList listId={Number(list.id)} />

            <div className=" flex justify-center">
              {showTextarea[Number(list.id)] ? (
                <div className="flex flex-col items-center justify-center">
                  <textarea
  placeholder="Enter a title for this card..."
  value={textAreas[Number(list.id)]?.text || ''}
  onChange={(e) => handleChange(e, Number(list.id))}
  onBlur={() => handleBlur(Number(list.id))}
  style={{ minHeight: '12px', height: textAreas[Number(list.id)]?.height || 'auto' }}
  className="flex-grow bg-white rounded-lg shadow border-none p-2 resize-none mb-2 w-full"
/>

                  <div className="flex items-center w-full m-2">
  <button className="flex-shrink-0 bg-blue-500 text-white px-4 h-8 rounded hover:bg-blue-600 mr-2">
    Add card
  </button>
  <button className="flex-shrink-0 text-white color-black text-black rounded hover:bg-slate-300 p-1">
    <AiOutlineCloseCircle className='w-8 h-8 text-gray-500' />
  </button>
</div>
                </div>
              ) : (
                <button
                  className="flex items-center justify-center hover:bg-slate-300 duration-500 m-1 rounded-lg w-40 py-2"
                  onClick={() =>
                    setShowTextarea((prevState) => ({
                      ...Object.fromEntries(
                        Object.entries(prevState).map(([key, value]) => [
                          key,
                          false,
                        ]),
                      ),
                      [Number(list.id)]: true,
                    }))
                  }
                >
                  <BsPlus />
                  <span className="text-md">Add Card</span>
                </button>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default ListContainer

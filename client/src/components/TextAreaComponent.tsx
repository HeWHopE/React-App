import React, { useState } from 'react'

import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import { IList } from '../models/IList'
import { taskApi } from '../services/TaskService'
import { useFetchActivityQuery } from '../services/ActivityService'
import { useParams } from 'react-router-dom'
interface TextAreaComponentProps {
  list: IList
  showTextarea: { [key: number]: boolean }
  setShowTextarea: React.Dispatch<
    React.SetStateAction<{ [key: number]: boolean }>
  >
}

const TextAreaComponent: React.FC<TextAreaComponentProps> = ({
  list,
  showTextarea,
  setShowTextarea,
}) => {
  const [postTaskMutation] = taskApi.usePostTaskMutation()

  const { yourArg } = useParams<{ yourArg?: string }>()
  const boardId = yourArg ? parseInt(yourArg, 10) : undefined

  if (boardId === undefined) {
    throw new Error('boardId is undefined')
  }

  const { data: activities, refetch } = useFetchActivityQuery({ boardId })

  const [textAreas, setTextAreas] = useState<{
    [key: number]: { text: string; height: string }
  }>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    listId: number,
  ) => {
    const newTextAreas = { ...textAreas }
    newTextAreas[listId] = {
      text: e.target.value,
      height: `${e.target.scrollHeight}px`,
    }
    setTextAreas(newTextAreas)
  }

  // Function to handle textarea blur
  const handleBlur = (listId: number) => {
    // Add a delay before closing the textarea
    setTimeout(() => {
      setShowTextarea((prevState) => ({
        ...prevState,
        [listId]: false,
      }))
      setTextAreas((prevTextAreas) => ({
        ...prevTextAreas,
        [listId]: { text: '', height: 'auto' },
      }))
    }, 90) // Adjust the delay time as needed (e.g., 200 milliseconds)
  }

  const handleAddCard = () => {
    if (
      textAreas[Number(list.id)]?.text === '' ||
      textAreas[Number(list.id)]?.text === undefined
    ) {
      return
    }
    console.log('Add card clicked')

    postTaskMutation({
      listId: Number(list.id),
      task: {
        name: textAreas[Number(list.id)]?.text || '',
      },
    })
  }

  const handleClose = () => {
    console.log('Close clicked')
    handleBlur(Number(list.id))
  }

  return (
    <div className="flex justify-center">
      {' '}
      {/* Centering container */}
      {showTextarea[Number(list.id)] ? (
        <div className="flex flex-col items-center w-full">
          <div className="w-11/12">
            {' '}
            {/* Container to control width */}
            <textarea
              placeholder="Enter a title for this card..."
              value={textAreas[Number(list.id)]?.text || ''}
              onChange={(e) => handleChange(e, Number(list.id))}
              onBlur={() => handleBlur(Number(list.id))}
              style={{
                minHeight: '12px',
                height: textAreas[Number(list.id)]?.height || 'auto',
              }}
              onFocus={(e) => e.stopPropagation()} // Add this line
              className="flex-grow bg-white rounded-lg shadow border-none p-2 resize-none mb-2 w-full" // Adjusted class
            />
          </div>

          <div className="flex items-center justify-center w-full m-2">
            {' '}
            {/* Centering buttons */}
            <button
              className="flex-shrink-0 bg-blue-500 text-white px-4 h-8 rounded hover:bg-blue-600 mr-2 w-3/4" // Adjusted button width
              onClick={handleAddCard}
            >
              Add card
            </button>
            <button
              className="flex-shrink-0 color-black text-black rounded-full duration-300 hover:bg-slate-300 p-1"
              onClick={handleClose}
            >
              <AiOutlineCloseCircle className="w-8 h-8 text-gray-500" />
            </button>
          </div>
        </div>
      ) : (
        <button
          className="flex items-center justify-center hover:bg-slate-300 duration-300 m-1 rounded-lg w-11/12 py-2"
          onClick={() =>
            setShowTextarea((prevState) => ({
              ...Object.fromEntries(
                Object.entries(prevState).map(([key, value]) => [key, false]),
              ),
              [Number(list.id)]: true,
            }))
          }
        >
          <BsPlus className="text-slate-600 h-6 w-6" />
          <span className="text-md text-slate-600">Add Card</span>
        </button>
      )}
    </div>
  )
}

export default TextAreaComponent

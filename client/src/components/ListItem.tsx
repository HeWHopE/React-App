import React, { useState, useRef, useEffect } from 'react'
import { IList } from '../models/IList'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { FiPlus } from 'react-icons/fi'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { taskApi } from '../services/TaskService'
import { useUpdateListMutation } from '../services/ListService'

import '../styles/listItem.css'

interface ListItemProps {
  list: IList
  remove: (list: IList) => void
}

const ListItem: React.FC<ListItemProps> = ({ list, remove }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDueDate, setTaskDueDate] = useState('')
  const [taskPriority, setTaskPriority] = useState('')
  const [error, setError] = useState('')
  const [listName, setListName] = useState(list.name)
  const [postTaskMutation] = taskApi.usePostTaskMutation()
  const [editMode, setEditMode] = useState(false)
  const [updateList, {}] = useUpdateListMutation()

  const handleUpdate = async (listName: string) => {
    try {
      await updateList({ name: listName, list_id: Number(list.id) })
    } catch (error) {
      console.error('Error updating list:', error)
      
    }
  }

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const handleRemove = () => {

    if (list.id !== undefined) {
      remove(list)
    } else {
      console.error('ID is undefined')
    }
  }


  const handleAddCard = () => {
    setIsModalOpen(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  const handleDeleteCard = (id: number) => {
    console.log('Delete card with id:', id)
  }

  

  return (
    <div className="pl-4 flex justify-between items-center w-11/12 p-2 ">
      {editMode ? (
        <textarea
          className={`resize-none w-full p-1 rounded-xl truncate`}
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          onBlur={() => {
            setEditMode(false)
            if (listName.length < 1) {
              setListName('Untitled')
              return
            }
            handleUpdate(listName)
          }}
          autoFocus
          rows={1}
          maxLength={20}
          minLength={1}
        />
      ) : (
        <textarea
          className="cursor-pointer resize-none overflow-hidden w-full p-1 bg-slate-200 rounded-xl"
          onClick={() => setEditMode(true)}
          value={listName}
          rows={1}
          
          
        />
      )}
<div className="relative">
  <div
    className="cursor-pointer hover:bg-slate-400 rounded-xl duration-200 p-2 w-8 h-8 flex items-center justify-center" // Added width and height classes
    onClick={togglePopup}
  >
    <BsThreeDotsVertical />
  </div>
  {showPopup && (
  <>
    
    <div
      className="fixed inset-0 bg-black opacity-0 z-10"
      onClick={handleClosePopup}
    ></div>   
    <div className="absolute -right-20 mt-2 z-20">
  <div className="bg-white p-4 rounded-lg shadow-md w-56 flex flex-col justify-center items-center"> {/* Adjust the width here */}
    {/* Popup Title */}
    <div className="text-lg font-bold mb-4">
      Actions with List
    </div>


      <div className="space-x-4 border-t-2 p-2 border-slate-200 w-30">
        <button className="px-4 py-2 text-red-800 rounded" onClick={handleRemove}>Delete List</button>
      </div>

    <div className="space-x-4 border-t-2 p-2 border-slate-200 w-30">
    <a className="px-4 py-2 text-red-800 rounded cursor-pointer" onClick={handleClosePopup}>
      Close Popup
    </a>
    </div>
  </div>
</div>

  </>
)}


</div>




    </div>
  )
}

export default ListItem

import React, { useState, useRef, useEffect } from 'react'
import { IList } from '../models/IList'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { FiPlus } from 'react-icons/fi'
import { BsFillTrash3Fill } from 'react-icons/bs'
import TaskModal from './taskModal'
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
      // Handle error if necessary
    }
  }

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const handleRemove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation()
    if (list.id !== undefined) {
      remove(list)
    } else {
      console.error('ID is undefined')
    }
  }

  const handleCreate = async () => {
    if (!taskName || !taskDescription || !taskDueDate || !taskPriority) {
      setError('Please fill out all fields.')
      return
    }

    if (taskName.length > 20) {
      setError('Task name must be less than 20 characters.')
      return
    }

    const taskData = {
      name: taskName,
      description: taskDescription,
      due_date: taskDueDate,
      priority: taskPriority,
    }

    try {
      await postTaskMutation({
        listId: Number(list.id),
        task: taskData,
      })

      setIsModalOpen(false)
      setError('')
      setTaskName('')
      setTaskDescription('')
      setTaskDueDate('')
      setTaskPriority('')
    } catch (error) {
      console.error('Error creating task:', error)
      setError('Error creating task. Please try again.')
    }
  }

  return (
    <div className="pl-4 flex justify-between items-center w-52 ">
    {editMode ? (
  <textarea
    
    className={`resize-none w-full p-1 border-white border-none`}
    value={listName}
    onChange={(e) => setListName(e.target.value)}
    onBlur={() => {
      setEditMode(false);
      if (listName.length < 1) {
        setListName("Untitled");
        return;
      }
      handleUpdate(listName);
    }}
    autoFocus
    rows={1}
    maxLength={13}
    minLength={1}
  />
) : (
  <textarea
    
    className="cursor-pointer resize-none overflow-hidden whitespace-pre-wrap w-full p-1 bg-slate-200"
    onClick={() => setEditMode(true)}
    value={listName}
    rows={1}
    readOnly
    style={{ userSelect: 'none' }}
  />
)}


      <div
        className="cursor-pointer p-4 hover:bg-slate-400 duration-200 p-4"
        onClick={togglePopup}
      >
        <BsThreeDotsVertical />
      </div>

      {showPopup && (
        <div className="popup" style={{ userSelect: 'none' }}>
          <div className="Delete" onClick={handleRemove}>
            <BsFillTrash3Fill />
            Delete
          </div>
        </div>
      )}
    </div>
  )
}

export default ListItem


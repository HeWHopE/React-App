import React, { useState } from 'react'
import { IList } from '../models/IList'
import '../styles/listItem.css'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { FiPlus } from 'react-icons/fi'
import { BsFillTrash3Fill } from 'react-icons/bs'
import TaskModal from './taskModal'
import { taskApi } from '../services/TaskService'
interface ListItemProps {
  list: IList
  remove: (list: IList) => void
  update: (list: IList) => void
}

const ListItem: React.FC<ListItemProps> = ({ list, remove, update }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDueDate, setTaskDueDate] = useState('')
  const [taskPriority, setTaskPriority] = useState('')
  const [error, setError] = useState('')

  const [postTaskMutation] = taskApi.usePostTaskMutation()

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

  const handleUpdate = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    const name = prompt('Edit name:', list.name) || list.name;

    if (list.id !== undefined) {
      update({ ...list, name: name })
      togglePopup()
    } else {
      console.error('ID is undefined')
      togglePopup()
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
    <div className="list-item">
      <span className="list-item-name">{list.name}</span>
      <div className="list-item-dots" onClick={togglePopup}>
        <BsThreeDotsVertical />
      </div>
      {showPopup && (
        <div className="popup">
          <div className="Edit" onClick={handleUpdate}>
            <FiEdit />
            Edit
          </div>
          <div className="Add-new-card" onClick={() => setIsModalOpen(true)}>
            {' '}
            <FiPlus /> Add new card
          </div>
          <div className="Delete" onClick={handleRemove}>
            {' '}
            <BsFillTrash3Fill />
            Delete
          </div>
        </div>
      )}

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            togglePopup()
          }}
          error={error}
          onTaskNameChange={setTaskName}
          onTaskDescriptionChange={setTaskDescription}
          onTaskDueDateChange={setTaskDueDate}
          onTaskPriorityChange={setTaskPriority}
          onCreateTask={handleCreate}
          text="Edit Task"
          viewStyle={false}
        />
      )}
    </div>
  )
}

export default ListItem

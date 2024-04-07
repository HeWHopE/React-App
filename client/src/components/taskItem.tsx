import React, { useState } from 'react'
import { ITask } from '../models/ITask'
import '../styles/taskItem.css'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BiCalendarCheck } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'
import { BsFillTrash3Fill } from 'react-icons/bs'
import TaskModal from './taskModal'
import { IList } from '../models/IList'
import { useFetchListsQuery } from '../services/ListService'
import { useParams } from 'react-router-dom'
interface TaskItemProps {
  task: ITask
  remove: (task: ITask) => void
  update: (task: ITask) => void
  move: (listId: number, taskId: number, newTaskId: number) => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, remove, update, move }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [taskName, setTaskName] = useState(task.name)
  const [taskDescription, setTaskDescription] = useState(task.description)
  const [taskDueDate, setTaskDueDate] = useState(task.due_date)
  const [taskPriority, setTaskPriority] = useState(task.priority)
  const [error, setError] = useState('')
  const [viewModalOpen, setViewModalOpen] = useState(false) // State for ViewModal

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

  const [isModalOpen1, setIsModalOpen1] = useState(false) // State for ViewModal

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const handleViewClick = () => {
    setViewModalOpen(true)
  }

  const handleRemove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation()
    if (task.id !== undefined) {
      remove(task)
    } else {
      console.error('ID is undefined')
    }
  }

  const handleEditClick = () => {
    setIsModalOpen(true)
  }

  const handleEditClick1 = () => {
    setIsModalOpen1(true)
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const month = months[date.getMonth()]
    const day = date.getDate()
    return `${month} ${day}`
  }

  const handleSelectClick = (
    event: React.MouseEvent<HTMLSelectElement, MouseEvent>,
  ) => {
    event.stopPropagation()
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newListId = event.target.value

    move(Number(task.list_id), Number(task.id), Number(newListId))
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const amPm = hour >= 12 ? 'pm' : 'am'
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`
  }

  const handleUpdate = () => {
    if (!taskName || !taskDescription || !taskDueDate || !taskPriority) {
      setError('Please fill out all fields.')
      return
    }

    if (taskName.length > 20) {
      setError('Task name must be less than 20 characters.')
      return
    }

    const updatedTask: ITask = {
      ...task,
      name: taskName,
      description: taskDescription,
      due_date: taskDueDate,
      priority: taskPriority,
    }

    update(updatedTask)
    setIsModalOpen(false)
  }

  return (
    <div
      className="task-item w-40 p-4 m-4"
      onClick={() => {
        handleEditClick1()
      }}
    >
      <div className="task-header">
        <div className="task-name">{task.name}</div>
        <div
          className="task-buttons"
          onClick={(event) => {
            event.stopPropagation()
            togglePopup()
          }}
        >
          <BsThreeDotsVertical />
        </div>
      </div>
    </div>
  )
}

export default TaskItem

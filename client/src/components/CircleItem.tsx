import React, { useState } from 'react'
import '../styles/CircleItem.css'
import { BiPlus } from 'react-icons/bi'
import { taskApi } from '../services/TaskService'
import TaskModal from './taskModal'

interface CircleItemProps {
  listId: number
}

const CircleItem: React.FC<CircleItemProps> = ({ listId }) => {
  const [postTaskMutation] = taskApi.usePostTaskMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDueDate, setTaskDueDate] = useState('')
  const [taskPriority, setTaskPriority] = useState('')
  const [error, setError] = useState('')

  const handleCreate = async () => {
    try {
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

      await postTaskMutation({
        listId,
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
    <div>
      <div className="CircleItem" onClick={() => setIsModalOpen(true)}>
        <BiPlus className="CircleItemIcon" />
        <span className="CircleItemText">Add task Item</span>
      </div>

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          error={error}
          onTaskNameChange={setTaskName}
          onTaskDescriptionChange={setTaskDescription}
          onTaskDueDateChange={setTaskDueDate}
          onTaskPriorityChange={setTaskPriority}
          onCreateTask={handleCreate}
          text="Create Task"
        />
      )}
    </div>
  )
}

export default CircleItem

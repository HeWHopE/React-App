// ViewModal.tsx
import React from 'react'
import { ITask } from '../models/ITask'
import '../styles/viewModal.css'

interface ViewModalProps {
  isOpen: boolean
  onClose: () => void
  task: ITask
}

const ViewModal: React.FC<ViewModalProps> = ({ isOpen, onClose, task }) => {
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation() // Prevent propagation to avoid closing the modal
  }

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={handleModalClick}>
        <button className="close" onClick={onClose}>
          &times;
        </button>
        <h2>Task Details</h2>
        <div>
          <strong>Task Name:</strong> {task.name}
        </div>
        <div>
          <strong>Description:</strong> {task.description}
        </div>
        <div>
          <strong>Due Date:</strong>{' '}
          {new Date(task.due_date).toLocaleDateString()}
        </div>
        <div>
          <strong>Priority:</strong> {task.priority}
        </div>
      </div>
    </div>
  )
}

export default ViewModal

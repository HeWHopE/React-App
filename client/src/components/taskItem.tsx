import React, { useState } from 'react';
import { ITask } from '../models/ITask';
import '../styles/taskItem.css'; 
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiCalendarCheck } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { BsFillTrash3Fill } from "react-icons/bs";
import TaskModal from './taskModal';

interface TaskItemProps {
  task: ITask;
  remove: (task: ITask) => void;
  update: (task: ITask) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, remove, update }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskDueDate, setTaskDueDate] = useState(task.due_date);
  const [taskPriority, setTaskPriority] = useState(task.priority);
  const [error, setError] = useState('');

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleRemove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (task.id !== undefined) {
      remove(task);
    } else {
      console.error('ID is undefined');
    }
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    if (!taskName || !taskDescription || !taskDueDate || !taskPriority) {
      setError('Please fill out all fields.');
      return;
    }

    
    if(taskName.length > 20) {
      setError('Task name must be less than 20 characters.');
      return;
    }

    const updatedTask: ITask = {
      ...task,
      name: taskName,
      description: taskDescription,
      due_date: taskDueDate,
      priority: taskPriority
    };

    update(updatedTask);
    setIsModalOpen(false);
  };

  return (
    <div className='task-item'>
      <div className='task-header'>
        <div className='task-name'>{task.name}</div>
        <div className='task-buttons' onClick={togglePopup}>
          <BsThreeDotsVertical/>
        </div>
      </div>
      <div className='task-details'>
        <div className='task-description'>
          {task.description.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <div className='task-due-date'>
          <span className='due-date-icon'><BiCalendarCheck/></span>
          {new Date(task.due_date).toLocaleDateString()}
        </div>
        <div className='task-priority'>
          <span className="priority-badge">
            <span className="dot"></span>
            <span className="priority-text">{task.priority}</span>
          </span>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className='Edit' onClick={handleEditClick}><FiEdit />Edit</div>
          <div className='Delete' onClick={handleRemove}><BsFillTrash3Fill/>Delete</div>
        </div>
      )}
      {isModalOpen && (
        <TaskModal
          task={task}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            togglePopup(); 
        }}
          
          error={error}
          onTaskNameChange={setTaskName}
          onTaskDescriptionChange={setTaskDescription}
          onTaskDueDateChange={setTaskDueDate}
          onTaskPriorityChange={setTaskPriority}
          onCreateTask={handleUpdate}
          text="Edit Task"
        />
      )}
    </div>
  );
};

export default TaskItem;

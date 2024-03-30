import React, { useState, useEffect } from 'react';
import { ITask } from '../models/ITask';

interface TaskModalProps {
  task?: ITask;
  isOpen: boolean;
  onClose: () => void;
  error: string;
  onTaskNameChange: (value: string) => void;
  onTaskDescriptionChange: (value: string) => void;
  onTaskDueDateChange: (value: string) => void;
  onTaskPriorityChange: (value: string) => void;
  onCreateTask: () => void;
  text: string;
}

const TaskModal: React.FC<TaskModalProps> = ({
  task,
  text,
  isOpen,
  onClose,
  error,
  onTaskNameChange,
  onTaskDescriptionChange,
  onTaskDueDateChange,
  onTaskPriorityChange,
  onCreateTask,
}) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('');

  useEffect(() => {
    if (task) {
      setTaskName(task.name);
      setTaskDescription(task.description);
      const dueDate = new Date(task.due_date);
      const day = dueDate.getDate();
      const month = dueDate.getMonth() + 1;
      const year = dueDate.getFullYear();
      const formattedDueDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
      setTaskDueDate(formattedDueDate);
      setTaskPriority(task.priority);
    } 
  }, [task]);

  const handleTaskNameChange = (value: string) => {
    setTaskName(value);
    onTaskNameChange(value);
  };

  const handleTaskDescriptionChange = (value: string) => {
    setTaskDescription(value);
    onTaskDescriptionChange(value);
  };

  const handleTaskDueDateChange = (value: string) => {
    setTaskDueDate(value);
    onTaskDueDateChange(value);
  };

  const handleTaskPriorityChange = (value: string) => {
    setTaskPriority(value);
    onTaskPriorityChange(value);
  };

  return (
    <>
      {isOpen && (
        <div className="modal-container" onClick={onClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{text}</h2>
              <button className="exit-button" onClick={onClose}>X</button>
            </div>
            <div className="modal-content">
              {error && <div className="error">{error}</div>}
              <div className="nameField">
                <input 
                  type="text" 
                  value={taskName} 
                  onChange={(e) => handleTaskNameChange(e.target.value)}
                  placeholder="Task Name"                  
                />
              </div>
              <div className="dateField">
                <input 
                  type="date" 
                  defaultValue={taskDueDate} 
                  onChange={(e) => handleTaskDueDateChange(e.target.value)}    
                />
              </div>
              <div className="selectField">
                <select value={taskPriority} onChange={(e) => handleTaskPriorityChange(e.target.value)}>
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="descriptionTextArea">
                <textarea 
                  value={taskDescription||''} 
                  onChange={(e) => handleTaskDescriptionChange(e.target.value)} 
                  placeholder="Task Description" 
                />
              </div>
              <button className="submitButton" onClick={onCreateTask}>{text}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskModal;

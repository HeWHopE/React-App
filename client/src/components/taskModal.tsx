import React, {useState} from 'react';
import { ITask } from '../models/ITask';
import { BiCard } from 'react-icons/bi'; 
import {useUpdateTaskMutation} from '../services/TaskService';
interface TaskModalProps {
  onClose: () => void;
  task: ITask;
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose, task }) => {

    const [editMode, setEditMode] = useState(false);
    const [taskName, setTaskName] = useState(task.name);
    const [updateTask, {}] = useUpdateTaskMutation();

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose(); 
    }
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleTaskNameClick = () => {
    setEditMode(true);
  };

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };
  
  const handleTaskNameBlur = () => {

    setEditMode(false);

  };


  return (
    <div 
    onClick={onClose}
    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
   

   <div 
    onClick={handleModalClick}
    className="bg-slate-200 rounded-lg w-5/12 h-5/6 p-8 ">



{editMode ? (
  <div className="flex items-center"> {/* Wrap icon and input field in a flex container */}
    <BiCard className="mr-2 h-6 w-6" />
    <input
      type="text"
      className="text-2xl font-bold w-full"
      value={taskName}
      onChange={handleTaskNameChange}
      onBlur={handleTaskNameBlur}
      autoFocus 
    />
  </div>
) : (
  <div onClick={handleTaskNameClick} className="flex items-center cursor-pointer">
    <BiCard className="mr-2 h-6 w-6" />
    <h2 className="text-2xl font-bold">{taskName}</h2>
  </div>
)}




  <div className="modal-body flex">
    <div className="w-1/2 pr-4">
      <div>Placeholder 1</div>
      <div>
        <h3 className="text-lg font-bold mb-2">Description</h3>
        {/* Add/change description input */}
      </div>
    </div>
    <div className="w-1/2">
      <div>
        <h3 className="text-lg font-bold mb-2">Header 1</h3>
        <div>Text for Header 1</div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Header 2</h3>
        <div>Text for Header 2</div>
      </div>
    </div>
  </div>
  <button className="modal-close bg-blue-500 text-white px-4 py-2 rounded-lg mt-4" onClick={onClose}>Close</button>
</div>



    </div>
  );
}

export default TaskModal;

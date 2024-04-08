import React, { useState } from 'react';
import { ITask } from '../models/ITask';
import '../styles/taskItem.css';
import { useFetchListsQuery } from '../services/ListService';
import { useParams } from 'react-router-dom';
import TaskModal from './taskModal';

interface TaskItemProps {
  task: ITask;
  remove: (task: ITask) => void;
  update: (task: ITask) => void;
  move: (listId: number, taskId: number, newTaskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, remove, update, move }) => {
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const { yourArg } = useParams<{ yourArg?: string }>();
  const boardId = yourArg ? parseInt(yourArg, 10) : undefined;

  if (boardId === undefined) {
    throw new Error('boardId is undefined');
  }

  const handleEditClick1 = () => {
    setShowModal(true); // Show the modal when the div is clicked
  };

  const handleRemove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (task.id !== undefined) {
      remove(task);
    } else {
      console.error('ID is undefined');
    }
  };

  return (
    <>
      {showModal && (
  <TaskModal
   onClose={() => setShowModal(false)} 
    task={task}
  
   />
)}

      <div
        className="w-11/12 h-full flex rounded-md items-center p-2 text-sm bg-white cursor-pointer duration-300 hover:border-blue-600 border"
        onClick={handleEditClick1}
      >
        <a className="text-gray-800 font-medium truncate whitespace-no-wrap">
          {task.name}
        </a>
      </div>
    </>
  );
};

export default TaskItem;

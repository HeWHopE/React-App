import React from 'react';
import { taskApi } from '../services/TaskService';
import TaskItem from './taskItem';
import { ITask } from '../models/ITask';

interface TaskListProps {
    listId?: number; 
}

const TaskList: React.FC<TaskListProps> = ({ listId }) => {

    if (listId === undefined) {
        return <div>List ID not provided</div>;
    }

    const { data: tasks, error: taskError, isLoading: taskIsLoading } = taskApi.useFetchTasksQuery(listId);
    
    const [deleteTask, {}] = taskApi.useDeleteTaskMutation();

    const handleRemove = (task: ITask) => {
        deleteTask({ taskId: Number(task.id), listId }); 
    };
    
    const [updateTask, {}] = taskApi.useUpdateTaskMutation();

    const handleUpdate = (task: ITask) => {
     
        updateTask({taskId: Number(task.id), listId, task}); 
    };

    return (
        <div>
            {taskIsLoading && <div>Loading tasks...</div>}
            {taskError && <div>Error fetching tasks</div>}
            {tasks && tasks.map((task: ITask) => (
                <TaskItem remove={handleRemove} update={handleUpdate} key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;


import React from 'react';
import { BsArrowClockwise, BsPlus } from 'react-icons/bs';
import '../styles/myButtons.css';
import { usePostListMutation } from '../services/ListService';

interface MyButtons {
    text?: string; 
}

const MyButtons: React.FC<MyButtons> = () => {

    const [createList] = usePostListMutation();
    const handleCreate = async () => {
        const name = prompt('Enter list name');
        if (name !== null) {
            await createList({ name });
        }
    };

return (
    <div className="button-container">
                <button className="history-button">
                    <BsArrowClockwise className="history-icon" />
                    <div className="history-text">History</div>
                </button>
                <button className="create-list-button" onClick={handleCreate}>
                    <BsPlus className="create-list-icon" />
                    <div className="create-list-text">Create List</div>
                </button>
            </div>
)

}


export default MyButtons;
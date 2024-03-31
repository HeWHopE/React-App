
import React from 'react';
import { BsArrowClockwise, BsPlus } from 'react-icons/bs';
import '../styles/createListButton.css';
import { usePostListMutation } from '../services/ListService';

interface CreateListButton {
    text?: string; 
}

const CreateListButton: React.FC<CreateListButton> = () => {

    const [createList] = usePostListMutation();
    const handleCreate = async () => {
        const name = prompt('Enter list name');
        if (name !== null) {
            await createList({ name });
        }
    };

return (
    <div className="button-container">
                 <button className="create-list-button" onClick={handleCreate}>
                    <BsPlus className="create-list-icon" />
                    <div className="create-list-text">Create List</div>
                </button>
            </div>
)

}


export default CreateListButton;
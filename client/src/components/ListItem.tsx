import React, {useState, useEffect} from 'react';
import { IList } from '../models/IList';
import '../styles/listItem.css';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { BsFillTrash3Fill } from "react-icons/bs";

interface ListItemProps {
  list: IList;
  remove: (list: IList) => void;
  update: (list: IList) => void;
}

const ListItem: React.FC<ListItemProps> = ({ list, remove, update }) => {

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleRemove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (list.id !== undefined) {
      remove(list);
    } else {
      console.error('ID is undefined');
    }
  };

  const handleUpdate = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const name = prompt() || '';

    if (list.id !== undefined) {
      update({...list, name: name});
      togglePopup();
    } else {
      console.error('ID is undefined');
      togglePopup();
    }
  };

  return (
   
    <div className="list-item">
      <span className="list-item-name">{list.name}</span>
      <div className="list-item-dots" onClick={togglePopup}>
        <BsThreeDotsVertical />
      </div>
      {showPopup && (
        <div className="popup">
          {/* Mini output content here */}
          <div className='Edit' onClick={handleUpdate}><FiEdit />Edit</div>
          <div className='Add-new-card'> <FiPlus/> Add new card</div>
          <div className='Delete' onClick={handleRemove}> <BsFillTrash3Fill/>Delete</div>
        </div>
      )}
        
    </div>
    
  );
  
}


export default ListItem;

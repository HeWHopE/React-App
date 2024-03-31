import React, {useEffect, useState} from 'react';
import '../styles/historyModal.css';
import { useFetchActivityQuery } from '../services/ActivityService';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities?: any[];
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, activities }) => {

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hour >= 12 ? 'pm' : 'am';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}`;
  };

  return (
    <div className={`history-modal ${isOpen ? 'open' : ''}`}>
       <nav className="history-navbar">
          <h2>History</h2>
          <button onClick={onClose}>X</button>
        </nav>
      <div className="history-modal-content">
     
        <div className="history-list">
          {activities && activities.map((activity) => (
            <div key={activity.id} className="history-item">
              <div className="history-item-details">
                
                
              </div>
              <ul className="history-item-list">
                
                <li><div>{activity.action_description}</div></li>
                <div>{formatDate(activity.timestamp.toLocaleString())} at {formatTime(activity.timestamp.toLocaleString())}</div>
                
              </ul>
            </div>
          ))}
        </div>
       
      </div>
    </div>
  );
};

export default HistoryModal;

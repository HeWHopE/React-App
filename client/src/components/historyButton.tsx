import React, { useState } from 'react';
import { BsArrowClockwise } from 'react-icons/bs';
import '../styles/historyButton.css';

interface HistoryButtonProps {
    onClick: () => void;
}

const HistoryButton: React.FC<HistoryButtonProps> = ({ onClick}) => {

    return (
        <div className="button-container">
            <button className="history-button" onClick={onClick}>
                <BsArrowClockwise className="history-icon" />
                <div className="history-text">History</div>
            </button>
           
        </div>
    );
}

export default HistoryButton;

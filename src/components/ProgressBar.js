import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${Math.min(progress, 100)}%` }}
        >
          <div className="progress-shine"></div>
        </div>
      </div>
      <div className="progress-text">
        {Math.round(progress)}% Complete
      </div>
    </div>
  );
};

export default ProgressBar;
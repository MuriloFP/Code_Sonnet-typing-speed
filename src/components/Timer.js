import React from 'react';
import './Timer.css';

const Timer = ({ timeElapsed, isActive }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`timer ${isActive ? 'active' : ''}`}>
      <div className="timer-icon">⏱️</div>
      <div className="timer-value">{formatTime(timeElapsed)}</div>
      <div className="timer-label">Time</div>
    </div>
  );
};

export default Timer;
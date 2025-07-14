import React from 'react';
import './Stats.css';

const Stats = ({ wpm, accuracy }) => {
  return (
    <div className="stats">
      <div className="stat-item">
        <div className="stat-value">{wpm}</div>
        <div className="stat-label">WPM</div>
      </div>
      <div className="stat-divider"></div>
      <div className="stat-item">
        <div className="stat-value">{accuracy}%</div>
        <div className="stat-label">Accuracy</div>
      </div>
    </div>
  );
};

export default Stats;
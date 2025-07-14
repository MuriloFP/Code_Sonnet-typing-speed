import React, { useEffect, useState } from 'react';
import './CompletionModal.css';

const CompletionModal = ({ wpm, accuracy, timeElapsed, onClose, onRestart }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [performance, setPerformance] = useState('');

  useEffect(() => {
    // Determine performance level and show confetti for high scores
    if (wpm >= 60 && accuracy >= 95) {
      setPerformance('Excellent!');
      setShowConfetti(true);
    } else if (wpm >= 40 && accuracy >= 90) {
      setPerformance('Great Job!');
      setShowConfetti(true);
    } else if (wpm >= 25 && accuracy >= 85) {
      setPerformance('Good Work!');
    } else {
      setPerformance('Keep Practicing!');
    }
  }, [wpm, accuracy]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceColor = () => {
    if (wpm >= 60 && accuracy >= 95) return '#4CAF50';
    if (wpm >= 40 && accuracy >= 90) return '#2196F3';
    if (wpm >= 25 && accuracy >= 85) return '#FF9800';
    return '#9E9E9E';
  };

  const createConfetti = () => {
    const confettiElements = [];
    for (let i = 0; i < 50; i++) {
      confettiElements.push(
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
          }}
        />
      );
    }
    return confettiElements;
  };

  return (
    <div className="modal-overlay">
      <div className="completion-modal">
        {showConfetti && (
          <div className="confetti-container">
            {createConfetti()}
          </div>
        )}
        
        <div className="modal-header">
          <h2 style={{ color: getPerformanceColor() }}>{performance}</h2>
          <div className="trophy-icon">🏆</div>
        </div>

        <div className="results-grid">
          <div className="result-item">
            <div className="result-value" style={{ color: '#4CAF50' }}>
              {wpm}
            </div>
            <div className="result-label">Words Per Minute</div>
          </div>

          <div className="result-item">
            <div className="result-value" style={{ color: '#2196F3' }}>
              {accuracy}%
            </div>
            <div className="result-label">Accuracy</div>
          </div>

          <div className="result-item">
            <div className="result-value" style={{ color: '#FF9800' }}>
              {formatTime(timeElapsed)}
            </div>
            <div className="result-label">Time Taken</div>
          </div>
        </div>

        <div className="performance-message">
          {wpm >= 60 && accuracy >= 95 && (
            <p>🌟 Outstanding performance! You're a typing master!</p>
          )}
          {wpm >= 40 && accuracy >= 90 && wpm < 60 && (
            <p>🎉 Excellent work! You're well above average!</p>
          )}
          {wpm >= 25 && accuracy >= 85 && wpm < 40 && (
            <p>👍 Good job! Keep practicing to improve further!</p>
          )}
          {(wpm < 25 || accuracy < 85) && (
            <p>💪 Practice makes perfect! Try again to improve your score!</p>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onRestart}>
            Try Again
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;
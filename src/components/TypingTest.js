import React, { useRef, useEffect } from 'react';
import './TypingTest.css';

const TypingTest = ({ passage, userInput, onInputChange, isActive, currentIndex }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Prevent typing beyond the passage length
    if (value.length <= passage.length) {
      onInputChange(value);
    }
  };

  const renderPassage = () => {
    return passage.split('').map((char, index) => {
      let className = 'char';
      
      if (index < userInput.length) {
        // Character has been typed
        if (userInput[index] === char) {
          className += ' correct';
        } else {
          className += ' incorrect';
        }
      } else if (index === currentIndex) {
        // Current character to type
        className += ' current';
      } else {
        // Not yet typed
        className += ' pending';
      }

      return (
        <span key={index} className={className}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div className="typing-test">
      <div className="passage-container">
        <div className="passage-text">
          {renderPassage()}
        </div>
      </div>
      
      <div className="input-container">
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          placeholder={isActive ? "Start typing..." : "Click 'Start Test' to begin"}
          disabled={!isActive}
          className="typing-input"
          rows={4}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
    </div>
  );
};

export default TypingTest;
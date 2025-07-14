import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import TypingTest from './components/TypingTest';
import Stats from './components/Stats';
import Timer from './components/Timer';
import ProgressBar from './components/ProgressBar';
import CompletionModal from './components/CompletionModal';

const samplePassages = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is commonly used for typing practice.",
  "Technology has revolutionized the way we communicate, work, and live. From smartphones to artificial intelligence, innovation continues to shape our future.",
  "Reading is to the mind what exercise is to the body. It strengthens our cognitive abilities and expands our understanding of the world around us.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. Persistence and determination are key to achieving our goals.",
  "The art of programming requires patience, logic, and creativity. Each line of code is a step toward solving complex problems and building amazing applications."
];

function App() {
  const [currentPassage, setCurrentPassage] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Initialize with a random passage
    const randomIndex = Math.floor(Math.random() * samplePassages.length);
    setCurrentPassage(samplePassages[randomIndex]);
  }, []);

  useEffect(() => {
    if (isActive && !isCompleted) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isCompleted]);

  const startTest = () => {
    setStartTime(Date.now());
    setIsActive(true);
    setIsCompleted(false);
    setUserInput('');
    setTimeElapsed(0);
    setCurrentIndex(0);
    setShowModal(false);
  };

  const resetTest = () => {
    setIsActive(false);
    setIsCompleted(false);
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setTimeElapsed(0);
    setCurrentIndex(0);
    setWpm(0);
    setAccuracy(100);
    setShowModal(false);
    
    // Get new random passage
    const randomIndex = Math.floor(Math.random() * samplePassages.length);
    setCurrentPassage(samplePassages[randomIndex]);
  };

  const calculateStats = (input, passage) => {
    if (!startTime || input.length === 0) return;

    const timeInMinutes = (Date.now() - startTime) / 60000;
    const wordsTyped = input.trim().split(' ').length;
    const currentWpm = Math.round(wordsTyped / timeInMinutes) || 0;

    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === passage[i]) {
        correctChars++;
      }
    }
    const currentAccuracy = input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100;

    setWpm(currentWpm);
    setAccuracy(currentAccuracy);
  };

  const handleInputChange = (input) => {
    if (!isActive) return;

    setUserInput(input);
    setCurrentIndex(input.length);
    calculateStats(input, currentPassage);

    // Check if test is completed
    if (input === currentPassage) {
      setIsCompleted(true);
      setIsActive(false);
      setEndTime(Date.now());
      setShowModal(true);
    }
  };

  const progress = currentPassage ? (userInput.length / currentPassage.length) * 100 : 0;

  return (
    <div className="App">
      <header className="app-header">
        <h1>Typing Speed Test</h1>
        <p>Test your typing speed and accuracy</p>
      </header>

      <main className="app-main">
        <div className="stats-container">
          <Stats wpm={wpm} accuracy={accuracy} />
          <Timer timeElapsed={timeElapsed} isActive={isActive} />
        </div>

        <ProgressBar progress={progress} />

        <TypingTest
          passage={currentPassage}
          userInput={userInput}
          onInputChange={handleInputChange}
          isActive={isActive}
          currentIndex={currentIndex}
        />

        <div className="controls">
          {!isActive && !isCompleted && (
            <button className="btn btn-primary" onClick={startTest}>
              Start Test
            </button>
          )}
          {(isActive || isCompleted) && (
            <button className="btn btn-secondary" onClick={resetTest}>
              Reset Test
            </button>
          )}
        </div>
      </main>

      {showModal && (
        <CompletionModal
          wpm={wpm}
          accuracy={accuracy}
          timeElapsed={timeElapsed}
          onClose={() => setShowModal(false)}
          onRestart={resetTest}
        />
      )}
    </div>
  );
}

export default App;
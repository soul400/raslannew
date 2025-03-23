'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NumberGrid from '../components/NumberGrid';
import ParticipantBox from '../components/ParticipantBox';
import QuestionCard from '../components/QuestionCard';
import AnswerCard from '../components/AnswerCard';
import Timer from '../components/Timer';
import ParticipantSelector from '../components/ParticipantSelector';
import Link from 'next/link';

// Define game states
type GameState = 'main' | 'question' | 'answer' | 'selectParticipant';

interface Participant {
  name: string;
  score: number;
}

export default function GamePage() {
  // Game state
  const [gameState, setGameState] = useState<GameState>('main');
  
  // State for disabled numbers (already selected)
  const [disabledNumbers, setDisabledNumbers] = useState<number[]>([]);
  
  // State for participants
  const [participants, setParticipants] = useState<Participant[]>([
    { name: 'المتسابق 1', score: 0 },
    { name: 'المتسابق 2', score: 0 },
    { name: 'المتسابق 3', score: 0 },
    { name: 'المتسابق 4', score: 0 },
    { name: 'المتسابق 5', score: 0 },
    { name: 'المتسابق 6', score: 0 },
    { name: 'المتسابق 7', score: 0 },
    { name: 'المتسابق 8', score: 0 },
  ]);
  
  // State for editing participant name
  const [editingParticipant, setEditingParticipant] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>('');
  
  // State for current question
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  
  // Animation state
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [animationType, setAnimationType] = useState<'correct' | 'wrong' | null>(null);
  
  // Audio refs
  const correctAudioRef = useRef<HTMLAudioElement>(null);
  const wrongAudioRef = useRef<HTMLAudioElement>(null);
  const tickAudioRef = useRef<HTMLAudioElement>(null);
  const selectAudioRef = useRef<HTMLAudioElement>(null);
  
  // Play sounds
  const playCorrectSound = () => {
    if (correctAudioRef.current) {
      correctAudioRef.current.currentTime = 0;
      correctAudioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
  };
  
  const playWrongSound = () => {
    if (wrongAudioRef.current) {
      wrongAudioRef.current.currentTime = 0;
      wrongAudioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
  };
  
  const playTickSound = () => {
    if (tickAudioRef.current) {
      tickAudioRef.current.currentTime = 0;
      tickAudioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
  };
  
  const playSelectSound = () => {
    if (selectAudioRef.current) {
      selectAudioRef.current.currentTime = 0;
      selectAudioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
  };
  
  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (timerRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft <= 5) {
          playTickSound(); // Play tick sound for last 5 seconds
        }
      }, 1000);
    } else if (timerRunning && timeLeft === 0) {
      // Time's up
      setTimerRunning(false);
      // Optionally play a sound or show a message
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timerRunning, timeLeft]);
  
  // Handle number click
  const handleNumberClick = (number: number) => {
    playSelectSound();
    setCurrentNumber(number);
    setGameState('question');
    setTimeLeft(15);
    setTimerRunning(true);
  };
  
  // Handle show answer
  const handleShowAnswer = () => {
    setTimerRunning(false);
    setGameState('answer');
  };
  
  // Handle correct answer
  const handleCorrectAnswer = () => {
    playCorrectSound();
    setAnimationType('correct');
    setShowAnimation(true);
    
    // After animation completes, move to participant selection
    setTimeout(() => {
      setShowAnimation(false);
      setGameState('selectParticipant');
    }, 2000);
  };
  
  // Handle wrong answer
  const handleWrongAnswer = () => {
    playWrongSound();
    setAnimationType('wrong');
    setShowAnimation(true);
    
    // After animation completes, return to main screen
    setTimeout(() => {
      setShowAnimation(false);
      // Return to main screen and disable the number
      if (currentNumber !== null) {
        setDisabledNumbers([...disabledNumbers, currentNumber]);
      }
      setGameState('main');
    }, 2000);
  };
  
  // Handle participant selection
  const handleParticipantSelect = (participantName: string) => {
    playSelectSound();
    const index = participants.findIndex(p => p.name === participantName);
    if (index !== -1) {
      const newParticipants = [...participants];
      newParticipants[index].score += 10;
      setParticipants(newParticipants);
    }
    
    // Return to main screen and disable the number
    if (currentNumber !== null) {
      setDisabledNumbers([...disabledNumbers, currentNumber]);
    }
    setGameState('main');
  };
  
  // Handle score change
  const handleScoreChange = (index: number, newScore: number) => {
    playSelectSound();
    const newParticipants = [...participants];
    newParticipants[index].score = newScore;
    setParticipants(newParticipants);
  };
  
  // Handle edit participant name
  const startEditName = (index: number) => {
    setEditingParticipant(index);
    setEditName(participants[index].name);
  };
  
  const saveParticipantName = () => {
    if (editingParticipant !== null) {
      const newParticipants = [...participants];
      newParticipants[editingParticipant].name = editName;
      setParticipants(newParticipants);
      setEditingParticipant(null);
    }
  };
  
  // Animation overlay
  const renderAnimationOverlay = () => {
    if (!showAnimation) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-16 rounded-full ${animationType === 'correct' ? 'bg-correct-answer' : 'bg-wrong-answer'}`}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: 1 }}
            className="text-6xl text-white"
          >
            {animationType === 'correct' ? '✓' : '✗'}
          </motion.div>
        </motion.div>
      </div>
    );
  };
  
  // Render based on game state
  if (gameState === 'question') {
    return (
      <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center">
        <AnimatePresence>
          {showAnimation && renderAnimationOverlay()}
        </AnimatePresence>
        
        <div className="absolute top-4 right-4">
          <motion.div
            animate={timeLeft <= 5 ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
          >
            <Timer seconds={timeLeft} isRunning={timerRunning} />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <QuestionCard 
            imageSrc={`/questions/${currentNumber}.png`} 
            onShowAnswer={handleShowAnswer} 
          />
        </motion.div>
      </div>
    );
  }
  
  if (gameState === 'answer') {
    return (
      <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center">
        <AnimatePresence>
          {showAnimation && renderAnimationOverlay()}
        </AnimatePresence>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <AnswerCard 
            imageSrc={`/answers/${currentNumber}.png`} 
            onCorrect={handleCorrectAnswer}
            onWrong={handleWrongAnswer}
          />
        </motion.div>
      </div>
    );
  }
  
  if (gameState === 'selectParticipant') {
    return (
      <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <ParticipantSelector 
            participants={participants.map(p => p.name)} 
            onSelect={handleParticipantSelect} 
          />
        </motion.div>
      </div>
    );
  }
  
  // Main game interface
  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Hidden audio elements */}
      <audio ref={correctAudioRef} src="/sounds/correct.mp3" preload="auto" />
      <audio ref={wrongAudioRef} src="/sounds/wrong.mp3" preload="auto" />
      <audio ref={tickAudioRef} src="/sounds/tick.mp3" preload="auto" />
      <audio ref={selectAudioRef} src="/sounds/select.mp3" preload="auto" />
      
      <div className="flex justify-between items-center mb-8">
        <Link 
          href="/"
          className="bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 rounded-md py-2 px-4"
        >
          العودة للرئيسية
        </Link>
        
        <motion.h1 
          className="text-center text-3xl md:text-4xl font-bold text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          مسابقة رسلان و المهرة الرمضانية
        </motion.h1>
        
        <div className="w-24"></div> {/* Spacer for alignment */}
      </div>
      
      {/* Main 80-number grid */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-4 text-center">لوحة الأرقام الرئيسية</h2>
        <NumberGrid 
          count={80} 
          startFrom={1} 
          onNumberClick={handleNumberClick} 
          disabledNumbers={disabledNumbers}
          gridCols={10}
          className="grid-cols-10 md:grid-cols-10"
        />
      </motion.div>
      
      {/* Secondary 20-number grid */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold mb-4 text-center">لوحة الأرقام الثانوية</h2>
        <NumberGrid 
          count={20} 
          startFrom={1} 
          onNumberClick={handleNumberClick} 
          disabledNumbers={disabledNumbers}
          gridCols={10}
          className="grid-cols-10 md:grid-cols-10"
        />
      </motion.div>
      
      {/* Participants section */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-xl font-bold mb-4 text-center">المتسابقون</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {participants.map((participant, index) => (
            <motion.div 
              key={index} 
              className="relative"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              {editingParticipant === index ? (
                <div className="participant-box">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-secondary border border-primary rounded-md p-2 mb-2 w-full text-foreground"
                  />
                  <button 
                    onClick={saveParticipantName}
                    className="bg-primary text-primary-foreground rounded-md py-1 px-2 text-sm"
                  >
                    حفظ
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <button 
                    className="absolute top-2 right-2 text-xs bg-secondary hover:bg-primary hover:text-primary-foreground p-1 rounded-md"
                    onClick={() => startEditName(index)}
                  >
                    تعديل
                  </button>
                  <ParticipantBox
                    name={participant.name}
                    score={participant.score}
                    onScoreChange={(newScore) => handleScoreChange(index, newScore)}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}

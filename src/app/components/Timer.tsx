import React from 'react';

interface TimerProps {
  seconds: number;
  isRunning: boolean;
}

const Timer: React.FC<TimerProps> = ({ seconds, isRunning }) => {
  return (
    <div className="timer-circle">
      <span>{seconds}</span>
    </div>
  );
};

export default Timer;

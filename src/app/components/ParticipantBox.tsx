import React from 'react';

interface ParticipantBoxProps {
  name: string;
  score: number;
  onScoreChange: (newScore: number) => void;
}

const ParticipantBox: React.FC<ParticipantBoxProps> = ({
  name,
  score,
  onScoreChange
}) => {
  const handleIncrement = () => {
    onScoreChange(score + 10);
  };

  const handleDecrement = () => {
    onScoreChange(score - 10);
  };

  return (
    <div className="participant-box">
      <div className="participant-name">{name}</div>
      <div className="score-box">
        <div className="score-value">{score}</div>
        <div className="score-controls">
          <button 
            className="score-button" 
            onClick={handleDecrement}
            aria-label="نقص النقاط"
          >
            -
          </button>
          <button 
            className="score-button" 
            onClick={handleIncrement}
            aria-label="زيادة النقاط"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantBox;

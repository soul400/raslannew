import React from 'react';

interface AnswerCardProps {
  imageSrc: string;
  onCorrect: () => void;
  onWrong: () => void;
}

const AnswerCard: React.FC<AnswerCardProps> = ({
  imageSrc,
  onCorrect,
  onWrong
}) => {
  return (
    <div className="question-card">
      <div className="w-full h-64 md:h-96 relative mb-4">
        <img 
          src={imageSrc} 
          alt="إجابة المسابقة" 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex gap-4 mt-4">
        <button 
          className="correct-button"
          onClick={onCorrect}
        >
          إجابة صحيحة
        </button>
        <button 
          className="wrong-button"
          onClick={onWrong}
        >
          إجابة خاطئة
        </button>
      </div>
    </div>
  );
};

export default AnswerCard;

import React from 'react';

interface QuestionCardProps {
  imageSrc: string;
  onShowAnswer: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  imageSrc,
  onShowAnswer
}) => {
  return (
    <div className="question-card">
      <div className="w-full h-64 md:h-96 relative mb-4">
        <img 
          src={imageSrc} 
          alt="سؤال المسابقة" 
          className="w-full h-full object-contain"
        />
      </div>
      <button 
        className="answer-button mt-4"
        onClick={onShowAnswer}
      >
        إظهار الإجابة
      </button>
    </div>
  );
};

export default QuestionCard;

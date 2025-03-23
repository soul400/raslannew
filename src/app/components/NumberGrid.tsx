import React from 'react';

interface NumberGridProps {
  count: number;
  startFrom: number;
  onNumberClick: (number: number) => void;
  disabledNumbers: number[];
  className?: string;
  gridCols?: number;
}

const NumberGrid: React.FC<NumberGridProps> = ({
  count,
  startFrom,
  onNumberClick,
  disabledNumbers,
  className = '',
  gridCols = 10
}) => {
  const numbers = Array.from({ length: count }, (_, i) => startFrom + i);
  
  return (
    <div className={`number-grid grid-cols-${gridCols} ${className}`}>
      {numbers.map((number) => {
        const isDisabled = disabledNumbers.includes(number);
        return (
          <div
            key={number}
            className={`number-box ${isDisabled ? 'number-box-disabled' : ''} aspect-square`}
            onClick={() => !isDisabled && onNumberClick(number)}
          >
            {!isDisabled ? number : ''}
          </div>
        );
      })}
    </div>
  );
};

export default NumberGrid;

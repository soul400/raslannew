import React from 'react';

interface ParticipantSelectorProps {
  participants: string[];
  onSelect: (participantName: string) => void;
}

const ParticipantSelector: React.FC<ParticipantSelectorProps> = ({
  participants,
  onSelect
}) => {
  return (
    <div className="bg-card border-2 border-primary rounded-lg p-4">
      <h3 className="text-lg font-bold text-center mb-4">اختر المتسابق</h3>
      <div className="grid grid-cols-2 gap-3">
        {participants.map((name, index) => (
          <button
            key={index}
            className="bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 border border-primary rounded-md py-2 px-3 text-center"
            onClick={() => onSelect(name)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ParticipantSelector;

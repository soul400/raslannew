'use client';

import React, { useRef } from 'react';

interface SoundPlayerProps {
  correctSoundSrc: string;
  wrongSoundSrc: string;
}

const SoundPlayer: React.FC<SoundPlayerProps> = ({
  correctSoundSrc,
  wrongSoundSrc
}) => {
  const correctAudioRef = useRef<HTMLAudioElement>(null);
  const wrongAudioRef = useRef<HTMLAudioElement>(null);

  // These methods will be called from parent components
  const playCorrectSound = () => {
    if (correctAudioRef.current) {
      correctAudioRef.current.currentTime = 0;
      correctAudioRef.current.play();
    }
  };

  const playWrongSound = () => {
    if (wrongAudioRef.current) {
      wrongAudioRef.current.currentTime = 0;
      wrongAudioRef.current.play();
    }
  };

  // Expose methods to parent via React.forwardRef if needed
  React.useImperativeHandle(
    React.forwardRef((props, ref) => ref),
    () => ({
      playCorrectSound,
      playWrongSound
    })
  );

  return (
    <div className="hidden">
      <audio ref={correctAudioRef} src={correctSoundSrc} preload="auto" />
      <audio ref={wrongAudioRef} src={wrongSoundSrc} preload="auto" />
    </div>
  );
};

export default SoundPlayer;

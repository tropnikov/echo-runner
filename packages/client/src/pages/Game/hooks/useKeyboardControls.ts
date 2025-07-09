import { useEffect } from 'react';

export const useKeyboardControls = ({
  isActive = true,
  onJump,
  onPause,
}: {
  isActive?: boolean;
  onJump: () => void;
  onPause: () => void;
}) => {
  useEffect(() => {
    if (!isActive) return;

    const handleKeys = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Space':
          onJump();
          break;
        case 'KeyP':
          onPause();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeys);

    return () => window.removeEventListener('keydown', handleKeys);
  }, [onJump, onPause, isActive]);
};

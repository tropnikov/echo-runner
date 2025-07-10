import { useCallback, useEffect } from 'react';

export const useKeyboardControls = ({
  isActive = true,
  onJump,
  onPause,
}: {
  isActive?: boolean;
  onJump: () => void;
  onPause: () => void;
}) => {
  const handleKeys = useCallback(
    (e: KeyboardEvent) => {
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
    },
    [onJump, onPause],
  );

  useEffect(() => {
    if (!isActive) return;

    window.addEventListener('keydown', handleKeys);

    return () => window.removeEventListener('keydown', handleKeys);
  }, [handleKeys, isActive]);
};

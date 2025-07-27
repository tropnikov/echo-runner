import { useCallback, useEffect, useRef, useState } from 'react';

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const isSupported = Boolean(document.fullscreenEnabled);

  const enterFullscreen = useCallback(() => {
    const element = elementRef.current;

    if (!element || !isSupported) return;

    if (element.requestFullscreen) {
      element.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    }
  }, [isSupported]);

  const exitFullscreen = useCallback(() => {
    if (!isSupported) return;

    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  }, [isSupported]);

  const toggleFullscreen = useCallback(() => {
    isFullscreen ? exitFullscreen() : enterFullscreen();
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  useEffect(() => {
    if (!isSupported) return;

    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isSupported]);

  return { elementRef, isFullscreen, enterFullscreen, exitFullscreen, toggleFullscreen };
}

import { useCallback, useEffect, useRef, useState } from 'react';

import { DocumentWithFullscreen } from '@/types/DocumentWithFullscreen';
import { FullscreenHMLElement } from '@/types/FullscreenHTMLElement';

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const fullscreenDocument = document as DocumentWithFullscreen;

  const isSupported = Boolean(
    fullscreenDocument.fullscreenEnabled ||
      fullscreenDocument.webkitFullscreenEnabled ||
      fullscreenDocument.mozFullScreenEnabled ||
      fullscreenDocument.msFullscreenEnabled,
  );

  const enableFullscreenState = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const disableFullscreenState = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const enterFullscreen = useCallback(() => {
    const element = elementRef.current as FullscreenHMLElement;

    if (!element || !isSupported) return;

    if (element.requestFullscreen) {
      element.requestFullscreen().then(enableFullscreenState);
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen().then(enableFullscreenState);
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen().then(enableFullscreenState);
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen().then(enableFullscreenState);
    }
  }, [isSupported, enableFullscreenState]);

  const exitFullscreen = useCallback(() => {
    if (!isSupported) return;

    const fullscreenDocument = document as DocumentWithFullscreen;

    if (fullscreenDocument.exitFullscreen) {
      fullscreenDocument.exitFullscreen().then(disableFullscreenState);
    } else if (fullscreenDocument.msExitFullscreen) {
      fullscreenDocument.msExitFullscreen().then(disableFullscreenState);
    } else if (fullscreenDocument.mozCancelFullScreen) {
      fullscreenDocument.mozCancelFullScreen().then(disableFullscreenState);
    } else if (fullscreenDocument.webkitExitFullscreen) {
      fullscreenDocument.webkitExitFullscreen().then(disableFullscreenState);
    }
  }, [isSupported, disableFullscreenState]);

  const toggleFullscreen = useCallback(() => {
    isFullscreen ? exitFullscreen() : enterFullscreen();
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  useEffect(() => {
    if (!isSupported) return;

    const fullscreenDocument = document as DocumentWithFullscreen;

    const handleFullscreenChange = () => {
      setIsFullscreen(
        Boolean(
          fullscreenDocument.fullscreenElement ||
            fullscreenDocument.webkitFullscreenElement ||
            fullscreenDocument.mozFullScreenElement ||
            fullscreenDocument.msFullscreenElement,
        ),
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [isSupported]);

  return { elementRef, isFullscreen, enterFullscreen, exitFullscreen, toggleFullscreen };
}

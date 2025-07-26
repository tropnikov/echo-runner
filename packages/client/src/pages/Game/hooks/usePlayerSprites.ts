import { useEffect, useState } from 'react';

import { mergeSpritesVertically } from '../helpers/mergeSpritesVertically';
import { loadSprites } from '../helpers/spriteLoader';
import { PlayerSpriteStates } from '../types';

/**
 * Создает fallback canvas для случаев, когда спрайты не загружены
 */
function createFallbackCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas;
}

/**
 * Хук для загрузки спрайтов игрока
 */
export function usePlayerSprites<T extends PlayerSpriteStates>(spriteConfig?: T) {
  const [sprite, setSprite] = useState<CanvasImageSource | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!spriteConfig) {
      setSprite(createFallbackCanvas());
      return;
    }

    const loadSpriteSheets = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Загружаем спрайты отдельно
        const [runningSprite, jumpingSprite] = await loadSprites([spriteConfig.running, spriteConfig.jumping]);

        // Создаем комбинированный спрайт-лист
        const canvas = mergeSpritesVertically([runningSprite, jumpingSprite]);

        setSprite(canvas);
      } catch (err) {
        console.warn('Ошибка загрузки спрайтов:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setSprite(createFallbackCanvas());
      } finally {
        setIsLoading(false);
      }
    };

    loadSpriteSheets();
  }, [spriteConfig]);

  return {
    sprite,
    isLoading,
    error,
  };
}

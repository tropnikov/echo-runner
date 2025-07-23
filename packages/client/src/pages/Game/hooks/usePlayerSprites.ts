import { useEffect, useState } from 'react';

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
        const runningWidth = runningSprite.width;
        const runningHeight = runningSprite.height;
        const jumpingWidth = jumpingSprite.width;
        const jumpingHeight = jumpingSprite.height;

        const combinedWidth = Math.max(runningWidth, jumpingWidth);
        const combinedHeight = runningHeight + jumpingHeight;
        const canvas = document.createElement('canvas');
        canvas.width = combinedWidth;
        canvas.height = combinedHeight;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          throw new Error('Не удается получить 2D контекст');
        }

        // Размещаем спрайт бега сверху
        ctx.drawImage(runningSprite, 0, 0);

        // Размещаем спрайт прыжка снизу
        ctx.drawImage(jumpingSprite, 0, runningHeight);

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
  }, [spriteConfig, spriteConfig?.running, spriteConfig?.jumping]);

  return {
    sprite,
    isLoading,
    error,
  };
}

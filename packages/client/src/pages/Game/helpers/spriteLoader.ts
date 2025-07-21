/**
 * Загружает изображение спрайта
 */
export async function loadSprite(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Не удалось загрузить спрайт: ${src}`));
    img.src = src;
  });
}

/**
 * Загружает несколько спрайтов параллельно
 */
export async function loadSprites(sources: string[]): Promise<HTMLImageElement[]> {
  const promises = sources.map((src) => loadSprite(src));
  return Promise.all(promises);
}

/**
 * Создаёт спрайт-лист из отдельных изображений состояний
 */
export function createSpriteSheet(
  sprites: Record<string, HTMLImageElement>,
  frameWidth = 32,
  frameHeight = 32,
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Невозможно получить 2D контекст из canvas');
  }

  const states = Object.keys(sprites);
  canvas.width = frameWidth * states.length;
  canvas.height = frameHeight;

  states.forEach((state, index) => {
    const sprite = sprites[state];
    ctx.drawImage(sprite, index * frameWidth, 0, frameWidth, frameHeight);
  });

  return canvas;
}

/**
 * Загружает и создаёт спрайт-лист для игрока
 */
export async function loadPlayerSpriteSheet(
  spritePaths: {
    running: string;
    jumping: string;
  },
  frameWidth = 32,
  frameHeight = 32,
): Promise<HTMLCanvasElement> {
  const [runningSprite, jumpingSprite] = await loadSprites([spritePaths.running, spritePaths.jumping]);

  return createSpriteSheet(
    {
      running: runningSprite,
      jumping: jumpingSprite,
    },
    frameWidth,
    frameHeight,
  );
}

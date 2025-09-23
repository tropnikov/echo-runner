export function mergeSpritesVertically(sprites: CanvasImageSource[]): HTMLCanvasElement {
  const width = Math.max(...sprites.map((sprite) => (sprite as HTMLImageElement).width));
  const height = sprites.reduce((sum, sprite) => sum + (sprite as HTMLImageElement).height, 0);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  if (!ctx) {
    throw new Error('Невозможно получить 2D контекст из canvas');
  }

  let offsetY = 0;

  for (const sprite of sprites) {
    ctx.drawImage(sprite, 0, offsetY);
    offsetY += (sprite as HTMLImageElement).height;
  }

  return canvas;
}

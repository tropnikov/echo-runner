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

import { SoundName } from './types';

/**
 * Класс звукового движка.
 *
 * Отвечает за управление звуками в игре.
 */
export class SoundEngine {
  private sounds: Map<SoundName, HTMLAudioElement>;
  private muted = false;

  constructor() {
    this.sounds = new Map();
  }

  addSound(name: SoundName, path: string) {
    if (this.sounds.has(name)) {
      return;
    }

    const audio = new Audio(path);
    this.sounds.set(name, audio);
  }

  private getSound(name: SoundName) {
    return this.sounds.get(name);
  }

  play(name: SoundName, loop = false) {
    const sound = this.getSound(name);

    if (!sound) {
      console.warn(`Звук ${name} не найден`);
      return;
    }

    sound.currentTime = 0;
    sound.loop = loop;
    sound.muted = this.muted;
    sound.play();
  }

  pause(name: SoundName) {
    const sound = this.getSound(name);

    if (!sound) {
      console.warn(`Звук ${name} не найден`);
      return;
    }

    sound.pause();
  }

  stop(name: SoundName) {
    const sound = this.getSound(name);

    if (!sound) {
      console.warn(`Звук ${name} не найден`);
      return;
    }

    sound.currentTime = 0;
    sound.pause();
  }

  playAll() {
    for (const sound of this.sounds.keys()) {
      this.play(sound);
    }
  }

  stopAll() {
    for (const sound of this.sounds.keys()) {
      this.stop(sound);
    }
  }

  setMute(value: boolean) {
    this.muted = value;

    for (const sound of this.sounds.values()) {
      sound.muted = value;
    }
  }

  /**
   * Полная очистка звукового движка.
   * Останавливает все звуки, очищает ресурсы и удаляет audio элементы.
   */
  destroy() {
    for (const [name, sound] of this.sounds.entries()) {
      // Останавливаем звук
      sound.pause();
      sound.currentTime = 0;

      // Удаляем источник
      sound.src = '';
      sound.removeAttribute('src');

      // Загружаем пустой звук для освобождения памяти
      sound.load();
    }

    // Очищаем коллекцию
    this.sounds.clear();
  }
}

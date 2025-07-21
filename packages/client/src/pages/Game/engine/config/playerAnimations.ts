import { AnimationConfig } from '../types';

/**
 * Состояния анимации игрока
 */
export enum PlayerAnimationState {
  RUNNING = 'running',
  JUMPING = 'jumping',
}

/**
 * Конфигурация анимаций для игрока
 */
export const playerAnimations: Record<PlayerAnimationState, AnimationConfig> = {
  [PlayerAnimationState.RUNNING]: {
    frames: [
      { x: 0, y: 0, width: 204, height: 258 },
      { x: 204, y: 0, width: 204, height: 258 },
      { x: 408, y: 0, width: 204, height: 258 },
      { x: 612, y: 0, width: 204, height: 258 },
      { x: 816, y: 0, width: 204, height: 258 },
      { x: 1020, y: 0, width: 204, height: 258 },
      { x: 1224, y: 0, width: 204, height: 258 },
      { x: 1428, y: 0, width: 204, height: 258 },
      { x: 1632, y: 0, width: 204, height: 258 },
      { x: 1836, y: 0, width: 204, height: 258 },
    ],
    frameRate: 6,
    loop: true,
  },
  [PlayerAnimationState.JUMPING]: {
    frames: [
      { x: 0, y: 258, width: 204, height: 273 },
      { x: 204, y: 258, width: 204, height: 273 },
      { x: 408, y: 258, width: 204, height: 273 },
      { x: 612, y: 258, width: 204, height: 273 },
      { x: 816, y: 258, width: 204, height: 273 },
      { x: 1020, y: 258, width: 204, height: 273 },
      { x: 1224, y: 258, width: 204, height: 273 },
      { x: 1428, y: 258, width: 204, height: 273 },
      { x: 1632, y: 258, width: 204, height: 273 },
      { x: 1836, y: 258, width: 204, height: 273 },
    ],
    frameRate: 8,
    loop: false,
  },
};

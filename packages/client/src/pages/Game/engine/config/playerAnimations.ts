import { generateFrames } from '../../helpers/generateFrames';
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
    frames: generateFrames({
      width: 204,
      height: 258,
      frames: 10,
    }),
    frameRate: 6,
    loop: true,
  },
  [PlayerAnimationState.JUMPING]: {
    frames: generateFrames({
      width: 204,
      height: 250,
      frames: 10,
    }),
    frameRate: 8,
    loop: false,
  },
};

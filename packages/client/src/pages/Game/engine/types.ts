export type Collision = {
  width: number;
  height: number;
  x: number;
  y: number;
  handled?: boolean;
};

export type SpriteFrame = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type AnimationConfig = {
  spriteSheet?: CanvasImageSource;
  frames: SpriteFrame[];
  frameRate: number;
  loop: boolean;
};

export type GenerateCollisionsParams = {
  minDistanceX: number;
  maxDistanceX: number;
  callback: (x: number) => void;
};

export enum ObjectEffectType {
  None = 'none',
  Score = 'score',
  Damage = 'damage',
}

export type GameConfig = {
  fps: number;
  initialSpeed: number;
  levelDuration: number;
  levelSpeedIncrement: number;
  player: {
    collisionSize: {
      width: number;
      height: number;
    };
    offset: {
      x: number;
      y: number;
    };
    gravity: number;
    jumpPower: number;
  };
  obstacles: {
    collisionSize: number;
    minDistanceX: number;
    maxDistanceX: number;
    offsetY: number;
  };
  coins: {
    collisionSize: number;
    minDistanceX: number;
    maxDistanceX: number;
    minDistanceY: number;
    maxDistanceY: number;
  };
};

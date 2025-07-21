export type PlayerSpriteStates = {
  running: string;
  jumping: string;
};

export type GameSetupParams = {
  handleOnScore: () => void;
  handleOnDamage: () => void;
  playerSprites?: PlayerSpriteStates;
};

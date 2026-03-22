export const GAME_CONFIG = {
  OBJECT_SIZE_PX: 85,
  FALL_SPEED_MIN: 0.8,
  FALL_SPEED_MAX: 1.5,
  REMOVE_DELAY_MS: 200,
  SPAWN_INTERVAL_MS: 800,
  INITIAL_POS_Y: -100,
  MESSAGES: {
    TITLE: 'PAGE NOT FOUND',
    INTERRUPTED: 'Your journey was interrupted...',
    SUBTITLE: 'Now you can rest and play a little',
  },
} as const;

export const GAME_ASSETS = {
  CAMEL: './camel-face.svg',
  JELLY: './jellyfish.svg',
} as const;

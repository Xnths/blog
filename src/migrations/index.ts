import * as migration_20260125_034751 from './20260125_034751';
import * as migration_20260125_183605 from './20260125_183605';

export const migrations = [
  {
    up: migration_20260125_034751.up,
    down: migration_20260125_034751.down,
    name: '20260125_034751',
  },
  {
    up: migration_20260125_183605.up,
    down: migration_20260125_183605.down,
    name: '20260125_183605'
  },
];

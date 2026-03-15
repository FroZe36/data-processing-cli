import { resolve } from 'node:path';

export const pathResolver = (cwd, ...paths) => {
  return resolve(cwd, ...paths);
};

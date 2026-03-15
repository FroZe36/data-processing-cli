import { dirname } from 'node:path';
import { stat, readdir } from 'node:fs/promises';
import { pathResolver } from './utils/pathResolver.mjs';

const navigation = {
  up: state => {
    const parentDir = dirname(state.currentDir);
    state.currentDir = parentDir === state.currentDir ? state.currentDir : parentDir;
  },
  cd: async (state, args) => {
    if (!args[0]) {
      throw 'Invalid input';
    }
    const newPath = pathResolver(state.currentDir, args[0]);
    try {
      const stats = await stat(newPath);

      if (!stats.isDirectory()) {
        throw 'Operation failed';
      }

      state.currentDir = newPath;
    } catch (error) {
      throw 'Operation failed';
    }
  },
  ls: async state => {
    const currentDir = state.currentDir;

    try {
      const items = await readdir(currentDir);
      const itemsWithDetails = [];

      for (const item of items) {
        const itemPath = pathResolver(currentDir, item);
        const stats = await stat(itemPath);
        itemsWithDetails.push({
          Name: item,
          Type: stats.isDirectory() ? 'folder' : 'file',
        });
      }
      itemsWithDetails.sort((a, b) => {
        if (a.Type === b.Type) {
          return a.Name.localeCompare(b.Name);
        }
        return a.Type === 'folder' ? -1 : 1;
      });

      for (const item of itemsWithDetails) {
        console.log(`${item.Name}  [${item.Type}]`);
      }
    } catch (error) {
      throw 'Operation failed';
    }
  },
};

export default navigation;

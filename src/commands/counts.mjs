import { createReadStream } from 'node:fs';
import { argParser } from '../utils/argParser.mjs';
import { pathResolver } from '../utils/pathResolver.mjs';

export const count = async (state, args) => {
  try {
    const { input } = argParser(args);
    if (!input) throw 'Operation failed';

    const inputPath = pathResolver(state.currentDir, input);

    let lines = 0;
    let words = 0;
    let chars = 0;

    const stream = createReadStream(inputPath, { encoding: 'utf8' });

    stream.on('data', chunk => {
      chars += chunk.length;
      lines += chunk.split(/\r?\n/).length - 1;
      words += chunk.split(/\s+/).filter(Boolean).length;
    });

    await new Promise((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', () => reject(new Error('Operation failed')));
    });

    console.log(`Lines: ${lines}\nWords: ${words}\nCharacters: ${chars}`);
  } catch {
    throw 'Operation failed';
  }
}
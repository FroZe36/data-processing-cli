import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';
import { argParser } from '../utils/argParser.mjs';
import { pathResolver } from '../utils/pathResolver.mjs';

export const jsonToCsv = async (state, args) => {
  try {
    const { input, output } = argParser(args);
    if (!input || !output) throw 'Operation failed';

    const inputPath = pathResolver(state.currentDir, input);
    const outputPath = pathResolver(state.currentDir, output);

    let buffer = '';

    const transformStream = new Transform({
      writableObjectMode: false,
      readableObjectMode: false,
      transform(chunk, _, callback) {
        buffer += chunk.toString();
        callback();
      },
      final(callback) {
        try {
          const jsonArray = JSON.parse(buffer);
          if (!Array.isArray(jsonArray)) throw new Error();

          const headers = Object.keys(jsonArray[0] || {});
          const csvLines = [
            headers.join(','),
            ...jsonArray.map(obj => headers.map(h => obj[h] ?? '').join(',')),
          ];

          this.push(csvLines.join('\n'));
          callback();
        } catch {
          callback(new Error('Operation failed'));
        }
      },
    });

    await pipeline(
      createReadStream(inputPath),
      transformStream,
      createWriteStream(outputPath),
    );
  } catch {
    console.log('Operation failed');
  }
};

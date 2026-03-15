import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';
import { argParser } from '../utils/argParser.mjs';
import { pathResolver } from '../utils/pathResolver.mjs';

export const csvToJson = async (state, args) => {
  try {
    const { input, output } = argParser(args);
    if (!input || !output) throw 'Operation failed';

    const inputPath = pathResolver(state.currentDir, input);
    const outputPath = pathResolver(state.currentDir, output);

    let headers = [];
    const objects = [];

    const transformStream = new Transform({
      writableObjectMode: false,
      readableObjectMode: true,
      transform(chunk, _, callback) {
        const lines = chunk.toString().split(/\r?\n/).filter(Boolean);

        for (const line of lines) {
          const cells = line.split(',');
          if (headers.length === 0) {
            headers = cells;
          } else {
            const obj = {};
            headers.forEach((h, i) => (obj[h] = cells[i] ?? ''));
            objects.push(obj);
          }
        }

        callback();
      },
      final(callback) {
        this.push(JSON.stringify(objects, null, 2));
        callback();
      },
    });

    await pipeline(
      createReadStream(inputPath),
      transformStream,
      createWriteStream(outputPath),
    );
  } catch {
    throw 'Operation failed';
  }
};

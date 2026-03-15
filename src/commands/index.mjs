import { count } from './counts.mjs';
import { csvToJson } from './csvToJson.mjs';
import { jsonToCsv } from './jsonToCsv.mjs';

const commands = {
  ['csv-to-json']: csvToJson,
  ['json-to-csv']: jsonToCsv,
  count
};

export default commands;

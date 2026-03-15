import { ReplHandler } from './repl.mjs';
import navigation from './navigation.mjs';
import commands from './commands/index.mjs';

const DataProccesingCLI = () => {
  const state = {
    currentDir: process.cwd(),
  };
  console.log('Welcome to Data Processing CLI!');
  console.log(`You are currently in ${state.currentDir}`);

  ReplHandler(state, navigation, commands);
};

DataProccesingCLI();

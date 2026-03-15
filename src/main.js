import { ReplHandler } from './repl.mjs';
import navigation from './navigation.mjs';

const DataProccesingCLI = () => {
  const state = {
    currentDir: process.cwd(),
  };
  console.log('Welcome to Data Processing CLI!');
  console.log(`You are currently in ${state.currentDir}`);

  ReplHandler(state, navigation);
};

DataProccesingCLI();

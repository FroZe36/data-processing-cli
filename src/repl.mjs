import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
export const ReplHandler = (state, navigation) => {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: '> ',
  });
  rl.prompt();
  rl.on('line', async line => {
    const [command, ...args] = line.trim().split(' ');
    try {
      if (command === '.exit') {
        rl.close()
      }
      if (navigation[command]) {
        await navigation[command](state, args);
      }
    } catch (error) {
      console.log(error);
    }
    rl.prompt();
    console.log(`You are currently in ${state.currentDir}`);
  });
  rl.on('close', () => {
    console.log('Thank you for using Data Processing CLI!');
    process.exit(0);
  });
};

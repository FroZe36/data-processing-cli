export const argParser = (args) => {
  const result = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = args[i + 1];
      if (!value || value.startsWith('--')) {
        throw 'Invalid Input';
      }
      result[key] = value;
      i++;
    }
  }

  return result;
};

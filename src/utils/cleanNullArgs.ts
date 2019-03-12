const cleanNullArgs = (args: object) => {
  const notNull = {};
  Object.keys(args).forEach(key => {
    if (key !== null) {
      notNull[key] = args[key];
    }
  });
  return notNull;
};

export default cleanNullArgs;
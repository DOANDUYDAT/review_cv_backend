const fsPromises = require('fs').promises;

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const dirPath = 'logs/' + new Date().toDateString();
    const logFilePath = dirPath + '/log.txt';
    const errorLog = `Error in '${context.path}' service method '${context.method}' ${context.error.stack} \n`;
    try {
      // if exists dir
      const dir = await fsPromises.open(dirPath);
      if (dir) {
        await fsPromises.appendFile(logFilePath, errorLog);
        dir.close();
      }
    } catch (error) {
      await fsPromises.mkdir(dirPath);
      await fsPromises.appendFile(logFilePath, errorLog);
    }
  };
};

const { BadRequest } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    // eslint-disable-next-line no-unused-vars
    const { data, method } = context;

    // Update the original data (so that people can't submit additional stuff)
    if (method === 'create') {
      if (!data.title) {
        throw new BadRequest('A title is required');
      }
      if (!data.content) {
        throw new BadRequest('A content is required');
      }
    }

    return context;
  };
};

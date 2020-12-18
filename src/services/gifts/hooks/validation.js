const { BadRequest } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    // eslint-disable-next-line no-unused-vars
    const { data, method, params } = context;
    // console.log(data);
    // Update the original data (so that people can't submit additional stuff)
    if (method === 'create') {
      if (!data.name) {
        throw new BadRequest('A name is required');
      }
      if (!data.value) {
        throw new BadRequest('A value is required');
      }
      if (!data.quantity) {
        throw new BadRequest('A quantity is required');
      }
      if (!data.category) {
        throw new BadRequest('A category is required');
      }
    }

    return context;
  };
};

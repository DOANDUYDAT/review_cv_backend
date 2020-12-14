// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;
    if (!data._id) {
      throw new BadRequest('A _id is required');
    }
    if (!data.amount) {
      throw new BadRequest('An amount is required');
    } else if (!Number.isInteger(data.amount)) {
      throw new BadRequest('Amount must be a integer');
    }
    if (!data.category) {
      throw new BadRequest('A category is required');
    } else if (!Number.isInteger(data.category)) {
      throw new BadRequest('Amount must be a integer');
    }
    return context;
  };
};

/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;

    // The logged in user
    const { user } = context.params;

    let nameCv = '';
    let content = [];
    if (!Array.isArray(content)) {
      throw new BadRequest('Content of Cv must be array');
    }
    // Update the original data (so that people can't submit additional stuff)
    context.data = {
      // Set the user id
      userId: user._id,
      // Add the current date
      createdAt: new Date().getTime()
    };

    return context;
  };
};

const { BadRequest } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    // eslint-disable-next-line no-unused-vars
    const { data, method } = context;

    // Throw an error if we didn't get a text


    // The logged in user
    const { user } = context.params;

    // Update the original data (so that people can't submit additional stuff)
    if (method === 'create') {
      if(!data.content) {
        throw new BadRequest('A message must have a text');
      }
      context.data = {
        content: data.content,
        // Set the user id
        userId: user._id,
        isRead: false,
        // Add the current date
        createdAt: new Date().getTime()
      };
    } else if (method === 'patch' || method === 'update') {
      context.data = {
        content: data.content,
        // Set the user id
        userId: user._id,
        // Add the current date
        updatedAt: new Date().getTime(),
        isRead: data.isRead ? true : false
      };
    }

    return context;
  };
};

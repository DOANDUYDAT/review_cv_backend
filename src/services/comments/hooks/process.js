// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { ObjectID } = require('mongodb');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;

    // The logged in user
    const { user } = context.params;

    // Update the original data (so that people can't submit additional stuff)
    context.data = {
      userId: user._id,
      answerId: new ObjectID(data.answerId),
      content: data.content,
      likes: [],
      createdAt: new Date().getTime()
    };

    return context;
  };
};

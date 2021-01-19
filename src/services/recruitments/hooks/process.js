// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { Forbidden } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;
    // The logged in user
    const { user } = context.params;

    if (user.role === 'specialist') {
      context.data = {
        // Set the user id
        userId: user._id,
        // Add the current date
        title: data.title,
        content: data.content,
        expiredDate: data.expiredDate,
        location: data.location,
        field: data.field,
        createdAt: new Date().getTime()
      };
      return context;
    } else {
      throw new Forbidden('Not permission');
    }
  };
};

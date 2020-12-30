/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, result, app, params } = context;
    // logged user
    const { user } = params;

    // create new notification
    app.service('notifications').create({
      type: 'newCv',
      from: user._id,
      cvId: result._id,
      createdAt: Date.now()
    });
    return context;
  };
};

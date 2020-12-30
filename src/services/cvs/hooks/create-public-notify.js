/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');
const { ObjectID } = require('mongodb');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, result, app, params } = context;
    // logged user
    const { user } = params;
    const { toUserId } = data;

    // create new notification
    app.service('notifications').create({
      type: 'publicCv',
      from: user._id,
      cvId: result._id,
      to: new ObjectID(toUserId),
      createdAt: Date.now()
    });
    return context;
  };
};

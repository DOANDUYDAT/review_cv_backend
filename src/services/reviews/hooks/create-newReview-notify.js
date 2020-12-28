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

    const { cvId } = data;
    const cv = await app.service('cvs').get(cvId);

    // create new notification
    app.service('notifications').create({
      type: 'newReview',
      from: new ObjectID(user._id),
      to: cv.userId,
      reviewId: result._id,
      createdAt: Date.now()
    });
    return context;
  };
};

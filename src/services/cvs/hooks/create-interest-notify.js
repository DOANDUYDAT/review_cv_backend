/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, result, app, params } = context;
    // logged user
    const { user } = params;
    const { cvId } = data;
    const cv = await this.app.service('cvs').get(cvId);
    const spec = (await this.app.service('specialists').find({
      query: {
        userId: user._id
      }
    })).data[0];

    // create new notification
    await app.service('notifications').create({
      type: 'interestCv',
      from: spec._id,
      to: cv.userId,
      cvId: cv._id
    });
    return context;
  };
};

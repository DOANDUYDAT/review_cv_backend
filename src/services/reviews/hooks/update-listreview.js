/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, result, app, params } = context;
    // logged user
    const { user } = params;

    if (user.role === 'specialist') {
      const mem = (await app.service('specialists').find({
        query: {
          userId: user._id
        }
      })).data[0];

      let { listReview } = mem;
      listReview.push(result._id);
      await app.service('specialists').patch(mem._id, {
        listReview
      });
    }
    if (user.role === 'volunteer') {
      const mem = (await app.service('volunteers').find({
        query: {
          userId: user._id
        }
      })).data[0];

      let { listReview } = mem;
      listReview.push(result._id);
      await app.service('volunteers').patch(mem._id, {
        listReview
      });
    }

    return context;
  };
};

/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, result, app, params } = context;
    // logged user
    const { user } = params;

    const mem = (await app.service('members').find({
      query: {
        userId: user._id
      }
    })).data[0];

    let { listCv } = mem;
    listCv.push(result._id);
    await app.service('members').patch(mem._id, {
      listCv
    });
    return context;
  };
};

/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { Forbidden, NotFound } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, params, app, result } = context;

    const { user } = params;
    const spec = (await app.service('specialists').find({
      query: {
        userId: user._id
      }
    })).data[0];
    console.log(params);
    if (spec) {
      let { listRecruitmentNews } = spec;
      listRecruitmentNews.push(result._id);
      app.service('specialists').patch(spec._id, {
        listRecruitmentNews
      });
    } else {
      throw new NotFound('Specialist is not exist');
    }

    return context;
  };
};

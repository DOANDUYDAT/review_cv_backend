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
    // update listReview cho cv
    const cv = await app.service('cvs').get(cvId);
    let listReviewOfCv = cv.listReview;
    listReviewOfCv.push(result._id);
    await app.service('cvs').patch(cvId, {
      listReview: listReviewOfCv
    });

    // update listReview, listReviewedCv cho volunteer, specialist
    if (user.role === 'specialist') {
      const mem = (await app.service('specialists').find({
        query: {
          userId: user._id
        }
      })).data[0];

      let { listReview, listReviewedCv } = mem;
      listReview.push(result._id);
      listReviewedCv.push(cvId);
      await app.service('specialists').patch(mem._id, {
        listReview,
        listReviewedCv
      });
    }
    if (user.role === 'volunteer') {
      const mem = (await app.service('volunteers').find({
        query: {
          userId: user._id
        }
      })).data[0];

      let { listReview, listReviewedCv } = mem;
      listReview.push(result._id);
      listReviewedCv.push(cvId);
      await app.service('volunteers').patch(mem._id, {
        listReview,
        listReviewedCv
      });
    }

    return context;
  };
};

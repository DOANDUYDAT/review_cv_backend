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

    // update listReview, listReceivedCv cho volunteer, specialist
    if (user.role === 'specialist') {
      const mem = (await app.service('specialists').find({
        query: {
          userId: user._id
        }
      })).data[0];

      let { listReview, listReceivedCv } = mem;
      listReview.push(result._id);
      let newListReceivedCv = listReceivedCv.filter(e => e.toString() != cvId);
      await app.service('specialists').patch(mem._id, {
        listReview,
        listReceivedCv: newListReceivedCv
      });
    }
    if (user.role === 'volunteer') {
      const mem = (await app.service('volunteers').find({
        query: {
          userId: user._id
        }
      })).data[0];

      let { listReview, listReceivedCv } = mem;
      listReview.push(result._id);
      let newListReceivedCv = listReceivedCv.filter(e => e.toString() != cvId);
      await app.service('volunteers').patch(mem._id, {
        listReview,
        listReceivedCv: newListReceivedCv
      });
    }

    return context;
  };
};

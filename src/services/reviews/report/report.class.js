/* eslint-disable no-unused-vars */
const { Forbidden, NotFound } = require('@feathersjs/errors');

exports.Report = class Report {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create(data, params) {
    const { reviewId, content } = data;
    const { user } = params;

    const review = await this.app.service('reviews').get(reviewId);

    if (!review) {
      throw new NotFound('Review is not exist');
    }
    const userReview = await this.app.service('users').get(review.userId);
    // let detailInfo = null;
    if (user.role === 'member') {
      // trừ 10 điểm uy tín khi bị report
      const { reputationPoint } = userReview;
      let newPoint = reputationPoint - 10;
      if (newPoint < 0) { // nếu bị âm điểm thì đặt bằng 0
        newPoint = 0;
      }
      await this.app.service('users').patch(userReview._id, {
        reputationPoint: newPoint,
      });
      // update report cho review
      await this.app.service('reviews').patch(review._id, {
        report: {
          content,
          userId: user._id,
          createdAt: Date.now()
        }
      });

      return this.app.service('reviews').get(review._id, params);
    } else {
      throw new Forbidden('Not permission');
    }
  }
};

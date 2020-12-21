const { NotFound, Forbidden, BadRequest } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.Rating = class Rating {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    // if (Array.isArray(data)) {
    //   return Promise.all(data.map(current => this.create(current, params)));
    // }
    const { _id, content } = data;
    const { user } = params;

    if (!_id) {
      throw new BadRequest('A reviewId is required');
    }
    if (!content) {
      throw new BadRequest('A content is required');
    }

    const review = await this.app.service('reviews').get(_id);
    if (!review) {
      throw new NotFound('Question is not exist');
    }
    const userReview = await this.app.service('users').get(review.userId);
    if (!userReview) {
      throw new NotFound('User is not exist');
    }
    let { reputationPoint } = userReview;
    let newPoint = 0;
    if (user.role === 'member') {
      // cộng/trừ điểm uy tín
      if (content === 'Hài lòng') {
        newPoint = reputationPoint + 3;
      } else if (content === 'Bình thường') {
        newPoint = reputationPoint;
      } else if (content === 'Không hài lòng') {
        newPoint = reputationPoint - 3;
      } else {
        throw new BadRequest('Loại đánh giá không phù hợp');
      }
      await this.app.service('users').patch(userReview._id, {
        reputationPoint: newPoint
      });
      // update rating cho review
      await this.app.service('reviews').patch(review._id, {
        rating: true
      });

      return this.app.service('reviews').get(_id, params);
    } else {
      throw new Forbidden('Not permission');
    }
  }
};

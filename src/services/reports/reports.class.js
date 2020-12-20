/* eslint-disable no-unused-vars */
const { Forbidden, NotFound } = require('@feathersjs/errors');
const { Service } = require('feathers-mongodb');

exports.Reports = class Reports extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(db => {
      this.Model = db.collection('reports');
    });
  }
  setup(app) {
    this.app = (app);
  }

  async create(data, params) {
    const { reviewId, content } = data;
    const { user } = params;
    console.log(reviewId);
    const review = await this.app.service('reviews').get(reviewId);

    if (!review) {
      throw new NotFound('Review is not exist');
    }
    if (user.role === 'member') {
      // trừ  điểm uy tín
      let ownerReview = null;
      console.log(review);
      return 'hello';
    } else {
      throw new Forbidden('Not permission');
    }
  }
};

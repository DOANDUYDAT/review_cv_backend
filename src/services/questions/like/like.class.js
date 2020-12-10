const { NotFound } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.Like = class Like {
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
    const { _id } = data;
    const { user } = params;
    const question = await this.app.service('questions').get(_id);
    if (!question) {
      throw new NotFound('Question is not exist');
    } else {
      let likes = [...question.likes];
      const index = likes.findIndex(e => e.toString() == user._id.toString());

      if (index == -1) {
        likes.push(user._id);
      } else {
        likes.splice(index, 1);
      }

      await this.app.service('questions').patch(_id, {
        likes
      });
      return this.app.service('questions').get(_id, params);
    }
  }
};

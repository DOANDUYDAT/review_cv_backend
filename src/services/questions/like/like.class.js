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
    const { questionId } = data;
    const question = await this.app.service('questions').get(questionId);
    if (!question) {
      throw new NotFound('Question is not exist');
    } else {
      const user = await this.app.service('users').get(question.userId);
      let likes = [...question.likes];
      const index = likes.findIndex(e => e.toString() == user._id.toString());

      if (index == -1) {
        likes.push(user._id);
      } else {
        likes.splice(index, 1);
      }

      return this.app.service('questions').patch(questionId, {
        likes
      });
    }
  }
};

const { NotFound, Forbidden } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.Close = class Close {
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
      if (user._id.toString() == question.userId.toString()) {
        return this.app.service('questions').patch(questionId, {
          isClose: true
        });
      } else {
        throw new Forbidden('Not permission');
      }
    }
  }
};

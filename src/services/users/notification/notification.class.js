/* eslint-disable no-unused-vars */
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

    const { userId } = data;
    const user = await this.app.service('users').get(userId);
    if (!user) {
      throw new NotFound('User is not exist');
    } else {

      // if (user._id.toString() == question.userId.toString()) {
      //   return this.app.service('questions').patch(questionId, {
      //     isClose: true
      //   });
      // } else {
      //   throw new Forbidden('Not permission');
      // }
    }
  }
};

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
    const { _id } = data;
    const { user } = params;

    const question = await this.app.service('questions').get(_id);
    if (!question) {
      throw new NotFound('Question is not exist');
    } else {
      if (user._id.toString() == question.userId.toString() || user.role === 'admin') {
        await this.app.service('questions').patch(_id, {
          isClose: true
        });
        return this.app.service('questions').get(_id, params);
      } else {
        throw new Forbidden('Not permission');
      }
    }
  }
};

const { NotFound, BadRequest, Forbidden } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.Accept = class Accept {
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
    if (!_id) {
      throw new BadRequest('A _id is required');
    }
    const answer = await this.app.service('answers').get(_id);
    if (!answer) {
      throw new NotFound('Answer is not exist');
    } else {
      if (user._id.toString() == answer.userId.toString() || user.role === 'admin') {
        await this.app.service('questions').patch(answer.questionId, {
          isClose: true
        });
        await this.app.service('answers').patch(_id,{
          isAccept: true
        });
        return this.app.service('answers').get(_id, params);
      } else {
        throw new Forbidden('Not permission');
      }
    }
  }
};

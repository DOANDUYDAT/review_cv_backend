const { NotFound, BadRequest } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.Dislike = class Dislike {
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
      let dislikes = [...answer.dislikes];
      const index = dislikes.findIndex(e => e.toString() == user._id.toString());

      if (index == -1) {
        dislikes.push(user._id);
      } else {
        dislikes.splice(index, 1);
      }

      await this.app.service('answers').patch(_id, {
        dislikes
      });
      return this.app.service('answers').get(_id, params);
    }
  }
};

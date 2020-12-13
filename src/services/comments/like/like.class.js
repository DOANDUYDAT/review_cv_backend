const { NotFound, BadRequest } = require('@feathersjs/errors');

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
    if (!_id) {
      throw new BadRequest('A _id is required');
    }
    const comment = await this.app.service('comments').get(_id);
    if (!comment) {
      throw new NotFound('Comment is not exist');
    } else {
      let likes = [...comment.likes];
      const index = likes.findIndex(e => e.toString() == user._id.toString());

      if (index == -1) {
        likes.push(user._id);
      } else {
        likes.splice(index, 1);
      }

      await this.app.service('comments').patch(_id, {
        likes
      });
      return this.app.service('comments').get(_id, params);
    }
  }
};

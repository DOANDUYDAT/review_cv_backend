/* eslint-disable no-unused-vars */
const { NotFound, Forbidden } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.Accept = class Accept {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    const { _id } = data;
    // logged user
    const { user } = params;
    if (user.role !== 'admin') {
      throw new Forbidden('Not Forbidden');
    }
    const userChange = await this.app.service('specialists').get(_id);
    if (!userChange) {
      throw new NotFound('User is not exist');
    } else {
      await this.app.service('specialists').patch(_id, {
        isAccept: true
      });
      return this.app.service('specialists').get(_id, params);
    }
  }
};

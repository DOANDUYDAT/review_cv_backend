/* eslint-disable no-unused-vars */
const { NotFound, Forbidden } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.Active = class Active {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    const { userId } = data;
    const { user } = params;
    if (user.role !== 'admin') {
      throw new Forbidden('Not Forbidden');
    }
    const userChange = await this.app.service('users').get(userId);
    if (!userChange) {
      throw new NotFound('User is not exist');
    } else {
      return this.app.service('users').patch(userId, {
        isActive: true
      }, {
        ...params,
        provider: undefined
      });
    }
  }
};

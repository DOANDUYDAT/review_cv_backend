/* eslint-disable no-unused-vars */
const { NotFound, Forbidden } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.TurnOnNotify = class TurnOnNotify {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    const { userId } = data;
    const { user } = params;
    if (user.role !== 'admin' || (user._id.toString() !== userId)) {
      throw new Forbidden('Not Permission!');
    }
    const userChange = await this.app.service('users').get(userId);
    if (!userChange) {
      throw new NotFound('User is not exist');
    } else {
      await this.app.service('users').patch(userId, {
        getEmailNotification: true
      });
      return this.app.service('users').get(userId, params);
    }
  }
};

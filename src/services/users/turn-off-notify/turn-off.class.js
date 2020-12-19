/* eslint-disable no-unused-vars */
const { NotFound, Forbidden } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.TurnOff = class TurnOff {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    const { userId } = data;
    const { user } = params;
    console.log(userId);
    console.log(user);
    if (user.role === 'admin' || (user._id.toString() === userId.toString())) {
      const userChange = await this.app.service('users').get(userId);
      if (!userChange) {
        throw new NotFound('User is not exist');
      } else {
        await this.app.service('users').patch(userId, {
          getEmailNotification: false
        });
        return this.app.service('users').get(userId, params);
      }
    } else {
      throw new Forbidden('Not Permission!');
    }

  }
};

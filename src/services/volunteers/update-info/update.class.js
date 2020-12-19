/* eslint-disable no-unused-vars */
const { NotFound, Forbidden } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.Update = class Update {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    const { _id, userId, userName, phone, fields } = data;
    const { user } = params;
    // nếu người  là admin hoặc chủ tài khoản thì mới được update
    if (user.role === 'admin' || user._id == userId) {
      const userChange = await this.app.service('volunteers').get(_id);
      if (!userChange) {
        throw new NotFound('User is not exist');
      } else {
        await this.app.service('users').patch(userId, {
          userName,
          phone,
          fields
        });
        await this.app.service('volunteers').patch(_id, {
          fields
        });
        return this.app.service('volunteers').get(_id, params);
      }

    } else {
      throw new Forbidden('Not Forbidden');
    }

  }
};

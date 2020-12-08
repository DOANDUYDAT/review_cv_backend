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
    const { _id, userId, userName, phone, fields, getEmailNotification } = data;
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
          getEmailNotification
        },
        {
          ...params,
          provider: undefined
        });
        return this.app.service('volunteers').patch(_id, {
          fields
        }, {
          ...params,
          provider: undefined
        });
      }

    } else {
      throw new Forbidden('Not Forbidden');
    }

  }
};

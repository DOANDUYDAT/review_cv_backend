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
    // logged user
    const { user } = params;
    const userChange = await this.app.service('specialists').get(_id);
    if (!userChange) {
      throw new NotFound('User is not exist');
    } else {
      // nếu người  là admin hoặc chủ tài khoản thì mới được update
      if (user.role === 'admin' || user._id.toString() == userChange.userId.toString()) {
        await this.app.service('users').patch(userChange.userId, {
          userName,
          phone,
          getEmailNotification
        });
        await this.app.service('specialists').patch(_id, {
          fields
        });
        return this.app.service('specialists').get(_id, params);
      } else {
        throw new Forbidden('Not Forbidden');
      }
    }
  }
};

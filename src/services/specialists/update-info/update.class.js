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
    // nếu người dùng hiện tại ko phải admin hoặc muốn sửa tài khoản của người khác thì không được
    if (user.role !== 'admin' || user._id != userId) {
      throw new Forbidden('Not Forbidden');
    }
    const userChange = await this.app.service('specialists').get(_id);
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
      return this.app.service('specialists').patch(_id, {
        fields
      }, {
        ...params,
        provider: undefined
      });
    }
  }
};

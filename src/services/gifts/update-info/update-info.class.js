const { NotFound, Forbidden } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.UpdateInfo = class UpdateInfo {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    const { _id } = data;
    const { user } = params;
    const gift = await this.app.service('gifts').get(_id);

    if (!gift) {
      throw new NotFound('Gift is not exist');
    }

    if (user.role === 'admin') {
      let image = gift.image;
      if (params.file) {
        const { id } = await this.app.service('gifts/upload-gift').create(data, params);
        image = id;
      }
      return this.app.service('gifts').patch(_id, {
        quantity: data.quantity,
        name: data.name,
        value: data.value,
        category: data.category,
        image,
        updatedAt: Date.now()
      });

    } else {
      throw new Forbidden('Not permission');
    }
  }
};

const { NotFound } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.Receive = class Receive {
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
    const gift = await this.app.service('gifts').get(_id);
    if (!gift) {
      throw new NotFound('Gift is not exist');
    } else {
      let { quantity } = gift;
      if (quantity < 1) {
        throw new NotFound('Số lượng quà tặng đã hết');
      }

      await this.app.service('volunteers/exchange-gift').create({
        _id: user._id,
        amount: gift.value,
      },
      {
        user
      });
      let newQuantity = quantity - 1;

      return this.app.service('gifts').patch(_id, {
        quantity: newQuantity
      });
    }
  }
};

/* eslint-disable no-unused-vars */
const { NotFound, Forbidden, BadRequest } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.ExchangeGift = class ExchangeGift {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    const { _id, amount } = data;
    const { user } = params;
    const volunteer = (await this.app.service('volunteers').find({
      query: {
        userId: _id
      }
    })).data[0];

    if (!volunteer) {
      throw new NotFound('Volunteer is not found');
    } else {
      const { reputationPoint, rewardPoint, accumulationPoint } = volunteer;
      if (amount > rewardPoint) {
        throw new BadRequest('Số điểm thưởng không đủ');
      }
      let newRewardPoint = rewardPoint - amount;

      return this.app.service('volunteers').patch(volunteer._id, {
        rewardPoint: newRewardPoint
      });
    }
  }
};

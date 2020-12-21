/* eslint-disable no-unused-vars */
const { NotFound, Forbidden, BadRequest } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.ExchangePoint = class ExchangePoint {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    const { _id, amount, category } = data;
    const { user } = params;
    const volunteer = await this.app.service('volunteers').get(_id);

    if (!volunteer) {
      throw new NotFound('Volunteer is not found');
    } else {
      if (user.role === 'admin' || volunteer.userId.toString() === user._id.toString()) {
        const { user: { reputationPoint }, rewardPoint, accumulationPoint } = volunteer;
        if (amount > accumulationPoint) {
          throw new BadRequest('Số điểm đổi không được lớn hơn điểm tích lũy');
        }
        // cộng điểm
        if (category == 1) { // điểm uy tín
          let newReputationPoint = reputationPoint + amount;
          await this.app.service('users').patch(user._id, {
            reputationPoint: newReputationPoint
          });
        } else if (category == 2) {// điểm thưởng
          let newRewardPoint = rewardPoint + amount;
          await this.app.service('volunteers').patch(_id, {
            rewardPoint: newRewardPoint
          });
        }
        // trừ điểm tích lũy
        let newAccumulationPoint = accumulationPoint - amount;
        await this.app.service('volunteers').patch(_id, {
          accumulationPoint: newAccumulationPoint
        });
        return this.app.service('volunteers').get(volunteer._id, params);
      } else {
        throw new Forbidden('Not permission');
      }
    }
  }
};

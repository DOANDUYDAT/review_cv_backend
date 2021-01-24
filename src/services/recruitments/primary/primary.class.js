const { NotFound, Forbidden } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.PrimaryNews = class PrimaryNews {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    const { recruitmentId } = data;
    const { user } = params;
    const recruitment = await this.app.service('recruitments').get(recruitmentId);
    const spec = (await this.app.service('specialists').find({
      query: {
        userId: user._id
      }
    })).data[0];
    if (!recruitment) {
      throw new NotFound('Recruitment is not exist');
    }
    if (user.role === 'specialist') {
      await this.app.service('specialists').patch(spec._id, {
        primaryRecruitment: recruitment._id
      });
      return recruitmentId;
    } else {
      throw new Forbidden('Not permission');
    }
  }
};

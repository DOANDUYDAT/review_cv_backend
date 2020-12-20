/* eslint-disable no-unused-vars */
const { NotFound, Forbidden } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.Interest = class Interest {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    const { cvId } = data;
    const { user } = params;
    const cv = await this.app.service('cvs').get(cvId);
    if (!cv) {
      throw new NotFound('Cv is not exists');
    }
    if (user.role === 'specialist') {
      const mem = (await this.app.service('specialists').find({
        query: {
          userId: user._id
        }
      })).data[0];
      let { listReceivedCv } = mem;
      listReceivedCv.push(cvId);
      await this.app.service('specialists').patch(mem._id, {
        listReceivedCv
      });
      return this.app.service('cvs').get(cvId, params);
    }
    else if (user.role === 'volunteer') {
      const mem = (await this.app.service('volunteers').find({
        query: {
          userId: user._id
        }
      })).data[0];
      let { listReceivedCv } = mem;
      listReceivedCv.push(cvId);
      await this.app.service('volunteers').patch(mem._id, {
        listReceivedCv
      });
      return this.app.service('cvs').get(cvId, params);
    }
    else {
      throw new Forbidden('Not Forbidden');
    }
  }
};

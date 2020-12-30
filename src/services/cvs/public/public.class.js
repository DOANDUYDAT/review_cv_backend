/* eslint-disable no-unused-vars */
const { NotFound, Forbidden } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.Public = class Public {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    const { cvId, toUserId } = data;
    const { user } = params;
    const cv = await this.app.service('cvs').get(cvId);
    if (!cv) {
      throw new NotFound('Cv is not exist');
    }
    const ownerCv = await this.app.service('users').get(cv.userId);
    const toUser = await this.app.service('users').get(toUserId);
    if (!toUser) {
      throw new NotFound('Not found user to puclic cv');
    }
    if (user._id.toString() === ownerCv._id.toString()) {
      let { listViewer } = cv;
      listViewer.push(toUser._id);
      return this.app.service('cvs').patch(cvId, {
        listViewer
      }, params);
    } else {
      throw new Forbidden('Not permission');
    }
  }
};

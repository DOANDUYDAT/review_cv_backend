/* eslint-disable no-unused-vars */
const { NotFound, Forbidden } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.Uploads = class Uploads {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    // The logged in user
    const { user } = params;
    if (user.role !== 'member') {
      throw new Forbidden('Not permission');
    }
    const mem = (await this.app.service('members').find({
      query: {
        userId: user._id
      }
    })).data[0];
    if (!mem) {
      throw new NotFound('Member is not exist');
    }

    let link = null;

    if (params.file) {
      const { id } = await this.app.service('cvs/upload-cv').create(data, params);
      link = id;
    }
    let linkHidden = 'hidden-' + link;

    let type = 'upload';
    let dataCv = {
      // Set the user id
      content: data.content,
      name: data.name,
      userId: user._id,
      link,
      linkHidden,
      listViewer: [],
      listInterester: [],
      listReview: [],
      type,
      field: data.field,
      exp: data.exp,
      position: data.position,
      location: data.location,
      timeType: data.timeType,
      createdAt: new Date().getTime(),
      updatedAt: null
    };

    return this.app.service('cvs').create(dataCv, params);

  }
};

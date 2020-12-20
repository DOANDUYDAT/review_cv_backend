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
    if (user.role === 'specialist') {
      const cv = await this.app.service('cvs').get(cvId);
      const spec = (await this.app.service('specialists').find({
        query: {
          userId: user._id
        }
      })).data[0];
      if (!cv) {
        throw new NotFound('Cv is not exist');
      }
      if (!spec) {
        throw new NotFound('Specialist is not exist');
      }
      // thêm/xóa người dùng trong danh sách quan tâm cv
      let interested = [...cv.interested];
      const index = interested.findIndex(e => e.toString() == user._id.toString());
      if (index == -1) {
        interested.push(user._id);
      } else {
        interested.splice(index, 1);
      }
      await this.app.service('cvs').patch(cvId, {
        interested
      });
      // thêm/xóa cv trong danh sách cv đã quan tâm của người dùng
      let interestedCv = [...spec.interestedCv];
      const indexCv = interested.findIndex(e => e.toString() == cvId.toString());
      if (indexCv == -1) {
        interestedCv.push(cvId);
      } else {
        interestedCv.splice(index, 1);
      }
      await this.app.service('specialists').patch(spec._id, {
        interestedCv
      });

      return this.app.service('cvs').get(cvId, params);

    } else {
      throw new Forbidden('Not Forbidden');
    }
  }
};
